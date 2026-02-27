import { useState, useCallback, useEffect, useRef } from 'react';
import { getRandomCreatureForScore, getCaptureRate, getBallType, type BallType } from '../../data/creatures';
import { addCapturedCreature } from '../../services/database';
import { playSoundEffect } from '../../hooks/useAudio';
import { CreatureArt } from '../CreatureArt';
import { RegionBackground } from '../BrushingSession/RegionBackground';
import type { Creature, UserProgress, CapturedCreature, Region } from '../../types';

interface CaptureGameProps {
  cleaningPercentage: number;
  userProgress: UserProgress;
  region: Region;
  preSelectedCreature?: Creature | null;
  onComplete: (creature: Creature | null) => void;
}

type GamePhase = 'intro' | 'ready' | 'throwing' | 'impact' | 'wobble' | 'suspense' | 'result';

interface WobbleState {
  count: number;
  maxWobbles: number;
  currentWobble: number;
  direction: number;
}

interface BallStyles {
  gradient: string;
  border: string;
  stripe: string;
  center: string;
  centerBorder: string;
  glow?: string;
}

const BALL_STYLES: Record<BallType, BallStyles> = {
  red: {
    gradient: 'from-red-500 to-red-700',
    border: 'border-white',
    stripe: 'bg-white',
    center: 'bg-red-500',
    centerBorder: 'border-white',
  },
  blue: {
    gradient: 'from-blue-500 to-blue-700',
    border: 'border-red-500',
    stripe: 'bg-red-500',
    center: 'bg-blue-500',
    centerBorder: 'border-red-400',
  },
  bee: {
    gradient: 'from-yellow-400 to-yellow-500',
    border: 'border-black',
    stripe: 'bg-black',
    center: 'bg-yellow-400',
    centerBorder: 'border-black',
  },
  white: {
    gradient: 'from-white to-gray-200',
    border: 'border-red-500',
    stripe: 'bg-red-500',
    center: 'bg-white',
    centerBorder: 'border-red-400',
  },
  master: {
    gradient: 'from-purple-500 via-purple-600 to-purple-800',
    border: 'border-yellow-400',
    stripe: 'bg-yellow-400',
    center: 'bg-purple-400',
    centerBorder: 'border-yellow-300',
    glow: 'shadow-[0_0_20px_rgba(168,85,247,0.7)]',
  },
};

function BallGraphic({ type, size, showSparkle = false, className = '' }: { type: BallType; size: 'small' | 'medium' | 'large'; showSparkle?: boolean; className?: string }) {
  const styles = BALL_STYLES[type];
  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-16 h-16',
    large: 'w-20 h-20',
  };
  const centerSizes = {
    small: 'w-2 h-2',
    medium: 'w-3 h-3',
    large: 'w-4 h-4',
  };
  const stripeSizes = {
    small: 'h-0.5',
    medium: 'h-1',
    large: 'h-1',
  };
  
  const isBee = type === 'bee';
  
  return (
    <div className={`relative ${className}`}>
      <div className={`
        ${sizeClasses[size]} rounded-full bg-gradient-to-br ${styles.gradient}
        border-4 ${styles.border} shadow-xl
        flex items-center justify-center
        ${styles.glow || ''}
      `}>
        {isBee ? (
          <>
            <div className={`w-full ${stripeSizes[size]} bg-black absolute`} style={{ top: '30%' }} />
            <div className={`w-full ${stripeSizes[size]} bg-black absolute`} style={{ top: '50%' }} />
            <div className={`w-full ${stripeSizes[size]} bg-black absolute`} style={{ top: '70%' }} />
          </>
        ) : (
          <div className={`w-full ${stripeSizes[size]} ${styles.stripe} absolute`} />
        )}
        <div className={`${centerSizes[size]} rounded-full ${styles.center} border-2 ${styles.centerBorder} absolute`} />
      </div>
      {showSparkle && (
        <div className="absolute -top-2 -right-2 text-2xl animate-sparkle">✨</div>
      )}
      {type === 'master' && (
        <div className="absolute inset-0 rounded-full animate-pulse bg-yellow-400/20" />
      )}
    </div>
  );
}

