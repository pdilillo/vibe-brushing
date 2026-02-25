import { useState } from 'react';
import { CreatureArt } from './CreatureArt';
import { HatPreview } from './HatPreview';
import { ALL_CREATURES } from '../data/creatures';
import { ALL_HATS } from '../data/hats';
import type { Region, Creature } from '../types';

interface GraphicsDebugProps {
  onBack: () => void;
}

type ViewMode = 'creatures' | 'hats';
type CreatureFilter = 'all' | Region;
type RarityFilter = 'all' | 'common' | 'rare' | 'legendary' | 'mythic';

const REGIONS: Region[] = ['grassland', 'coastal', 'lava', 'city', 'sky'];

type DesignStyle = 'pokemon' | 'digimon' | 'yokai' | 'slime';

function getDesignStyle(creature: Creature): DesignStyle {
  const type = creature.monsterType.toLowerCase();
  const id = creature.id.toLowerCase();
  
  if (type.includes('slime') || type.includes('blob') || type.includes('jelly') || type.includes('ghost')) {
    return 'slime';
  }
  if (type.includes('cat') || type.includes('fox') || type.includes('raccoon') || 
      type.includes('tanuki') || type.includes('spirit') || type.includes('kappa') ||
      type.includes('owl') || id.includes('yokai') || id.includes('spirit')) {
    return 'yokai';
  }
  if (type.includes('dragon') || type.includes('drake') || type.includes('mecha') ||
      type.includes('robo') || type.includes('cyber') || type.includes('dino') ||
      id.includes('gear') || id.includes('mecha') || id.includes('cyber') ||
      id.includes('robo') || id.includes('volt') || id.includes('data')) {
    return 'digimon';
  }
  return 'pokemon';
}

const STYLE_INFO: Record<DesignStyle, { label: string; icon: string; color: string; description: string }> = {
  pokemon: { label: 'Pokemon', icon: '⚡', color: 'bg-yellow-500', description: 'Clean, elemental, iconic' },
  digimon: { label: 'Digimon', icon: '🤖', color: 'bg-blue-600', description: 'Digital, robotic, tech' },
  yokai: { label: 'Yokai', icon: '👻', color: 'bg-purple-600', description: 'Spiritual, mystical, Japanese' },
  slime: { label: 'Slime', icon: '🫧', color: 'bg-lime-500', description: 'Bouncy, happy, DQ style' },
};

const REGION_COLORS: Record<Region | 'all', { bg: string; text: string; border: string }> = {
  grassland: { bg: 'bg-green-600', text: 'text-green-100', border: 'border-green-400' },
  coastal: { bg: 'bg-blue-600', text: 'text-blue-100', border: 'border-blue-400' },
  lava: { bg: 'bg-orange-600', text: 'text-orange-100', border: 'border-orange-400' },
  city: { bg: 'bg-purple-600', text: 'text-purple-100', border: 'border-purple-400' },
  sky: { bg: 'bg-cyan-600', text: 'text-cyan-100', border: 'border-cyan-400' },
  all: { bg: 'bg-gradient-to-r from-orange-500 to-red-500', text: 'text-white', border: 'border-orange-400' },
};

const RARITY_COLORS: Record<string, { bg: string; text: string; glow: string }> = {
  common: { bg: 'bg-gray-700', text: 'text-gray-200', glow: '' },
  rare: { bg: 'bg-blue-800', text: 'text-blue-200', glow: 'shadow-blue-500/50 shadow-lg' },
  legendary: { bg: 'bg-gradient-to-br from-amber-800 via-amber-700 to-orange-900', text: 'text-amber-100', glow: 'shadow-amber-400/70 shadow-2xl ring-2 ring-amber-500/50' },
  mythic: { bg: 'bg-gradient-to-br from-orange-600 via-red-600 to-orange-700', text: 'text-orange-100', glow: 'shadow-orange-400/80 shadow-2xl ring-4 ring-orange-500/60 animate-pulse' },
};

const RASTER_CREATURES = [
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
  
  // Mythic
  'binsters-claymars',
];

