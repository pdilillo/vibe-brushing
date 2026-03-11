# Sparkle Brush - Kids Tooth Brushing App

A fun Progressive Web App (PWA) that gamifies tooth brushing for kids! Uses the device camera to track brushing motion, features collectible creatures and buddies, and includes a photo decoration feature.

## Features

- **Camera-Based Motion Detection**: Tracks brush movement in 6 different mouth zones
- **Colorful Gunk Cleaning**: Cartoon teeth with colorful gunk that dissolves as you brush
- **Creature Capture System**: Earn chances to catch creatures based on brushing performance
  - 75%+ cleaning score = near-perfect capture rate
  - Rarer creatures appear with better brushing (Common → Rare → Legendary → **Mythic**)
  - **Mythic** creature: unlock with 95%+ and all Series 1 creatures caught
- **Buddies**: Choose a buddy before each session! Buddies appear on camera with you and animate based on brushing activity (bounce, spin, speed up). Includes Kitty Okie, hats, series completion rewards, and a secret **Toothy** buddy (tap the tooth on the home screen until it flies away)
- **Face-Tracking Buddy Overlays**: Your selected buddy tracks your head position (when TensorFlow loads)
- **Photo Capture & Decoration**: Take selfies during brushing (with your buddy in the shot) and decorate with stickers and backgrounds; sticker scaling fixed for consistent save quality
- **Result Fanfare**: Celebratory sound when you finish a session and view results
- **Configurable Brush Time**: In Settings, choose 1, 1.5, or 2 minutes (60 / 90 / 120 seconds) per session
- **Region-Based Music**: Background music varies by session region and creature rarity (including mythic)
- **Progress Tracking**: Daily streaks, session counts, and creature collection
- **Offline Support**: Works offline as a PWA
- **Debug Modes** (Settings): Graphics Debug (creature/buddy gallery, face tracking), Buddy Debug (animation testing), Photo Debug

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

# Deploy to GitHub Pages
npm run deploy
```

## How to Play

1. **Start Brushing**: Tap the "Start Brushing!" button
2. **Choose a Buddy** (optional): Pick from unlocked buddies (or "No Buddy"); buddies appear on camera and react to your brushing
3. **Brush for Your Set Time**: 1, 1.5, or 2 minutes (set in Settings). Move your toothbrush—the app detects motion and cleans gunk from the cartoon teeth
4. **View Results**: See your cleaning percentage and hear the result fanfare
5. **Throw a Sparkle Ball**: Toss the ball to capture a creature (better brushing = better chances and rarer creatures, including Mythic if you've completed Series 1)
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
├── components/        # React components (Home, BrushingSession, CaptureGame, etc.)
├── contexts/          # React contexts (CameraContext for shared camera/buddy capture)
├── hooks/             # Custom hooks (face tracking, motion detection, audio)
├── services/          # Business logic, database, settings
├── data/              # Creatures, buddies, stickers, regions
└── types/             # TypeScript types
```

## Unlocking Buddies

**Starter (immediate):** Royal Crown, Party Hat, Kitty Okie  

**Sessions:** Wizard (10), Cowboy (25), Chef (50), Astronaut (100)  

**Streaks:** Pirate (7 days), Princess (30 days)  

**Creatures caught:** Unicorn Horn (5), Dragon Horns (10)  

**Series completion:** Nature Crown, Robo Antennae, Flame Mohawk (Series 1); Crystal Crown, Slime Cap, Gem Tiara, Prism Visor (Series 2); Dino Skull, Phantom Hood, Fossil Helmet, Spirit Halo, T-Rex Jaws (Series 3)  

**Secret:** Toothy — on the home screen, tap the bouncing tooth repeatedly until it flies away to unlock.

## Creature Rarities

- **Common**: Always available
- **Rare**: 70%+ brushing sessions
- **Legendary**: 90%+ brushing sessions
- **Mythic**: 95%+ and all Series 1 creatures captured (one special mythic creature)

## Browser Requirements

- Modern browser with camera access (Chrome, Safari, Firefox)
- HTTPS required for camera access in production
- Works best on mobile devices (portrait orientation)
