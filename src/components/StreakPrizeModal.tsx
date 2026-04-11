import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ALL_CREATURES } from '../data/creatures';
import { countRemainingStreakStories, pickRandomStoryIdFromPool } from '../data/streakCreatureStories';
import { ALL_STICKERS, getNextStreakPrizeStickerId } from '../data/stickers';
import { claimStreakPrize } from '../services/database';
import {
  playSoundEffect,
  playStreakPrizeBuildup,
  playStreakPrizeOpenBurst,
  STREAK_PRIZE_BUILDUP_MS
} from '../hooks/useAudio';

const OPENING_ANIM_MS = 1000;

interface StreakPrizeModalProps {
  unlockedStickerIds: string[];
  unlockedCreatureStoryIds: string[];
  onClose: () => void;
  onClaimed: () => void | Promise<void>;
  /** If true, plays the full flow without saving; uses next unearned sticker or streak-1 as sample */
  debugPreview?: boolean;
}

type Phase = 'idle' | 'buildup' | 'opening' | 'revealed' | 'empty';

export function StreakPrizeModal({
  unlockedStickerIds,
  unlockedCreatureStoryIds,
  onClose,
  onClaimed,
  debugPreview = false
}: StreakPrizeModalProps) {
  const nextStickerId = useMemo(
    () => getNextStreakPrizeStickerId(unlockedStickerIds),
    [unlockedStickerIds]
  );
  const remainingStories = useMemo(
    () => countRemainingStreakStories(unlockedCreatureStoryIds ?? []),
    [unlockedCreatureStoryIds]
  );

  const canOpenGift = useMemo(() => {
    if (debugPreview) return true;
    return nextStickerId != null || remainingStories > 0;
  }, [debugPreview, nextStickerId, remainingStories]);

  const stickerPreviewId = useMemo(() => {
    if (debugPreview) return nextStickerId ?? 'streak-1';
    return nextStickerId ?? undefined;
  }, [debugPreview, nextStickerId]);

  const [phase, setPhase] = useState<Phase>(() => (canOpenGift ? 'idle' : 'empty'));
  const [claimResult, setClaimResult] = useState<{
    stickerId?: string;
    creatureStoryId?: string;
  } | null>(null);

  const previewSticker = claimResult?.stickerId
    ? ALL_STICKERS.find(s => s.id === claimResult.stickerId) ?? null
    : null;
  const storyCreature = claimResult?.creatureStoryId
    ? ALL_CREATURES.find(c => c.id === claimResult.creatureStoryId) ?? null
    : null;
  const hasStoryReward = Boolean(storyCreature);
  const hasStickerReward = Boolean(previewSticker);

  const timersRef = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(id => clearTimeout(id));
    timersRef.current = [];
  }, []);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const runAfterBuildup = useCallback(() => {
    setPhase('opening');
    playStreakPrizeOpenBurst();
    const t2 = window.setTimeout(() => {
      void (async () => {
        try {
          if (debugPreview) {
            const sid = stickerPreviewId ?? 'streak-1';
            const storyId = pickRandomStoryIdFromPool();
            setClaimResult({ stickerId: sid, creatureStoryId: storyId });
          } else {
            const result = await claimStreakPrize();
            setClaimResult(result ?? {});
            await onClaimed();
          }
          setPhase('revealed');
          playSoundEffect('success');
        } catch {
          setPhase('idle');
        }
      })();
    }, OPENING_ANIM_MS);
    timersRef.current.push(t2);
  }, [debugPreview, onClaimed, stickerPreviewId]);

  const handleTapPresent = useCallback(() => {
    if (phase !== 'idle') return;
    playStreakPrizeBuildup();
    setPhase('buildup');
    const t1 = window.setTimeout(() => {
      runAfterBuildup();
    }, STREAK_PRIZE_BUILDUP_MS);
    timersRef.current.push(t1);
  }, [phase, runAfterBuildup]);

  const handleAwesome = useCallback(() => {
    clearTimers();
    onClose();
  }, [onClose, clearTimers]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="streak-prize-title"
    >
      <div className="relative w-full max-w-sm max-h-[90vh] rounded-3xl bg-gradient-to-b from-purple-900 to-purple-950 border border-purple-500/40 p-6 text-center shadow-2xl overflow-hidden flex flex-col">
        {debugPreview && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-amber-300/90 shrink-0">
            Demo — your progress won’t be saved
          </p>
        )}

        {(phase === 'idle' || phase === 'buildup' || phase === 'opening') && canOpenGift && (
          <div className="py-6 shrink-0">
            <p className="text-sm text-purple-200 mb-4 min-h-[1.25rem]">
              {phase === 'idle' && 'Tap the gift when you’re ready!'}
              {phase === 'buildup' && 'Something sparkly is coming…'}
              {phase === 'opening' && 'Here it comes!'}
            </p>

            <div className="relative mx-auto w-36 h-36 flex items-center justify-center">
              {phase === 'idle' && (
                <button
                  type="button"
                  onClick={handleTapPresent}
                  className="relative flex h-32 w-32 items-center justify-center rounded-3xl bg-gradient-to-br from-amber-500/30 to-orange-600/20 border-2 border-amber-400/60 shadow-lg shadow-amber-500/20 active:scale-95 transition-transform hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-amber-400/50"
                  aria-label="Tap to open gift"
                >
                  <span className="text-8xl leading-none select-none">🎁</span>
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-wider text-amber-200/90 whitespace-nowrap">
                    Tap to open
                  </span>
                </button>
              )}

              {phase === 'buildup' && (
                <div className="relative flex h-32 w-32 items-center justify-center">
                  <div
                    className="absolute inset-0 rounded-3xl bg-amber-400/25 streak-prize-buildup-glow"
                    style={{ animationDuration: `${STREAK_PRIZE_BUILDUP_MS}ms` }}
                  />
                  <div className="relative text-8xl streak-prize-buildup-gift select-none" aria-hidden>
                    🎁
                  </div>
                </div>
              )}

              {phase === 'opening' && (
                <div className="relative flex h-32 w-32 items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-white/40 streak-prize-open-flash" />
                  <div className="relative text-8xl streak-prize-open-shake select-none">🎁</div>
                </div>
              )}
            </div>

            <style>{`
              .streak-prize-buildup-gift {
                animation: streak-prize-buildup-shake ${STREAK_PRIZE_BUILDUP_MS}ms ease-in forwards;
              }
              @keyframes streak-prize-buildup-shake {
                0% { transform: rotate(0deg) scale(1); }
                8% { transform: rotate(-4deg) scale(1.02); }
                16% { transform: rotate(5deg) scale(1.03); }
                24% { transform: rotate(-6deg) scale(1.04); }
                32% { transform: rotate(7deg) scale(1.05); }
                40% { transform: rotate(-8deg) scale(1.06); }
                48% { transform: rotate(9deg) scale(1.07); }
                56% { transform: rotate(-10deg) scale(1.08); }
                64% { transform: rotate(11deg) scale(1.09); }
                72% { transform: rotate(-11deg) scale(1.1); }
                80% { transform: rotate(12deg) scale(1.11); }
                88% { transform: rotate(-12deg) scale(1.12); }
                96% { transform: rotate(13deg) scale(1.14); }
                100% { transform: rotate(-10deg) scale(1.15); }
              }
              .streak-prize-buildup-glow {
                animation: streak-prize-glow-pulse ${STREAK_PRIZE_BUILDUP_MS}ms ease-in forwards;
              }
              @keyframes streak-prize-glow-pulse {
                0% { opacity: 0.35; transform: scale(0.95); }
                100% { opacity: 1; transform: scale(1.35); }
              }
              .streak-prize-open-shake {
                animation: streak-prize-open-pop ${OPENING_ANIM_MS}ms ease-out forwards;
              }
              @keyframes streak-prize-open-pop {
                0% { transform: scale(1.15) rotate(-10deg); }
                40% { transform: scale(1.35) rotate(12deg); }
                70% { transform: scale(1.2) rotate(-8deg); }
                100% { transform: scale(0.3) rotate(0deg); opacity: 0; }
              }
              .streak-prize-open-flash {
                animation: streak-prize-flash ${OPENING_ANIM_MS}ms ease-out forwards;
              }
              @keyframes streak-prize-flash {
                0% { opacity: 0; transform: scale(0.5); }
                25% { opacity: 0.9; transform: scale(1.4); }
                100% { opacity: 0; transform: scale(2); }
              }
            `}</style>
          </div>
        )}

        {phase === 'revealed' && (
          <div className="animate-[fadeIn_0.45s_ease-out] py-2 flex flex-col min-h-0 flex-1 overflow-hidden">
            <h2 id="streak-prize-title" className="text-xl font-bold text-white mb-1 shrink-0">
              {hasStoryReward && hasStickerReward
                ? 'You unlocked two rewards!'
                : hasStoryReward
                  ? 'You unlocked a Sparkle tale!'
                  : hasStickerReward
                    ? 'You unlocked a photo sticker!'
                    : 'Streak rewards!'}
            </h2>
            {hasStoryReward && hasStickerReward && (
              <p className="text-sm text-purple-200 mb-4 shrink-0">
                A creature story for your collection and a new sticker for photos.
              </p>
            )}
            {!hasStoryReward && !hasStickerReward && (
              <p className="text-purple-200 text-sm mb-4">Your streak prize is all set. Keep brushing!</p>
            )}

            <div className="space-y-3 mb-4 text-left shrink-0">
              {hasStoryReward && storyCreature && (
                <div className="rounded-2xl bg-purple-800/50 border border-amber-500/35 p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl shrink-0" aria-hidden>
                      📜
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-amber-300/90 mb-1">
                        Sparkle tale
                      </p>
                      <p className="text-base font-bold text-white">
                        New story: <span className="text-amber-200">{storyCreature.name}</span>
                      </p>
                      <p className="text-sm text-purple-200/95 mt-2 leading-snug">
                        Read the full tale anytime in{' '}
                        <span className="font-semibold text-purple-100">Collection</span>, in the{' '}
                        <span className="font-semibold text-purple-100">Sparkle tales</span> section.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {hasStickerReward && previewSticker && (
                <div className="rounded-2xl bg-purple-800/50 border border-pink-500/30 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/25 to-pink-500/25 border border-amber-400/40 text-3xl shadow-[0_0_24px_rgba(251,191,36,0.2)]">
                      {previewSticker.imageUrl}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold uppercase tracking-wide text-pink-300/90 mb-1">
                        Photo sticker
                      </p>
                      <p className="text-base font-bold text-white">{previewSticker.name}</p>
                      <p className="text-sm text-purple-200/95 mt-2">
                        Added to your photo stickers when you decorate session photos.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleAwesome}
              className="w-full py-4 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg active:scale-[0.98] transition-transform shrink-0 mt-auto"
            >
              Awesome!
            </button>
          </div>
        )}

        {phase === 'empty' && (
          <div className="py-6">
            <div className="text-6xl mb-4">🌟</div>
            <h2 id="streak-prize-title" className="text-xl font-bold text-white mb-2">
              You have every sparkle reward!
            </h2>
            <p className="text-purple-300 text-sm mb-6">Keep up your amazing brushing streak.</p>
            <button
              type="button"
              onClick={handleAwesome}
              className="w-full py-4 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-purple-600 to-pink-600"
            >
              OK
            </button>
          </div>
        )}

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.92); }
            to { opacity: 1; transform: scale(1); }
          }
        `}</style>
      </div>
    </div>
  );
}
