import { useRef, useState, useCallback, useEffect } from 'react';

interface UseCameraOptions {
  facingMode?: 'user' | 'environment';
  width?: number;
  height?: number;
}

interface UseCameraReturn {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  stream: MediaStream | null;
  isReady: boolean;
  error: string | null;
  startCamera: () => Promise<void>;
  stopCamera: () => void;
  captureFrame: () => string | null;
}

export function useCamera(options: UseCameraOptions = {}): UseCameraReturn {
  const { facingMode = 'user', width = 640, height = 480 } = options;
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const attachStreamToVideo = useCallback((mediaStream: MediaStream) => {
    if (!videoRef.current) {
      console.warn('Video element not available yet');
      return false;
    }
    
    try {
      videoRef.current.srcObject = mediaStream;
      
      videoRef.current.onloadedmetadata = () => {
        if (videoRef.current) {
          videoRef.current.play()
            .then(() => {
              setIsReady(true);
              console.log('Camera started successfully');
            })
            .catch(err => {
              console.error('Error playing video:', err);
              setError('Failed to play video stream');
            });
        }
      };
      
      videoRef.current.onerror = () => {
        setError('Video element error');
      };
      
      return true;
    } catch (err) {
      console.error('Error attaching stream:', err);
      return false;
    }
  }, []);

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      setIsReady(false);
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      
      console.log('Requesting camera access...');
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode,
          width: { ideal: width },
          height: { ideal: height }
        },
        audio: false
      });
      
      console.log('Camera access granted, tracks:', mediaStream.getVideoTracks().length);
      streamRef.current = mediaStream;
      setStream(mediaStream);
      
      attachStreamToVideo(mediaStream);
    } catch (err) {
      let message = 'Failed to access camera';
      
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError') {
          message = 'Camera permission denied. Please allow camera access in your browser settings.';
        } else if (err.name === 'NotFoundError') {
          message = 'No camera found. Please make sure your device has a camera.';
        } else if (err.name === 'NotReadableError') {
          message = 'Camera is being used by another application. Please close other apps using the camera.';
        } else {
          message = err.message;
        }
      }
      
      setError(message);
      console.error('Camera error:', err);
    }
  }, [facingMode, width, height, attachStreamToVideo]);

  useEffect(() => {
    if (stream && videoRef.current && !videoRef.current.srcObject) {
      attachStreamToVideo(stream);
    }
  }, [stream, attachStreamToVideo]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
        console.log('Stopped camera track:', track.label);
      });
      streamRef.current = null;
    }
    setStream(null);
    setIsReady(false);
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  const captureFrame = useCallback((): string | null => {
    if (!videoRef.current || !isReady) return null;
    
    if (!canvasRef.current) {
      canvasRef.current = document.createElement('canvas');
    }
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      console.warn('Video dimensions not available');
      return null;
    }
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    
    ctx.drawImage(video, 0, 0);
    return canvas.toDataURL('image/jpeg', 0.8);
  }, [isReady]);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return {
    videoRef,
    stream,
    isReady,
    error,
    startCamera,
    stopCamera,
    captureFrame
  };
}
