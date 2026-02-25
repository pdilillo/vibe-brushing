export interface MouthZone {
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ZoneProgress {
  zoneId: string;
  cleaningProgress: number;
  isComplete: boolean;
}

export type Region = 'grassland' | 'coastal' | 'lava' | 'city' | 'sky';

export interface RegionData {
  id: Region;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  particles: string[];
}

export interface Creature {
  id: string;
  name: string;
  region: Region | 'all';
  rarity: 'common' | 'rare' | 'legendary' | 'mythic';
  description: string;
  robotParts: string[];
  monsterType: string;
  height: number;
  weight: number;
  requiresAllCreatures?: boolean;
}

export interface CapturedCreature extends Creature {
  capturedAt: Date;
}

export interface Hat {
  id: string;
  name: string;
  imageUrl: string;
  unlockCondition: 'starter' | 'sessions' | 'streak' | 'creature';
  unlockThreshold?: number;
}

export interface UnlockedHat extends Hat {
  unlockedAt: Date;
}

export interface CaptureAttempt {
  creatureId: string;
  success: boolean;
  captureRate: number;
}

export interface BrushingSession {
  id: string;
  date: Date;
  duration: number;
  cleaningPercentage: number;
  zoneProgress: ZoneProgress[];
  captureAttempt?: CaptureAttempt;
  photos: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  avatarColor: string;
  createdAt: Date;
}

export interface UserProgress {
  id: string;
  profileId: string;
  totalSessions: number;
  currentStreak: number;
  longestStreak: number;
  lastSessionDate?: Date;
  capturedCreatures: CapturedCreature[];
  unlockedHats: UnlockedHat[];
  selectedHatId?: string;
}

export interface DecoratedPhoto {
  id: string;
  sessionId: string;
  originalPhoto: string;
  decoratedPhoto: string;
  stickers: PlacedSticker[];
  backgroundId?: string;
  createdAt: Date;
}

export interface Sticker {
  id: string;
  name: string;
  imageUrl: string;
  category: 'creatures' | 'stars' | 'dental' | 'fun';
}

export interface PlacedSticker {
  stickerId: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

export interface Background {
  id: string;
  name: string;
  imageUrl: string;
}

export type GamePhase = 
  | 'profile-select'
  | 'home'
  | 'settings'
  | 'camera-check'
  | 'hat-select'
  | 'countdown'
  | 'brushing'
  | 'results'
  | 'capture'
  | 'photos'
  | 'editor'
  | 'collection'
  | 'hat-debug'
  | 'graphics-debug';
