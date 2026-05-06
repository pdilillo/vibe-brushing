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

export type CreatureSeries = 1 | 2 | 3 | 4;

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
  series: CreatureSeries;
  requiresAllCreatures?: boolean;
}

export interface CapturedCreature extends Creature {
  capturedAt: Date;
}

export interface Buddy {
  id: string;
  name: string;
  imageUrl: string;
  unlockCondition: 'starter' | 'sessions' | 'streak' | 'creature' | 'series' | 'secret' | 'perfect-session';
  unlockThreshold?: number;
  unlockSeries?: CreatureSeries;
}

export interface UnlockedBuddy extends Buddy {
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
  unlockedBuddies: UnlockedBuddy[];
  selectedBuddyId?: string;
  /** 0–6 stamps earned toward the 7-day prize; 7th day sets streakPrizePending */
  streakPrizeStampCount?: number;
  /** True when 7 consecutive days are complete — claim opens the prize */
  streakPrizePending?: boolean;
  /** Local YYYY-MM-DD when a streak stamp was last counted (one per day max) */
  lastStreakStampLocalDate?: string;
  /** Sticker ids unlocked for the photo editor (includes streak prizes) */
  unlockedStickerIds?: string[];
  /** Creature ids whose streak tale has been unlocked (random order; pool in streakCreatureStories) */
  unlockedCreatureStoryIds?: string[];
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
  category: 'creatures' | 'stars' | 'dental' | 'fun' | 'streak';
  /** If true, only available after unlocking via 7-day streak prize */
  streakReward?: boolean;
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
  | 'buddy-select'
  | 'countdown'
  | 'brushing'
  | 'results'
  | 'capture'
  | 'photos'
  | 'editor'
  | 'collection'
  | 'buddy-debug'
  | 'graphics-debug'
  | 'photo-debug'
  | 'streak-prize-debug'
  | 'sparkle-tales-debug';
