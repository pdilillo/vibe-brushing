import { ALL_CREATURES } from '../../data/creatures';
import { CreatureArt } from '../CreatureArt';
import type { UserProgress, Creature } from '../../types';

interface CollectionProps {
  userProgress: UserProgress;
  onBack: () => void;
}

export function Collection({ userProgress, onBack }: CollectionProps) {
  const capturedIds = new Set(userProgress.capturedCreatures.map(c => c.id));
  
  const groupedCreatures = {
    legendary: ALL_CREATURES.filter(c => c.rarity === 'legendary'),
    rare: ALL_CREATURES.filter(c => c.rarity === 'rare'),
    common: ALL_CREATURES.filter(c => c.rarity === 'common')
  };

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
          {capturedIds.size}/{ALL_CREATURES.length}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <CreatureSection
          title="✨ Legendary"
          creatures={groupedCreatures.legendary}
          capturedIds={capturedIds}
          color="yellow"
        />
        
        <CreatureSection
          title="💎 Rare"
          creatures={groupedCreatures.rare}
          capturedIds={capturedIds}
          color="purple"
        />
        
        <CreatureSection
          title="🌟 Common"
          creatures={groupedCreatures.common}
          capturedIds={capturedIds}
          color="gray"
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
    </div>
  );
}

interface CreatureSectionProps {
  title: string;
  creatures: Creature[];
  capturedIds: Set<string>;
  color: 'yellow' | 'purple' | 'gray';
}

function CreatureSection({ title, creatures, capturedIds, color }: CreatureSectionProps) {
  const capturedCount = creatures.filter(c => capturedIds.has(c.id)).length;
  
  const colorClasses = {
    yellow: 'border-yellow-500/30 bg-yellow-900/10',
    purple: 'border-purple-500/30 bg-purple-900/10',
    gray: 'border-gray-500/30 bg-gray-900/10'
  };
  
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
            <div
              key={creature.id}
              className={`aspect-square rounded-xl flex flex-col items-center justify-center p-2 transition-all ${
                isCaptured
                  ? 'bg-purple-800/50'
                  : 'bg-purple-900/30 opacity-50'
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