const POSSESSED_CREATURES = [
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

export function GraphicsDebug({ onBack }: GraphicsDebugProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('creatures');
  const [regionFilter, setRegionFilter] = useState<CreatureFilter>('all');
  const [rarityFilter, setRarityFilter] = useState<RarityFilter>('all');
  const [styleFilter, setStyleFilter] = useState<DesignStyle | 'all'>('all');
  const [animated, setAnimated] = useState(true);
  const [showGunk, setShowGunk] = useState(false);
  const [gunkLevel, setGunkLevel] = useState(50);
  const [selectedCreature, setSelectedCreature] = useState<Creature | null>(null);
  const [creatureSize, setCreatureSize] = useState(120);
  const [hatSize, setHatSize] = useState(100);
  const [showStyle, setShowStyle] = useState(true);

  const filteredCreatures = ALL_CREATURES.filter(creature => {
    if (regionFilter !== 'all' && creature.region !== regionFilter) return false;
    if (rarityFilter !== 'all' && creature.rarity !== rarityFilter) return false;
    if (styleFilter !== 'all') {
      const style = getDesignStyle(creature);
      if (style !== styleFilter) return false;
    }
    return true;
  });

  const designStyles: DesignStyle[] = ['pokemon', 'digimon', 'yokai', 'slime'];
  const styleStats = designStyles.reduce((acc, style) => {
    acc[style] = ALL_CREATURES.filter(c => getDesignStyle(c) === style).length;
    return acc;
  }, {} as Record<DesignStyle, number>);

  const creatureStats = {
    total: ALL_CREATURES.length,
    byRegion: REGIONS.reduce((acc, r) => ({ ...acc, [r]: ALL_CREATURES.filter(c => c.region === r).length }), {} as Record<Region, number>),
    byRarity: {
      common: ALL_CREATURES.filter(c => c.rarity === 'common').length,
      rare: ALL_CREATURES.filter(c => c.rarity === 'rare').length,
      legendary: ALL_CREATURES.filter(c => c.rarity === 'legendary').length,
      mythic: ALL_CREATURES.filter(c => c.rarity === 'mythic').length,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white flex items-center gap-2"
            >
              ← Back
            </button>
            <h1 className="text-2xl font-bold text-white">Graphics Debug Menu</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('creatures')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  viewMode === 'creatures'
                    ? 'bg-green-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                Creatures ({ALL_CREATURES.length})
              </button>
              <button
                onClick={() => setViewMode('hats')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  viewMode === 'hats'
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                Hats ({ALL_HATS.length})
              </button>
            </div>
          </div>
        </div>
      </div>

      {viewMode === 'creatures' && (
        <>
          {/* Creature Controls */}
          <div className="sticky top-[64px] z-10 bg-slate-800/95 backdrop-blur border-b border-slate-700">
            <div className="max-w-7xl mx-auto px-4 py-3">
              {/* Region filters */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-slate-400 text-sm py-1">Region:</span>
                <button
                  onClick={() => setRegionFilter('all')}
                  className={`px-3 py-1 rounded text-sm ${
                    regionFilter === 'all'
                      ? 'bg-white text-slate-900 font-bold'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  All
                </button>
                {REGIONS.map(region => (
                  <button
                    key={region}
                    onClick={() => setRegionFilter(region)}
                    className={`px-3 py-1 rounded text-sm capitalize ${
                      regionFilter === region
                        ? `${REGION_COLORS[region].bg} ${REGION_COLORS[region].text} font-bold`
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {region} ({creatureStats.byRegion[region]})
                  </button>
                ))}
              </div>

              {/* Rarity filters */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-slate-400 text-sm py-1">Rarity:</span>
                <button
                  onClick={() => setRarityFilter('all')}
                  className={`px-3 py-1 rounded text-sm ${
                    rarityFilter === 'all'
                      ? 'bg-white text-slate-900 font-bold'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  All
                </button>
                {(['common', 'rare', 'legendary', 'mythic'] as const).map(rarity => (
                  <button
                    key={rarity}
                    onClick={() => setRarityFilter(rarity)}
                    className={`px-3 py-1 rounded text-sm capitalize ${
                      rarityFilter === rarity
                        ? `${RARITY_COLORS[rarity].bg} ${RARITY_COLORS[rarity].text} font-bold`
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {rarity} ({creatureStats.byRarity[rarity]})
                  </button>
                ))}
              </div>

              {/* Design style filter */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-slate-400 text-sm py-1">Style:</span>
                <button
                  onClick={() => setStyleFilter('all')}
                  className={`px-3 py-1 rounded text-sm ${
                    styleFilter === 'all'
                      ? 'bg-white text-slate-900 font-bold'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  All
                </button>
                {designStyles.map(style => (
                  <button
                    key={style}
                    onClick={() => setStyleFilter(style)}
                    className={`px-3 py-1 rounded text-sm flex items-center gap-1 ${
                      styleFilter === style
                        ? `${STYLE_INFO[style].color} text-white font-bold`
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    <span>{STYLE_INFO[style].icon}</span>
                    {STYLE_INFO[style].label} ({styleStats[style]})
                  </button>
                ))}
              </div>

              {/* Display options */}
              <div className="flex flex-wrap items-center gap-4">
                <label className="flex items-center gap-2 text-sm text-slate-300">
                  <input
                    type="checkbox"
                    checked={animated}
                    onChange={e => setAnimated(e.target.checked)}
                    className="w-4 h-4"
                  />
                  Animated
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-300">
                  <input
                    type="checkbox"
                    checked={showStyle}
                    onChange={e => setShowStyle(e.target.checked)}
                    className="w-4 h-4"
                  />
                  Show Style
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-300">
                  <input
                    type="checkbox"
                    checked={showGunk}
                    onChange={e => setShowGunk(e.target.checked)}
                    className="w-4 h-4"
                  />
                  Show Gunk
                </label>
                {showGunk && (
                  <label className="flex items-center gap-2 text-sm text-slate-300">
                    Gunk Level:
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={gunkLevel}
                      onChange={e => setGunkLevel(Number(e.target.value))}
                      className="w-24"
                    />
                    <span className="w-8">{gunkLevel}%</span>
                  </label>
                )}
                <label className="flex items-center gap-2 text-sm text-slate-300">
                  Size:
                  <input
                    type="range"
                    min="60"
                    max="200"
                    value={creatureSize}
                    onChange={e => setCreatureSize(Number(e.target.value))}
                    className="w-24"
                  />
                  <span className="w-10">{creatureSize}px</span>
                </label>
              </div>
            </div>
          </div>

          {/* Creature Grid */}
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="text-slate-400 mb-4">
              Showing {filteredCreatures.length} of {ALL_CREATURES.length} creatures
            </div>
            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${creatureSize + 40}px, 1fr))` }}>
              {filteredCreatures.map(creature => (
                <div
                  key={creature.id}
                  onClick={() => setSelectedCreature(selectedCreature?.id === creature.id ? null : creature)}
                  className={`relative flex flex-col items-center p-3 rounded-xl cursor-pointer transition-all ${
                    RARITY_COLORS[creature.rarity].bg
                  } ${RARITY_COLORS[creature.rarity].glow} ${
                    selectedCreature?.id === creature.id ? 'ring-2 ring-white scale-105' : 'hover:scale-102'
                  }`}
                >
                  <div className={`absolute top-1 left-1 px-2 py-0.5 rounded text-xs ${REGION_COLORS[creature.region].bg} ${REGION_COLORS[creature.region].text}`}>
                    {creature.region}
                  </div>
                  {creature.rarity === 'mythic' && (
                    <div className="absolute top-1 right-1 text-orange-300 text-xl animate-pulse" title="Mythic - Ultimate Boss">
                      👑
                    </div>
                  )}
                  {creature.rarity === 'legendary' && (
                    <div className="absolute top-1 right-1 text-amber-300 text-lg" title="Legendary Dragon">
                      🐉
                    </div>
                  )}
                  {RASTER_CREATURES.includes(creature.id) && (
                    <div className="absolute bottom-1 right-1 flex gap-0.5">
                      <span className="px-1.5 py-0.5 rounded text-[8px] bg-green-500 text-white font-bold" title="HD Raster Image">
                        HD
                      </span>
                      {POSSESSED_CREATURES.includes(creature.id) && (
                        <span className="px-1.5 py-0.5 rounded text-[8px] bg-red-600 text-white font-bold" title="Has Possessed Variant">
                          👿
                        </span>
                      )}
                    </div>
                  )}
                  <CreatureArt
                    creature={creature}
                    size={creatureSize}
                    animated={animated}
                    showGunk={showGunk}
                    gunkLevel={gunkLevel}
                  />
                  <div className="mt-2 text-center">
                    <div className="text-white font-medium text-sm truncate max-w-full">
                      {creature.name}
                    </div>
                    <div className="text-slate-400 text-xs capitalize mb-1">
                      {creature.rarity} • {creature.monsterType}
                    </div>
                    {/* Style badge */}
                    {showStyle && (() => {
                      if (creature.rarity === 'mythic') {
                        return (
                          <div className="flex flex-wrap gap-0.5 justify-center">
                            <span className="px-2 py-0.5 rounded text-[9px] text-white bg-gradient-to-r from-orange-500 to-red-600 font-bold animate-pulse">
                              👑 MYTHIC ULTIMATE
                            </span>
                          </div>
                        );
                      }
                      if (creature.rarity === 'legendary') {
                        return (
                          <div className="flex flex-wrap gap-0.5 justify-center">
                            <span className="px-2 py-0.5 rounded text-[9px] text-white bg-gradient-to-r from-amber-600 to-orange-600 font-bold">
                              🐉 LEGENDARY DRAGON
                            </span>
                          </div>
                        );
                      }
                      const style = getDesignStyle(creature);
                      const info = STYLE_INFO[style];
                      return (
                        <div className="flex flex-wrap gap-0.5 justify-center">
                          <span className={`px-2 py-0.5 rounded text-[9px] text-white ${info.color} font-medium`}>
                            {info.icon} {info.label}
                          </span>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Creature Detail */}
          {selectedCreature && (
            <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur border-t border-slate-700 p-4">
              <div className="max-w-7xl mx-auto flex items-center gap-6">
                <CreatureArt
                  creature={selectedCreature}
                  size={100}
                  animated={animated}
                  showGunk={showGunk}
                  gunkLevel={gunkLevel}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-bold text-white">{selectedCreature.name}</h3>
                    <span className={`px-2 py-0.5 rounded text-xs ${REGION_COLORS[selectedCreature.region].bg} ${REGION_COLORS[selectedCreature.region].text}`}>
                      {selectedCreature.region}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-xs capitalize ${RARITY_COLORS[selectedCreature.rarity].bg} ${RARITY_COLORS[selectedCreature.rarity].text}`}>
                      {selectedCreature.rarity}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm mb-2">{selectedCreature.description}</p>
                  {/* Design style info */}
                  {(() => {
                    if (selectedCreature.rarity === 'mythic') {
                      return (
                        <div className="flex gap-3 mb-2 items-center">
                          <span className="px-3 py-1 rounded text-sm text-white bg-gradient-to-r from-orange-500 to-red-600 font-bold flex items-center gap-2 animate-pulse">
                            👑 MYTHIC ULTIMATE BOSS
                          </span>
                          <span className="text-orange-400 text-xs">
                            The five-headed dragon of perfect dental hygiene - only appears after catching all other creatures!
                          </span>
                        </div>
                      );
                    }
                    if (selectedCreature.rarity === 'legendary') {
                      return (
                        <div className="flex gap-3 mb-2 items-center">
                          <span className="px-3 py-1 rounded text-sm text-white bg-gradient-to-r from-amber-600 to-orange-600 font-bold flex items-center gap-2">
                            🐉 LEGENDARY DRAGON FORM
                          </span>
                          <span className="text-amber-400 text-xs">
                            Unique dragon-style graphics with wings, horns, and magical aura
                          </span>
                        </div>
                      );
                    }
                    const style = getDesignStyle(selectedCreature);
                    const info = STYLE_INFO[style];
                    return (
                      <div className="flex gap-3 mb-2 items-center">
                        <span className={`px-3 py-1 rounded text-sm text-white ${info.color} font-medium flex items-center gap-2`}>
                          {info.icon} {info.label} Style
                        </span>
                        <span className="text-slate-400 text-xs">
                          {info.description}
                        </span>
                      </div>
                    );
                  })()}
                  <div className="flex gap-4 text-xs text-slate-500">
                    <span>ID: {selectedCreature.id}</span>
                    <span>Type: {selectedCreature.monsterType}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCreature(null)}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {viewMode === 'hats' && (
        <>
          {/* Hat Controls */}
          <div className="sticky top-[64px] z-10 bg-slate-800/95 backdrop-blur border-b border-slate-700">
            <div className="max-w-7xl mx-auto px-4 py-3">
              <div className="flex flex-wrap items-center gap-4">
                <label className="flex items-center gap-2 text-sm text-slate-300">
                  Size:
                  <input
                    type="range"
                    min="60"
                    max="200"
                    value={hatSize}
                    onChange={e => setHatSize(Number(e.target.value))}
                    className="w-24"
                  />
                  <span className="w-10">{hatSize}px</span>
                </label>
              </div>
            </div>
          </div>

          {/* Hat Grid */}
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="text-slate-400 mb-4">
              Showing all {ALL_HATS.length} hats
            </div>
            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${hatSize + 60}px, 1fr))` }}>
              {ALL_HATS.map(hat => (
                <div
                  key={hat.id}
                  className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-b from-purple-800 to-purple-900 hover:from-purple-700 hover:to-purple-800 transition-all"
                >
                  <div className="bg-purple-950/50 rounded-lg p-2 mb-2">
                    <HatPreview hatId={hat.id} size={hatSize} />
                  </div>
                  <div className="text-center">
                    <div className="text-white font-medium text-sm">
                      {hat.name}
                    </div>
                    <div className="text-purple-300 text-xs capitalize">
                      {hat.unlockCondition}
                      {hat.unlockThreshold && ` (${hat.unlockThreshold})`}
                    </div>
                    <div className="text-purple-400 text-xs mt-1">
                      ID: {hat.id}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
