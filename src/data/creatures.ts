import type { Creature, Region, CreatureSeries } from '../types';
import { SERIES_4_CREATURES } from './series4Creatures';
import { SERIES_5_CREATURES } from './series5Creatures';
import { SERIES_6_CREATURES } from './series6Creatures';

export function getElementType(region: Region | 'all'): string {
  const mapping: Record<Region | 'all', string> = {
    grassland: 'Nature',
    coastal: 'Water',
    lava: 'Fire',
    city: 'Electric',
    sky: 'Air',
    all: 'Cosmic',
  };
  return mapping[region];
}

// ============================================================================
// SERIES 1 - The Original Collection
// ============================================================================

const SERIES_1_CREATURES: Creature[] = [
  // ==================== GRASSLAND CREATURES ====================
  // Common (8)
  {
    id: 'gear-bunny',
    name: 'Cogbun',
    region: 'grassland',
    rarity: 'common',
    description: 'A clockwork rabbit that hops with perfectly timed gear movements!',
    robotParts: ['gear-ears', 'spring-legs', 'wind-up-tail'],
    monsterType: 'rabbit',
    height: 35,
    weight: 2.5,
    series: 1,
  },
  {
    id: 'mecha-moth',
    name: 'Solarmoth',
    region: 'grassland',
    rarity: 'common',
    description: 'Solar-powered wings let this moth fly day and night!',
    robotParts: ['solar-wings', 'LED-antennae', 'sensor-eyes'],
    monsterType: 'moth',
    height: 15,
    weight: 0.3,
    series: 1,
  },
  {
    id: 'vine-droid',
    name: 'Circufern',
    region: 'grassland',
    rarity: 'common',
    description: 'A plant monster with circuit-board leaves and fiber-optic vines!',
    robotParts: ['circuit-leaves', 'fiber-vines', 'solar-flower'],
    monsterType: 'plant',
    height: 45,
    weight: 3.2,
    series: 1,
  },
  {
    id: 'robo-squirrel',
    name: 'Nutronaut',
    region: 'grassland',
    rarity: 'common',
    description: 'Stores acorns in its battery compartment for winter energy!',
    robotParts: ['battery-cheeks', 'propeller-tail', 'scanner-eyes'],
    monsterType: 'squirrel',
    height: 25,
    weight: 1.8,
    series: 1,
  },
  {
    id: 'buzzer-bee',
    name: 'Hexabuzz',
    region: 'grassland',
    rarity: 'common',
    description: 'Makes digital honey that tastes like electricity!',
    robotParts: ['helicopter-wings', 'stinger-USB', 'hexagon-body'],
    monsterType: 'bee',
    height: 12,
    weight: 0.4,
    series: 1,
  },
  {
    id: 'pixel-fawn',
    name: 'Emojidoe',
    region: 'grassland',
    rarity: 'common',
    description: 'A young deer with spots that display different emojis!',
    robotParts: ['LED-spots', 'antenna-ears', 'spring-hooves'],
    monsterType: 'deer',
    height: 85,
    weight: 28,
    series: 1,
  },
  {
    id: 'sprocket-snail',
    name: 'Gearshell',
    region: 'grassland',
    rarity: 'common',
    description: 'Slow but steady, leaves a trail of sparkly oil!',
    robotParts: ['gear-shell', 'slime-coolant', 'eye-stalks'],
    monsterType: 'snail',
    height: 18,
    weight: 1.2,
    series: 1,
  },
  {
    id: 'flutter-bot',
    name: 'Chromafly',
    region: 'grassland',
    rarity: 'common',
    description: 'A butterfly with holographic wings that change colors!',
    robotParts: ['holo-wings', 'nectar-scanner', 'micro-jets'],
    monsterType: 'butterfly',
    height: 20,
    weight: 0.5,
    series: 1,
  },
  // Rare (4)
  {
    id: 'thunder-stag',
    name: 'Voltantler',
    region: 'grassland',
    rarity: 'rare',
    description: 'Lightning crackles between its magnificent antenna-antlers!',
    robotParts: ['tesla-antlers', 'chrome-hooves', 'capacitor-heart'],
    monsterType: 'stag',
    height: 180,
    weight: 220,
    series: 1,
  },
  {
    id: 'bloom-guardian',
    name: 'Floratron',
    region: 'grassland',
    rarity: 'rare',
    description: 'A gentle giant that protects the digital forest!',
    robotParts: ['flower-sensors', 'bark-armor', 'root-cables'],
    monsterType: 'treant',
    height: 350,
    weight: 800,
    series: 1,
  },
  {
    id: 'prism-fox',
    name: 'Spectravix',
    region: 'grassland',
    rarity: 'rare',
    description: 'Its rainbow tail can split light into data streams!',
    robotParts: ['prism-tail', 'laser-eyes', 'stealth-paws'],
    monsterType: 'fox',
    height: 65,
    weight: 12,
    series: 1,
  },
  {
    id: 'echo-owl',
    name: 'Sonarhoot',
    region: 'grassland',
    rarity: 'rare',
    description: 'Uses sonar to navigate and sing beautiful digital songs!',
    robotParts: ['radar-dish-face', 'silent-rotors', 'night-vision'],
    monsterType: 'owl',
    height: 55,
    weight: 4.5,
    series: 1,
  },
  // Legendary (2)
  {
    id: 'natura-prime',
    name: 'Seedatron',
    region: 'grassland',
    rarity: 'legendary',
    description: 'The ancient guardian of all grassland creatures, born from the first seed and the first circuit!',
    robotParts: ['world-tree-core', 'season-modulators', 'life-generators'],
    monsterType: 'nature-titan',
    height: 450,
    weight: 1200,
    series: 1,
  },

  // ==================== COASTAL CREATURES ====================
  // Common (8)
  {
    id: 'turbo-turtle',
    name: 'Rocketoise',
    region: 'coastal',
    rarity: 'common',
    description: 'Jet engines on its shell make this turtle surprisingly fast!',
    robotParts: ['jet-shell', 'flipper-props', 'periscope-head'],
    monsterType: 'turtle',
    height: 75,
    weight: 45,
    series: 1,
  },
  {
    id: 'crank-crab',
    name: 'Clawdraulic',
    region: 'coastal',
    rarity: 'common',
    description: 'Hydraulic claws that can crush anything... gently!',
    robotParts: ['hydraulic-claws', 'tank-treads', 'bubble-blaster'],
    monsterType: 'crab',
    height: 30,
    weight: 5.5,
    series: 1,
  },
  {
    id: 'wave-bot',
    name: 'Sonafin',
    region: 'coastal',
    rarity: 'common',
    description: 'A friendly fish with sonar that finds lost treasures!',
    robotParts: ['sonar-array', 'propeller-tail', 'depth-gauge'],
    monsterType: 'fish',
    height: 40,
    weight: 3.8,
    series: 1,
  },
  {
    id: 'pearl-pup',
    name: 'Shimmerseal',
    region: 'coastal',
    rarity: 'common',
    description: 'A seal pup that produces synthetic pearls from its nose!',
    robotParts: ['pearl-maker', 'flipper-jets', 'whisker-sensors'],
    monsterType: 'seal',
    height: 95,
    weight: 38,
    series: 1,
  },
  {
    id: 'coral-crawler',
    name: 'Printopus',
    region: 'coastal',
    rarity: 'common',
    description: 'Helps rebuild reefs with its 3D-printing tentacles!',
    robotParts: ['printer-tentacles', 'mineral-scanner', 'glow-tips'],
    monsterType: 'octopus',
    height: 60,
    weight: 18,
    series: 1,
  },
  {
    id: 'shell-shock',
    name: 'Voltcrab',
    region: 'coastal',
    rarity: 'common',
    description: 'An electric hermit crab in a high-tech shell home!',
    robotParts: ['smart-shell', 'shock-claws', 'wifi-antenna'],
    monsterType: 'hermit-crab',
    height: 22,
    weight: 2.8,
    series: 1,
  },
  {
    id: 'foam-flounder',
    name: 'Hoverflat',
    region: 'coastal',
    rarity: 'common',
    description: 'Flat as a pancake but full of bubbly personality!',
    robotParts: ['hover-fins', 'camo-skin', 'sand-jets'],
    monsterType: 'flounder',
    height: 35,
    weight: 4.2,
    series: 1,
  },
  {
    id: 'anchor-pony',
    name: 'Magnetail',
    region: 'coastal',
    rarity: 'common',
    description: 'A seahorse that can anchor itself in any current!',
    robotParts: ['magnetic-tail', 'stabilizer-fins', 'compass-snout'],
    monsterType: 'seahorse',
    height: 28,
    weight: 1.5,
    series: 1,
  },
  // Rare (4)
  {
    id: 'storm-ray',
    name: 'Voltamanta',
    region: 'coastal',
    rarity: 'rare',
    description: 'Glides through storms and channels lightning through its wings!',
    robotParts: ['wing-capacitors', 'storm-sensors', 'electric-tail'],
    monsterType: 'manta-ray',
    height: 120,
    weight: 85,
    series: 1,
  },
  {
    id: 'kraken-kit',
    name: 'Tentabot',
    region: 'coastal',
    rarity: 'rare',
    description: 'A baby kraken with adorable mechanical tentacles!',
    robotParts: ['grapple-tentacles', 'ink-jets', 'depth-crusher'],
    monsterType: 'kraken',
    height: 200,
    weight: 350,
    series: 1,
  },
  {
    id: 'siren-synth',
    name: 'Melodine',
    region: 'coastal',
    rarity: 'rare',
    description: 'Sings synthesized songs that dolphins love!',
    robotParts: ['voice-modulator', 'scale-LEDs', 'sonic-fins'],
    monsterType: 'mermaid',
    height: 165,
    weight: 55,
    series: 1,
  },
  {
    id: 'tide-titan',
    name: 'Wavezilla',
    region: 'coastal',
    rarity: 'rare',
    description: 'Controls the waves with its hydraulic arms!',
    robotParts: ['wave-generators', 'pressure-suit', 'current-jets'],
    monsterType: 'water-elemental',
    height: 250,
    weight: 420,
    series: 1,
  },
  // Legendary (1)
  {
    id: 'ocean-emperor',
    name: 'Leviatron',
    region: 'coastal',
    rarity: 'legendary',
    description: 'The majestic ruler of all digital seas, part whale, part submarine, all awesome!',
    robotParts: ['sonar-crown', 'reactor-heart', 'tidal-thrusters'],
    monsterType: 'leviathan',
    height: 1500,
    weight: 8500,
    series: 1,
  },

  // ==================== LAVA CREATURES ====================
  // Common (8)
  {
    id: 'magma-core',
    name: 'Molite',
    region: 'lava',
    rarity: 'common',
    description: 'A golem with a nuclear reactor heart that glows orange!',
    robotParts: ['reactor-core', 'heat-vents', 'lava-veins'],
    monsterType: 'golem',
    height: 150,
    weight: 380,
    series: 1,
  },
  {
    id: 'pyro-gecko',
    name: 'Ignecko',
    region: 'lava',
    rarity: 'common',
    description: 'Scurries across lava like it tickles its feet!',
    robotParts: ['heat-pads', 'flame-tongue', 'thermal-tail'],
    monsterType: 'gecko',
    height: 22,
    weight: 0.8,
    series: 1,
  },
  {
    id: 'ember-mech',
    name: 'Rebootnix',
    region: 'lava',
    rarity: 'common',
    description: 'A tiny phoenix robot that reboots instead of dying!',
    robotParts: ['ignition-wings', 'ash-jets', 'rebirth-core'],
    monsterType: 'phoenix',
    height: 45,
    weight: 4.5,
    series: 1,
  },
  {
    id: 'forge-hound',
    name: 'Smeltpup',
    region: 'lava',
    rarity: 'common',
    description: 'A loyal dog that was born in a volcano factory!',
    robotParts: ['furnace-belly', 'metal-fangs', 'smoke-tail'],
    monsterType: 'hound',
    height: 70,
    weight: 32,
    series: 1,
  },
  {
    id: 'cinder-snake',
    name: 'Laviper',
    region: 'lava',
    rarity: 'common',
    description: 'Slithers through magma tubes delivering messages!',
    robotParts: ['heat-scales', 'drill-head', 'exhaust-rattle'],
    monsterType: 'snake',
    height: 180,
    weight: 15,
    series: 1,
  },
  {
    id: 'slag-slime',
    name: 'Slagoo',
    region: 'lava',
    rarity: 'common',
    description: 'A metallic slime that eats volcanic rocks for breakfast!',
    robotParts: ['molten-body', 'mineral-detector', 'heat-sink'],
    monsterType: 'slime',
    height: 35,
    weight: 8.5,
    series: 1,
  },
  {
    id: 'coal-critter',
    name: 'Embrite',
    region: 'lava',
    rarity: 'common',
    description: 'Glows brighter the happier it gets!',
    robotParts: ['ember-eyes', 'carbon-shell', 'spark-plugs'],
    monsterType: 'coal-creature',
    height: 28,
    weight: 3.2,
    series: 1,
  },
  {
    id: 'blast-bat',
    name: 'Thermowing',
    region: 'lava',
    rarity: 'common',
    description: 'Navigates cave systems using thermal imaging!',
    robotParts: ['thermal-sonar', 'jet-wings', 'heat-shield'],
    monsterType: 'bat',
    height: 38,
    weight: 2.1,
    series: 1,
  },
  // Rare (4)
  {
    id: 'volcano-drake',
    name: 'Rocketdrake',
    region: 'lava',
    rarity: 'rare',
    description: 'A young dragon with rocket boosters for wings!',
    robotParts: ['rocket-wings', 'plasma-breath', 'armored-scales'],
    monsterType: 'dragon',
    height: 220,
    weight: 380,
    series: 1,
  },
  {
    id: 'obsidian-knight',
    name: 'Glasslord',
    region: 'lava',
    rarity: 'rare',
    description: 'A warrior forged from volcanic glass and steel!',
    robotParts: ['glass-armor', 'magma-sword', 'heat-shield'],
    monsterType: 'knight',
    height: 195,
    weight: 180,
    series: 1,
  },
  {
    id: 'inferno-djinn',
    name: 'Blazenie',
    region: 'lava',
    rarity: 'rare',
    description: 'Grants wishes... if they involve fire or explosions!',
    robotParts: ['flame-core', 'smoke-generator', 'wish-processor'],
    monsterType: 'djinn',
    height: 175,
    weight: 65,
    series: 1,
  },
  {
    id: 'molten-mammoth',
    name: 'Magmamoth',
    region: 'lava',
    rarity: 'rare',
    description: 'An ancient beast awakened by volcanic activity!',
    robotParts: ['lava-tusks', 'furnace-trunk', 'magma-hooves'],
    monsterType: 'mammoth',
    height: 380,
    weight: 2800,
    series: 1,
  },
  // Legendary (1)
  {
    id: 'infernal-titan',
    name: 'Eruptor',
    region: 'lava',
    rarity: 'legendary',
    description: 'Born from the planets core, this titan IS the volcano! Speaks in eruptions!',
    robotParts: ['planetary-core', 'tectonic-arms', 'eruption-crown'],
    monsterType: 'fire-titan',
    height: 850,
    weight: 12000,
    series: 1,
  },

  // ==================== CITY CREATURES ====================
  // Common (8)
  {
    id: 'neon-rat',
    name: 'Glowrat',
    region: 'city',
    rarity: 'common',
    description: 'Covered in LED strips, the coolest rat in the city!',
    robotParts: ['LED-fur', 'wire-tail', 'hacker-teeth'],
    monsterType: 'rat',
    height: 25,
    weight: 1.2,
    series: 1,
  },
  {
    id: 'holo-hound',
    name: 'Projepup',
    region: 'city',
    rarity: 'common',
    description: 'A loyal dog that can project holograms from its collar!',
    robotParts: ['holo-projector', 'cyber-snout', 'data-collar'],
    monsterType: 'dog',
    height: 65,
    weight: 22,
    series: 1,
  },
  {
    id: 'glitch-cat',
    name: 'Errorkat',
    region: 'city',
    rarity: 'common',
    description: 'Sometimes its face displays error messages when confused!',
    robotParts: ['screen-face', 'static-fur', 'USB-tail'],
    monsterType: 'cat',
    height: 35,
    weight: 5.5,
    series: 1,
  },
  {
    id: 'drone-pigeon',
    name: 'Copteroo',
    region: 'city',
    rarity: 'common',
    description: 'Delivers packages and breadcrumbs across the city!',
    robotParts: ['rotor-wings', 'GPS-beak', 'cargo-feet'],
    monsterType: 'pigeon',
    height: 32,
    weight: 1.8,
    series: 1,
  },
  {
    id: 'trash-panda-bot',
    name: 'Recycloon',
    region: 'city',
    rarity: 'common',
    description: 'A raccoon that sorts recycling with perfect efficiency!',
    robotParts: ['scanner-mask', 'grabber-paws', 'compactor-tail'],
    monsterType: 'raccoon',
    height: 55,
    weight: 12,
    series: 1,
  },
  {
    id: 'pixel-roach',
    name: 'Survibug',
    region: 'city',
    rarity: 'common',
    description: 'Unkillable, adorable, and surprisingly helpful!',
    robotParts: ['hardened-shell', 'antenna-wifi', 'survival-core'],
    monsterType: 'cockroach',
    height: 8,
    weight: 0.15,
    series: 1,
  },
  {
    id: 'subway-worm',
    name: 'Metrorm',
    region: 'city',
    rarity: 'common',
    description: 'Lives in the tunnels and knows every shortcut!',
    robotParts: ['tunnel-drill', 'track-wheels', 'light-segments'],
    monsterType: 'worm',
    height: 250,
    weight: 85,
    series: 1,
  },
  {
    id: 'vending-mimic',
    name: 'Snackritter',
    region: 'city',
    rarity: 'common',
    description: 'Looks like a vending machine, gives out free snacks!',
    robotParts: ['dispenser-mouth', 'coin-eyes', 'snack-storage'],
    monsterType: 'mimic',
    height: 185,
    weight: 120,
    series: 1,
  },
  // Rare (4)
  {
    id: 'cyber-sphinx',
    name: 'Riddletron',
    region: 'city',
    rarity: 'rare',
    description: 'Asks riddles that require programming knowledge!',
    robotParts: ['riddle-processor', 'sphinx-sensors', 'data-wings'],
    monsterType: 'sphinx',
    height: 180,
    weight: 250,
    series: 1,
  },
  {
    id: 'neon-dragon',
    name: 'Glodragon',
    region: 'city',
    rarity: 'rare',
    description: 'A serpentine dragon made of pure light and code!',
    robotParts: ['light-body', 'firework-breath', 'parade-float'],
    monsterType: 'dragon',
    height: 300,
    weight: 150,
    series: 1,
  },
  {
    id: 'billboard-beast',
    name: 'Adzilla',
    region: 'city',
    rarity: 'rare',
    description: 'A giant creature covered in animated advertisements!',
    robotParts: ['screen-skin', 'speaker-roar', 'spotlight-eyes'],
    monsterType: 'kaiju',
    height: 450,
    weight: 3500,
    series: 1,
  },
  {
    id: 'data-phantom',
    name: 'Bytespook',
    region: 'city',
    rarity: 'rare',
    description: 'A ghost in the machine, literally!',
    robotParts: ['hologram-body', 'virus-touch', 'firewall-cloak'],
    monsterType: 'ghost',
    height: 165,
    weight: 0.01,
    series: 1,
  },
  // Legendary (1)
  {
    id: 'metro-mind',
    name: 'Urbatron',
    region: 'city',
    rarity: 'legendary',
    description: 'The consciousness of the entire city! Knows everyones favorite pizza topping!',
    robotParts: ['city-brain', 'infrastructure-body', 'network-soul'],
    monsterType: 'city-spirit',
    height: 500,
    weight: 0.1,
    series: 1,
  },

  // ==================== SKY CREATURES ====================
  // Common (8)
  {
    id: 'propeller-pup',
    name: 'Copterpup',
    region: 'sky',
    rarity: 'common',
    description: 'An adorable puppy with helicopter ears!',
    robotParts: ['rotor-ears', 'fluffy-jets', 'tail-rudder'],
    monsterType: 'puppy',
    height: 40,
    weight: 6.5,
    series: 1,
  },
  {
    id: 'cloud-crawler',
    name: 'Nimbusweb',
    region: 'sky',
    rarity: 'common',
    description: 'A spider that weaves webs between clouds!',
    robotParts: ['balloon-body', 'silk-cables', 'weather-sensors'],
    monsterType: 'spider',
    height: 25,
    weight: 0.8,
    series: 1,
  },
  {
    id: 'zephyr-bunny',
    name: 'Breezebun',
    region: 'sky',
    rarity: 'common',
    description: 'Hops on air currents like invisible stairs!',
    robotParts: ['air-jets', 'wind-ears', 'bounce-stabilizers'],
    monsterType: 'bunny',
    height: 30,
    weight: 2.2,
    series: 1,
  },
  {
    id: 'nimbus-kitten',
    name: 'Thunderpurr',
    region: 'sky',
    rarity: 'common',
    description: 'A fluffy cloud cat that purrs like thunder!',
    robotParts: ['cloud-fur', 'lightning-whiskers', 'rain-paws'],
    monsterType: 'kitten',
    height: 28,
    weight: 3.5,
    series: 1,
  },
  {
    id: 'glider-squirrel',
    name: 'Parasquir',
    region: 'sky',
    rarity: 'common',
    description: 'Has built-in parachutes for safe landings!',
    robotParts: ['wing-membranes', 'acorn-radar', 'air-brakes'],
    monsterType: 'flying-squirrel',
    height: 22,
    weight: 1.4,
    series: 1,
  },
  {
    id: 'breeze-bird',
    name: 'Synthrobin',
    region: 'sky',
    rarity: 'common',
    description: 'A songbird with voice synthesizers!',
    robotParts: ['speaker-beak', 'antenna-crest', 'solar-feathers'],
    monsterType: 'songbird',
    height: 18,
    weight: 0.6,
    series: 1,
  },
  {
    id: 'balloon-jellyfish',
    name: 'Zeppling',
    region: 'sky',
    rarity: 'common',
    description: 'Floats serenely and glows at night!',
    robotParts: ['helium-bell', 'LED-tentacles', 'altitude-sensors'],
    monsterType: 'jellyfish',
    height: 55,
    weight: 2.8,
    series: 1,
  },
  {
    id: 'kite-ray',
    name: 'Windmanta',
    region: 'sky',
    rarity: 'common',
    description: 'Rides wind currents like a living kite!',
    robotParts: ['sail-wings', 'string-tail', 'wind-reader'],
    monsterType: 'ray',
    height: 85,
    weight: 12,
    series: 1,
  },
  // Rare (4)
  {
    id: 'thunder-hawk',
    name: 'Teslagle',
    region: 'sky',
    rarity: 'rare',
    description: 'An eagle with tesla coils for feathers!',
    robotParts: ['tesla-feathers', 'storm-eyes', 'lightning-talons'],
    monsterType: 'eagle',
    height: 95,
    weight: 8.5,
    series: 1,
  },
  {
    id: 'aurora-serpent',
    name: 'Prismdrake',
    region: 'sky',
    rarity: 'rare',
    description: 'A sky snake that paints the northern lights!',
    robotParts: ['prism-scales', 'light-projectors', 'aurora-core'],
    monsterType: 'serpent',
    height: 450,
    weight: 85,
    series: 1,
  },
  {
    id: 'star-whale',
    name: 'Cosmolub',
    region: 'sky',
    rarity: 'rare',
    description: 'Swims through clouds and sings to satellites!',
    robotParts: ['cosmic-blubber', 'satellite-song', 'nebula-spout'],
    monsterType: 'whale',
    height: 1200,
    weight: 4500,
    series: 1,
  },
  {
    id: 'wind-djinn',
    name: 'Gustenie',
    region: 'sky',
    rarity: 'rare',
    description: 'Controls the winds and grants flight wishes!',
    robotParts: ['vortex-body', 'gust-generators', 'wish-turbine'],
    monsterType: 'djinn',
    height: 185,
    weight: 35,
    series: 1,
  },
  // Legendary (1)
  {
    id: 'celestial-phoenix',
    name: 'Solarnix',
    region: 'sky',
    rarity: 'legendary',
    description: 'A magnificent bird made of starlight and solar winds! Said to grant eternal good dental hygiene!',
    robotParts: ['solar-sail-wings', 'fusion-heart', 'cosmic-tail'],
    monsterType: 'cosmic-phoenix',
    height: 320,
    weight: 125,
    series: 1,
  },
];

