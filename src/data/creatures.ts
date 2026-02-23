import type { Creature, Region } from '../types';

export const ALL_CREATURES: Creature[] = [
  // ==================== GRASSLAND CREATURES ====================
  // Common (8)
  {
    id: 'gear-bunny',
    name: 'GearBunny',
    region: 'grassland',
    rarity: 'common',
    description: 'A clockwork rabbit that hops with perfectly timed gear movements!',
    robotParts: ['gear-ears', 'spring-legs', 'wind-up-tail'],
    monsterType: 'rabbit',
  },
  {
    id: 'mecha-moth',
    name: 'MechaMoth',
    region: 'grassland',
    rarity: 'common',
    description: 'Solar-powered wings let this moth fly day and night!',
    robotParts: ['solar-wings', 'LED-antennae', 'sensor-eyes'],
    monsterType: 'moth',
  },
  {
    id: 'vine-droid',
    name: 'VineDroid',
    region: 'grassland',
    rarity: 'common',
    description: 'A plant monster with circuit-board leaves and fiber-optic vines!',
    robotParts: ['circuit-leaves', 'fiber-vines', 'solar-flower'],
    monsterType: 'plant',
  },
  {
    id: 'robo-squirrel',
    name: 'RoboSquirrel',
    region: 'grassland',
    rarity: 'common',
    description: 'Stores acorns in its battery compartment for winter energy!',
    robotParts: ['battery-cheeks', 'propeller-tail', 'scanner-eyes'],
    monsterType: 'squirrel',
  },
  {
    id: 'buzzer-bee',
    name: 'BuzzerBee',
    region: 'grassland',
    rarity: 'common',
    description: 'Makes digital honey that tastes like electricity!',
    robotParts: ['helicopter-wings', 'stinger-USB', 'hexagon-body'],
    monsterType: 'bee',
  },
  {
    id: 'pixel-fawn',
    name: 'PixelFawn',
    region: 'grassland',
    rarity: 'common',
    description: 'A young deer with spots that display different emojis!',
    robotParts: ['LED-spots', 'antenna-ears', 'spring-hooves'],
    monsterType: 'deer',
  },
  {
    id: 'sprocket-snail',
    name: 'SprocketSnail',
    region: 'grassland',
    rarity: 'common',
    description: 'Slow but steady, leaves a trail of sparkly oil!',
    robotParts: ['gear-shell', 'slime-coolant', 'eye-stalks'],
    monsterType: 'snail',
  },
  {
    id: 'flutter-bot',
    name: 'FlutterBot',
    region: 'grassland',
    rarity: 'common',
    description: 'A butterfly with holographic wings that change colors!',
    robotParts: ['holo-wings', 'nectar-scanner', 'micro-jets'],
    monsterType: 'butterfly',
  },
  // Rare (4)
  {
    id: 'thunder-stag',
    name: 'ThunderStag',
    region: 'grassland',
    rarity: 'rare',
    description: 'Lightning crackles between its magnificent antenna-antlers!',
    robotParts: ['tesla-antlers', 'chrome-hooves', 'capacitor-heart'],
    monsterType: 'stag',
  },
  {
    id: 'bloom-guardian',
    name: 'BloomGuardian',
    region: 'grassland',
    rarity: 'rare',
    description: 'A gentle giant that protects the digital forest!',
    robotParts: ['flower-sensors', 'bark-armor', 'root-cables'],
    monsterType: 'treant',
  },
  {
    id: 'prism-fox',
    name: 'PrismFox',
    region: 'grassland',
    rarity: 'rare',
    description: 'Its rainbow tail can split light into data streams!',
    robotParts: ['prism-tail', 'laser-eyes', 'stealth-paws'],
    monsterType: 'fox',
  },
  {
    id: 'echo-owl',
    name: 'EchoOwl',
    region: 'grassland',
    rarity: 'rare',
    description: 'Uses sonar to navigate and sing beautiful digital songs!',
    robotParts: ['radar-dish-face', 'silent-rotors', 'night-vision'],
    monsterType: 'owl',
  },
  // Legendary (1)
  {
    id: 'natura-prime',
    name: 'NaturaPrime',
    region: 'grassland',
    rarity: 'legendary',
    description: 'The ancient guardian of all grassland creatures, born from the first seed and the first circuit!',
    robotParts: ['world-tree-core', 'season-modulators', 'life-generators'],
    monsterType: 'nature-titan',
  },

  // ==================== COASTAL CREATURES ====================
  // Common (8)
  {
    id: 'turbo-turtle',
    name: 'TurboTurtle',
    region: 'coastal',
    rarity: 'common',
    description: 'Jet engines on its shell make this turtle surprisingly fast!',
    robotParts: ['jet-shell', 'flipper-props', 'periscope-head'],
    monsterType: 'turtle',
  },
  {
    id: 'crank-crab',
    name: 'CrankCrab',
    region: 'coastal',
    rarity: 'common',
    description: 'Hydraulic claws that can crush anything... gently!',
    robotParts: ['hydraulic-claws', 'tank-treads', 'bubble-blaster'],
    monsterType: 'crab',
  },
  {
    id: 'wave-bot',
    name: 'WaveBot',
    region: 'coastal',
    rarity: 'common',
    description: 'A friendly fish with sonar that finds lost treasures!',
    robotParts: ['sonar-array', 'propeller-tail', 'depth-gauge'],
    monsterType: 'fish',
  },
  {
    id: 'pearl-pup',
    name: 'PearlPup',
    region: 'coastal',
    rarity: 'common',
    description: 'A seal pup that produces synthetic pearls from its nose!',
    robotParts: ['pearl-maker', 'flipper-jets', 'whisker-sensors'],
    monsterType: 'seal',
  },
  {
    id: 'coral-crawler',
    name: 'CoralCrawler',
    region: 'coastal',
    rarity: 'common',
    description: 'Helps rebuild reefs with its 3D-printing tentacles!',
    robotParts: ['printer-tentacles', 'mineral-scanner', 'glow-tips'],
    monsterType: 'octopus',
  },
  {
    id: 'shell-shock',
    name: 'ShellShock',
    region: 'coastal',
    rarity: 'common',
    description: 'An electric hermit crab in a high-tech shell home!',
    robotParts: ['smart-shell', 'shock-claws', 'wifi-antenna'],
    monsterType: 'hermit-crab',
  },
  {
    id: 'foam-flounder',
    name: 'FoamFlounder',
    region: 'coastal',
    rarity: 'common',
    description: 'Flat as a pancake but full of bubbly personality!',
    robotParts: ['hover-fins', 'camo-skin', 'sand-jets'],
    monsterType: 'flounder',
  },
  {
    id: 'anchor-pony',
    name: 'AnchorPony',
    region: 'coastal',
    rarity: 'common',
    description: 'A seahorse that can anchor itself in any current!',
    robotParts: ['magnetic-tail', 'stabilizer-fins', 'compass-snout'],
    monsterType: 'seahorse',
  },
  // Rare (4)
  {
    id: 'storm-ray',
    name: 'StormRay',
    region: 'coastal',
    rarity: 'rare',
    description: 'Glides through storms and channels lightning through its wings!',
    robotParts: ['wing-capacitors', 'storm-sensors', 'electric-tail'],
    monsterType: 'manta-ray',
  },
  {
    id: 'kraken-kit',
    name: 'KrakenKit',
    region: 'coastal',
    rarity: 'rare',
    description: 'A baby kraken with adorable mechanical tentacles!',
    robotParts: ['grapple-tentacles', 'ink-jets', 'depth-crusher'],
    monsterType: 'kraken',
  },
  {
    id: 'siren-synth',
    name: 'SirenSynth',
    region: 'coastal',
    rarity: 'rare',
    description: 'Sings synthesized songs that dolphins love!',
    robotParts: ['voice-modulator', 'scale-LEDs', 'sonic-fins'],
    monsterType: 'mermaid',
  },
  {
    id: 'tide-titan',
    name: 'TideTitan',
    region: 'coastal',
    rarity: 'rare',
    description: 'Controls the waves with its hydraulic arms!',
    robotParts: ['wave-generators', 'pressure-suit', 'current-jets'],
    monsterType: 'water-elemental',
  },
  // Legendary (1)
  {
    id: 'ocean-emperor',
    name: 'OceanEmperor',
    region: 'coastal',
    rarity: 'legendary',
    description: 'The majestic ruler of all digital seas, part whale, part submarine, all awesome!',
    robotParts: ['sonar-crown', 'reactor-heart', 'tidal-thrusters'],
    monsterType: 'leviathan',
  },

  // ==================== LAVA CREATURES ====================
  // Common (8)
  {
    id: 'magma-core',
    name: 'MagmaCore',
    region: 'lava',
    rarity: 'common',
    description: 'A golem with a nuclear reactor heart that glows orange!',
    robotParts: ['reactor-core', 'heat-vents', 'lava-veins'],
    monsterType: 'golem',
  },
  {
    id: 'pyro-gecko',
    name: 'PyroGecko',
    region: 'lava',
    rarity: 'common',
    description: 'Scurries across lava like it tickles its feet!',
    robotParts: ['heat-pads', 'flame-tongue', 'thermal-tail'],
    monsterType: 'gecko',
  },
  {
    id: 'ember-mech',
    name: 'EmberMech',
    region: 'lava',
    rarity: 'common',
    description: 'A tiny phoenix robot that reboots instead of dying!',
    robotParts: ['ignition-wings', 'ash-jets', 'rebirth-core'],
    monsterType: 'phoenix',
  },
  {
    id: 'forge-hound',
    name: 'ForgeHound',
    region: 'lava',
    rarity: 'common',
    description: 'A loyal dog that was born in a volcano factory!',
    robotParts: ['furnace-belly', 'metal-fangs', 'smoke-tail'],
    monsterType: 'hound',
  },
  {
    id: 'cinder-snake',
    name: 'CinderSnake',
    region: 'lava',
    rarity: 'common',
    description: 'Slithers through magma tubes delivering messages!',
    robotParts: ['heat-scales', 'drill-head', 'exhaust-rattle'],
    monsterType: 'snake',
  },
  {
    id: 'slag-slime',
    name: 'SlagSlime',
    region: 'lava',
    rarity: 'common',
    description: 'A metallic slime that eats volcanic rocks for breakfast!',
    robotParts: ['molten-body', 'mineral-detector', 'heat-sink'],
    monsterType: 'slime',
  },
  {
    id: 'coal-critter',
    name: 'CoalCritter',
    region: 'lava',
    rarity: 'common',
    description: 'Glows brighter the happier it gets!',
    robotParts: ['ember-eyes', 'carbon-shell', 'spark-plugs'],
    monsterType: 'coal-creature',
  },
  {
    id: 'blast-bat',
    name: 'BlastBat',
    region: 'lava',
    rarity: 'common',
    description: 'Navigates cave systems using thermal imaging!',
    robotParts: ['thermal-sonar', 'jet-wings', 'heat-shield'],
    monsterType: 'bat',
  },
  // Rare (4)
  {
    id: 'volcano-drake',
    name: 'VolcanoDrake',
    region: 'lava',
    rarity: 'rare',
    description: 'A young dragon with rocket boosters for wings!',
    robotParts: ['rocket-wings', 'plasma-breath', 'armored-scales'],
    monsterType: 'dragon',
  },
  {
    id: 'obsidian-knight',
    name: 'ObsidianKnight',
    region: 'lava',
    rarity: 'rare',
    description: 'A warrior forged from volcanic glass and steel!',
    robotParts: ['glass-armor', 'magma-sword', 'heat-shield'],
    monsterType: 'knight',
  },
  {
    id: 'inferno-djinn',
    name: 'InfernoDjinn',
    region: 'lava',
    rarity: 'rare',
    description: 'Grants wishes... if they involve fire or explosions!',
    robotParts: ['flame-core', 'smoke-generator', 'wish-processor'],
    monsterType: 'djinn',
  },
  {
    id: 'molten-mammoth',
    name: 'MoltenMammoth',
    region: 'lava',
    rarity: 'rare',
    description: 'An ancient beast awakened by volcanic activity!',
    robotParts: ['lava-tusks', 'furnace-trunk', 'magma-hooves'],
    monsterType: 'mammoth',
  },
  // Legendary (1)
  {
    id: 'infernal-titan',
    name: 'InfernalTitan',
    region: 'lava',
    rarity: 'legendary',
    description: 'Born from the planets core, this titan IS the volcano! Speaks in eruptions!',
    robotParts: ['planetary-core', 'tectonic-arms', 'eruption-crown'],
    monsterType: 'fire-titan',
  },

  // ==================== CITY CREATURES ====================
  // Common (8)
  {
    id: 'neon-rat',
    name: 'NeonRat',
    region: 'city',
    rarity: 'common',
    description: 'Covered in LED strips, the coolest rat in the city!',
    robotParts: ['LED-fur', 'wire-tail', 'hacker-teeth'],
    monsterType: 'rat',
  },
  {
    id: 'holo-hound',
    name: 'HoloHound',
    region: 'city',
    rarity: 'common',
    description: 'A loyal dog that can project holograms from its collar!',
    robotParts: ['holo-projector', 'cyber-snout', 'data-collar'],
    monsterType: 'dog',
  },
  {
    id: 'glitch-cat',
    name: 'GlitchCat',
    region: 'city',
    rarity: 'common',
    description: 'Sometimes its face displays error messages when confused!',
    robotParts: ['screen-face', 'static-fur', 'USB-tail'],
    monsterType: 'cat',
  },
  {
    id: 'drone-pigeon',
    name: 'DronePigeon',
    region: 'city',
    rarity: 'common',
    description: 'Delivers packages and breadcrumbs across the city!',
    robotParts: ['rotor-wings', 'GPS-beak', 'cargo-feet'],
    monsterType: 'pigeon',
  },
  {
    id: 'trash-panda-bot',
    name: 'TrashPandaBot',
    region: 'city',
    rarity: 'common',
    description: 'A raccoon that sorts recycling with perfect efficiency!',
    robotParts: ['scanner-mask', 'grabber-paws', 'compactor-tail'],
    monsterType: 'raccoon',
  },
  {
    id: 'pixel-roach',
    name: 'PixelRoach',
    region: 'city',
    rarity: 'common',
    description: 'Unkillable, adorable, and surprisingly helpful!',
    robotParts: ['hardened-shell', 'antenna-wifi', 'survival-core'],
    monsterType: 'cockroach',
  },
  {
    id: 'subway-worm',
    name: 'SubwayWorm',
    region: 'city',
    rarity: 'common',
    description: 'Lives in the tunnels and knows every shortcut!',
    robotParts: ['tunnel-drill', 'track-wheels', 'light-segments'],
    monsterType: 'worm',
  },
  {
    id: 'vending-mimic',
    name: 'VendingMimic',
    region: 'city',
    rarity: 'common',
    description: 'Looks like a vending machine, gives out free snacks!',
    robotParts: ['dispenser-mouth', 'coin-eyes', 'snack-storage'],
    monsterType: 'mimic',
  },
  // Rare (4)
  {
    id: 'cyber-sphinx',
    name: 'CyberSphinx',
    region: 'city',
    rarity: 'rare',
    description: 'Asks riddles that require programming knowledge!',
    robotParts: ['riddle-processor', 'sphinx-sensors', 'data-wings'],
    monsterType: 'sphinx',
  },
  {
    id: 'neon-dragon',
    name: 'NeonDragon',
    region: 'city',
    rarity: 'rare',
    description: 'A serpentine dragon made of pure light and code!',
    robotParts: ['light-body', 'firework-breath', 'parade-float'],
    monsterType: 'dragon',
  },
  {
    id: 'billboard-beast',
    name: 'BillboardBeast',
    region: 'city',
    rarity: 'rare',
    description: 'A giant creature covered in animated advertisements!',
    robotParts: ['screen-skin', 'speaker-roar', 'spotlight-eyes'],
    monsterType: 'kaiju',
  },
  {
    id: 'data-phantom',
    name: 'DataPhantom',
    region: 'city',
    rarity: 'rare',
    description: 'A ghost in the machine, literally!',
    robotParts: ['hologram-body', 'virus-touch', 'firewall-cloak'],
    monsterType: 'ghost',
  },
  // Legendary (1)
  {
    id: 'metro-mind',
    name: 'MetroMind',
    region: 'city',
    rarity: 'legendary',
    description: 'The consciousness of the entire city! Knows everyones favorite pizza topping!',
    robotParts: ['city-brain', 'infrastructure-body', 'network-soul'],
    monsterType: 'city-spirit',
  },

  // ==================== SKY CREATURES ====================
  // Common (8)
  {
    id: 'propeller-pup',
    name: 'PropellerPup',
    region: 'sky',
    rarity: 'common',
    description: 'An adorable puppy with helicopter ears!',
    robotParts: ['rotor-ears', 'fluffy-jets', 'tail-rudder'],
    monsterType: 'puppy',
  },
  {
    id: 'cloud-crawler',
    name: 'CloudCrawler',
    region: 'sky',
    rarity: 'common',
    description: 'A spider that weaves webs between clouds!',
    robotParts: ['balloon-body', 'silk-cables', 'weather-sensors'],
    monsterType: 'spider',
  },
  {
    id: 'zephyr-bunny',
    name: 'ZephyrBunny',
    region: 'sky',
    rarity: 'common',
    description: 'Hops on air currents like invisible stairs!',
    robotParts: ['air-jets', 'wind-ears', 'bounce-stabilizers'],
    monsterType: 'bunny',
  },
  {
    id: 'nimbus-kitten',
    name: 'NimbusKitten',
    region: 'sky',
    rarity: 'common',
    description: 'A fluffy cloud cat that purrs like thunder!',
    robotParts: ['cloud-fur', 'lightning-whiskers', 'rain-paws'],
    monsterType: 'kitten',
  },
  {
    id: 'glider-squirrel',
    name: 'GliderSquirrel',
    region: 'sky',
    rarity: 'common',
    description: 'Has built-in parachutes for safe landings!',
    robotParts: ['wing-membranes', 'acorn-radar', 'air-brakes'],
    monsterType: 'flying-squirrel',
  },
  {
    id: 'breeze-bird',
    name: 'BreezeBird',
    region: 'sky',
    rarity: 'common',
    description: 'A songbird with voice synthesizers!',
    robotParts: ['speaker-beak', 'antenna-crest', 'solar-feathers'],
    monsterType: 'songbird',
  },
  {
    id: 'balloon-jellyfish',
    name: 'BalloonJelly',
    region: 'sky',
    rarity: 'common',
    description: 'Floats serenely and glows at night!',
    robotParts: ['helium-bell', 'LED-tentacles', 'altitude-sensors'],
    monsterType: 'jellyfish',
  },
  {
    id: 'kite-ray',
    name: 'KiteRay',
    region: 'sky',
    rarity: 'common',
    description: 'Rides wind currents like a living kite!',
    robotParts: ['sail-wings', 'string-tail', 'wind-reader'],
    monsterType: 'ray',
  },
  // Rare (4)
  {
    id: 'thunder-hawk',
    name: 'ThunderHawk',
    region: 'sky',
    rarity: 'rare',
    description: 'An eagle with tesla coils for feathers!',
    robotParts: ['tesla-feathers', 'storm-eyes', 'lightning-talons'],
    monsterType: 'eagle',
  },
  {
    id: 'aurora-serpent',
    name: 'AuroraSerpent',
    region: 'sky',
    rarity: 'rare',
    description: 'A sky snake that paints the northern lights!',
    robotParts: ['prism-scales', 'light-projectors', 'aurora-core'],
    monsterType: 'serpent',
  },
  {
    id: 'star-whale',
    name: 'StarWhale',
    region: 'sky',
    rarity: 'rare',
    description: 'Swims through clouds and sings to satellites!',
    robotParts: ['cosmic-blubber', 'satellite-song', 'nebula-spout'],
    monsterType: 'whale',
  },
  {
    id: 'wind-djinn',
    name: 'WindDjinn',
    region: 'sky',
    rarity: 'rare',
    description: 'Controls the winds and grants flight wishes!',
    robotParts: ['vortex-body', 'gust-generators', 'wish-turbine'],
    monsterType: 'djinn',
  },
  // Legendary (1)
  {
    id: 'celestial-phoenix',
    name: 'CelestialPhoenix',
    region: 'sky',
    rarity: 'legendary',
    description: 'A magnificent bird made of starlight and solar winds! Said to grant eternal good dental hygiene!',
    robotParts: ['solar-sail-wings', 'fusion-heart', 'cosmic-tail'],
    monsterType: 'cosmic-phoenix',
  },
];

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
  let pool: Creature[] = [];
  
  const filterByRegion = (creatures: Creature[]) => 
    region ? creatures.filter(c => c.region === region) : creatures;
  
  if (score >= 90) {
    pool = [
      ...filterByRegion(getCreaturesByRarity('legendary')),
      ...filterByRegion(getCreaturesByRarity('rare')),
      ...filterByRegion(getCreaturesByRarity('common')),
    ];
  } else if (score >= 70) {
    pool = [
      ...filterByRegion(getCreaturesByRarity('rare')),
      ...filterByRegion(getCreaturesByRarity('common')),
    ];
  } else {
    pool = filterByRegion(getCreaturesByRarity('common'));
  }
  
  const uncaptured = pool.filter(c => !capturedIds.includes(c.id));
  const targetPool = uncaptured.length > 0 ? uncaptured : pool;
  
  if (targetPool.length === 0) return null;
  
  return targetPool[Math.floor(Math.random() * targetPool.length)];
}

export function getCaptureRate(score: number, _rarity: 'common' | 'rare' | 'legendary'): number {
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
