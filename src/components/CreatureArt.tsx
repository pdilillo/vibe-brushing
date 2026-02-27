import { useState } from 'react';
import type { Creature } from '../types';

interface CreatureArtProps {
  creature: Creature;
  size?: number;
  showGunk?: boolean;
  gunkLevel?: number;
  animated?: boolean;
  className?: string;
}

interface SpritesheetConfig {
  frames: number;
  cols: number;
  rows: number;
  frameWidth: number;
  frameHeight: number;
  animationDuration: number;
}

const SPRITESHEET_CREATURES: Record<string, SpritesheetConfig> = {
  // No creatures currently use sprite sheet animation
};

const AVAILABLE_CREATURES = [
  // ==================== SERIES 1 ====================
  // Grassland - Common
  'gear-bunny',
  'mecha-moth',
  'vine-droid',
  'robo-squirrel',
  'buzzer-bee',
  'pixel-fawn',
  'sprocket-snail',
  'flutter-bot',
  // Grassland - Rare
  'thunder-stag',
  'bloom-guardian',
  'prism-fox',
  'echo-owl',
  // Grassland - Legendary
  'natura-prime',
  'leaf-kong',
  
  // Coastal - Common
  'turbo-turtle',
  'crank-crab',
  'wave-bot',
  'pearl-pup',
  'coral-crawler',
  'shell-shock',
  'foam-flounder',
  'anchor-pony',
  // Coastal - Rare
  'storm-ray',
  'kraken-kit',
  'siren-synth',
  'tide-titan',
  // Coastal - Legendary
  'ocean-emperor',
  
  // Lava - Common
  'magma-core',
  'pyro-gecko',
  'ember-mech',
  'forge-hound',
  'cinder-snake',
  'slag-slime',
  'coal-critter',
  'blast-bat',
  // Lava - Rare
  'volcano-drake',
  'obsidian-knight',
  'inferno-djinn',
  'molten-mammoth',
  // Lava - Legendary
  'infernal-titan',
  
  // City - Common
  'neon-rat',
  'holo-hound',
  'glitch-cat',
  'drone-pigeon',
  'trash-panda-bot',
  'pixel-roach',
  'subway-worm',
  'vending-mimic',
  // City - Rare
  'cyber-sphinx',
  'neon-dragon',
  'billboard-beast',
  'data-phantom',
  // City - Legendary
  'metro-mind',
  
  // Sky - Common
  'propeller-pup',
  'cloud-crawler',
  'zephyr-bunny',
  'nimbus-kitten',
  'glider-squirrel',
  'breeze-bird',
  'balloon-jellyfish',
  'kite-ray',
  // Sky - Rare
  'thunder-hawk',
  'aurora-serpent',
  'star-whale',
  'wind-djinn',
  // Sky - Legendary
  'celestial-phoenix',
  
  // ==================== SERIES 2 - Grassland ====================
  // Common
  's2-moss-mole',
  's2-crystal-caterpillar',
  's2-hedge-hog',
  's2-pollen-bot',
  's2-grass-slime',
  's2-acorn-knight',
  's2-daisy-drone',
  's2-cricket-bot',
  // Rare
  's2-emerald-elk',
  's2-mushroom-giant',
  's2-willow-wisp',
  's2-mega-slime',
  // Legendary
  's2-crystal-guardian',
  's2-nature-computer',
  
  // ==================== SERIES 3 - Grassland ====================
  // Common
  's3-phantom-rabbit',
  's3-dino-beetle',
  's3-ghost-flower',
  's3-mini-raptor',
  's3-wisp-bug',
  's3-fossil-frog',
  's3-shade-snake',
  's3-dino-chick',
  // Rare
  's3-phantom-stag',
  's3-tricerabot',
  's3-ghost-treant',
  's3-stego-tank',
  // Legendary
  's3-spirit-king',
  's3-brachiobot',
  
  // ==================== SERIES 2 - Coastal ====================
  // Common
  's2-sand-dollar-bot',
  's2-crystal-urchin',
  's2-bubble-blob',
  's2-starfish-drone',
  's2-barnacle-cluster',
  's2-kelp-dancer',
  's2-puffer-tank',
  's2-anemone-bot',
  // Rare
  's2-pearl-dragon',
  's2-giant-clam',
  's2-coral-golem',
  's2-crystal-shark',
  // Legendary
  's2-deep-crystal',
  
  // ==================== SERIES 3 - Coastal ====================
  // Common
  's3-ghost-fish',
  's3-ammonite-bot',
  's3-phantom-crab',
  's3-dunkle-pup',
  's3-wraith-jellyfish',
  's3-sea-scorpion',
  's3-ghost-eel',
  's3-nautilus-bot',
  // Rare
  's3-phantom-kraken',
  's3-mega-shark',
  's3-ship-ghost',
  's3-plesio-sub',
  // Legendary
  's3-sea-phantom',
  
  // ==================== SERIES 2 - Lava ====================
  's2-ember-sprite',
  's2-ruby-beetle',
  's2-lava-slime',
  's2-smoke-puff',
  's2-fire-ant',
  's2-sulfur-frog',
  's2-obsidian-crab',
  's2-spark-lizard',
  
  // ==================== SERIES 3 - Lava ====================
  // Common
  's3-solar-wisp',
  's3-basalt-golem',
  's3-lava-slug',
  's3-vent-worm',
  's3-flame-moth',
  's3-boiling-blob',
  's3-glass-shard',
  // Rare
  's3-volcano-phantom',
  's3-rex-supreme',
  's3-phoenix-ghost',
  's3-allo-hunter',
  // Legendary
  's3-inferno-lord',
  
  // ==================== SERIES 2 - City ====================
  's2-wifi-wisp',
  's2-graffiti-blob',
  's2-pipe-critter',
  's2-alley-cat',
  's2-meter-mite',
  's2-cable-snake',
  's2-vent-crawler',
  's2-hydrant-hound',
  
  // ==================== SERIES 3 - City ====================
  // Common
  's3-arcade-ghost',
  's3-concrete-fossil',
  's3-neon-phantom',
  's3-steam-bot',
  's3-holo-owl',
  's3-sonar-bat',
  's3-power-grid',
  's3-error-sprite',
  // Rare
  's3-train-phantom',
  's3-carno-cop',
  's3-theater-ghost',
  's3-urban-raptor',
  // Legendary
  's3-city-specter',
  
  // ==================== SERIES 2 - Sky ====================
  's2-breeze-sprite',
  's2-cloud-puff',
  's2-thunder-bird',
  's2-balloon-bug',
  's2-contrail-cat',
  's2-mist-sprite',
  's2-thermal-rider',
  's2-snowflake-sprite',
  
  // ==================== SERIES 3 - Sky ====================
  // Common
  's3-aurora-wisp',
  's3-moon-moth',
  's3-strato-sphinx',
  's3-jet-rider',
  's3-cosmic-dust',
  's3-rainbow-owl',
  's3-hail-hopper',
  's3-sky-whale',
  // Rare
  's3-moon-phantom',
  's3-quetz-carrier',
  's3-comet-specter',
  's3-ptero-titan',
  // Legendary
  's3-sky-spirit',
  
  // ==================== MYTHIC ====================
  'binsters-claymars',
];

