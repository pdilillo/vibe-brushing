import type { Creature, Region } from '../types';

interface CreatureArtProps {
  creature: Creature;
  size?: number;
  showGunk?: boolean;
  gunkLevel?: number;
  animated?: boolean;
  className?: string;
}

interface Palette {
  body: string; 
  bodyMid: string;
  bodyLight: string; 
  bodyHighlight: string;
  shadow: string;
  cheeks: string; 
  accent: string; 
  accentLight: string;
  outline: string;
}

const STYLIZED_PALETTES: Record<Region, Palette> = {
  grassland: { 
    body: '#E88CB8', 
    bodyMid: '#F5A8C8',
    bodyLight: '#FFD6E8', 
    bodyHighlight: '#FFF0F5',
    shadow: '#C76A9F',
    cheeks: '#FF9EC4', 
    accent: '#5BC0A0', 
    accentLight: '#98E4C4',
    outline: '#B8608A' 
  },
  coastal: { 
    body: '#5BC0DE', 
    bodyMid: '#7DD3E8',
    bodyLight: '#B8E8F2', 
    bodyHighlight: '#E0FFFF',
    shadow: '#3AA8C5',
    cheeks: '#7EC8E3', 
    accent: '#FFB86B', 
    accentLight: '#FFE5B4',
    outline: '#4A9DB8' 
  },
  lava: { 
    body: '#F59E3D', 
    bodyMid: '#FFB347',
    bodyLight: '#FFD699', 
    bodyHighlight: '#FFF0D0',
    shadow: '#D4782D',
    cheeks: '#FF8C42', 
    accent: '#FF6B6B', 
    accentLight: '#FFB3B3',
    outline: '#C87028' 
  },
  city: { 
    body: '#BA55D3', 
    bodyMid: '#DDA0DD',
    bodyLight: '#EED6EE', 
    bodyHighlight: '#FFF0FF',
    shadow: '#8B3A9F',
    cheeks: '#DA70D6', 
    accent: '#5BC0DE', 
    accentLight: '#87CEEB',
    outline: '#9040A8' 
  },
  sky: { 
    body: '#7DD3E8', 
    bodyMid: '#A8E4F0',
    bodyLight: '#D4F0F8', 
    bodyHighlight: '#F0FFFF',
    shadow: '#5BC0DE',
    cheeks: '#87CEEB', 
    accent: '#FFE066', 
    accentLight: '#FFFACD',
    outline: '#4AA8C0' 
  },
};

const LEGENDARY_PALETTES: Record<Region, Palette> = {
  grassland: { 
    body: '#2D5A3D', 
    bodyMid: '#3D7A4D',
    bodyLight: '#5AAA6D', 
    bodyHighlight: '#8FD4A0',
    shadow: '#1A3525',
    cheeks: '#FF6B6B', 
    accent: '#FFD700', 
    accentLight: '#FFE44D',
    outline: '#1A3525' 
  },
  coastal: { 
    body: '#1A4A5E', 
    bodyMid: '#2A6A7E',
    bodyLight: '#4A9AB0', 
    bodyHighlight: '#7ACAE0',
    shadow: '#0D2A35',
    cheeks: '#FF8866', 
    accent: '#00FFFF', 
    accentLight: '#66FFFF',
    outline: '#0D2A35' 
  },
  lava: { 
    body: '#4A1A1A', 
    bodyMid: '#6A2A2A',
    bodyLight: '#9A4A4A', 
    bodyHighlight: '#CA7A7A',
    shadow: '#2A0A0A',
    cheeks: '#FF4400', 
    accent: '#FF6600', 
    accentLight: '#FFAA44',
    outline: '#2A0A0A' 
  },
  city: { 
    body: '#2A1A3A', 
    bodyMid: '#4A2A5A',
    bodyLight: '#7A4A8A', 
    bodyHighlight: '#AA7ABA',
    shadow: '#1A0A2A',
    cheeks: '#FF44FF', 
    accent: '#AA00FF', 
    accentLight: '#DD66FF',
    outline: '#1A0A2A' 
  },
  sky: { 
    body: '#1A2A4A', 
    bodyMid: '#2A4A6A',
    bodyLight: '#4A7A9A', 
    bodyHighlight: '#7AAACA',
    shadow: '#0A1A2A',
    cheeks: '#66CCFF', 
    accent: '#FFFFFF', 
    accentLight: '#FFFFFF',
    outline: '#0A1A2A' 
  },
};

type HeadType = 'round-ears' | 'pointed-horns' | 'antennae' | 'crown-crest' | 'shell-dome' | 'floppy-ears' | 'spiky' | 'none';
type EyeType = 'happy' | 'friendly' | 'mischievous' | 'fierce' | 'sleepy' | 'surprised' | 'derpy';
type BodyType = 'blob' | 'fluffy' | 'armored' | 'elongated' | 'round';
type LimbType = 'stubby' | 'paws' | 'wings' | 'fins' | 'claws' | 'tentacles' | 'none';

interface CreatureParts {
  head: HeadType;
  eyes: EyeType;
  body: BodyType;
  limbs: LimbType;
}

function getCreatureParts(creature: Creature): CreatureParts {
  const id = creature.id.toLowerCase();
  const type = creature.monsterType.toLowerCase();
  
  // Head mapping
  let head: HeadType = 'none';
  if (type.includes('bunny') || type.includes('rabbit') || type.includes('cat') || type.includes('kitten')) {
    head = 'round-ears';
  } else if (type.includes('dog') || type.includes('pup') || type.includes('hound')) {
    head = 'floppy-ears';
  } else if (type.includes('dragon') || type.includes('drake') || type.includes('demon') || type.includes('stag')) {
    head = 'pointed-horns';
  } else if (type.includes('moth') || type.includes('butterfly') || type.includes('bee') || type.includes('ant')) {
    head = 'antennae';
  } else if (type.includes('bird') || type.includes('owl') || type.includes('phoenix') || type.includes('hawk')) {
    head = 'crown-crest';
  } else if (type.includes('turtle') || type.includes('snail') || type.includes('crab') || type.includes('beetle')) {
    head = 'shell-dome';
  } else if (type.includes('hedgehog') || type.includes('porcupine') || type.includes('lizard')) {
    head = 'spiky';
  }
  
  // Eyes mapping - based on creature personality/rarity
  let eyes: EyeType = 'friendly';
  if (type.includes('slime') || type.includes('blob') || type.includes('jelly')) {
    eyes = 'happy';
  } else if (type.includes('dragon') || type.includes('wolf') || type.includes('hawk') || type.includes('shark')) {
    eyes = 'fierce';
  } else if (type.includes('cat') || type.includes('fox') || type.includes('raccoon')) {
    eyes = 'mischievous';
  } else if (type.includes('owl') || type.includes('sloth') || type.includes('koala')) {
    eyes = 'sleepy';
  } else if (type.includes('fish') || type.includes('frog') || type.includes('puffer')) {
    eyes = 'surprised';
  } else if (creature.rarity === 'legendary') {
    eyes = 'fierce';
  } else if (id.includes('derp') || id.includes('goof') || id.includes('silly')) {
    eyes = 'derpy';
  }
  
  // Body mapping
  let body: BodyType = 'round';
  if (type.includes('slime') || type.includes('blob') || type.includes('jelly') || type.includes('ghost')) {
    body = 'blob';
  } else if (type.includes('bunny') || type.includes('cat') || type.includes('dog') || type.includes('fox') || type.includes('squirrel')) {
    body = 'fluffy';
  } else if (type.includes('crab') || type.includes('turtle') || type.includes('beetle') || type.includes('armadillo')) {
    body = 'armored';
  } else if (type.includes('fish') || type.includes('dragon') || type.includes('snake') || type.includes('eel')) {
    body = 'elongated';
  }
  
  // Limbs mapping
  let limbs: LimbType = 'stubby';
  if (type.includes('slime') || type.includes('blob') || type.includes('ghost')) {
    limbs = 'none';
  } else if (type.includes('bird') || type.includes('moth') || type.includes('butterfly') || type.includes('bee') || type.includes('bat')) {
    limbs = 'wings';
  } else if (type.includes('fish') || type.includes('whale') || type.includes('ray') || type.includes('shark')) {
    limbs = 'fins';
  } else if (type.includes('crab') || type.includes('dragon') || type.includes('lobster')) {
    limbs = 'claws';
  } else if (type.includes('cat') || type.includes('dog') || type.includes('fox') || type.includes('bunny')) {
    limbs = 'paws';
  } else if (type.includes('octopus') || type.includes('squid') || type.includes('jelly')) {
    limbs = 'tentacles';
  }
  
  return { head, eyes, body, limbs };
}