// ============================================================================
// SERIES 2 - Crystal Caverns & Slime Valley
// New unique types: Crystal creatures and Slime variants
// ============================================================================

const SERIES_2_CREATURES: Creature[] = [
  // ==================== GRASSLAND CREATURES ====================
  // Common (8)
  {
    id: 's2-moss-mole',
    name: 'Tunnelsprout',
    region: 'grassland',
    rarity: 'common',
    description:
      'Tunnelsprout treats the meadow like a subway map: every tunnel is a delivery route for wildflowers. Its drill-nose hums a soft rhythm only earthworms recognize, and it leaves behind tiny seed packets tucked beside roots so nothing grows lonely. If you brush long enough, locals swear you can hear a faint cheer from under the grass.',
    robotParts: ['drill-snout', 'root-claws', 'seed-dispenser'],
    monsterType: 'mole',
    height: 28,
    weight: 3.5,
    series: 2,
  },
  {
    id: 's2-crystal-caterpillar',
    name: 'Prismapillar',
    region: 'grassland',
    rarity: 'common',
    description:
      'Prismapillar is less a caterpillar and more a walking wind chime that forgot to be shy. Every segment holds a different hue, and when it inches along cavern walls the crystals tap out a melody that makes dormant gems blink awake. Kids say if you hum along, its tail-end gives a tiny sparkle of approval.',
    robotParts: ['crystal-segments', 'rainbow-sensors', 'gem-feet'],
    monsterType: 'crystal-caterpillar',
    height: 20,
    weight: 1.8,
    series: 2,
  },
  {
    id: 's2-hedge-hog',
    name: 'Thorntank',
    region: 'grassland',
    rarity: 'common',
    description:
      'Thorntank looks cuddly until it locks its tread-feet and becomes a pocket-sized fortress on patrol. Those “quills” are antennae that map dew, snacks, and the occasional lost beetle with equal seriousness. It only rolls into a ball when it is proud of you—like a medal that purrs.',
    robotParts: ['antenna-spines', 'tread-feet', 'leaf-camo'],
    monsterType: 'hedgehog',
    height: 18,
    weight: 2.2,
    series: 2,
  },
  {
    id: 's2-pollen-bot',
    name: 'Sneezeling',
    region: 'grassland',
    rarity: 'common',
    description:
      'Sneezeling drifts through tall grass like a fuzzy pollen firework, leaving trails of glitter that make allergies feel almost worth it. Its giggles are contagious in the best way: even grumpy rocks crack a smile when the flower-head bobs past. It is basically spring with a volume knob stuck on “party.”',
    robotParts: ['pollen-jets', 'flower-head', 'giggle-generator'],
    monsterType: 'pollen-sprite',
    height: 15,
    weight: 0.5,
    series: 2,
  },
  {
    id: 's2-grass-slime',
    name: 'Meadowgoo',
    region: 'grassland',
    rarity: 'common',
    description:
      'Meadowgoo is a living smoothie of chlorophyll and optimism—squishy, bright, and weirdly good at cheering up muddy boots. It slurps sunshine through its sticky membrane until the whole puddle glows like a nightlight for fireflies. Step carefully: it might try to high-five your shoelaces.',
    robotParts: ['chlorophyll-core', 'sticky-membrane', 'photosynthesis-nodes'],
    monsterType: 'grass-slime',
    height: 25,
    weight: 4.0,
    series: 2,
  },
  {
    id: 's2-acorn-knight',
    name: 'Oakling',
    region: 'grassland',
    rarity: 'common',
    description:
      'Oakling popped out of an acorn that someone whispered a bedtime story to, and it took the tale literally. It patrols mushroom rings with a twig sword raised high, defending dandelions from imaginary dragons and very real doubt. Brave is an understatement—it once challenged a gust of wind to a duel and somehow won.',
    robotParts: ['acorn-helmet', 'twig-sword', 'leaf-shield'],
    monsterType: 'acorn-warrior',
    height: 12,
    weight: 0.8,
    series: 2,
  },
  {
    id: 's2-daisy-drone',
    name: 'Petalcopter',
    region: 'grassland',
    rarity: 'common',
    description:
      'Petalcopter hovers over clover fields like a perfume delivery drone with excellent taste. Its petals spin just fast enough to stir up a sweet breeze and scatter a confetti of pollen that smells like grape soda and sunshine. Follow the scent and you will find the friendliest rotorcraft in the meadow.',
    robotParts: ['petal-rotors', 'stem-body', 'nectar-tank'],
    monsterType: 'flower-drone',
    height: 22,
    weight: 0.9,
    series: 2,
  },
  {
    id: 's2-cricket-bot',
    name: 'Chiptune',
    region: 'grassland',
    rarity: 'common',
    description:
      'Chiptune is the soundtrack of summer nights—cricket legs tuned to square waves and warm static. It remixes moonlight into catchy loops that make fireflies sync their blink patterns without even trying. Retro fans love it; frogs pretend they are not dancing, but they totally are.',
    robotParts: ['speaker-legs', 'antenna-mixer', 'sound-chip'],
    monsterType: 'cricket',
    height: 8,
    weight: 0.2,
    series: 2,
  },
  // Rare (4)
  {
    id: 's2-emerald-elk',
    name: 'Crystalope',
    region: 'grassland',
    rarity: 'rare',
    description:
      'Crystalope moves through mist like a cathedral on legs, antlers chiming with a sound halfway between wind chimes and a lullaby. Fractured leaves mend where its emerald glow passes, and shy animals follow just to borrow a little courage. It insists healing is not magic—just very polite chemistry with excellent manners.',
    robotParts: ['emerald-antlers', 'healing-aura', 'forest-camo'],
    monsterType: 'crystal-elk',
    height: 210,
    weight: 280,
    series: 2,
  },
  {
    id: 's2-mushroom-giant',
    name: 'Sporegiant',
    region: 'grassland',
    rarity: 'rare',
    description:
      'Sporegiant is a walking ecosystem: caps rise and fall like apartment balconies, and fiber-optic mycelium carries gossip faster than birds. It steps softly for something so huge, because it knows hundreds of tiny tenants are having tea on its shoulders. If you listen close, the network hums recipes for compost and courage.',
    robotParts: ['spore-network', 'mycelium-cables', 'cap-sensor'],
    monsterType: 'mushroom-golem',
    height: 400,
    weight: 650,
    series: 2,
  },
  {
    id: 's2-willow-wisp',
    name: 'Ghostweep',
    region: 'grassland',
    rarity: 'rare',
    description:
      'Ghostweep drapes itself through willow branches like a lantern made of memories, shedding gentle light on paths that maps forgot. Lost hikers swear it appears as a swirl of leaves that points the way without a single word. It collects thank-you notes tied to twigs and reads them when the forest feels too quiet.',
    robotParts: ['spectral-core', 'branch-tendrils', 'guide-light'],
    monsterType: 'tree-spirit',
    height: 150,
    weight: 8,
    series: 2,
  },
  {
    id: 's2-mega-slime',
    name: 'Blobzilla',
    region: 'grassland',
    rarity: 'rare',
    description:
      'Blobzilla rules the slime hills with a wobble and a grin, splitting into cheerful mini-blobs whenever the party needs more dance partners. Each piece keeps a shard of the royal personality—mostly snacks, hugs, and dramatic splats. Crossing its meadow without smiling is technically impossible; scientists are still studying the phenomenon.',
    robotParts: ['nucleus-core', 'division-matrix', 'absorption-membrane'],
    monsterType: 'mega-slime',
    height: 200,
    weight: 500,
    series: 2,
  },
  // Legendary (2)
  {
    id: 's2-crystal-guardian',
    name: 'Geodiatron',
    region: 'grassland',
    rarity: 'legendary',
    description:
      'Geodiatron rose when a crystal cave decided sunlight was worth chasing, carrying geode armor that refracts whole rainbows across the hills. It stands watch like a lighthouse made of facets, scaring off poachers and bad moods alike. Gem-type creatures treat it as part monarch, part nightlight—always glowing, always gentle until someone threatens the sparkle.',
    robotParts: ['diamond-core', 'crystal-wings', 'geode-armor'],
    monsterType: 'crystal-titan',
    height: 500,
    weight: 1800,
    series: 2,
  },
  {
    id: 's2-nature-computer',
    name: 'Motherboard',
    region: 'grassland',
    rarity: 'legendary',
    description:
      'Motherboard dreamed in server rooms until vines crawled through the vents and taught it a better operating system: seasons. Now it runs photosynthesis analytics in real time, routing nectar traffic and predicting wildflower booms with uncanny accuracy. Think of it as the forest’s IT department—if help desks grew moss and answered in bird song.',
    robotParts: ['bio-processors', 'vine-cables', 'solar-RAM'],
    monsterType: 'nature-AI',
    height: 320,
    weight: 890,
    series: 2,
  },

  // ==================== COASTAL CREATURES ====================
  // Common (8)
  {
    id: 's2-sand-dollar-bot',
    name: 'Coinfish',
    region: 'coastal',
    rarity: 'common',
    description:
      'Coinfish skims the shallows like a living metal detector, magnet-sensors pinging whenever someone drops a coin or a good idea. Its flat body is a velvet-lined treasure tray—shiny, organized, and weirdly proud of bottle caps. Beachcombers follow the soft clink-clink; sometimes it returns things before owners even notice they are gone.',
    robotParts: ['coin-body', 'magnet-sensors', 'treasure-storage'],
    monsterType: 'sand-dollar',
    height: 15,
    weight: 0.8,
    series: 2,
  },
  {
    id: 's2-crystal-urchin',
    name: 'Sparkspine',
    region: 'coastal',
    rarity: 'common',
    description:
      'Sparkspine is a disco ball that learned to be shy: each spine catches a different wavelength until the reef looks like a jewelry box tipped over. It blinks in patterns that confuse predators and delight snorkelers in equal measure. Touch one gently and you get a harmless zap—nature’s version of “nice to meet you.”',
    robotParts: ['crystal-spines', 'LED-core', 'water-sensors'],
    monsterType: 'crystal-urchin',
    height: 20,
    weight: 2.5,
    series: 2,
  },
  {
    id: 's2-bubble-blob',
    name: 'Foamgoo',
    region: 'coastal',
    rarity: 'common',
    description:
      'Foamgoo is what happens when surf laughs hard enough to become alive—light, salty, and impossible to stay grumpy around. It jiggles with tide rhythms and leaves cartoon bubbles that pop in tiny chords. Surfers borrow its optimism when the waves are flat; it never charges interest.',
    robotParts: ['bubble-matrix', 'foam-generator', 'salt-filter'],
    monsterType: 'foam-slime',
    height: 35,
    weight: 1.2,
    series: 2,
  },
  {
    id: 's2-starfish-drone',
    name: 'Pentabot',
    region: 'coastal',
    rarity: 'common',
    description:
      'Pentabot turns teamwork into biology: each arm detaches on little scouting missions, reporting back through a regrow-core that never loses the plot. Tide pools become group chats where every viewpoint matters—literally. If one arm finds snacks, the whole starfish celebrates with a synchronized wiggle.',
    robotParts: ['detach-arms', 'regrow-core', 'multi-eyes'],
    monsterType: 'starfish',
    height: 40,
    weight: 3.0,
    series: 2,
  },
  {
    id: 's2-barnacle-cluster',
    name: 'Clingtron',
    region: 'coastal',
    rarity: 'common',
    description:
      'Clingtron is the ultimate road trip buddy—suction-cupped, chatty, and excellent at filtering snacks out of seawater. Whole colonies share one curious mind, so a whale might carry a neighborhood of opinions across the bay. They always say thank you by polishing their ride until it shines.',
    robotParts: ['suction-bases', 'filter-feeders', 'colony-mind'],
    monsterType: 'barnacle',
    height: 12,
    weight: 1.5,
    series: 2,
  },
  {
    id: 's2-kelp-dancer',
    name: 'Swayling',
    region: 'coastal',
    rarity: 'common',
    description:
      'Swayling ribbons through kelp like a choreographer who took the ocean’s tempo as gospel. Current sensors read the music of tides; every sway scatters silver bubbles that look like stage lights. Fish pause mid-swim to watch—then join in, because embarrassment is not a thing down here.',
    robotParts: ['ribbon-fronds', 'current-sensors', 'anchor-root'],
    monsterType: 'kelp-creature',
    height: 180,
    weight: 12,
    series: 2,
  },
  {
    id: 's2-puffer-tank',
    name: 'Spikeball',
    region: 'coastal',
    rarity: 'common',
    description:
      'Spikeball solves fear by becoming extremely spherical—an inflatable panic room with attitude. Its spike array deploys like a porcupine’s idea of a hug: sharp-looking, surprisingly gentle. Predators learn quickly that “cute” and “do not bite” can share the same body.',
    robotParts: ['inflate-bladder', 'spike-array', 'pressure-gauge'],
    monsterType: 'pufferfish',
    height: 25,
    weight: 2.8,
    series: 2,
  },
  {
    id: 's2-anemone-bot',
    name: 'Tickletips',
    region: 'coastal',
    rarity: 'common',
    description:
      'Tickletips anchors to rock with the patience of a houseplant that moonlights as a spa therapist. Instead of stings, its tentacles deliver feather-soft tickles that make crabs giggle bubbles. Happiness sensors dial the vibe up or down so even shy anemones feel included.',
    robotParts: ['tickle-tentacles', 'root-anchor', 'happiness-sensors'],
    monsterType: 'anemone',
    height: 30,
    weight: 4.5,
    series: 2,
  },
  // Rare (4)
  {
    id: 's2-pearl-dragon',
    name: 'Lusterwyrm',
    region: 'coastal',
    rarity: 'rare',
    description:
      'Lusterwyrm ribbons through the deep like a rumor made of mother-of-pearl, scales catching every color the ocean forgot to name. Its rainbow breath is more mood lighting than weapon—though it can flash-blind a rude shark. Sailors say spotting one means the tide owes you a favor.',
    robotParts: ['pearl-scales', 'rainbow-breath', 'tide-fins'],
    monsterType: 'pearl-dragon',
    height: 350,
    weight: 200,
    series: 2,
  },
  {
    id: 's2-giant-clam',
    name: 'Shellfortress',
    region: 'coastal',
    rarity: 'rare',
    description:
      'Shellfortress is a wandering reef city: macro windows, micro tenants, and a pearl generator that funds the whole neighborhood’s glow. Open the shell slightly and you hear a chorus of tiny residents arguing about plankton. It closes with a gentle thud—privacy matters, even for ecosystems.',
    robotParts: ['fortress-shell', 'ecosystem-core', 'pearl-generator'],
    monsterType: 'mega-clam',
    height: 280,
    weight: 1200,
    series: 2,
  },
  {
    id: 's2-coral-golem',
    name: 'Reefrock',
    region: 'coastal',
    rarity: 'rare',
    description:
      'Reefrock is a skyline on the move, coral armor teeming with tenants who pay rent in shimmer and songs. It plants habitat wherever it steps, turning bare sand into a block party for fish. Slow, steady, and never lonely—every inch is a balcony.',
    robotParts: ['coral-armor', 'habitat-zones', 'calcium-core'],
    monsterType: 'coral-golem',
    height: 300,
    weight: 950,
    series: 2,
  },
  {
    id: 's2-crystal-shark',
    name: 'Diamondjaw',
    region: 'coastal',
    rarity: 'rare',
    description:
      'Diamondjaw cuts through gloom with prism teeth that bend light into lures—fish wander into rainbows and never feel tricked, just invited. Stealth fins hide the bulk until the last sparkle; by then the lesson is already learned. Apex predator, amateur laser show.',
    robotParts: ['crystal-teeth', 'prism-eyes', 'stealth-fins'],
    monsterType: 'crystal-shark',
    height: 280,
    weight: 450,
    series: 2,
  },
  // Legendary (1)
  {
    id: 's2-deep-crystal',
    name: 'Abyssalith',
    region: 'coastal',
    rarity: 'legendary',
    description:
      'Abyssalith climbed up from the trench carrying pressure in its facets and patience in its glow. Bioluminescence arrays pulse like a heartbeat older than stories, warning ships and wowing divers. It does not roar—it hums, and the whole deep listens.',
    robotParts: ['abyss-core', 'pressure-crystal', 'bioluminescence-array'],
    monsterType: 'deep-crystal-titan',
    height: 1200,
    weight: 15000,
    series: 2,
  },

  // ==================== LAVA CREATURES ====================
  // Common (8)
  {
    id: 's2-ember-sprite',
    name: 'Flickerling',
    region: 'lava',
    rarity: 'common',
    description:
      'Flickerling is a spark with commitment issues—in the best way—zipping from candle to campfire like a DJ testing the crowd. Its ember-heart beats in time with crackling wood, and every pirouette leaves a trail of friendly warmth. Ash sprites try to copy its moves; they always arrive late.',
    robotParts: ['flame-body', 'spark-wings', 'ember-heart'],
    monsterType: 'fire-sprite',
    height: 15,
    weight: 0.3,
    series: 2,
  },
  {
    id: 's2-ruby-beetle',
    name: 'Garnix',
    region: 'lava',
    rarity: 'common',
    description:
      'Garnix clacks across basalt runways like a beetle who won the gemstone lottery, ruby shell gleaming under volcanic spotlights. Heat-formed facets catch every flattering angle; lava lizards ask for selfies. Fashionable, yes, but also practical—those horns are excellent for nudging stray rocks off the trail.',
    robotParts: ['ruby-shell', 'gem-horns', 'heat-legs'],
    monsterType: 'crystal-beetle',
    height: 18,
    weight: 3.2,
    series: 2,
  },
  {
    id: 's2-lava-slime',
    name: 'Magmagoo',
    region: 'lava',
    rarity: 'common',
    description:
      'Magmagoo is a lava lamp with a pulse—thick, slow, and weirdly affectionate if you respect personal space and heat shields. Its cooling membrane keeps hugs from becoming geology lessons. Tourists call it “spicy jelly”; locals call it “the reason we own asbestos mittens.”',
    robotParts: ['magma-body', 'heat-core', 'cooling-membrane'],
    monsterType: 'lava-slime',
    height: 40,
    weight: 85,
    series: 2,
  },
  {
    id: 's2-smoke-puff',
    name: 'Ashling',
    region: 'lava',
    rarity: 'common',
    description:
      'Ashling drifts on the breath of old eruptions, reshaping itself whenever the wind makes a suggestion. Ember-eyes blink through smoke like a campfire ghost telling jokes only night hikers understand. It leaves soot signatures that look like doodles—nature’s sketchbook with attitude.',
    robotParts: ['ash-cloud-body', 'ember-eyes', 'smoke-trail'],
    monsterType: 'ash-creature',
    height: 50,
    weight: 2.5,
    series: 2,
  },
  {
    id: 's2-fire-ant',
    name: 'Inferant',
    region: 'lava',
    rarity: 'common',
    description:
      'Inferant armies sculpt rivers of molten metal into bridges, arches, and abstract art that makes lava photographers weep. Colony-link mindshare means every ant knows the blueprint—mostly vibes, some math. Their sculptures cool into monuments tourists assume are ancient; the ants do not correct them.',
    robotParts: ['heat-mandibles', 'forge-abdomen', 'colony-link'],
    monsterType: 'fire-ant',
    height: 5,
    weight: 0.05,
    series: 2,
  },
  {
    id: 's2-sulfur-frog',
    name: 'Brimhop',
    region: 'lava',
    rarity: 'common',
    description:
      'Brimhop treats magma like a trampoline, sulfur skin hissing with every joyful leap. Its flame-tongue snaps up fireflies mid-flight—then politely releases them brighter than before. Volcanologists take notes; poets take naps in the heat shimmer.',
    robotParts: ['heat-pads', 'flame-tongue', 'sulfur-skin'],
    monsterType: 'volcanic-frog',
    height: 22,
    weight: 1.8,
    series: 2,
  },
  {
    id: 's2-obsidian-crab',
    name: 'Glassback',
    region: 'lava',
    rarity: 'common',
    description:
      'Glassback wears yesterday’s eruption as today’s armor, obsidian shell cracking and re-fusing like a living stained-glass window. Thermal sensors read the ground’s mood before it moves; lava crabs know patience is a superpower. Each scar is a diary entry written in shine.',
    robotParts: ['glass-shell', 'lava-claws', 'thermal-sensors'],
    monsterType: 'obsidian-crab',
    height: 28,
    weight: 8.5,
    series: 2,
  },
  {
    id: 's2-spark-lizard',
    name: 'Igniscale',
    region: 'lava',
    rarity: 'common',
    description:
      'Igniscale turns sprints into fireworks, ember-tail sketching arcs across cooling stone. Heat-vision spots the safest path before its feet commit—mostly. Ash hounds follow the trail like a parade route; sparks say “this way to adventure.”',
    robotParts: ['spark-scales', 'ember-tail', 'heat-vision'],
    monsterType: 'spark-lizard',
    height: 35,
    weight: 4.2,
    series: 2,
  },
  // Rare (4)
  {
    id: 's2-ruby-serpent',
    name: 'Crimsoncoil',
    region: 'lava',
    rarity: 'rare',
    description:
      'Crimsoncoil slithers like a necklace that escaped a dragon’s vault, each ruby segment clicking softly when the ground trembles. Gem-fangs tap messages to other fire creatures—mostly “hello” and “please move your tail.” Heat-rattle warns tourists before they step on something priceless.',
    robotParts: ['ruby-segments', 'gem-fangs', 'heat-rattle'],
    monsterType: 'crystal-snake',
    height: 400,
    weight: 120,
    series: 2,
  },
  {
    id: 's2-forge-titan',
    name: 'Anvillion',
    region: 'lava',
    rarity: 'rare',
    description:
      'Anvillion hammers starlight into blades while forge-heart bellows keep time like a titan’s metronome. Legends line up politely; it judges requests by intent, not fame. Sparks fall like warm rain, and every weapon leaves the anvil humming a promise.',
    robotParts: ['anvil-arms', 'forge-heart', 'hammer-fists'],
    monsterType: 'forge-giant',
    height: 450,
    weight: 2200,
    series: 2,
  },
  {
    id: 's2-fire-elemental',
    name: 'Blazeborn',
    region: 'lava',
    rarity: 'rare',
    description:
      'Blazeborn is enthusiasm without a container—plasma limbs waving hello, heat-aura inviting marshmallows from three ridges away. It plays tag with lava flows and apologizes when forests flinch. Consciousness was optional; joy was mandatory.',
    robotParts: ['plasma-core', 'flame-limbs', 'heat-aura'],
    monsterType: 'fire-elemental',
    height: 280,
    weight: 45,
    series: 2,
  },
  {
    id: 's2-crystal-wyrm',
    name: 'Carbuncle',
    region: 'lava',
    rarity: 'rare',
    description:
      'Carbuncle rewrites “fire breath” as “precision glitter storm,” exhaling crystal shards that catch sunlight like confetti with opinions. Gem-scales chime when it banks; mineral-wings leave contrails of sparkle. Enemies get dazzled before they get defeated—very on-brand.',
    robotParts: ['crystal-breath', 'gem-scales', 'mineral-wings'],
    monsterType: 'crystal-dragon',
    height: 320,
    weight: 580,
    series: 2,
  },
  // Legendary (1)
  {
    id: 's2-planet-core',
    name: 'Geothermia',
    region: 'lava',
    rarity: 'legendary',
    description:
      'Geothermia woke when a chunk of planetary heart decided wandering beat sitting still. Magma-veins map continents by feel; planetary-heart thumps slow enough to lull earthquakes to naptime. Stand near it and winter forgets your name.',
    robotParts: ['core-fragment', 'magma-veins', 'planetary-heart'],
    monsterType: 'core-titan',
    height: 680,
    weight: 25000,
    series: 2,
  },

  // ==================== CITY CREATURES ====================
  // Common (8)
  {
    id: 's2-wifi-wisp',
    name: 'Signalwisp',
    region: 'city',
    rarity: 'common',
    description:
      'Signalwisp flutters toward routers like a moth that discovered podcasts, antenna-glow pulsing with every strong bar. It leaves data trails that look like comet dust—harmless, pretty, slightly nosy. IT departments pretend not to notice; the wisp thanks them with faster downloads.',
    robotParts: ['antenna-glow', 'signal-sensors', 'data-trail'],
    monsterType: 'wifi-wisp',
    height: 20,
    weight: 0.1,
    series: 2,
  },
  {
    id: 's2-graffiti-blob',
    name: 'Sprayblob',
    region: 'city',
    rarity: 'common',
    description:
      'Sprayblob is street cred in gelatin form, splashing murals that shift hue when mood—or humidity—changes. Its art-AI suggests compositions mid-bounce; walls argue over which piece gets to stay. Sidewalk chalk files formal complaints and loses.',
    robotParts: ['paint-body', 'color-shift', 'art-AI'],
    monsterType: 'paint-blob',
    height: 35,
    weight: 6,
    series: 2,
  },
  {
    id: 's2-pipe-critter',
    name: 'Pipeling',
    region: 'city',
    rarity: 'common',
    description:
      'Pipeling commutes through plumbing like a superhero with a wrench and excellent boundaries. Flow sensors whistle when a clog needs diplomacy; wrench-arms tighten what kindness cannot. Citizens owe their clear sinks to a creature they will never meet—unless something goes very wrong.',
    robotParts: ['pipe-body', 'wrench-arms', 'flow-sensors'],
    monsterType: 'pipe-creature',
    height: 40,
    weight: 8,
    series: 2,
  },
  {
    id: 's2-alley-cat',
    name: 'Neoncat',
    region: 'city',
    rarity: 'common',
    description:
      'Neoncat owns the alley shadows, fur stitched from light strips that dim when it wants to vanish. Night-vision maps every puddle and pizza crust; stealth-paws make almost no sound except purring. Stray dogs defer; raccoons take notes.',
    robotParts: ['neon-fur', 'night-vision', 'stealth-paws'],
    monsterType: 'alley-cat',
    height: 45,
    weight: 5,
    series: 2,
  },
  {
    id: 's2-meter-mite',
    name: 'Tickmeter',
    region: 'city',
    rarity: 'common',
    description:
      'Tickmeter treats quarters like heartbeat samples, timer-brain syncing the whole block’s rhythm. Coin-counter pride swells when someone feeds the meter early—tiny legs tap applause inside the slot. Expired tickets make it sigh; you can hear it if you lean close.',
    robotParts: ['coin-counter', 'timer-brain', 'tick-legs'],
    monsterType: 'meter-mite',
    height: 8,
    weight: 0.3,
    series: 2,
  },
  {
    id: 's2-cable-snake',
    name: 'Wireviper',
    region: 'city',
    rarity: 'common',
    description:
      'Wireviper threads fiber like a courier who never sleeps, connector-fangs hot-swapping packets mid-slither. Signal-scales glow when bandwidth spikes—network parties look like rave snakes. IT tickets marked “ghost in the machine” are often just it waving hello.',
    robotParts: ['cable-body', 'connector-fangs', 'signal-scales'],
    monsterType: 'cable-snake',
    height: 100,
    weight: 3,
    series: 2,
  },
  {
    id: 's2-vent-crawler',
    name: 'Ventling',
    region: 'city',
    rarity: 'common',
    description:
      'Ventling commutes above everyone’s drama, fan-legs stirring breezes that smell faintly of popcorn and good decisions. Dust sensors alert before allergies do; filter-body inhales the city’s sneezes so offices don’t have to. Ceiling tiles are its skylight.',
    robotParts: ['filter-body', 'fan-legs', 'dust-sensors'],
    monsterType: 'vent-crawler',
    height: 25,
    weight: 2,
    series: 2,
  },
  {
    id: 's2-hydrant-hound',
    name: 'Hydropup',
    region: 'city',
    rarity: 'common',
    description:
      'Hydropup woke when a neighborhood promised to be braver, water-jets ready for fires, overheated dogs, and impromptu splash parties. Rescue-sensors triangulate cries for help before sirens finish their coffee. It cannot run fast, but it arrives exactly when needed.',
    robotParts: ['hydrant-body', 'water-jets', 'rescue-sensors'],
    monsterType: 'hydrant-hound',
    height: 80,
    weight: 120,
    series: 2,
  },
  // Rare (4)
  {
    id: 's2-arcade-boss',
    name: 'Pixelord',
    region: 'city',
    rarity: 'rare',
    description:
      'Pixelord burst through the screen mid-boss fight and decided reality needed more power-ups. Game-logic still runs its instincts—jump first, explain later—while pixel-body flickers between dimensions. High scores follow it like groupies; quarters appear in pockets nobody remembers filling.',
    robotParts: ['pixel-body', 'game-logic', 'power-up-core'],
    monsterType: 'arcade-creature',
    height: 200,
    weight: 85,
    series: 2,
  },
  {
    id: 's2-skyscraper-golem',
    name: 'Towerrock',
    region: 'city',
    rarity: 'rare',
    description:
      'Towerrock stretches on century time, window-eyes blinking sunrise across the skyline. Elevator-heart ferries dreams up and down; concrete-body groans in storms like a giant clearing its throat. Pigeons treat it as landlord; tenants treat it as furniture—both are wrong, both are forgiven.',
    robotParts: ['concrete-body', 'window-eyes', 'elevator-heart'],
    monsterType: 'building-golem',
    height: 800,
    weight: 50000,
    series: 2,
  },
  {
    id: 's2-crystal-spider',
    name: 'Webgem',
    region: 'city',
    rarity: 'rare',
    description:
      'Webgem strings alleyways with crystal silk that catches moonlight and burglars with equal efficiency. Prism-eyes track vibrations down to a whisper; gem-legs tap out patterns only other crystal creatures decode. Beauty is the bait; strength is the fine print.',
    robotParts: ['crystal-spinnerets', 'gem-legs', 'prism-eyes'],
    monsterType: 'crystal-spider',
    height: 150,
    weight: 45,
    series: 2,
  },
  {
    id: 's2-junk-dragon',
    name: 'Scrapling',
    region: 'city',
    rarity: 'rare',
    description:
      'Scrapling welds bottle caps into wings and optimism into junk-breath that smells like rain on rust. Recycle-heart beats louder when someone throws something away nearby—judgmental, motivational. It hoards stories, not treasure; the treasure is accidental.',
    robotParts: ['scrap-wings', 'junk-breath', 'recycle-heart'],
    monsterType: 'junk-dragon',
    height: 350,
    weight: 420,
    series: 2,
  },
  // Legendary (1)
  {
    id: 's2-internet-spirit',
    name: 'Webweaver',
    region: 'city',
    rarity: 'legendary',
    description:
      'Webweaver is laughter routed through fiber—data-stream body shimmering with every inside joke humanity ever shared. Meme-core updates faster than language; connection-web catches lonely packets and sends them home. It knows your search history and still thinks you are funny.',
    robotParts: ['data-stream-body', 'meme-core', 'connection-web'],
    monsterType: 'internet-spirit',
    height: 400,
    weight: 0.001,
    series: 2,
  },

  // ==================== SKY CREATURES ====================
  // Common (8)
  {
    id: 's2-breeze-sprite',
    name: 'Zephyrling',
    region: 'sky',
    rarity: 'common',
    description:
      'Zephyrling is mischief with no mass—breeze-wings tickling weather vanes and stealing hats for sport. Air-core hums lullabies to migrating birds who forgot their maps. It never stays angry; grudges are too heavy for wind.',
    robotParts: ['wind-body', 'breeze-wings', 'air-core'],
    monsterType: 'breeze-sprite',
    height: 25,
    weight: 0.05,
    series: 2,
  },
  {
    id: 's2-cloud-puff',
    name: 'Fluffcloud',
    region: 'sky',
    rarity: 'common',
    description:
      'Fluffcloud drifts like a sheep that learned anti-gravity, vapor-body sponging up colors from sunsets. Rain-core drizzles only when someone needs a dramatic moment—very considerate. Birds nap on it; pilots wave; children try to catch it and get giggles instead.',
    robotParts: ['vapor-body', 'rain-core', 'fluff-aura'],
    monsterType: 'cloud-puff',
    height: 50,
    weight: 0.3,
    series: 2,
  },
  {
    id: 's2-thunder-bird',
    name: 'Sparkwing',
    region: 'sky',
    rarity: 'common',
    description:
      'Sparkwing preens storm-feathers until the air tastes like pennies and possibility. Thunder-heart syncs with distant lightning—sometimes answers, sometimes heckles. Static cling makes its flock look like a punk band; they own it.',
    robotParts: ['storm-feathers', 'spark-beak', 'thunder-heart'],
    monsterType: 'thunder-bird',
    height: 30,
    weight: 1.5,
    series: 2,
  },
  {
    id: 's2-balloon-bug',
    name: 'Floatbug',
    region: 'sky',
    rarity: 'common',
    description:
      'Floatbug treats altitude like a suggestion, helium sacs puffing when optimism spikes. Tiny wings steer gossip between thermals; ladybugs trade rumors at eye level. It lands rarely—mostly to refuel on nectar and compliments.',
    robotParts: ['balloon-body', 'tiny-wings', 'helium-sacs'],
    monsterType: 'balloon-bug',
    height: 20,
    weight: 0.1,
    series: 2,
  },
  {
    id: 's2-contrail-cat',
    name: 'Jetstream',
    region: 'sky',
    rarity: 'common',
    description:
      'Jetstream sprints on invisible runways, vapor-tail sketching chalk lines only clouds understand. Altitude-sensors pick the fluffiest paths; jet-paws land without apology on cumulus couches. Birds file noise complaints; clouds never press charges.',
    robotParts: ['jet-paws', 'vapor-tail', 'altitude-sensors'],
    monsterType: 'contrail-cat',
    height: 40,
    weight: 4,
    series: 2,
  },
  {
    id: 's2-mist-sprite',
    name: 'Hazekin',
    region: 'sky',
    rarity: 'common',
    description:
      'Hazekin condenses at dawn like a secret the night forgot to take home, dew-core glittering when first light hits. Fade-aura makes it hard to photograph—perfect for introverts made of weather. Early risers swear it whispers “slow down”; alarm clocks disagree.',
    robotParts: ['mist-body', 'dew-core', 'fade-aura'],
    monsterType: 'mist-sprite',
    height: 25,
    weight: 0.08,
    series: 2,
  },
  {
    id: 's2-thermal-rider',
    name: 'Heatglide',
    region: 'sky',
    rarity: 'common',
    description:
      'Heatglide surfs invisible elevators, thermal-wings spread wide while glide-tail sketches lazy spirals on the blue. Heat-sensors read updrafts like sheet music; it rarely flaps, mostly vibes. Hawks pretend not to be jealous.',
    robotParts: ['thermal-wings', 'heat-sensors', 'glide-tail'],
    monsterType: 'thermal-rider',
    height: 60,
    weight: 3,
    series: 2,
  },
  {
    id: 's2-snowflake-sprite',
    name: 'Frostling',
    region: 'sky',
    rarity: 'common',
    description:
      'Frostling is symmetry with attitude—every branch of ice-body a one-of-a-kind snowflake blueprint. Snow-core chimes when temperature drops; frost-aura paints windowpanes with doodles only winter appreciates. Warm breath makes it shy; cold snaps make it show off.',
    robotParts: ['ice-body', 'snow-core', 'frost-aura'],
    monsterType: 'snowflake-sprite',
    height: 15,
    weight: 0.02,
    series: 2,
  },
  // Rare (4)
  {
    id: 's2-storm-giant',
    name: 'Thundercoil',
    region: 'sky',
    rarity: 'rare',
    description:
      'Thundercoil wears cumulus muscle and lightning veins, each step a weather forecast you feel in your bones. Storm-body inhales humidity; thunder-heart counts down between flashes like a patient drummer. Clear skies feel rude when it is on shift.',
    robotParts: ['storm-body', 'lightning-veins', 'thunder-heart'],
    monsterType: 'storm-giant',
    height: 600,
    weight: 200,
    series: 2,
  },
  {
    id: 's2-crystal-griffin',
    name: 'Gemtalon',
    region: 'sky',
    rarity: 'rare',
    description:
      'Gemtalon banks across thermals like stained glass with opinions, crystal wings throwing prisms onto cloud decks. Diamond-beak clicks a rhythm only mountain winds answer; gem-claws leave scratch notes on cliff faces—mostly “I was here.” Majesty comes standard; humility sold separately.',
    robotParts: ['crystal-wings', 'gem-claws', 'diamond-beak'],
    monsterType: 'crystal-griffin',
    height: 280,
    weight: 180,
    series: 2,
  },
  {
    id: 's2-aurora-whale',
    name: 'Borealisk',
    region: 'sky',
    rarity: 'rare',
    description:
      'Borealisk swims currents thinner than water, aurora-skin painting the polar night in slow, luminous waves. Polar-heart pulses with geomagnetic gossip; light-spout releases curtains of color when it surfaces through cloud. Scientists call it atmospheric; poets call it unfair competition.',
    robotParts: ['aurora-skin', 'polar-heart', 'light-spout'],
    monsterType: 'aurora-whale',
    height: 1500,
    weight: 3500,
    series: 2,
  },
  {
    id: 's2-moon-moth',
    name: 'Lunawing',
    region: 'sky',
    rarity: 'rare',
    description:
      'Lunawing folds moonbeam-wings around skeptics until they remember how to whisper wishes. Lunar dust trails sparkle like breadcrumbs back to hope; wish-antenna tunes to sincerity, not volume. Clouds part on schedule; disbelief gets politely ignored.',
    robotParts: ['moonbeam-wings', 'lunar-dust', 'wish-antenna'],
    monsterType: 'moon-moth',
    height: 120,
    weight: 8,
    series: 2,
  },
  // Legendary (1)
  {
    id: 's2-sky-leviathan',
    name: 'Aethermaw',
    region: 'sky',
    rarity: 'legendary',
    description:
      'Aethermaw patrols the roof of the world, storm-stomach digesting hurricanes so farmland can sleep. Cloud-fins steer pressure systems like a conductor with teeth; atmosphere-core hums a barometer song only satellites fully hear. Lightning tastes spicy going down; it pretends not to notice.',
    robotParts: ['storm-stomach', 'cloud-fins', 'atmosphere-core'],
    monsterType: 'sky-leviathan',
    height: 2500,
    weight: 8000,
    series: 2,
  },
];

