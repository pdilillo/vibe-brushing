import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useSharedCamera } from '../../contexts/CameraContext';
import { useMotionDetection } from '../../hooks/useMotionDetection';
import { useFaceTracking } from '../../hooks/useFaceTracking';
import { playSoundEffect, useRegionMusic } from '../../hooks/useAudio';
import { getRandomRegion } from '../../data/regions';
import { getRandomCreatureForScore } from '../../data/creatures';
import { getSessionDurationSeconds } from '../../services/settings';
import { CameraView } from './CameraView';
import { CreatureCleaning } from './CreatureCleaning';
import { RegionBackground } from './RegionBackground';
import { ZoneProgress } from './ZoneProgress';
import { Timer } from './Timer';
import type { Hat, ZoneProgress as ZoneProgressType, Region, Creature } from '../../types';

interface BrushingSessionProps {
  selectedHat: Hat | null;
  capturedCreatureIds: string[];
  onComplete: (results: {
    cleaningPercentage: number;
    zoneProgress: ZoneProgressType[];
    photos: string[];
    region: Region;
    creature: Creature | null;
  }) => void;
  onCancel: () => void;
}

const NO_MOTION_PAUSE_THRESHOLD = 3000;

function getPhotoIntervals(duration: number): number[] {
  if (duration <= 60) return [20, 40];
  if (duration <= 120) return [30, 60, 90];
  return [45, 90, 135];
}

