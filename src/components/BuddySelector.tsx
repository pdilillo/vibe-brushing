import { ALL_BUDDIES, getUnlockedBuddies } from '../data/buddies';
import type { UserProgress, Buddy } from '../types';
import { BuddyPreview } from './BuddyPreview';

interface BuddySelectorProps {
  userProgress: UserProgress;
  onSelect: (buddy: Buddy | null) => void;
  onBack: () => void;
}

export function BuddySelector({ userProgress, onSelect, onBack }: BuddySelectorProps) {
  const capturedIds = userProgress.capturedCreatures.map(c => c.id);
  const unlockedBuddies = getUnlockedBuddies(
    userProgress.totalSessions,
    userProgress.currentStreak,
    userProgress.capturedCreatures.length,
    capturedIds
  );
  
  const unlockedIds = new Set(unlockedBuddies.map(b => b.id));

  return (
    <div className="flex flex-col h-full p-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="px-4 py-2 text-purple-300 bg-purple-800/50 rounded-xl"
        >
          ← Back
        </button>
        <h1 className="text-xl font-bold">Choose Your Buddy!</h1>
        <div className="w-16" />
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <button
            onClick={() => onSelect(null)}
            className="aspect-square bg-purple-800/30 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-purple-500/50 active:scale-95 transition-transform"
          >
            <div className="text-3xl mb-1">🚫</div>
            <div className="text-xs text-purple-300">No Buddy</div>
          </button>
          
          {ALL_BUDDIES.map(buddy => {
            const isUnlocked = unlockedIds.has(buddy.id);
            
            return (
              <button
                key={buddy.id}
                onClick={() => isUnlocked && onSelect(buddy)}
                disabled={!isUnlocked}
                className={`aspect-square rounded-2xl flex flex-col items-center justify-center transition-all p-2 ${
                  isUnlocked
                    ? 'bg-purple-800/50 active:scale-95'
                    : 'bg-purple-900/30 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className={`flex-1 flex items-center justify-center w-full ${isUnlocked ? '' : 'grayscale'}`}>
                  {isUnlocked ? (
                    <BuddyPreview buddyId={buddy.id} size={90} />
                  ) : (
                    <span className="text-4xl">🔒</span>
                  )}
                </div>
                <div className="text-xs text-center px-1 truncate w-full mt-1">
                  {isUnlocked ? buddy.name : getUnlockHint(buddy)}
                </div>
              </button>
            );
          })}
        </div>
      </div>
      
      <button
        onClick={() => onSelect(null)}
        className="w-full py-4 text-xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl"
      >
        Start Without Buddy
      </button>
    </div>
  );
}

function getUnlockHint(buddy: Buddy): string {
  switch (buddy.unlockCondition) {
    case 'sessions':
      return `${buddy.unlockThreshold} sessions`;
    case 'streak':
      return `${buddy.unlockThreshold} day streak`;
    case 'creature':
      return `${buddy.unlockThreshold} creatures`;
    case 'series':
      return `Complete Series ${buddy.unlockSeries}`;
    default:
      return 'Locked';
  }
}
