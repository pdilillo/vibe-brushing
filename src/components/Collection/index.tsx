import { useState } from 'react';
import { ALL_CREATURES, getElementType, getCreaturesBySeries, isSeriesComplete, getUnlockedSeries } from '../../data/creatures';
import { CreatureArt } from '../CreatureArt';
import type { UserProgress, Creature, CapturedCreature, CreatureSeries } from '../../types';

interface CollectionProps {
  userProgress: UserProgress;
  onBack: () => void;
}

const SERIES_INFO: Record<CreatureSeries, { name: string; subtitle: string; icon: string; color: string }> = {
  1: { name: 'Series 1', subtitle: 'Original Collection', icon: '🌟', color: 'from-purple-600 to-blue-600' },
  2: { name: 'Series 2', subtitle: 'Crystal Caverns', icon: '💎', color: 'from-cyan-500 to-emerald-500' },
  3: { name: 'Series 3', subtitle: 'Prehistoric Tech', icon: '🦖', color: 'from-orange-500 to-red-500' },
};

export function Collection({ userProgress, onBack }: CollectionProps) {
  const [selectedCreature, setSelectedCreature] = useState<Creature | null>(null);
  const [activeSeries, setActiveSeries] = useState<CreatureSeries>(1);
  
  const capturedIds = new Set(userProgress.capturedCreatures.map(c => c.id));
  const unlockedSeries = getUnlockedSeries(Array.from(capturedIds));
  
  const seriesCreatures = getCreaturesBySeries(activeSeries);
  const mythicCreature = ALL_CREATURES.find(c => c.rarity === 'mythic');
  
  const groupedCreatures = {
    mythic: activeSeries === 1 && mythicCreature ? [mythicCreature] : [],
    legendary: seriesCreatures.filter(c => c.rarity === 'legendary'),
    rare: seriesCreatures.filter(c => c.rarity === 'rare'),
    common: seriesCreatures.filter(c => c.rarity === 'common')
  };

  const seriesCapturedCount = seriesCreatures.filter(c => capturedIds.has(c.id)).length;
  const totalCaptured = Array.from(capturedIds).length;
  const totalCreatures = ALL_CREATURES.length;

  const handleCreatureClick = (creature: Creature) => {
    if (capturedIds.has(creature.id)) {
      setSelectedCreature(creature);
    }
  };

  const isSeriesLocked = (series: CreatureSeries) => !unlockedSeries.includes(series);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 bg-purple-900/50">
        <button
          onClick={onBack}
          className="px-4 py-2 text-purple-300 bg-purple-800/50 rounded-xl"
        >
          ← Back
        </button>
        <h1 className="text-xl font-bold">My Collection</h1>
        <div className="text-sm text-purple-300">
          {totalCaptured}/{totalCreatures}
        </div>
      </div>

      <div className="flex gap-2 px-4 pt-3 pb-2 bg-purple-900/30">
        {([1, 2, 3] as CreatureSeries[]).map(series => {
          const info = SERIES_INFO[series];
          const isLocked = isSeriesLocked(series);
          const isActive = activeSeries === series;
          const seriesComplete = isSeriesComplete(series, Array.from(capturedIds));
          const seriesCount = getCreaturesBySeries(series).length;
          const seriesCaught = getCreaturesBySeries(series).filter(c => capturedIds.has(c.id)).length;
          
          return (
            <button
              key={series}
              onClick={() => !isLocked && setActiveSeries(series)}
              disabled={isLocked}
              className={`flex-1 py-2 px-3 rounded-xl transition-all relative overflow-hidden ${
                isActive
                  ? `bg-gradient-to-r ${info.color} text-white shadow-lg`
                  : isLocked
                    ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
                    : 'bg-purple-800/50 text-purple-200 hover:bg-purple-700/50'
              }`}
            >
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-lg">{isLocked ? '🔒' : info.icon}</span>
                <span className="text-xs font-bold">{info.name}</span>
                {!isLocked && (
                  <span className="text-[10px] opacity-75">
                    {seriesCaught}/{seriesCount}
                    {seriesComplete && ' ✓'}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="px-4 py-2 bg-gradient-to-r from-purple-900/50 to-purple-800/50 border-b border-purple-700/30">
        <div className="flex items-center gap-2">
          <span className="text-lg">{SERIES_INFO[activeSeries].icon}</span>
          <div>
            <h2 className="font-bold text-white">{SERIES_INFO[activeSeries].name}</h2>
            <p className="text-xs text-purple-300">{SERIES_INFO[activeSeries].subtitle}</p>
          </div>
          <div className="ml-auto text-sm text-purple-300">
            {seriesCapturedCount}/{seriesCreatures.length}
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {activeSeries === 1 && groupedCreatures.mythic.length > 0 && (
          <CreatureSection
            title="🐉 Mythic"
            creatures={groupedCreatures.mythic}
            capturedIds={capturedIds}
            color="rainbow"
            onCreatureClick={handleCreatureClick}
          />
        )}
        
        <CreatureSection
          title="✨ Legendary"
          creatures={groupedCreatures.legendary}
          capturedIds={capturedIds}
          color="yellow"
          onCreatureClick={handleCreatureClick}
        />
        
        <CreatureSection
          title="💎 Rare"
          creatures={groupedCreatures.rare}
          capturedIds={capturedIds}
          color="purple"
          onCreatureClick={handleCreatureClick}
        />
        
        <CreatureSection
          title="🌟 Common"
          creatures={groupedCreatures.common}
          capturedIds={capturedIds}
          color="gray"
          onCreatureClick={handleCreatureClick}
        />
      </div>
      
      <div className="p-4 bg-purple-900/50">
        <div className="flex justify-around text-center">
          <div>
            <div className="text-2xl font-bold text-yellow-400">{userProgress.currentStreak}</div>
            <div className="text-xs text-purple-300">Day Streak</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400">{userProgress.totalSessions}</div>
            <div className="text-xs text-purple-300">Total Sessions</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-pink-400">{userProgress.longestStreak}</div>
            <div className="text-xs text-purple-300">Best Streak</div>
          </div>
        </div>
      </div>

      {selectedCreature && (
        <CreatureDetailModal
          creature={selectedCreature}
          capturedCreatures={userProgress.capturedCreatures}
          onClose={() => setSelectedCreature(null)}
        />
      )}
    </div>
  );
}

interface CreatureSectionProps {
  title: string;
  creatures: Creature[];
  capturedIds: Set<string>;
  color: 'yellow' | 'purple' | 'gray' | 'rainbow';
  onCreatureClick: (creature: Creature) => void;
}

function CreatureSection({ title, creatures, capturedIds, color, onCreatureClick }: CreatureSectionProps) {
  const capturedCount = creatures.filter(c => capturedIds.has(c.id)).length;
  
  const colorClasses = {
    rainbow: 'border-orange-500/50 bg-gradient-to-r from-orange-900/20 via-red-900/20 to-yellow-900/20',
    yellow: 'border-yellow-500/30 bg-yellow-900/10',
    purple: 'border-purple-500/30 bg-purple-900/10',
    gray: 'border-gray-500/30 bg-gray-900/10'
  };
  
  if (creatures.length === 0) return null;
  
  return (
    <div className={`mb-6 p-4 rounded-2xl border ${colorClasses[color]}`}>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold">{title}</h2>
        <span className="text-sm text-purple-300">{capturedCount}/{creatures.length}</span>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        {creatures.map(creature => {
          const isCaptured = capturedIds.has(creature.id);
          
          return (
            <button
              key={creature.id}
              onClick={() => onCreatureClick(creature)}
              disabled={!isCaptured}
              className={`aspect-square rounded-xl flex flex-col items-center justify-center p-2 transition-all ${
                isCaptured
                  ? 'bg-purple-800/50 hover:bg-purple-700/50 cursor-pointer active:scale-95'
                  : 'bg-purple-900/30 opacity-50 cursor-default'
              }`}
            >
              <div className={`${isCaptured ? 'animate-float' : 'grayscale opacity-50'}`}>
                {isCaptured ? (
                  <CreatureArt creature={creature} size={48} animated={false} />
                ) : (
                  <div className="w-12 h-12 flex items-center justify-center text-2xl">❓</div>
                )}
              </div>
              <div className="text-xs text-center mt-1 truncate w-full">
                {isCaptured ? creature.name : '???'}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface CreatureDetailModalProps {
  creature: Creature;
  capturedCreatures: CapturedCreature[];
  onClose: () => void;
}

function CreatureDetailModal({ creature, capturedCreatures, onClose }: CreatureDetailModalProps) {
  const captureCount = capturedCreatures.filter(c => c.id === creature.id).length;
  const elementType = getElementType(creature.region);
  
  const elementColors: Record<string, string> = {
    Nature: 'bg-green-600',
    Water: 'bg-blue-600',
    Fire: 'bg-orange-600',
    Electric: 'bg-yellow-500',
    Air: 'bg-cyan-500',
    Cosmic: 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500',
  };

  const rarityColors: Record<string, string> = {
    common: 'text-gray-300',
    rare: 'text-purple-400',
    legendary: 'text-yellow-400',
    mythic: 'text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400',
  };

  const formatHeight = (cm: number): string => {
    if (cm >= 100) {
      return `${(cm / 100).toFixed(1)}m`;
    }
    return `${cm}cm`;
  };

  const formatWeight = (kg: number): string => {
    if (kg >= 1000) {
      return `${(kg / 1000).toFixed(1)}t`;
    }
    if (kg < 1) {
      return `${(kg * 1000).toFixed(0)}g`;
    }
    return `${kg}kg`;
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-purple-900/95 rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl border border-purple-500/30"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative bg-gradient-to-b from-purple-800/50 to-transparent p-6 flex flex-col items-center">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-purple-800/80 flex items-center justify-center text-purple-300 hover:bg-purple-700/80 transition-colors"
          >
            ✕
          </button>
          
          <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-purple-800/80 text-xs text-purple-300">
            Series {creature.series}
          </div>
          
          <div className="animate-float">
            <CreatureArt creature={creature} size={120} animated={true} />
          </div>
          
          <h2 className={`text-2xl font-bold mt-4 ${rarityColors[creature.rarity]}`}>
            {creature.name}
          </h2>
          
          <div className="flex gap-2 mt-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${elementColors[elementType]}`}>
              {elementType}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-700/60 text-purple-200 capitalize">
              {creature.rarity}
            </span>
          </div>
        </div>
        
        <div className="px-6 pb-6">
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-purple-800/40 rounded-xl p-3 text-center">
              <div className="text-lg font-bold text-white">{formatHeight(creature.height)}</div>
              <div className="text-xs text-purple-300">Height</div>
            </div>
            <div className="bg-purple-800/40 rounded-xl p-3 text-center">
              <div className="text-lg font-bold text-white">{formatWeight(creature.weight)}</div>
              <div className="text-xs text-purple-300">Weight</div>
            </div>
            <div className="bg-purple-800/40 rounded-xl p-3 text-center">
              <div className="text-lg font-bold text-yellow-400">×{captureCount}</div>
              <div className="text-xs text-purple-300">Caught</div>
            </div>
          </div>
          
          <div className="bg-purple-800/30 rounded-xl p-4">
            <p className="text-sm text-purple-100 leading-relaxed">
              {creature.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
