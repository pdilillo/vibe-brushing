import { useRef, useState, useCallback, useEffect } from 'react';
import { MotionDetector, MOUTH_ZONES, type MotionResult, type FaceRegion, type DebugInfo } from '../services/motionDetector';
import type { ZoneProgress } from '../types';

interface UseMotionDetectionOptions {
  targetCleaningTime?: number;
  detectionInterval?: number;
  decayRate?: number;
  debugMode?: boolean;
}

interface UseMotionDetectionReturn {
  zoneProgress: ZoneProgress[];
  motionResults: MotionResult[];
  overallProgress: number;
  isComplete: boolean;
  startDetection: (video: HTMLVideoElement) => void;
  stopDetection: () => void;
  reset: () => void;
  setFaceRegion: (region: FaceRegion | null) => void;
  setDebugMode: (enabled: boolean) => void;
  getDebugInfo: () => DebugInfo | null;
}

export function useMotionDetection(options: UseMotionDetectionOptions = {}): UseMotionDetectionReturn {
  // Decay rate of 0.8 (doubled from 0.4) to encourage continuous brushing
  const { targetCleaningTime = 20, detectionInterval = 100, decayRate = 0.8, debugMode: initialDebugMode = false } = options;
  
  const detectorRef = useRef<MotionDetector | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const intervalRef = useRef<number | null>(null);
  const cleaningTimeRef = useRef<Record<string, number>>({});
  const noMotionCountRef = useRef<Record<string, number>>({});
  const faceRegionRef = useRef<FaceRegion | null>(null);
  const debugModeRef = useRef<boolean>(initialDebugMode);
  
  const [zoneProgress, setZoneProgress] = useState<ZoneProgress[]>(() =>
    MOUTH_ZONES.map(zone => ({
      zoneId: zone.id,
      cleaningProgress: 0,
      isComplete: false
    }))
  );
  
  const [motionResults, setMotionResults] = useState<MotionResult[]>(() =>
    MOUTH_ZONES.map(zone => ({
      zoneId: zone.id,
      motionLevel: 0,
      hasMotion: false
    }))
  );

  const setFaceRegion = useCallback((region: FaceRegion | null) => {
    faceRegionRef.current = region;
  }, []);

  const setDebugMode = useCallback((enabled: boolean) => {
    debugModeRef.current = enabled;
    if (detectorRef.current) {
      detectorRef.current.setDebugMode(enabled);
    }
  }, []);

  const getDebugInfo = useCallback((): DebugInfo | null => {
    return detectorRef.current?.getDebugInfo() ?? null;
  }, []);

  const calculateProgress = useCallback(() => {
    const progress = MOUTH_ZONES.map(zone => {
      const time = cleaningTimeRef.current[zone.id] || 0;
      // Time is capped at targetCleaningTime, so progress shows decay immediately at 100%
      const percentage = (time / targetCleaningTime) * 100;
      return {
        zoneId: zone.id,
        cleaningProgress: percentage,
        isComplete: percentage >= 100
      };
    });
    setZoneProgress(progress);
  }, [targetCleaningTime]);

  const detect = useCallback(() => {
    if (!detectorRef.current || !videoRef.current) {
      return;
    }
    
    const video = videoRef.current;
    
    if (video.paused && video.srcObject) {
      video.play().catch(() => {});
    }
    
    if (video.readyState < 2 || video.videoWidth === 0) {
      return;
    }
    
    const results = detectorRef.current.detectMotion(video, faceRegionRef.current);
    setMotionResults(results);
    
    // Single zone logic - no spillover needed
    results.forEach(result => {
      const currentTime = cleaningTimeRef.current[result.zoneId] || 0;
      
      if (result.hasMotion) {
        noMotionCountRef.current[result.zoneId] = 0;
        const increment = (detectionInterval / 1000) * (result.motionLevel / 60);
        // Cap at targetCleaningTime so decay is visible immediately at 100%
        cleaningTimeRef.current[result.zoneId] = Math.min(currentTime + increment, targetCleaningTime);
      } else {
        const noMotionCount = (noMotionCountRef.current[result.zoneId] || 0) + 1;
        noMotionCountRef.current[result.zoneId] = noMotionCount;
        
        // Apply decay after brief pause (5 frames = 0.5s at 100ms interval)
        // Decay happens even if at or above 100% to encourage continuous brushing
        if (noMotionCount > 5) {
          const decay = (detectionInterval / 1000) * decayRate;
          cleaningTimeRef.current[result.zoneId] = Math.max(0, currentTime - decay);
        }
      }
    });
    
    calculateProgress();
  }, [detectionInterval, calculateProgress, decayRate]);

  const startDetection = useCallback((video: HTMLVideoElement) => {
    console.log('[MotionDetection] startDetection called:', {
      videoReadyState: video.readyState,
      videoWidth: video.videoWidth,
      videoHeight: video.videoHeight,
      srcObject: !!video.srcObject,
      paused: video.paused,
    });
    
    if (video.paused) {
      console.log('[MotionDetection] Video is paused, attempting to play...');
      video.play().then(() => {
        console.log('[MotionDetection] Video now playing');
      }).catch(err => {
        console.error('[MotionDetection] Failed to play video:', err);
      });
    }
    
    if (!detectorRef.current) {
      detectorRef.current = new MotionDetector();
    }
    
    detectorRef.current.setDebugMode(debugModeRef.current);
    videoRef.current = video;
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = window.setInterval(detect, detectionInterval);
    console.log('[MotionDetection] Detection interval started');
  }, [detect, detectionInterval]);

  const stopDetection = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    cleaningTimeRef.current = {};
    noMotionCountRef.current = {};
    detectorRef.current?.reset();
    setZoneProgress(MOUTH_ZONES.map(zone => ({
      zoneId: zone.id,
      cleaningProgress: 0,
      isComplete: false
    })));
    setMotionResults(MOUTH_ZONES.map(zone => ({
      zoneId: zone.id,
      motionLevel: 0,
      hasMotion: false
    })));
  }, []);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const overallProgress = zoneProgress.reduce((sum, z) => sum + z.cleaningProgress, 0) / zoneProgress.length;
  const isComplete = zoneProgress.every(z => z.isComplete);

  return {
    zoneProgress,
    motionResults,
    overallProgress,
    isComplete,
    startDetection,
    stopDetection,
    reset,
    setFaceRegion,
    setDebugMode,
    getDebugInfo
  };
}
