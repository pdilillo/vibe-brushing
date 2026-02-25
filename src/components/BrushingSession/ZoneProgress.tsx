import type { ZoneProgress as ZoneProgressType } from '../../types';

interface ZoneProgressProps {
  zoneProgress: ZoneProgressType[];
  overallProgress: number;
}

export function ZoneProgress({ zoneProgress: _zoneProgress, overallProgress }: ZoneProgressProps) {
  const isComplete = overallProgress >= 100;
  
  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-purple-300">Brushing Progress</span>
          <span className="text-white font-bold">{Math.round(overallProgress)}%</span>
        </div>
        <div className="h-6 bg-purple-900/50 rounded-full overflow-hidden relative">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              isComplete 
                ? 'bg-gradient-to-r from-yellow-400 to-amber-500' 
                : 'bg-gradient-to-r from-green-400 to-emerald-500'
            }`}
            style={{ width: `${overallProgress}%` }}
          />
          {isComplete && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold text-white drop-shadow animate-pulse">
                ✨ Complete! Keep brushing! ✨
              </span>
            </div>
          )}
        </div>
      </div>
      
      <div className="text-center text-sm text-purple-300">
        {isComplete ? (
          <span className="text-green-400">Great job! Keep it up to stay clean!</span>
        ) : overallProgress > 0 ? (
          <span>Keep brushing to fill the bar!</span>
        ) : (
          <span>Start brushing to see progress</span>
        )}
      </div>
    </div>
  );
}
