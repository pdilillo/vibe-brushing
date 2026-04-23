# Buddies and unlocks

## Source of truth — `src/data/buddies.ts`

**`ALL_BUDDIES`** is the catalog of every buddy. Each has:

- `id` — stable string used in `unlockedBuddies` and `selectedBuddyId`
- `name`, `imageUrl` — `imageUrl` is usually `${import.meta.env.BASE_URL}creatures/...` so GitHub Pages base path works
- `unlockCondition`: `'starter' | 'sessions' | 'streak' | 'creature' | 'series' | 'secret' | 'perfect-session'`
- optional `unlockThreshold` (e.g. session count) or `unlockSeries` (series completion hats)

**`isSeriesComplete`** is imported from `./creatures` for series-gated items.

## Where unlocks are applied

1. **Buddy selection UI** — `BuddySelector` / `Home` show which buddies are available; logic filters `ALL_BUDDIES` against `userProgress.unlockedBuddies` and conditions.
2. **Database** — `unlockBuddy()` appends to `unlockedBuddies` if not already present.
3. **Session completion** — `addSession` in `database.ts` may unlock the **fire frog** (perfect brush) if `cleaningPercentage` rounds to ≥ 100%.

## Secret buddy (Toothy) and home-screen hooks

`Home` implements easter-egg input (e.g. tapping a tooth) and can call `onUnlockSecretBuddy` with an unlocked record; that flows to `handleUnlockSecretBuddy` in `App.tsx` and `unlockBuddy` in the DB.

**Maintaining:** When adding a new buddy:

1. Add asset under `public/creatures/` (or your asset path).
2. Add the `Buddy` entry in `buddies.ts` with a unique `id`.
3. Implement the unlock check wherever appropriate (streak, session count in `getUserProgress`, home easter egg, or `addSession` for perfect-session type).

## Debug — `BuddyDebug` / `GraphicsDebug`

`BuddyDebug` and related screens let designers/testers try animations without a full play session. Keep them behind Settings so production users do not land there accidentally.
