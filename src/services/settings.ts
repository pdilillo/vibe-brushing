const SETTINGS_KEY = 'sparkle-app-settings';

export interface AppSettings {
  sessionDurationSeconds: 60 | 90 | 120;
}

const DEFAULT_SETTINGS: AppSettings = {
  sessionDurationSeconds: 120,
};

export function getSettings(): AppSettings {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.warn('Failed to load settings:', e);
  }
  return DEFAULT_SETTINGS;
}

export function saveSettings(settings: AppSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.warn('Failed to save settings:', e);
  }
}

export function getSessionDurationSeconds(): number {
  const settings = getSettings();
  return settings.sessionDurationSeconds;
}
