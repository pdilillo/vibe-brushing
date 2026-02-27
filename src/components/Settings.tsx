import { useState, useEffect } from 'react';
import { getSettings, saveSettings, type AppSettings } from '../services/settings';
import { version } from '../../package.json';

interface SettingsProps {
  onBack: () => void;
  onBuddyDebug?: () => void;
  onGraphicsDebug?: () => void;
  onPhotoDebug?: () => void;
}

export function Settings({ onBack, onBuddyDebug, onGraphicsDebug, onPhotoDebug }: SettingsProps) {
  const [settings, setSettings] = useState<AppSettings>(getSettings);

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  const handleDurationChange = (seconds: 60 | 90 | 120) => {
    setSettings(prev => ({ ...prev, sessionDurationSeconds: seconds }));
  };

  const durationOptions: { value: 60 | 90 | 120; label: string; description: string }[] = [
    { value: 60, label: '1 Minute', description: 'Quick brush' },
    { value: 90, label: '1:30', description: 'Standard brush' },
    { value: 120, label: '2 Minutes', description: 'Recommended' },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 bg-purple-900/50">
        <button
          onClick={onBack}
          className="px-4 py-2 text-purple-300 bg-purple-800/50 rounded-xl"
        >
          ← Back
        </button>
        <h1 className="text-xl font-bold">Settings</h1>
        <div className="w-20" />
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="bg-purple-900/30 rounded-2xl p-4 mb-4">
          <h2 className="text-lg font-bold mb-1">Brushing Duration</h2>
          <p className="text-sm text-purple-300 mb-4">
            How long should each brushing session last?
          </p>

          <div className="space-y-2">
            {durationOptions.map(option => (
              <button
                key={option.value}
                onClick={() => handleDurationChange(option.value)}
                className={`w-full p-4 rounded-xl flex items-center justify-between transition-all ${
                  settings.sessionDurationSeconds === option.value
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'bg-purple-800/50 text-purple-200 hover:bg-purple-700/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    settings.sessionDurationSeconds === option.value
                      ? 'border-white bg-white'
                      : 'border-purple-400'
                  }`}>
                    {settings.sessionDurationSeconds === option.value && (
                      <div className="w-3 h-3 rounded-full bg-purple-600" />
                    )}
                  </div>
                  <div className="text-left">
                    <div className="font-bold">{option.label}</div>
                    <div className={`text-xs ${
                      settings.sessionDurationSeconds === option.value
                        ? 'text-white/80'
                        : 'text-purple-400'
                    }`}>
                      {option.description}
                    </div>
                  </div>
                </div>
                {option.value === 120 && (
                  <span className="text-xs bg-yellow-500 text-yellow-900 px-2 py-1 rounded-full font-bold">
                    ⭐ Best
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-purple-900/30 rounded-2xl p-4 mb-4">
          <h2 className="text-lg font-bold mb-2">About Sparkle</h2>
          <p className="text-sm text-purple-300">
            Sparkle makes tooth brushing fun! Brush your teeth to clean creatures,
            catch them, and build your collection.
          </p>
          <div className="mt-4 text-center text-xs text-purple-500">
            Version {version}
          </div>
        </div>

        {(onBuddyDebug || onGraphicsDebug || onPhotoDebug) && (
          <div className="bg-gray-900/50 rounded-2xl p-4 border border-gray-700">
            <h2 className="text-lg font-bold mb-2 text-gray-300">Developer Tools</h2>
            <div className="space-y-2">
              {onGraphicsDebug && (
                <button
                  onClick={onGraphicsDebug}
                  className="w-full p-4 bg-gray-800 hover:bg-gray-700 rounded-xl text-left transition-colors"
                >
                  <div className="font-bold text-purple-400">Graphics Debug Menu</div>
                  <div className="text-xs text-gray-400 mt-1">
                    Preview all creatures and buddy graphics in a gallery view
                  </div>
                </button>
              )}
              {onBuddyDebug && (
                <button
                  onClick={onBuddyDebug}
                  className="w-full p-4 bg-gray-800 hover:bg-gray-700 rounded-xl text-left transition-colors"
                >
                  <div className="font-bold text-green-400">Buddy Debug Mode</div>
                  <div className="text-xs text-gray-400 mt-1">
                    Test buddy animation with activity level simulation
                  </div>
                </button>
              )}
              {onPhotoDebug && (
                <button
                  onClick={onPhotoDebug}
                  className="w-full p-4 bg-gray-800 hover:bg-gray-700 rounded-xl text-left transition-colors"
                >
                  <div className="font-bold text-pink-400">Photo Editor Debug</div>
                  <div className="text-xs text-gray-400 mt-1">
                    Test photo editing with all stickers unlocked and no limits
                  </div>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