const POSSESSED_VARIANTS = [
  'gear-bunny',
  'mecha-moth',
  'turbo-turtle',
  'crank-crab',
  'pyro-gecko',
  'slag-slime',
  'glitch-cat',
  'neon-rat',
  'propeller-pup',
  'nimbus-kitten',
];

export function CreatureArt({ 
  creature, 
  size = 200, 
  showGunk = false, 
  gunkLevel = 0, 
  animated = true,
  className = '' 
}: CreatureArtProps) {
  const [imageError, setImageError] = useState(false);
  const [possessedImageError, setPossessedImageError] = useState(false);
  const hasRasterImage = AVAILABLE_CREATURES.includes(creature.id) && !imageError;
  const hasPossessedImage = POSSESSED_VARIANTS.includes(creature.id) && !possessedImageError;
  const hasSpritesheet = creature.id in SPRITESHEET_CREATURES;
  
  const isFullyPossessed = showGunk && gunkLevel >= 90 && hasPossessedImage;
  
  const isMythic = creature.rarity === 'mythic';
  const isLegendary = creature.rarity === 'legendary';
  const isRare = creature.rarity === 'rare';
  
  const glowAmount = isMythic ? 30 : isLegendary ? 20 : isRare ? 10 : 0;
  const glowColor = isMythic ? '#F97316' : isLegendary ? '#FFD700' : '#60A5FA';
  
  const cleanProgress = showGunk ? Math.max(0, 100 - gunkLevel) / 100 : 1;
  const gunkOpacity = showGunk && !isFullyPossessed ? Math.min(0.8, gunkLevel / 100) : 0;
  const greenTintAmount = showGunk && !isFullyPossessed ? Math.min(100, gunkLevel * 1.5) : 0;
  const redEyeOpacity = showGunk && !isFullyPossessed ? Math.max(0, (gunkLevel - 40) / 60) : 0;
  
  const containerStyle: React.CSSProperties = {
    width: size,
    height: size,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  
  const imageWrapperStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    filter: glowAmount > 0 && cleanProgress > 0.5 
      ? `drop-shadow(0 0 ${glowAmount * cleanProgress}px ${glowColor})` 
      : undefined,
    transition: 'filter 0.3s ease',
  };
  
  const imageStyle: React.CSSProperties = {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
    filter: greenTintAmount > 0 
      ? `hue-rotate(${greenTintAmount}deg) saturate(${1 + greenTintAmount / 100}) brightness(${1 - greenTintAmount / 300})`
      : undefined,
    transition: 'filter 0.3s ease',
  };
  
  const gunkOverlayStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url(${import.meta.env.BASE_URL}creatures/gunk-overlay.png)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center top',
    opacity: gunkOpacity,
    pointerEvents: 'none',
    mixBlendMode: 'multiply',
    transition: 'opacity 0.3s ease',
  };
  
  const redEyesStyle: React.CSSProperties = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '60%',
    height: '20%',
    background: 'radial-gradient(ellipse at 35% 50%, rgba(255,0,0,0.8) 0%, transparent 40%), radial-gradient(ellipse at 65% 50%, rgba(255,0,0,0.8) 0%, transparent 40%)',
    opacity: redEyeOpacity,
    pointerEvents: 'none',
    filter: 'blur(2px)',
    transition: 'opacity 0.3s ease',
  };

  if (hasRasterImage) {
    const possessedImageStyle: React.CSSProperties = {
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'contain',
      filter: 'drop-shadow(0 0 15px rgba(0, 255, 0, 0.5)) drop-shadow(0 0 30px rgba(255, 0, 0, 0.3))',
    };
    
    if (isFullyPossessed) {
      return (
        <div style={containerStyle} className={className}>
          <div 
            style={{
              ...imageWrapperStyle,
              filter: 'drop-shadow(0 0 20px rgba(0, 100, 0, 0.8))',
            }}
            className={animated ? 'animate-creature-idle' : ''}
          >
            <img
              src={`${import.meta.env.BASE_URL}creatures/${creature.id}-possessed.png`}
              alt={`${creature.name} (Possessed)`}
              style={possessedImageStyle}
              onError={() => setPossessedImageError(true)}
            />
          </div>
        </div>
      );
    }
    
    if (hasSpritesheet) {
      const spriteConfig = SPRITESHEET_CREATURES[creature.id];
      const frameAspectRatio = spriteConfig.frameWidth / spriteConfig.frameHeight;
      
      let displayWidth: number;
      let displayHeight: number;
      
      if (frameAspectRatio >= 1) {
        displayWidth = size;
        displayHeight = size / frameAspectRatio;
      } else {
        displayHeight = size;
        displayWidth = size * frameAspectRatio;
      }
      
      const spriteContainerStyle: React.CSSProperties = {
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      };
      
      const animationName = `spritesheet-grid-${spriteConfig.cols}x${spriteConfig.rows}`;
      
      const spriteStyle: React.CSSProperties = {
        width: displayWidth,
        height: displayHeight,
        backgroundImage: `url(${import.meta.env.BASE_URL}creatures/${creature.id}-spritesheet.png)`,
        backgroundSize: `${spriteConfig.cols * 100}% ${spriteConfig.rows * 100}%`,
        backgroundPosition: '0% 0%',
        backgroundRepeat: 'no-repeat',
        filter: greenTintAmount > 0 
          ? `hue-rotate(${greenTintAmount}deg) saturate(${1 + greenTintAmount / 100}) brightness(${1 - greenTintAmount / 300})`
          : undefined,
        animation: animated 
          ? `${animationName} ${spriteConfig.animationDuration}s linear infinite`
          : undefined,
      };
      
      return (
        <div style={containerStyle} className={className}>
          <div style={imageWrapperStyle}>
            <div style={spriteContainerStyle}>
              <div style={spriteStyle} aria-label={creature.name} />
            </div>
          </div>
          
          {showGunk && gunkLevel > 0 && (
            <>
              <div style={gunkOverlayStyle} className="animate-gunk-drip" />
              {redEyeOpacity > 0 && (
                <div style={redEyesStyle} className="animate-pulse-glow" />
              )}
            </>
          )}
        </div>
      );
    }
    
    return (
      <div style={containerStyle} className={className}>
        <div 
          style={imageWrapperStyle}
          className={animated ? 'animate-creature-idle' : ''}
        >
          <img
            src={`${import.meta.env.BASE_URL}creatures/${creature.id}.png`}
            alt={creature.name}
            style={imageStyle}
            onError={() => setImageError(true)}
          />
        </div>
        
        {showGunk && gunkLevel > 0 && (
          <>
            <div style={gunkOverlayStyle} className={animated ? 'animate-gunk-drip' : ''} />
            {redEyeOpacity > 0 && (
              <div style={redEyesStyle} className={animated ? 'animate-pulse-glow' : ''} />
            )}
          </>
        )}
      </div>
    );
  }
  
  return (
    <div style={containerStyle} className={className}>
      <FallbackCreatureArt 
        creature={creature} 
        size={size} 
        animated={animated}
        cleanProgress={cleanProgress}
        gunkOpacity={gunkOpacity}
        redEyeOpacity={redEyeOpacity}
        glowAmount={glowAmount}
        glowColor={glowColor}
      />
    </div>
  );
}

