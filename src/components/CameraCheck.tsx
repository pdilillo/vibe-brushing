import { useEffect, useState, useRef, useCallback } from 'react';
import { useSharedCamera } from '../contexts/CameraContext';

interface CameraCheckProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export function CameraCheck({ onConfirm, onCancel }: CameraCheckProps) {
  const { isReady, error, startCamera, stopCamera, registerVideoElement } = useSharedCamera();
  const [showManualButton, setShowManualButton] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);
  const hasStartedRef = useRef(false);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);

  const setVideoRef = useCallback((el: HTMLVideoElement | null) => {
    console.log('[CameraCheck] Video ref callback:', { hasElement: !!el });
    localVideoRef.current = el;
    if (el) {
      registerVideoElement(el);
    }
  }, [registerVideoElement]);

  useEffect(() => {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      startCamera();
    }
  }, [startCamera]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowManualButton(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkVideo = () => {
      const video = localVideoRef.current;
      if (video && video.videoWidth > 0 && video.videoHeight > 0 && !video.paused) {
        setVideoVisible(true);
      }
    };
    
    const interval = setInterval(checkVideo, 200);
    checkVideo();
    
    return () => clearInterval(interval);
  }, []);

  const handleCancel = () => {
    stopCamera();
    onCancel();
  };

  const handleRetry = () => {
    hasStartedRef.current = false;
    stopCamera();
    setTimeout(() => {
      hasStartedRef.current = true;
      startCamera();
    }, 500);
  };

  const canContinue = isReady || videoVisible;

  return (
    <div className="flex flex-col h-full p-6">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold mb-2">Camera Check! 📷</h1>
        <p className="text-purple-200">
          Make sure you can see yourself below
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="relative w-full max-w-sm aspect-[3/4] bg-purple-900/50 rounded-2xl overflow-hidden mb-4">
          <video
            ref={setVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover transform scale-x-[-1]"
          />

          {!canContinue && !error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-purple-900/80">
              <div className="text-4xl mb-4 animate-bounce-gentle">📷</div>
              <div className="text-lg text-purple-200 animate-pulse">
                Starting camera...
              </div>
              <div className="text-sm text-purple-300 mt-2">
                Please allow camera access when prompted
              </div>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-900/80 p-4">
              <div className="text-4xl mb-4">❌</div>
              <div className="text-lg font-bold text-white mb-2">
                Camera Error
              </div>
              <div className="text-sm text-red-200 text-center mb-4">
                {error}
              </div>
              <div className="text-xs text-red-300 text-center">
                Please check that:
                <ul className="list-disc list-inside mt-2 text-left">
                  <li>Camera permissions are enabled</li>
                  <li>No other app is using the camera</li>
                  <li>Your browser supports camera access</li>
                </ul>
              </div>
            </div>
          )}

          {canContinue && (
            <div className="absolute bottom-4 left-4 right-4 flex justify-center">
              <div className="bg-green-600/90 rounded-full px-4 py-2 text-sm text-white flex items-center gap-2">
                <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                Camera is working!
              </div>
            </div>
          )}
        </div>

        {canContinue && (
          <div className="text-center text-purple-200 text-sm mb-4">
            Can you see yourself? 👆
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {canContinue && (
          <button
            onClick={onConfirm}
            className="w-full py-4 text-xl font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg active:scale-95 transition-transform"
          >
            Yes, I can see myself! ✅
          </button>
        )}
        
        {showManualButton && !canContinue && !error && (
          <button
            onClick={onConfirm}
            className="w-full py-4 text-xl font-bold text-white bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl shadow-lg active:scale-95 transition-transform"
          >
            Continue Anyway →
          </button>
        )}

        {error && (
          <button
            onClick={handleRetry}
            className="w-full py-4 text-xl font-bold text-white bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl shadow-lg active:scale-95 transition-transform"
          >
            Try Again 🔄
          </button>
        )}

        <button
          onClick={handleCancel}
          className="w-full py-3 text-lg text-purple-300 bg-purple-800/50 rounded-xl active:scale-95 transition-transform"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
