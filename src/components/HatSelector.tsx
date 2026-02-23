import { ALL_HATS, getUnlockedHats } from '../data/hats';
import type { UserProgress, Hat } from '../types';
import { HatPreview } from './HatPreview';

interface HatSelectorProps {
  userProgress: UserProgress;
  onSelect: (hat: Hat | null) => void;
  onBack: () => void;
}

export function HatSelector({ userProgress, onSelect, onBack }: HatSelectorProps) {
  const unlockedHats = getUnlockedHats(
    userProgress.totalSessions,
    userProgress.currentStreak,
    userProgress.capturedCreatures.length
  );
  
  const unlockedIds = new Set(unlockedHats.map(h => h.id));

  return (
    <div className="flex flex-col h-full p-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="px-4 py-2 text-purple-300 bg-purple-800/50 rounded-xl"
        >
          ← Back
        </button>
        <h1 className="text-xl font-bold">Choose Your Hat!</h1>
        <div className="w-16" />
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <button
            onClick={() => onSelect(null)}
            className="aspect-square bg-purple-800/30 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-purple-500/50 active:scale-95 transition-transform"
          >
            <div className="text-3xl mb-1">🚫</div>
            <div className="text-xs text-purple-300">No Hat</div>
          </button>
          
          {ALL_HATS.map(hat => {
            const isUnlocked = unlockedIds.has(hat.id);
            
            return (
              <button
                key={hat.id}
                onClick={() => isUnlocked && onSelect(hat)}
                disabled={!isUnlocked}
                className={`aspect-square rounded-2xl flex flex-col items-center justify-center transition-all p-2 ${
                  isUnlocked
                    ? 'bg-purple-800/50 active:scale-95'
                    : 'bg-purple-900/30 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className={`flex-1 flex items-center justify-center w-full ${isUnlocked ? '' : 'grayscale'}`}>
                  {isUnlocked ? (
                    <HatPreview hatId={hat.id} size={60} />
                  ) : (
                    <span className="text-4xl">🔒</span>
                  )}
                </div>
                <div className="text-xs text-center px-1 truncate w-full mt-1">
                  {isUnlocked ? hat.name : getUnlockHint(hat)}
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
        Start Without Hat
      </button>
    </div>
  );
}

function getUnlockHint(hat: Hat): string {
  switch (hat.unlockCondition) {
    case 'sessions':
      return `${hat.unlockThreshold} sessions`;
    case 'streak':
      return `${hat.unlockThreshold} day streak`;
    case 'creature':
      return `${hat.unlockThreshold} creatures`;
    default:
      return 'Locked';
  }
}
