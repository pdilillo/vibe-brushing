import { useState, useEffect } from 'react';
import { getSettings, saveSettings, type AppSettings } from '../services/settings';

interface SettingsProps {
  onBack: () => void;
  onHatDebug?: () => void;
  onGraphicsDebug?: () => void;
}

export function Settings({ onBack, onHatDebug, onGraphicsDebug }: SettingsProps) {
  const [settings, setSettings] = useState<AppSettings>(getSettings);

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  const handleDurationChange = (minutes: 1 | 2 | 3) => {
    setSettings(prev => ({ ...prev, sessionDurationMinutes: minutes }));
  };

  const durationOptions: { value: 1 | 2 | 3; label: string; description: string }[] = [
    { value: 1, label: '1 Minute', description: 'Quick brush' },
    { value: 2, label: '2 Minutes', description: 'Recommended' },
    { value: 3, label: '3 Minutes', description: 'Extra thorough' },
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
                  settings.sessionDurationMinutes === option.value
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'bg-purple-800/50 text-purple-200 hover:bg-purple-700/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    settings.sessionDurationMinutes === option.value
                      ? 'border-white bg-white'
                      : 'border-purple-400'
                  }`}>
                    {settings.sessionDurationMinutes === option.value && (
                      <div className="w-3 h-3 rounded-full bg-purple-600" />
                    )}
                  </div>
                  <div className="text-left">
                    <div className="font-bold">{option.label}</div>
                    <div className={`text-xs ${
                      settings.sessionDurationMinutes === option.value
                        ? 'text-white/80'
                        : 'text-purple-400'
                    }`}>
                      {option.description}
                    </div>
                  </div>
                </div>
                {option.value === 2 && (
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
            Version 1.0.0
          </div>
        </div>

        {(onHatDebug || onGraphicsDebug) && (
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
                    Preview all creatures and hat graphics in a gallery view
                  </div>
                </button>
              )}
              {onHatDebug && (
                <button
                  onClick={onHatDebug}
                  className="w-full p-4 bg-gray-800 hover:bg-gray-700 rounded-xl text-left transition-colors"
                >
                  <div className="font-bold text-green-400">Hat Debug Mode</div>
                  <div className="text-xs text-gray-400 mt-1">
                    Test face tracking with debug overlay showing detected face rectangle
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
