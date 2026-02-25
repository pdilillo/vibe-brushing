import type { Creature, Region } from '../types';

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

export const ALL_CREATURES: Creature[] = [
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
  },
  {
    id: 'leaf-kong',
    name: 'Foliape',
    region: 'grassland',
    rarity: 'legendary',
    description: 'The mightiest grass-type warrior! His autumn leaf crown channels the power of all seasons, and his leaf armor is impenetrable!',
    robotParts: ['autumn-crown', 'leaf-armor', 'vine-muscles', 'photosynthesis-core'],
    monsterType: 'gorilla',
    height: 280,
    weight: 450,
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
  },

  // ==================== MYTHIC CREATURE ====================
  // Ultimate (1) - Only appears after all other creatures are caught
  {
    id: 'binsters-claymars',
    name: 'Binsters Claymars',
    region: 'all',
    rarity: 'mythic',
    description: 'The legendary six-headed dragon of perfect dental hygiene! Each head represents a different brushing zone. Only reveals itself to true masters who have befriended every creature!',
    robotParts: ['six-dragon-heads', 'clay-body', 'rainbow-belly', 'golden-horns', 'ultimate-core'],
    monsterType: 'hydra-dragon',
    height: 2500,
    weight: 18000,
    requiresAllCreatures: true,
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
    region ? creatures.filter(c => c.region === region || c.region === 'all') : creatures;
  
  // Get all non-mythic creatures
  const nonMythicCreatures = ALL_CREATURES.filter(c => c.rarity !== 'mythic');
  const mythicCreature = ALL_CREATURES.find(c => c.rarity === 'mythic');
  
  // Check if all non-mythic creatures have been captured
  const allNonMythicCaptured = nonMythicCreatures.every(c => capturedIds.includes(c.id));
  const mythicAlreadyCaptured = mythicCreature && capturedIds.includes(mythicCreature.id);
  
  // Check if ALL creatures (including mythic) have been captured - allows duplicates
  const allCreaturesCaptured = allNonMythicCaptured && mythicAlreadyCaptured;
  
  // If all non-mythic creatures are captured and mythic isn't, and score is perfect, offer the mythic!
  if (allNonMythicCaptured && !mythicAlreadyCaptured && score >= 95 && mythicCreature) {
    return mythicCreature;
  }
  
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
  
  // Filter out mythic creatures from normal pool (they're special!)
  pool = pool.filter(c => c.rarity !== 'mythic');
  
  // If all creatures are captured, allow duplicates from the score-based pool
  if (allCreaturesCaptured) {
    if (pool.length === 0) return null;
    return pool[Math.floor(Math.random() * pool.length)];
  }
  
  // Otherwise, only pick from uncaptured creatures to ensure uniqueness
  // First try the score-based pool
  let uncaptured = pool.filter(c => !capturedIds.includes(c.id));
  
  // If no uncaptured in score-based pool, expand to ALL uncaptured non-mythic creatures in the region
  if (uncaptured.length === 0) {
    uncaptured = filterByRegion(nonMythicCreatures).filter(c => !capturedIds.includes(c.id));
  }
  
  // If still no uncaptured in this region, try any uncaptured creature
  if (uncaptured.length === 0) {
    uncaptured = nonMythicCreatures.filter(c => !capturedIds.includes(c.id));
  }
  
  if (uncaptured.length === 0) return null;
  
  return uncaptured[Math.floor(Math.random() * uncaptured.length)];
}

export function getCaptureRate(score: number, rarity: 'common' | 'rare' | 'legendary' | 'mythic'): number {
  // Mythic creatures require near-perfect brushing!
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
