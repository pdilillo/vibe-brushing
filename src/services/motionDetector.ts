import type { MouthZone } from '../types';

// Single default zone centered on face area (fallback when no face detected)
const DEFAULT_ZONE: MouthZone = { id: 'faceZone', label: 'Face', x: 0.30, y: 0.25, w: 0.40, h: 0.50 };

// Export single zone array for external use
export const MOUTH_ZONES: MouthZone[] = [DEFAULT_ZONE];

// Legacy exports for compatibility (no longer used for multi-zone logic)
export const CENTER_ZONES = ['faceZone'];
export const ZONE_NEIGHBORS: Record<string, string[]> = {
  faceZone: []
};

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

export interface DebugInfo {
  faceRegion: FaceRegion | null;
  brushingRegion: { x: number; y: number; width: number; height: number } | null;
  zones: Array<{
    id: string;
    bounds: { x: number; y: number; width: number; height: number };
    motionLevel: number;
    hasMotion: boolean;
    motionPixels: number;
    totalPixels: number;
  }>;
  frameMotionTotal: number;
  handMotionDetected: boolean;
}

export class MotionDetector {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private previousFrame: ImageData | null = null;
  private pixelThreshold = 20;
  private motionThresholdPercent = 2.5;
  private frameCount = 0;
  private debugMode = false;
  private lastDebugInfo: DebugInfo | null = null;
  
  // Smoothed face position for stable zone tracking
  private smoothedFaceCenter: { x: number; y: number; w: number; h: number } | null = null;
  private readonly smoothingFactor = 0.15; // Lower = smoother/slower tracking

