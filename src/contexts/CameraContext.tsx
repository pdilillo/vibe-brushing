import React, { createContext, useContext, useRef, useState, useCallback, useEffect } from 'react';

interface CameraContextType {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  stream: MediaStream | null;
  isReady: boolean;
  error: string | null;
  startCamera: () => Promise<void>;
  stopCamera: () => void;
  captureFrame: () => string | null;
  registerVideoElement: (video: HTMLVideoElement | null) => void;
}

const CameraContext = createContext<CameraContextType | null>(null);

export function CameraProvider({ children }: { children: React.ReactNode }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const isStartingRef = useRef(false);
  const lastAttachedVideoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const attachStreamToVideo = useCallback((targetVideo?: HTMLVideoElement | null) => {
    const video = targetVideo || videoRef.current;
    const mediaStream = streamRef.current;
    
    console.log('[CameraContext] attachStreamToVideo called:', {
      hasVideo: !!video,
      hasStream: !!mediaStream,
      videoId: video?.id,
      streamActive: mediaStream?.active,
      streamTracks: mediaStream?.getTracks().map(t => ({ kind: t.kind, enabled: t.enabled, readyState: t.readyState })),
      isSameAsLastAttached: video === lastAttachedVideoRef.current,
    });
    
    if (!video || !mediaStream) {
      console.warn('[CameraContext] Video or stream not available');
      return false;
    }
    
    if (video.srcObject === mediaStream && video === lastAttachedVideoRef.current) {
      console.log('[CameraContext] Stream already attached to this video element');
      if (video.readyState >= 2 && !video.paused) {
        setIsReady(true);
      }
      return true;
    }
    
    try {
      console.log('[CameraContext] Attaching stream to video element...');
      video.srcObject = mediaStream;
      lastAttachedVideoRef.current = video;
      
      const handleCanPlay = () => {
        console.log('[CameraContext] Video can play, attempting to play...');
        video.play()
          .then(() => {
            console.log('[CameraContext] Video playing successfully');
            setIsReady(true);
          })
          .catch(err => {
            console.error('[CameraContext] Error playing video:', err);
          });
      };

      video.oncanplay = handleCanPlay;
      video.onloadeddata = handleCanPlay;
      
      if (video.readyState >= 3) {
        handleCanPlay();
      } else {
        video.load();
      }
      
      video.onerror = () => {
        console.error('[CameraContext] Video element error');
        setError('Video element error');
      };
      
      return true;
    } catch (err) {
      console.error('[CameraContext] Error attaching stream:', err);
      return false;
    }
  }, []);

  const startCamera = useCallback(async () => {
    if (isStartingRef.current) {
      console.log('startCamera already in progress, skipping...');
      return;
    }
    
    if (streamRef.current && isReady) {
      console.log('Camera already running and ready');
      return;
    }
    
    if (streamRef.current && videoRef.current) {
      console.log('Stream exists, reattaching...');
      attachStreamToVideo();
      return;
    }
    
    if (streamRef.current && !videoRef.current) {
      console.log('Stream exists but no video element, waiting...');
      return;
    }
    
    isStartingRef.current = true;
    
    try {
      setError(null);
      setIsReady(false);
      
      console.log('Requesting camera access...');
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 640 },
          height: { ideal: 480 }
        },
        audio: false
      });
      
      console.log('Camera access granted, tracks:', mediaStream.getVideoTracks().length);
      streamRef.current = mediaStream;
      setStream(mediaStream);
      
      setTimeout(() => {
        attachStreamToVideo();
        isStartingRef.current = false;
      }, 100);
      
    } catch (err) {
      isStartingRef.current = false;
      let message = 'Failed to access camera';
      
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError') {
          message = 'Camera permission denied. Please allow camera access.';
        } else if (err.name === 'NotFoundError') {
          message = 'No camera found on this device.';
        } else if (err.name === 'NotReadableError') {
          message = 'Camera is being used by another app.';
        } else {
          message = err.message;
        }
      }
      
      setError(message);
      console.error('Camera error:', err);
    }
  }, [isReady, attachStreamToVideo]);

  useEffect(() => {
    console.log('[CameraContext] Stream/video effect:', {
      hasStream: !!stream,
      hasVideoRef: !!videoRef.current,
      videoSrcObject: !!videoRef.current?.srcObject,
      isReady,
    });
    
    if (!stream || !videoRef.current) return;
    
    if (!videoRef.current.srcObject) {
      console.log('[CameraContext] Effect: video element needs stream attached');
      attachStreamToVideo();
    }
  }, [stream, attachStreamToVideo, isReady]);

  useEffect(() => {
    if (!stream || isReady) return;
    
    const video = videoRef.current;
    if (!video) return;
    
    const checkReady = () => {
      if (video.readyState >= 2 && video.videoWidth > 0 && !video.paused) {
        console.log('Polling detected video is ready');
        setIsReady(true);
        return true;
      }
      return false;
    };
    
    if (checkReady()) return;
    
    const pollInterval = setInterval(() => {
      if (checkReady()) {
        clearInterval(pollInterval);
      }
    }, 200);
    
    const timeout = setTimeout(() => {
      clearInterval(pollInterval);
    }, 5000);
    
    return () => {
      clearInterval(pollInterval);
      clearTimeout(timeout);
    };
  }, [stream, isReady]);

  const stopCamera = useCallback(() => {
    console.log('Stopping camera...');
    isStartingRef.current = false;
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
      });
      streamRef.current = null;
    }
    setStream(null);
    setIsReady(false);
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  const registerVideoElement = useCallback((video: HTMLVideoElement | null) => {
    console.log('[CameraContext] registerVideoElement called:', {
      hasVideo: !!video,
      hasStream: !!streamRef.current,
      isDifferentElement: video !== lastAttachedVideoRef.current,
    });
    
    if (!video) return;
    
    videoRef.current = video;
    
    if (streamRef.current && video !== lastAttachedVideoRef.current) {
      console.log('[CameraContext] New video element detected, re-attaching stream...');
      setIsReady(false);
      attachStreamToVideo(video);
    }
  }, [attachStreamToVideo]);

  const captureFrame = useCallback((): string | null => {
    if (!videoRef.current) return null;
    
    const video = videoRef.current;
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      return null;
    }
    
    if (!canvasRef.current) {
      canvasRef.current = document.createElement('canvas');
    }
    
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    
    ctx.drawImage(video, 0, 0);
    return canvas.toDataURL('image/jpeg', 0.8);
  }, []);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <CameraContext.Provider value={{
      videoRef,
      stream,
      isReady,
      error,
      startCamera,
      stopCamera,
      captureFrame,
      registerVideoElement
    }}>
      {children}
    </CameraContext.Provider>
  );
}

export function useSharedCamera() {
  const context = useContext(CameraContext);
  if (!context) {
    throw new Error('useSharedCamera must be used within a CameraProvider');
  }
  return context;
}
