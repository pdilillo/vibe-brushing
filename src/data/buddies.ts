import type { Buddy } from '../types';
import { isSeriesComplete } from './creatures';

const base = import.meta.env.BASE_URL;

export const ALL_BUDDIES: Buddy[] = [
  // ==================== STARTER BUDDIES ====================
  {
    id: 'crown',
    name: 'Royal Crown',
    imageUrl: `${base}creatures/hat-crown.png`,
    unlockCondition: 'starter'
  },
  {
    id: 'party',
    name: 'Party Hat',
    imageUrl: `${base}creatures/hat-party.png`,
    unlockCondition: 'starter'
  },
  
  // ==================== SESSION MILESTONE BUDDIES ====================
  {
    id: 'wizard',
    name: 'Wizard Hat',
    imageUrl: `${base}creatures/hat-wizard.png`,
    unlockCondition: 'sessions',
    unlockThreshold: 10
  },
  {
    id: 'cowboy',
    name: 'Cowboy Hat',
    imageUrl: `${base}creatures/hat-cowboy.png`,
    unlockCondition: 'sessions',
    unlockThreshold: 25
  },
  {
    id: 'chef',
    name: 'Chef Hat',
    imageUrl: `${base}creatures/hat-chef.png`,
    unlockCondition: 'sessions',
    unlockThreshold: 50
  },
  {
    id: 'astronaut',
    name: 'Space Helmet',
    imageUrl: `${base}creatures/hat-astronaut.png`,
    unlockCondition: 'sessions',
    unlockThreshold: 100
  },
  
  // ==================== STREAK BUDDIES ====================
  {
    id: 'pirate',
    name: 'Pirate Hat',
    imageUrl: `${base}creatures/hat-pirate.png`,
    unlockCondition: 'streak',
    unlockThreshold: 7
  },
  {
    id: 'princess',
    name: 'Princess Tiara',
    imageUrl: `${base}creatures/hat-princess.png`,
    unlockCondition: 'streak',
    unlockThreshold: 30
  },
  
  // ==================== CREATURE COLLECTION BUDDIES ====================
  {
    id: 'unicorn-horn',
    name: 'Unicorn Horn',
    imageUrl: `${base}creatures/hat-unicorn-horn.png`,
    unlockCondition: 'creature',
    unlockThreshold: 5
  },
  {
    id: 'dragon-horns',
    name: 'Dragon Horns',
    imageUrl: `${base}creatures/hat-dragon-horns.png`,
    unlockCondition: 'creature',
    unlockThreshold: 10
  },
  
  // ==================== SERIES 1 COMPLETION BUDDIES ====================
  {
    id: 'nature-crown',
    name: 'Nature Crown',
    imageUrl: `${base}creatures/hat-nature-crown.png`,
    unlockCondition: 'series',
    unlockSeries: 1
  },
  {
    id: 'robo-antennae',
    name: 'Robo Antennae',
    imageUrl: `${base}creatures/hat-robo-antennae.png`,
    unlockCondition: 'series',
    unlockSeries: 1
  },
  {
    id: 'flame-mohawk',
    name: 'Flame Mohawk',
    imageUrl: `${base}creatures/hat-flame-mohawk.png`,
    unlockCondition: 'series',
    unlockSeries: 1
  },
  
  // ==================== SERIES 2 COMPLETION BUDDIES ====================
  {
    id: 'crystal-crown',
    name: 'Crystal Crown',
    imageUrl: `${base}creatures/hat-crystal-crown.png`,
    unlockCondition: 'series',
    unlockSeries: 2
  },
  {
    id: 'slime-cap',
    name: 'Slime Cap',
    imageUrl: `${base}creatures/hat-slime-cap.png`,
    unlockCondition: 'series',
    unlockSeries: 2
  },
  {
    id: 'gem-tiara',
    name: 'Gem Tiara',
    imageUrl: `${base}creatures/hat-gem-tiara.png`,
    unlockCondition: 'series',
    unlockSeries: 2
  },
  {
    id: 'prism-visor',
    name: 'Prism Visor',
    imageUrl: `${base}creatures/hat-prism-visor.png`,
    unlockCondition: 'series',
    unlockSeries: 2
  },
  
  // ==================== SERIES 3 COMPLETION BUDDIES ====================
  {
    id: 'dino-skull',
    name: 'Dino Skull',
    imageUrl: `${base}creatures/hat-dino-skull.png`,
    unlockCondition: 'series',
    unlockSeries: 3
  },
  {
    id: 'phantom-hood',
    name: 'Phantom Hood',
    imageUrl: `${base}creatures/hat-phantom-hood.png`,
    unlockCondition: 'series',
    unlockSeries: 3
  },
  {
    id: 'fossil-helmet',
    name: 'Fossil Helmet',
    imageUrl: `${base}creatures/hat-fossil-helmet.png`,
    unlockCondition: 'series',
    unlockSeries: 3
  },
  {
    id: 'spirit-halo',
    name: 'Spirit Halo',
    imageUrl: `${base}creatures/hat-spirit-halo.png`,
    unlockCondition: 'series',
    unlockSeries: 3
  },
  {
    id: 'trex-jaws',
    name: 'T-Rex Jaws',
    imageUrl: `${base}creatures/hat-trex-jaws.png`,
    unlockCondition: 'series',
    unlockSeries: 3
  },
];

export function getStarterBuddies(): Buddy[] {
  return ALL_BUDDIES.filter(b => b.unlockCondition === 'starter');
}

export function getUnlockedBuddies(
  totalSessions: number,
  currentStreak: number,
  creatureCount: number,
  capturedCreatureIds: string[] = []
): Buddy[] {
  return ALL_BUDDIES.filter(buddy => {
    switch (buddy.unlockCondition) {
      case 'starter':
        return true;
      case 'sessions':
        return totalSessions >= (buddy.unlockThreshold || 0);
      case 'streak':
        return currentStreak >= (buddy.unlockThreshold || 0);
      case 'creature':
        return creatureCount >= (buddy.unlockThreshold || 0);
      case 'series':
        if (!buddy.unlockSeries) return false;
        return isSeriesComplete(buddy.unlockSeries, capturedCreatureIds);
      default:
        return false;
    }
  });
}
