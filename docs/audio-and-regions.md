# Audio and regions

## `useAudio` — `src/hooks/useAudio.ts`

Centralizes **background music** and **one-shot sound effects** (e.g. sparkle, legendary intro, results fanfare). The brushing session calls **`useRegionMusic(region, creatureRarity)`** to vary tracks by the session’s **region** and the target creature’s **rarity** (e.g. legendary / mythic may use special cases).

**Maintaining**

- New assets belong under `public/` (or your audio URL convention) and must be included in the **PWA** precache or runtime cache if you need offline playback. See `vite.config.ts` `globPatterns` and `includeAssets` in [Build, PWA, and deploy](./build-pwa-and-deploy.md).
- When adding a **new region** in `src/data/regions.ts`, add matching branches in `useAudio` / `useRegionMusic` and verify fallbacks.
- Respecting **autoplay** policies: browsers may block audio until a user gesture; the first tap on “Start” or a button often unlocks the audio context. Test on Safari iOS.

## Regions — `src/data/regions.ts`

Used for:

- `RegionBackground` and particle styling in the brushing and capture UIs
- `getRandomRegion()` at session start (`BrushingSession`)

**Maintaining:** `Region` is a string union in `src/types/index.ts`—update it and all `switch`/`Record` types when adding a region.
