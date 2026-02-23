import { useEffect, useRef, useState, useCallback } from 'react';
import { useSharedCamera } from '../contexts/CameraContext';
import { useFaceTracking } from '../hooks/useFaceTracking';
import { HatGraphic } from './HatGraphic';
import type { Hat } from '../types';

const DEBUG_HATS: Hat[] = [
  { id: 'cowboy', name: 'Cowboy Hat', rarity: 'common', unlocked: true },
  { id: 'crown', name: 'Royal Crown', rarity: 'rare', unlocked: true },
  { id: 'tophat', name: 'Top Hat', rarity: 'common', unlocked: true },
  { id: 'wizard', name: 'Wizard Hat', rarity: 'epic', unlocked: true },
  { id: 'cap', name: 'Baseball Cap', rarity: 'common', unlocked: true },
];

interface HatDebugProps {
  onBack: () => void;
}

export function HatDebug({ onBack }: HatDebugProps) {
  const { isReady, error, registerVideoElement, startCamera } = useSharedCamera();
  const { facePosition, isLoading, startTracking, stopTracking } = useFaceTracking();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedHat, setSelectedHat] = useState<Hat>(DEBUG_HATS[0]);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [videoSize, setVideoSize] = useState({ width: 640, height: 480 });
  const [showDebugInfo, setShowDebugInfo] = useState(true);

  useEffect(() => {
    startCamera();
  }, [startCamera]);

  const setVideoRef = useCallback((el: HTMLVideoElement | null) => {
    videoRef.current = el;
    if (el) {
      registerVideoElement(el);
    }
  }, [registerVideoElement]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isReady) return;

    const checkReady = () => {
      if (video.readyState >= 2 && video.videoWidth > 0) {
        setVideoSize({ width: video.videoWidth, height: video.videoHeight });
        startTracking(video);
      }
    };

    const interval = setInterval(checkReady, 100);
    checkReady();

    return () => {
      clearInterval(interval);
      stopTracking();
    };
  }, [isReady, startTracking, stopTracking]);

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

  const scaleX = containerSize.width / videoSize.width;
  const scaleY = containerSize.height / videoSize.height;

  const faceRect = facePosition ? {
    x: (videoSize.width - facePosition.x - facePosition.width / 2) * scaleX,
    y: facePosition.y * scaleY,
    width: facePosition.width * scaleX,
    height: facePosition.height * scaleY,
  } : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-purple-800 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-purple-700 hover:bg-purple-600 rounded-lg text-white"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold text-white">Hat Debug Mode</h1>
          <button
            onClick={() => setShowDebugInfo(!showDebugInfo)}
            className={`px-4 py-2 rounded-lg text-white ${showDebugInfo ? 'bg-green-600' : 'bg-gray-600'}`}
          >
            {showDebugInfo ? 'Debug ON' : 'Debug OFF'}
          </button>
        </div>

        <div 
          ref={containerRef}
          className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden mb-4"
        >
          <video
            ref={setVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-contain transform scale-x-[-1]"
          />

          {!isReady && !error && (
            <div className="absolute inset-0 flex items-center justify-center bg-purple-900/70">
              <div className="text-purple-200 text-center p-4 animate-pulse">
                Connecting to camera...
              </div>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-red-900/70">
              <div className="text-red-200 text-center p-4">{error}</div>
            </div>
          )}

          {isLoading && (
            <div className="absolute top-4 left-4 bg-yellow-500/80 px-3 py-1 rounded text-sm">
              Loading face detection...
            </div>
          )}

          {showDebugInfo && faceRect && (
            <div
              className="absolute border-2 border-green-400 pointer-events-none"
              style={{
                left: `${faceRect.x}px`,
                top: `${faceRect.y}px`,
                width: `${faceRect.width}px`,
                height: `${faceRect.height}px`,
              }}
            >
              <div className="absolute -top-6 left-0 bg-green-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                Face: {facePosition?.x.toFixed(0)}, {facePosition?.y.toFixed(0)} | {facePosition?.width.toFixed(0)}x{facePosition?.height.toFixed(0)}
              </div>
            </div>
          )}

          {showDebugInfo && facePosition && (
            <div
              className="absolute w-3 h-3 bg-red-500 rounded-full border-2 border-white pointer-events-none"
              style={{
                left: `${(videoSize.width - facePosition.x) * scaleX}px`,
                top: `${facePosition.y * scaleY}px`,
                transform: 'translate(-50%, -50%)',
              }}
            />
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
        </div>

        <div className="bg-purple-800/50 rounded-xl p-4 mb-4">
          <h2 className="text-white font-semibold mb-3">Select Hat</h2>
          <div className="flex flex-wrap gap-2">
            {DEBUG_HATS.map((hat) => (
              <button
                key={hat.id}
                onClick={() => setSelectedHat(hat)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedHat.id === hat.id
                    ? 'bg-yellow-500 text-black font-bold'
                    : 'bg-purple-600 text-white hover:bg-purple-500'
                }`}
              >
                {hat.name}
              </button>
            ))}
          </div>
        </div>

        {showDebugInfo && (
          <div className="bg-gray-900/80 rounded-xl p-4 font-mono text-sm text-green-400">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-gray-400 mb-1">Video Size:</div>
                <div>{videoSize.width} x {videoSize.height}</div>
              </div>
              <div>
                <div className="text-gray-400 mb-1">Container Size:</div>
                <div>{containerSize.width.toFixed(0)} x {containerSize.height.toFixed(0)}</div>
              </div>
              <div>
                <div className="text-gray-400 mb-1">Face Position (video coords):</div>
                <div>
                  {facePosition 
                    ? `x: ${facePosition.x.toFixed(1)}, y: ${facePosition.y.toFixed(1)}`
                    : 'Not detected'}
                </div>
              </div>
              <div>
                <div className="text-gray-400 mb-1">Face Size:</div>
                <div>
                  {facePosition 
                    ? `${facePosition.width.toFixed(1)} x ${facePosition.height.toFixed(1)}`
                    : '-'}
                </div>
              </div>
            </div>
            <div className="mt-4 text-gray-500 text-xs">
              Green rectangle = detected face area | Red dot = hat anchor point
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
