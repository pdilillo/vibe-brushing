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
type RarityFilter = 'all' | 'common' | 'rare' | 'legendary';

const REGIONS: Region[] = ['grassland', 'coastal', 'lava', 'city', 'sky'];

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
  const type = creature.monsterType.toLowerCase();
  const id = creature.id.toLowerCase();
  
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

const PART_COLORS: Record<string, string> = {
  'round-ears': 'bg-pink-600',
  'floppy-ears': 'bg-pink-500',
  'pointed-horns': 'bg-red-600',
  'antennae': 'bg-yellow-600',
  'crown-crest': 'bg-orange-500',
  'shell-dome': 'bg-teal-600',
  'spiky': 'bg-red-500',
  'none': 'bg-gray-600',
  'happy': 'bg-green-500',
  'friendly': 'bg-blue-500',
  'mischievous': 'bg-purple-500',
  'fierce': 'bg-red-600',
  'sleepy': 'bg-indigo-400',
  'surprised': 'bg-yellow-500',
  'derpy': 'bg-pink-400',
  'blob': 'bg-lime-500',
  'fluffy': 'bg-pink-400',
  'armored': 'bg-slate-500',
  'elongated': 'bg-cyan-500',
  'round': 'bg-blue-400',
  'stubby': 'bg-amber-600',
  'paws': 'bg-orange-400',
  'wings': 'bg-sky-400',
  'fins': 'bg-cyan-400',
  'claws': 'bg-red-500',
  'tentacles': 'bg-purple-400',
};

const REGION_COLORS: Record<Region, { bg: string; text: string; border: string }> = {
  grassland: { bg: 'bg-green-600', text: 'text-green-100', border: 'border-green-400' },
  coastal: { bg: 'bg-blue-600', text: 'text-blue-100', border: 'border-blue-400' },
  lava: { bg: 'bg-orange-600', text: 'text-orange-100', border: 'border-orange-400' },
  city: { bg: 'bg-purple-600', text: 'text-purple-100', border: 'border-purple-400' },
  sky: { bg: 'bg-cyan-600', text: 'text-cyan-100', border: 'border-cyan-400' },
};

const RARITY_COLORS: Record<string, { bg: string; text: string; glow: string }> = {
  common: { bg: 'bg-gray-700', text: 'text-gray-200', glow: '' },
  rare: { bg: 'bg-blue-800', text: 'text-blue-200', glow: 'shadow-blue-500/50 shadow-lg' },
  legendary: { bg: 'bg-gradient-to-br from-amber-800 via-amber-700 to-orange-900', text: 'text-amber-100', glow: 'shadow-amber-400/70 shadow-2xl ring-2 ring-amber-500/50' },
};

