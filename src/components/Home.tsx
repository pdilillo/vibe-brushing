import type { UserProgress, UserProfile } from '../types';

interface HomeProps {
  userProgress: UserProgress;
  currentProfile: UserProfile;
  onStartBrushing: () => void;
  onViewCollection: () => void;
  onViewSettings: () => void;
  onSwitchProfile: () => void;
}

export function Home({ userProgress, currentProfile, onStartBrushing, onViewCollection, onViewSettings, onSwitchProfile }: HomeProps) {
  return (
    <div className="flex flex-col items-center justify-between h-full p-6 text-center">
      <div className="w-full flex justify-between items-center">
        <button
          onClick={onSwitchProfile}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-purple-800/50 hover:bg-purple-700/50 transition-colors"
        >
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
            style={{ backgroundColor: currentProfile.avatarColor }}
          >
            {currentProfile.name.charAt(0).toUpperCase()}
          </div>
          <span className="text-white font-medium">{currentProfile.name}</span>
          <svg className="w-4 h-4 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        </button>
        <button
          onClick={onViewSettings}
          className="p-2 text-2xl text-purple-300 hover:text-white transition-colors"
          aria-label="Settings"
        >
          ⚙️
        </button>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <div className="animate-bounce-gentle">
          <div className="text-8xl mb-4">✨🦷✨</div>
        </div>
        
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
          Sparkle Brush!
        </h1>
        
        <p className="text-xl text-purple-200 max-w-xs">
          Make your teeth sparkle and catch amazing creatures!
        </p>
        
        <div className="flex gap-4 mt-4 text-lg">
          <div className="bg-purple-800/50 rounded-xl px-4 py-2">
            <div className="text-2xl font-bold text-yellow-400">{userProgress.currentStreak}</div>
            <div className="text-sm text-purple-300">Day Streak</div>
          </div>
          <div className="bg-purple-800/50 rounded-xl px-4 py-2">
            <div className="text-2xl font-bold text-green-400">{userProgress.capturedCreatures.length}</div>
            <div className="text-sm text-purple-300">Creatures</div>
          </div>
          <div className="bg-purple-800/50 rounded-xl px-4 py-2">
            <div className="text-2xl font-bold text-pink-400">{userProgress.totalSessions}</div>
            <div className="text-sm text-purple-300">Sessions</div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-4 w-full max-w-xs pb-8">
        <button
          onClick={onStartBrushing}
          className="w-full py-5 px-8 text-2xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-lg animate-pulse-glow active:scale-95 transition-transform"
        >
          Start Brushing! 🪥
        </button>
        
        <button
          onClick={onViewCollection}
          className="w-full py-3 px-6 text-lg font-semibold text-purple-200 bg-purple-800/50 rounded-xl active:scale-95 transition-transform"
        >
          My Collection 🎨
        </button>
      </div>
    </div>
  );
}
