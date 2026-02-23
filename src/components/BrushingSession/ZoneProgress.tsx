import type { ZoneProgress as ZoneProgressType } from '../../types';
import { MOUTH_ZONES } from '../../services/motionDetector';

interface ZoneProgressProps {
  zoneProgress: ZoneProgressType[];
  overallProgress: number;
}

export function ZoneProgress({ zoneProgress, overallProgress }: ZoneProgressProps) {
  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-purple-300">Overall Clean</span>
          <span className="text-white font-bold">{Math.round(overallProgress)}%</span>
        </div>
        <div className="h-4 bg-purple-900/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-300"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        {MOUTH_ZONES.map(zone => {
          const progress = zoneProgress.find(p => p.zoneId === zone.id);
          const cleaningProgress = progress?.cleaningProgress || 0;
          const isComplete = progress?.isComplete || false;
          
          return (
            <div key={zone.id} className="text-center">
              <div className="text-xs text-purple-300 mb-1 truncate">{zone.label}</div>
              <div className="h-2 bg-purple-900/50 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    isComplete
                      ? 'bg-gradient-to-r from-yellow-400 to-amber-500'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500'
                  }`}
                  style={{ width: `${cleaningProgress}%` }}
                />
              </div>
              {isComplete && (
                <div className="text-xs mt-1 animate-sparkle">✨</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