export function CreatureArt({ 
  creature, 
  size = 200, 
  showGunk = false, 
  gunkLevel = 0, 
  animated = true,
  className = '' 
}: CreatureArtProps) {
  const isLegendary = creature.rarity === 'legendary';
  const isRare = creature.rarity === 'rare';
  const palette = isLegendary ? LEGENDARY_PALETTES[creature.region] : STYLIZED_PALETTES[creature.region];
  const parts = getCreatureParts(creature);
  
  const glowAmount = isLegendary ? 20 : isRare ? 8 : 0;
  const glowColor = isLegendary ? '#FFD700' : '#FFB5D0';
  
  const cleanProgress = showGunk ? Math.max(0, 100 - gunkLevel) / 100 : 1;
  const creatureOpacity = Math.min(1, cleanProgress * 1.5);
  const slimeCoverage = showGunk ? gunkLevel / 100 : 0;
  const redEyeOpacity = Math.max(0, (gunkLevel - 20) / 80);
  const showSparkles = showGunk && gunkLevel < 80 && gunkLevel > 5;
  
  const gradientId = `body-gradient-${creature.id}`;
  const highlightId = `highlight-${creature.id}`;
  const accentId = `accent-gradient-${creature.id}`;
  const scaleGradientId = `scale-gradient-${creature.id}`;
  const glowGradientId = `glow-gradient-${creature.id}`;
  
  // Legendary creatures use a larger viewBox to appear bigger and more imposing
  const viewBox = isLegendary ? "-10 -15 120 130" : "0 0 100 100";
  
  return (
    <svg 
      viewBox={viewBox}
      width={size} 
      height={size}
      className={`${className} ${animated ? 'animate-float' : ''}`}
      style={{ 
        filter: glowAmount > 0 && cleanProgress > 0.5 ? `drop-shadow(0 0 ${glowAmount * cleanProgress}px ${glowColor})` : undefined,
        transition: 'filter 0.3s ease'
      }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={palette.bodyHighlight} />
          <stop offset="30%" stopColor={palette.bodyLight} />
          <stop offset="70%" stopColor={palette.body} />
          <stop offset="100%" stopColor={palette.shadow} />
        </linearGradient>
        <linearGradient id={highlightId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={palette.bodyHighlight} stopOpacity="0.9" />
          <stop offset="40%" stopColor={palette.bodyLight} stopOpacity="0.4" />
          <stop offset="100%" stopColor={palette.body} stopOpacity="0" />
        </linearGradient>
        <linearGradient id={accentId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={palette.accentLight} />
          <stop offset="100%" stopColor={palette.accent} />
        </linearGradient>
        {isLegendary && (
          <>
            <linearGradient id={scaleGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={palette.bodyLight} />
              <stop offset="50%" stopColor={palette.body} />
              <stop offset="100%" stopColor={palette.shadow} />
            </linearGradient>
            <radialGradient id={glowGradientId} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={palette.accent} stopOpacity="0.6" />
              <stop offset="100%" stopColor={palette.accent} stopOpacity="0" />
            </radialGradient>
            <filter id={`legendary-glow-${creature.id}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="glow"/>
              <feMerge>
                <feMergeNode in="glow"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </>
        )}
        <filter id="glow-red">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="glow-sparkle">
          <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <g opacity={creatureOpacity} style={{ transition: 'opacity 0.3s ease' }}>
        {isLegendary ? (
          renderLegendaryDragon(creature, gradientId, highlightId, accentId, scaleGradientId, glowGradientId, palette, animated)
        ) : (
          <>
            {/* Render in order: limbs (back), body, head, face */}
            <g>
              {renderLimbs(parts.limbs, gradientId, highlightId, accentId, palette, animated)}
            </g>
            <g>
              {renderBody(parts.body, gradientId, highlightId, palette, animated)}
            </g>
            <g>
              {renderHead(parts.head, gradientId, highlightId, accentId, palette, animated)}
            </g>
            <g>
              {renderFace(parts.eyes, palette)}
            </g>
          </>
        )}
      </g>
      
      {showGunk && gunkLevel > 0 && (
        <g>
          {renderPixelSlime(slimeCoverage, animated)}
          {redEyeOpacity > 0 && renderGlowingEyes(animated, redEyeOpacity)}
        </g>
      )}
      
      {showSparkles && renderCleaningSparkles(cleanProgress, animated)}
    </svg>
  );
}

// ============== LEGENDARY DRAGON RENDERING ==============

function renderLegendaryDragon(
  creature: Creature,
  gradientId: string, 
  highlightId: string, 
  accentId: string,
  scaleGradientId: string,
  glowGradientId: string,
  palette: Palette, 
  animated: boolean
): JSX.Element {
  return (
    <g filter={`url(#legendary-glow-${creature.id})`}>
      {/* Magical aura */}
      <ellipse cx="50" cy="55" rx="50" ry="45" fill={`url(#${glowGradientId})`} opacity="0.4">
        {animated && (
          <animate attributeName="opacity" values="0.3;0.5;0.3" dur="2s" repeatCount="indefinite" />
        )}
      </ellipse>
      
      {/* Large dragon wings */}
      <g>
        {/* Left wing */}
        <path 
          d="M 20 45 Q -15 20 -5 50 Q -20 35 -8 55 Q -25 50 -5 65 Q -15 70 5 70 Q 15 65 22 55" 
          fill={`url(#${gradientId})`} 
          stroke={palette.outline} 
          strokeWidth="1.5"
        />
        <path d="M 20 45 Q 5 40 -5 50" fill="none" stroke={palette.bodyLight} strokeWidth="1" opacity="0.5" />
        <path d="M 15 50 Q 0 48 -8 55" fill="none" stroke={palette.bodyLight} strokeWidth="1" opacity="0.5" />
        <path d="M 10 58 Q -5 55 -5 65" fill="none" stroke={palette.bodyLight} strokeWidth="1" opacity="0.5" />
        
        {/* Right wing */}
        <path 
          d="M 80 45 Q 115 20 105 50 Q 120 35 108 55 Q 125 50 105 65 Q 115 70 95 70 Q 85 65 78 55" 
          fill={`url(#${gradientId})`} 
          stroke={palette.outline} 
          strokeWidth="1.5"
        />
        <path d="M 80 45 Q 95 40 105 50" fill="none" stroke={palette.bodyLight} strokeWidth="1" opacity="0.5" />
        <path d="M 85 50 Q 100 48 108 55" fill="none" stroke={palette.bodyLight} strokeWidth="1" opacity="0.5" />
        <path d="M 90 58 Q 105 55 105 65" fill="none" stroke={palette.bodyLight} strokeWidth="1" opacity="0.5" />
        
        {animated && (
          <animateTransform attributeName="transform" type="rotate" values="-2 50 55;2 50 55;-2 50 55" dur="1.5s" repeatCount="indefinite" />
        )}
      </g>
      
      {/* Tail */}
      <path 
        d="M 75 75 Q 95 80 105 75 Q 115 70 118 60 Q 120 55 115 52" 
        fill={`url(#${gradientId})`} 
        stroke={palette.outline} 
        strokeWidth="2"
      />
      <path d="M 115 52 L 125 48 L 118 55 L 125 58 L 115 56" fill={palette.accent} stroke={palette.outline} strokeWidth="1" />
      
      {/* Rear legs with claws */}
      <g>
        <ellipse cx="30" cy="85" rx="10" ry="8" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="1.5" />
        <path d="M 22 90 L 18 98 M 26 92 L 24 100 M 32 92 L 32 100" stroke={palette.outline} strokeWidth="2" strokeLinecap="round" />
        
        <ellipse cx="70" cy="85" rx="10" ry="8" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="1.5" />
        <path d="M 62 90 L 58 98 M 66 92 L 64 100 M 72 92 L 72 100" stroke={palette.outline} strokeWidth="2" strokeLinecap="round" />
      </g>
      
      {/* Main body - muscular and scaled */}
      <ellipse cx="50" cy="60" rx="32" ry="28" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="2" />
      
      {/* Scale texture pattern */}
      <g opacity="0.3">
        <ellipse cx="35" cy="55" rx="8" ry="6" fill={`url(#${scaleGradientId})`} />
        <ellipse cx="50" cy="52" rx="8" ry="6" fill={`url(#${scaleGradientId})`} />
        <ellipse cx="65" cy="55" rx="8" ry="6" fill={`url(#${scaleGradientId})`} />
        <ellipse cx="42" cy="65" rx="7" ry="5" fill={`url(#${scaleGradientId})`} />
        <ellipse cx="58" cy="65" rx="7" ry="5" fill={`url(#${scaleGradientId})`} />
        <ellipse cx="35" cy="72" rx="6" ry="4" fill={`url(#${scaleGradientId})`} />
        <ellipse cx="50" cy="75" rx="6" ry="4" fill={`url(#${scaleGradientId})`} />
        <ellipse cx="65" cy="72" rx="6" ry="4" fill={`url(#${scaleGradientId})`} />
      </g>
      
      {/* Chest/belly highlight */}
      <ellipse cx="50" cy="68" rx="15" ry="12" fill={palette.bodyLight} opacity="0.4" />
      
      {/* Neck */}
      <path d="M 40 45 Q 45 35 50 30 Q 55 35 60 45" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="1.5" />
      
      {/* Head - more angular and fierce */}
      <path 
        d="M 35 30 Q 35 15 50 12 Q 65 15 65 30 Q 65 40 50 42 Q 35 40 35 30" 
        fill={`url(#${gradientId})`} 
        stroke={palette.outline} 
        strokeWidth="2"
      />
      
      {/* Snout */}
      <path d="M 42 28 Q 50 22 58 28 Q 55 35 50 36 Q 45 35 42 28" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="1.5" />
      
      {/* Large curved horns */}
      <path d="M 38 18 Q 28 8 22 -5 Q 26 0 32 5 Q 30 12 35 18" fill={`url(#${accentId})`} stroke={palette.outline} strokeWidth="1.5" />
      <path d="M 62 18 Q 72 8 78 -5 Q 74 0 68 5 Q 70 12 65 18" fill={`url(#${accentId})`} stroke={palette.outline} strokeWidth="1.5" />
      
      {/* Smaller back horns */}
      <path d="M 42 15 L 38 5 L 44 14" fill={`url(#${accentId})`} stroke={palette.outline} strokeWidth="1" />
      <path d="M 58 15 L 62 5 L 56 14" fill={`url(#${accentId})`} stroke={palette.outline} strokeWidth="1" />
      
      {/* Spinal ridge */}
      <g>
        <path d="M 50 12 L 50 5 L 52 11" fill={`url(#${accentId})`} stroke={palette.outline} strokeWidth="0.8" />
        <path d="M 50 30 L 50 25 L 52 29" fill={`url(#${accentId})`} stroke={palette.outline} strokeWidth="0.8" />
        <path d="M 50 42 L 50 38 L 52 41" fill={`url(#${accentId})`} stroke={palette.outline} strokeWidth="0.8" />
      </g>
      
      {/* Fierce reptilian eyes */}
      <g>
        {/* Left eye */}
        <path d="M 40 24 L 48 22 L 48 28 L 40 26 Z" fill="#FFFACD" stroke={palette.outline} strokeWidth="0.8" />
        <ellipse cx="45" cy="25" rx="2" ry="4" fill="#1A1A1A" />
        <ellipse cx="44" cy="24" rx="0.8" ry="1.5" fill={palette.accent} />
        
        {/* Right eye */}
        <path d="M 60 24 L 52 22 L 52 28 L 60 26 Z" fill="#FFFACD" stroke={palette.outline} strokeWidth="0.8" />
        <ellipse cx="55" cy="25" rx="2" ry="4" fill="#1A1A1A" />
        <ellipse cx="56" cy="24" rx="0.8" ry="1.5" fill={palette.accent} />
        
        {/* Eye glow */}
        {animated && (
          <g>
            <ellipse cx="45" cy="25" rx="4" ry="5" fill={palette.accent} opacity="0">
              <animate attributeName="opacity" values="0;0.3;0" dur="3s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="55" cy="25" rx="4" ry="5" fill={palette.accent} opacity="0">
              <animate attributeName="opacity" values="0;0.3;0" dur="3s" repeatCount="indefinite" begin="0.5s" />
            </ellipse>
          </g>
        )}
      </g>
      
      {/* Nostrils with smoke */}
      <ellipse cx="46" cy="30" rx="2" ry="1.5" fill={palette.shadow} />
      <ellipse cx="54" cy="30" rx="2" ry="1.5" fill={palette.shadow} />
      {animated && (
        <g opacity="0.4">
          <ellipse cx="44" cy="28" rx="2" ry="1" fill={palette.bodyLight}>
            <animate attributeName="cy" values="28;22;28" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="56" cy="28" rx="2" ry="1" fill={palette.bodyLight}>
            <animate attributeName="cy" values="28;22;28" dur="2s" repeatCount="indefinite" begin="0.3s" />
            <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" begin="0.3s" />
          </ellipse>
        </g>
      )}
      
      {/* Mouth line */}
      <path d="M 44 34 Q 50 36 56 34" fill="none" stroke={palette.outline} strokeWidth="1.5" />
      
      {/* Front arms/claws */}
      <g>
        <ellipse cx="28" cy="58" rx="8" ry="6" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="1.5" />
        <path d="M 20 62 L 15 68 M 24 64 L 20 72 M 28 64 L 26 72" stroke={palette.outline} strokeWidth="2" strokeLinecap="round" />
        
        <ellipse cx="72" cy="58" rx="8" ry="6" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="1.5" />
        <path d="M 80 62 L 85 68 M 76 64 L 80 72 M 72 64 L 74 72" stroke={palette.outline} strokeWidth="2" strokeLinecap="round" />
      </g>
      
      {/* Breathing animation for body */}
      {animated && (
        <animateTransform attributeName="transform" type="scale" values="1;1.02;1" dur="2.5s" repeatCount="indefinite" />
      )}
    </g>
  );
}

// ============== HEAD TYPES ==============

function renderHead(type: HeadType, gradientId: string, highlightId: string, accentId: string, palette: Palette, animated: boolean): JSX.Element {
  switch (type) {
    case 'round-ears':
      return (
        <g>
          {/* Left ear */}
          <ellipse cx="30" cy="26" rx="10" ry="14" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="1.5" />
          <ellipse cx="30" cy="24" rx="5" ry="10" fill={palette.cheeks} opacity="0.5" />
          <ellipse cx="28" cy="22" rx="2" ry="5" fill={palette.bodyHighlight} opacity="0.6" />
          {/* Right ear */}
          <ellipse cx="70" cy="26" rx="10" ry="14" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="1.5" />
          <ellipse cx="70" cy="24" rx="5" ry="10" fill={palette.cheeks} opacity="0.5" />
          <ellipse cx="68" cy="22" rx="2" ry="5" fill={palette.bodyHighlight} opacity="0.6" />
          {animated && (
            <animateTransform attributeName="transform" type="rotate" values="-1 50 50;1 50 50;-1 50 50" dur="2s" repeatCount="indefinite" />
          )}
        </g>
      );
    
    case 'floppy-ears':
      return (
        <g>
          {/* Left floppy ear */}
          <ellipse cx="22" cy="38" rx="12" ry="20" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="1.5" transform="rotate(-30 22 38)" />
          <ellipse cx="20" cy="34" rx="5" ry="12" fill={`url(#${highlightId})`} transform="rotate(-30 20 34)" />
          {/* Right floppy ear */}
          <ellipse cx="78" cy="38" rx="12" ry="20" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="1.5" transform="rotate(30 78 38)" />
          <ellipse cx="80" cy="34" rx="5" ry="12" fill={`url(#${highlightId})`} transform="rotate(30 80 34)" />
          {animated && (
            <animateTransform attributeName="transform" type="rotate" values="-2 50 40;2 50 40;-2 50 40" dur="0.8s" repeatCount="indefinite" />
          )}
        </g>
      );
    
    case 'pointed-horns':
      return (
        <g>
          {/* Left horn */}
          <path d="M 32 38 L 18 10 L 38 32" fill={`url(#${accentId})`} stroke={palette.outline} strokeWidth="1.5" />
          <path d="M 22 18 Q 26 14 28 20" fill="none" stroke={palette.accentLight} strokeWidth="1.5" opacity="0.6" />
          {/* Right horn */}
          <path d="M 68 38 L 82 10 L 62 32" fill={`url(#${accentId})`} stroke={palette.outline} strokeWidth="1.5" />
          <path d="M 78 18 Q 74 14 72 20" fill="none" stroke={palette.accentLight} strokeWidth="1.5" opacity="0.6" />
          {/* Small middle horn */}
          <path d="M 50 36 L 50 18 L 55 34" fill={`url(#${accentId})`} stroke={palette.outline} strokeWidth="1" />
          {animated && (
            <animateTransform attributeName="transform" type="scale" values="1;1.02;1" dur="1.5s" repeatCount="indefinite" />
          )}
        </g>
      );
    
    case 'antennae':
      return (
        <g>
          {/* Left antenna */}
          <path d="M 38 38 Q 28 20 24 12" fill="none" stroke={palette.outline} strokeWidth="3" strokeLinecap="round" />
          <circle cx="24" cy="10" r="6" fill={`url(#${accentId})`} stroke={palette.outline} strokeWidth="1" />
          <ellipse cx="22" cy="8" rx="2" ry="1.5" fill={palette.bodyHighlight} opacity="0.7" />
          {/* Right antenna */}
          <path d="M 62 38 Q 72 20 76 12" fill="none" stroke={palette.outline} strokeWidth="3" strokeLinecap="round" />
          <circle cx="76" cy="10" r="6" fill={`url(#${accentId})`} stroke={palette.outline} strokeWidth="1" />
          <ellipse cx="74" cy="8" rx="2" ry="1.5" fill={palette.bodyHighlight} opacity="0.7" />
          {animated && (
            <animateTransform attributeName="transform" type="rotate" values="-3 50 40;3 50 40;-3 50 40" dur="0.6s" repeatCount="indefinite" />
          )}
        </g>
      );
    
    case 'crown-crest':
      return (
        <g>
          {/* Main crest */}
          <path d="M 35 38 Q 40 22 50 18 Q 60 22 65 38" fill={`url(#${accentId})`} stroke={palette.outline} strokeWidth="1.5" />
          <path d="M 40 35 Q 45 26 50 24 Q 55 26 60 35" fill={palette.accentLight} opacity="0.5" />
          {/* Crest spikes */}
          <path d="M 42 32 L 44 20 L 48 30" fill={`url(#${accentId})`} stroke={palette.outline} strokeWidth="0.8" />
          <path d="M 50 30 L 50 14 L 54 28" fill={`url(#${accentId})`} stroke={palette.outline} strokeWidth="0.8" />
          <path d="M 56 32 L 58 20 L 54 30" fill={`url(#${accentId})`} stroke={palette.outline} strokeWidth="0.8" />
          {animated && (
            <animateTransform attributeName="transform" type="translate" values="0 0;0 -2;0 0" dur="1s" repeatCount="indefinite" />
          )}
        </g>
      );
    
    case 'shell-dome':
      return (
        <g>
          {/* Shell dome on top */}
          <ellipse cx="50" cy="35" rx="22" ry="14" fill={`url(#${accentId})`} stroke={palette.outline} strokeWidth="1.5" />
          <ellipse cx="44" cy="32" rx="10" ry="6" fill={`url(#${highlightId})`} />
          {/* Shell pattern */}
          <path d="M 35 38 Q 42 30 50 38" fill="none" stroke={palette.outline} strokeWidth="0.8" opacity="0.4" />
          <path d="M 50 38 Q 58 30 65 38" fill="none" stroke={palette.outline} strokeWidth="0.8" opacity="0.4" />
          <circle cx="50" cy="28" r="3" fill={palette.accent} opacity="0.5" />
        </g>
      );
    
    case 'spiky':
      return (
        <g>
          {/* Multiple spikes */}
          <path d="M 30 40 L 22 22 L 35 36" fill={`url(#${accentId})`} stroke={palette.outline} strokeWidth="1" />
          <path d="M 40 38 L 36 18 L 46 34" fill={`url(#${accentId})`} stroke={palette.outline} strokeWidth="1" />
          <path d="M 50 36 L 50 12 L 55 34" fill={`url(#${accentId})`} stroke={palette.outline} strokeWidth="1" />
          <path d="M 60 38 L 64 18 L 54 34" fill={`url(#${accentId})`} stroke={palette.outline} strokeWidth="1" />
          <path d="M 70 40 L 78 22 L 65 36" fill={`url(#${accentId})`} stroke={palette.outline} strokeWidth="1" />
          {animated && (
            <animateTransform attributeName="transform" type="scale" values="1;1.03;1" dur="0.8s" repeatCount="indefinite" />
          )}
        </g>
      );
    
    default:
      return <g />;
  }
}

// ============== EYE/FACE TYPES ==============

function renderFace(type: EyeType, palette: Palette): JSX.Element {
  const eyeY = 52;
  const leftX = 38;
  const rightX = 62;
  
  switch (type) {
    case 'happy':
      // Dragon Quest slime style - big curved happy eyes
      return (
        <g>
          {/* Big happy curved eyes */}
          <path d="M 32 50 Q 38 42 44 50" fill="none" stroke="#2C1810" strokeWidth="3" strokeLinecap="round" />
          <path d="M 56 50 Q 62 42 68 50" fill="none" stroke="#2C1810" strokeWidth="3" strokeLinecap="round" />
          {/* Rosy cheeks */}
          <ellipse cx="26" cy="58" rx="6" ry="4" fill={palette.cheeks} opacity="0.6" />
          <ellipse cx="74" cy="58" rx="6" ry="4" fill={palette.cheeks} opacity="0.6" />
          {/* Big happy smile */}
          <path d="M 40 64 Q 50 76 60 64" fill="none" stroke="#2C1810" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 42 66 Q 50 72 58 66" fill={palette.cheeks} opacity="0.3" />
        </g>
      );
    
    case 'friendly':
      // Standard friendly round eyes
      return (
        <g>
          {/* Left eye */}
          <ellipse cx={leftX} cy={eyeY} rx="9" ry="10" fill="white" />
          <ellipse cx={leftX} cy={eyeY} rx="8" ry="9" fill="#FAFAFA" />
          <ellipse cx={leftX + 2} cy={eyeY + 1} rx="5" ry="6" fill="#2C1810" />
          <ellipse cx={leftX + 3} cy={eyeY - 1} rx="2" ry="2.5" fill="white" />
          <circle cx={leftX} cy={eyeY + 3} r="1" fill="white" opacity="0.5" />
          {/* Right eye */}
          <ellipse cx={rightX} cy={eyeY} rx="9" ry="10" fill="white" />
          <ellipse cx={rightX} cy={eyeY} rx="8" ry="9" fill="#FAFAFA" />
          <ellipse cx={rightX + 2} cy={eyeY + 1} rx="5" ry="6" fill="#2C1810" />
          <ellipse cx={rightX + 3} cy={eyeY - 1} rx="2" ry="2.5" fill="white" />
          <circle cx={rightX} cy={eyeY + 3} r="1" fill="white" opacity="0.5" />
          {/* Cheeks */}
          <ellipse cx="28" cy="62" rx="5" ry="3" fill={palette.cheeks} opacity="0.5" />
          <ellipse cx="72" cy="62" rx="5" ry="3" fill={palette.cheeks} opacity="0.5" />
          {/* Gentle smile */}
          <path d="M 44 68 Q 50 74 56 68" fill="none" stroke="#2C1810" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      );
    
    case 'mischievous':
      // Angled sly eyes with smirk
      return (
        <g>
          {/* Left eye - angled */}
          <ellipse cx={leftX} cy={eyeY} rx="8" ry="7" fill="white" transform="rotate(-10 38 52)" />
          <ellipse cx={leftX + 1} cy={eyeY} rx="4" ry="5" fill="#2C1810" transform="rotate(-10 39 52)" />
          <ellipse cx={leftX + 2} cy={eyeY - 2} rx="1.5" ry="2" fill="white" />
          {/* Right eye - angled */}
          <ellipse cx={rightX} cy={eyeY} rx="8" ry="7" fill="white" transform="rotate(10 62 52)" />
          <ellipse cx={rightX + 1} cy={eyeY} rx="4" ry="5" fill="#2C1810" transform="rotate(10 63 52)" />
          <ellipse cx={rightX + 2} cy={eyeY - 2} rx="1.5" ry="2" fill="white" />
          {/* Raised eyebrow effect */}
          <path d="M 30 44 Q 38 40 46 44" fill="none" stroke={palette.outline} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 54 44 Q 62 40 70 44" fill="none" stroke={palette.outline} strokeWidth="1.5" strokeLinecap="round" />
          {/* Smirk */}
          <path d="M 42 66 Q 52 70 62 64" fill="none" stroke="#2C1810" strokeWidth="2" strokeLinecap="round" />
          {/* One cheek */}
          <ellipse cx="72" cy="60" rx="5" ry="3" fill={palette.cheeks} opacity="0.5" />
        </g>
      );
    
    case 'fierce':
      // Sharp angled determined eyes
      return (
        <g>
          {/* Left eye - sharp */}
          <path d="M 28 48 L 38 44 L 48 48 L 48 56 L 38 60 L 28 56 Z" fill="white" stroke={palette.outline} strokeWidth="0.5" />
          <ellipse cx={leftX} cy={eyeY} rx="4" ry="5" fill="#2C1810" />
          <ellipse cx={leftX - 1} cy={eyeY - 2} rx="1.5" ry="2" fill="white" />
          {/* Right eye - sharp */}
          <path d="M 52 48 L 62 44 L 72 48 L 72 56 L 62 60 L 52 56 Z" fill="white" stroke={palette.outline} strokeWidth="0.5" />
          <ellipse cx={rightX} cy={eyeY} rx="4" ry="5" fill="#2C1810" />
          <ellipse cx={rightX - 1} cy={eyeY - 2} rx="1.5" ry="2" fill="white" />
          {/* Angry eyebrows */}
          <path d="M 28 42 L 48 46" fill="none" stroke={palette.outline} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 72 42 L 52 46" fill="none" stroke={palette.outline} strokeWidth="2.5" strokeLinecap="round" />
          {/* Determined mouth */}
          <path d="M 42 68 L 50 66 L 58 68" fill="none" stroke="#2C1810" strokeWidth="2" strokeLinecap="round" />
        </g>
      );
    
    case 'sleepy':
      // Half-closed drowsy eyes
      return (
        <g>
          {/* Left sleepy eye */}
          <ellipse cx={leftX} cy={eyeY + 2} rx="8" ry="4" fill="white" />
          <ellipse cx={leftX + 1} cy={eyeY + 2} rx="4" ry="3" fill="#2C1810" />
          <ellipse cx={leftX + 2} cy={eyeY + 1} rx="1.5" ry="1" fill="white" />
          {/* Droopy eyelid */}
          <path d="M 28 48 Q 38 46 48 48" fill={palette.body} stroke={palette.outline} strokeWidth="1" />
          {/* Right sleepy eye */}
          <ellipse cx={rightX} cy={eyeY + 2} rx="8" ry="4" fill="white" />
          <ellipse cx={rightX + 1} cy={eyeY + 2} rx="4" ry="3" fill="#2C1810" />
          <ellipse cx={rightX + 2} cy={eyeY + 1} rx="1.5" ry="1" fill="white" />
          {/* Droopy eyelid */}
          <path d="M 52 48 Q 62 46 72 48" fill={palette.body} stroke={palette.outline} strokeWidth="1" />
          {/* Subtle cheeks */}
          <ellipse cx="28" cy="60" rx="5" ry="3" fill={palette.cheeks} opacity="0.4" />
          <ellipse cx="72" cy="60" rx="5" ry="3" fill={palette.cheeks} opacity="0.4" />
          {/* Relaxed mouth */}
          <ellipse cx="50" cy="68" rx="4" ry="2" fill="#2C1810" opacity="0.6" />
        </g>
      );
    
    case 'surprised':
      // Big round surprised eyes
      return (
        <g>
          {/* Left big eye */}
          <ellipse cx={leftX} cy={eyeY} rx="11" ry="12" fill="white" />
          <ellipse cx={leftX} cy={eyeY} rx="10" ry="11" fill="#FAFAFA" />
          <ellipse cx={leftX} cy={eyeY} rx="5" ry="6" fill="#2C1810" />
          <ellipse cx={leftX + 2} cy={eyeY - 2} rx="2.5" ry="3" fill="white" />
          <circle cx={leftX - 2} cy={eyeY + 2} r="1.5" fill="white" opacity="0.5" />
          {/* Right big eye */}
          <ellipse cx={rightX} cy={eyeY} rx="11" ry="12" fill="white" />
          <ellipse cx={rightX} cy={eyeY} rx="10" ry="11" fill="#FAFAFA" />
          <ellipse cx={rightX} cy={eyeY} rx="5" ry="6" fill="#2C1810" />
          <ellipse cx={rightX + 2} cy={eyeY - 2} rx="2.5" ry="3" fill="white" />
          <circle cx={rightX - 2} cy={eyeY + 2} r="1.5" fill="white" opacity="0.5" />
          {/* Small O mouth */}
          <ellipse cx="50" cy="70" rx="5" ry="6" fill="#2C1810" />
          <ellipse cx="50" cy="68" rx="3" ry="3" fill={palette.cheeks} opacity="0.4" />
        </g>
      );
    
    case 'derpy':
      // Misaligned goofy eyes
      return (
        <g>
          {/* Left eye - looking up */}
          <ellipse cx={leftX} cy={eyeY} rx="9" ry="10" fill="white" />
          <ellipse cx={leftX - 2} cy={eyeY - 3} rx="5" ry="5" fill="#2C1810" />
          <ellipse cx={leftX - 1} cy={eyeY - 4} rx="2" ry="2" fill="white" />
          {/* Right eye - looking down */}
          <ellipse cx={rightX} cy={eyeY} rx="9" ry="10" fill="white" />
          <ellipse cx={rightX + 2} cy={eyeY + 3} rx="5" ry="5" fill="#2C1810" />
          <ellipse cx={rightX + 3} cy={eyeY + 2} rx="2" ry="2" fill="white" />
          {/* Cheeks */}
          <ellipse cx="28" cy="62" rx="5" ry="3" fill={palette.cheeks} opacity="0.6" />
          <ellipse cx="72" cy="62" rx="5" ry="3" fill={palette.cheeks} opacity="0.6" />
          {/* Wavy smile */}
          <path d="M 40 68 Q 45 72 50 68 Q 55 72 60 68" fill="none" stroke="#2C1810" strokeWidth="2" strokeLinecap="round" />
        </g>
      );
    
    default:
      return renderFace('friendly', palette);
  }
}

// ============== BODY TYPES ==============

function renderBody(type: BodyType, gradientId: string, highlightId: string, palette: Palette, animated: boolean): JSX.Element {
  switch (type) {
    case 'blob':
      // Slime-like wobbly body
      return (
        <g>
          <path 
            d="M 20 60 Q 15 50 25 45 Q 35 38 50 36 Q 65 38 75 45 Q 85 50 80 60 Q 82 75 70 82 Q 55 88 50 88 Q 45 88 30 82 Q 18 75 20 60" 
            fill={`url(#${gradientId})`} 
            stroke={palette.outline} 
            strokeWidth="2" 
          />
          <ellipse cx="40" cy="48" rx="18" ry="12" fill={`url(#${highlightId})`} />
          {/* Drip effects */}
          <ellipse cx="22" cy="55" rx="5" ry="8" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="1" />
          <ellipse cx="78" cy="58" rx="4" ry="6" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="1" />
          {animated && (
            <animateTransform attributeName="transform" type="scale" values="1 1;1.03 0.97;1 1" dur="1.5s" repeatCount="indefinite" />
          )}
        </g>
      );
    
    case 'fluffy':
      // Soft fuzzy body with texture
      return (
        <g>
          <ellipse cx="50" cy="60" rx="30" ry="28" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="2" />
          <ellipse cx="42" cy="52" rx="18" ry="14" fill={`url(#${highlightId})`} />
          {/* Fluffy texture bumps */}
          <circle cx="25" cy="55" r="6" fill={palette.bodyLight} opacity="0.5" />
          <circle cx="75" cy="55" r="6" fill={palette.bodyLight} opacity="0.5" />
          <circle cx="30" cy="70" r="5" fill={palette.shadow} opacity="0.2" />
          <circle cx="70" cy="70" r="5" fill={palette.shadow} opacity="0.2" />
          {/* Belly fluff */}
          <ellipse cx="50" cy="72" rx="12" ry="8" fill={palette.bodyHighlight} opacity="0.4" />
          {animated && (
            <animateTransform attributeName="transform" type="rotate" values="-1 50 60;1 50 60;-1 50 60" dur="2s" repeatCount="indefinite" />
          )}
        </g>
      );
    
    case 'armored':
      // Shell or armor plated body
      return (
        <g>
          {/* Outer shell */}
          <ellipse cx="50" cy="62" rx="34" ry="26" fill={palette.accent} stroke={palette.outline} strokeWidth="2" />
          {/* Inner body showing */}
          <ellipse cx="50" cy="58" rx="26" ry="18" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="1.5" />
          <ellipse cx="42" cy="54" rx="14" ry="10" fill={`url(#${highlightId})`} />
          {/* Shell segments */}
          <path d="M 30 60 Q 40 52 50 60" fill="none" stroke={palette.outline} strokeWidth="1" opacity="0.4" />
          <path d="M 50 60 Q 60 52 70 60" fill="none" stroke={palette.outline} strokeWidth="1" opacity="0.4" />
          <path d="M 35 70 Q 50 64 65 70" fill="none" stroke={palette.outline} strokeWidth="1" opacity="0.4" />
          {/* Shell highlight */}
          <ellipse cx="40" cy="68" rx="8" ry="5" fill={palette.accentLight} opacity="0.4" />
        </g>
      );
    
    case 'elongated':
      // Stretched fish/dragon body
      return (
        <g>
          <ellipse cx="50" cy="58" rx="36" ry="24" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="2" />
          <ellipse cx="38" cy="50" rx="18" ry="12" fill={`url(#${highlightId})`} />
          {/* Scale texture */}
          <ellipse cx="55" cy="64" rx="10" ry="6" fill={palette.shadow} opacity="0.15" />
          <ellipse cx="68" cy="58" rx="8" ry="5" fill={palette.shadow} opacity="0.15" />
          <ellipse cx="32" cy="62" rx="7" ry="5" fill={palette.shadow} opacity="0.1" />
          {animated && (
            <animateTransform attributeName="transform" type="translate" values="-1 0;1 0;-1 0" dur="1.2s" repeatCount="indefinite" />
          )}
        </g>
      );
    
    case 'round':
    default:
      // Standard round body
      return (
        <g>
          <ellipse cx="50" cy="58" rx="28" ry="26" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="2" />
          <ellipse cx="42" cy="50" rx="16" ry="12" fill={`url(#${highlightId})`} />
          {/* Subtle body texture */}
          <ellipse cx="32" cy="62" rx="5" ry="4" fill={palette.shadow} opacity="0.15" />
          <ellipse cx="68" cy="62" rx="5" ry="4" fill={palette.shadow} opacity="0.15" />
          {animated && (
            <animateTransform attributeName="transform" type="scale" values="1;1.01;1" dur="2s" repeatCount="indefinite" />
          )}
        </g>
      );
  }
}

// ============== LIMB TYPES ==============

function renderLimbs(type: LimbType, gradientId: string, highlightId: string, accentId: string, palette: Palette, animated: boolean): JSX.Element {
  switch (type) {
    case 'paws':
      return (
        <g>
          {/* Front paws */}
          <ellipse cx="30" cy="82" rx="8" ry="6" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="1" />
          <ellipse cx="28" cy="80" rx="3" ry="2" fill={`url(#${highlightId})`} />
          <circle cx="26" cy="84" r="2" fill={palette.bodyLight} />
          <circle cx="30" cy="85" r="2" fill={palette.bodyLight} />
          <circle cx="34" cy="84" r="2" fill={palette.bodyLight} />
          
          <ellipse cx="70" cy="82" rx="8" ry="6" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="1" />
          <ellipse cx="72" cy="80" rx="3" ry="2" fill={`url(#${highlightId})`} />
          <circle cx="66" cy="84" r="2" fill={palette.bodyLight} />
          <circle cx="70" cy="85" r="2" fill={palette.bodyLight} />
          <circle cx="74" cy="84" r="2" fill={palette.bodyLight} />
          
          {/* Tail */}
          <ellipse cx="82" cy="65" rx="10" ry="6" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="1" transform="rotate(-20 82 65)" />
          {animated && (
            <animateTransform attributeName="transform" type="rotate" values="-2 50 80;2 50 80;-2 50 80" dur="0.5s" repeatCount="indefinite" />
          )}
        </g>
      );
    
    case 'wings':
      return (
        <g>
          {/* Left wing */}
          <path d="M 22 52 Q 4 42 8 56 Q 2 62 14 60 Q 18 56 24 56" fill={`url(#${accentId})`} stroke={palette.outline} strokeWidth="1.5" />
          <path d="M 10 52 Q 6 48 8 54" fill="none" stroke={palette.accentLight} strokeWidth="1" opacity="0.6" />
          <path d="M 14 56 Q 8 54 12 58" fill="none" stroke={palette.accentLight} strokeWidth="1" opacity="0.6" />
          
          {/* Right wing */}
          <path d="M 78 52 Q 96 42 92 56 Q 98 62 86 60 Q 82 56 76 56" fill={`url(#${accentId})`} stroke={palette.outline} strokeWidth="1.5" />
          <path d="M 90 52 Q 94 48 92 54" fill="none" stroke={palette.accentLight} strokeWidth="1" opacity="0.6" />
          <path d="M 86 56 Q 92 54 88 58" fill="none" stroke={palette.accentLight} strokeWidth="1" opacity="0.6" />
          
          {/* Small feet */}
          <ellipse cx="40" cy="84" rx="5" ry="3" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="0.8" />
          <ellipse cx="60" cy="84" rx="5" ry="3" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="0.8" />
          
          {animated && (
            <animateTransform attributeName="transform" type="scale" values="1 1;1.02 0.98;1 1" dur="0.3s" repeatCount="indefinite" />
          )}
        </g>
      );
    
    case 'fins':
      return (
        <g>
          {/* Side fins */}
          <path d="M 18 58 Q 6 50 8 62 Q 4 68 16 64" fill={`url(#${accentId})`} stroke={palette.outline} strokeWidth="1" />
          <path d="M 82 58 Q 94 50 92 62 Q 96 68 84 64" fill={`url(#${accentId})`} stroke={palette.outline} strokeWidth="1" />
          
          {/* Tail fin */}
          <path d="M 80 60 L 96 48 L 96 72 Z" fill={`url(#${accentId})`} stroke={palette.outline} strokeWidth="1.5" />
          <path d="M 80 60 L 96 48 L 88 60" fill={palette.accentLight} opacity="0.5" />
          
          {/* Top fin */}
          <path d="M 50 34 Q 56 24 62 34" fill={`url(#${accentId})`} stroke={palette.outline} strokeWidth="1" />
          
          {animated && (
            <animateTransform attributeName="transform" type="translate" values="-2 0;2 0;-2 0" dur="1s" repeatCount="indefinite" />
          )}
        </g>
      );
    
    case 'claws':
      return (
        <g>
          {/* Left claw */}
          <g transform="translate(12, 55)">
            <ellipse cx="0" cy="0" rx="10" ry="8" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="1.5" />
            <ellipse cx="-2" cy="-2" rx="4" ry="3" fill={`url(#${highlightId})`} />
            <path d="M -10 -4 Q -18 -10 -14 0 Q -18 10 -10 5" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="1.5" />
          </g>
          
          {/* Right claw */}
          <g transform="translate(88, 55)">
            <ellipse cx="0" cy="0" rx="10" ry="8" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="1.5" />
            <ellipse cx="2" cy="-2" rx="4" ry="3" fill={`url(#${highlightId})`} />
            <path d="M 10 -4 Q 18 -10 14 0 Q 18 10 10 5" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="1.5" />
          </g>
          
          {/* Small legs */}
          <ellipse cx="35" cy="82" rx="6" ry="4" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="0.8" />
          <ellipse cx="65" cy="82" rx="6" ry="4" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="0.8" />
          
          {animated && (
            <animateTransform attributeName="transform" type="rotate" values="-2 50 60;2 50 60;-2 50 60" dur="0.8s" repeatCount="indefinite" />
          )}
        </g>
      );
    
    case 'tentacles':
      return (
        <g>
          {/* Multiple tentacles */}
          <path d="M 30 78 Q 25 88 28 95" fill="none" stroke={`url(#${gradientId})`} strokeWidth="5" strokeLinecap="round" />
          <path d="M 40 80 Q 38 92 42 98" fill="none" stroke={`url(#${gradientId})`} strokeWidth="5" strokeLinecap="round" />
          <path d="M 50 82 Q 50 94 50 100" fill="none" stroke={`url(#${gradientId})`} strokeWidth="5" strokeLinecap="round" />
          <path d="M 60 80 Q 62 92 58 98" fill="none" stroke={`url(#${gradientId})`} strokeWidth="5" strokeLinecap="round" />
          <path d="M 70 78 Q 75 88 72 95" fill="none" stroke={`url(#${gradientId})`} strokeWidth="5" strokeLinecap="round" />
          
          {animated && (
            <animateTransform attributeName="transform" type="rotate" values="-3 50 78;3 50 78;-3 50 78" dur="1.5s" repeatCount="indefinite" />
          )}
        </g>
      );
    
    case 'stubby':
      return (
        <g>
          {/* Small stubby legs */}
          <ellipse cx="35" cy="82" rx="7" ry="5" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="1" />
          <ellipse cx="33" cy="80" rx="3" ry="2" fill={`url(#${highlightId})`} />
          <ellipse cx="65" cy="82" rx="7" ry="5" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="1" />
          <ellipse cx="67" cy="80" rx="3" ry="2" fill={`url(#${highlightId})`} />
        </g>
      );
    
    case 'none':
    default:
      return <g />;
  }
}

// ============== EFFECTS ==============

function renderPixelSlime(coverage: number, animated: boolean): JSX.Element {
  const blockSize = 8;
  const slimeBlocks: { x: number; y: number; shade: string; priority: number }[] = [];
  
  const slimeColors = ['#32CD32', '#228B22', '#2E8B2E', '#3CB371', '#00AA00', '#1F7A1F'];
  
  const seed = 12345;
  const seededRandom = (i: number) => {
    const x = Math.sin(seed + i * 9999) * 10000;
    return x - Math.floor(x);
  };
  
  for (let row = 0; row < 12; row++) {
    for (let col = 0; col < 12; col++) {
      const x = col * blockSize + 2;
      const y = row * blockSize + 2;
      
      const distFromCenter = Math.sqrt(Math.pow(col - 5.5, 2) + Math.pow(row - 5.5, 2));
      const isInCreatureArea = distFromCenter < 5.5;
      
      if (isInCreatureArea) {
        const isEyeArea = (row >= 4 && row <= 5) && ((col >= 2 && col <= 3) || (col >= 8 && col <= 9));
        
        if (!isEyeArea) {
          const blockIndex = row * 12 + col;
          const priority = seededRandom(blockIndex);
          const shade = slimeColors[Math.floor(seededRandom(blockIndex + 100) * slimeColors.length)];
          slimeBlocks.push({ x, y, shade, priority });
        }
      }
    }
  }
  
  slimeBlocks.sort((a, b) => a.priority - b.priority);
  
  const visibleBlockCount = Math.floor(slimeBlocks.length * coverage);
  const visibleBlocks = slimeBlocks.slice(0, visibleBlockCount);
  
  return (
    <g style={{ transition: 'opacity 0.2s ease' }}>
      {visibleBlocks.map((block, i) => {
        const blockOpacity = Math.min(1, (coverage - block.priority) * 3);
        return (
          <rect
            key={`slime-${i}`}
            x={block.x}
            y={block.y}
            width={blockSize}
            height={blockSize}
            fill={block.shade}
            stroke="#1A5F1A"
            strokeWidth="0.5"
            opacity={blockOpacity}
            style={{ transition: 'opacity 0.15s ease' }}
          >
            {animated && (
              <animate
                attributeName="y"
                values={`${block.y};${block.y + 1};${block.y}`}
                dur={`${0.8 + (block.priority * 0.4)}s`}
                repeatCount="indefinite"
                begin={`${block.priority * 0.5}s`}
              />
            )}
          </rect>
        );
      })}
    </g>
  );
}

function renderGlowingEyes(animated: boolean, opacity: number): JSX.Element {
  return (
    <g filter="url(#glow-red)" opacity={opacity} style={{ transition: 'opacity 0.3s ease' }}>
      <rect x="30" y="48" width="10" height="10" fill="#FF0000" rx="2">
        {animated && (
          <animate attributeName="opacity" values="1;0.6;1" dur="1.5s" repeatCount="indefinite" />
        )}
      </rect>
      <rect x="32" y="50" width="4" height="4" fill="#FF6666" />
      
      <rect x="60" y="48" width="10" height="10" fill="#FF0000" rx="2">
        {animated && (
          <animate attributeName="opacity" values="1;0.6;1" dur="1.5s" repeatCount="indefinite" begin="0.2s" />
        )}
      </rect>
      <rect x="62" y="50" width="4" height="4" fill="#FF6666" />
    </g>
  );
}

function renderCleaningSparkles(cleanProgress: number, animated: boolean): JSX.Element {
  const sparkleCount = Math.floor(cleanProgress * 8);
  const sparklePositions = [
    { x: 20, y: 25, delay: 0 },
    { x: 75, y: 30, delay: 0.2 },
    { x: 15, y: 55, delay: 0.4 },
    { x: 80, y: 60, delay: 0.6 },
    { x: 35, y: 15, delay: 0.8 },
    { x: 65, y: 20, delay: 1.0 },
    { x: 25, y: 75, delay: 1.2 },
    { x: 70, y: 80, delay: 1.4 },
  ];
  
  const visibleSparkles = sparklePositions.slice(0, sparkleCount);
  
  return (
    <g filter="url(#glow-sparkle)">
      {visibleSparkles.map((spark, i) => (
        <g key={`sparkle-${i}`} transform={`translate(${spark.x}, ${spark.y})`}>
          <path
            d="M 0 -4 L 1 -1 L 4 0 L 1 1 L 0 4 L -1 1 L -4 0 L -1 -1 Z"
            fill="#FFFFFF"
            opacity={0.9}
          >
            {animated && (
              <>
                <animate
                  attributeName="opacity"
                  values="0.9;0.3;0.9"
                  dur="0.8s"
                  repeatCount="indefinite"
                  begin={`${spark.delay}s`}
                />
                <animateTransform
                  attributeName="transform"
                  type="scale"
                  values="1;1.3;1"
                  dur="0.8s"
                  repeatCount="indefinite"
                  begin={`${spark.delay}s`}
                />
              </>
            )}
          </path>
          <circle cx="0" cy="0" r="2" fill="#FFE4B5" opacity="0.6">
            {animated && (
              <animate
                attributeName="r"
                values="2;3;2"
                dur="0.8s"
                repeatCount="indefinite"
                begin={`${spark.delay}s`}
              />
            )}
          </circle>
        </g>
      ))}
    </g>
  );
}
