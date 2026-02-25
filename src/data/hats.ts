import type { Hat } from '../types';

export const ALL_HATS: Hat[] = [
  // Starter hats
  {
    id: 'crown',
    name: 'Royal Crown',
    imageUrl: '/creatures/hat-crown.png',
    unlockCondition: 'starter'
  },
  {
    id: 'party',
    name: 'Party Hat',
    imageUrl: '/creatures/hat-party.png',
    unlockCondition: 'starter'
  },
  
  // Session milestone hats
  {
    id: 'wizard',
    name: 'Wizard Hat',
    imageUrl: '/creatures/hat-wizard.png',
    unlockCondition: 'sessions',
    unlockThreshold: 10
  },
  {
    id: 'cowboy',
    name: 'Cowboy Hat',
    imageUrl: '/creatures/hat-cowboy.png',
    unlockCondition: 'sessions',
    unlockThreshold: 25
  },
  {
    id: 'chef',
    name: 'Chef Hat',
    imageUrl: '/creatures/hat-chef.png',
    unlockCondition: 'sessions',
    unlockThreshold: 50
  },
  {
    id: 'astronaut',
    name: 'Space Helmet',
    imageUrl: '/creatures/hat-astronaut.png',
    unlockCondition: 'sessions',
    unlockThreshold: 100
  },
  
  // Streak hats
  {
    id: 'pirate',
    name: 'Pirate Hat',
    imageUrl: '/creatures/hat-pirate.png',
    unlockCondition: 'streak',
    unlockThreshold: 7
  },
  {
    id: 'princess',
    name: 'Princess Tiara',
    imageUrl: '/creatures/hat-princess.png',
    unlockCondition: 'streak',
    unlockThreshold: 30
  },
  
  // Creature collection hats
  {
    id: 'unicorn-horn',
    name: 'Unicorn Horn',
    imageUrl: '/creatures/hat-unicorn-horn.png',
    unlockCondition: 'creature',
    unlockThreshold: 5
  },
  {
    id: 'dragon-horns',
    name: 'Dragon Horns',
    imageUrl: '/creatures/hat-dragon-horns.png',
    unlockCondition: 'creature',
    unlockThreshold: 10
  }
];

export function getStarterHats(): Hat[] {
  return ALL_HATS.filter(h => h.unlockCondition === 'starter');
}

export function getUnlockedHats(
  totalSessions: number,
  currentStreak: number,
  creatureCount: number
): Hat[] {
  return ALL_HATS.filter(hat => {
    switch (hat.unlockCondition) {
      case 'starter':
        return true;
      case 'sessions':
        return totalSessions >= (hat.unlockThreshold || 0);
      case 'streak':
        return currentStreak >= (hat.unlockThreshold || 0);
      case 'creature':
        return creatureCount >= (hat.unlockThreshold || 0);
      default:
        return false;
    }
  });
}
