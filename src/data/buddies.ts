import type { Buddy } from '../types';

const base = import.meta.env.BASE_URL;

export const ALL_BUDDIES: Buddy[] = [
  // Starter buddies
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
  
  // Session milestone buddies
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
  
  // Streak buddies
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
  
  // Creature collection buddies
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
  }
];

export function getStarterBuddies(): Buddy[] {
  return ALL_BUDDIES.filter(b => b.unlockCondition === 'starter');
}

export function getUnlockedBuddies(
  totalSessions: number,
  currentStreak: number,
  creatureCount: number
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
      default:
        return false;
    }
  });
}
