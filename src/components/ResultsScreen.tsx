import type { ZoneProgress } from '../types';
import { MOUTH_ZONES } from '../services/motionDetector';

interface ResultsScreenProps {
  cleaningPercentage: number;
  zoneProgress: ZoneProgress[];
  onContinue: () => void;
}

export function ResultsScreen({ cleaningPercentage, zoneProgress, onContinue }: ResultsScreenProps) {
  const rating = getRating(cleaningPercentage);
  
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <div className="text-6xl mb-4 animate-bounce-gentle">
        {rating.emoji}
      </div>
      
      <h1 className="text-3xl font-bold mb-2">{rating.title}</h1>
      
      <div className="text-6xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent mb-4">
        {Math.round(cleaningPercentage)}%
      </div>
      
      <p className="text-lg text-purple-200 mb-6 max-w-xs">
        {rating.message}
      </p>
      
      <div className="grid grid-cols-3 gap-3 w-full max-w-xs mb-8">
        {MOUTH_ZONES.map(zone => {
          const progress = zoneProgress.find(p => p.zoneId === zone.id);
          const isComplete = progress?.isComplete || false;
          const percentage = Math.round(progress?.cleaningProgress || 0);
          
          return (
            <div
              key={zone.id}
              className={`p-3 rounded-xl ${
                isComplete ? 'bg-green-900/50' : 'bg-purple-900/50'
              }`}
            >
              <div className="text-2xl mb-1">
                {isComplete ? '✨' : '🦷'}
              </div>
              <div className="text-xs text-purple-300">{zone.label}</div>
              <div className={`text-sm font-bold ${
                isComplete ? 'text-green-400' : 'text-purple-400'
              }`}>
                {percentage}%
              </div>
            </div>
          );
        })}
      </div>
      
      <button
        onClick={onContinue}
        className="w-full max-w-xs py-4 text-xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl animate-pulse-glow"
      >
        Catch a Creature! 🎯
      </button>
    </div>
  );
}

interface Rating {
  emoji: string;
  title: string;
  message: string;
}

function getRating(percentage: number): Rating {
  if (percentage >= 95) {
    return {
      emoji: '🌟',
      title: 'LEGENDARY!',
      message: 'Your teeth are sparkling like diamonds! Amazing job!'
    };
  } else if (percentage >= 80) {
    return {
      emoji: '🎉',
      title: 'Super Clean!',
      message: 'Wow! Your teeth are super sparkly! Great brushing!'
    };
  } else if (percentage >= 60) {
    return {
      emoji: '😊',
      title: 'Good Job!',
      message: 'Nice work! A little more brushing next time!'
    };
  } else if (percentage >= 40) {
    return {
      emoji: '💪',
      title: 'Keep Trying!',
      message: 'You can do better! Brush all areas next time!'
    };
  } else {
    return {
      emoji: '🦷',
      title: 'Try Again!',
      message: "Don't give up! Brush longer next time!"
    };
  }
}
