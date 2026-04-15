import { hasBrushedToday } from '../utils/date';
import type { UserProgress } from '../types';

interface StreakStampCardProps {
  userProgress: UserProgress;
  onOpenPrize: () => void;
}

export function StreakStampCard({ userProgress, onOpenPrize }: StreakStampCardProps) {
  const pending = userProgress.streakPrizePending ?? false;
  const count = userProgress.streakPrizeStampCount ?? 0;
  const brushedToday = hasBrushedToday(userProgress.lastSessionDate);

  const filledSlots = pending ? 7 : count;
  const todaySlotIndex =
    pending && brushedToday
      ? 6
      : brushedToday
        ? Math.max(0, count - 1)
        : Math.min(count, 6);
  const showTodayMarker = !pending;

  return (
    <div className="w-full max-w-md rounded-2xl bg-purple-900/60 border border-purple-500/30 px-4 py-3 text-left">
      <div className="flex items-center justify-between gap-2 mb-2">
        <h2 className="text-sm font-bold text-purple-100 uppercase tracking-wide">7-day sparkle streak</h2>
        <span className="text-xs text-purple-300">Brush once per day</span>
      </div>
      <div className="flex flex-nowrap justify-center gap-0.5 sm:gap-1 pb-4">
        {Array.from({ length: 7 }, (_, i) => {
          const filled = i < filledSlots;
          const isToday = showTodayMarker && i === todaySlotIndex;
          return (
            <div
              key={i}
              className={`relative flex h-8 w-8 shrink-0 sm:h-9 sm:w-9 items-center justify-center rounded-lg border-2 text-base sm:text-lg transition-all ${
                filled
                  ? 'border-amber-400/80 bg-gradient-to-br from-amber-500/30 to-orange-600/20 shadow-[0_0_12px_rgba(251,191,36,0.35)]'
                  : isToday
                    ? 'border-cyan-400/90 bg-purple-800/40 shadow-[0_0_0_2px_rgba(34,211,238,0.35)] animate-pulse'
                    : 'border-purple-600/50 bg-purple-950/40 opacity-70'
              }`}
              title={isToday ? 'Today' : filled ? 'Done' : 'Upcoming'}
            >
              {filled ? '✓' : '○'}
              {isToday && (
                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[9px] font-bold uppercase text-cyan-300 whitespace-nowrap">
                  Today
                </span>
              )}
            </div>
          );
        })}
      </div>
      {pending && (
        <div className="mt-5 flex flex-col items-center gap-2">
          <p className="text-sm text-amber-200 font-medium text-center">You did it — open your prize!</p>
          <button
            type="button"
            onClick={onOpenPrize}
            className="group relative flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/40 active:scale-95 transition-transform animate-bounce-gentle"
            aria-label="Open streak prize"
          >
            <span className="text-4xl drop-shadow-md group-hover:scale-110 transition-transform">🎁</span>
            <span className="absolute inset-0 rounded-2xl ring-2 ring-amber-300/50 animate-pulse pointer-events-none" />
          </button>
        </div>
      )}
    </div>
  );
}