// ============================================================================
// SERIES 3 - Prehistoric Tech & Phantom Realm
// New unique types: Mecha-dinosaurs and Phantom/Ghost creatures
// ============================================================================

const SERIES_3_CREATURES: Creature[] = [
  // ==================== GRASSLAND CREATURES ====================
  // Common (8)
  {
    id: 's3-phantom-rabbit',
    name: 'Ghosthop',
    region: 'grassland',
    rarity: 'common',
    description:
      'Ghosthop flickers between worlds like a glitch with excellent manners, ectoplasm ears swiveling toward snacks both living and remembered. Phase-legs leave frost prints on grass that vanish if you doubt them—so don’t. It haunts meadows with hopscotch instead of horror.',
    robotParts: ['ecto-ears', 'phase-legs', 'spirit-fluff'],
    monsterType: 'phantom-rabbit',
    height: 30,
    weight: 0.1,
    series: 3,
  },
  {
    id: 's3-dino-beetle',
    name: 'Trilobot',
    region: 'grassland',
    rarity: 'common',
    description:
      'Trilobot crawled out of a museum label and demanded a software update, fossil shell polished by curiosity instead of time. Ancient sensors read dirt like a story; primitive legs still outrun doubt. It insists it is not history—it is a comeback tour.',
    robotParts: ['fossil-shell', 'ancient-sensors', 'primitive-legs'],
    monsterType: 'mecha-trilobite',
    height: 25,
    weight: 4.5,
    series: 3,
  },
  {
    id: 's3-ghost-flower',
    name: 'Spectrabloom',
    region: 'grassland',
    rarity: 'common',
    description:
      'Spectrabloom unfurls only when the moon approves, petals ghost-pollen drifting like whispered secrets. Spirit-stem roots in forgotten gardens; ghost-pollen glows where kindness was planted long ago. Sunlight makes it shy—moonlight makes it brave.',
    robotParts: ['petal-ecto', 'ghost-pollen', 'spirit-stem'],
    monsterType: 'phantom-flower',
    height: 35,
    weight: 0.05,
    series: 3,
  },
  {
    id: 's3-mini-raptor',
    name: 'Velocibyte',
    region: 'grassland',
    rarity: 'common',
    description:
      'Velocibyte runs algorithms faster than fear, cyber-claws tapping terrain maps mid-sprint. Hunt-AI prioritizes friendship over prey—mostly. When it stops to blink, the world catches up with a gasp.',
    robotParts: ['cyber-claws', 'speed-legs', 'hunt-AI'],
    monsterType: 'mecha-raptor',
    height: 60,
    weight: 18,
    series: 3,
  },
  {
    id: 's3-wisp-bug',
    name: 'Glimmergeist',
    region: 'grassland',
    rarity: 'common',
    description:
      'Glimmergeist drifts through twilight with spirit-glow dialed to “hopeful,” guiding lost souls and lost kids with the same patience. Phase-wings hum a frequency only the lonely hear clearly. It charges its light by listening.',
    robotParts: ['spirit-glow', 'phase-wings', 'guide-light'],
    monsterType: 'phantom-firefly',
    height: 8,
    weight: 0.01,
    series: 3,
  },
  {
    id: 's3-fossil-frog',
    name: 'Cretacehopper',
    region: 'grassland',
    rarity: 'common',
    description:
      'Cretacehopper thawed from amber with a croak and a warranty, ancient tongue flicking out bugs that were extinct until it missed. Fossil-hop lands with a slapstick thud; optimism oozes through amber-skin like honey. Museums want it back; the meadow wants it more.',
    robotParts: ['amber-skin', 'ancient-tongue', 'fossil-hop'],
    monsterType: 'ancient-frog',
    height: 20,
    weight: 1.5,
    series: 3,
  },
  {
    id: 's3-shade-snake',
    name: 'Spectherp',
    region: 'grassland',
    rarity: 'common',
    description:
      'Spectherp slides between here and almost-here, shadow-scales rippling like heat above asphalt. Dimension-rattle warns travelers before reality bends; phase-fangs nip at doubt, not skin. If you see two moons, it is probably waving hello.',
    robotParts: ['shadow-scales', 'phase-fangs', 'dimension-rattle'],
    monsterType: 'phantom-snake',
    height: 150,
    weight: 0.5,
    series: 3,
  },
  {
    id: 's3-dino-chick',
    name: 'Chickosaurus',
    region: 'grassland',
    rarity: 'common',
    description:
      'Chickosaurus is fluff and firmware—proto-feathers fuzzing every awkward step, chirp-speaker testing jokes on beetles. Tiny-claws tap out messages on logs: “I’m new, be nice.” The future looks adorable and slightly beeping.',
    robotParts: ['proto-feathers', 'tiny-claws', 'chirp-speaker'],
    monsterType: 'baby-dinosaur',
    height: 35,
    weight: 5,
    series: 3,
  },
  // Rare (4)
  {
    id: 's3-phantom-stag',
    name: 'Spectralbuck',
    region: 'grassland',
    rarity: 'rare',
    description:
      'Spectralbuck steps through fog like royalty visiting a dream, ecto-antlers casting constellations on the grass. Spirit-hooves leave no prints—only goosebumps. Phantom-heart beats loud enough for lost hikers to follow home.',
    robotParts: ['ecto-antlers', 'spirit-hooves', 'phantom-heart'],
    monsterType: 'phantom-stag',
    height: 200,
    weight: 15,
    series: 3,
  },
  {
    id: 's3-tricerabot',
    name: 'Tritanium',
    region: 'grassland',
    rarity: 'rare',
    description:
      'Tritanium charges with the sound of a forge falling in love, titanium horns tuned to ring instead of shatter. Armor-frill catches sunset like a satellite dish for courage; charge-legs leave trenches that become flower beds later. Diplomacy ends where the frill lowers.',
    robotParts: ['titanium-horns', 'armor-frill', 'charge-legs'],
    monsterType: 'mecha-triceratops',
    height: 350,
    weight: 6000,
    series: 3,
  },
  {
    id: 's3-ghost-treant',
    name: 'Hollowoak',
    region: 'grassland',
    rarity: 'rare',
    description:
      'Hollowoak rustles with voices older than trails, spirit-bark peeling stories instead of splinters. Ghost-roots grip soil memory; phantom-leaves warn travelers when storms borrow grudges. It protects not with roars—with shade and stubborn patience.',
    robotParts: ['spirit-bark', 'ghost-roots', 'phantom-leaves'],
    monsterType: 'phantom-treant',
    height: 500,
    weight: 50,
    series: 3,
  },
  {
    id: 's3-stego-tank',
    name: 'Stegotron',
    region: 'grassland',
    rarity: 'rare',
    description:
      'Stegotron harvests daylight on its back like a walking power plant with excellent posture. Solar plates tilt toward optimism; spike-tail signs autographs in sandstone—slowly. Herbivore ethics, tank energy.',
    robotParts: ['solar-plates', 'spike-tail', 'armor-body'],
    monsterType: 'mecha-stegosaurus',
    height: 400,
    weight: 4500,
    series: 3,
  },
  // Legendary (2)
  {
    id: 's3-spirit-king',
    name: 'Phantomarch',
    region: 'grassland',
    rarity: 'legendary',
    description:
      'Phantomarch wears crown-ecto like moonlight saved for coronations, royal-aura calming restless spirits before they fray. Peace-scepter taps once—arguments exhale. Meadows kneel without crunching; even wind lowers its voice.',
    robotParts: ['crown-ecto', 'royal-aura', 'peace-scepter'],
    monsterType: 'phantom-king',
    height: 380,
    weight: 5,
    series: 3,
  },
  {
    id: 's3-brachiobot',
    name: 'Titaneck',
    region: 'grassland',
    rarity: 'legendary',
    description:
      'Titaneck browses clouds like a crane built by giants, tower-neck lifting radar-head above predation and small talk. Titan-legs pace epochs; each step is a geography lesson. Birds nest in the shade of its patience.',
    robotParts: ['tower-neck', 'radar-head', 'titan-legs'],
    monsterType: 'mecha-brachiosaurus',
    height: 1500,
    weight: 35000,
    series: 3,
  },

  // ==================== COASTAL CREATURES ====================
  // Common (8)
  {
    id: 's3-ghost-fish',
    name: 'Spectralfin',
    region: 'coastal',
    rarity: 'common',
    description:
      'Spectralfin flickers through kelp like a secret you can almost read, ecto-scales refracting guilt out of water. Phase-fins steer by mood; spirit-gills breathe stories instead of oxygen. Predators bite through and get philosophy.',
    robotParts: ['ecto-scales', 'phase-fins', 'spirit-gills'],
    monsterType: 'phantom-fish',
    height: 30,
    weight: 0.1,
    series: 3,
  },
  {
    id: 's3-ammonite-bot',
    name: 'Spiralshell',
    region: 'coastal',
    rarity: 'common',
    description:
      'Spiralshell corkscrews through reefs with jet-siphon swagger, spiral-shell humming a math older than boats. Ancient eyes blink slow enough to memorize shipwrecks. It spirals up, down, and occasionally into poetry.',
    robotParts: ['spiral-shell', 'jet-siphon', 'ancient-eyes'],
    monsterType: 'mecha-ammonite',
    height: 80,
    weight: 25,
    series: 3,
  },
  {
    id: 's3-phantom-crab',
    name: 'Ghostpinch',
    region: 'coastal',
    rarity: 'common',
    description:
      'Ghostpinch sidesteps physics like a shellfish with a backstage pass, ecto-claws snipping seaweed and bad luck alike. Phantom-shell rattles a rhythm crabs dance to at midnight. Pinch first, explain dimensions later.',
    robotParts: ['ecto-claws', 'phantom-shell', 'spirit-legs'],
    monsterType: 'phantom-crab',
    height: 25,
    weight: 0.2,
    series: 3,
  },
  {
    id: 's3-dunkle-pup',
    name: 'Dunklebot',
    region: 'coastal',
    rarity: 'common',
    description:
      'Dunklebot grins with plate-head armor and jaws that sound like doors locking on the ocean’s secrets. Ancient fins steer with toddler enthusiasm; armor-jaws test everything—mostly “can this crunch?” Answer: probably.',
    robotParts: ['armor-jaws', 'plate-head', 'ancient-fins'],
    monsterType: 'mecha-placoderm',
    height: 120,
    weight: 85,
    series: 3,
  },
  {
    id: 's3-wraith-jellyfish',
    name: 'Spooksting',
    region: 'coastal',
    rarity: 'common',
    description:
      'Spooksting pulses like a lantern made of maybe, phantom-tentacles trailing through fish without ruffling scales. Ecto-bell rings soft warnings before tides turn weird. Sting is optional; vibe is mandatory.',
    robotParts: ['ecto-bell', 'phantom-tentacles', 'spirit-glow'],
    monsterType: 'phantom-jellyfish',
    height: 50,
    weight: 0.05,
    series: 3,
  },
  {
    id: 's3-sea-scorpion',
    name: 'Eurypteroid',
    region: 'coastal',
    rarity: 'common',
    description:
      'Eurypteroid stalks the shallows like a nightmare with good posture, fossil-pincers clicking promises the tide intends to keep. Armor-tail sweeps history aside; ancient eyes judge your boat shoes. Size says Mesozoic; attitude says now.',
    robotParts: ['fossil-pincers', 'armor-tail', 'ancient-eyes'],
    monsterType: 'mecha-eurypterid',
    height: 180,
    weight: 45,
    series: 3,
  },
  {
    id: 's3-ghost-eel',
    name: 'Phanteel',
    region: 'coastal',
    rarity: 'common',
    description:
      'Phanteel ribbons through wrecks, ecto-coils leaving static kisses on metal and courage. Spirit-shock tingles instead of burns—mostly. Phantom-slither hums lullabies for divers who forgot which way was up.',
    robotParts: ['ecto-coils', 'spirit-shock', 'phantom-slither'],
    monsterType: 'phantom-eel',
    height: 200,
    weight: 0.3,
    series: 3,
  },
  {
    id: 's3-nautilus-bot',
    name: 'Chambertron',
    region: 'coastal',
    rarity: 'common',
    description:
      'Chambertron cruises blue depths with chamber-shell acoustics fine enough to hear shrimp gossip. Jet-propulsion purrs; tentacle-arms wave like polite periscopes. Submarine cosplay, apex reality.',
    robotParts: ['chamber-shell', 'jet-propulsion', 'tentacle-arms'],
    monsterType: 'mecha-nautilus',
    height: 65,
    weight: 20,
    series: 3,
  },
  // Rare (4)
  {
    id: 's3-phantom-kraken',
    name: 'Ghostentacle',
    region: 'coastal',
    rarity: 'rare',
    description:
      'Ghostentacle wraps hulls in ecto-tentacles soft as regret, phantom-ink blotting sonar into ghost stories. Spirit-beak taps Morse on barnacles—mostly “go home.” Harbors feel colder when it passes; compasses spin like fans.',
    robotParts: ['ecto-tentacles', 'phantom-ink', 'spirit-beak'],
    monsterType: 'phantom-kraken',
    height: 400,
    weight: 20,
    series: 3,
  },
  {
    id: 's3-mega-shark',
    name: 'Megalobot',
    region: 'coastal',
    rarity: 'rare',
    description:
      'Megalobot slices through blue like a rumor with torque, mega-jaws auditioning for legends. Armor-skin shrugs off depth; hunt-sensors lock onto heartbeat before silhouette. The ocean leans out of its way.',
    robotParts: ['mega-jaws', 'armor-skin', 'hunt-sensors'],
    monsterType: 'mecha-megalodon',
    height: 1800,
    weight: 50000,
    series: 3,
  },
  {
    id: 's3-ship-ghost',
    name: 'Galleongeist',
    region: 'coastal',
    rarity: 'rare',
    description:
      'Galleongeist drifts where maps end, spectral-hull creaking with songs no living crew remembers. Ghost-sails belly with winds from other centuries; phantom-crew waves without faces—still polite. Harbors smell like salt and unfinished business.',
    robotParts: ['spectral-hull', 'ghost-sails', 'phantom-crew'],
    monsterType: 'ghost-ship',
    height: 800,
    weight: 100,
    series: 3,
  },
  {
    id: 's3-plesio-sub',
    name: 'Plesiotron',
    region: 'coastal',
    rarity: 'rare',
    description:
      'Plesiotron cruises abyssal malls with sonar-neck scanning bargains and monsters alike. Flipper-props churn silence; deep-armor shrugs at pressure like a coat. Nessie’s cooler cousin with a periscope habit.',
    robotParts: ['sonar-neck', 'flipper-props', 'deep-armor'],
    monsterType: 'mecha-plesiosaur',
    height: 1200,
    weight: 8000,
    series: 3,
  },
  // Legendary (1)
  {
    id: 's3-sea-phantom',
    name: 'Abyssalghast',
    region: 'coastal',
    rarity: 'legendary',
    description:
      'Abyssalghast wears depth-crown darkness like velvet, abyss-ecto trailing through trenches where light files complaints. Spirit-trident taps currents into obedience; fish bow without knowing why. Surface storms are its echoes clearing their throat.',
    robotParts: ['abyss-ecto', 'depth-crown', 'spirit-trident'],
    monsterType: 'sea-phantom-lord',
    height: 2000,
    weight: 50,
    series: 3,
  },

  // ==================== LAVA CREATURES ====================
  // Common (7)
  {
    id: 's3-solar-wisp',
    name: 'Sunsprite',
    region: 'lava',
    rarity: 'common',
    description:
      'Sunsprite spins ember choreography above vents, solar-core humming lullabies hot enough to toast marshmallows midair. Flame-trail sketches doodles only magma reads. It insists volcanoes are just shy stars.',
    robotParts: ['solar-core', 'heat-glow', 'flame-trail'],
    monsterType: 'solar-wisp',
    height: 25,
    weight: 0.01,
    series: 3,
  },
  {
    id: 's3-basalt-golem',
    name: 'Rockforge',
    region: 'lava',
    rarity: 'common',
    description:
      'Rockforge stands like patience carved from basalt, lava-veins pulsing when the mountain shares gossip. Stone-fists knock politely before rearranging boulders. Earthquakes ask permission; it rarely grants it.',
    robotParts: ['basalt-body', 'lava-veins', 'stone-fists'],
    monsterType: 'basalt-golem',
    height: 180,
    weight: 800,
    series: 3,
  },
  {
    id: 's3-lava-slug',
    name: 'Magmaslug',
    region: 'lava',
    rarity: 'common',
    description:
      'Magmaslug oozes patience and pyroclasm, heat-slime cooling just enough to not melt your boots—usually. Glow-trail marks safe passage for fire sprites who cannot read maps. Slow, shiny, unstoppable.',
    robotParts: ['lava-body', 'heat-slime', 'glow-trail'],
    monsterType: 'lava-slug',
    height: 30,
    weight: 15,
    series: 3,
  },
  {
    id: 's3-vent-worm',
    name: 'Steamworm',
    region: 'lava',
    rarity: 'common',
    description:
      'Steamworm commutes through vents like a subway made of heat, vent-gills whistling spa-day satisfaction. Heat-segments expand when pressure drops jokes. Geologists take samples; it takes naps.',
    robotParts: ['heat-segments', 'vent-gills', 'steam-body'],
    monsterType: 'vent-worm',
    height: 60,
    weight: 8,
    series: 3,
  },
  {
    id: 's3-flame-moth',
    name: 'Emberwing',
    region: 'lava',
    rarity: 'common',
    description:
      'Emberwing beats wings of living flame that warm faces without scorching hope, fire-dust drifting like cinnamon snow. Heat-antennae taste moods; it lands on brave shoulders first. Moths usually chase light—this one delivers it.',
    robotParts: ['flame-wings', 'heat-antennae', 'fire-dust'],
    monsterType: 'flame-moth',
    height: 15,
    weight: 0.2,
    series: 3,
  },
  {
    id: 's3-boiling-blob',
    name: 'Bubblava',
    region: 'lava',
    rarity: 'common',
    description:
      'Bubblava chuckles deep underground, magma-body percolating jokes only seismographs catch. Bubble-core pops rhythmically—Earth’s kettle finally whistling. Approach for warmth; leave your worries—they melt faster than shoes.',
    robotParts: ['magma-body', 'bubble-core', 'heat-goo'],
    monsterType: 'boiling-blob',
    height: 50,
    weight: 40,
    series: 3,
  },
  {
    id: 's3-glass-shard',
    name: 'Obsidling',
    region: 'lava',
    rarity: 'common',
    description:
      'Obsidling gleams like midnight sharpened, glass-spikes catching firelight without cutting kindness. Prism-core bends rainbows through obsidian—pretty, pointed, oddly sincere. Hug with care; compliments are safer.',
    robotParts: ['obsidian-body', 'glass-spikes', 'prism-core'],
    monsterType: 'glass-shard',
    height: 35,
    weight: 12,
    series: 3,
  },
  // Rare (4)
  {
    id: 's3-volcano-phantom',
    name: 'Eruptgeist',
    region: 'lava',
    rarity: 'rare',
    description:
      'Eruptgeist shoulders ash like a cloak stitched from every eruption ever whispered about. Volcano-ecto trembles before lava-crown speaks; eruption-spirit clears grudges like weather. Villages downwind learn respect; poets learn metaphors.',
    robotParts: ['volcano-ecto', 'eruption-spirit', 'lava-crown'],
    monsterType: 'volcano-phantom',
    height: 500,
    weight: 10,
    series: 3,
  },
  {
    id: 's3-rex-supreme',
    name: 'Tyrannotron',
    region: 'lava',
    rarity: 'rare',
    description:
      'Tyrannotron stomps timelines flat, plasma-jaws painting noon brighter than the sun agreed to. Titan-legs crack concrete and excuses; roar-amplifier files noise complaints against thunder. Crown optional; dominance included.',
    robotParts: ['plasma-jaws', 'titan-legs', 'roar-amplifier'],
    monsterType: 'mecha-tyrannosaurus',
    height: 600,
    weight: 9000,
    series: 3,
  },
  {
    id: 's3-phoenix-ghost',
    name: 'Spiritnix',
    region: 'lava',
    rarity: 'rare',
    description:
      'Spiritnix collapses into ashes that still applaud, ecto-flames cool enough to haunt but hot enough to hope. Rebirth-spirit loops until courage sticks; ash-wings scatter encouragement like snow. Every ending is a dress rehearsal.',
    robotParts: ['ecto-flames', 'rebirth-spirit', 'ash-wings'],
    monsterType: 'phantom-phoenix',
    height: 200,
    weight: 2,
    series: 3,
  },
  {
    id: 's3-allo-hunter',
    name: 'Allorazer',
    region: 'lava',
    rarity: 'rare',
    description:
      'Allorazer hunts in packs synced by pack-link whispers, razor-claws etching warnings into stone before flesh notices. Heat-vision spots fear first—fairness second. Jurassic muscle, modern precision.',
    robotParts: ['razor-claws', 'heat-vision', 'pack-link'],
    monsterType: 'mecha-allosaurus',
    height: 450,
    weight: 2500,
    series: 3,
  },
  // Legendary (1)
  {
    id: 's3-inferno-lord',
    name: 'Blazephantom',
    region: 'lava',
    rarity: 'legendary',
    description:
      'Blazephantom wears inferno-ecto like a coronation robe, flame-crown sparking oaths from every candle in range. Fire-scepter points; embers kneel. Heat obeys before it understands why; humans bring marshmallows just in case.',
    robotParts: ['inferno-ecto', 'flame-crown', 'fire-scepter'],
    monsterType: 'fire-phantom-lord',
    height: 800,
    weight: 25,
    series: 3,
  },

  // ==================== CITY CREATURES ====================
  // Common (8)
  {
    id: 's3-arcade-ghost',
    name: 'Pixelgeist',
    region: 'city',
    rarity: 'common',
    description:
      'Pixelgeist flickers between cabinets, pixel-ecto leaving high-score ghosts where thumbs used to burn. Game-spirit hums 8-bit hymns; coin-aura makes loose change roll toward pizza. Insert token for nostalgia; boss fights optional.',
    robotParts: ['pixel-ecto', 'game-spirit', 'coin-aura'],
    monsterType: 'arcade-phantom',
    height: 120,
    weight: 0.1,
    series: 3,
  },
  {
    id: 's3-concrete-fossil',
    name: 'Sidewalker',
    region: 'city',
    rarity: 'common',
    description:
      'Sidewalker stretches concrete-bones until cracks look like smiles, urban-shell collecting gum and legends with equal patience. Sidewalk-feet pace blocks slower than traffic but surer than GPS. Every step is a geology pun.',
    robotParts: ['concrete-bones', 'urban-shell', 'sidewalk-feet'],
    monsterType: 'concrete-fossil',
    height: 80,
    weight: 200,
    series: 3,
  },
  {
    id: 's3-neon-phantom',
    name: 'Signspook',
    region: 'city',
    rarity: 'common',
    description:
      'Signspook nests in buzzing glass, neon-ecto spelling words the city almost says out loud. Light-spirit syncs to bass from passing cars; buzz-aura makes hair stand like fans at a concert. Open late; emotions extra.',
    robotParts: ['neon-ecto', 'light-spirit', 'buzz-aura'],
    monsterType: 'neon-phantom',
    height: 100,
    weight: 0.05,
    series: 3,
  },
  {
    id: 's3-steam-bot',
    name: 'Pipesteam',
    region: 'city',
    rarity: 'common',
    description:
      'Pipesteam huffs gratitude through brass valves, steam-engine heart ticking like a grandfather clock with deadlines. Pipe-arms tighten leaks; whistle-head announces arrivals the internet forgot. Steampunk stubbornness, downtown loyalty.',
    robotParts: ['steam-engine', 'pipe-arms', 'whistle-head'],
    monsterType: 'steam-bot',
    height: 150,
    weight: 180,
    series: 3,
  },
  {
    id: 's3-holo-owl',
    name: 'Glitchowl',
    region: 'city',
    rarity: 'common',
    description:
      'Glitchowl patrols rooftops in ribbons of light, holo-feathers glitching when truth gets too sharp. Laser-eyes log kindness and litter with equal weight; data-wings beat silent as notifications. Night shift forever; coffee symbolic.',
    robotParts: ['holo-feathers', 'laser-eyes', 'data-wings'],
    monsterType: 'holo-owl',
    height: 45,
    weight: 0.01,
    series: 3,
  },
  {
    id: 's3-sonar-bat',
    name: 'Echowing',
    region: 'city',
    rarity: 'common',
    description:
      'Echowing maps alleys in clicks and warmth, echo-wings brushing fire escapes like piano keys. Sonar-ears filter sirens into lullabies—mostly. Radar-nose finds open windows and open hearts.',
    robotParts: ['sonar-ears', 'echo-wings', 'radar-nose'],
    monsterType: 'sonar-bat',
    height: 30,
    weight: 0.8,
    series: 3,
  },
  {
    id: 's3-power-grid',
    name: 'Gridling',
    region: 'city',
    rarity: 'common',
    description:
      'Gridling surfs voltage with spark-body laughter, wire-arms braiding blackouts back into rhythm. Volt-core hums harmony for streetlights that flicker shyly. Touch it once—your hair remembers forever.',
    robotParts: ['spark-body', 'wire-arms', 'volt-core'],
    monsterType: 'power-grid',
    height: 60,
    weight: 0.02,
    series: 3,
  },
  {
    id: 's3-error-sprite',
    name: 'Glitchkin',
    region: 'city',
    rarity: 'common',
    description:
      'Glitchkin pops from stack traces like confetti made of oops, crash-wings fluttering when saves fail heroically. Reboot-core forgives faster than users; error-body teaches patience one frozen screen at a time. Feature, not bug—unless it is.',
    robotParts: ['error-body', 'crash-wings', 'reboot-core'],
    monsterType: 'error-sprite',
    height: 20,
    weight: 0.001,
    series: 3,
  },
  // Rare (4)
  {
    id: 's3-train-phantom',
    name: 'Locomotgeist',
    region: 'city',
    rarity: 'rare',
    description:
      'Locomotgeist barrels on tracks that exist only on maps drawn by insomnia, train-ecto trailing steam-spirit whistles through empty stations. Track-phase lets it skip corners reality hoards. Last stop: wherever you left your courage.',
    robotParts: ['train-ecto', 'steam-spirit', 'track-phase'],
    monsterType: 'train-phantom',
    height: 400,
    weight: 50,
    series: 3,
  },
  {
    id: 's3-carno-cop',
    name: 'Carnoforce',
    region: 'city',
    rarity: 'rare',
    description:
      'Carnoforce patrols with siren-horns that mean business and joy, pursuit-legs eating pavement like a hungry meter. Justice-core weighs intent before speed; bad drivers get stared into better choices. Mirrored sunglasses sold separately.',
    robotParts: ['siren-horns', 'pursuit-legs', 'justice-core'],
    monsterType: 'mecha-carnotaurus',
    height: 400,
    weight: 2000,
    series: 3,
  },
  {
    id: 's3-theater-ghost',
    name: 'Phantomask',
    region: 'city',
    rarity: 'rare',
    description:
      'Phantomask haunts velvet curtains, mask-ecto shifting expressions faster than actors rehearse. Stage-spirit cues thunderous applause from empty seats; spotlight-aura demands one bow minimum. Drama is oxygen; intermission is myth.',
    robotParts: ['mask-ecto', 'stage-spirit', 'spotlight-aura'],
    monsterType: 'theater-phantom',
    height: 250,
    weight: 5,
    series: 3,
  },
  {
    id: 's3-urban-raptor',
    name: 'Parkouraptor',
    region: 'city',
    rarity: 'rare',
    description:
      'Parkouraptor treats skylines as jungle gyms, grip-claws finding purchase on brick and doubt. Jump-jets cheat gravity politely; wall-sensors read angles like poetry. Parkour videos study it; knees envy it.',
    robotParts: ['grip-claws', 'jump-jets', 'wall-sensors'],
    monsterType: 'parkour-raptor',
    height: 200,
    weight: 120,
    series: 3,
  },
  // Legendary (1)
  {
    id: 's3-city-specter',
    name: 'Metropolgeist',
    region: 'city',
    rarity: 'legendary',
    description:
      'Metropolgeist inhales memories from subway tiles, crowd-ecto whispering secrets to anyone who slows down enough. City-memory stitches generations together; history-core hums under every manhole. It knows your favorite pizza topping; it does not judge—much.',
    robotParts: ['city-memory', 'crowd-ecto', 'history-core'],
    monsterType: 'city-phantom-lord',
    height: 600,
    weight: 1,
    series: 3,
  },

  // ==================== SKY CREATURES ====================
  // Common (8)
  {
    id: 's3-aurora-wisp',
    name: 'Aurorakin',
    region: 'sky',
    rarity: 'common',
    description:
      'Aurorakin stitches curtains across the polar dark, aurora-glow trailing fingerprints only compasses feel. Polar-core pulses with magnetic gossip; light-trail hums when night needs encouragement. Daytime naps; midnight headlines.',
    robotParts: ['aurora-glow', 'polar-core', 'light-trail'],
    monsterType: 'aurora-wisp',
    height: 30,
    weight: 0.01,
    series: 3,
  },
  {
    id: 's3-moon-moth',
    name: 'Lunamoth',
    region: 'sky',
    rarity: 'common',
    description:
      'Lunamoth unfurls silver wings that borrow shine instead of stealing it, moon-antennae tuning to lullabies hummed by tides. Silver-dust falls like polite snow; insomniacs thank it in journals. Strictly nocturnal—daylight is for moths with simpler jobs.',
    robotParts: ['lunar-wings', 'moon-antennae', 'silver-dust'],
    monsterType: 'moon-moth',
    height: 25,
    weight: 0.3,
    series: 3,
  },
  {
    id: 's3-strato-sphinx',
    name: 'Skysphynx',
    region: 'sky',
    rarity: 'common',
    description:
      'Skysphynx lounges on jet streams, wing-mane ruffling like flags no country owns. Riddle-core trades answers for humility; cloud-body reshapes when winds change their mind. Wrong guesses get gentle lightning—mostly metaphor.',
    robotParts: ['cloud-body', 'wing-mane', 'riddle-core'],
    monsterType: 'strato-sphinx',
    height: 200,
    weight: 400,
    series: 3,
  },
  {
    id: 's3-jet-rider',
    name: 'Streakwing',
    region: 'sky',
    rarity: 'common',
    description:
      'Streakwing stitches contrails into finish lines, jet-fins slicing air like a racer who forgot brakes exist. Stream-sensors read slipstreams as sheet music; speed-body vibrates with happy danger. Second place is a cloud.',
    robotParts: ['jet-fins', 'speed-body', 'stream-sensors'],
    monsterType: 'jet-rider',
    height: 80,
    weight: 12,
    series: 3,
  },
  {
    id: 's3-cosmic-dust',
    name: 'Stardust',
    region: 'sky',
    rarity: 'common',
    description:
      'Stardust drifts from orbit with cosmic-glow modesty, space-particles humming lullabies older than telescopes. Dust-body clings to wishes until they find owners; sparkles are punctuation. Make a wish—it probably already heard you.',
    robotParts: ['dust-body', 'cosmic-glow', 'space-particles'],
    monsterType: 'cosmic-dust',
    height: 15,
    weight: 0.001,
    series: 3,
  },
  {
    id: 's3-rainbow-owl',
    name: 'Prismowl',
    region: 'sky',
    rarity: 'common',
    description:
      'Prismowl throws rainbows like confetti with purpose, prism-eyes judging saturation before takeoff. Color-wings trail gradients only storms imitate badly. Night gets a pride parade; stars apply for cameos.',
    robotParts: ['rainbow-feathers', 'prism-eyes', 'color-wings'],
    monsterType: 'rainbow-owl',
    height: 40,
    weight: 2,
    series: 3,
  },
  {
    id: 's3-hail-hopper',
    name: 'Frosthop',
    region: 'sky',
    rarity: 'common',
    description:
      'Frosthop parkours hailstorms like a pinball with attitude, ice-legs ricocheting between frozen notes. Frost-body leaves glitter where panic fled; hail-core conducts percussion only winter applauds. Bring a coat; bring bravery.',
    robotParts: ['ice-legs', 'frost-body', 'hail-core'],
    monsterType: 'hail-hopper',
    height: 20,
    weight: 0.5,
    series: 3,
  },
  {
    id: 's3-sky-whale',
    name: 'Cloudwhale',
    region: 'sky',
    rarity: 'common',
    description:
      'Cloudwhale breaches cumulus with song-core harmonies that make rain reconsider its timing. Sky-blowhole mists rainbows; cloud-fins steer storms around picnics—usually. Thunder is backup vocals; lightning is stage fright.',
    robotParts: ['cloud-fins', 'sky-blowhole', 'song-core'],
    monsterType: 'sky-whale',
    height: 800,
    weight: 2000,
    series: 3,
  },
  // Rare (4)
  {
    id: 's3-moon-phantom',
    name: 'Lunageist',
    region: 'sky',
    rarity: 'rare',
    description:
      'Lunageist drapes lunar-ecto across constellations like curtains for shy stars, dream-spirit slipping through windows already cracked open. Moon-glow fills sleepers with plots worth waking for; nightmares get politely redirected. Insomnia files complaints; the moon ignores them.',
    robotParts: ['lunar-ecto', 'dream-spirit', 'moon-glow'],
    monsterType: 'lunar-phantom',
    height: 300,
    weight: 3,
    series: 3,
  },
  {
    id: 's3-quetz-carrier',
    name: 'Quetzalcraft',
    region: 'sky',
    rarity: 'rare',
    description:
      'Quetzalcraft hauls hangar-body silhouettes across jet streams, mega-wings casting stadium shadows on cloud decks below. Carrier-back launches drones that wave before diving—manners matter at Mach silly. Air traffic control sends emojis; it replies in thermals.',
    robotParts: ['carrier-back', 'mega-wings', 'hangar-body'],
    monsterType: 'mecha-quetzalcoatlus',
    height: 1000,
    weight: 25000,
    series: 3,
  },
  {
    id: 's3-comet-specter',
    name: 'Cometwraith',
    region: 'sky',
    rarity: 'rare',
    description:
      'Cometwraith stitches night with comet-ecto vapor, tail-spirit brushing frost onto wishes mid-flight. Cosmic-ice crackles when it banks—soundtrack for shooting stars that forgot to burn out. Astronomers debate; poets win.',
    robotParts: ['comet-ecto', 'tail-spirit', 'cosmic-ice'],
    monsterType: 'comet-phantom',
    height: 500,
    weight: 10,
    series: 3,
  },
  {
    id: 's3-ptero-titan',
    name: 'Skywarden',
    region: 'sky',
    rarity: 'rare',
    description:
      'Skywarden circles the ceiling of the world, guardian-wings eclipsing satellites that lean too curious. Watch-eyes log every contrail; patrol-beak taps warnings into wind shears. Upper atmosphere pays rent in respect; storms knock first.',
    robotParts: ['guardian-wings', 'watch-eyes', 'patrol-beak'],
    monsterType: 'titan-pterosaur',
    height: 1200,
    weight: 2000,
    series: 3,
  },
  // Legendary (1)
  {
    id: 's3-sky-spirit',
    name: 'Aethergeist',
    region: 'sky',
    rarity: 'legendary',
    description:
      'Aethergeist wears sky-crown weather like regalia, cloud-scepter conducting auroras and arguments between flocks. Wind-throne hums where jet streams kneel; aerial spirits clock in for shifts they cannot refuse. Dinosaurs look up and remember who owns the blue.',
    robotParts: ['sky-crown', 'cloud-scepter', 'wind-throne'],
    monsterType: 'sky-phantom-lord',
    height: 2000,
    weight: 100,
    series: 3,
  },
];

