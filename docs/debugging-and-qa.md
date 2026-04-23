# Debugging and QA

## From Settings (internal)

`Settings` wires navigation to **debug** phases (see `App.tsx`):

| Phase | Component | Use |
|-------|------------|-----|
| `buddy-debug` | `BuddyDebug` | Animation / buddy behavior without gameplay |
| `graphics-debug` | `GraphicsDebug` | Creature and buddy art gallery, face tracking smoke test |
| `photo-debug` | `PhotoDebug` | Camera capture / editor path |
| `streak-prize-debug` | `StreakPrizeModal` with `debugPreview` | Prize modal and claim flow |
| `sparkle-tales-debug` | `Collection` with `sparkleTalesAllUnlockedPreview` | Tale layout with all stories visible |

**Maintaining:** If you add a new debug screen, add a `GamePhase`, render branch, and a Settings entry so QA can find it.

## In-session debugging

- **`BrushingSession/DebugOverlay.tsx`** (when present/enabled) — visualizes motion / face debug if hooked up.
- **`MotionDetector` `setDebugMode`** and **`getDebugInfo`** in `useMotionDetection` — inspect per-frame data.

## Manual QA matrix (suggested)

1. **Profiles** — create two profiles, switch between them, confirm progress isolation.
2. **Camera** — first launch permission deny/retry; return to home and start a second session (regression for `registerVideoElement`).
3. **Offline** — load app online once, then disconnect and confirm PWA still opens; verify audio and TensorFlow model caching behavior for your build.
4. **Streak** — use date manipulation / multiple sessions only if you have test hooks (otherwise test on real consecutive days or temporary dev helpers—do not commit clock hacks to production).
5. **iOS Safari** — portrait, autoplay, camera overlay performance.

## Common issues

- **Stuck on Loading** — `getUserProgress` or profile id mismatch; see [Data and persistence](./data-and-persistence.md).
- **Black video** — stream not attached; see [Camera, motion, and face tracking](./camera-motion-and-face-tracking.md).
- **Mythic never appears** — check `getRandomCreatureForScore` conditions (all three series + score) in [Creatures, regions, and capture](./creatures-regions-and-capture.md).
