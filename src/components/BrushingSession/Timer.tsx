interface TimerProps {
  timeRemaining: number;
  totalTime: number;
}

export function Timer({ timeRemaining, totalTime }: TimerProps) {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const progress = ((totalTime - timeRemaining) / totalTime) * 100;
  
  const isLowTime = timeRemaining <= 30;
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="48"
            cy="48"
            r="44"
            fill="none"
            stroke="rgba(139, 92, 246, 0.3)"
            strokeWidth="8"
          />
          <circle
            cx="48"
            cy="48"
            r="44"
            fill="none"
            stroke={isLowTime ? '#F59E0B' : '#8B5CF6'}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 44}`}
            strokeDashoffset={`${2 * Math.PI * 44 * (1 - progress / 100)}`}
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-2xl font-bold ${isLowTime ? 'text-amber-400 animate-pulse' : 'text-white'}`}>
            {minutes}:{seconds.toString().padStart(2, '0')}
          </span>
        </div>
      </div>
      <div className="mt-2 text-sm text-purple-300">
        {isLowTime ? 'Almost done!' : 'Keep brushing!'}
      </div>
    </div>
  );
}
