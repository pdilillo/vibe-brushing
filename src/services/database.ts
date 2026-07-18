import Dexie, { type Table } from 'dexie';
import { ALL_BUDDIES } from '../data/buddies';
import { pickRandomUnlockedStoryId } from '../data/streakCreatureStories';
import { getNextStreakPrizeStickerId } from '../data/stickers';
import { formatLocalDateString } from '../utils/date';
import { computeStreakPrizeAfterSession } from './streakPrize';
import type { BrushingSession, UserProgress, DecoratedPhoto, CapturedCreature, UnlockedBuddy, UserProfile } from '../types';

const FIRE_FROG_BUDDY_ID = 'fire-frog';

const CURRENT_PROFILE_KEY = 'sparkle-brush-current-profile';

class SparkleBrushDatabase extends Dexie {
  sessions!: Table<BrushingSession>;
  userProgress!: Table<UserProgress>;
  photos!: Table<DecoratedPhoto>;
  profiles!: Table<UserProfile>;

  constructor() {
    super('SparkleBrushDB');
    this.version(2).stores({
      sessions: 'id, date, profileId',
      userProgress: 'id, profileId',
      photos: 'id, sessionId, createdAt',
      profiles: 'id, name, createdAt'
    });
    
    this.version(3).stores({
      sessions: 'id, date, profileId',
      userProgress: 'id, profileId',
      photos: 'id, sessionId, createdAt',
      profiles: 'id, name, createdAt'
    }).upgrade(tx => {
      return tx.table('userProgress').toCollection().modify(progress => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const oldProgress = progress as any;
        if (oldProgress.unlockedHats && !progress.unlockedBuddies) {
          progress.unlockedBuddies = oldProgress.unlockedHats;
          delete oldProgress.unlockedHats;
        }
        if (oldProgress.selectedHatId !== undefined && progress.selectedBuddyId === undefined) {
          progress.selectedBuddyId = oldProgress.selectedHatId;
          delete oldProgress.selectedHatId;
        }
        if (!progress.unlockedBuddies) {
          progress.unlockedBuddies = [];
        }
      });
    });

    this.version(4).stores({
      sessions: 'id, date, profileId',
      userProgress: 'id, profileId',
      photos: 'id, sessionId, createdAt',
      profiles: 'id, name, createdAt'
    }).upgrade(tx => {
      return tx.table('userProgress').toCollection().modify(progress => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const p = progress as any;
        if (p.streakPrizeStampCount === undefined) p.streakPrizeStampCount = 0;
        if (p.streakPrizePending === undefined) p.streakPrizePending = false;
        if (!p.unlockedStickerIds) p.unlockedStickerIds = [];
      });
    });

    this.version(5).stores({
      sessions: 'id, date, profileId',
      userProgress: 'id, profileId',
      photos: 'id, sessionId, createdAt',
      profiles: 'id, name, createdAt'
    }).upgrade(tx => {
      return tx.table('userProgress').toCollection().modify(progress => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const p = progress as any;
        if (!p.unlockedCreatureStoryIds) p.unlockedCreatureStoryIds = [];
      });
    });
  }
}

export const db = new SparkleBrushDatabase();

const AVATAR_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
];

let currentProfileId: string | null = null;

export function getCurrentProfileId(): string | null {
  if (currentProfileId) return currentProfileId;
  const stored = localStorage.getItem(CURRENT_PROFILE_KEY);
  currentProfileId = stored;
  return stored;
}

export function setCurrentProfileId(profileId: string | null): void {
  currentProfileId = profileId;
  if (profileId) {
    localStorage.setItem(CURRENT_PROFILE_KEY, profileId);
  } else {
    localStorage.removeItem(CURRENT_PROFILE_KEY);
  }
}

export async function getAllProfiles(): Promise<UserProfile[]> {
  return db.profiles.orderBy('createdAt').toArray();
}

export async function getProfile(profileId: string): Promise<UserProfile | undefined> {
  return db.profiles.get(profileId);
}

