# Data and persistence

## IndexedDB (Dexie) — `src/services/database.ts`

**Database name:** `SparkleBrushDB`  
**Class:** `SparkleBrushDatabase extends Dexie`

### Tables (conceptual)

- **`profiles`** — user profiles (name, color, `createdAt`)
- **`userProgress`** — one row per profile: streaks, captured creatures, unlocked buddies, selected buddy id, streak prize fields, sticker and story unlock lists
- **`sessions`** — brushing history rows with `profileId`
- **`photos`** — saved decorated photos metadata

### Schema versions

Migrations are defined in the `SparkleBrushDatabase` constructor. When you add fields:

1. Bump the Dexie **version** and add a `.upgrade()` that backfills new fields for existing rows (see versions 3–5 for `unlockedBuddies` rename from `unlockedHats`, streak prize fields, `unlockedCreatureStoryIds`).
2. **Also** defensively default missing fields in **`getUserProgress()`** for users who open the app on a cached old bundle (reads can happen before upgrade runs in edge cases).

Never remove an upgrade block lightly; some users have old DB versions.

## localStorage keys

| Key | Purpose |
|-----|---------|
| `sparkle-brush-current-profile` | Current profile id (see `getCurrentProfileId` / `setCurrentProfileId`) |
| `sparkle-app-settings-{profileId}` | Per-profile JSON for `AppSettings` (`sessionDurationSeconds`: 60 \| 90 \| 120) |
| `sparkle-app-settings` | Legacy global settings key (read as fallback only if a profile has no saved settings yet) |

**Settings** live in `src/services/settings.ts`. Brushing duration is stored per profile so each user on the device can choose their own timer.

## Streaks and session save

`addSession(session)`:

- Stores the session with the current `profileId`
- Recomputes `currentStreak` / `longestStreak` from calendar-day difference vs `lastSessionDate`
- Merges **`computeStreakPrizeAfterSession`** (stamps toward the 7-day prize)—see [Streak prizes and stories](./streak-prizes-and-stories.md)
- Unlocks the **fire-frog** buddy on **100%** cleaning (see `FIRE_FROG_BUDDY_ID` in `database.ts`—verify `ALL_BUDDIES` still contains that id if you rename buddies)

## Legacy migration: `migrateDefaultUser`

`migrateDefaultUser()` migrates an old `'default-user'` progress row into a new named profile. Call sites should run once where appropriate (e.g. on boot path if you still need it). If you remove it, document that very old installs may need a fresh profile.

## Maintenance checklist

- **New progress fields:** Dexie version + `getUserProgress` defaults + any UI that serializes `UserProgress`.
- **Delete profile:** `deleteProfile` already cleans sessions and progress for that `profileId`.
- **Testing:** Use browser DevTools → Application → IndexedDB to verify stores after changes.
