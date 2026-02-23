import type { MouthZone } from '../types';

export const MOUTH_ZONES: MouthZone[] = [
  { id: 'topLeft', label: 'Top Left', x: 0.1, y: 0.55, w: 0.25, h: 0.2 },
  { id: 'topCenter', label: 'Top Front', x: 0.35, y: 0.55, w: 0.3, h: 0.2 },
  { id: 'topRight', label: 'Top Right', x: 0.65, y: 0.55, w: 0.25, h: 0.2 },
  { id: 'bottomLeft', label: 'Bottom Left', x: 0.1, y: 0.75, w: 0.25, h: 0.2 },
  { id: 'bottomCenter', label: 'Bottom Front', x: 0.35, y: 0.75, w: 0.3, h: 0.2 },
  { id: 'bottomRight', label: 'Bottom Right', x: 0.65, y: 0.75, w: 0.25, h: 0.2 }
];

export interface MotionResult {
  zoneId: string;
  motionLevel: number;
  hasMotion: boolean;
}

export interface FaceRegion {
  x: number;
  y: number;
  width: number;
  height: number;
}

export class MotionDetector {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private previousFrame: ImageData | null = null;
  private pixelThreshold = 10;
  private motionThresholdPercent = 0.3;
  private frameCount = 0;

  constructor() {
    this.canvas = document.createElement('canvas');
    const ctx = this.canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) throw new Error('Could not get canvas context');
    this.ctx = ctx;
  }

  private isInFaceRegion(x: number, y: number, faceRegion: FaceRegion | null, width: number, height: number): boolean {
    if (!faceRegion) return false;
    
    const faceX = (faceRegion.x - faceRegion.width / 2) / (width / 0.25);
    const faceY = faceRegion.y / (height / 0.25);
    const faceW = faceRegion.width / (width / 0.25);
    const faceH = faceRegion.height / (height / 0.25);
    
    const padding = 0.1;
    const expandedX = faceX - faceW * padding;
    const expandedY = faceY - faceH * padding;
    const expandedW = faceW * (1 + padding * 2);
    const expandedH = faceH * (1 + padding * 2) * 0.7;
    
    return x >= expandedX && x <= expandedX + expandedW &&
           y >= expandedY && y <= expandedY + expandedH;
  }

  detectMotion(video: HTMLVideoElement, faceRegion: FaceRegion | null = null): MotionResult[] {
    this.frameCount++;
    
    if (!video.videoWidth || !video.videoHeight) {
      return MOUTH_ZONES.map(zone => ({
        zoneId: zone.id,
        motionLevel: 0,
        hasMotion: false
      }));
    }

    const scaleFactor = 0.25;
    const width = Math.floor(video.videoWidth * scaleFactor);
    const height = Math.floor(video.videoHeight * scaleFactor);

    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.canvas.width = width;
      this.canvas.height = height;
      this.previousFrame = null;
    }

    try {
      this.ctx.drawImage(video, 0, 0, width, height);
    } catch (err) {
      console.error('[MotionDetector] Failed to draw video frame:', err);
      return MOUTH_ZONES.map(zone => ({
        zoneId: zone.id,
        motionLevel: 0,
        hasMotion: false
      }));
    }
    
    const currentFrame = this.ctx.getImageData(0, 0, width, height);

    if (!this.previousFrame) {
      this.previousFrame = currentFrame;
      return MOUTH_ZONES.map(zone => ({
        zoneId: zone.id,
        motionLevel: 0,
        hasMotion: false
      }));
    }

    const results = MOUTH_ZONES.map(zone => {
      const zoneX = Math.floor(zone.x * width);
      const zoneY = Math.floor(zone.y * height);
      const zoneW = Math.floor(zone.w * width);
      const zoneH = Math.floor(zone.h * height);

      let motionPixels = 0;
      let validPixels = 0;

      for (let y = zoneY; y < zoneY + zoneH && y < height; y++) {
        for (let x = zoneX; x < zoneX + zoneW && x < width; x++) {
          const normalizedX = x / width;
          const normalizedY = y / height;
          
          if (faceRegion && this.isInFaceRegion(normalizedX, normalizedY, faceRegion, width, height)) {
            continue;
          }
          
          const i = (y * width + x) * 4;
          
          const rDiff = Math.abs(currentFrame.data[i] - this.previousFrame!.data[i]);
          const gDiff = Math.abs(currentFrame.data[i + 1] - this.previousFrame!.data[i + 1]);
          const bDiff = Math.abs(currentFrame.data[i + 2] - this.previousFrame!.data[i + 2]);
          
          const avgDiff = (rDiff + gDiff + bDiff) / 3;
          
          if (avgDiff > this.pixelThreshold) {
            motionPixels++;
          }
          validPixels++;
        }
      }

      const motionPercentage = validPixels > 0 ? (motionPixels / validPixels) * 100 : 0;
      
      return {
        zoneId: zone.id,
        motionLevel: Math.min(motionPercentage * 2, 100),
        hasMotion: motionPercentage > this.motionThresholdPercent
      };
    });

    this.previousFrame = currentFrame;
    
    if (this.frameCount % 20 === 0) {
      const activeZones = results.filter(r => r.hasMotion).length;
      console.log('[MotionDetector] Frame', this.frameCount, '- Active zones:', activeZones);
    }
    
    return results;
  }

  reset(): void {
    this.previousFrame = null;
    this.frameCount = 0;
  }
}