export async function createProfile(name: string): Promise<UserProfile> {
  const existingProfiles = await getAllProfiles();
  const usedColors = new Set(existingProfiles.map(p => p.avatarColor));
  const availableColor = AVATAR_COLORS.find(c => !usedColors.has(c)) || AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
  
  const profile: UserProfile = {
    id: `profile-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    name: name.trim(),
    avatarColor: availableColor,
    createdAt: new Date()
  };
  
  await db.profiles.add(profile);
  
  const progress: UserProgress = {
    id: `progress-${profile.id}`,
    profileId: profile.id,
    totalSessions: 0,
    currentStreak: 0,
    longestStreak: 0,
    capturedCreatures: [],
    unlockedBuddies: [],
    streakPrizeStampCount: 0,
    streakPrizePending: false,
    unlockedStickerIds: [],
    unlockedCreatureStoryIds: []
  };
  await db.userProgress.add(progress);
  
  return profile;
}

export async function updateProfile(profileId: string, updates: Partial<Pick<UserProfile, 'name' | 'avatarColor'>>): Promise<void> {
  await db.profiles.update(profileId, updates);
}

export async function deleteProfile(profileId: string): Promise<void> {
  await db.profiles.delete(profileId);
  await db.userProgress.where('profileId').equals(profileId).delete();
  await db.sessions.where('profileId').equals(profileId).delete();
  
  if (getCurrentProfileId() === profileId) {
    setCurrentProfileId(null);
  }
}

export async function getUserProgress(profileId?: string): Promise<UserProgress> {
  const targetProfileId = profileId || getCurrentProfileId();
  
  if (!targetProfileId) {
    throw new Error('No profile selected');
  }
  
  let progress = await db.userProgress.where('profileId').equals(targetProfileId).first();
  
  if (!progress) {
    progress = {
      id: `progress-${targetProfileId}`,
      profileId: targetProfileId,
      totalSessions: 0,
      currentStreak: 0,
      longestStreak: 0,
      capturedCreatures: [],
      unlockedBuddies: [],
      streakPrizeStampCount: 0,
      streakPrizePending: false,
      unlockedStickerIds: [],
      unlockedCreatureStoryIds: []
    };
    await db.userProgress.add(progress);
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const oldProgress = progress as any;
    if (oldProgress.unlockedHats && !progress.unlockedBuddies) {
      progress.unlockedBuddies = oldProgress.unlockedHats;
    }
    if (oldProgress.selectedHatId !== undefined && progress.selectedBuddyId === undefined) {
      progress.selectedBuddyId = oldProgress.selectedHatId;
    }
    if (!progress.unlockedBuddies) {
      progress.unlockedBuddies = [];
    }
    if (progress.streakPrizeStampCount === undefined) progress.streakPrizeStampCount = 0;
    if (progress.streakPrizePending === undefined) progress.streakPrizePending = false;
    if (!progress.unlockedStickerIds) progress.unlockedStickerIds = [];
    if (!progress.unlockedCreatureStoryIds) progress.unlockedCreatureStoryIds = [];
  }
  
  return progress;
}

export async function setStreakFreezeEnabled(enabled: boolean, profileId?: string): Promise<void> {
  await updateUserProgress({ streakFreezeEnabled: enabled }, profileId);
}

export async function updateUserProgress(updates: Partial<UserProgress>, profileId?: string): Promise<void> {
  const targetProfileId = profileId || getCurrentProfileId();
  if (!targetProfileId) {
    throw new Error('No profile selected');
  }
  
  const progress = await getUserProgress(targetProfileId);
  await db.userProgress.update(progress.id, updates);
}

export async function addSession(session: BrushingSession): Promise<void> {
  const profileId = getCurrentProfileId();
  if (!profileId) {
    throw new Error('No profile selected');
  }
  
  const sessionWithProfile = { ...session, profileId };
  await db.sessions.add(sessionWithProfile);
  
  const progress = await getUserProgress(profileId);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const streakFreezeActive = progress.streakFreezeEnabled ?? false;

  let newStreak = progress.currentStreak;
  if (progress.lastSessionDate) {
    const lastDate = new Date(progress.lastSessionDate);
    lastDate.setHours(0, 0, 0, 0);
    const dayDiff = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (dayDiff === 1) {
      newStreak += 1;
    } else if (dayDiff > 1 && streakFreezeActive) {
      newStreak += 1;
    } else if (dayDiff > 1) {
      newStreak = 1;
    }
  } else {
    newStreak = 1;
  }
  
  const now = new Date();
  const streakPrizeUpdate = computeStreakPrizeAfterSession(progress, now, {
    streakFreezeEnabled: streakFreezeActive,
  });

  await updateUserProgress({
    totalSessions: progress.totalSessions + 1,
    currentStreak: newStreak,
    longestStreak: Math.max(progress.longestStreak, newStreak),
    lastSessionDate: now,
    ...streakPrizeUpdate,
    unlockedStickerIds: progress.unlockedStickerIds ?? [],
    ...(streakFreezeActive ? { streakFreezeEnabled: false } : {}),
  }, profileId);

  const isPerfectBrush = Math.round(session.cleaningPercentage) >= 100;
  if (isPerfectBrush) {
    const fireFrog = ALL_BUDDIES.find(b => b.id === FIRE_FROG_BUDDY_ID);
    if (fireFrog) {
      await unlockBuddy({ ...fireFrog, unlockedAt: new Date() });
    }
  }
}

export async function addCapturedCreature(creature: CapturedCreature): Promise<void> {
  const profileId = getCurrentProfileId();
  if (!profileId) {
    throw new Error('No profile selected');
  }
  
  const progress = await getUserProgress(profileId);
  const alreadyCaptured = progress.capturedCreatures.some(c => c.id === creature.id);
  if (!alreadyCaptured) {
    await updateUserProgress({
      capturedCreatures: [...progress.capturedCreatures, creature]
    }, profileId);
  }
}

export async function unlockBuddy(buddy: UnlockedBuddy): Promise<void> {
  const profileId = getCurrentProfileId();
  if (!profileId) {
    throw new Error('No profile selected');
  }
  
  const progress = await getUserProgress(profileId);
  const alreadyUnlocked = progress.unlockedBuddies.some(b => b.id === buddy.id);
  if (!alreadyUnlocked) {
    await updateUserProgress({
      unlockedBuddies: [...progress.unlockedBuddies, buddy]
    }, profileId);
  }
}

/** Claim the pending 7-day streak prize: next streak sticker (ordered) and one random unclaimed creature tale. */
export async function claimStreakPrize(): Promise<{
  stickerId?: string;
  creatureStoryId?: string;
} | null> {
  const profileId = getCurrentProfileId();
  if (!profileId) {
    throw new Error('No profile selected');
  }
  const progress = await getUserProgress(profileId);
  if (!progress.streakPrizePending) {
    return null;
  }
  const unlocked = progress.unlockedStickerIds ?? [];
  const storyUnlocked = progress.unlockedCreatureStoryIds ?? [];
  const nextStickerId = getNextStreakPrizeStickerId(unlocked);
  const nextStoryId = pickRandomUnlockedStoryId(storyUnlocked);
  const todayStr = formatLocalDateString(new Date());
  const baseUpdate = {
    streakPrizePending: false,
    streakPrizeStampCount: 0,
    lastStreakStampLocalDate: todayStr
  };

  if (nextStickerId) {
    const updates: Partial<UserProgress> = {
      ...baseUpdate,
      unlockedStickerIds: [...unlocked, nextStickerId]
    };
    if (nextStoryId) {
      updates.unlockedCreatureStoryIds = [...storyUnlocked, nextStoryId];
    }
    await updateUserProgress(updates, profileId);
    return { stickerId: nextStickerId, creatureStoryId: nextStoryId ?? undefined };
  }

  if (nextStoryId) {
    await updateUserProgress({
      ...baseUpdate,
      unlockedCreatureStoryIds: [...storyUnlocked, nextStoryId]
    }, profileId);
    return { creatureStoryId: nextStoryId };
  }

  await updateUserProgress(baseUpdate, profileId);
  return null;
}

export async function setSelectedBuddy(buddyId: string | undefined): Promise<void> {
  const profileId = getCurrentProfileId();
  if (!profileId) {
    throw new Error('No profile selected');
  }
  await updateUserProgress({ selectedBuddyId: buddyId }, profileId);
}

export async function saveDecoratedPhoto(photo: DecoratedPhoto): Promise<void> {
  await db.photos.add(photo);
}

export async function getSessionHistory(): Promise<BrushingSession[]> {
  const profileId = getCurrentProfileId();
  if (!profileId) {
    return [];
  }
  return db.sessions.where('profileId').equals(profileId).reverse().limit(30).toArray();
}

export async function getDecoratedPhotos(): Promise<DecoratedPhoto[]> {
  return db.photos.orderBy('createdAt').reverse().toArray();
}

export async function migrateDefaultUser(): Promise<void> {
  const existingProfiles = await getAllProfiles();
  if (existingProfiles.length > 0) {
    return;
  }
  
  const oldProgress = await db.userProgress.get('default-user');
  if (oldProgress && (oldProgress.totalSessions > 0 || oldProgress.capturedCreatures.length > 0)) {
    const profile = await createProfile('Player 1');
    
    await updateUserProgress({
      totalSessions: oldProgress.totalSessions,
      currentStreak: oldProgress.currentStreak,
      longestStreak: oldProgress.longestStreak,
      lastSessionDate: oldProgress.lastSessionDate,
      capturedCreatures: oldProgress.capturedCreatures,
      unlockedBuddies: oldProgress.unlockedBuddies,
      selectedBuddyId: oldProgress.selectedBuddyId,
      streakPrizeStampCount: oldProgress.streakPrizeStampCount ?? 0,
      streakPrizePending: oldProgress.streakPrizePending ?? false,
      lastStreakStampLocalDate: oldProgress.lastStreakStampLocalDate,
      unlockedStickerIds: oldProgress.unlockedStickerIds ?? [],
      unlockedCreatureStoryIds: oldProgress.unlockedCreatureStoryIds ?? []
    }, profile.id);
    
    setCurrentProfileId(profile.id);
  }
}
