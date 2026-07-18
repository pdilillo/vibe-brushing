import { formatLocalDateString, calendarDaysBetween } from '../utils/date';
import type { UserProgress } from '../types';

export interface StreakPrizeFields {
  streakPrizeStampCount: number;
  streakPrizePending: boolean;
  lastStreakStampLocalDate?: string;
}

/**
 * Computes new streak prize fields after a completed brushing session.
 * Call with progress **before** lastSessionDate is updated for this session.
 * At most one stamp per local calendar day.
 */
export function computeStreakPrizeAfterSession(
  progress: Pick<
    UserProgress,
    'streakPrizeStampCount' | 'streakPrizePending' | 'lastStreakStampLocalDate' | 'lastSessionDate'
  >,
  now: Date = new Date(),
  options?: { streakFreezeEnabled?: boolean }
): StreakPrizeFields {
  const streakFreezeActive = options?.streakFreezeEnabled ?? false;
  const todayStr = formatLocalDateString(now);
  const lastStamp = progress.lastStreakStampLocalDate;
  const count = progress.streakPrizeStampCount ?? 0;
  const pending = progress.streakPrizePending ?? false;

  if (pending) {
    if (lastStamp === todayStr) {
      return { streakPrizeStampCount: 6, streakPrizePending: true, lastStreakStampLocalDate: lastStamp };
    }
    return {
      streakPrizeStampCount: 6,
      streakPrizePending: true,
      lastStreakStampLocalDate: lastStamp,
    };
  }

  if (lastStamp === todayStr) {
    return {
      streakPrizeStampCount: Math.min(6, count),
      streakPrizePending: false,
      lastStreakStampLocalDate: lastStamp,
    };
  }

  if (!lastStamp) {
    return {
      streakPrizeStampCount: Math.min(6, 1),
      streakPrizePending: false,
      lastStreakStampLocalDate: todayStr,
    };
  }

  const lastStampDate = new Date(lastStamp + 'T12:00:00');
  let gap = calendarDaysBetween(lastStampDate, now);
  if (gap > 1 && streakFreezeActive) {
    gap = 1;
  }

  if (gap === 1) {
    if (count >= 6) {
      return {
        streakPrizeStampCount: 6,
        streakPrizePending: true,
        lastStreakStampLocalDate: todayStr,
      };
    }
    return {
      streakPrizeStampCount: Math.min(6, count + 1),
      streakPrizePending: false,
      lastStreakStampLocalDate: todayStr,
    };
  }

  if (gap > 1) {
    return {
      streakPrizeStampCount: 1,
      streakPrizePending: false,
      lastStreakStampLocalDate: todayStr,
    };
  }

  return {
    streakPrizeStampCount: count,
    streakPrizePending: false,
    lastStreakStampLocalDate: lastStamp,
  };
}