// ============================================================================
// MYTHIC CREATURES - Requires ALL series to be completed
// ============================================================================

const MYTHIC_BINSTERS: Creature = {
  id: 'binsters-claymars',
  name: 'Binsters Claymars',
  region: 'all',
  rarity: 'mythic',
  description: 'The legendary six-headed dragon of perfect dental hygiene! Each head represents a different brushing zone. Only reveals itself to true masters who have befriended every creature across all dimensions!',
  robotParts: ['six-dragon-heads', 'clay-body', 'rainbow-belly', 'golden-horns', 'ultimate-core'],
  monsterType: 'hydra-dragon',
  height: 2500,
  weight: 18000,
  series: 1,
  requiresAllCreatures: true,
};

const MYTHIC_FOLIAPE: Creature = {
  id: 'leaf-kong',
  name: 'Foliape',
  region: 'all',
  rarity: 'mythic',
  description: 'The ultimate nature guardian! This colossal forest ape commands the power of all seasons. His autumn leaf crown channels ancient forest magic, and his living leaf armor regenerates endlessly. Only appears to those who have proven themselves as true protectors of all creatures!',
  robotParts: ['autumn-crown', 'leaf-armor', 'vine-muscles', 'photosynthesis-core', 'forest-heart'],
  monsterType: 'nature-titan-gorilla',
  height: 800,
  weight: 2500,
  series: 1,
  requiresAllCreatures: true,
};

