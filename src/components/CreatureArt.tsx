import type { Creature, Region } from '../types';

interface CreatureArtProps {
  creature: Creature;
  size?: number;
  showGunk?: boolean;
  gunkLevel?: number;
  animated?: boolean;
  className?: string;
}

const KAWAII_PALETTES: Record<Region, { body: string; bodyLight: string; cheeks: string; accent: string; outline: string }> = {
  grassland: { body: '#FFB5D0', bodyLight: '#FFD6E8', cheeks: '#FF9EC4', accent: '#98E4C4', outline: '#E091B5' },
  coastal: { body: '#A8D8EA', bodyLight: '#D4ECFC', cheeks: '#7EC8E3', accent: '#FFE5B4', outline: '#7BAFCF' },
  lava: { body: '#FFB347', bodyLight: '#FFD699', cheeks: '#FF8C42', accent: '#FFE066', outline: '#E59B3F' },
  city: { body: '#DDA0DD', bodyLight: '#EED6EE', cheeks: '#DA70D6', accent: '#87CEEB', outline: '#BA55D3' },
  sky: { body: '#B0E0E6', bodyLight: '#E0FFFF', cheeks: '#87CEEB', accent: '#FFFACD', outline: '#87CEEB' },
};

export function CreatureArt({ 
  creature, 
  size = 200, 
  showGunk = false, 
  gunkLevel = 0, 
  animated = true,
  className = '' 
}: CreatureArtProps) {
  const palette = KAWAII_PALETTES[creature.region];
  const isLegendary = creature.rarity === 'legendary';
  const isRare = creature.rarity === 'rare';
  
  const glowAmount = isLegendary ? 12 : isRare ? 6 : 0;
  const glowColor = isLegendary ? '#FFD700' : '#FFB5D0';
  
  const cleanProgress = showGunk ? Math.max(0, 100 - gunkLevel) / 100 : 1;
  const creatureOpacity = Math.min(1, cleanProgress * 1.5);
  const slimeCoverage = showGunk ? gunkLevel / 100 : 0;
  const redEyeOpacity = Math.max(0, (gunkLevel - 20) / 80);
  const showSparkles = showGunk && gunkLevel < 80 && gunkLevel > 5;
  
  return (
    <svg 
      viewBox="0 0 100 100" 
      width={size} 
      height={size}
      className={`${className} ${animated ? 'animate-float' : ''}`}
      style={{ 
        filter: glowAmount > 0 && cleanProgress > 0.5 ? `drop-shadow(0 0 ${glowAmount * cleanProgress}px ${glowColor})` : undefined,
        transition: 'filter 0.3s ease'
      }}
    >
      <defs>
        <linearGradient id={`kawaii-body-${creature.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={palette.bodyLight} />
          <stop offset="100%" stopColor={palette.body} />
        </linearGradient>
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
        {renderKawaiiCreature(creature, palette, animated)}
      </g>
      
      {showGunk && gunkLevel > 0 && (
        <g>
          {renderPixelSlime(slimeCoverage, animated, cleanProgress)}
          {redEyeOpacity > 0 && renderGlowingEyes(animated, redEyeOpacity)}
        </g>
      )}
      
      {showSparkles && renderCleaningSparkles(cleanProgress, animated)}
    </svg>
  );
}

function renderPixelSlime(coverage: number, animated: boolean, _cleanProgress: number): JSX.Element {
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
  
  const edgeBlocks = [
    { x: 18, y: 82, shade: '#228B22', priority: 0.1 },
    { x: 26, y: 86, shade: '#32CD32', priority: 0.15 },
    { x: 42, y: 90, shade: '#2E8B2E', priority: 0.2 },
    { x: 58, y: 88, shade: '#3CB371', priority: 0.25 },
    { x: 74, y: 84, shade: '#228B22', priority: 0.3 },
    { x: 10, y: 50, shade: '#32CD32', priority: 0.4 },
    { x: 82, y: 55, shade: '#2E8B2E', priority: 0.45 },
    { x: 14, y: 30, shade: '#3CB371', priority: 0.5 },
    { x: 78, y: 35, shade: '#228B22', priority: 0.55 },
  ];
  
  const visibleEdgeBlocks = edgeBlocks.filter(b => b.priority < coverage);
  
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
      
      {visibleEdgeBlocks.map((block, i) => {
        const blockOpacity = Math.min(1, (coverage - block.priority) * 2);
        return (
          <rect
            key={`edge-${i}`}
            x={block.x}
            y={block.y}
            width={blockSize - 2}
            height={blockSize - 2}
            fill={block.shade}
            stroke="#1A5F1A"
            strokeWidth="0.5"
            opacity={blockOpacity}
            style={{ transition: 'opacity 0.15s ease' }}
          >
            {animated && (
              <animate
                attributeName="y"
                values={`${block.y};${block.y + 2};${block.y}`}
                dur="1s"
                repeatCount="indefinite"
                begin={`${i * 0.15}s`}
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
      <rect x="22" y="38" width="10" height="10" fill="#FF0000" rx="1">
        {animated && (
          <animate attributeName="opacity" values="1;0.6;1" dur="1.5s" repeatCount="indefinite" />
        )}
      </rect>
      <rect x="24" y="40" width="4" height="4" fill="#FF6666" />
      
      <rect x="68" y="38" width="10" height="10" fill="#FF0000" rx="1">
        {animated && (
          <animate attributeName="opacity" values="1;0.6;1" dur="1.5s" repeatCount="indefinite" begin="0.2s" />
        )}
      </rect>
      <rect x="70" y="40" width="4" height="4" fill="#FF6666" />
      
      <ellipse cx="27" cy="43" rx="12" ry="8" fill="#FF0000" opacity={0.3 * opacity}>
        {animated && (
          <animate attributeName="opacity" values="0.3;0.1;0.3" dur="1.5s" repeatCount="indefinite" />
        )}
      </ellipse>
      <ellipse cx="73" cy="43" rx="12" ry="8" fill="#FF0000" opacity={0.3 * opacity}>
        {animated && (
          <animate attributeName="opacity" values="0.3;0.1;0.3" dur="1.5s" repeatCount="indefinite" begin="0.2s" />
        )}
      </ellipse>
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
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values="0;45;0"
                  dur="1.6s"
                  repeatCount="indefinite"
                  begin={`${spark.delay}s`}
                  additive="sum"
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

function renderKawaiiCreature(creature: Creature, palette: typeof KAWAII_PALETTES.grassland, animated: boolean): JSX.Element {
  const gradientId = `kawaii-body-${creature.id}`;
  
  const creatureType = getCreatureType(creature.id);
  
  switch (creatureType) {
    case 'bunny':
      return renderKawaiiBunny(gradientId, palette, animated);
    case 'moth':
      return renderKawaiiMoth(gradientId, palette, animated);
    case 'turtle':
      return renderKawaiiTurtle(gradientId, palette, animated);
    case 'crab':
      return renderKawaiiCrab(gradientId, palette, animated);
    case 'bird':
      return renderKawaiiBird(gradientId, palette, animated);
    case 'cat':
      return renderKawaiiCat(gradientId, palette, animated);
    case 'dog':
      return renderKawaiiDog(gradientId, palette, animated);
    case 'dragon':
      return renderKawaiiDragon(gradientId, palette, animated);
    case 'fish':
      return renderKawaiiFish(gradientId, palette, animated);
    case 'slime':
      return renderKawaiiSlime(gradientId, palette, animated);
    default:
      return renderKawaiiDefault(gradientId, palette, animated, creature);
  }
}

function getCreatureType(id: string): string {
  if (id.includes('bunny') || id.includes('rabbit')) return 'bunny';
  if (id.includes('moth') || id.includes('butterfly') || id.includes('bee')) return 'moth';
  if (id.includes('turtle')) return 'turtle';
  if (id.includes('crab')) return 'crab';
  if (id.includes('bird') || id.includes('owl') || id.includes('hawk') || id.includes('phoenix') || id.includes('pigeon')) return 'bird';
  if (id.includes('cat') || id.includes('kitten')) return 'cat';
  if (id.includes('dog') || id.includes('pup') || id.includes('hound')) return 'dog';
  if (id.includes('dragon') || id.includes('drake')) return 'dragon';
  if (id.includes('fish') || id.includes('ray') || id.includes('whale') || id.includes('turtle')) return 'fish';
  if (id.includes('slime') || id.includes('blob') || id.includes('jelly')) return 'slime';
  return 'default';
}

function renderKawaiiBunny(gradientId: string, palette: typeof KAWAII_PALETTES.grassland, animated: boolean): JSX.Element {
  return (
    <g>
      <ellipse cx="35" cy="20" rx="8" ry="22" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="1.5" />
      <ellipse cx="65" cy="20" rx="8" ry="22" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="1.5" />
      <ellipse cx="35" cy="18" rx="4" ry="16" fill={palette.bodyLight} />
      <ellipse cx="65" cy="18" rx="4" ry="16" fill={palette.bodyLight} />
      
      <ellipse cx="50" cy="58" rx="28" ry="26" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="2" />
      <ellipse cx="50" cy="52" rx="20" ry="16" fill={palette.bodyLight} opacity="0.5" />
      
      <ellipse cx="32" cy="68" rx="6" ry="4" fill={palette.cheeks} opacity="0.6" />
      <ellipse cx="68" cy="68" rx="6" ry="4" fill={palette.cheeks} opacity="0.6" />
      
      <ellipse cx="38" cy="55" rx="8" ry="9" fill="white" />
      <ellipse cx="62" cy="55" rx="8" ry="9" fill="white" />
      <ellipse cx="40" cy="56" rx="5" ry="6" fill="#2C1810" />
      <ellipse cx="64" cy="56" rx="5" ry="6" fill="#2C1810" />
      <ellipse cx="42" cy="54" rx="2" ry="2.5" fill="white" />
      <ellipse cx="66" cy="54" rx="2" ry="2.5" fill="white" />
      
      <ellipse cx="50" cy="68" rx="4" ry="3" fill={palette.cheeks} />
      <path d="M 46 72 Q 50 76 54 72" fill="none" stroke="#2C1810" strokeWidth="1.5" strokeLinecap="round" />
      
      {animated && (
        <animateTransform attributeName="transform" type="rotate" values="-2 50 50;2 50 50;-2 50 50" dur="2s" repeatCount="indefinite" />
      )}
    </g>
  );
}

function renderKawaiiMoth(gradientId: string, palette: typeof KAWAII_PALETTES.grassland, animated: boolean): JSX.Element {
  return (
    <g>
      <ellipse cx="25" cy="50" rx="18" ry="22" fill={palette.accent} stroke={palette.outline} strokeWidth="1.5" opacity="0.9" />
      <ellipse cx="75" cy="50" rx="18" ry="22" fill={palette.accent} stroke={palette.outline} strokeWidth="1.5" opacity="0.9" />
      <circle cx="20" cy="42" r="4" fill={palette.body} />
      <circle cx="80" cy="42" r="4" fill={palette.body} />
      <circle cx="28" cy="55" r="3" fill={palette.body} />
      <circle cx="72" cy="55" r="3" fill={palette.body} />
      
      <ellipse cx="50" cy="55" rx="16" ry="18" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="2" />
      
      <line x1="42" y1="32" x2="35" y2="18" stroke={palette.outline} strokeWidth="2" strokeLinecap="round" />
      <line x1="58" y1="32" x2="65" y2="18" stroke={palette.outline} strokeWidth="2" strokeLinecap="round" />
      <circle cx="35" cy="16" r="3" fill={palette.accent} />
      <circle cx="65" cy="16" r="3" fill={palette.accent} />
      
      <ellipse cx="44" cy="50" rx="5" ry="6" fill="white" />
      <ellipse cx="56" cy="50" rx="5" ry="6" fill="white" />
      <ellipse cx="45" cy="51" rx="3" ry="4" fill="#2C1810" />
      <ellipse cx="57" cy="51" rx="3" ry="4" fill="#2C1810" />
      <ellipse cx="46" cy="49" rx="1.5" ry="2" fill="white" />
      <ellipse cx="58" cy="49" rx="1.5" ry="2" fill="white" />
      
      <path d="M 46 62 Q 50 65 54 62" fill="none" stroke="#2C1810" strokeWidth="1" strokeLinecap="round" />
      
      {animated && (
        <>
          <animateTransform attributeName="transform" type="scale" values="1 1;1.02 0.98;1 1" dur="0.3s" repeatCount="indefinite" />
        </>
      )}
    </g>
  );
}

function renderKawaiiTurtle(gradientId: string, palette: typeof KAWAII_PALETTES.grassland, animated: boolean): JSX.Element {
  return (
    <g>
      <ellipse cx="50" cy="60" rx="32" ry="24" fill={palette.accent} stroke={palette.outline} strokeWidth="2" />
      <ellipse cx="50" cy="55" rx="24" ry="16" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="1.5" />
      
      <path d="M 35 55 L 50 45 L 65 55 L 58 65 L 42 65 Z" fill={palette.body} stroke={palette.outline} strokeWidth="1" />
      <line x1="50" y1="45" x2="50" y2="65" stroke={palette.outline} strokeWidth="0.5" />
      <line x1="35" y1="55" x2="58" y2="65" stroke={palette.outline} strokeWidth="0.5" />
      <line x1="65" y1="55" x2="42" y2="65" stroke={palette.outline} strokeWidth="0.5" />
      
      <ellipse cx="25" cy="45" rx="10" ry="8" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="1.5" />
      
      <ellipse cx="20" cy="43" rx="4" ry="5" fill="white" />
      <ellipse cx="21" cy="44" rx="2.5" ry="3" fill="#2C1810" />
      <ellipse cx="22" cy="42" rx="1" ry="1.5" fill="white" />
      
      <ellipse cx="17" cy="48" rx="2" ry="1.5" fill={palette.cheeks} opacity="0.6" />
      
      <ellipse cx="22" cy="75" rx="6" ry="4" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="1" />
      <ellipse cx="78" cy="75" rx="6" ry="4" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="1" />
      <ellipse cx="30" cy="80" rx="5" ry="3" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="1" />
      <ellipse cx="70" cy="80" rx="5" ry="3" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="1" />
      
      <ellipse cx="80" cy="60" rx="6" ry="4" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="1" />
      
      {animated && (
        <animateTransform attributeName="transform" type="translate" values="0 0;2 0;0 0" dur="3s" repeatCount="indefinite" />
      )}
    </g>
  );
}

function renderKawaiiCrab(gradientId: string, palette: typeof KAWAII_PALETTES.grassland, animated: boolean): JSX.Element {
  return (
    <g>
      <ellipse cx="50" cy="55" rx="30" ry="22" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="2" />
      <ellipse cx="50" cy="48" rx="20" ry="12" fill={palette.bodyLight} opacity="0.5" />
      
      <g transform="translate(15, 35)">
        <ellipse cx="0" cy="0" rx="8" ry="6" fill={palette.body} stroke={palette.outline} strokeWidth="1.5" />
        <path d="M -8 -3 Q -15 -8 -12 0 Q -15 8 -8 3" fill={palette.body} stroke={palette.outline} strokeWidth="1.5" />
      </g>
      <g transform="translate(85, 35)">
        <ellipse cx="0" cy="0" rx="8" ry="6" fill={palette.body} stroke={palette.outline} strokeWidth="1.5" />
        <path d="M 8 -3 Q 15 -8 12 0 Q 15 8 8 3" fill={palette.body} stroke={palette.outline} strokeWidth="1.5" />
      </g>
      
      <line x1="38" y1="35" x2="35" y2="22" stroke={palette.outline} strokeWidth="2" />
      <line x1="62" y1="35" x2="65" y2="22" stroke={palette.outline} strokeWidth="2" />
      <circle cx="35" cy="20" r="4" fill={palette.accent} />
      <circle cx="65" cy="20" r="4" fill={palette.accent} />
      
      <ellipse cx="40" cy="50" rx="6" ry="7" fill="white" />
      <ellipse cx="60" cy="50" rx="6" ry="7" fill="white" />
      <ellipse cx="42" cy="51" rx="4" ry="5" fill="#2C1810" />
      <ellipse cx="62" cy="51" rx="4" ry="5" fill="#2C1810" />
      <ellipse cx="43" cy="49" rx="1.5" ry="2" fill="white" />
      <ellipse cx="63" cy="49" rx="1.5" ry="2" fill="white" />
      
      <ellipse cx="30" cy="58" rx="5" ry="3" fill={palette.cheeks} opacity="0.6" />
      <ellipse cx="70" cy="58" rx="5" ry="3" fill={palette.cheeks} opacity="0.6" />
      
      <path d="M 45 65 Q 50 70 55 65" fill="none" stroke="#2C1810" strokeWidth="1.5" strokeLinecap="round" />
      
      {animated && (
        <animateTransform attributeName="transform" type="translate" values="-1 0;1 0;-1 0" dur="0.5s" repeatCount="indefinite" />
      )}
    </g>
  );
}

function renderKawaiiBird(gradientId: string, palette: typeof KAWAII_PALETTES.grassland, animated: boolean): JSX.Element {
  return (
    <g>
      <ellipse cx="50" cy="55" rx="24" ry="22" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="2" />
      <ellipse cx="50" cy="48" rx="16" ry="12" fill={palette.bodyLight} opacity="0.5" />
      
      <path d="M 26 50 Q 10 45 15 55 Q 8 60 20 58 Q 22 55 26 55" fill={palette.accent} stroke={palette.outline} strokeWidth="1.5" />
      <path d="M 74 50 Q 90 45 85 55 Q 92 60 80 58 Q 78 55 74 55" fill={palette.accent} stroke={palette.outline} strokeWidth="1.5" />
      
      <ellipse cx="40" cy="50" rx="6" ry="7" fill="white" />
      <ellipse cx="60" cy="50" rx="6" ry="7" fill="white" />
      <ellipse cx="42" cy="51" rx="4" ry="5" fill="#2C1810" />
      <ellipse cx="62" cy="51" rx="4" ry="5" fill="#2C1810" />
      <ellipse cx="43" cy="49" rx="1.5" ry="2" fill="white" />
      <ellipse cx="63" cy="49" rx="1.5" ry="2" fill="white" />
      
      <path d="M 50 60 L 45 68 L 55 68 Z" fill={palette.accent} stroke={palette.outline} strokeWidth="1" />
      
      <ellipse cx="32" cy="58" rx="4" ry="3" fill={palette.cheeks} opacity="0.6" />
      <ellipse cx="68" cy="58" rx="4" ry="3" fill={palette.cheeks} opacity="0.6" />
      
      <path d="M 45 35 Q 50 25 55 35" fill={palette.accent} stroke={palette.outline} strokeWidth="1" />
      
      {animated && (
        <animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur="1s" repeatCount="indefinite" />
      )}
    </g>
  );
}

function renderKawaiiCat(gradientId: string, palette: typeof KAWAII_PALETTES.grassland, animated: boolean): JSX.Element {
  return (
    <g>
      <path d="M 30 40 L 22 15 L 38 35" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="1.5" />
      <path d="M 70 40 L 78 15 L 62 35" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="1.5" />
      <path d="M 28 38 L 24 20 L 36 35" fill={palette.bodyLight} />
      <path d="M 72 38 L 76 20 L 64 35" fill={palette.bodyLight} />
      
      <ellipse cx="50" cy="55" rx="26" ry="24" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="2" />
      <ellipse cx="50" cy="48" rx="18" ry="14" fill={palette.bodyLight} opacity="0.5" />
      
      <ellipse cx="38" cy="52" rx="7" ry="8" fill="white" />
      <ellipse cx="62" cy="52" rx="7" ry="8" fill="white" />
      <ellipse cx="40" cy="53" rx="4" ry="5" fill="#2C1810" />
      <ellipse cx="64" cy="53" rx="4" ry="5" fill="#2C1810" />
      <ellipse cx="41" cy="51" rx="1.5" ry="2" fill="white" />
      <ellipse cx="65" cy="51" rx="1.5" ry="2" fill="white" />
      
      <ellipse cx="50" cy="62" rx="3" ry="2" fill={palette.cheeks} />
      
      <line x1="22" y1="58" x2="35" y2="60" stroke={palette.outline} strokeWidth="0.8" />
      <line x1="22" y1="62" x2="35" y2="62" stroke={palette.outline} strokeWidth="0.8" />
      <line x1="22" y1="66" x2="35" y2="64" stroke={palette.outline} strokeWidth="0.8" />
      <line x1="78" y1="58" x2="65" y2="60" stroke={palette.outline} strokeWidth="0.8" />
      <line x1="78" y1="62" x2="65" y2="62" stroke={palette.outline} strokeWidth="0.8" />
      <line x1="78" y1="66" x2="65" y2="64" stroke={palette.outline} strokeWidth="0.8" />
      
      <path d="M 45 68 Q 50 73 55 68" fill="none" stroke="#2C1810" strokeWidth="1.5" strokeLinecap="round" />
      
      <ellipse cx="30" cy="62" rx="5" ry="3" fill={palette.cheeks} opacity="0.6" />
      <ellipse cx="70" cy="62" rx="5" ry="3" fill={palette.cheeks} opacity="0.6" />
      
      {animated && (
        <animateTransform attributeName="transform" type="rotate" values="-1 50 50;1 50 50;-1 50 50" dur="3s" repeatCount="indefinite" />
      )}
    </g>
  );
}

function renderKawaiiDog(gradientId: string, palette: typeof KAWAII_PALETTES.grassland, animated: boolean): JSX.Element {
  return (
    <g>
      <ellipse cx="28" cy="35" rx="12" ry="16" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="1.5" transform="rotate(-20 28 35)" />
      <ellipse cx="72" cy="35" rx="12" ry="16" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="1.5" transform="rotate(20 72 35)" />
      
      <ellipse cx="50" cy="55" rx="28" ry="26" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="2" />
      <ellipse cx="50" cy="48" rx="20" ry="16" fill={palette.bodyLight} opacity="0.5" />
      
      <ellipse cx="38" cy="52" rx="7" ry="8" fill="white" />
      <ellipse cx="62" cy="52" rx="7" ry="8" fill="white" />
      <ellipse cx="40" cy="53" rx="4" ry="5" fill="#2C1810" />
      <ellipse cx="64" cy="53" rx="4" ry="5" fill="#2C1810" />
      <ellipse cx="41" cy="51" rx="1.5" ry="2" fill="white" />
      <ellipse cx="65" cy="51" rx="1.5" ry="2" fill="white" />
      
      <ellipse cx="50" cy="65" rx="8" ry="6" fill={palette.bodyLight} stroke={palette.outline} strokeWidth="1" />
      <ellipse cx="50" cy="63" rx="4" ry="3" fill="#2C1810" />
      
      <path d="M 50 69 L 50 74" stroke="#2C1810" strokeWidth="1.5" />
      <path d="M 44 76 Q 50 80 56 76" fill="none" stroke="#2C1810" strokeWidth="1.5" strokeLinecap="round" />
      
      <ellipse cx="30" cy="62" rx="5" ry="3" fill={palette.cheeks} opacity="0.6" />
      <ellipse cx="70" cy="62" rx="5" ry="3" fill={palette.cheeks} opacity="0.6" />
      
      {animated && (
        <>
          <animateTransform attributeName="transform" type="rotate" values="-2 50 50;2 50 50;-2 50 50" dur="0.5s" repeatCount="indefinite" />
        </>
      )}
    </g>
  );
}

function renderKawaiiDragon(gradientId: string, palette: typeof KAWAII_PALETTES.grassland, animated: boolean): JSX.Element {
  return (
    <g>
      <ellipse cx="50" cy="55" rx="26" ry="24" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="2" />
      <ellipse cx="50" cy="48" rx="18" ry="14" fill={palette.bodyLight} opacity="0.5" />
      
      <path d="M 30 38 L 20 20 L 35 35" fill={palette.accent} stroke={palette.outline} strokeWidth="1.5" />
      <path d="M 70 38 L 80 20 L 65 35" fill={palette.accent} stroke={palette.outline} strokeWidth="1.5" />
      <path d="M 40 32 L 35 15 L 48 30" fill={palette.accent} stroke={palette.outline} strokeWidth="1" />
      <path d="M 60 32 L 65 15 L 52 30" fill={palette.accent} stroke={palette.outline} strokeWidth="1" />
      
      <path d="M 26 50 Q 8 40 12 55 Q 5 58 15 60 Q 20 55 26 55" fill={palette.body} stroke={palette.outline} strokeWidth="1.5" />
      <path d="M 74 50 Q 92 40 88 55 Q 95 58 85 60 Q 80 55 74 55" fill={palette.body} stroke={palette.outline} strokeWidth="1.5" />
      
      <ellipse cx="38" cy="50" rx="7" ry="8" fill="white" />
      <ellipse cx="62" cy="50" rx="7" ry="8" fill="white" />
      <ellipse cx="40" cy="51" rx="4" ry="5" fill="#2C1810" />
      <ellipse cx="64" cy="51" rx="4" ry="5" fill="#2C1810" />
      <ellipse cx="41" cy="49" rx="1.5" ry="2" fill="white" />
      <ellipse cx="65" cy="49" rx="1.5" ry="2" fill="white" />
      
      <ellipse cx="45" cy="62" rx="3" ry="2" fill="#2C1810" />
      <ellipse cx="55" cy="62" rx="3" ry="2" fill="#2C1810" />
      
      <path d="M 46 70 Q 50 74 54 70" fill="none" stroke="#2C1810" strokeWidth="1.5" strokeLinecap="round" />
      
      <ellipse cx="30" cy="60" rx="5" ry="3" fill={palette.cheeks} opacity="0.6" />
      <ellipse cx="70" cy="60" rx="5" ry="3" fill={palette.cheeks} opacity="0.6" />
      
      {animated && (
        <animateTransform attributeName="transform" type="scale" values="1;1.02;1" dur="2s" repeatCount="indefinite" />
      )}
    </g>
  );
}

function renderKawaiiFish(gradientId: string, palette: typeof KAWAII_PALETTES.grassland, animated: boolean): JSX.Element {
  return (
    <g>
      <ellipse cx="50" cy="50" rx="30" ry="20" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="2" />
      <ellipse cx="45" cy="45" rx="18" ry="12" fill={palette.bodyLight} opacity="0.5" />
      
      <path d="M 80 50 L 95 35 L 95 65 Z" fill={palette.accent} stroke={palette.outline} strokeWidth="1.5" />
      
      <path d="M 50 30 Q 55 20 60 30" fill={palette.accent} stroke={palette.outline} strokeWidth="1" />
      
      <ellipse cx="35" cy="48" rx="6" ry="7" fill="white" />
      <ellipse cx="37" cy="49" rx="4" ry="5" fill="#2C1810" />
      <ellipse cx="38" cy="47" rx="1.5" ry="2" fill="white" />
      
      <ellipse cx="25" cy="55" rx="4" ry="3" fill={palette.cheeks} opacity="0.6" />
      
      <path d="M 40 58 Q 45 62 50 58" fill="none" stroke="#2C1810" strokeWidth="1.5" strokeLinecap="round" />
      
      {animated && (
        <animateTransform attributeName="transform" type="translate" values="-2 0;2 0;-2 0" dur="1s" repeatCount="indefinite" />
      )}
    </g>
  );
}

function renderKawaiiSlime(gradientId: string, palette: typeof KAWAII_PALETTES.grassland, animated: boolean): JSX.Element {
  return (
    <g>
      <ellipse cx="50" cy="60" rx="32" ry="25" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="2" />
      <ellipse cx="50" cy="50" rx="24" ry="18" fill={palette.bodyLight} opacity="0.5" />
      
      <path d="M 25 45 Q 20 35 28 42" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="1" />
      <path d="M 75 45 Q 80 35 72 42" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="1" />
      <path d="M 50 35 Q 50 25 55 33" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="1" />
      
      <ellipse cx="38" cy="55" rx="8" ry="9" fill="white" />
      <ellipse cx="62" cy="55" rx="8" ry="9" fill="white" />
      <ellipse cx="40" cy="56" rx="5" ry="6" fill="#2C1810" />
      <ellipse cx="64" cy="56" rx="5" ry="6" fill="#2C1810" />
      <ellipse cx="42" cy="54" rx="2" ry="2.5" fill="white" />
      <ellipse cx="66" cy="54" rx="2" ry="2.5" fill="white" />
      
      <path d="M 45 70 Q 50 75 55 70" fill="none" stroke="#2C1810" strokeWidth="2" strokeLinecap="round" />
      
      <ellipse cx="28" cy="62" rx="5" ry="3" fill={palette.cheeks} opacity="0.6" />
      <ellipse cx="72" cy="62" rx="5" ry="3" fill={palette.cheeks} opacity="0.6" />
      
      {animated && (
        <animateTransform attributeName="transform" type="scale" values="1 1;1.05 0.95;1 1" dur="1.5s" repeatCount="indefinite" />
      )}
    </g>
  );
}

function renderKawaiiDefault(gradientId: string, palette: typeof KAWAII_PALETTES.grassland, animated: boolean, creature: Creature): JSX.Element {
  const hash = creature.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  const hasEars = hash % 3 === 0;
  const hasTail = hash % 2 === 0;
  
  return (
    <g>
      {hasEars && (
        <>
          <ellipse cx="32" cy="28" rx="8" ry="12" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="1.5" />
          <ellipse cx="68" cy="28" rx="8" ry="12" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="1.5" />
          <ellipse cx="32" cy="26" rx="4" ry="8" fill={palette.bodyLight} />
          <ellipse cx="68" cy="26" rx="4" ry="8" fill={palette.bodyLight} />
        </>
      )}
      
      <ellipse cx="50" cy="55" rx="28" ry="26" fill={`url(#${gradientId})`} stroke={palette.outline} strokeWidth="2" />
      <ellipse cx="50" cy="48" rx="20" ry="16" fill={palette.bodyLight} opacity="0.5" />
      
      {hasTail && (
        <path d="M 78 55 Q 92 50 88 60 Q 95 65 85 62" fill={palette.body} stroke={palette.outline} strokeWidth="1.5" />
      )}
      
      <ellipse cx="38" cy="52" rx="7" ry="8" fill="white" />
      <ellipse cx="62" cy="52" rx="7" ry="8" fill="white" />
      <ellipse cx="40" cy="53" rx="4" ry="5" fill="#2C1810" />
      <ellipse cx="64" cy="53" rx="4" ry="5" fill="#2C1810" />
      <ellipse cx="41" cy="51" rx="1.5" ry="2" fill="white" />
      <ellipse cx="65" cy="51" rx="1.5" ry="2" fill="white" />
      
      <path d="M 45 68 Q 50 73 55 68" fill="none" stroke="#2C1810" strokeWidth="1.5" strokeLinecap="round" />
      
      <ellipse cx="30" cy="60" rx="5" ry="3" fill={palette.cheeks} opacity="0.6" />
      <ellipse cx="70" cy="60" rx="5" ry="3" fill={palette.cheeks} opacity="0.6" />
      
      {animated && (
        <animateTransform attributeName="transform" type="rotate" values="-2 50 50;2 50 50;-2 50 50" dur="2s" repeatCount="indefinite" />
      )}
    </g>
  );
}
