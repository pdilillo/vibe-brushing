import type { Sticker, Background } from '../types';

export const ALL_STICKERS: Sticker[] = [
  // Stars
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
  
  // Series 1 Creatures - Original Collection
  { id: 'creature1', name: 'Bunny', imageUrl: '🐰', category: 'creatures' },
  { id: 'creature2', name: 'Unicorn', imageUrl: '🦄', category: 'creatures' },
  { id: 'creature3', name: 'Dragon', imageUrl: '🐉', category: 'creatures' },
  { id: 'creature4', name: 'Butterfly', imageUrl: '🦋', category: 'creatures' },
  { id: 'creature5', name: 'Cat', imageUrl: '🐱', category: 'creatures' },
  { id: 'creature6', name: 'Owl', imageUrl: '🦉', category: 'creatures' },
  { id: 'creature7', name: 'Fox', imageUrl: '🦊', category: 'creatures' },
  { id: 'creature8', name: 'Bee', imageUrl: '🐝', category: 'creatures' },
  { id: 'creature9', name: 'Turtle', imageUrl: '🐢', category: 'creatures' },
  { id: 'creature10', name: 'Octopus', imageUrl: '🐙', category: 'creatures' },
  { id: 'creature11', name: 'Phoenix', imageUrl: '🔥', category: 'creatures' },
  { id: 'creature12', name: 'Whale', imageUrl: '🐋', category: 'creatures' },
  
  // Series 2 Creatures - Crystal Caverns & Slime Valley
  { id: 's2-crystal1', name: 'Diamond', imageUrl: '💎', category: 'creatures' },
  { id: 's2-crystal2', name: 'Gem', imageUrl: '💠', category: 'creatures' },
  { id: 's2-crystal3', name: 'Crystal Ball', imageUrl: '🔮', category: 'creatures' },
  { id: 's2-slime1', name: 'Slime', imageUrl: '🟢', category: 'creatures' },
  { id: 's2-slime2', name: 'Bubble Slime', imageUrl: '🫧', category: 'creatures' },
  { id: 's2-mushroom', name: 'Mushroom', imageUrl: '🍄', category: 'creatures' },
  { id: 's2-hedgehog', name: 'Hedgehog', imageUrl: '🦔', category: 'creatures' },
  { id: 's2-pearl', name: 'Pearl', imageUrl: '🦪', category: 'creatures' },
  { id: 's2-starfish', name: 'Starfish', imageUrl: '⭐', category: 'creatures' },
  { id: 's2-griffin', name: 'Griffin', imageUrl: '🦅', category: 'creatures' },
  { id: 's2-spider', name: 'Spider', imageUrl: '🕷️', category: 'creatures' },
  { id: 's2-jellyfish', name: 'Jellyfish', imageUrl: '🪼', category: 'creatures' },
  
  // Series 3 Creatures - Prehistoric Tech & Phantom Realm
  { id: 's3-trex', name: 'T-Rex', imageUrl: '🦖', category: 'creatures' },
  { id: 's3-raptor', name: 'Raptor', imageUrl: '🦕', category: 'creatures' },
  { id: 's3-ghost', name: 'Ghost', imageUrl: '👻', category: 'creatures' },
  { id: 's3-phantom', name: 'Phantom', imageUrl: '🌫️', category: 'creatures' },
  { id: 's3-spirit', name: 'Spirit', imageUrl: '💨', category: 'creatures' },
  { id: 's3-fossil', name: 'Fossil', imageUrl: '🦴', category: 'creatures' },
  { id: 's3-dna', name: 'DNA', imageUrl: '🧬', category: 'creatures' },
  { id: 's3-meteor', name: 'Meteor', imageUrl: '☄️', category: 'creatures' },
  { id: 's3-volcano', name: 'Volcano', imageUrl: '🌋', category: 'creatures' },
  { id: 's3-moon', name: 'Moon', imageUrl: '🌙', category: 'creatures' },
  { id: 's3-comet', name: 'Comet', imageUrl: '✨', category: 'creatures' },
  { id: 's3-train', name: 'Ghost Train', imageUrl: '🚂', category: 'creatures' },
];

export const ALL_BACKGROUNDS: Background[] = [
  { id: 'none', name: 'Squeaky Clean', imageUrl: '' },
  { id: 'rainbow', name: 'Unicorn Burp', imageUrl: 'linear-gradient(135deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3, #54a0ff)' },
  { id: 'purple', name: 'Grape Soda Pop', imageUrl: 'linear-gradient(135deg, #667eea, #764ba2)' },
  { id: 'sunset', name: 'Peachy Keen', imageUrl: 'linear-gradient(135deg, #fa709a, #fee140)' },
  { id: 'ocean', name: 'Mermaid Splash', imageUrl: 'linear-gradient(135deg, #2193b0, #6dd5ed)' },
  { id: 'forest', name: 'Froggy Pond', imageUrl: 'linear-gradient(135deg, #11998e, #38ef7d)' },
  { id: 'candy', name: 'Bubblegum Blast', imageUrl: 'linear-gradient(135deg, #f093fb, #f5576c)' },
  { id: 'night', name: 'Sleepy Time', imageUrl: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)' },
  { id: 'gold', name: 'Cheesy Grin', imageUrl: 'linear-gradient(135deg, #f7971e, #ffd200)' },
  { id: 'mint', name: 'Mint Fresh', imageUrl: 'linear-gradient(135deg, #00b09b, #96c93d)' },
  // Series 2 themed backgrounds
  { id: 'crystal', name: 'Crystal Cave', imageUrl: 'linear-gradient(135deg, #667db6, #0082c8, #00dfa2)' },
  { id: 'slime', name: 'Slime Valley', imageUrl: 'linear-gradient(135deg, #56ab2f, #a8e063, #7cfc00)' },
  // Series 3 themed backgrounds
  { id: 'prehistoric', name: 'Dino World', imageUrl: 'linear-gradient(135deg, #8b4513, #d2691e, #ff8c00)' },
  { id: 'phantom', name: 'Ghost Realm', imageUrl: 'linear-gradient(135deg, #2c3e50, #4a6572, #7f8c8d)' },
];