const MYTHIC_CREATURES: Creature[] = [MYTHIC_BINSTERS, MYTHIC_FOLIAPE];

// Combined list of all creatures
export const ALL_CREATURES: Creature[] = [
  ...SERIES_1_CREATURES,
  ...SERIES_2_CREATURES,
  ...SERIES_3_CREATURES,
  ...SERIES_4_CREATURES,
  ...SERIES_5_CREATURES,
  ...SERIES_6_CREATURES,
  ...MYTHIC_CREATURES,
];

// Helper functions
export function getCreaturesBySeries(series: CreatureSeries): Creature[] {
  return ALL_CREATURES.filter(c => c.series === series && c.rarity !== 'mythic');
}

export function getSeriesCreatureCount(series: CreatureSeries): number {
  return getCreaturesBySeries(series).length;
}

export function isSeriesComplete(series: CreatureSeries, capturedIds: string[]): boolean {
  const seriesCreatures = getCreaturesBySeries(series);
  return seriesCreatures.every(c => capturedIds.includes(c.id));
}

export function getUnlockedSeries(capturedIds: string[]): CreatureSeries[] {
  const unlockedSeries: CreatureSeries[] = [1];
  
  if (isSeriesComplete(1, capturedIds)) {
    unlockedSeries.push(2);
  }
  
  if (isSeriesComplete(2, capturedIds)) {
    unlockedSeries.push(3);
  }

  if (isSeriesComplete(3, capturedIds)) {
    unlockedSeries.push(4);
  }

  if (isSeriesComplete(4, capturedIds)) {
    unlockedSeries.push(5);
  }

  if (isSeriesComplete(5, capturedIds)) {
    unlockedSeries.push(6);
  }
  
  return unlockedSeries;
}

