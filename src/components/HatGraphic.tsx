import { useState, useEffect } from 'react';
import type { Hat } from '../types';

interface FacePosition {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
}

interface HatGraphicProps {
  hat: Hat;
  facePosition: FacePosition | null;
  containerWidth: number;
  containerHeight: number;
  videoWidth: number;
  videoHeight: number;
  isBrushing?: boolean;
}

export function HatGraphic({ 
  hat, 
  facePosition, 
  containerWidth, 
  containerHeight,
  videoWidth,
  videoHeight,
  isBrushing = false
}: HatGraphicProps) {
  const [animationFrame, setAnimationFrame] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const defaultHatSize = Math.min(containerWidth * 0.3, 80);
  
  useEffect(() => {
    if (!isBrushing) {
      setAnimationFrame(0);
      return;
    }
    
    const interval = setInterval(() => {
      setAnimationFrame(f => (f + 1) % 4);
    }, 300);
    
    return () => clearInterval(interval);
  }, [isBrushing]);

  useEffect(() => {
    setImageLoaded(false);
    const img = new Image();
    img.src = hat.imageUrl;
    img.onload = () => setImageLoaded(true);
  }, [hat.imageUrl]);

  const bounce = isBrushing ? Math.sin(animationFrame * Math.PI / 2) * 3 : 0;
  const scale = isBrushing ? 1 + Math.sin(animationFrame * Math.PI / 2) * 0.03 : 1;
  
  if (!facePosition || containerWidth === 0 || containerHeight === 0 || videoWidth === 0 || videoHeight === 0) {
    return (
      <div 
        className="absolute animate-float"
        style={{
          left: '50%',
          top: '10%',
          transform: 'translateX(-50%)',
          opacity: imageLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        <img
          src={hat.imageUrl}
          alt={hat.name}
          style={{
            width: defaultHatSize,
            height: defaultHatSize,
            objectFit: 'contain',
            filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.35))',
          }}
        />
      </div>
    );
  }

  const scaleX = containerWidth / videoWidth;
  const scaleY = containerHeight / videoHeight;
  
  const minHatWidth = 50;
  const maxHatWidth = containerWidth * 0.25;
  const scaledFaceWidth = facePosition.width * scaleX;
  const hatWidth = Math.max(minHatWidth, Math.min(maxHatWidth, scaledFaceWidth * 0.5));
  
  const hatX = containerWidth / 2;
  
  const faceTopY = facePosition.y * scaleY;
  const hatOffset = hatWidth * 0.55;
  const hatY = Math.max(5, faceTopY - hatOffset + bounce);

  return (
    <div 
      className="absolute"
      style={{
        left: `${hatX}px`,
        top: `${hatY}px`,
        transform: `translateX(-50%) scale(${scale})`,
        filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.35))',
        transition: 'left 80ms ease-out, top 80ms ease-out, transform 150ms ease-out',
        opacity: imageLoaded ? 1 : 0,
      }}
    >
      <img
        src={hat.imageUrl}
        alt={hat.name}
        style={{
          width: hatWidth,
          height: hatWidth,
          objectFit: 'contain',
        }}
      />
      
      {isBrushing && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 50%)',
            animation: 'pulse 1s ease-in-out infinite',
          }}
        />
      )}
    </div>
  );
}
