import { useState, useEffect, useRef } from 'react';
import type { Buddy } from '../types';

interface BuddyGraphicProps {
  buddy: Buddy;
  containerWidth: number;
  containerHeight: number;
  activityScore: number; // 0-100, based on brushing activity
  /** True while every zone stays at 100% — extra motion, glow, and ring */
  fullCleanCelebration?: boolean;
}

interface BuddyState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  flipX: boolean;
}

const BASE_SPEED = 1.0;
const MAX_SPEED_MULTIPLIER = 6;
const BASE_ROTATION_SPEED = 1.0;
const MAX_ROTATION_SPEED = 10;
const BUDDY_SIZE_RATIO = 0.24; // 24% of container width - doubled from original 12%
const MAX_BUDDY_SIZE = 160;
const MIN_BUDDY_SIZE = 80;
const PADDING = 10;

const CELEBRATION_SPEED_BOOST = 1.55;
const CELEBRATION_ROTATION_BOOST = 1.45;

export function BuddyGraphic({ 
  buddy, 
  containerWidth, 
  containerHeight,
  activityScore = 0,
  fullCleanCelebration = false,
}: BuddyGraphicProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const animationRef = useRef<number | null>(null);
  const stateRef = useRef<BuddyState | null>(null);
  const [renderState, setRenderState] = useState<BuddyState | null>(null);
  const lastTimeRef = useRef<number>(0);

  const buddySize = Math.min(
    MAX_BUDDY_SIZE,
    Math.max(MIN_BUDDY_SIZE, containerWidth * BUDDY_SIZE_RATIO)
  );

  useEffect(() => {
    setImageLoaded(false);
    const img = new Image();
    img.src = buddy.imageUrl;
    img.onload = () => setImageLoaded(true);
  }, [buddy.imageUrl]);

  useEffect(() => {
    if (containerWidth === 0 || containerHeight === 0) return;

    if (!stateRef.current) {
      stateRef.current = {
        x: containerWidth * 0.7,
        y: containerHeight * 0.15,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 2,
        flipX: false
      };
      setRenderState({ ...stateRef.current });
    }
  }, [containerWidth, containerHeight]);

  useEffect(() => {
    if (containerWidth === 0 || containerHeight === 0 || !stateRef.current) return;

    const celebrationBoost = fullCleanCelebration ? CELEBRATION_SPEED_BOOST : 1;
    const rotationCelebrationBoost = fullCleanCelebration ? CELEBRATION_ROTATION_BOOST : 1;
    const speedMultiplier = (1 + (activityScore / 100) * (MAX_SPEED_MULTIPLIER - 1)) * celebrationBoost;
    const rotationMultiplier = (1 + (activityScore / 100) * (MAX_ROTATION_SPEED / BASE_ROTATION_SPEED - 1)) * rotationCelebrationBoost;

    const animate = (time: number) => {
      if (!stateRef.current) return;
      
      const deltaTime = lastTimeRef.current ? Math.min((time - lastTimeRef.current) / 16.67, 3) : 1;
      lastTimeRef.current = time;

      const state = stateRef.current;
      const halfSize = buddySize / 2;
      const minX = PADDING + halfSize;
      const maxX = containerWidth - PADDING - halfSize;
      const minY = PADDING + halfSize;
      const maxY = containerHeight - PADDING - halfSize;

      let newX = state.x + state.vx * BASE_SPEED * speedMultiplier * deltaTime;
      let newY = state.y + state.vy * BASE_SPEED * speedMultiplier * deltaTime;
      let newVx = state.vx;
      let newVy = state.vy;
      let newFlipX = state.flipX;

      if (newX <= minX) {
        newX = minX;
        newVx = Math.abs(newVx);
        newFlipX = !newFlipX;
      } else if (newX >= maxX) {
        newX = maxX;
        newVx = -Math.abs(newVx);
        newFlipX = !newFlipX;
      }

      if (newY <= minY) {
        newY = minY;
        newVy = Math.abs(newVy);
      } else if (newY >= maxY) {
        newY = maxY;
        newVy = -Math.abs(newVy);
      }

      const newRotation = state.rotation + state.rotationSpeed * BASE_ROTATION_SPEED * rotationMultiplier * deltaTime;

      const wiggleChance = fullCleanCelebration ? 0.018 : 0.005;
      const wiggleThreshold = fullCleanCelebration ? 20 : 50;
      if (activityScore > wiggleThreshold && Math.random() < wiggleChance * deltaTime) {
        const spin = fullCleanCelebration ? 8 : 4;
        state.rotationSpeed = (Math.random() - 0.5) * spin;
      }

      stateRef.current = {
        x: newX,
        y: newY,
        vx: newVx,
        vy: newVy,
        rotation: newRotation,
        rotationSpeed: state.rotationSpeed,
        flipX: newFlipX
      };

      setRenderState({ ...stateRef.current });
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [containerWidth, containerHeight, activityScore, buddySize, fullCleanCelebration]);

  if (!renderState || containerWidth === 0 || containerHeight === 0) {
    return null;
  }

  const t = Date.now();
  const pulsePeriod = fullCleanCelebration ? 110 : 200;
  const pulseAmp = fullCleanCelebration ? 0.14 : 0.1;
  const pulseScale = 1 + (activityScore / 100) * pulseAmp * Math.sin(t / pulsePeriod);
  const glowIntensity = fullCleanCelebration ? Math.min(1, activityScore / 100 + 0.35) : activityScore / 100;

  const ringSize = buddySize * 1.42;
  const sparkles = fullCleanCelebration
    ? [
        { angle: 0, radius: 0.52, phase: 0 },
        { angle: 60, radius: 0.58, phase: 0.4 },
        { angle: 120, radius: 0.5, phase: 0.2 },
        { angle: 180, radius: 0.55, phase: 0.7 },
        { angle: 240, radius: 0.53, phase: 0.1 },
        { angle: 300, radius: 0.56, phase: 0.55 },
      ]
    : [];

  return (
    <div 
      className="absolute pointer-events-none"
      style={{
        left: `${renderState.x}px`,
        top: `${renderState.y}px`,
        transform: `
          translate(-50%, -50%) 
          rotate(${renderState.rotation}deg) 
          scaleX(${renderState.flipX ? -1 : 1})
          scale(${pulseScale})
        `,
        filter: `drop-shadow(0 4px 8px rgba(0,0,0,0.3)) ${
          glowIntensity > 0.3 
            ? `drop-shadow(0 0 ${10 * glowIntensity}px rgba(255, 220, 120, ${0.55 + (fullCleanCelebration ? 0.25 : 0)})) drop-shadow(0 0 ${6 * glowIntensity}px rgba(168, 85, 247, ${fullCleanCelebration ? 0.45 : 0.2}))`
            : ''
        }`,
        opacity: imageLoaded ? 1 : 0,
        transition: 'opacity 0.3s ease',
        willChange: 'transform',
      }}
    >
      {fullCleanCelebration && (
        <div
          className="absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 rounded-full animate-spin pointer-events-none"
          style={{
            width: ringSize,
            height: ringSize,
            background: 'conic-gradient(from 0deg, #fbbf24, #f472b6, #818cf8, #22d3ee, #4ade80, #fbbf24)',
            animationDuration: '2.8s',
            WebkitMask: `radial-gradient(circle, transparent ${buddySize * 0.42}px, #000 ${buddySize * 0.42 + 4}px)`,
            mask: `radial-gradient(circle, transparent ${buddySize * 0.42}px, #000 ${buddySize * 0.42 + 4}px)`,
          }}
          aria-hidden
        />
      )}

      <div className="relative z-[5]" style={{ width: buddySize, height: buddySize }}>
        <img
          src={buddy.imageUrl}
          alt={buddy.name}
          className="relative z-[1]"
          style={{
            width: buddySize,
            height: buddySize,
            objectFit: 'contain',
          }}
        />

        {fullCleanCelebration &&
          sparkles.map((s, i) => {
            const rad = (s.angle * Math.PI) / 180;
            const wobble = Math.sin(t / 400 + s.phase * Math.PI * 2) * 4;
            const x = Math.cos(rad) * (buddySize * s.radius) + buddySize / 2;
            const y = Math.sin(rad) * (buddySize * s.radius) + buddySize / 2 + wobble;
            const op = 0.45 + Math.sin(t / 280 + i) * 0.45;
            return (
              <span
                key={i}
                className="absolute z-[2] text-lg leading-none pointer-events-none"
                style={{
                  left: x,
                  top: y,
                  transform: 'translate(-50%, -50%)',
                  opacity: op,
                  textShadow: '0 0 6px rgba(255,255,255,0.9)',
                }}
                aria-hidden
              >
                ✨
              </span>
            );
          })}

        {activityScore > 70 && (
          <div
            className="absolute inset-0 z-[1] pointer-events-none rounded-full"
            style={{
              background: fullCleanCelebration
                ? 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.55) 0%, rgba(255,200,150,0.2) 40%, transparent 55%)'
                : 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 50%)',
              animation: fullCleanCelebration ? 'pulse 0.35s ease-in-out infinite' : 'pulse 0.5s ease-in-out infinite',
            }}
          />
        )}
      </div>
    </div>
  );
}
