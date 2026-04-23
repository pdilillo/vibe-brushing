# Sparkle Brush — internal documentation

This folder contains maintainer-oriented documentation for the **Sparkle Brush** (repo: *vibe-brushing*) application: a React + Vite PWA for kids’ tooth-brushing, with camera motion tracking, collectibles, and a photo editor.

## Contents

| Document | What it covers |
|----------|----------------|
| [Architecture](./architecture.md) | Stack, entry points, and how screens are composed |
| [Navigation and app state](./navigation-and-app-state.md) | `App.tsx` flow, `GamePhase`, profile loading |
| [Camera, motion, and face tracking](./camera-motion-and-face-tracking.md) | `CameraContext`, motion detection, TensorFlow / native face APIs |
| [Data and persistence](./data-and-persistence.md) | Dexie/IndexedDB, `localStorage`, schema upgrades |
| [Creatures, regions, and capture](./creatures-regions-and-capture.md) | `src/data/creatures`, selection pools, `CaptureGame` |
| [Buddies and unlocks](./buddies-and-unlocks.md) | `buddies.ts`, database unlock hooks |
| [Streak prizes and stories](./streak-prizes-and-stories.md) | 7-day stamp logic, stickers, creature tales |
| [Audio and regions](./audio-and-regions.md) | Music by region/rarity, sound effects |
| [Photo pipeline and editor](./photo-pipeline-and-editor.md) | Captures, `PhotoEditor`, stickers |
| [Build, PWA, and deploy](./build-pwa-and-deploy.md) | Vite base path, GitHub Pages, Workbox |
| [Debugging and QA](./debugging-and-qa.md) | Debug screens from Settings |

## Quick reference

- **Run locally:** `npm install` then `npm run dev`
- **Production build:** `npm run build` (runs `tsc -b` then `vite build`)
- **Key types:** `src/types/index.ts`
- **App shell / routing:** `src/App.tsx` (phase-based, not `react-router` for main flow)
- **Camera:** `src/contexts/CameraContext.tsx` (wraps the tree from `src/main.tsx`)

## Relationship to the repo README

The project root [README.md](../README.md) is the user-facing product overview. These docs are for developers: file paths, upgrade strategies, and edge cases. If product copy and code diverge, treat **source code** as the behavior reference unless you intentionally change the code to match product spec.
