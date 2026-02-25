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
  
  if (!facePosition || containerWidth === 0 || containerHeight === 0 || videoWidth === 0 || videoHeight === 0) {
    return (
      <div 
        className="absolute animate-float"
        style={{
          left: '50%',
          top: '10%',
          transform: 'translateX(-50%)',
        }}
      >
        {renderHatSVG(hat.id, defaultHatSize, false, 0)}
      </div>
    );
  }

  const scaleX = containerWidth / videoWidth;
  const scaleY = containerHeight / videoHeight;
  
  const minHatWidth = 50;
  const maxHatWidth = containerWidth * 0.25;
  const scaledFaceWidth = facePosition.width * scaleX;
  const hatWidth = Math.max(minHatWidth, Math.min(maxHatWidth, scaledFaceWidth * 0.45));
  
  const hatX = containerWidth / 2;
  
  const faceTopY = facePosition.y * scaleY;
  const hatOffset = hatWidth * 0.6;
  const hatY = Math.max(5, faceTopY - hatOffset);

  return (
    <div 
      className="absolute"
      style={{
        left: `${hatX}px`,
        top: `${hatY}px`,
        transform: 'translateX(-50%)',
        filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.35))',
        transition: 'left 80ms ease-out, top 80ms ease-out',
      }}
    >
      {renderHatSVG(hat.id, hatWidth, isBrushing, animationFrame)}
    </div>
  );
}

function renderHatSVG(hatId: string, size: number, isBrushing: boolean, frame: number): JSX.Element {
  const width = size;
  const height = size * 0.95;
  
  const bounce = isBrushing ? Math.sin(frame * Math.PI / 2) * 2 : 0;
  const breathe = isBrushing ? 1 + Math.sin(frame * Math.PI / 2) * 0.02 : 1;

  switch (hatId) {
    case 'crown':
      return renderSlimeCrown(width, height, isBrushing, frame, bounce, breathe);
    case 'party':
      return renderMothParty(width, height, isBrushing, frame, bounce, breathe);
    case 'wizard':
      return renderDragonWizard(width, height, isBrushing, frame, bounce, breathe);
    case 'cowboy':
      return renderTurtleCowboy(width, height, isBrushing, frame, bounce, breathe);
    case 'chef':
      return renderCrabChef(width, height, isBrushing, frame, bounce, breathe);
    case 'astronaut':
      return renderFishAstronaut(width, height, isBrushing, frame, bounce, breathe);
    case 'pirate':
      return renderBirdPirate(width, height, isBrushing, frame, bounce, breathe);
    case 'princess':
      return renderBunnyPrincess(width, height, isBrushing, frame, bounce, breathe);
    case 'unicorn-horn':
      return renderCatUnicorn(width, height, isBrushing, frame, bounce, breathe);
    case 'dragon-horns':
      return renderDragonPet(width, height, isBrushing, frame, bounce, breathe);
    default:
      return renderSlimeCrown(width, height, isBrushing, frame, bounce, breathe);
  }
}

function renderSlimeCrown(width: number, height: number, isBrushing: boolean, frame: number, bounce: number, breathe: number): JSX.Element {
  const glowIntensity = isBrushing ? 0.4 + Math.sin(frame * Math.PI / 2) * 0.2 : 0.2;
  
  return (
    <svg width={width} height={height} viewBox="0 0 100 95" fill="none">
      <defs>
        <linearGradient id="slimeBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7FE86A" />
          <stop offset="40%" stopColor="#4CD137" />
          <stop offset="100%" stopColor="#2D8F1F" />
        </linearGradient>
        <linearGradient id="slimeHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#BFFFB0" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#7FE86A" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#4CD137" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="slimeInner" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#4CD137" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#2D8F1F" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="crownGold" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFE55C" />
          <stop offset="30%" stopColor="#FFD700" />
          <stop offset="70%" stopColor="#DAA520" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
        <linearGradient id="crownHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF8DC" stopOpacity="0.8" />
          <stop offset="40%" stopColor="#FFE55C" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
        </linearGradient>
        <filter id="slimeGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="innerShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feOffset dx="0" dy="2" />
          <feGaussianBlur stdDeviation="2" result="shadow" />
          <feComposite in="SourceGraphic" in2="shadow" operator="over" />
        </filter>
      </defs>
      
      <g transform={`translate(0, ${bounce})`} style={{ transformOrigin: 'center bottom' }}>
        {/* Slime body with depth */}
        <ellipse cx="50" cy="68" rx={40 * breathe} ry={24 * breathe} fill="url(#slimeBody)" filter="url(#slimeGlow)" />
        
        {/* Inner depth layer */}
        <ellipse cx="50" cy="65" rx="32" ry="18" fill="url(#slimeInner)" />
        
        {/* Highlight */}
        <ellipse cx="38" cy="58" rx="18" ry="10" fill="url(#slimeHighlight)" />
        
        {/* Drips with translucency */}
        <ellipse cx="18" cy="75" rx="7" ry="12" fill="url(#slimeBody)" opacity="0.9" />
        <ellipse cx="16" cy="72" rx="3" ry="5" fill="url(#slimeHighlight)" />
        <ellipse cx="82" cy="72" rx="6" ry="10" fill="url(#slimeBody)" opacity="0.9" />
        <ellipse cx="80" cy="70" rx="2.5" ry="4" fill="url(#slimeHighlight)" />
        <ellipse cx="35" cy="80" rx="5" ry="8" fill="url(#slimeBody)" opacity="0.85" />
        
        {/* Crown */}
        <g filter="url(#innerShadow)">
          <path d="M18 48 L18 28 L28 38 L38 18 L50 32 L62 18 L72 38 L82 28 L82 48 Z" 
            fill="url(#crownGold)" stroke="#B8860B" strokeWidth="1.5" />
          <path d="M18 48 L18 28 L28 38 L38 18 L50 32" 
            fill="url(#crownHighlight)" />
        </g>
        
        {/* Crown jewels with facets */}
        <circle cx="38" cy="24" r="5" fill="#DC143C" stroke="#8B0000" strokeWidth="1" />
        <ellipse cx="36" cy="22" rx="2" ry="1.5" fill="#FF6B6B" opacity="0.7" />
        <circle cx="62" cy="24" r="5" fill="#4169E1" stroke="#00008B" strokeWidth="1" />
        <ellipse cx="60" cy="22" rx="2" ry="1.5" fill="#87CEEB" opacity="0.7" />
        <circle cx="50" cy="36" r="4" fill="#32CD32" stroke="#006400" strokeWidth="1" />
        <ellipse cx="48" cy="34" rx="1.5" ry="1" fill="#90EE90" opacity="0.7" />
        
        {/* Crown base band */}
        <rect x="20" y="44" width="60" height="6" rx="1" fill="url(#crownGold)" stroke="#B8860B" strokeWidth="0.5" />
        
        {/* Eyes with depth */}
        <ellipse cx="38" cy="62" rx="8" ry="9" fill="white" />
        <ellipse cx="38" cy="62" rx="7" ry="8" fill="#FAFAFA" />
        <ellipse cx="62" cy="62" rx="8" ry="9" fill="white" />
        <ellipse cx="62" cy="62" rx="7" ry="8" fill="#FAFAFA" />
        
        {/* Pupils */}
        <ellipse cx="40" cy="63" rx="4" ry="5" fill="#1a1a1a" />
        <ellipse cx="64" cy="63" rx="4" ry="5" fill="#1a1a1a" />
        <ellipse cx="41" cy="61" rx="1.5" ry="2" fill="white" />
        <ellipse cx="65" cy="61" rx="1.5" ry="2" fill="white" />
        <circle cx="38" cy="65" r="0.8" fill="white" opacity="0.5" />
        <circle cx="62" cy="65" r="0.8" fill="white" opacity="0.5" />
        
        {/* Soft blush */}
        <ellipse cx="26" cy="68" rx="6" ry="3" fill="#FF9EC4" opacity="0.4" />
        <ellipse cx="74" cy="68" rx="6" ry="3" fill="#FF9EC4" opacity="0.4" />
        
        {/* Smile */}
        <path d="M 44 74 Q 50 80 56 74" fill="none" stroke="#1F5F14" strokeWidth="2" strokeLinecap="round" />
        
        {/* Ambient particles */}
        {isBrushing && (
          <g opacity={glowIntensity}>
            <circle cx="12" cy="40" r="2" fill="#BFFFB0" />
            <circle cx="88" cy="45" r="1.5" fill="#BFFFB0" />
            <circle cx="50" cy="20" r="2" fill="#FFE55C" />
          </g>
        )}
      </g>
    </svg>
  );
}

