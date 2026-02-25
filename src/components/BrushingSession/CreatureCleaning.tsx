import { useMemo } from 'react';
import { CreatureArt } from '../CreatureArt';
import type { Creature, ZoneProgress } from '../../types';
import { REGIONS } from '../../data/regions';

interface CreatureCleaningProps {
  creature: Creature;
  zoneProgress: ZoneProgress[];
  activeZones: string[];
  overallProgress: number;
  compact?: boolean;
}

const ZONE_TO_BODY_PART: Record<string, string> = {
  topLeft: 'Left Ear',
  topCenter: 'Head',
  topRight: 'Right Ear',
  bottomLeft: 'Left Side',
  bottomCenter: 'Belly',
  bottomRight: 'Right Side',
};

export function CreatureCleaning({ creature, zoneProgress, activeZones, overallProgress, compact = false }: CreatureCleaningProps) {
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

  if (compact) {
    return (
      <div className="flex items-center gap-3 px-2 py-2 bg-purple-900/40 rounded-xl backdrop-blur-sm">
        <div 
          className={`relative shrink-0 ${activeZones.length > 0 ? 'animate-wiggle' : ''}`}
          style={{ width: 60, height: 60 }}
        >
          <CreatureArt
            creature={creature}
            size={60}
            showGunk={true}
            gunkLevel={gunkLevel}
            animated={true}
          />
          {overallProgress >= 100 && (
            <div className="absolute -top-1 -right-1 text-lg">✨</div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm">{stateEmoji}</span>
            <span className="text-sm font-medium text-white truncate">{creature.name}</span>
            {creature.rarity !== 'common' && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                creature.rarity === 'legendary' ? 'bg-yellow-500' : 'bg-purple-500'
              }`}>
                {creature.rarity === 'legendary' ? '★' : '◆'}
              </span>
            )}
          </div>
          
          <div className="h-2 w-full rounded-full bg-purple-900/50 overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-300"
              style={{ 
                width: `${overallProgress}%`,
                backgroundColor: overallProgress >= 100 ? '#22C55E' : regionData.colors.primary,
              }}
            />
          </div>
          
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-purple-300">{completedZones}/{totalZones} clean</span>
            <span className="text-[10px] text-purple-300">{Math.round(overallProgress)}%</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 h-full">
      <div 
        className="relative shrink-0 w-32 rounded-xl overflow-hidden p-2 flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${regionData.colors.background}80, ${regionData.colors.primary}40)`,
          boxShadow: creature.rarity === 'legendary' 
            ? `0 0 20px ${regionData.colors.accent}60`
            : creature.rarity === 'rare'
            ? `0 0 15px ${regionData.colors.primary}40`
            : 'none',
        }}
      >
        {activeZones.length > 0 && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full animate-ping"
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
            size={100}
            showGunk={true}
            gunkLevel={gunkLevel}
            animated={true}
          />

          {overallProgress >= 100 && (
            <div className="absolute -top-1 -right-1 text-xl">✨</div>
          )}
        </div>

        <div 
          className="absolute bottom-1 left-1 right-1 flex items-center justify-center gap-1 px-2 py-0.5 rounded-full text-white text-xs"
          style={{ backgroundColor: `${regionData.colors.primary}CC` }}
        >
          <span>{stateEmoji}</span>
          <span className="font-medium truncate">{creature.name}</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-purple-300">Overall</span>
              <span className="text-white font-bold">{Math.round(overallProgress)}%</span>
            </div>
            <div className="h-2 bg-purple-900/50 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-300"
                style={{ 
                  width: `${overallProgress}%`,
                  backgroundColor: overallProgress >= 100 ? '#22C55E' : regionData.colors.primary,
                }}
              />
            </div>
          </div>
          {creature.rarity !== 'common' && (
            <span 
              className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                creature.rarity === 'legendary' ? 'bg-yellow-500' : 'bg-purple-500'
              }`}
            >
              {creature.rarity.toUpperCase()}
            </span>
          )}
        </div>

        <div className="grid grid-cols-3 gap-1 flex-1">
          {zoneProgress.map((zone) => {
            const isActive = activeZones.includes(zone.zoneId);
            const bodyPart = ZONE_TO_BODY_PART[zone.zoneId] || zone.zoneId;
            
            return (
              <div
                key={zone.zoneId}
                className={`
                  relative px-1.5 py-1 rounded-lg text-[10px] text-center transition-all
                  ${zone.isComplete 
                    ? 'bg-green-500/30 text-green-300' 
                    : isActive 
                    ? 'bg-yellow-500/30 text-yellow-300 animate-pulse' 
                    : 'bg-purple-900/30 text-purple-300'
                  }
                `}
              >
                <div className="font-medium truncate">{bodyPart}</div>
                <div className="flex items-center justify-center gap-0.5">
                  <div className="h-1 flex-1 rounded-full bg-purple-900/50 overflow-hidden">
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
                  {zone.isComplete && <span className="text-[8px]">✨</span>}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-xs text-purple-300 text-center">
          {overallProgress < 100 ? (
            <>Clean to catch! ({completedZones}/{totalZones} parts)</>
          ) : (
            <span className="text-green-400 font-bold animate-pulse">
              Sparkly clean! 🎉
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
