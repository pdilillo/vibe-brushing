import { useEffect, useRef, useCallback, useState } from 'react';
import { useSharedCamera } from '../../contexts/CameraContext';
import { HatGraphic } from '../HatGraphic';
import type { Hat } from '../../types';

interface FacePosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface CameraViewProps {
  selectedHat: Hat | null;
  facePosition?: FacePosition | null;
  onVideoReady?: (video: HTMLVideoElement) => void;
}

export function CameraView({ selectedHat, facePosition, onVideoReady }: CameraViewProps) {
  const { isReady, error, registerVideoElement } = useSharedCamera();
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hasCalledOnReady = useRef(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [videoSize, setVideoSize] = useState({ width: 640, height: 480 });

  const setVideoRef = useCallback((el: HTMLVideoElement | null) => {
    console.log('[CameraView] Video ref callback:', { hasElement: !!el });
    localVideoRef.current = el;
    if (el) {
      registerVideoElement(el);
    }
  }, [registerVideoElement]);

  useEffect(() => {
    const video = localVideoRef.current;
    if (!video || !isReady || hasCalledOnReady.current) return;
    
    if (video.readyState >= 2 && video.videoWidth > 0) {
      console.log('[CameraView] Video ready, calling onVideoReady');
      hasCalledOnReady.current = true;
      setVideoSize({ width: video.videoWidth, height: video.videoHeight });
      onVideoReady?.(video);
    }
  }, [isReady, onVideoReady]);

  useEffect(() => {
    const video = localVideoRef.current;
    if (!video || hasCalledOnReady.current) return;

    const checkReady = () => {
      if (video.readyState >= 2 && video.videoWidth > 0 && !hasCalledOnReady.current) {
        console.log('[CameraView] Video ready (from polling), calling onVideoReady');
        hasCalledOnReady.current = true;
        setVideoSize({ width: video.videoWidth, height: video.videoHeight });
        onVideoReady?.(video);
      }
    };

    const interval = setInterval(checkReady, 100);
    checkReady();

    return () => clearInterval(interval);
  }, [onVideoReady]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateSize = () => {
      setContainerSize({
        width: container.clientWidth,
        height: container.clientHeight
      });
    };

    updateSize();
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    console.log('[CameraView] Mounted/Updated', {
      hasVideoRef: !!localVideoRef.current,
      isReady,
      error,
      videoReadyState: localVideoRef.current?.readyState,
      videoPaused: localVideoRef.current?.paused,
      videoWidth: localVideoRef.current?.videoWidth,
      videoHeight: localVideoRef.current?.videoHeight,
      srcObject: !!localVideoRef.current?.srcObject,
    });
  });

  return (
    <div ref={containerRef} className="relative w-full aspect-[4/3] max-h-[35vh] bg-purple-900/30 rounded-2xl overflow-hidden">
      <video
        ref={setVideoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-contain transform scale-x-[-1]"
      />
      
      {!isReady && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-purple-900/50">
          <div className="text-lg text-purple-300 animate-pulse">
            Connecting...
          </div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-900/50 p-4">
          <div className="text-center">
            <div className="text-4xl mb-2">📷</div>
            <div className="text-red-300">{error}</div>
          </div>
        </div>
      )}
      
      {selectedHat && isReady && containerSize.width > 0 && (
        <HatGraphic
          hat={selectedHat}
          facePosition={facePosition || null}
          containerWidth={containerSize.width}
          containerHeight={containerSize.height}
          videoWidth={videoSize.width}
          videoHeight={videoSize.height}
        />
      )}
      
      <div className="absolute bottom-2 left-2 right-2 flex justify-center">
        <div className="bg-black/50 rounded-full px-3 py-1 text-xs text-white">
          Move your brush to clean!
        </div>
      </div>
    </div>
  );
}
