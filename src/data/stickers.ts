import type { Sticker, Background } from '../types';

export const ALL_STICKERS: Sticker[] = [
  // Creatures
  { id: 'star1', name: 'Gold Star', imageUrl: '⭐', category: 'stars' },
  { id: 'star2', name: 'Sparkle', imageUrl: '✨', category: 'stars' },
  { id: 'star3', name: 'Shooting Star', imageUrl: '🌟', category: 'stars' },
  { id: 'star4', name: 'Rainbow', imageUrl: '🌈', category: 'stars' },
  { id: 'star5', name: 'Heart', imageUrl: '💖', category: 'stars' },
  
  // Dental
  { id: 'tooth1', name: 'Tooth', imageUrl: '🦷', category: 'dental' },
  { id: 'tooth2', name: 'Toothbrush', imageUrl: '🪥', category: 'dental' },
  { id: 'tooth3', name: 'Smile', imageUrl: '😁', category: 'dental' },
  { id: 'tooth4', name: 'Clean', imageUrl: '🧼', category: 'dental' },
  { id: 'tooth5', name: 'Bubbles', imageUrl: '🫧', category: 'dental' },
  
  // Fun
  { id: 'fun1', name: 'Crown', imageUrl: '👑', category: 'fun' },
  { id: 'fun2', name: 'Party', imageUrl: '🎉', category: 'fun' },
  { id: 'fun3', name: 'Balloon', imageUrl: '🎈', category: 'fun' },
  { id: 'fun4', name: 'Gift', imageUrl: '🎁', category: 'fun' },
  { id: 'fun5', name: 'Confetti', imageUrl: '🎊', category: 'fun' },
  { id: 'fun6', name: 'Rocket', imageUrl: '🚀', category: 'fun' },
  { id: 'fun7', name: 'Fire', imageUrl: '🔥', category: 'fun' },
  { id: 'fun8', name: 'Lightning', imageUrl: '⚡', category: 'fun' },
  
  // Creatures
  { id: 'creature1', name: 'Bunny', imageUrl: '🐰', category: 'creatures' },
  { id: 'creature2', name: 'Unicorn', imageUrl: '🦄', category: 'creatures' },
  { id: 'creature3', name: 'Dragon', imageUrl: '🐉', category: 'creatures' },
  { id: 'creature4', name: 'Butterfly', imageUrl: '🦋', category: 'creatures' },
  { id: 'creature5', name: 'Cat', imageUrl: '🐱', category: 'creatures' },
];

export const ALL_BACKGROUNDS: Background[] = [
  { id: 'none', name: 'None', imageUrl: '' },
  { id: 'rainbow', name: 'Rainbow', imageUrl: 'linear-gradient(135deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3, #54a0ff)' },
  { id: 'purple', name: 'Purple Dream', imageUrl: 'linear-gradient(135deg, #667eea, #764ba2)' },
  { id: 'sunset', name: 'Sunset', imageUrl: 'linear-gradient(135deg, #fa709a, #fee140)' },
  { id: 'ocean', name: 'Ocean', imageUrl: 'linear-gradient(135deg, #2193b0, #6dd5ed)' },
  { id: 'forest', name: 'Forest', imageUrl: 'linear-gradient(135deg, #11998e, #38ef7d)' },
  { id: 'candy', name: 'Candy', imageUrl: 'linear-gradient(135deg, #f093fb, #f5576c)' },
  { id: 'night', name: 'Night Sky', imageUrl: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)' },
  { id: 'gold', name: 'Golden', imageUrl: 'linear-gradient(135deg, #f7971e, #ffd200)' },
  { id: 'mint', name: 'Mint Fresh', imageUrl: 'linear-gradient(135deg, #00b09b, #96c93d)' },
];
