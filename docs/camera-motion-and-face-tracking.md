# Camera, motion, and face tracking

## CameraContext (`src/contexts/CameraContext.tsx`)

**Role:** One `MediaStream` and coordination for all screens that use the camera.

- **`startCamera()`** — requests user media, stores `streamRef`, updates React state, attaches to a registered `HTMLVideoElement`.
- **`registerVideoElement(video)`** — when the active `<video>` changes (e.g. pause overlay vs main view), reattach the same stream. Comments in the file warn **not** to call `video.load()` on stream-backed elements; doing so can break playback on a second session.
- **`captureFrameWithBuddy(overlay)`** — composites the current video frame with the buddy for selfies during brushing.

**Maintenance tips**

- If video is black on iOS or after navigation, confirm `registerVideoElement` is called for the active element and the stream is still `active`.
- Excessive `console.log` in production may be intentional for debugging; trim or gate with env if you need a quieter build.

## Motion detection (`useMotionDetection` + `MotionDetector`)

**Files:** `src/hooks/useMotionDetection.ts`, `src/services/motionDetector.ts`

The **`MotionDetector`** class compares consecutive frames from the video (canvas pixel diff) to infer motion. **`MOUTH_ZONES`** is currently a **single zone** (`faceZone`) that follows the face: `DEFAULT_ZONE` is a normalized fallback; when a face box is available, the zone is centered and smoothed on the face to reduce jitter.

- **`setFaceRegion`** (from the hook) feeds the last known face box into the detector so the “mouth” region moves with the head.
- Progress uses **`targetCleaningTime`** (seconds of accumulated motion) per zone; the hook also applies **decay** so progress drops if the user stops brushing.
- Tuning: `options` on `useMotionDetection` include `targetCleaningTime`, `detectionInterval`, `decayRate`. The brushing session uses something like `targetCleaningTime: 25` in `BrushingSession/index.tsx`—align product feel with these numbers, not just UI animations.

**Maintenance:** If gameplay feels too easy/hard, adjust decay and time thresholds in the hook or session, not ad hoc in the UI. Use **Debug** overlays in `BrushingSession` (e.g. `DebugOverlay`) and `getDebugInfo()` to inspect per-frame behavior.

## Face tracking (`useFaceTracking`)

**File:** `src/hooks/useFaceTracking.ts`

Priority order (conceptually): **native `FaceDetector`** if `window.FaceDetector` exists, else **TensorFlow.js** face landmarks, else a lightweight **fallback** path.

- **`startTracking(video)`** must be called with the same element used for display.
- `BrushingSession` syncs `facePosition` into **`setFaceRegion`** for the motion detector and drives buddy position on screen.

**Maintenance:** TensorFlow models are heavy; first load can be slow on low-end devices. If you upgrade `@tensorflow/tfjs` or the face-landmarks package, verify bundle size and that `estimateFaces` API still matches the typedefs in the hook.

## Brushing session integration

**File:** `src/components/BrushingSession/index.tsx`

- Starts the shared camera on mount, wires motion + face tracking, region music, and timed photo capture (`getPhotoIntervals` by session length).
- Implements **pause when motion stops** (threshold `NO_MOTION_PAUSE_THRESHOLD` ms) so kids must keep brushing for progress.

When changing session timing, update **`getSessionDurationSeconds()`** (settings) in tandem with any hard-coded photo intervals or pause logic.
