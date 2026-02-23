# Sparkle Brush - Kids Tooth Brushing App

A fun Progressive Web App (PWA) that gamifies tooth brushing for kids! Uses the device camera to track brushing motion, features collectible creatures, and includes a photo decoration feature.

## Features

- **Camera-Based Motion Detection**: Tracks brush movement in 6 different mouth zones
- **Colorful Gunk Cleaning**: Cartoon teeth with colorful gunk that dissolves as you brush
- **Creature Capture System**: Earn chances to catch creatures based on brushing performance
  - 75%+ cleaning score = near-perfect capture rate
  - Rarer creatures appear with better brushing
- **Face-Tracking Hat Overlays**: Fun hats that track your head position (when TensorFlow loads)
- **Photo Capture & Decoration**: Take selfies during brushing and decorate with stickers
- **Progress Tracking**: Daily streaks, session counts, and creature collection
- **Offline Support**: Works offline as a PWA

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## How to Play

1. **Start Brushing**: Tap the "Start Brushing!" button
2. **Choose a Hat** (optional): Select from unlocked hats
3. **Brush for 2 Minutes**: Move your toothbrush - the app detects motion and cleans gunk from the cartoon teeth
4. **View Results**: See your cleaning percentage
5. **Catch a Creature**: Throw a Sparkle Ball to capture a creature (better brushing = better chances!)
6. **Decorate Photos**: Choose a photo, add stickers and backgrounds, then save

## Tech Stack

- React 18 + TypeScript + Vite
- Tailwind CSS
- TensorFlow.js (Face Landmarks Detection)
- Dexie.js (IndexedDB)
- Vite PWA Plugin

## Project Structure

```
src/
├── components/        # React components
├── hooks/            # Custom React hooks
├── services/         # Business logic & database
├── data/             # Creatures, hats, stickers data
└── types/            # TypeScript types
```

## Unlocking Content

**Hats unlock with:**
- Starter: Crown, Party Hat (immediate)
- Sessions: Wizard (10), Cowboy (25), Chef (50), Astronaut (100)
- Streaks: Pirate (7 days), Princess (30 days)
- Creatures: Unicorn Horn (5 caught), Dragon Horns (10 caught)

**Creatures appear based on performance:**
- Common: Always available
- Rare: 70%+ brushing sessions
- Legendary: 90%+ brushing sessions

## Browser Requirements

- Modern browser with camera access (Chrome, Safari, Firefox)
- HTTPS required for camera access in production
- Works best on mobile devices (portrait orientation)
