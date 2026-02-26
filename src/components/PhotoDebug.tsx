import { useState, useRef, useCallback, useEffect } from 'react';
import { PhotoEditor } from './PhotoEditor';
import { ALL_CREATURES } from '../data/creatures';
import type { CapturedCreature } from '../types';

interface PhotoDebugProps {
  onBack: () => void;
}

const allCreaturesAsCaptured: CapturedCreature[] = ALL_CREATURES.map(creature => ({
  ...creature,
  capturedAt: new Date()
}));

export function PhotoDebug({ onBack }: PhotoDebugProps) {
  const [photo, setPhoto] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Camera error:', err);
      setCameraError('Could not access camera');
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  }, []);

  const takePhoto = useCallback(() => {
    if (!videoRef.current) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.drawImage(videoRef.current, 0, 0);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    setPhoto(dataUrl);
    stopCamera();
  }, [stopCamera]);

  useEffect(() => {
    if (!photo) {
      startCamera();
    }
    return () => {
      stopCamera();
    };
  }, [photo, startCamera, stopCamera]);

  if (photo) {
    return (
      <PhotoEditor
        photo={photo}
        capturedCreatures={allCreaturesAsCaptured}
        onDone={onBack}
        onBack={() => setPhoto(null)}
        debugMode
      />
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-shrink-0 flex items-center justify-between p-4 bg-purple-900/50 z-10">
        <button
          onClick={onBack}
          className="px-4 py-2 text-purple-300 bg-purple-800/50 rounded-xl"
        >
          ← Back
        </button>
        <h1 className="text-xl font-bold">Photo Debug</h1>
        <div className="w-20" />
      </div>

      <div className="flex-1 relative bg-black overflow-hidden min-h-0">
        {cameraError ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-red-400 mb-4">{cameraError}</p>
              <button
                onClick={startCamera}
                className="px-4 py-2 bg-purple-600 rounded-xl"
              >
                Retry
              </button>
            </div>
          </div>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover"
            style={{ transform: 'scaleX(-1)' }}
          />
        )}
      </div>

      <div className="flex-shrink-0 p-4 bg-purple-900/50 z-10">
        <button
          onClick={takePhoto}
          disabled={!!cameraError}
          className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl font-bold text-lg disabled:opacity-50"
        >
          Take Photo
        </button>
        <p className="text-center text-purple-300 text-sm mt-2">
          All {ALL_CREATURES.length} creatures will be available as stickers
        </p>
      </div>
    </div>
  );
}
