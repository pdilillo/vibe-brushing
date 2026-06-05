import { getCurrentProfileId } from './database';

const LEGACY_SETTINGS_KEY = 'sparkle-app-settings';

export interface AppSettings {
  sessionDurationSeconds: 60 | 90 | 120;
}

const DEFAULT_SETTINGS: AppSettings = {
  sessionDurationSeconds: 120,
};

const VALID_DURATIONS = new Set<AppSettings['sessionDurationSeconds']>([60, 90, 120]);

function settingsKeyForProfile(profileId: string): string {
  return `sparkle-app-settings-${profileId}`;
}

function parseSettings(raw: string): AppSettings | null {
  try {
    const parsed = JSON.parse(raw) as Partial<AppSettings>;
    const seconds = parsed.sessionDurationSeconds;
    if (seconds !== undefined && VALID_DURATIONS.has(seconds)) {
      return { ...DEFAULT_SETTINGS, sessionDurationSeconds: seconds };
    }
  } catch {
    // fall through
  }
  return null;
}

export function getSettings(profileId: string): AppSettings {
  try {
    const stored = localStorage.getItem(settingsKeyForProfile(profileId));
    if (stored) {
      const parsed = parseSettings(stored);
      if (parsed) return parsed;
    }
    // One-time fallback for installs that used a single global settings key
    const legacy = localStorage.getItem(LEGACY_SETTINGS_KEY);
    if (legacy) {
      const parsed = parseSettings(legacy);
      if (parsed) return parsed;
    }
  } catch (e) {
    console.warn('Failed to load settings:', e);
  }
  return DEFAULT_SETTINGS;
}

export function saveSettings(profileId: string, settings: AppSettings): void {
  try {
    localStorage.setItem(settingsKeyForProfile(profileId), JSON.stringify(settings));
  } catch (e) {
    console.warn('Failed to save settings:', e);
  }
}

export function getSessionDurationSeconds(profileId?: string | null): number {
  const id = profileId ?? getCurrentProfileId();
  if (!id) return DEFAULT_SETTINGS.sessionDurationSeconds;
  return getSettings(id).sessionDurationSeconds;
}