export function CaptureGame({ 
  cleaningPercentage, 
  userProgress, 
  region, 
  preSelectedCreature,
  onComplete 
}: CaptureGameProps) {
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [creature, setCreature] = useState<Creature | null>(preSelectedCreature || null);
  const [captureRate, setCaptureRate] = useState(0);
  const [ballType, setBallType] = useState<BallType>('red');
  const [captured, setCaptured] = useState(false);
  const [ballPosition, setBallPosition] = useState({ x: 50, y: 85, scale: 1, rotation: 0 });
  const [wobbleState, setWobbleState] = useState<WobbleState>({ count: 0, maxWobbles: 3, currentWobble: 0, direction: 1 });
  const [screenShake, setScreenShake] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [suspenseOpacity, setSuspenseOpacity] = useState(0);
  
  const animationRef = useRef<number | null>(null);
  const captureRateRef = useRef(captureRate);
  const creatureRef = useRef(creature);
  
  captureRateRef.current = captureRate;
  creatureRef.current = creature;

  useEffect(() => {
    if (!preSelectedCreature) {
      const capturedIds = userProgress.capturedCreatures.map(c => c.id);
      const targetCreature = getRandomCreatureForScore(cleaningPercentage, capturedIds, region);
      setCreature(targetCreature);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [cleaningPercentage, userProgress.capturedCreatures, region, preSelectedCreature]);

  useEffect(() => {
    if (creature) {
      const rate = getCaptureRate(cleaningPercentage, creature.rarity);
      setCaptureRate(rate);
      setBallType(getBallType(cleaningPercentage));
      
      const wobbles = creature.rarity === 'mythic' ? 6 + Math.floor(Math.random() * 2) :
                      creature.rarity === 'legendary' ? 4 + Math.floor(Math.random() * 2) :
                      creature.rarity === 'rare' ? 3 + Math.floor(Math.random() * 2) :
                      2 + Math.floor(Math.random() * 2);
      setWobbleState(prev => ({ ...prev, maxWobbles: wobbles }));
      
      const timer = setTimeout(() => setPhase('ready'), 2000);
      return () => clearTimeout(timer);
    }
  }, [creature, cleaningPercentage]);

  const animateThrow = useCallback(() => {
    let frame = 0;
    const totalFrames = 40;
    
    const animate = () => {
      frame++;
      const progress = frame / totalFrames;
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      const arcHeight = Math.sin(progress * Math.PI) * 30;
      
      setBallPosition({
        x: 50,
        y: 85 - easeOut * 55 - arcHeight,
        scale: 1 - progress * 0.3,
        rotation: progress * 720,
      });
      
      if (frame < totalFrames) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setPhase('impact');
        setShowFlash(true);
        if (creature?.rarity === 'legendary' || creature?.rarity === 'mythic') {
          setScreenShake(true);
        }
        playSoundEffect('capture');
        
        setTimeout(() => {
          setShowFlash(false);
          setScreenShake(false);
          startWobbleSequence();
        }, 300);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
  }, [creature]);

  const startWobbleSequence = useCallback(() => {
    setPhase('wobble');
    let wobbleCount = 0;
    const maxWobbles = wobbleState.maxWobbles;
    
    const doWobble = () => {
      wobbleCount++;
      setWobbleState(prev => ({ ...prev, currentWobble: wobbleCount }));
      playSoundEffect('wobble');
      
      let wobbleFrame = 0;
      const wobbleFrames = 30;
      let direction = 1;
      
      const animateWobble = () => {
        wobbleFrame++;
        const wobbleProgress = wobbleFrame / wobbleFrames;
        
        if (wobbleFrame % 5 === 0) {
          direction *= -1;
        }
        
        const wobbleAmount = Math.sin(wobbleProgress * Math.PI * 4) * (1 - wobbleProgress) * 15;
        
        setBallPosition(prev => ({
          ...prev,
          x: 50 + wobbleAmount,
          rotation: wobbleAmount * 2,
        }));
        
        if (wobbleFrame < wobbleFrames) {
          animationRef.current = requestAnimationFrame(animateWobble);
        } else {
          setBallPosition(prev => ({ ...prev, x: 50, rotation: 0 }));
          
          const pauseDuration = 400 + Math.random() * 400;
          
          if (wobbleCount < maxWobbles) {
            setTimeout(doWobble, pauseDuration);
          } else {
            setTimeout(() => {
              setPhase('suspense');
              startSuspensePhase();
            }, pauseDuration);
          }
        }
      };
      
      animationRef.current = requestAnimationFrame(animateWobble);
    };
    
    setTimeout(doWobble, 500);
  }, [wobbleState.maxWobbles]);

  const startSuspensePhase = useCallback(() => {
    let opacity = 0;
    const fadeIn = () => {
      opacity += 0.02;
      setSuspenseOpacity(Math.min(opacity, 0.5));
      
      if (opacity < 0.5) {
        animationRef.current = requestAnimationFrame(fadeIn);
      }
    };
    
    animationRef.current = requestAnimationFrame(fadeIn);
    
    const currentCreature = creatureRef.current;
    const currentCaptureRate = captureRateRef.current;
    
    const suspenseDuration = currentCreature?.rarity === 'mythic' ? 3500 :
                             currentCreature?.rarity === 'legendary' ? 2500 : 
                             currentCreature?.rarity === 'rare' ? 1800 : 1200;
    
    console.log('[CaptureGame] Starting suspense with capture rate:', currentCaptureRate);
    
    setTimeout(() => {
      const roll = Math.random();
      const success = roll < currentCaptureRate;
      console.log('[CaptureGame] Capture roll:', roll, 'rate:', currentCaptureRate, 'success:', success);
      setCaptured(success);
      setSuspenseOpacity(0);
      setPhase('result');
      
      if (success) {
        playSoundEffect('click');
        setTimeout(() => playSoundEffect('success'), 250);
        if (currentCreature) {
          const capturedCreature: CapturedCreature = {
            ...currentCreature,
            capturedAt: new Date()
          };
          addCapturedCreature(capturedCreature);
        }
      } else {
        playSoundEffect('fail');
      }
    }, suspenseDuration);
  }, []);

  const handleThrow = useCallback(() => {
    if (phase !== 'ready' || !creature) return;
    setPhase('throwing');
    animateThrow();
  }, [phase, creature, animateThrow]);

  const handleContinue = useCallback(() => {
    onComplete(captured ? creature : null);
  }, [captured, creature, onComplete]);

  if (!creature) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6">
        <div className="text-4xl mb-4">🎉</div>
        <div className="text-xl text-center text-purple-200">
          You've caught all the creatures in this region!
        </div>
        <button
          onClick={() => onComplete(null)}
          className="mt-8 px-8 py-4 text-xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl"
        >
          Continue
        </button>
      </div>
    );
  }

  return (
    <div className={`relative flex flex-col h-full overflow-hidden ${screenShake ? 'animate-shake' : ''}`}>
      <div className="absolute inset-0">
        <RegionBackground region={region} />
      </div>

      {showFlash && (
        <div className="absolute inset-0 bg-white z-50 animate-flash" />
      )}

      {suspenseOpacity > 0 && (
        <div 
          className="absolute inset-0 bg-black z-20 pointer-events-none transition-opacity"
          style={{ opacity: suspenseOpacity }}
        />
      )}

      <div className="relative flex-1 flex flex-col items-center justify-center p-6 z-10">
        {phase === 'intro' && (
          <div className="text-center animate-bounce-gentle">
            <div className="text-xl text-white mb-2 drop-shadow-lg">A wild creature appeared!</div>
            <div className="relative inline-block">
              <CreatureArt creature={creature} size={150} animated={true} />
              {(creature.rarity === 'legendary' || creature.rarity === 'mythic') && (
                <div className="absolute inset-0 animate-pulse">
                  <div className={`absolute inset-0 ${creature.rarity === 'mythic' ? 'bg-orange-400/30' : 'bg-yellow-400/20'} rounded-full blur-xl`} />
                </div>
              )}
            </div>
            <div className="text-2xl font-bold text-white mt-3 drop-shadow-lg">{creature.name}</div>
            <div className={`text-lg mt-1 font-semibold ${
              creature.rarity === 'mythic' ? 'text-orange-400 animate-pulse' :
              creature.rarity === 'legendary' ? 'text-yellow-400 animate-pulse' :
              creature.rarity === 'rare' ? 'text-purple-400' : 'text-gray-300'
            }`}>
              {creature.rarity.toUpperCase()}
            </div>
            <div className="text-sm text-purple-200 mt-2 max-w-xs mx-auto">
              {creature.description}
            </div>
          </div>
        )}
        
        {(phase === 'ready' || phase === 'throwing' || phase === 'impact' || phase === 'wobble' || phase === 'suspense') && (
          <>
            <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 ${phase === 'impact' ? 'animate-shake' : 'animate-float'}`}>
              {phase !== 'impact' && phase !== 'wobble' && phase !== 'suspense' ? (
                <CreatureArt creature={creature} size={120} animated={true} />
              ) : (
                <div className="relative">
                  <div style={{
                    transform: `translateX(${ballPosition.x - 50}px) rotate(${ballPosition.rotation}deg)`,
                  }}>
                    <BallGraphic type={ballType} size="large" />
                  </div>
                  
                  {phase === 'wobble' && (
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-1">
                      {[...Array(wobbleState.maxWobbles)].map((_, i) => (
                        <div 
                          key={i}
                          className={`w-3 h-3 rounded-full transition-all ${
                            i < wobbleState.currentWobble 
                              ? 'bg-yellow-400 scale-100' 
                              : 'bg-gray-600 scale-75'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                  
                  {phase === 'suspense' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full border-4 border-yellow-400/50 animate-ping" />
                    </div>
                  )}
                </div>
              )}
            </div>
            
            
            {phase === 'throwing' && (
              <div 
                className="absolute transition-none"
                style={{ 
                  left: `${ballPosition.x}%`, 
                  top: `${ballPosition.y}%`,
                  transform: `translate(-50%, -50%) scale(${ballPosition.scale}) rotate(${ballPosition.rotation}deg)`
                }}
              >
                <BallGraphic type={ballType} size="medium" />
              </div>
            )}

            {phase === 'ready' && (
              <div className="absolute bottom-20 text-center">
                <div className="text-lg text-white mb-2 drop-shadow-lg">
                  Capture chance: <span className="text-yellow-400 font-bold">{Math.round(captureRate * 100)}%</span>
                </div>
                <div className="text-3xl font-bold text-white mb-3 drop-shadow-lg animate-pulse">
                  THROW!
                </div>
                <button
                  onClick={handleThrow}
                  className="active:scale-90 transition-transform hover:scale-110"
                  aria-label="Throw ball"
                >
                  <BallGraphic type={ballType} size="large" showSparkle className="animate-bounce-gentle" />
                </button>
              </div>
            )}

            {(phase === 'wobble' || phase === 'suspense') && (
              <div className="absolute bottom-24 text-center">
                <div className="text-xl text-white animate-pulse drop-shadow-lg">
                  {phase === 'wobble' ? '...' : 'Please work...'}
                </div>
              </div>
            )}
          </>
        )}
        
        {phase === 'result' && (
          <div className="text-center z-30 bg-purple-900/90 backdrop-blur-sm rounded-3xl p-6 mx-4 border border-purple-500/30 shadow-2xl">
            {captured ? (
              <>
                <div className="text-4xl text-yellow-400 font-bold mb-4 animate-bounce-gentle drop-shadow-lg">
                  CAUGHT!
                </div>
                <div className="relative inline-block">
                  <CreatureArt creature={creature} size={150} animated={true} />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute text-3xl animate-sparkle"
                        style={{
                          left: `${20 + (i % 4) * 20}%`,
                          top: `${20 + Math.floor(i / 4) * 40}%`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      >
                        ✨
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mt-4">{creature.name}</div>
                <div className="text-purple-200 mt-2 max-w-xs mx-auto">{creature.description}</div>
                <div className="text-4xl mt-4">🎉✨🎊</div>
              </>
            ) : (
              <>
                <div className="text-3xl text-red-400 font-bold mb-4">
                  Oh no! It escaped!
                </div>
                <div className="opacity-50 inline-block">
                  <CreatureArt creature={creature} size={120} animated={false} />
                </div>
                <div className="text-xl text-purple-200 mt-4 max-w-xs mx-auto">
                  Keep brushing well and try again tomorrow!
                </div>
                <div className="text-4xl mt-4">💪</div>
              </>
            )}
          </div>
        )}
      </div>
      
      {phase === 'result' && (
        <div className="relative z-30 p-6">
          <button
            onClick={handleContinue}
            className="w-full py-4 text-xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-lg"
          >
            Continue
          </button>
        </div>
      )}

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        @keyframes flash {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        .animate-flash {
          animation: flash 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
