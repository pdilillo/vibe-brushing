import type { Region, RegionData } from '../types';

export const REGIONS: Record<Region, RegionData> = {
  grassland: {
    id: 'grassland',
    name: 'Sparkle Meadows',
    description: 'A peaceful meadow filled with wildflowers and friendly creatures',
    colors: {
      primary: '#22C55E',
      secondary: '#86EFAC',
      accent: '#FDE047',
      background: '#ECFDF5',
    },
    particles: ['🍃', '🌸', '🦋', '✨'],
  },
  coastal: {
    id: 'coastal',
    name: 'Crystal Shores',
    description: 'Sandy beaches and sparkling waves hide aquatic robot friends',
    colors: {
      primary: '#0EA5E9',
      secondary: '#7DD3FC',
      accent: '#FCD34D',
      background: '#F0F9FF',
    },
    particles: ['🫧', '🐚', '💧', '✨'],
  },
  lava: {
    id: 'lava',
    name: 'Ember Peaks',
    description: 'Volcanic mountains where fire-forged creatures dwell',
    colors: {
      primary: '#EF4444',
      secondary: '#FB923C',
      accent: '#FBBF24',
      background: '#1C1917',
    },
    particles: ['🔥', '💫', '⚡', '✨'],
  },
  city: {
    id: 'city',
    name: 'Neon District',
    description: 'A futuristic city where digital creatures roam the streets',
    colors: {
      primary: '#A855F7',
      secondary: '#E879F9',
      accent: '#22D3EE',
      background: '#0F0B1A',
    },
    particles: ['💜', '🔮', '⚡', '✨'],
  },
  sky: {
    id: 'sky',
    name: 'Cloud Kingdom',
    description: 'Floating islands high above where sky creatures soar',
    colors: {
      primary: '#F8FAFC',
      secondary: '#BAE6FD',
      accent: '#FDE68A',
      background: '#E0F2FE',
    },
    particles: ['☁️', '⭐', '🌟', '✨'],
  },
};

export const ALL_REGIONS: Region[] = ['grassland', 'coastal', 'lava', 'city', 'sky'];

export function getRandomRegion(): Region {
  return ALL_REGIONS[Math.floor(Math.random() * ALL_REGIONS.length)];
}

export function getRegionData(region: Region): RegionData {
  return REGIONS[region];
}