  constructor() {
    this.canvas = document.createElement('canvas');
    const ctx = this.canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) throw new Error('Could not get canvas context');
    this.ctx = ctx;
  }

  // Calculate single zone centered on detected face
  private getZonesForFace(faceRegion: FaceRegion | null, videoWidth: number, videoHeight: number): MouthZone[] {
    if (!faceRegion || videoWidth === 0 || videoHeight === 0) {
      return [DEFAULT_ZONE];
    }

    // Normalize face position to 0-1 range
    const faceNormX = faceRegion.x / videoWidth;
    const faceNormY = faceRegion.y / videoHeight;
    const faceNormW = faceRegion.width / videoWidth;
    const faceNormH = faceRegion.height / videoHeight;

    // Smooth the face center position to avoid jittery zone
    const targetCenter = {
      x: faceNormX,
      y: faceNormY + faceNormH * 0.5, // Center on face
      w: faceNormW,
      h: faceNormH
    };

    if (!this.smoothedFaceCenter) {
      this.smoothedFaceCenter = targetCenter;
    } else {
      // Apply exponential smoothing
      this.smoothedFaceCenter = {
        x: this.smoothedFaceCenter.x + (targetCenter.x - this.smoothedFaceCenter.x) * this.smoothingFactor,
        y: this.smoothedFaceCenter.y + (targetCenter.y - this.smoothedFaceCenter.y) * this.smoothingFactor,
        w: this.smoothedFaceCenter.w + (targetCenter.w - this.smoothedFaceCenter.w) * this.smoothingFactor,
        h: this.smoothedFaceCenter.h + (targetCenter.h - this.smoothedFaceCenter.h) * this.smoothingFactor
      };
    }

    const fc = this.smoothedFaceCenter;
    
    // Single zone dimensions: covers the face area with some padding
    // Zone is slightly larger than face to capture brushing motion around it
    const zoneW = Math.max(0.30, Math.min(0.50, fc.w * 1.4));
    const zoneH = Math.max(0.35, Math.min(0.55, fc.h * 1.2));
    
    // Center zone on face
    const zoneX = fc.x - zoneW / 2;
    const zoneY = fc.y - zoneH / 2;

    // Clamp zone to stay within frame
    const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));
    const clampedX = clamp(zoneX, 0.02, 1 - zoneW - 0.02);
    const clampedY = clamp(zoneY, 0.05, 1 - zoneH - 0.05);

    return [
      { id: 'faceZone', label: 'Face', x: clampedX, y: clampedY, w: zoneW, h: zoneH }
    ];
  }

  setDebugMode(enabled: boolean): void {
    this.debugMode = enabled;
  }

  getDebugInfo(): DebugInfo | null {
    return this.lastDebugInfo;
  }

  // Get current active zones (for external display/debugging)
  getCurrentZones(faceRegion: FaceRegion | null, videoWidth: number, videoHeight: number): MouthZone[] {
    return this.getZonesForFace(faceRegion, videoWidth, videoHeight);
  }

  private getFaceRegionNormalized(faceRegion: FaceRegion | null, width: number, height: number): { x: number; y: number; w: number; h: number } | null {
    if (!faceRegion) return null;
    
    const scaleFactor = 0.25;
    const faceX = (faceRegion.x - faceRegion.width / 2) / (width / scaleFactor);
    const faceY = faceRegion.y / (height / scaleFactor);
    const faceW = faceRegion.width / (width / scaleFactor);
    const faceH = faceRegion.height / (height / scaleFactor);
    
    return { x: faceX, y: faceY, w: faceW, h: faceH };
  }

  private isInFaceCore(x: number, y: number, faceRegion: FaceRegion | null, width: number, height: number): boolean {
    const face = this.getFaceRegionNormalized(faceRegion, width, height);
    if (!face) return false;
    
    const coreX = face.x + face.w * 0.15;
    const coreY = face.y + face.h * 0.1;
    const coreW = face.w * 0.7;
    const coreH = face.h * 0.5;
    
    return x >= coreX && x <= coreX + coreW &&
           y >= coreY && y <= coreY + coreH;
  }

  private isInBrushingRegion(x: number, y: number, faceRegion: FaceRegion | null, width: number, height: number): boolean {
    const face = this.getFaceRegionNormalized(faceRegion, width, height);
    if (!face) {
      return y > 0.2;
    }
    
    const brushX = face.x - face.w * 1.0;
    const brushY = face.y - face.h * 0.1;
    const brushW = face.w * 3.0;
    const brushH = face.h * 2.5;
    
    return x >= brushX && x <= brushX + brushW &&
           y >= brushY && y <= brushY + brushH;
  }

  getBrushingRegion(faceRegion: FaceRegion | null, videoWidth: number, videoHeight: number): { x: number; y: number; width: number; height: number } | null {
    const scaleFactor = 0.25;
    const width = videoWidth * scaleFactor;
    const height = videoHeight * scaleFactor;
    
    const face = this.getFaceRegionNormalized(faceRegion, width, height);
    if (!face) {
      return {
        x: 0,
        y: 0.2 * videoHeight,
        width: videoWidth,
        height: 0.8 * videoHeight
      };
    }
    
    const brushX = face.x - face.w * 1.0;
    const brushY = face.y - face.h * 0.1;
    const brushW = face.w * 3.0;
    const brushH = face.h * 2.5;
    
    return {
      x: Math.max(0, brushX * videoWidth),
      y: Math.max(0, brushY * videoHeight),
      width: Math.min(brushW * videoWidth, videoWidth),
      height: Math.min(brushH * videoHeight, videoHeight)
    };
  }

  detectMotion(video: HTMLVideoElement, faceRegion: FaceRegion | null = null): MotionResult[] {
    this.frameCount++;
    
    // Get dynamic zones based on face position
    const activeZones = this.getZonesForFace(faceRegion, video.videoWidth, video.videoHeight);
    
    if (!video.videoWidth || !video.videoHeight) {
      return activeZones.map(zone => ({
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
      return activeZones.map(zone => ({
        zoneId: zone.id,
        motionLevel: 0,
        hasMotion: false
      }));
    }
    
    const currentFrame = this.ctx.getImageData(0, 0, width, height);

    if (!this.previousFrame) {
      this.previousFrame = currentFrame;
      return activeZones.map(zone => ({
        zoneId: zone.id,
        motionLevel: 0,
        hasMotion: false
      }));
    }

    let totalFrameMotion = 0;
    let handMotionDetected = false;
    const debugZones: DebugInfo['zones'] = [];

    const results = activeZones.map(zone => {
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
          
          if (this.isInFaceCore(normalizedX, normalizedY, faceRegion, width, height)) {
            continue;
          }
          
          if (!this.isInBrushingRegion(normalizedX, normalizedY, faceRegion, width, height)) {
            continue;
          }
          
          const i = (y * width + x) * 4;
          
          const rDiff = Math.abs(currentFrame.data[i] - this.previousFrame!.data[i]);
          const gDiff = Math.abs(currentFrame.data[i + 1] - this.previousFrame!.data[i + 1]);
          const bDiff = Math.abs(currentFrame.data[i + 2] - this.previousFrame!.data[i + 2]);
          
          const avgDiff = (rDiff + gDiff + bDiff) / 3;
          
          if (avgDiff > this.pixelThreshold) {
            motionPixels++;
            totalFrameMotion += avgDiff;
          }
          validPixels++;
        }
      }

      const motionPercentage = validPixels > 0 ? (motionPixels / validPixels) * 100 : 0;
      const hasMotion = motionPercentage > this.motionThresholdPercent;
      
      if (hasMotion) {
        handMotionDetected = true;
      }

      if (this.debugMode) {
        debugZones.push({
          id: zone.id,
          bounds: {
            x: zone.x,
            y: zone.y,
            width: zone.w,
            height: zone.h
          },
          motionLevel: Math.min(motionPercentage * 2, 100),
          hasMotion,
          motionPixels,
          totalPixels: validPixels
        });
      }
      
      return {
        zoneId: zone.id,
        motionLevel: Math.min(motionPercentage * 2, 100),
        hasMotion
      };
    });

    if (this.debugMode) {
      const brushingRegion = this.getBrushingRegion(faceRegion, width / 0.25, height / 0.25);
      this.lastDebugInfo = {
        faceRegion,
        brushingRegion,
        zones: debugZones,
        frameMotionTotal: totalFrameMotion,
        handMotionDetected
      };
    }

    this.previousFrame = currentFrame;
    
    if (this.frameCount % 20 === 0) {
      const activeZones = results.filter(r => r.hasMotion).length;
      console.log('[MotionDetector] Frame', this.frameCount, '- Active zones:', activeZones, 
        '- Hand motion:', handMotionDetected, '- Total motion:', totalFrameMotion.toFixed(0));
    }
    
    return results;
  }

  reset(): void {
    this.previousFrame = null;
    this.frameCount = 0;
    this.smoothedFaceCenter = null;
  }
}