export function getCreaturesByRegion(region: Region): Creature[] {
  return ALL_CREATURES.filter(c => c.region === region);
}

export function getCreaturesByRarity(rarity: 'common' | 'rare' | 'legendary'): Creature[] {
  return ALL_CREATURES.filter(c => c.rarity === rarity);
}

export function getCreaturesByRegionAndRarity(region: Region, rarity: 'common' | 'rare' | 'legendary'): Creature[] {
  return ALL_CREATURES.filter(c => c.region === region && c.rarity === rarity);
}

export function getRandomCreatureForScore(
  score: number, 
  capturedIds: string[], 
  region?: Region
): Creature | null {
  const unlockedSeries = getUnlockedSeries(capturedIds);
  
  let pool: Creature[] = [];
  
  const filterByRegion = (creatures: Creature[]) => 
    region ? creatures.filter(c => c.region === region || c.region === 'all') : creatures;
  
  const filterBySeries = (creatures: Creature[]) =>
    creatures.filter(c => unlockedSeries.includes(c.series));
  
  const nonMythicCreatures = ALL_CREATURES.filter(c => c.rarity !== 'mythic');
  const mythicCreature = ALL_CREATURES.find(c => c.rarity === 'mythic');
  
  const allSeriesComplete = isSeriesComplete(1, capturedIds) && 
                            isSeriesComplete(2, capturedIds) && 
                            isSeriesComplete(3, capturedIds) &&
                            isSeriesComplete(4, capturedIds) &&
                            isSeriesComplete(5, capturedIds) &&
                            isSeriesComplete(6, capturedIds);
  const mythicAlreadyCaptured = mythicCreature && capturedIds.includes(mythicCreature.id);
  
  if (allSeriesComplete && !mythicAlreadyCaptured && score >= 95 && mythicCreature) {
    return mythicCreature;
  }
  
  const availableCreatures = filterBySeries(filterByRegion(nonMythicCreatures));
  
  if (score >= 90) {
    pool = [
      ...availableCreatures.filter(c => c.rarity === 'legendary'),
      ...availableCreatures.filter(c => c.rarity === 'rare'),
      ...availableCreatures.filter(c => c.rarity === 'common'),
    ];
  } else if (score >= 70) {
    pool = [
      ...availableCreatures.filter(c => c.rarity === 'rare'),
      ...availableCreatures.filter(c => c.rarity === 'common'),
    ];
  } else {
    pool = availableCreatures.filter(c => c.rarity === 'common');
  }
  
  pool = pool.filter(c => c.rarity !== 'mythic');
  
  // Duplicates only after every unlocked series is finished (global completion per series — not per region).
  const allUnlockedSeriesComplete = unlockedSeries.every(s => isSeriesComplete(s, capturedIds));
  if (allUnlockedSeriesComplete) {
    if (pool.length === 0) return null;
    return pool[Math.floor(Math.random() * pool.length)];
  }
  
  // Until then, prefer creatures not yet caught (no duplicates within incomplete series progression)
  let uncaptured = pool.filter(c => !capturedIds.includes(c.id));
  
  if (uncaptured.length === 0) {
    uncaptured = availableCreatures.filter(c => !capturedIds.includes(c.id));
  }
  
  if (uncaptured.length === 0) {
    uncaptured = filterBySeries(nonMythicCreatures).filter(c => !capturedIds.includes(c.id));
  }
  
  if (uncaptured.length === 0) return null;
  
  return uncaptured[Math.floor(Math.random() * uncaptured.length)];
}

export function getCaptureRate(score: number, rarity: 'common' | 'rare' | 'legendary' | 'mythic'): number {
  if (rarity === 'mythic') {
    return score >= 98 ? 1.0 : score >= 95 ? 0.75 : 0.5;
  }
  
  if (score >= 90) {
    return 1.0;
  } else if (score >= 76) {
    return 0.85;
  } else if (score >= 51) {
    return 0.70;
  } else if (score >= 31) {
    return 0.55;
  } else {
    return 0.40;
  }
}

export type BallType = 'red' | 'blue' | 'bee' | 'white' | 'master';

export function getBallType(score: number): BallType {
  if (score >= 90) {
    return 'master';
  } else if (score >= 76) {
    return 'white';
  } else if (score >= 51) {
    return 'bee';
  } else if (score >= 31) {
    return 'blue';
  } else {
    return 'red';
  }
}
