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

interface TFJSDetector {
  estimateFaces: (video: HTMLVideoElement) => Promise<Array<{
    box: { xMin: number; yMin: number; width: number; height: number }
  }>>;
}

declare global {
  interface Window {
    FaceDetector?: new (options?: { maxDetectedFaces?: number; fastMode?: boolean }) => FaceDetectorType;
  }
}

type DetectorType = 'native' | 'tfjs' | 'fallback';

export function useFaceTracking(): UseFaceTrackingReturn {
  const [facePosition, setFacePosition] = useState<FacePosition | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const nativeDetectorRef = useRef<FaceDetectorType | null>(null);
  const tfjsDetectorRef = useRef<TFJSDetector | null>(null);
  const detectorTypeRef = useRef<DetectorType>('fallback');
  const animationFrameRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prevFrameRef = useRef<ImageData | null>(null);
  const lastPositionRef = useRef<FacePosition | null>(null);
  const lastGoodXRef = useRef<number | null>(null);
  const motionFramesRef = useRef<number>(0);
  const isDetectingRef = useRef<boolean>(false);
  const isRunningRef = useRef<boolean>(false);
  const initPromiseRef = useRef<Promise<boolean> | null>(null);

  const initDetector = useCallback(async (): Promise<boolean> => {
    if (initPromiseRef.current) {
      return initPromiseRef.current;
    }

    const init = async (): Promise<boolean> => {
      setIsLoading(true);
      console.log('[FaceTracking] Initializing detector...');

      if ('FaceDetector' in window && window.FaceDetector) {
        try {
          const detector = new window.FaceDetector({
            maxDetectedFaces: 1,
            fastMode: true
          });
          await detector.detect(document.createElement('canvas'));
          nativeDetectorRef.current = detector;
          detectorTypeRef.current = 'native';
          setIsLoading(false);
          console.log('[FaceTracking] Using native FaceDetector API');
          return true;
        } catch (e) {
          console.warn('[FaceTracking] Native FaceDetector not available:', e);
        }
      }

      try {
        console.log('[FaceTracking] Loading TensorFlow.js...');
        const tf = await import('@tensorflow/tfjs');
        await tf.ready();

        try {
          await tf.setBackend('webgl');
          console.log('[FaceTracking] Using WebGL backend');
        } catch {
          console.log('[FaceTracking] WebGL failed, trying CPU backend');
          await tf.setBackend('cpu');
        }

        console.log('[FaceTracking] Loading face detection model...');
        const faceLandmarksDetection = await import('@tensorflow-models/face-landmarks-detection');

        const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
        const detector = await faceLandmarksDetection.createDetector(model, {
          runtime: 'tfjs',
          refineLandmarks: false,
          maxFaces: 1
        });

        tfjsDetectorRef.current = detector;
        detectorTypeRef.current = 'tfjs';
        setIsLoading(false);
        console.log('[FaceTracking] Using TensorFlow.js FaceMesh');
        return true;
      } catch (error) {
        console.warn('[FaceTracking] TensorFlow.js face tracking failed:', error);
        detectorTypeRef.current = 'fallback';
        setIsLoading(false);
        setIsSupported(false);
        console.log('[FaceTracking] Using center-of-frame fallback');
        return true;
      }
    };

    initPromiseRef.current = init();
    return initPromiseRef.current;
  }, []);

  const smoothPosition = useCallback((newPos: FacePosition): FacePosition => {
    const last = lastPositionRef.current;
    if (!last) {
      lastPositionRef.current = newPos;
      return newPos;
    }

    const dx = Math.abs(newPos.x - last.x);
    const dy = Math.abs(newPos.y - last.y);
    const movement = dx + dy;
    
    if (movement < 15) {
      return last;
    }
    
    const smoothing = movement > 50 ? 0.7 : movement > 25 ? 0.4 : 0.2;
    
    const smoothed = {
      x: last.x + (newPos.x - last.x) * smoothing,
      y: last.y + (newPos.y - last.y) * smoothing,
      width: last.width + (newPos.width - last.width) * 0.2,
      height: last.height + (newPos.height - last.height) * 0.2,
      rotation: newPos.rotation
    };
    lastPositionRef.current = smoothed;
    return smoothed;
  }, []);

  const detectWithMotion = useCallback((video: HTMLVideoElement): FacePosition | null => {
    if (!canvasRef.current) {
      canvasRef.current = document.createElement('canvas');
    }

    const canvas = canvasRef.current;
    const scale = 0.2;
    const width = Math.floor(video.videoWidth * scale);
    const height = Math.floor(video.videoHeight * scale);

    if (canvas.width !== width) canvas.width = width;
    if (canvas.height !== height) canvas.height = height;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return null;

    ctx.drawImage(video, 0, 0, width, height);
    const currentFrame = ctx.getImageData(0, 0, width, height);
    const data = currentFrame.data;

    let motionX = 0;
    let motionY = 0;
    let motionWeight = 0;
    const motionColumns = new Array(width).fill(0);
    
    let skinX = 0;
    let skinY = 0;
    let skinWeight = 0;
    
    const prevData = prevFrameRef.current?.data;
    const upperRegion = Math.floor(height * 0.6);

    for (let y = 0; y < upperRegion; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const isBright = (r + g + b) > 200;

        if (isBright) {
          const topBias = 1 + (1 - y / upperRegion);
          skinWeight += topBias;
          skinX += x * topBias;
          skinY += y * topBias;
        }

        if (prevData) {
          const pr = prevData[i];
          const pg = prevData[i + 1];
          const pb = prevData[i + 2];
          const diff = Math.abs(r - pr) + Math.abs(g - pg) + Math.abs(b - pb);
          
          if (diff > 40) {
            const weight = diff * (1 + (1 - y / upperRegion));
            motionWeight += weight;
            motionX += x * weight;
            motionY += y * weight;
            motionColumns[x] += diff;
          }
        }
      }
    }

    prevFrameRef.current = currentFrame;
    
    const lastPos = lastPositionRef.current;
    let estimatedFaceWidth: number;
    
    if (motionWeight > 20000) {
      const motionCenterX = Math.floor(motionX / motionWeight);
      const maxMotion = Math.max(...motionColumns);
      const threshold = maxMotion * 0.15;
      
      let leftEdge = motionCenterX;
      let rightEdge = motionCenterX;
      
      for (let x = motionCenterX; x >= 0 && motionCenterX - x < width * 0.4; x--) {
        if (motionColumns[x] >= threshold) leftEdge = x;
        else if (x < motionCenterX - 5) break;
      }
      
      for (let x = motionCenterX; x < width && x - motionCenterX < width * 0.4; x++) {
        if (motionColumns[x] >= threshold) rightEdge = x;
        else if (x > motionCenterX + 5) break;
      }
      
      const motionSpan = (rightEdge - leftEdge) / scale;
      const minW = video.videoWidth * 0.1;
      const maxW = video.videoWidth * 0.4;
      estimatedFaceWidth = Math.max(minW, Math.min(maxW, motionSpan * 1.5));
      
      console.log(`[FaceTracking] Motion: center=${motionCenterX}, span=${motionSpan.toFixed(0)}px → faceW: ${estimatedFaceWidth.toFixed(0)}`);
    } else if (lastPos) {
      estimatedFaceWidth = lastPos.width;
    } else {
      estimatedFaceWidth = video.videoWidth * 0.2;
    }

    const faceX = video.videoWidth / 2;
    let method: string;

    if (motionWeight > 20000) {
      method = 'motion';
    } else if (skinWeight > 100) {
      method = 'skin';
    } else {
      method = 'center';
    }
    
    let faceY: number;
    if (motionWeight > 20000) {
      const motionCenterY = (motionY / motionWeight) / scale;
      faceY = Math.max(video.videoHeight * 0.05, motionCenterY * 0.6);
    } else if (skinWeight > 100) {
      const skinCenterY = (skinY / skinWeight) / scale;
      faceY = Math.max(video.videoHeight * 0.05, skinCenterY * 0.5);
    } else {
      faceY = video.videoHeight * 0.15;
    }

    console.log(`[FaceTracking] Fallback (${method}): x=${faceX.toFixed(0)}, y=${faceY.toFixed(0)}, w=${estimatedFaceWidth.toFixed(0)}`);

    return {
      x: faceX,
      y: faceY,
      width: estimatedFaceWidth,
      height: estimatedFaceWidth * 1.2,
      rotation: 0
    };
  }, []);

  const detect = useCallback(async () => {
    if (!videoRef.current || isDetectingRef.current) return;

    const video = videoRef.current;
    if (video.readyState < 2 || video.videoWidth === 0) {
      return;
    }

    isDetectingRef.current = true;

    try {
      let newPosition: FacePosition | null = null;

      if (detectorTypeRef.current === 'native' && nativeDetectorRef.current) {
        try {
          const faces = await nativeDetectorRef.current.detect(video);

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
        } catch (error) {
          console.warn('[FaceTracking] Native detection error:', error);
        }
      } else if (detectorTypeRef.current === 'tfjs' && tfjsDetectorRef.current) {
        try {
          const faces = await tfjsDetectorRef.current.estimateFaces(video);
          
          if (faces.length === 0) {
            // Silent - don't log every empty detection
          } else {
            console.log('[FaceTracking] TFJS found', faces.length, 'face(s)');
            const face = faces[0] as Record<string, unknown>;
            console.log('[FaceTracking] TFJS face keys:', Object.keys(face));
            
            const box = (face.box || face.boundingBox) as { xMin?: number; yMin?: number; xMax?: number; yMax?: number; width?: number; height?: number } | undefined;
            
            if (box) {
              const xMin = box.xMin ?? 0;
              const yMin = box.yMin ?? 0;
              const boxWidth = box.width ?? (box.xMax ? box.xMax - xMin : 100);
              const boxHeight = box.height ?? (box.yMax ? box.yMax - yMin : 100);
              
              console.log('[FaceTracking] TFJS box:', { xMin, yMin, w: boxWidth, h: boxHeight });
              
              newPosition = {
                x: xMin + boxWidth / 2,
                y: yMin,
                width: Math.min(boxWidth, video.videoWidth * 0.8),
                height: Math.min(boxHeight, video.videoHeight * 0.8),
                rotation: 0
              };
            }
          }
        } catch (error) {
          console.warn('[FaceTracking] TFJS detection error:', error);
        }
      }

      if (!newPosition) {
        newPosition = detectWithMotion(video);
      }

      if (newPosition) {
        const smoothed = smoothPosition(newPosition);
        setFacePosition(smoothed);
      } else if (lastPositionRef.current) {
        setFacePosition(lastPositionRef.current);
      }
    } catch (error) {
      console.warn('[FaceTracking] Detection error:', error);
    } finally {
      isDetectingRef.current = false;
    }
  }, [detectWithMotion, smoothPosition]);

  const startTracking = useCallback(async (video: HTMLVideoElement) => {
    console.log('[FaceTracking] Starting tracking');
    videoRef.current = video;
    isRunningRef.current = true;

    await initDetector();

    const runDetectionLoop = async () => {
      if (!isRunningRef.current) return;

      await detect();

      if (isRunningRef.current) {
        const interval = detectorTypeRef.current === 'tfjs' ? 150 : 100;
        animationFrameRef.current = window.setTimeout(() => {
          requestAnimationFrame(runDetectionLoop);
        }, interval) as unknown as number;
      }
    };

    runDetectionLoop();
  }, [initDetector, detect]);

  const stopTracking = useCallback(() => {
    console.log('[FaceTracking] Stopping tracking');
    isRunningRef.current = false;
    
    if (animationFrameRef.current) {
      clearTimeout(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    lastPositionRef.current = null;
    setFacePosition(null);
  }, []);

  useEffect(() => {
    return () => {
      isRunningRef.current = false;
      if (animationFrameRef.current) {
        clearTimeout(animationFrameRef.current);
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
