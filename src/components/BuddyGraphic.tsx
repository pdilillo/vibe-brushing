import { useState, useEffect, useRef } from 'react';
import type { Buddy } from '../types';

interface BuddyGraphicProps {
  buddy: Buddy;
  containerWidth: number;
  containerHeight: number;
  activityScore: number; // 0-100, based on brushing activity
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

export function BuddyGraphic({ 
  buddy, 
  containerWidth, 
  containerHeight,
  activityScore = 0
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

    const speedMultiplier = 1 + (activityScore / 100) * (MAX_SPEED_MULTIPLIER - 1);
    const rotationMultiplier = 1 + (activityScore / 100) * (MAX_ROTATION_SPEED / BASE_ROTATION_SPEED - 1);

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

      if (activityScore > 50 && Math.random() < 0.005 * deltaTime) {
        state.rotationSpeed = (Math.random() - 0.5) * 4;
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
  }, [containerWidth, containerHeight, activityScore, buddySize]);

  if (!renderState || containerWidth === 0 || containerHeight === 0) {
    return null;
  }

  const pulseScale = 1 + (activityScore / 100) * 0.1 * Math.sin(Date.now() / 200);
  const glowIntensity = activityScore / 100;

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
            ? `drop-shadow(0 0 ${8 * glowIntensity}px rgba(255, 200, 100, ${glowIntensity * 0.6}))`
            : ''
        }`,
        opacity: imageLoaded ? 1 : 0,
        transition: 'opacity 0.3s ease',
        willChange: 'transform',
      }}
    >
      <img
        src={buddy.imageUrl}
        alt={buddy.name}
        style={{
          width: buddySize,
          height: buddySize,
          objectFit: 'contain',
        }}
      />
      
      {activityScore > 70 && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 50%)',
            animation: 'pulse 0.5s ease-in-out infinite',
          }}
        />
      )}
    </div>
  );
}
