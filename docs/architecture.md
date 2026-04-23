# Architecture

## Product

**Sparkle Brush** is a client-only Progressive Web App: no backend. State lives in the browser (IndexedDB via Dexie, plus a few `localStorage` keys). The device camera powers motion-based “cleaning” progress and optional face-tracked buddy overlays.

## Technology stack

| Layer | Choice |
|-------|--------|
| UI | React 18, TypeScript |
| Bundler / dev | Vite 5 |
| Styling | Tailwind CSS (`index.css` + utility classes) |
| ML / vision | TensorFlow.js + `@tensorflow-models/face-landmarks-detection` (see face tracking hook); some browsers can use the native `FaceDetector` when available |
| Storage | Dexie 4 (IndexedDB) + `localStorage` for settings and current profile id |
| PWA | `vite-plugin-pwa` (auto-update, Workbox caching) |

## Entry points

- **`index.html` → `src/main.tsx`**  
  Renders the app inside `CameraProvider` so all screens share one camera lifecycle (`useSharedCamera()` → `CameraContext`).

- **`src/App.tsx`**  
  Single top-level component. It does **not** use React Router for the main game loop; it holds a `phase: GamePhase` and renders one full-screen view at a time. See [Navigation and app state](./navigation-and-app-state.md).

## Source layout (conceptual)

```
src/
  App.tsx                 # Phase machine + progress loading
  main.tsx                # CameraProvider, StrictMode
  components/             # Screen and feature UI (BrushingSession/, CaptureGame/, etc.)
  contexts/               # CameraContext — shared video stream and capture
  hooks/                  # useMotionDetection, useFaceTracking, useAudio
  services/               # database, settings, streakPrize, motionDetector (class)
  data/                   # creatures, buddies, regions, stickers, streak stories
  types/                  # Shared TypeScript types
  utils/                  # e.g. local date strings for streak logic
```

## Design principles for changes

- **Keep phases explicit.** New “screens” usually mean a new `GamePhase` value and a branch in `App.tsx` with props wired through.
- **Respect profile scoping.** Database helpers use `getCurrentProfileId()`; multi-profile support is real—test with more than one profile when touching persistence.
- **Camera is global.** Any screen that needs video should use the context, not a standalone `getUserMedia` without coordinating `stopCamera` / stream reuse. See [Camera, motion, and face tracking](./camera-motion-and-face-tracking.md).

## Testing and quality

The `package.json` script `lint` runs ESLint. There is no test runner configured in the repo; manual verification on a real device (portrait, HTTPS for camera) remains important for camera and PWA behavior.