function renderMothParty(width: number, height: number, isBrushing: boolean, frame: number, bounce: number, breathe: number): JSX.Element {
  const wingAngle = isBrushing ? Math.sin(frame * Math.PI) * 8 : 0;
  
  return (
    <svg width={width} height={height} viewBox="0 0 100 95" fill="none">
      <defs>
        <linearGradient id="mothBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F5B8D0" />
          <stop offset="50%" stopColor="#E88CB8" />
          <stop offset="100%" stopColor="#C76A9F" />
        </linearGradient>
        <linearGradient id="mothHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE4EE" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#F5B8D0" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#E88CB8" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="wingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#87CEEB" />
          <stop offset="50%" stopColor="#5BA3C6" />
          <stop offset="100%" stopColor="#4A90B0" />
        </linearGradient>
        <linearGradient id="partyHat" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="20%" stopColor="#4ECDC4" />
          <stop offset="40%" stopColor="#FFE66D" />
          <stop offset="60%" stopColor="#95E1D3" />
          <stop offset="80%" stopColor="#DDA0DD" />
          <stop offset="100%" stopColor="#FF6B6B" />
        </linearGradient>
        <linearGradient id="hatShine" x1="0%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.4" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      <g transform={`translate(0, ${bounce})`}>
        {/* Wings with texture */}
        <g transform={`rotate(${-wingAngle}, 50, 55)`}>
          <ellipse cx="22" cy="55" rx="20" ry="25" fill="url(#wingGradient)" opacity="0.9" />
          <ellipse cx="20" cy="50" rx="10" ry="12" fill="url(#mothHighlight)" />
          <circle cx="18" cy="45" r="5" fill="#E88CB8" opacity="0.7" />
          <circle cx="25" cy="60" r="4" fill="#E88CB8" opacity="0.6" />
          <circle cx="15" cy="55" r="3" fill="#FFE4EE" opacity="0.5" />
        </g>
        <g transform={`rotate(${wingAngle}, 50, 55)`}>
          <ellipse cx="78" cy="55" rx="20" ry="25" fill="url(#wingGradient)" opacity="0.9" />
          <ellipse cx="80" cy="50" rx="10" ry="12" fill="url(#mothHighlight)" />
          <circle cx="82" cy="45" r="5" fill="#E88CB8" opacity="0.7" />
          <circle cx="75" cy="60" r="4" fill="#E88CB8" opacity="0.6" />
          <circle cx="85" cy="55" r="3" fill="#FFE4EE" opacity="0.5" />
        </g>
        
        {/* Party hat cone */}
        <polygon points="50,8 28,50 72,50" fill="url(#partyHat)" stroke="#333" strokeWidth="1.5" />
        <polygon points="50,8 28,50 50,50" fill="url(#hatShine)" />
        
        {/* Hat stripes */}
        <line x1="36" y1="42" x2="51" y2="15" stroke="rgba(0,0,0,0.15)" strokeWidth="2" />
        <line x1="50" y1="42" x2="50" y2="18" stroke="rgba(0,0,0,0.15)" strokeWidth="2" />
        <line x1="64" y1="42" x2="52" y2="15" stroke="rgba(0,0,0,0.15)" strokeWidth="2" />
        
        {/* Pom pom with texture */}
        <circle cx="50" cy="8" r="9" fill="#FFD700" />
        <circle cx="50" cy="8" r="8" fill="#FFEC8B" />
        <ellipse cx="47" cy="5" rx="3" ry="2" fill="#FFF8DC" opacity="0.8" />
        <circle cx="53" cy="10" r="2" fill="#DAA520" opacity="0.5" />
        
        {/* Moth body */}
        <ellipse cx="50" cy="65" rx={22 * breathe} ry={24 * breathe} fill="url(#mothBody)" />
        <ellipse cx="42" cy="58" rx="12" ry="10" fill="url(#mothHighlight)" />
        
        {/* Antennae */}
        <path d="M 40 48 Q 32 35 30 28" fill="none" stroke="#C76A9F" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 60 48 Q 68 35 70 28" fill="none" stroke="#C76A9F" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="30" cy="26" r="5" fill="#87CEEB" stroke="#5BA3C6" strokeWidth="1" />
        <ellipse cx="28" cy="24" rx="2" ry="1.5" fill="#B0E0E6" opacity="0.8" />
        <circle cx="70" cy="26" r="5" fill="#87CEEB" stroke="#5BA3C6" strokeWidth="1" />
        <ellipse cx="68" cy="24" rx="2" ry="1.5" fill="#B0E0E6" opacity="0.8" />
        
        {/* Eyes */}
        <ellipse cx="42" cy="60" rx="7" ry="8" fill="white" />
        <ellipse cx="58" cy="60" rx="7" ry="8" fill="white" />
        <ellipse cx="43" cy="61" rx="4" ry="5" fill="#2C1810" />
        <ellipse cx="59" cy="61" rx="4" ry="5" fill="#2C1810" />
        <ellipse cx="44" cy="59" rx="1.5" ry="2" fill="white" />
        <ellipse cx="60" cy="59" rx="1.5" ry="2" fill="white" />
        
        {/* Blush */}
        <ellipse cx="32" cy="66" rx="5" ry="3" fill="#FF9EC4" opacity="0.5" />
        <ellipse cx="68" cy="66" rx="5" ry="3" fill="#FF9EC4" opacity="0.5" />
        
        {/* Smile */}
        <path d="M 45 73 Q 50 78 55 73" fill="none" stroke="#8B4060" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function renderDragonWizard(width: number, height: number, isBrushing: boolean, frame: number, bounce: number, breathe: number): JSX.Element {
  const magicGlow = isBrushing ? 0.5 + Math.sin(frame * Math.PI / 2) * 0.3 : 0.3;
  const smokeOffset = isBrushing ? frame * 2 : 0;
  
  return (
    <svg width={width} height={height} viewBox="0 0 100 98" fill="none">
      <defs>
        <linearGradient id="dragonBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFB347" />
          <stop offset="50%" stopColor="#F59E3D" />
          <stop offset="100%" stopColor="#D4782D" />
        </linearGradient>
        <linearGradient id="dragonHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD699" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#FFB347" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#F59E3D" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="scalePattern" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E8923A" />
          <stop offset="100%" stopColor="#C87028" />
        </linearGradient>
        <linearGradient id="wizardHatGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5B2C8A" />
          <stop offset="50%" stopColor="#4B0082" />
          <stop offset="100%" stopColor="#2E0854" />
        </linearGradient>
        <linearGradient id="wizardHatShine" x1="0%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#9B59B6" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#4B0082" stopOpacity="0" />
        </linearGradient>
        <filter id="magicFilter" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      <g transform={`translate(0, ${bounce})`}>
        {/* Wizard hat */}
        <polygon points="50,5 18,72 82,72" fill="url(#wizardHatGrad)" stroke="#2E0854" strokeWidth="1.5" />
        <polygon points="50,5 18,72 50,72" fill="url(#wizardHatShine)" />
        
        {/* Hat band */}
        <rect x="22" y="65" width="56" height="8" rx="1" fill="#2E0854" />
        <rect x="22" y="65" width="56" height="3" rx="1" fill="#5B2C8A" opacity="0.5" />
        
        {/* Magic stars */}
        <g filter="url(#magicFilter)" opacity={magicGlow}>
          <polygon points="50,18 48,24 42,24 47,28 45,34 50,30 55,34 53,28 58,24 52,24" fill="#FFD700" />
          <polygon points="32,42 30,46 26,46 29,49 28,53 32,50 36,53 35,49 38,46 34,46" fill="#ADD8E6" />
          <polygon points="68,38 66,42 62,42 65,45 64,49 68,46 72,49 71,45 74,42 70,42" fill="#ADD8E6" />
        </g>
        
        {/* Small sparkles */}
        <circle cx="40" cy="55" r="1.5" fill="#FFD700" opacity={magicGlow * 0.8} />
        <circle cx="62" cy="48" r="1" fill="#ADD8E6" opacity={magicGlow * 0.7} />
        
        {/* Dragon body */}
        <ellipse cx="50" cy="82" rx={28 * breathe} ry={16 * breathe} fill="url(#dragonBody)" />
        <ellipse cx="42" cy="78" rx="15" ry="10" fill="url(#dragonHighlight)" />
        
        {/* Scale texture hints */}
        <ellipse cx="35" cy="85" rx="4" ry="3" fill="url(#scalePattern)" opacity="0.4" />
        <ellipse cx="45" cy="88" rx="4" ry="3" fill="url(#scalePattern)" opacity="0.4" />
        <ellipse cx="55" cy="88" rx="4" ry="3" fill="url(#scalePattern)" opacity="0.4" />
        <ellipse cx="65" cy="85" rx="4" ry="3" fill="url(#scalePattern)" opacity="0.4" />
        
        {/* Horns */}
        <path d="M 26 72 L 16 55 L 30 68" fill="#D4782D" stroke="#A85C20" strokeWidth="1" />
        <path d="M 74 72 L 84 55 L 70 68" fill="#D4782D" stroke="#A85C20" strokeWidth="1" />
        <ellipse cx="18" cy="58" rx="2" ry="3" fill="#FFB347" opacity="0.5" />
        <ellipse cx="82" cy="58" rx="2" ry="3" fill="#FFB347" opacity="0.5" />
        
        {/* Small wings */}
        <path d="M 22 80 Q 8 72 12 82 Q 5 86 16 84" fill="#E8923A" stroke="#C87028" strokeWidth="1" />
        <path d="M 78 80 Q 92 72 88 82 Q 95 86 84 84" fill="#E8923A" stroke="#C87028" strokeWidth="1" />
        
        {/* Eyes - vertical pupils */}
        <ellipse cx="40" cy="78" rx="6" ry="7" fill="#FFFACD" stroke="#DAA520" strokeWidth="0.5" />
        <ellipse cx="60" cy="78" rx="6" ry="7" fill="#FFFACD" stroke="#DAA520" strokeWidth="0.5" />
        <ellipse cx="40" cy="78" rx="2" ry="5" fill="#2C1810" />
        <ellipse cx="60" cy="78" rx="2" ry="5" fill="#2C1810" />
        <ellipse cx="39" cy="76" rx="1" ry="1.5" fill="white" />
        <ellipse cx="59" cy="76" rx="1" ry="1.5" fill="white" />
        
        {/* Nostrils with smoke */}
        <ellipse cx="46" cy="86" rx="2" ry="1.5" fill="#A85C20" />
        <ellipse cx="54" cy="86" rx="2" ry="1.5" fill="#A85C20" />
        {isBrushing && (
          <>
            <ellipse cx={46} cy={84 - smokeOffset % 8} rx="2" ry="1.5" fill="#888" opacity={0.3 - (smokeOffset % 8) * 0.03} />
            <ellipse cx={54} cy={84 - (smokeOffset + 2) % 8} rx="2" ry="1.5" fill="#888" opacity={0.3 - ((smokeOffset + 2) % 8) * 0.03} />
          </>
        )}
        
        {/* Blush */}
        <ellipse cx="30" cy="82" rx="5" ry="2.5" fill="#FF9EC4" opacity="0.4" />
        <ellipse cx="70" cy="82" rx="5" ry="2.5" fill="#FF9EC4" opacity="0.4" />
        
        {/* Smile */}
        <path d="M 44 90 Q 50 94 56 90" fill="none" stroke="#A85C20" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function renderTurtleCowboy(width: number, height: number, isBrushing: boolean, frame: number, bounce: number, breathe: number): JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 120 90" fill="none">
      <defs>
        <linearGradient id="turtleBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7FDBDA" />
          <stop offset="50%" stopColor="#5BC0BE" />
          <stop offset="100%" stopColor="#3A9E9D" />
        </linearGradient>
        <linearGradient id="turtleHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B8F0EF" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#7FDBDA" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#5BC0BE" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="shellBrown" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#A67B5B" />
          <stop offset="50%" stopColor="#8B5A2B" />
          <stop offset="100%" stopColor="#6B4423" />
        </linearGradient>
        <linearGradient id="shellHighlight" x1="0%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#C4A484" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#8B5A2B" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="shellPattern" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7FDBDA" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#3A9E9D" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      
      <g transform={`translate(0, ${bounce})`}>
        {/* Hat brim */}
        <ellipse cx="60" cy="58" rx="56" ry="14" fill="url(#shellBrown)" stroke="#5D3A1A" strokeWidth="1.5" />
        <ellipse cx="45" cy="55" rx="25" ry="7" fill="url(#shellHighlight)" />
        
        {/* Shell pattern on brim */}
        <path d="M 15 58 Q 25 52 35 58" fill="none" stroke="url(#shellPattern)" strokeWidth="2" />
        <path d="M 45 55 Q 55 48 65 55" fill="none" stroke="url(#shellPattern)" strokeWidth="2" />
        <path d="M 75 58 Q 85 52 95 58" fill="none" stroke="url(#shellPattern)" strokeWidth="2" />
        
        {/* Hat dome (shell) */}
        <path d="M 28 58 Q 28 22 60 18 Q 92 22 92 58" fill="url(#shellBrown)" stroke="#5D3A1A" strokeWidth="1.5" />
        <path d="M 28 58 Q 28 22 60 18 Q 60 22 60 58" fill="url(#shellHighlight)" />
        
        {/* Shell hexagon pattern */}
        <path d="M 48 38 L 55 32 L 65 32 L 72 38 L 72 48 L 65 54 L 55 54 L 48 48 Z" 
          fill="url(#shellPattern)" stroke="#6B4423" strokeWidth="1" />
        <path d="M 35 48 L 42 44 L 48 48" fill="none" stroke="#6B4423" strokeWidth="0.8" opacity="0.6" />
        <path d="M 72 48 L 78 44 L 85 48" fill="none" stroke="#6B4423" strokeWidth="0.8" opacity="0.6" />
        
        {/* Hat band */}
        <rect x="32" y="52" width="56" height="7" fill="#1a0f05" />
        <rect x="32" y="52" width="56" height="2" fill="#3D2817" opacity="0.5" />
        
        {/* Band decorations */}
        <circle cx="48" cy="55.5" r="3" fill="#FFD700" stroke="#DAA520" strokeWidth="0.5" />
        <ellipse cx="47" cy="54.5" rx="1" ry="0.8" fill="#FFF8DC" opacity="0.6" />
        <circle cx="72" cy="55.5" r="3" fill="#FFD700" stroke="#DAA520" strokeWidth="0.5" />
        <ellipse cx="71" cy="54.5" rx="1" ry="0.8" fill="#FFF8DC" opacity="0.6" />
        
        {/* Turtle head */}
        <ellipse cx="60" cy="75" rx={20 * breathe} ry={14 * breathe} fill="url(#turtleBody)" />
        <ellipse cx="52" cy="70" rx="10" ry="7" fill="url(#turtleHighlight)" />
        
        {/* Eyes */}
        <ellipse cx="52" cy="72" rx="5" ry="6" fill="white" />
        <ellipse cx="68" cy="72" rx="5" ry="6" fill="white" />
        <ellipse cx="53" cy="73" rx="3" ry="4" fill="#2C1810" />
        <ellipse cx="69" cy="73" rx="3" ry="4" fill="#2C1810" />
        <ellipse cx="54" cy="71" rx="1" ry="1.5" fill="white" />
        <ellipse cx="70" cy="71" rx="1" ry="1.5" fill="white" />
        
        {/* Blush */}
        <ellipse cx="44" cy="77" rx="4" ry="2" fill="#FF9EC4" opacity="0.4" />
        <ellipse cx="76" cy="77" rx="4" ry="2" fill="#FF9EC4" opacity="0.4" />
        
        {/* Smile */}
        <path d="M 55 80 Q 60 84 65 80" fill="none" stroke="#2A7F7E" strokeWidth="1.5" strokeLinecap="round" />
        
        {/* Little feet */}
        <ellipse cx="38" cy="82" rx="6" ry="5" fill="url(#turtleBody)" stroke="#3A9E9D" strokeWidth="0.5" />
        <ellipse cx="82" cy="82" rx="6" ry="5" fill="url(#turtleBody)" stroke="#3A9E9D" strokeWidth="0.5" />
      </g>
    </svg>
  );
}

function renderCrabChef(width: number, height: number, isBrushing: boolean, frame: number, bounce: number, breathe: number): JSX.Element {
  const clawMove = isBrushing && frame % 2 === 0 ? 4 : 0;
  
  return (
    <svg width={width} height={height} viewBox="0 0 100 95" fill="none">
      <defs>
        <linearGradient id="crabBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF7F7F" />
          <stop offset="50%" stopColor="#E65C5C" />
          <stop offset="100%" stopColor="#C44040" />
        </linearGradient>
        <linearGradient id="crabHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFB3B3" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#FF7F7F" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#E65C5C" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="chefHat" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#F5F5F5" />
          <stop offset="100%" stopColor="#E0E0E0" />
        </linearGradient>
        <linearGradient id="chefShadow" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#CCCCCC" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      
      <g transform={`translate(0, ${bounce})`}>
        {/* Chef hat puffs with shading */}
        <circle cx="50" cy="20" r="17" fill="url(#chefHat)" stroke="#CCC" strokeWidth="0.8" />
        <ellipse cx="44" cy="15" rx="7" ry="5" fill="white" opacity="0.7" />
        <circle cx="32" cy="27" r="14" fill="url(#chefHat)" stroke="#CCC" strokeWidth="0.8" />
        <ellipse cx="28" cy="23" rx="5" ry="4" fill="white" opacity="0.7" />
        <circle cx="68" cy="27" r="14" fill="url(#chefHat)" stroke="#CCC" strokeWidth="0.8" />
        <ellipse cx="64" cy="23" rx="5" ry="4" fill="white" opacity="0.7" />
        <circle cx="24" cy="42" r="11" fill="url(#chefHat)" stroke="#CCC" strokeWidth="0.8" />
        <circle cx="76" cy="42" r="11" fill="url(#chefHat)" stroke="#CCC" strokeWidth="0.8" />
        
        {/* Hat band */}
        <rect x="20" y="50" width="60" height="9" rx="1" fill="url(#chefHat)" stroke="#CCC" strokeWidth="0.8" />
        <rect x="20" y="50" width="60" height="9" fill="url(#chefShadow)" />
        <line x1="20" y1="54" x2="80" y2="54" stroke="#DDD" strokeWidth="1.5" />
        
        {/* Crab body */}
        <ellipse cx="50" cy="72" rx={30 * breathe} ry={20 * breathe} fill="url(#crabBody)" />
        <ellipse cx="40" cy="65" rx="15" ry="10" fill="url(#crabHighlight)" />
        
        {/* Shell segments hint */}
        <path d="M 30 75 Q 40 70 50 75" fill="none" stroke="#C44040" strokeWidth="0.8" opacity="0.4" />
        <path d="M 50 75 Q 60 70 70 75" fill="none" stroke="#C44040" strokeWidth="0.8" opacity="0.4" />
        
        {/* Claws */}
        <g transform={`translate(${-clawMove}, 0)`}>
          <ellipse cx="12" cy="65" rx="10" ry="8" fill="url(#crabBody)" stroke="#C44040" strokeWidth="1" />
          <ellipse cx="10" cy="62" rx="4" ry="3" fill="url(#crabHighlight)" />
          <path d="M 2 60 Q -5 52 2 62 Q -5 72 2 68" fill="url(#crabBody)" stroke="#C44040" strokeWidth="1" />
        </g>
        <g transform={`translate(${clawMove}, 0)`}>
          <ellipse cx="88" cy="65" rx="10" ry="8" fill="url(#crabBody)" stroke="#C44040" strokeWidth="1" />
          <ellipse cx="90" cy="62" rx="4" ry="3" fill="url(#crabHighlight)" />
          <path d="M 98 60 Q 105 52 98 62 Q 105 72 98 68" fill="url(#crabBody)" stroke="#C44040" strokeWidth="1" />
        </g>
        
        {/* Eye stalks */}
        <line x1="40" y1="58" x2="36" y2="44" stroke="#C44040" strokeWidth="3" strokeLinecap="round" />
        <line x1="60" y1="58" x2="64" y2="44" stroke="#C44040" strokeWidth="3" strokeLinecap="round" />
        
        {/* Eye balls */}
        <circle cx="36" cy="42" r="6" fill="#FFE5B4" stroke="#DAA520" strokeWidth="0.5" />
        <circle cx="64" cy="42" r="6" fill="#FFE5B4" stroke="#DAA520" strokeWidth="0.5" />
        <ellipse cx="34" cy="40" rx="2" ry="1.5" fill="white" opacity="0.7" />
        <ellipse cx="62" cy="40" rx="2" ry="1.5" fill="white" opacity="0.7" />
        
        {/* Pupils */}
        <circle cx="37" cy="42" r="3" fill="#2C1810" />
        <circle cx="65" cy="42" r="3" fill="#2C1810" />
        <circle cx="38" cy="41" r="1" fill="white" />
        <circle cx="66" cy="41" r="1" fill="white" />
        
        {/* Blush on body */}
        <ellipse cx="35" cy="74" rx="5" ry="3" fill="#FF9EC4" opacity="0.4" />
        <ellipse cx="65" cy="74" rx="5" ry="3" fill="#FF9EC4" opacity="0.4" />
        
        {/* Smile */}
        <path d="M 43 80 Q 50 86 57 80" fill="none" stroke="#8B3030" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function renderFishAstronaut(width: number, height: number, isBrushing: boolean, frame: number, bounce: number, breathe: number): JSX.Element {
  const bubbleY = isBrushing ? (frame * 4) % 20 : 0;
  const antennaGlow = isBrushing ? 0.8 + Math.sin(frame * Math.PI) * 0.2 : 0.5;
  
  return (
    <svg width={width} height={height * 1.05} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id="fishBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7DD3E8" />
          <stop offset="50%" stopColor="#5BC0DE" />
          <stop offset="100%" stopColor="#3AA8C5" />
        </linearGradient>
        <linearGradient id="fishHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B8E8F2" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#7DD3E8" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#5BC0DE" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="helmetMetal" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E8E8E8" />
          <stop offset="30%" stopColor="#D0D0D0" />
          <stop offset="70%" stopColor="#A8A8A8" />
          <stop offset="100%" stopColor="#888888" />
        </linearGradient>
        <linearGradient id="visorGlass" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E0FFFF" stopOpacity="0.7" />
          <stop offset="30%" stopColor="#87CEEB" stopOpacity="0.5" />
          <stop offset="70%" stopColor="#5BC0DE" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#4AA8C0" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="visorShine" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.6" />
          <stop offset="30%" stopColor="white" stopOpacity="0.1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      
      <g transform={`translate(0, ${bounce})`}>
        {/* Helmet outer */}
        <ellipse cx="50" cy="52" rx="44" ry="40" fill="url(#helmetMetal)" stroke="#666" strokeWidth="2.5" />
        
        {/* Helmet highlight */}
        <ellipse cx="35" cy="38" rx="15" ry="12" fill="white" opacity="0.3" />
        
        {/* Visor */}
        <ellipse cx="50" cy="54" rx="32" ry="28" fill="url(#visorGlass)" stroke="#555" strokeWidth="1.5" />
        <ellipse cx="38" cy="45" rx="12" ry="8" fill="url(#visorShine)" />
        
        {/* Antenna mount */}
        <rect x="43" y="8" width="14" height="10" rx="2" fill="#666" stroke="#555" strokeWidth="0.5" />
        <rect x="46" y="4" width="8" height="6" rx="1" fill="#555" />
        
        {/* Antenna light */}
        <circle cx="50" cy="5" r="4" fill={isBrushing ? "#FF4444" : "#882222"} opacity={antennaGlow} />
        <circle cx="50" cy="5" r="2" fill="#FF6666" opacity={antennaGlow * 0.8} />
        
        {/* Fish inside */}
        <ellipse cx="50" cy="58" rx={24 * breathe} ry={18 * breathe} fill="url(#fishBody)" />
        <ellipse cx="42" cy="52" rx="12" ry="8" fill="url(#fishHighlight)" />
        
        {/* Fish scales hint */}
        <ellipse cx="55" cy="65" rx="6" ry="4" fill="#3AA8C5" opacity="0.3" />
        <ellipse cx="62" cy="58" rx="5" ry="3" fill="#3AA8C5" opacity="0.3" />
        
        {/* Tail */}
        <path d="M 74 58 L 86 48 L 86 68 Z" fill="#5BC0DE" stroke="#3AA8C5" strokeWidth="1" />
        <path d="M 74 58 L 86 48 L 80 58" fill="url(#fishHighlight)" />
        
        {/* Dorsal fin */}
        <path d="M 50 42 Q 56 34 62 42" fill="#5BC0DE" stroke="#3AA8C5" strokeWidth="0.8" />
        
        {/* Eyes */}
        <ellipse cx="40" cy="55" rx="6" ry="7" fill="white" />
        <ellipse cx="55" cy="55" rx="6" ry="7" fill="white" />
        <ellipse cx="41" cy="56" rx="3.5" ry="4.5" fill="#2C1810" />
        <ellipse cx="56" cy="56" rx="3.5" ry="4.5" fill="#2C1810" />
        <ellipse cx="42" cy="54" rx="1.5" ry="2" fill="white" />
        <ellipse cx="57" cy="54" rx="1.5" ry="2" fill="white" />
        
        {/* Blush */}
        <ellipse cx="32" cy="62" rx="4" ry="2.5" fill="#FF9EC4" opacity="0.4" />
        
        {/* Smile */}
        <path d="M 42 66 Q 48 71 54 66" fill="none" stroke="#2A7F8F" strokeWidth="1.5" strokeLinecap="round" />
        
        {/* Bubbles */}
        {isBrushing && (
          <>
            <circle cx="78" cy={40 - bubbleY} r="3" fill="#B8E8F2" opacity={0.6 - bubbleY * 0.02} />
            <circle cx="82" cy={50 - (bubbleY + 8) % 20} r="2" fill="#B8E8F2" opacity={0.5 - ((bubbleY + 8) % 20) * 0.02} />
            <circle cx="75" cy={35 - (bubbleY + 4) % 20} r="2.5" fill="#B8E8F2" opacity={0.55 - ((bubbleY + 4) % 20) * 0.02} />
          </>
        )}
      </g>
    </svg>
  );
}

function renderBirdPirate(width: number, height: number, isBrushing: boolean, frame: number, bounce: number, breathe: number): JSX.Element {
  const wingFlap = isBrushing ? Math.sin(frame * Math.PI) * 6 : 0;
  
  return (
    <svg width={width} height={height} viewBox="0 0 100 95" fill="none">
      <defs>
        <linearGradient id="birdBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFB5A0" />
          <stop offset="50%" stopColor="#FF9580" />
          <stop offset="100%" stopColor="#E87060" />
        </linearGradient>
        <linearGradient id="birdHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE0D5" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#FFB5A0" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FF9580" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="featherTex" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E87060" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#D05545" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="pirateHat" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2C2C2C" />
          <stop offset="50%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#0D0D0D" />
        </linearGradient>
        <linearGradient id="pirateHatShine" x1="0%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#4A4A4A" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0" />
        </linearGradient>
      </defs>
      
      <g transform={`translate(0, ${bounce})`}>
        {/* Pirate hat */}
        <path d="M 10 58 Q 10 26 50 18 Q 90 26 90 58 Z" fill="url(#pirateHat)" stroke="#333" strokeWidth="1.5" />
        <path d="M 10 58 Q 10 26 50 18 Q 50 26 50 58" fill="url(#pirateHatShine)" />
        
        {/* Gold trim */}
        <path d="M 6 56 Q 50 66 94 56" fill="none" stroke="#DAA520" strokeWidth="3" />
        <path d="M 6 56 Q 50 64 94 56" fill="none" stroke="#FFD700" strokeWidth="1.5" />
        
        {/* Skull emblem */}
        <g transform="translate(38, 32)">
          <ellipse cx="12" cy="10" rx="9" ry="8" fill="#F5F5F5" stroke="#DDD" strokeWidth="0.8" />
          <ellipse cx="12" cy="8" rx="5" ry="3" fill="white" opacity="0.5" />
          <circle cx="8" cy="9" r="2.5" fill="#1a1a1a" />
          <circle cx="16" cy="9" r="2.5" fill="#1a1a1a" />
          <ellipse cx="12" cy="14" rx="2" ry="1" fill="#1a1a1a" />
          <line x1="3" y1="18" x2="21" y2="4" stroke="#F5F5F5" strokeWidth="2.5" />
          <line x1="3" y1="4" x2="21" y2="18" stroke="#F5F5F5" strokeWidth="2.5" />
        </g>
        
        {/* Bird body */}
        <ellipse cx="50" cy="75" rx={24 * breathe} ry={18 * breathe} fill="url(#birdBody)" />
        <ellipse cx="40" cy="68" rx="12" ry="8" fill="url(#birdHighlight)" />
        
        {/* Feather texture */}
        <ellipse cx="55" cy="80" rx="8" ry="5" fill="url(#featherTex)" />
        <ellipse cx="42" cy="82" rx="6" ry="4" fill="url(#featherTex)" />
        
        {/* Wings */}
        <path d={`M 26 72 Q ${14 - wingFlap} 66 ${16 - wingFlap} 76 Q ${8 - wingFlap} 82 20 78`} 
          fill="#FF9580" stroke="#E87060" strokeWidth="1" />
        <path d={`M 74 72 Q ${86 + wingFlap} 66 ${84 + wingFlap} 76 Q ${92 + wingFlap} 82 80 78`} 
          fill="#FF9580" stroke="#E87060" strokeWidth="1" />
        
        {/* Good eye */}
        <ellipse cx="60" cy="72" rx="7" ry="8" fill="white" />
        <ellipse cx="61" cy="73" rx="4" ry="5" fill="#2C1810" />
        <ellipse cx="62" cy="71" rx="1.5" ry="2" fill="white" />
        
        {/* Eye patch */}
        <ellipse cx="40" cy="72" rx="8" ry="9" fill="#1a1a1a" stroke="#333" strokeWidth="0.8" />
        <line x1="35" y1="65" x2="55" y2="58" stroke="#1a1a1a" strokeWidth="2" />
        <line x1="46" y1="68" x2="65" y2="62" stroke="#1a1a1a" strokeWidth="1.5" />
        
        {/* Beak */}
        <path d="M 50 80 L 44 88 L 56 88 Z" fill="#FF8C00" stroke="#E67300" strokeWidth="0.8" />
        <path d="M 50 80 L 44 88 L 50 88" fill="#FFB347" opacity="0.5" />
        
        {/* Blush */}
        <ellipse cx="68" cy="78" rx="4" ry="2.5" fill="#FF9EC4" opacity="0.4" />
        
        {/* Head tuft */}
        <path d="M 46 58 Q 50 50 56 58" fill="#FF9580" stroke="#E87060" strokeWidth="0.8" />
        <path d="M 50 60 Q 52 54 55 60" fill="#FFB5A0" opacity="0.6" />
      </g>
    </svg>
  );
}

function renderBunnyPrincess(width: number, height: number, isBrushing: boolean, frame: number, bounce: number, breathe: number): JSX.Element {
  const earWiggle = isBrushing ? Math.sin(frame * Math.PI / 2) * 4 : 0;
  const sparkle = isBrushing ? 0.5 + Math.sin(frame * Math.PI) * 0.5 : 0.3;
  
  return (
    <svg width={width} height={height * 0.85} viewBox="0 0 100 80" fill="none">
      <defs>
        <linearGradient id="bunnyBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F5E6EA" />
          <stop offset="50%" stopColor="#E8D4DC" />
          <stop offset="100%" stopColor="#D4BCC6" />
        </linearGradient>
        <linearGradient id="bunnyHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF5F8" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#F5E6EA" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#E8D4DC" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="bunnyInner" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFB5C5" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FF9EB5" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="tiaraSilver" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F0F0F0" />
          <stop offset="30%" stopColor="#D8D8D8" />
          <stop offset="70%" stopColor="#B8B8B8" />
          <stop offset="100%" stopColor="#989898" />
        </linearGradient>
        <linearGradient id="tiaraShine" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.7" />
          <stop offset="40%" stopColor="white" stopOpacity="0.2" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      
      <g transform={`translate(0, ${bounce})`}>
        {/* Ears */}
        <ellipse cx={28 - earWiggle} cy="22" rx="11" ry="26" fill="url(#bunnyBody)" stroke="#C4A8B4" strokeWidth="1" />
        <ellipse cx={28 - earWiggle} cy="20" rx="6" ry="18" fill="url(#bunnyInner)" />
        <ellipse cx={72 + earWiggle} cy="22" rx="11" ry="26" fill="url(#bunnyBody)" stroke="#C4A8B4" strokeWidth="1" />
        <ellipse cx={72 + earWiggle} cy="20" rx="6" ry="18" fill="url(#bunnyInner)" />
        
        {/* Tiara */}
        <path d="M 14 38 L 20 22 L 28 30 L 38 10 L 50 26 L 62 10 L 72 30 L 80 22 L 86 38 Z" 
          fill="url(#tiaraSilver)" stroke="#888" strokeWidth="1" />
        <path d="M 14 38 L 20 22 L 28 30 L 38 10 L 50 26" 
          fill="url(#tiaraShine)" />
        
        {/* Tiara gems */}
        <circle cx="38" cy="16" r="5" fill="#FF69B4" stroke="#FF1493" strokeWidth="0.8" />
        <ellipse cx="36" cy="14" rx="2" ry="1.5" fill="#FFB6C1" opacity="0.8" />
        <circle cx="62" cy="16" r="5" fill="#FF69B4" stroke="#FF1493" strokeWidth="0.8" />
        <ellipse cx="60" cy="14" rx="2" ry="1.5" fill="#FFB6C1" opacity="0.8" />
        <circle cx="50" cy="28" r="4" fill="#87CEEB" stroke="#4169E1" strokeWidth="0.8" />
        <ellipse cx="48" cy="26" rx="1.5" ry="1" fill="#B0E0E6" opacity="0.8" />
        <circle cx="22" cy="26" r="3" fill="#98FB98" stroke="#228B22" strokeWidth="0.5" />
        <circle cx="78" cy="26" r="3" fill="#98FB98" stroke="#228B22" strokeWidth="0.5" />
        
        {/* Sparkles on tiara */}
        <g opacity={sparkle}>
          <circle cx="38" cy="8" r="1.5" fill="white" />
          <circle cx="62" cy="8" r="1.5" fill="white" />
          <circle cx="50" cy="5" r="1" fill="#FFD700" />
        </g>
        
        {/* Bunny head */}
        <ellipse cx="50" cy="58" rx={28 * breathe} ry={22 * breathe} fill="url(#bunnyBody)" />
        <ellipse cx="40" cy="50" rx="14" ry="10" fill="url(#bunnyHighlight)" />
        
        {/* Fur texture hint */}
        <ellipse cx="30" cy="60" rx="6" ry="4" fill="#D4BCC6" opacity="0.3" />
        <ellipse cx="70" cy="60" rx="6" ry="4" fill="#D4BCC6" opacity="0.3" />
        
        {/* Eyes */}
        <ellipse cx="38" cy="54" rx="7" ry="8" fill="white" />
        <ellipse cx="62" cy="54" rx="7" ry="8" fill="white" />
        <ellipse cx="39" cy="55" rx="4" ry="5" fill="#6B4C5A" />
        <ellipse cx="63" cy="55" rx="4" ry="5" fill="#6B4C5A" />
        <ellipse cx="40" cy="53" rx="1.5" ry="2" fill="white" />
        <ellipse cx="64" cy="53" rx="1.5" ry="2" fill="white" />
        
        {/* Nose */}
        <ellipse cx="50" cy="62" rx="4" ry="3" fill="#FFB5C5" stroke="#E8A0B0" strokeWidth="0.5" />
        <ellipse cx="49" cy="61" rx="1.5" ry="1" fill="white" opacity="0.5" />
        
        {/* Mouth */}
        <path d="M 46 66 Q 50 70 54 66" fill="none" stroke="#A08090" strokeWidth="1.5" strokeLinecap="round" />
        
        {/* Blush */}
        <ellipse cx="28" cy="60" rx="5" ry="3" fill="#FFB5C5" opacity="0.5" />
        <ellipse cx="72" cy="60" rx="5" ry="3" fill="#FFB5C5" opacity="0.5" />
      </g>
    </svg>
  );
}

function renderCatUnicorn(width: number, height: number, isBrushing: boolean, frame: number, bounce: number, breathe: number): JSX.Element {
  const hornGlow = isBrushing ? 0.6 + Math.sin(frame * Math.PI / 2) * 0.4 : 0.4;
  const sparklePos = isBrushing ? frame * 3 : 0;
  
  return (
    <svg width={width * 0.85} height={height * 1.1} viewBox="0 0 85 105" fill="none">
      <defs>
        <linearGradient id="catBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#C8C8E0" />
          <stop offset="50%" stopColor="#A8A8C8" />
          <stop offset="100%" stopColor="#8888A8" />
        </linearGradient>
        <linearGradient id="catHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8E8F5" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#C8C8E0" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#A8A8C8" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="catEarInner" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFB5C5" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#E8A0B0" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="magicHornGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#FFB6C1" />
          <stop offset="20%" stopColor="#DDA0DD" />
          <stop offset="40%" stopColor="#87CEEB" />
          <stop offset="60%" stopColor="#98FB98" />
          <stop offset="80%" stopColor="#FFFACD" />
          <stop offset="100%" stopColor="#FFD700" />
        </linearGradient>
        <linearGradient id="hornShine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="white" stopOpacity="0.6" />
          <stop offset="50%" stopColor="white" stopOpacity="0.1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <filter id="hornGlowFilter" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      <g transform={`translate(0, ${bounce})`}>
        {/* Cat ears */}
        <path d="M 18 50 L 8 22 L 28 42" fill="url(#catBody)" stroke="#8888A8" strokeWidth="1" />
        <path d="M 67 50 L 77 22 L 57 42" fill="url(#catBody)" stroke="#8888A8" strokeWidth="1" />
        <path d="M 17 48 L 10 26 L 25 42" fill="url(#catEarInner)" />
        <path d="M 68 48 L 75 26 L 60 42" fill="url(#catEarInner)" />
        
        {/* Unicorn horn */}
        <g filter={isBrushing ? "url(#hornGlowFilter)" : ""} opacity={isBrushing ? 1 : 0.95}>
          <polygon points="42.5,5 34,60 51,60" fill="url(#magicHornGrad)" stroke="#DDA0DD" strokeWidth="1.5" />
          <polygon points="42.5,5 34,60 42.5,60" fill="url(#hornShine)" />
        </g>
        
        {/* Horn spiral grooves */}
        <path d="M 37 52 Q 42.5 48 48 52" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
        <path d="M 38 42 Q 42.5 38 47 42" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
        <path d="M 39 32 Q 42.5 28 46 32" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
        <path d="M 40 22 Q 42.5 18 45 22" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
        <path d="M 41 14 Q 42.5 11 44 14" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
        
        {/* Horn tip glow */}
        <circle cx="42.5" cy="8" r="5" fill="#FFD700" opacity={hornGlow} />
        <circle cx="42.5" cy="8" r="3" fill="#FFFACD" opacity={hornGlow * 0.8} />
        
        {/* Cat head */}
        <ellipse cx="42.5" cy="75" rx={30 * breathe} ry={26 * breathe} fill="url(#catBody)" />
        <ellipse cx="32" cy="66" rx="15" ry="12" fill="url(#catHighlight)" />
        
        {/* Fur texture */}
        <ellipse cx="25" cy="78" rx="6" ry="4" fill="#8888A8" opacity="0.2" />
        <ellipse cx="60" cy="78" rx="6" ry="4" fill="#8888A8" opacity="0.2" />
        
        {/* Eyes */}
        <ellipse cx="30" cy="72" rx="7" ry="8" fill="white" />
        <ellipse cx="55" cy="72" rx="7" ry="8" fill="white" />
        <ellipse cx="31" cy="73" rx="4" ry="5" fill="#6B5B8A" />
        <ellipse cx="56" cy="73" rx="4" ry="5" fill="#6B5B8A" />
        <ellipse cx="32" cy="71" rx="1.5" ry="2" fill="white" />
        <ellipse cx="57" cy="71" rx="1.5" ry="2" fill="white" />
        
        {/* Nose */}
        <ellipse cx="42.5" cy="80" rx="3" ry="2.5" fill="#FFB5C5" stroke="#E8A0B0" strokeWidth="0.5" />
        
        {/* Whiskers */}
        <line x1="8" y1="78" x2="26" y2="80" stroke="#A8A8C8" strokeWidth="0.8" />
        <line x1="8" y1="82" x2="26" y2="82" stroke="#A8A8C8" strokeWidth="0.8" />
        <line x1="8" y1="86" x2="26" y2="84" stroke="#A8A8C8" strokeWidth="0.8" />
        <line x1="77" y1="78" x2="59" y2="80" stroke="#A8A8C8" strokeWidth="0.8" />
        <line x1="77" y1="82" x2="59" y2="82" stroke="#A8A8C8" strokeWidth="0.8" />
        <line x1="77" y1="86" x2="59" y2="84" stroke="#A8A8C8" strokeWidth="0.8" />
        
        {/* Smile */}
        <path d="M 37 86 Q 42.5 91 48 86" fill="none" stroke="#7A6A8A" strokeWidth="1.5" strokeLinecap="round" />
        
        {/* Blush */}
        <ellipse cx="18" cy="80" rx="5" ry="3" fill="#FFB5C5" opacity="0.5" />
        <ellipse cx="67" cy="80" rx="5" ry="3" fill="#FFB5C5" opacity="0.5" />
        
        {/* Magic sparkles */}
        {isBrushing && (
          <>
            <circle cx={10 + sparklePos % 10} cy={40} r="2" fill="#FFD700" opacity={0.8 - (sparklePos % 10) * 0.05} />
            <circle cx={75 - sparklePos % 10} cy={35} r="1.5" fill="#DDA0DD" opacity={0.7 - (sparklePos % 10) * 0.05} />
            <circle cx={42.5} cy={3 - sparklePos % 5} r="2" fill="#87CEEB" opacity={0.9 - (sparklePos % 5) * 0.1} />
          </>
        )}
      </g>
    </svg>
  );
}

function renderDragonPet(width: number, height: number, isBrushing: boolean, frame: number, bounce: number, breathe: number): JSX.Element {
  const fireFlicker = isBrushing ? frame % 2 === 0 : false;
  const fireHeight = isBrushing ? 4 + Math.sin(frame * Math.PI) * 2 : 0;
  
  return (
    <svg width={width} height={height} viewBox="0 0 120 90" fill="none">
      <defs>
        <linearGradient id="dragonPetBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7FD87F" />
          <stop offset="50%" stopColor="#5BC85B" />
          <stop offset="100%" stopColor="#3DA83D" />
        </linearGradient>
        <linearGradient id="dragonPetHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B8F5B8" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#7FD87F" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#5BC85B" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hornDark" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#3D5C3D" />
          <stop offset="40%" stopColor="#4A704A" />
          <stop offset="70%" stopColor="#5A8A5A" />
          <stop offset="100%" stopColor="#6BA06B" />
        </linearGradient>
        <linearGradient id="hornHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8BC88B" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#6BA06B" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#5A8A5A" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="fireGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#FF4500" />
          <stop offset="40%" stopColor="#FF6B00" />
          <stop offset="70%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#FFFF80" />
        </linearGradient>
      </defs>
      
      <g transform={`translate(0, ${bounce})`}>
        {/* Left horn */}
        <path d="M 28 72 Q 10 42 30 10 Q 38 28 42 72 Z" fill="url(#hornDark)" stroke="#2D4A2D" strokeWidth="1.5" />
        <path d="M 28 72 Q 10 42 30 10 Q 34 28 35 72" fill="url(#hornHighlight)" />
        
        {/* Right horn */}
        <path d="M 92 72 Q 110 42 90 10 Q 82 28 78 72 Z" fill="url(#hornDark)" stroke="#2D4A2D" strokeWidth="1.5" />
        <path d="M 92 72 Q 110 42 90 10 Q 86 28 85 72" fill="url(#hornHighlight)" />
        
        {/* Horn ridges */}
        <path d="M 29 52 Q 35 47 40 52" fill="none" stroke="#8BC88B" strokeWidth="1.5" />
        <path d="M 28 38 Q 34 33 40 38" fill="none" stroke="#8BC88B" strokeWidth="1.5" />
        <path d="M 29 26 Q 32 22 35 26" fill="none" stroke="#8BC88B" strokeWidth="1.2" />
        <path d="M 80 52 Q 85 47 91 52" fill="none" stroke="#8BC88B" strokeWidth="1.5" />
        <path d="M 80 38 Q 86 33 92 38" fill="none" stroke="#8BC88B" strokeWidth="1.5" />
        <path d="M 85 26 Q 88 22 91 26" fill="none" stroke="#8BC88B" strokeWidth="1.2" />
        
        {/* Horn bases */}
        <ellipse cx="35" cy="72" rx="14" ry="7" fill="url(#hornDark)" stroke="#2D4A2D" strokeWidth="1" />
        <ellipse cx="85" cy="72" rx="14" ry="7" fill="url(#hornDark)" stroke="#2D4A2D" strokeWidth="1" />
        
        {/* Headband */}
        <rect x="38" y="66" width="44" height="12" fill="url(#hornDark)" stroke="#2D4A2D" strokeWidth="1" />
        <rect x="38" y="66" width="44" height="4" fill="#5A8A5A" opacity="0.4" />
        
        {/* Dragon face on headband */}
        <ellipse cx="60" cy="72" rx={22 * breathe} ry={12 * breathe} fill="url(#dragonPetBody)" />
        <ellipse cx="52" cy="68" rx="10" ry="6" fill="url(#dragonPetHighlight)" />
        
        {/* Scale hints */}
        <ellipse cx="50" cy="76" rx="4" ry="2.5" fill="#3DA83D" opacity="0.3" />
        <ellipse cx="60" cy="78" rx="4" ry="2.5" fill="#3DA83D" opacity="0.3" />
        <ellipse cx="70" cy="76" rx="4" ry="2.5" fill="#3DA83D" opacity="0.3" />
        
        {/* Eyes */}
        <ellipse cx="52" cy="70" rx="5" ry="6" fill="#FFFACD" stroke="#DAA520" strokeWidth="0.5" />
        <ellipse cx="68" cy="70" rx="5" ry="6" fill="#FFFACD" stroke="#DAA520" strokeWidth="0.5" />
        <ellipse cx="52" cy="70" rx="2" ry="4" fill="#2C1810" />
        <ellipse cx="68" cy="70" rx="2" ry="4" fill="#2C1810" />
        <ellipse cx="51" cy="68" rx="1" ry="1.5" fill="white" />
        <ellipse cx="67" cy="68" rx="1" ry="1.5" fill="white" />
        
        {/* Nostrils */}
        <ellipse cx="57" cy="76" rx="2" ry="1.5" fill="#2D5A2D" />
        <ellipse cx="63" cy="76" rx="2" ry="1.5" fill="#2D5A2D" />
        
        {/* Fire puffs */}
        {isBrushing && (
          <>
            <ellipse cx="57" cy={74 - fireHeight} rx={fireFlicker ? 3 : 2.5} ry={fireFlicker ? 5 : 4} fill="url(#fireGrad)" opacity="0.9" />
            <ellipse cx="63" cy={74 - (fireFlicker ? fireHeight - 1 : fireHeight + 1)} rx={fireFlicker ? 2.5 : 3} ry={fireFlicker ? 4 : 5} fill="url(#fireGrad)" opacity="0.9" />
          </>
        )}
        
        {/* Blush */}
        <ellipse cx="45" cy="74" rx="4" ry="2" fill="#FFB5C5" opacity="0.4" />
        <ellipse cx="75" cy="74" rx="4" ry="2" fill="#FFB5C5" opacity="0.4" />
        
        {/* Smile */}
        <path d="M 55 80 Q 60 84 65 80" fill="none" stroke="#2D5A2D" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}