export function GraphicsDebug({ onBack }: GraphicsDebugProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('creatures');
  const [regionFilter, setRegionFilter] = useState<CreatureFilter>('all');
  const [rarityFilter, setRarityFilter] = useState<RarityFilter>('all');
  const [eyeFilter, setEyeFilter] = useState<EyeType | 'all'>('all');
  const [animated, setAnimated] = useState(true);
  const [showGunk, setShowGunk] = useState(false);
  const [gunkLevel, setGunkLevel] = useState(50);
  const [selectedCreature, setSelectedCreature] = useState<Creature | null>(null);
  const [creatureSize, setCreatureSize] = useState(120);
  const [hatSize, setHatSize] = useState(100);
  const [showParts, setShowParts] = useState(true);

  const filteredCreatures = ALL_CREATURES.filter(creature => {
    if (regionFilter !== 'all' && creature.region !== regionFilter) return false;
    if (rarityFilter !== 'all' && creature.rarity !== rarityFilter) return false;
    if (eyeFilter !== 'all') {
      const parts = getCreatureParts(creature);
      if (parts.eyes !== eyeFilter) return false;
    }
    return true;
  });

  const eyeTypes: EyeType[] = ['happy', 'friendly', 'mischievous', 'fierce', 'sleepy', 'surprised', 'derpy'];
  const eyeStats = eyeTypes.reduce((acc, eye) => {
    acc[eye] = ALL_CREATURES.filter(c => getCreatureParts(c).eyes === eye).length;
    return acc;
  }, {} as Record<EyeType, number>);

  const creatureStats = {
    total: ALL_CREATURES.length,
    byRegion: REGIONS.reduce((acc, r) => ({ ...acc, [r]: ALL_CREATURES.filter(c => c.region === r).length }), {} as Record<Region, number>),
    byRarity: {
      common: ALL_CREATURES.filter(c => c.rarity === 'common').length,
      rare: ALL_CREATURES.filter(c => c.rarity === 'rare').length,
      legendary: ALL_CREATURES.filter(c => c.rarity === 'legendary').length,
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
                {(['common', 'rare', 'legendary'] as const).map(rarity => (
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

              {/* Eye expression filter */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-slate-400 text-sm py-1">Eyes:</span>
                <button
                  onClick={() => setEyeFilter('all')}
                  className={`px-3 py-1 rounded text-sm ${
                    eyeFilter === 'all'
                      ? 'bg-white text-slate-900 font-bold'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  All
                </button>
                {eyeTypes.map(eye => (
                  <button
                    key={eye}
                    onClick={() => setEyeFilter(eye)}
                    className={`px-3 py-1 rounded text-sm capitalize ${
                      eyeFilter === eye
                        ? `${PART_COLORS[eye]} text-white font-bold`
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {eye} ({eyeStats[eye]})
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
                    checked={showParts}
                    onChange={e => setShowParts(e.target.checked)}
                    className="w-4 h-4"
                  />
                  Show Parts
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
                  {creature.rarity === 'legendary' && (
                    <div className="absolute top-1 right-1 text-amber-300 text-lg" title="Legendary Dragon">
                      🐉
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
                    {/* Part badges */}
                    {showParts && (() => {
                      if (creature.rarity === 'legendary') {
                        return (
                          <div className="flex flex-wrap gap-0.5 justify-center">
                            <span className="px-2 py-0.5 rounded text-[9px] text-white bg-gradient-to-r from-amber-600 to-orange-600 font-bold">
                              LEGENDARY DRAGON
                            </span>
                          </div>
                        );
                      }
                      const parts = getCreatureParts(creature);
                      return (
                        <div className="flex flex-wrap gap-0.5 justify-center">
                          <span className={`px-1 py-0.5 rounded text-[8px] text-white ${PART_COLORS[parts.head]}`}>
                            {parts.head}
                          </span>
                          <span className={`px-1 py-0.5 rounded text-[8px] text-white ${PART_COLORS[parts.eyes]}`}>
                            {parts.eyes}
                          </span>
                          <span className={`px-1 py-0.5 rounded text-[8px] text-white ${PART_COLORS[parts.body]}`}>
                            {parts.body}
                          </span>
                          <span className={`px-1 py-0.5 rounded text-[8px] text-white ${PART_COLORS[parts.limbs]}`}>
                            {parts.limbs}
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
                  {/* Visual parts breakdown */}
                  {(() => {
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
                    const parts = getCreatureParts(selectedCreature);
                    return (
                      <div className="flex gap-3 mb-2">
                        <div className="flex items-center gap-1">
                          <span className="text-slate-500 text-xs">Head:</span>
                          <span className={`px-2 py-0.5 rounded text-xs text-white ${PART_COLORS[parts.head]}`}>
                            {parts.head}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-slate-500 text-xs">Eyes:</span>
                          <span className={`px-2 py-0.5 rounded text-xs text-white ${PART_COLORS[parts.eyes]}`}>
                            {parts.eyes}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-slate-500 text-xs">Body:</span>
                          <span className={`px-2 py-0.5 rounded text-xs text-white ${PART_COLORS[parts.body]}`}>
                            {parts.body}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-slate-500 text-xs">Limbs:</span>
                          <span className={`px-2 py-0.5 rounded text-xs text-white ${PART_COLORS[parts.limbs]}`}>
                            {parts.limbs}
                          </span>
                        </div>
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
