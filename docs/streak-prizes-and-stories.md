# Streak prizes and creature stories

## Streak stamp math — `src/services/streakPrize.ts`

**`computeStreakPrizeAfterSession(progress, now)`** runs inside **`addSession`** in `database.ts` (using progress **before** the new `lastSessionDate` is written). It returns:

- `streakPrizeStampCount` (0–6, with 6 leading into “pending”)
- `streakPrizePending` (true when the 7th consecutive **calendar day** in the chain is reached)
- `lastStreakStampLocalDate` (local `YYYY-MM-DD` string for “at most one stamp per day”)

**Key behaviors**

- Uses **`formatLocalDateString`** and **`calendarDaysBetween`** from `src/utils/date.ts` so timezones do not break streaks at midnight.
- If the user is already **pending** (prize not claimed), further sessions keep the count at 6 and pending true until they claim (see `claimStreakPrize`).

**Maintaining:** If you change streak rules (e.g. require two sessions per day), update this pure function and add unit tests in a follow-up (none exist today). Keep `getUserProgress` defaults in sync for `streakPrizeStampCount` and `streakPrizePending`.

## Claiming the prize — `claimStreakPrize()` in `database.ts`

When `streakPrizePending` is true:

- **`getNextStreakPrizeStickerId(unlocked)`** (from `src/data/stickers.ts`) picks the next **streak** sticker in a defined order.
- **`pickRandomUnlockedStoryId(storyUnlocked)`** (from `src/data/streakCreatureStories.ts`) picks a random tale from a pool that is not yet in `unlockedCreatureStoryIds`.

The modal UI is `StreakPrizeModal`; Settings can open a debug preview via `streak-prize-debug` in `App.tsx`.

## Streak stickers — `src/data/stickers.ts`

- Streak-only stickers are marked with **`streakReward: true`**.
- **`STREAK_PRIZE_STICKER_IDS`** defines grant order; keep it aligned with `getNextStreakPrizeStickerId`.

## Creature tales — `src/data/streakCreatureStories.ts`

- **`STREAK_STORY_POOL`** lists creature **ids** that can receive a tale; each id should exist in **`STREAK_CREATURE_STORIES`** with a `body` (and optional `title`).
- Add new entries when you expand the pool; ensure ids match **`ALL_CREATURES`** in `creatures.ts` if tales reference real collectibles.

**Maintaining:** Story text is long-form copy; proofread in `Collection` / “Sparkle Tales” views. The debug route `sparkle-tales-debug` uses `Collection` with `sparkleTalesAllUnlockedPreview` to review layout without full unlock state.
