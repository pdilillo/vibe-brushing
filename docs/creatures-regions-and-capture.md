# Creatures, regions, and capture

## Data file — `src/data/creatures.ts`

This file is **large** by design: it aggregates **Series 1–3** plus **Mythic** entries into `ALL_CREATURES` and exports helpers.

### Important exports

- **`getRandomCreatureForScore(score, capturedIds, region?)`**  
  Picks a creature for the *session* preview and capture pipeline. It:
  - Unlocks **series 2/3** only when the previous series is **fully** collected (`getUnlockedSeries` / `isSeriesComplete`).
  - For **Mythic**: if **all three** series are complete, score ≥ 95, and the mythic id is not yet in `capturedIds`, returns the mythic creature. (Product copy elsewhere may say “Series 1 only”—the code uses **full completion of series 1, 2, and 3** for this check.)
  - For non-mythic: builds a rarity **pool** from the score (≥90 legendary+rare+common, ≥70 rare+common, else common), filters by **region** and **unlocked series**, and prefers uncaught creatures until all unlocked series are done (then allows duplicates from the pool).

- **`getCaptureRate(score, rarity)`** — probability for the post-session throw; mythic has its own sub-thresholds.

- **`getBallType(score)`** — cosmetic ball style for the capture minigame (`red` … `master`).

- **`isSeriesComplete(series, capturedIds)`** — all non-mythic creatures in that series are captured.

- **`getCreaturesByRegion`**, **`getUnlockedSeries`**, etc. — used by `Collection` and gating.

**Maintaining:** Adding a creature means a new object in the correct `SERIES_N_CREATURES` array with a **unique** `id`, valid `region`, `rarity`, and `series`. Ensure assets exist under `public/` (paths are often built with `import.meta.env.BASE_URL`). If you add a new rarity or region, update **`Region`** / rarity unions in `src/types/index.ts` and any switch statements (audio, UI).

## Regions — `src/data/regions.ts`

**`Region`** = `'grassland' | 'coastal' | 'lava' | 'city' | 'sky'`. The brushing session picks a **random** region for visuals and music (`getRandomRegion`).

## Capture game — `src/components/CaptureGame/index.tsx`

- Receives `cleaningPercentage`, `userProgress`, `region`, and optional `preSelectedCreature` from the session.
- Drives a short state machine (`intro` → `throwing` → … → `result`).
- On success, **`addCapturedCreature`** persists the creature for the current profile.

**Maintaining:** Capture odds and ball visuals should stay aligned with `getCaptureRate` / `getBallType` in `creatures.ts`. If you change scoring thresholds globally, search for duplicated numeric thresholds in this component and BrushingSession.

## Session “preview” creature

`BrushingSession` calls `getRandomCreatureForScore(85, capturedCreatureIds, region)` with a **fixed 85** for the encounter preview, not the live final percentage. The actual capture still uses the **results** `cleaningPercentage` passed into `CaptureGame`. If you want the on-screen “target” creature to match final performance, you would re-run selection when completing the session (product decision + prop threading).

## Visual and audio

- `CreatureArt`, `RegionBackground` tie creature and region to artwork.
- Rarity and region feed **`useRegionMusic`** — see [Audio and regions](./audio-and-regions.md).
