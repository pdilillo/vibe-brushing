import type { ZoneProgress } from '../types';

interface ResultsScreenProps {
  cleaningPercentage: number;
  zoneProgress: ZoneProgress[];
  onContinue: () => void;
}

export function ResultsScreen({ cleaningPercentage, onContinue }: ResultsScreenProps) {
  const rating = getRating(cleaningPercentage);
  const isComplete = cleaningPercentage >= 100;
  
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
      
      <div className="w-full max-w-xs mb-8">
        <div className={`p-4 rounded-xl ${isComplete ? 'bg-green-900/50' : 'bg-purple-900/50'}`}>
          <div className="text-4xl mb-2">
            {isComplete ? '✨' : '🦷'}
          </div>
          <div className="text-sm text-purple-300 mb-2">Brushing Score</div>
          <div className="h-4 bg-black/30 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                isComplete 
                  ? 'bg-gradient-to-r from-yellow-400 to-amber-500'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500'
              }`}
              style={{ width: `${cleaningPercentage}%` }}
            />
          </div>
          <div className={`text-lg font-bold mt-2 ${isComplete ? 'text-green-400' : 'text-purple-400'}`}>
            {isComplete ? 'Complete!' : 'Keep practicing!'}
          </div>
        </div>
      </div>
      
      <button
        onClick={onContinue}
        className="w-full max-w-xs py-4 text-xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl animate-button-glow"
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
