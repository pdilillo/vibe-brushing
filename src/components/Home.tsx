import { useEffect, useState, useCallback } from 'react';
import { useTitleTheme, playSoundEffect } from '../hooks/useAudio';
import { ALL_BUDDIES } from '../data/buddies';
import type { UserProgress, UserProfile, UnlockedBuddy } from '../types';

const TOOTH_CLICKS_TO_FLY = 7;

interface HomeProps {
  userProgress: UserProgress;
  currentProfile: UserProfile;
  onStartBrushing: () => void;
  onViewCollection: () => void;
  onViewSettings: () => void;
  onSwitchProfile: () => void;
  onUnlockSecretBuddy?: (buddy: UnlockedBuddy) => Promise<void>;
}

export function Home({ userProgress, currentProfile, onStartBrushing, onViewCollection, onViewSettings, onSwitchProfile, onUnlockSecretBuddy }: HomeProps) {
  const titleTheme = useTitleTheme();
  const [toothClicks, setToothClicks] = useState(0);
  const [toothOffset, setToothOffset] = useState({ x: 0, y: 0 });
  const [toothFlying, setToothFlying] = useState(false);
  const [toothFlown, setToothFlown] = useState(false);

  useEffect(() => {
    titleTheme.start();
    return () => titleTheme.stop();
  }, []);

  const hasToothBuddy = userProgress.unlockedBuddies.some(b => b.id === 'tooth-buddy');
  const toothBuddy = ALL_BUDDIES.find(b => b.id === 'tooth-buddy');

  const handleToothClick = useCallback(() => {
    if (toothFlying || toothFlown) return;
    const next = toothClicks + 1;
    setToothClicks(next);
    playSoundEffect('tooth-bounce');
    setToothOffset({
      x: (Math.random() - 0.5) * 60,
      y: (Math.random() - 0.5) * 40
    });
    if (next >= TOOTH_CLICKS_TO_FLY) {
      setToothFlying(true);
      playSoundEffect('tooth-fly');
      const angle = Math.random() * Math.PI * 0.6 + Math.PI * 0.2;
      const tx = Math.cos(angle) * 400 * (Math.random() > 0.5 ? 1 : -1);
      const ty = -Math.abs(Math.sin(angle) * 400) - 100;
      setToothOffset({ x: tx, y: ty });
      window.setTimeout(() => {
        setToothFlown(true);
        if (toothBuddy && !hasToothBuddy && onUnlockSecretBuddy) {
          const unlocked: UnlockedBuddy = { ...toothBuddy, unlockedAt: new Date() };
          onUnlockSecretBuddy(unlocked).catch(() => {});
        }
      }, 400);
    }
  }, [toothClicks, toothFlying, toothFlown, toothBuddy, hasToothBuddy, onUnlockSecretBuddy]);

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
        <div className="relative mb-4 flex items-center justify-center min-h-[6rem]">
          <div className="text-6xl">✨</div>
          {!toothFlown && (
            <button
              type="button"
              onClick={handleToothClick}
              className="absolute text-8xl cursor-pointer select-none touch-manipulation active:scale-95 transition-transform duration-75 hover:scale-110 focus:outline-none focus:ring-0"
              style={{
                transform: `translate(${toothOffset.x}px, ${toothOffset.y}px)`,
                transition: toothFlying ? 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'transform 0.2s ease-out'
              }}
              aria-label="Tap the tooth"
            >
              🦷
            </button>
          )}
          <div className="text-6xl">✨</div>
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
          className="w-full py-5 px-8 text-2xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-lg animate-button-glow active:scale-95 transition-transform"
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
