import { useRef, useState, useCallback, useEffect } from 'react';

interface FacePosition {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
}

interface UseFaceTrackingReturn {
  facePosition: FacePosition | null;
  isLoading: boolean;
  isSupported: boolean;
  startTracking: (video: HTMLVideoElement) => void;
  stopTracking: () => void;
}

interface FaceDetectorType {
  detect: (source: HTMLVideoElement) => Promise<Array<{
    boundingBox: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
  }>>;
}

declare global {
  interface Window {
    FaceDetector?: new (options?: { maxDetectedFaces?: number; fastMode?: boolean }) => FaceDetectorType;
  }
}

export function useFaceTracking(): UseFaceTrackingReturn {
  const [facePosition, setFacePosition] = useState<FacePosition | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSupported, _setIsSupported] = useState(true);
  void _setIsSupported;
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const detectorRef = useRef<FaceDetectorType | unknown>(null);
  const animationFrameRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const lastPositionRef = useRef<FacePosition | null>(null);
  const useNativeDetector = useRef<boolean>(false);
  const detectionIntervalRef = useRef<number | null>(null);

  const initDetector = useCallback(async () => {
    setIsLoading(true);
    
    if ('FaceDetector' in window && window.FaceDetector) {
      try {
        const detector = new window.FaceDetector({ 
          maxDetectedFaces: 1, 
          fastMode: true 
        });
        detectorRef.current = detector;
        useNativeDetector.current = true;
        setIsLoading(false);
        console.log('[FaceTracking] Using native FaceDetector API');
        return true;
      } catch (e) {
        console.warn('[FaceTracking] Native FaceDetector failed:', e);
      }
    }
    
    try {
      const [tf, faceLandmarksDetection] = await Promise.all([
        import('@tensorflow/tfjs'),
        import('@tensorflow-models/face-landmarks-detection')
      ]);
      
      await tf.ready();
      await tf.setBackend('webgl');
      
      const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
      const detector = await faceLandmarksDetection.createDetector(model, {
        runtime: 'tfjs',
        refineLandmarks: false,
        maxFaces: 1
      });
      
      detectorRef.current = detector;
      useNativeDetector.current = false;
      setIsLoading(false);
      console.log('[FaceTracking] Using TensorFlow.js FaceMesh');
      return true;
    } catch (error) {
      console.warn('[FaceTracking] TensorFlow face tracking failed, using fallback:', error);
      setIsLoading(false);
      useNativeDetector.current = false;
      detectorRef.current = 'fallback';
      return true;
    }
  }, []);

  const smoothPosition = useCallback((newPos: FacePosition): FacePosition => {
    const last = lastPositionRef.current;
    if (!last) {
      lastPositionRef.current = newPos;
      return newPos;
    }
    
    const smoothing = 0.3;
    const smoothed = {
      x: last.x + (newPos.x - last.x) * smoothing,
      y: last.y + (newPos.y - last.y) * smoothing,
      width: last.width + (newPos.width - last.width) * smoothing,
      height: last.height + (newPos.height - last.height) * smoothing,
      rotation: newPos.rotation
    };
    lastPositionRef.current = smoothed;
    return smoothed;
  }, []);

  const detectWithFallback = useCallback((video: HTMLVideoElement): FacePosition | null => {
    if (!canvasRef.current) {
      canvasRef.current = document.createElement('canvas');
    }
    
    const canvas = canvasRef.current;
    const scale = 0.15;
    const width = Math.floor(video.videoWidth * scale);
    const height = Math.floor(video.videoHeight * scale);
    
    if (canvas.width !== width) canvas.width = width;
    if (canvas.height !== height) canvas.height = height;
    
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return null;
    
    ctx.drawImage(video, 0, 0, width, height);
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    
    let minX = width, maxX = 0, minY = height, maxY = 0;
    let skinPixelCount = 0;
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        const isSkin = r > 95 && g > 40 && b > 20 &&
                       r > g && r > b &&
                       Math.abs(r - g) > 15 &&
                       r - g > 15 && r - b > 15;
        
        if (isSkin) {
          skinPixelCount++;
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    
    const minSkinPixels = width * height * 0.05;
    if (skinPixelCount < minSkinPixels) {
      return null;
    }
    
    const faceWidth = (maxX - minX) / scale;
    const faceHeight = (maxY - minY) / scale;
    const faceX = (minX + (maxX - minX) / 2) / scale;
    const faceY = minY / scale;
    
    return {
      x: faceX,
      y: faceY,
      width: faceWidth,
      height: faceHeight,
      rotation: 0
    };
  }, []);

  const detect = useCallback(async () => {
    if (!videoRef.current) return;
    
    const video = videoRef.current;
    if (video.readyState < 2 || video.videoWidth === 0) {
      return;
    }

    try {
      let newPosition: FacePosition | null = null;
      
      if (useNativeDetector.current && detectorRef.current && typeof (detectorRef.current as FaceDetectorType).detect === 'function') {
        const detector = detectorRef.current as FaceDetectorType;
        const faces = await detector.detect(video);
        
        if (faces.length > 0) {
          const box = faces[0].boundingBox;
          newPosition = {
            x: box.x + box.width / 2,
            y: box.y,
            width: box.width,
            height: box.height,
            rotation: 0
          };
        }
      } else if (detectorRef.current && detectorRef.current !== 'fallback') {
        const detector = detectorRef.current as { 
          estimateFaces: (video: HTMLVideoElement) => Promise<Array<{ 
            box: { xMin: number; yMin: number; width: number; height: number } 
          }>> 
        };
        const faces = await detector.estimateFaces(video);
        
        if (faces.length > 0) {
          const box = faces[0].box;
          newPosition = {
            x: box.xMin + box.width / 2,
            y: box.yMin,
            width: box.width,
            height: box.height,
            rotation: 0
          };
        }
      } else {
        newPosition = detectWithFallback(video);
      }
      
      if (newPosition) {
        const smoothed = smoothPosition(newPosition);
        setFacePosition(smoothed);
      } else if (lastPositionRef.current) {
        setFacePosition(lastPositionRef.current);
      }
    } catch (error) {
      console.warn('[FaceTracking] Detection error:', error);
      const fallback = detectWithFallback(video);
      if (fallback) {
        const smoothed = smoothPosition(fallback);
        setFacePosition(smoothed);
      }
    }
  }, [detectWithFallback, smoothPosition]);

  const startTracking = useCallback(async (video: HTMLVideoElement) => {
    console.log('[FaceTracking] Starting tracking');
    videoRef.current = video;
    
    if (!detectorRef.current) {
      await initDetector();
    }
    
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current);
    }
    
    const runDetection = () => {
      detect();
      animationFrameRef.current = requestAnimationFrame(() => {
        setTimeout(runDetection, 100);
      });
    };
    
    runDetection();
  }, [initDetector, detect]);

  const stopTracking = useCallback(() => {
    console.log('[FaceTracking] Stopping tracking');
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current);
      detectionIntervalRef.current = null;
    }
    lastPositionRef.current = null;
    setFacePosition(null);
  }, []);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current);
      }
    };
  }, []);

  return {
    facePosition,
    isLoading,
    isSupported,
    startTracking,
    stopTracking
  };
}