export function BrushingSession({ selectedHat, capturedCreatureIds, onComplete, onCancel }: BrushingSessionProps) {
  const sessionDuration = useMemo(() => getSessionDurationSeconds(), []);
  const photoIntervals = useMemo(() => getPhotoIntervals(sessionDuration), [sessionDuration]);
  
  const [phase, setPhase] = useState<'countdown' | 'brushing' | 'paused' | 'complete'>('countdown');
  const [countdown, setCountdown] = useState(3);
  const [timeRemaining, setTimeRemaining] = useState(sessionDuration);
  const [photos, setPhotos] = useState<string[]>([]);
  const [pauseReason, setPauseReason] = useState<string>('');
  
  const [region] = useState<Region>(() => getRandomRegion());
  const [creature, setCreature] = useState<Creature | null>(null);
  
  const photoCapturedAt = useRef<Set<number>>(new Set());
  const lastMotionTime = useRef<number>(Date.now());
  const pauseCheckInterval = useRef<number | null>(null);
  
  const { startCamera, captureFrame, stopCamera, registerVideoElement } = useSharedCamera();
  const pauseVideoRef = useRef<HTMLVideoElement | null>(null);
  
  const isLegendary = creature?.rarity === 'legendary';
  const music = useRegionMusic(region, isLegendary);
  
  const setPauseVideoRef = useCallback((el: HTMLVideoElement | null) => {
    pauseVideoRef.current = el;
    if (el) {
      registerVideoElement(el);
    }
  }, [registerVideoElement]);
  
  const [debugMode, setDebugModeState] = useState(false);
  
  const { 
    zoneProgress, 
    motionResults, 
    overallProgress, 
    startDetection, 
    stopDetection,
    setFaceRegion,
    setDebugMode,
    getDebugInfo
  } = useMotionDetection({ targetCleaningTime: 25 });
  const { facePosition, startTracking, stopTracking } = useFaceTracking();
  
  const completedZonesRef = useRef<Set<string>>(new Set());
  const hasStartedCameraRef = useRef(false);
  const musicStartedRef = useRef(false);

  useEffect(() => {
    if (facePosition) {
      setFaceRegion({
        x: facePosition.x,
        y: facePosition.y,
        width: facePosition.width,
        height: facePosition.height
      });
    } else {
      setFaceRegion(null);
    }
  }, [facePosition, setFaceRegion]);

  useEffect(() => {
    const selectedCreature = getRandomCreatureForScore(85, capturedCreatureIds, region);
    setCreature(selectedCreature);
    
    if (selectedCreature?.rarity === 'legendary') {
      playSoundEffect('legendary-intro');
    }
  }, [region, capturedCreatureIds]);

  useEffect(() => {
    if (!hasStartedCameraRef.current) {
      hasStartedCameraRef.current = true;
      startCamera();
    }
    return () => {
      stopDetection();
      stopTracking();
      if (pauseCheckInterval.current) {
        clearInterval(pauseCheckInterval.current);
      }
    };
  }, [startCamera, stopDetection, stopTracking]);

  useEffect(() => {
    zoneProgress.forEach(zone => {
      if (zone.isComplete && !completedZonesRef.current.has(zone.zoneId)) {
        completedZonesRef.current.add(zone.zoneId);
        playSoundEffect('sparkle');
      }
    });
  }, [zoneProgress]);

  useEffect(() => {
    const hasMotion = motionResults.some(r => r.hasMotion);
    if (hasMotion) {
      lastMotionTime.current = Date.now();
    }
  }, [motionResults]);

  useEffect(() => {
    if (phase !== 'brushing') return;

    pauseCheckInterval.current = window.setInterval(() => {
      const timeSinceMotion = Date.now() - lastMotionTime.current;
      
      if (timeSinceMotion > NO_MOTION_PAUSE_THRESHOLD) {
        setPauseReason("Can't see you brushing! Move closer to the camera.");
        setPhase('paused');
      }
    }, 500);

    return () => {
      if (pauseCheckInterval.current) {
        clearInterval(pauseCheckInterval.current);
      }
    };
  }, [phase]);

  const handleVideoReady = useCallback((video: HTMLVideoElement) => {
    startDetection(video);
    startTracking(video);
    lastMotionTime.current = Date.now();
  }, [startDetection, startTracking]);

  const toggleDebugMode = useCallback(() => {
    setDebugModeState(prev => {
      const newValue = !prev;
      setDebugMode(newValue);
      return newValue;
    });
  }, [setDebugMode]);

  useEffect(() => {
    if (phase !== 'countdown') return;
    
    if (countdown <= 0) {
      setPhase('brushing');
      lastMotionTime.current = Date.now();
      return;
    }
    
    const timer = setTimeout(() => {
      setCountdown(c => c - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [countdown, phase]);

  useEffect(() => {
    if (phase !== 'brushing') return;
    
    if (timeRemaining <= 0) {
      handleSessionComplete();
      return;
    }
    
    const timer = setInterval(() => {
      setTimeRemaining(t => t - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeRemaining, phase]);

  useEffect(() => {
    if (phase !== 'brushing') return;
    
    const elapsed = sessionDuration - timeRemaining;
    
    photoIntervals.forEach(interval => {
      if (elapsed >= interval && !photoCapturedAt.current.has(interval)) {
        photoCapturedAt.current.add(interval);
        const frame = captureFrame();
        if (frame) {
          setPhotos(prev => [...prev, frame]);
        }
      }
    });
  }, [timeRemaining, phase, captureFrame]);

  useEffect(() => {
    if (phase === 'brushing' && !musicStartedRef.current) {
      musicStartedRef.current = true;
      music.start();
    } else if (phase === 'paused') {
      music.stop();
      musicStartedRef.current = false;
    } else if (phase === 'complete') {
      music.stop();
    }
  }, [phase, music]);

  useEffect(() => {
    if (phase !== 'brushing') return;
    
    const elapsed = sessionDuration - timeRemaining;
    const halfwayPoint = sessionDuration / 2;
    
    if (elapsed >= halfwayPoint) {
      music.setIntensity('excited');
    } else {
      music.setIntensity('calm');
    }
  }, [timeRemaining, phase, music]);

  const handleSessionComplete = useCallback(() => {
    setPhase('complete');
    music.stop();
    stopDetection();
    stopTracking();
    
    const finalFrame = captureFrame();
    const allPhotos = finalFrame ? [...photos, finalFrame] : photos;
    
    setTimeout(() => {
      stopCamera();
      onComplete({
        cleaningPercentage: overallProgress,
        zoneProgress,
        photos: allPhotos,
        region,
        creature,
      });
    }, 500);
  }, [stopDetection, stopTracking, captureFrame, photos, overallProgress, zoneProgress, onComplete, stopCamera, music, region, creature]);

  const handleResume = useCallback(() => {
    lastMotionTime.current = Date.now();
    setPhase('brushing');
    setPauseReason('');
  }, []);

  const handleManualCapture = useCallback(() => {
    const frame = captureFrame();
    if (frame) {
      setPhotos(prev => [...prev, frame]);
    }
  }, [captureFrame]);

  const handleCancel = useCallback(() => {
    music.stop();
    stopCamera();
    onCancel();
  }, [stopCamera, onCancel, music]);

  const activeZones = motionResults
    .filter(r => r.hasMotion)
    .map(r => r.zoneId);

  if (phase === 'countdown') {
    return (
      <div className="relative flex flex-col items-center justify-center h-full overflow-hidden">
        <div className="absolute inset-0">
          <RegionBackground region={region} />
        </div>
        
        <div className="relative z-10 text-center">
          <div className="text-6xl font-bold text-white animate-bounce-gentle drop-shadow-lg">
            {countdown > 0 ? countdown : 'GO!'}
          </div>
          <div className="text-xl text-white/80 mt-4 drop-shadow">Get ready to brush!</div>
          
          {creature && (
            <div className="mt-6 text-center">
              <div className="text-lg text-white/70">Today's creature:</div>
              <div className={`text-2xl font-bold ${
                creature.rarity === 'legendary' ? 'text-yellow-400 animate-pulse' :
                creature.rarity === 'rare' ? 'text-purple-400' : 'text-white'
              }`}>
                {creature.name}
              </div>
            </div>
          )}
          
          <button
            onClick={handleCancel}
            className="mt-8 px-6 py-2 text-white/80 bg-black/30 rounded-xl backdrop-blur-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'paused') {
    return (
      <div className="relative flex flex-col items-center justify-center h-full p-6 overflow-hidden">
        <div className="absolute inset-0">
          <RegionBackground region={region} />
        </div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="text-6xl mb-6">⏸️</div>
          <h1 className="text-3xl font-bold text-yellow-400 mb-4 drop-shadow-lg">Paused!</h1>
          <p className="text-xl text-white text-center mb-6 max-w-xs drop-shadow">
            {pauseReason}
          </p>
          
          <div className="w-full max-w-xs aspect-video bg-black/30 rounded-2xl overflow-hidden mb-6 backdrop-blur-sm">
            <video
              ref={setPauseVideoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover transform scale-x-[-1]"
            />
          </div>
          
          <div className="text-sm text-white/80 mb-4">
            Time remaining: {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
          </div>
          
          <button
            onClick={handleResume}
            className="w-full max-w-xs py-4 text-xl font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg active:scale-95 transition-transform mb-3"
          >
            I'm Ready! ▶️
          </button>
          
          <button
            onClick={handleCancel}
            className="w-full max-w-xs py-3 text-lg text-white/80 bg-black/30 rounded-xl backdrop-blur-sm"
          >
            Stop Session
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col h-full overflow-hidden">
      <div className="absolute inset-0">
        <RegionBackground region={region} />
      </div>
      
      <div className="relative z-10 flex flex-col h-full p-2 gap-2">
        <div className="h-2/3 relative overflow-hidden">
          <CameraView
            selectedHat={selectedHat}
            facePosition={facePosition}
            onVideoReady={handleVideoReady}
            isBrushing={motionResults.some(r => r.hasMotion)}
            debugMode={debugMode}
            getDebugInfo={getDebugInfo}
          />
          
          <div className="absolute top-2 left-2 right-2 flex justify-between items-start pointer-events-auto z-20">
            <button
              onClick={handleCancel}
              className="px-3 py-1.5 text-sm text-white/80 bg-black/50 rounded-xl backdrop-blur-sm pointer-events-auto"
            >
              ✕
            </button>
            <Timer timeRemaining={timeRemaining} totalTime={sessionDuration} />
            <div className="flex gap-1">
              <button
                onClick={toggleDebugMode}
                className={`px-2 py-1.5 text-sm rounded-xl active:scale-95 backdrop-blur-sm pointer-events-auto ${
                  debugMode ? 'text-yellow-400 bg-yellow-900/80' : 'text-white/60 bg-black/50'
                }`}
              >
                🔧
              </button>
              <button
                onClick={handleManualCapture}
                className="px-2 py-1.5 text-sm text-white bg-pink-600/80 rounded-xl active:scale-95 backdrop-blur-sm pointer-events-auto"
              >
                📸
              </button>
            </div>
          </div>
        </div>
        
        <div className="h-1/3 overflow-auto">
          {creature ? (
            <CreatureCleaning
              creature={creature}
              zoneProgress={zoneProgress}
              activeZones={activeZones}
              overallProgress={overallProgress}
            />
          ) : (
            <ZoneProgress
              zoneProgress={zoneProgress}
              overallProgress={overallProgress}
            />
          )}
        </div>
        
        {photos.length > 0 && (
          <div className="flex justify-center gap-2">
            {photos.slice(-3).map((_, i) => (
              <div key={i} className="w-3 h-3 bg-pink-500 rounded-full animate-sparkle" />
            ))}
            <span className="text-xs text-white/70 ml-2">{photos.length} photos</span>
          </div>
        )}
      </div>
    </div>
  );
}
