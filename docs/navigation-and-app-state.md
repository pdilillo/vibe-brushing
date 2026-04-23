# Navigation and app state

## Phase-based navigation (not React Router for core flow)

`src/App.tsx` owns **`phase: GamePhase`** (see `src/types/index.ts`). The UI is a set of conditionally rendered full-screen components. Typical flow:

1. `profile-select` — pick or create a profile (`ProfileSelect`)
2. `home` — `Home` (requires `userProgress` + `currentProfile`)
3. `camera-check` → `buddy-select` → `brushing` → `results` → `capture` → `photos` → optional `editor` → `home`
4. Side paths: `settings`, `collection`, debug phases (`buddy-debug`, `graphics-debug`, `photo-debug`, `streak-prize-debug`, `sparkle-tales-debug`)

`react-router-dom` is a dependency but the main experience is driven by this phase state. When adding a screen, you typically:

1. Add a union member to `GamePhase` in `src/types/index.ts` if needed.
2. Add handlers (e.g. `handleX`) and a `{phase === 'x' && <... />}` block in `App.tsx`.
3. Pass `userProgress` / `sessionResults` / callbacks as props; avoid duplicating server-like state in random components.

## Profile bootstrap

On mount, `checkExistingProfile()`:

- Reads `getCurrentProfileId()` from `localStorage` (backed by `setCurrentProfileId` in `database.ts`)
- If a profile id exists, loads the profile and `getUserProgress()`, then sets `phase` to `home`
- Otherwise stays on `profile-select`

**Maintenance:** If the app shows “Loading…” forever, check IndexedDB for corrupted profiles, missing `userProgress` rows, or `getUserProgress` throwing (errors fall back to profile-select in some code paths—see `loadUserProgress` in `App.tsx`).

## Session results payload

`BrushingSession` calls `onComplete` with:

- `cleaningPercentage`, `zoneProgress`, `photos` (data URLs)
- `region` (session theme)
- `creature` (preview target for capture—selected at session start, not from final score in the call site)

`App` then saves a **`BrushingSession` record** via `addSession()` after results; that increments streaks, applies streak-prize fields, and may unlock the “perfect session” buddy when cleaning is 100%. See [Data and persistence](./data-and-persistence.md).

## Settings entry points

`Home` and `Settings` can navigate to debug experiences (buddy/graphics/photo) and the streak prize demo. These re-use the same `userProgress` and `loadUserProgress()` refresh after mutations.