interface FallbackProps {
  creature: Creature;
  size: number;
  animated: boolean;
  cleanProgress: number;
  gunkOpacity: number;
  redEyeOpacity: number;
  glowAmount: number;
  glowColor: string;
}

function FallbackCreatureArt({ 
  creature, 
  size, 
  animated, 
  cleanProgress,
  gunkOpacity,
  redEyeOpacity,
  glowAmount,
  glowColor
}: FallbackProps) {
  const regionColors: Record<string, { primary: string; secondary: string; accent: string }> = {
    grassland: { primary: '#7FD858', secondary: '#FFB6C1', accent: '#FFD700' },
    coastal: { primary: '#4FC3F7', secondary: '#FFE082', accent: '#FF7043' },
    lava: { primary: '#FF7043', secondary: '#FFD54F', accent: '#F44336' },
    city: { primary: '#BA68C8', secondary: '#64B5F6', accent: '#FF4081' },
    sky: { primary: '#81D4FA', secondary: '#FFF59D', accent: '#FFFFFF' },
    all: { primary: '#F97316', secondary: '#FBBF24', accent: '#EF4444' },
  };
  
  const colors = regionColors[creature.region] || regionColors.grassland;
  const isLegendary = creature.rarity === 'legendary';
  
  return (
    <svg 
      viewBox="0 0 100 100"
      width={size} 
      height={size}
      style={{ 
        filter: glowAmount > 0 && cleanProgress > 0.5 
          ? `drop-shadow(0 0 ${glowAmount * cleanProgress}px ${glowColor})` 
          : undefined,
      }}
      className={animated ? 'animate-creature-idle' : ''}
    >
      <defs>
        <linearGradient id={`fallback-body-${creature.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={colors.primary} stopOpacity="1" />
          <stop offset="100%" stopColor={colors.primary} stopOpacity="0.7" />
        </linearGradient>
        <radialGradient id={`fallback-highlight-${creature.id}`} cx="30%" cy="30%" r="60%">
          <stop offset="0%" stopColor="white" stopOpacity="0.6" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Body */}
      <ellipse 
        cx="50" cy="55" rx={isLegendary ? 35 : 28} ry={isLegendary ? 32 : 26} 
        fill={`url(#fallback-body-${creature.id})`} 
        stroke={colors.accent} 
        strokeWidth="2" 
      />
      <ellipse 
        cx="50" cy="55" rx={isLegendary ? 35 : 28} ry={isLegendary ? 32 : 26} 
        fill={`url(#fallback-highlight-${creature.id})`} 
      />
      
      {/* Face */}
      <ellipse cx="40" cy="50" rx="6" ry="7" fill="white" stroke="#333" strokeWidth="0.5" />
      <ellipse cx="60" cy="50" rx="6" ry="7" fill="white" stroke="#333" strokeWidth="0.5" />
      <ellipse cx="42" cy="51" rx="3" ry="4" fill="#1A1A1A" />
      <ellipse cx="62" cy="51" rx="3" ry="4" fill="#1A1A1A" />
      <ellipse cx="43" cy="49" rx="1.2" ry="1.5" fill="white" />
      <ellipse cx="63" cy="49" rx="1.2" ry="1.5" fill="white" />
      
      {/* Smile */}
      <path d="M 44 65 Q 50 70 56 65" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
      
      {/* Cheeks */}
      <ellipse cx="32" cy="58" rx="5" ry="3" fill={colors.secondary} opacity="0.6" />
      <ellipse cx="68" cy="58" rx="5" ry="3" fill={colors.secondary} opacity="0.6" />
      
      {/* Ears/features based on type */}
      {creature.monsterType.includes('bunny') || creature.monsterType.includes('rabbit') ? (
        <>
          <ellipse cx="35" cy="25" rx="6" ry="18" fill={`url(#fallback-body-${creature.id})`} stroke={colors.accent} strokeWidth="1" />
          <ellipse cx="65" cy="25" rx="6" ry="18" fill={`url(#fallback-body-${creature.id})`} stroke={colors.accent} strokeWidth="1" />
        </>
      ) : creature.monsterType.includes('cat') || creature.monsterType.includes('kitten') ? (
        <>
          <path d="M 30 40 L 25 20 L 40 35" fill={`url(#fallback-body-${creature.id})`} stroke={colors.accent} strokeWidth="1" />
          <path d="M 70 40 L 75 20 L 60 35" fill={`url(#fallback-body-${creature.id})`} stroke={colors.accent} strokeWidth="1" />
        </>
      ) : creature.monsterType.includes('dog') || creature.monsterType.includes('pup') ? (
        <>
          <ellipse cx="28" cy="42" rx="8" ry="14" fill={`url(#fallback-body-${creature.id})`} stroke={colors.accent} strokeWidth="1" transform="rotate(-15 28 42)" />
          <ellipse cx="72" cy="42" rx="8" ry="14" fill={`url(#fallback-body-${creature.id})`} stroke={colors.accent} strokeWidth="1" transform="rotate(15 72 42)" />
        </>
      ) : isLegendary ? (
        <>
          <path d="M 35 30 L 25 10 L 40 25" fill={colors.accent} stroke="#333" strokeWidth="1" />
          <path d="M 65 30 L 75 10 L 60 25" fill={colors.accent} stroke="#333" strokeWidth="1" />
          <path d="M 50 28 L 50 8" stroke={colors.accent} strokeWidth="3" strokeLinecap="round" />
        </>
      ) : null}
      
      {/* Crown for legendary */}
      {isLegendary && (
        <g>
          <path d="M 35 18 L 35 5 L 42 12 L 50 0 L 58 12 L 65 5 L 65 18" fill="#FFD700" stroke="#B8860B" strokeWidth="1" />
        </g>
      )}
      
      {/* Gunk overlay */}
      {gunkOpacity > 0 && (
        <g opacity={gunkOpacity}>
          <ellipse cx="50" cy="50" rx="30" ry="28" fill="#32CD32" opacity="0.5" />
          <path d="M 25 35 Q 30 45 25 55 Q 20 65 30 70" fill="#228B22" opacity="0.6" />
          <path d="M 75 35 Q 70 45 75 55 Q 80 65 70 70" fill="#228B22" opacity="0.6" />
          <circle cx="35" cy="42" r="4" fill="#32CD32" />
          <circle cx="62" cy="65" r="5" fill="#228B22" />
          <circle cx="55" cy="38" r="3" fill="#2E8B2E" />
        </g>
      )}
      
      {/* Red possessed eyes */}
      {redEyeOpacity > 0 && (
        <g opacity={redEyeOpacity}>
          <ellipse cx="40" cy="50" rx="7" ry="8" fill="#FF0000" filter="url(#glow)">
            {animated && <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />}
          </ellipse>
          <ellipse cx="60" cy="50" rx="7" ry="8" fill="#FF0000" filter="url(#glow)">
            {animated && <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" begin="0.2s" />}
          </ellipse>
        </g>
      )}
    </svg>
  );
}
