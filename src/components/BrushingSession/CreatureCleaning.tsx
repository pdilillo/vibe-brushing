import { useMemo } from 'react';
import { CreatureArt } from '../CreatureArt';
import type { Creature, ZoneProgress } from '../../types';
import { REGIONS } from '../../data/regions';

interface CreatureCleaningProps {
  creature: Creature;
  zoneProgress: ZoneProgress[];
  activeZones: string[];
  overallProgress: number;
}

const ZONE_TO_BODY_PART: Record<string, string> = {
  topLeft: 'Left Ear',
  topCenter: 'Head',
  topRight: 'Right Ear',
  bottomLeft: 'Left Side',
  bottomCenter: 'Belly',
  bottomRight: 'Right Side',
};

export function CreatureCleaning({ creature, zoneProgress, activeZones, overallProgress }: CreatureCleaningProps) {
  const regionData = REGIONS[creature.region];
  const gunkLevel = Math.max(0, 100 - overallProgress);
  
  const creatureState = useMemo(() => {
    if (overallProgress >= 100) return 'sparkling';
    if (overallProgress >= 75) return 'happy';
    if (overallProgress >= 50) return 'hopeful';
    if (overallProgress >= 25) return 'waking';
    return 'gunked';
  }, [overallProgress]);

  const stateEmoji = {
    gunked: '😵',
    waking: '😮',
    hopeful: '🙂',
    happy: '😊',
    sparkling: '🤩',
  }[creatureState];

  const completedZones = zoneProgress.filter(z => z.isComplete).length;
  const totalZones = zoneProgress.length;

  return (
    <div className="relative w-full max-w-xs mx-auto">
      <div 
        className="relative aspect-square rounded-2xl overflow-hidden p-4"
        style={{
          background: `linear-gradient(135deg, ${regionData.colors.background}80, ${regionData.colors.primary}40)`,
          boxShadow: creature.rarity === 'legendary' 
            ? `0 0 30px ${regionData.colors.accent}60`
            : creature.rarity === 'rare'
            ? `0 0 20px ${regionData.colors.primary}40`
            : 'none',
        }}
      >
        {activeZones.length > 0 && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full animate-ping"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  backgroundColor: regionData.colors.accent,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '1s',
                }}
              />
            ))}
          </div>
        )}

        <div className={`relative ${activeZones.length > 0 ? 'animate-wiggle' : ''}`}>
          <CreatureArt
            creature={creature}
            size={200}
            showGunk={true}
            gunkLevel={gunkLevel}
            animated={true}
            className="mx-auto"
          />

          {overallProgress >= 100 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-2xl animate-sparkle-float"
                  style={{
                    left: `${10 + (i % 4) * 25}%`,
                    top: `${10 + Math.floor(i / 4) * 30}%`,
                    animationDelay: `${i * 0.15}s`,
                  }}
                >
                  ✨
                </div>
              ))}
            </div>
          )}
        </div>

        <div 
          className="absolute bottom-2 left-2 right-2 flex items-center justify-center gap-2 px-3 py-1 rounded-full text-white text-sm"
          style={{ backgroundColor: `${regionData.colors.primary}CC` }}
        >
          <span className="text-lg">{stateEmoji}</span>
          <span className="font-medium">{creature.name}</span>
          {creature.rarity !== 'common' && (
            <span 
              className={`text-xs px-2 py-0.5 rounded-full ${
                creature.rarity === 'legendary' ? 'bg-yellow-500' : 'bg-purple-500'
              }`}
            >
              {creature.rarity.toUpperCase()}
            </span>
          )}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-1">
        {zoneProgress.map((zone) => {
          const isActive = activeZones.includes(zone.zoneId);
          const bodyPart = ZONE_TO_BODY_PART[zone.zoneId] || zone.zoneId;
          
          return (
            <div
              key={zone.zoneId}
              className={`
                relative px-2 py-1 rounded-lg text-xs text-center transition-all
                ${zone.isComplete 
                  ? 'bg-green-500/30 text-green-300' 
                  : isActive 
                  ? 'bg-yellow-500/30 text-yellow-300 animate-pulse' 
                  : 'bg-purple-900/30 text-purple-300'
                }
              `}
            >
              <div className="font-medium truncate">{bodyPart}</div>
              <div className="flex items-center justify-center gap-1">
                <div 
                  className="h-1 flex-1 rounded-full bg-purple-900/50 overflow-hidden"
                >
                  <div 
                    className="h-full rounded-full transition-all duration-300"
                    style={{ 
                      width: `${zone.cleaningProgress}%`,
                      backgroundColor: zone.isComplete 
                        ? '#22C55E' 
                        : isActive 
                        ? '#FBBF24' 
                        : regionData.colors.primary,
                    }}
                  />
                </div>
                {zone.isComplete && <span>✨</span>}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3 text-center">
        <div className="text-sm text-purple-300">
          {overallProgress < 100 ? (
            <>Clean {creature.name} to catch them! ({completedZones}/{totalZones} parts clean)</>
          ) : (
            <span className="text-green-400 font-bold animate-pulse">
              {creature.name} is sparkly clean! 🎉
            </span>
          )}
        </div>
      </div>

      <style>{`
        @keyframes sparkle-float {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateY(-10px) scale(1.2);
            opacity: 0.8;
          }
        }
        .animate-sparkle-float {
          animation: sparkle-float 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
