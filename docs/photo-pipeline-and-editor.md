# Photo pipeline and editor

## Session captures

`BrushingSession` schedules still captures at **intervals** that depend on **`getSessionDurationSeconds()`** (`getPhotoIntervals`). The **`CameraContext`** method **`captureFrameWithBuddy`** composites the current video with the selected buddy for a shareable data URL.

Photos are returned as `string[]` in session results, then:

1. **PhotoReview** — user picks a photo to edit or skips to home
2. **PhotoEditor** — user places **stickers** and optional **backgrounds**, then saves

## Stickers and backgrounds

- **`src/data/stickers.ts`** — `ALL_STICKERS` (emoji or URL-based) and streak prize ordering
- `UserProgress.unlockedStickerIds` — gate which stickers appear in the editor; streak flow appends new ids
- `Background` types in `src/types/index.ts` — `PhotoEditor` / `Collection` use these

## Persistence

`saveDecoratedPhoto` in `database.ts` writes a **`DecoratedPhoto`** record (original + decorated + placement metadata). Query helpers exist for history/gallery use.

**Maintaining:** Large data URLs bloat IndexedDB. If you add real resolution exports, consider capping resolution or using blob URLs with cleanup. Any change to `PlacedSticker` shape should bump Dexie version if you persist a new field.

## `PhotoDebug`

Settings opens **`PhotoDebug`** to validate capture or composition without a full session—use it when you change `captureFrameWithBuddy` or editor scaling.
