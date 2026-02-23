import { useRef, useState, useCallback, useEffect } from 'react';
import { MotionDetector, MOUTH_ZONES, type MotionResult, type FaceRegion } from '../services/motionDetector';
import type { ZoneProgress } from '../types';

interface UseMotionDetectionOptions {
  targetCleaningTime?: number;
  detectionInterval?: number;
  decayRate?: number;
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
}

export function useMotionDetection(options: UseMotionDetectionOptions = {}): UseMotionDetectionReturn {
  const { targetCleaningTime = 20, detectionInterval = 100, decayRate = 0.15 } = options;
  
  const detectorRef = useRef<MotionDetector | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const intervalRef = useRef<number | null>(null);
  const cleaningTimeRef = useRef<Record<string, number>>({});
  const noMotionCountRef = useRef<Record<string, number>>({});
  const faceRegionRef = useRef<FaceRegion | null>(null);
  
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

  const calculateProgress = useCallback(() => {
    const progress = MOUTH_ZONES.map(zone => {
      const time = cleaningTimeRef.current[zone.id] || 0;
      const percentage = Math.min((time / targetCleaningTime) * 100, 100);
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
    
    results.forEach(result => {
      const currentTime = cleaningTimeRef.current[result.zoneId] || 0;
      
      if (result.hasMotion) {
        noMotionCountRef.current[result.zoneId] = 0;
        const increment = (detectionInterval / 1000) * (result.motionLevel / 30);
        cleaningTimeRef.current[result.zoneId] = currentTime + increment;
      } else {
        const noMotionCount = (noMotionCountRef.current[result.zoneId] || 0) + 1;
        noMotionCountRef.current[result.zoneId] = noMotionCount;
        
        if (noMotionCount > 5 && currentTime > 0) {
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
    setFaceRegion
  };
}
