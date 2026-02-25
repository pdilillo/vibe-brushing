import { useMemo } from 'react';
import { CreatureArt } from '../CreatureArt';
import type { Creature } from '../../types';
import { REGIONS } from '../../data/regions';

interface CreatureCleaningProps {
  creature: Creature;
  activeZones: string[];
  overallProgress: number;
  compact?: boolean;
}

export function CreatureCleaning({ creature, activeZones, overallProgress, compact = false }: CreatureCleaningProps) {
  const regionKey = creature.region === 'all' ? 'grassland' : creature.region;
  const regionData = REGIONS[regionKey];
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
                creature.rarity === 'mythic' ? 'bg-orange-500' :
                creature.rarity === 'legendary' ? 'bg-yellow-500' : 'bg-purple-500'
              }`}>
                {creature.rarity === 'mythic' ? '🐉' : creature.rarity === 'legendary' ? '★' : '◆'}
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
            <span className="text-[10px] text-purple-300">
              {overallProgress >= 100 ? '✨ Clean!' : 'Keep brushing'}
            </span>
            <span className="text-[10px] text-purple-300">{Math.round(overallProgress)}%</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full flex flex-col">
      <div 
        className="flex-1 relative rounded-xl overflow-hidden flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${regionData.colors.background}80, ${regionData.colors.primary}40)`,
          boxShadow: creature.rarity === 'mythic'
            ? `0 0 40px #F97316, 0 0 60px #F9731680`
            : creature.rarity === 'legendary' 
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
                  left: `${15 + Math.random() * 70}%`,
                  top: `${15 + Math.random() * 70}%`,
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
            size={140}
            showGunk={true}
            gunkLevel={gunkLevel}
            animated={true}
          />

          {overallProgress >= 100 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-xl animate-sparkle-float"
                  style={{
                    left: `${10 + (i % 4) * 25}%`,
                    top: `${10 + Math.floor(i / 4) * 40}%`,
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
          className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded-full text-white text-sm"
          style={{ backgroundColor: `${regionData.colors.primary}CC` }}
        >
          <span className="text-base">{stateEmoji}</span>
          <span className="font-medium">{creature.name}</span>
          {creature.rarity !== 'common' && (
            <span 
              className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                creature.rarity === 'mythic' ? 'bg-orange-500' :
                creature.rarity === 'legendary' ? 'bg-yellow-500' : 'bg-purple-500'
              }`}
            >
              {creature.rarity === 'mythic' ? '🐉' : creature.rarity === 'legendary' ? '★' : '◆'}
            </span>
          )}
        </div>

        <div className="absolute top-2 right-2 px-2 py-1 rounded-full text-white text-sm font-bold bg-black/40 backdrop-blur-sm">
          {Math.round(overallProgress)}%
        </div>

        <div className="absolute bottom-2 left-2 right-2">
          <div className="h-4 bg-black/30 rounded-full overflow-hidden backdrop-blur-sm relative">
            <div 
              className="h-full rounded-full transition-all duration-300"
              style={{ 
                width: `${overallProgress}%`,
                backgroundColor: overallProgress >= 100 ? '#22C55E' : regionData.colors.accent,
              }}
            />
            {activeZones.length > 0 && overallProgress < 100 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[10px] font-bold text-white drop-shadow animate-pulse">
                  Brushing...
                </span>
              </div>
            )}
            {overallProgress >= 100 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[10px] font-bold text-white drop-shadow">
                  ✨ Clean! ✨
                </span>
              </div>
            )}
          </div>
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
