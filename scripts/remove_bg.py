#!/usr/bin/env python3
"""
Remove white backgrounds from creature images using flood-fill from corners,
then copy to public/creatures/ directory.
"""
import os
import sys
from PIL import Image

ASSETS_DIR = "/Users/petedilillo/.cursor/projects/Users-petedilillo-Workspace-Vibe-Projects-vibe-brushing/assets"
OUTPUT_DIR = "/Users/petedilillo/Workspace/Vibe Projects/vibe-brushing/public/creatures"

def remove_white_background(img, tolerance=30):
    """Remove white/near-white background using flood fill from all four corners."""
    img = img.convert("RGBA")
    width, height = img.size
    data = img.load()
    
    def is_near_white(pixel, tol):
        r, g, b = pixel[0], pixel[1], pixel[2]
        return r >= (255 - tol) and g >= (255 - tol) and b >= (255 - tol)
    
    visited = [[False] * height for _ in range(width)]
    queue = []
    
    # Seed from all four corners + edges
    corners = [(0, 0), (width - 1, 0), (0, height - 1), (width - 1, height - 1)]
    for cx, cy in corners:
        if not visited[cx][cy] and is_near_white(data[cx, cy], tolerance):
            queue.append((cx, cy))
            visited[cx][cy] = True
    
    # Also seed from edges
    for x in range(width):
        for y in [0, height - 1]:
            if not visited[x][y] and is_near_white(data[x, y], tolerance):
                queue.append((x, y))
                visited[x][y] = True
    for y in range(height):
        for x in [0, width - 1]:
            if not visited[x][y] and is_near_white(data[x, y], tolerance):
                queue.append((x, y))
                visited[x][y] = True
    
    # BFS flood fill
    while queue:
        batch = queue
        queue = []
        for x, y in batch:
            data[x, y] = (255, 255, 255, 0)  # Make transparent
            for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nx, ny = x + dx, y + dy
                if 0 <= nx < width and 0 <= ny < height and not visited[nx][ny]:
                    if is_near_white(data[nx, ny], tolerance):
                        visited[nx][ny] = True
                        queue.append((nx, ny))
    
    return img


def process_series_images(prefix_filter=None):
    """Process all series images, optionally filtering by prefix."""
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    files = sorted(os.listdir(ASSETS_DIR))
    processed = 0
    skipped = 0
    errors = 0
    
    for filename in files:
        if not filename.endswith('.png'):
            continue
        
        # Only process files that match the prefix filter
        if prefix_filter:
            if not any(filename.startswith(p) for p in prefix_filter):
                continue
        
        # Skip batch images and sample images
        if 'batch' in filename or 'sample' in filename:
            print(f"  SKIP (batch/sample): {filename}")
            skipped += 1
            continue
        
        src_path = os.path.join(ASSETS_DIR, filename)
        dst_path = os.path.join(OUTPUT_DIR, filename)
        
        # Skip if already exists in output (don't re-process)
        # Actually always re-process to ensure transparency
        
        try:
            img = Image.open(src_path)
            result = remove_white_background(img, tolerance=30)
            result.save(dst_path, format='PNG', optimize=False)
            print(f"  OK: {filename}")
            processed += 1
        except Exception as e:
            print(f"  ERROR: {filename}: {e}")
            errors += 1
    
    return processed, skipped, errors


if __name__ == '__main__':
    prefixes = sys.argv[1:] if len(sys.argv) > 1 else ['s5-', 's6-']
    print(f"Processing images with prefixes: {prefixes}")
    print(f"Source: {ASSETS_DIR}")
    print(f"Output: {OUTPUT_DIR}")
    print()
    
    processed, skipped, errors = process_series_images(prefixes)
    
    print()
    print(f"Done! Processed: {processed}, Skipped: {skipped}, Errors: {errors}")
