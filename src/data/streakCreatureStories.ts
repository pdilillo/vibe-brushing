import { ALL_CREATURES } from './creatures';

/** One streak tale: standalone paragraph keyed by creature id. */
export interface StreakCreatureStory {
  title?: string;
  body: string;
}

/**
 * Seven creature ids from series 1–3 (diverse regions / seasons). Order here is pool membership only;
 * unlock order is random at claim time.
 */
export const STREAK_STORY_POOL: string[] = [
  'gear-bunny',
  'turbo-turtle',
  's2-crystal-caterpillar',
  's2-emerald-elk',
  's3-dino-beetle',
  'mecha-moth',
  'magma-core',
];

export const STREAK_CREATURE_STORIES: Record<string, StreakCreatureStory> = {
  'gear-bunny': {
    body: `Long before anyone in the Sparkle Grasslands kept time on purpose, Cogbun was just a loose spring and a dream. It taught itself to hop in perfect ticks, so every landing sounded like a tiny “good job” to the clover. Local bugs started setting their alarms to Cogbun’s rhythm, and the meadow grew a little friendlier—because if you brushed your teeth on time, Cogbun said you earned an extra bounce in your step. To this day, the soft whir from its ears means “you showed up.”`,
  },
  'turbo-turtle': {
    body: `Rocketoise’s first shell wasn’t a shell at all—it was a lunchbox someone had dropped on the beach. It bolted on anyway, painted racing stripes with salt spray, and decided the ocean was a track. The Sparkle Coast still tells stories about the night Rocketoise outran a storm, not to win, but to drag a lost floatie back to the kiddie pool where it belonged. If you listen near the jetty, you can hear the faint hum: “slow is still moving forward.”`,
  },
  's2-crystal-caterpillar': {
    body: `Prismapillar doesn’t remember which shard it was first—only that every chime it made woke up a sleepy crystal in the caverns. The other crawlers followed the rainbow light, and soon the whole valley glittered like a disco for polite worms. Prismapillar insists it’s not showing off; it’s just sharing the music. Kids who brush extra carefully swear Prismapillar’s segments glow a little brighter in their direction, like a secret high-five.`,
  },
  's2-emerald-elk': {
    body: `Crystalope used to be a statue someone forgot in the moss. When the first raindrop hit its antlers, the whole forest heard a tiny “hello.” Now it walks the caverns with hooves that heal scuffed leaves and moods alike. Travelers leave tiny thank-you notes in the grass, and Crystalope reads them with its nose, because antlers are for listening. It says the sparkle in your smile is just another kind of crystal—keep polishing it.`,
  },
  's3-dino-beetle': {
    body: `Trilobot woke up in a museum display and immediately filed an appeal: “I am not history.” It rolled into the sunlight, upgraded its shell with optimism, and became the Sparkle Grasslands’ unofficial fossil coach. When it finds a shy dinosaur, it teaches them how to wave a tiny claw at the camera. Trilobot believes every old thing deserves a new hobby—especially teeth brushing, which it calls “daily excavation.”`,
  },
  'mecha-moth': {
    body: `Solarmoth’s wings were stitched from solar panels and stubbornness. It refused to sleep during the day because someone had to cheer for the flowers. The Sparkle Grasslands glow a little greener at dusk because Solarmoth leaves a trail of tiny LEDs that spell “nice try.” It says the best light is the one you share when you’re tired, which is why it still visits porch lights that flicker for forgotten kids.`,
  },
  'magma-core': {
    body: `Molite’s heart was never meant to be cozy—it was a furnace built for heroes. But Molite decided warmth was a better job than roaring. It wandered the lava fields handing out heat packs made of cooled lava glass, and the volcanoes learned to whisper instead of shout. The Sparkle Range says if you brush long enough, Molite will warm your toothbrush from three ridges away, just to say “I noticed you.”`,
  },
};

function randomIntExclusive(max: number): number {
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return buf[0] % max;
}

/** Returns a random creature id from the pool that is not yet unlocked, or null if all are unlocked. */
export function pickRandomUnlockedStoryId(unlockedCreatureStoryIds: string[]): string | null {
  const remaining = STREAK_STORY_POOL.filter(id => !unlockedCreatureStoryIds.includes(id));
  if (remaining.length === 0) return null;
  const idx = randomIntExclusive(remaining.length);
  return remaining[idx];
}

export function getStoryForCreatureId(creatureId: string): StreakCreatureStory | undefined {
  return STREAK_CREATURE_STORIES[creatureId];
}

export function countRemainingStreakStories(unlockedCreatureStoryIds: string[]): number {
  return STREAK_STORY_POOL.filter(id => !unlockedCreatureStoryIds.includes(id)).length;
}

/** Random id from full pool (e.g. debug preview). */
export function pickRandomStoryIdFromPool(): string {
  return STREAK_STORY_POOL[randomIntExclusive(STREAK_STORY_POOL.length)];
}

/** Stable display order: alphabetical by creature name from ALL_CREATURES. */
export function getStreakStorySlotsSorted(): { creatureId: string; sortName: string }[] {
  const rows = STREAK_STORY_POOL.map(creatureId => {
    const c = ALL_CREATURES.find(x => x.id === creatureId);
    if (!c) {
      throw new Error(`Streak story missing creature: ${creatureId}`);
    }
    return { creatureId, sortName: c.name.toLowerCase() };
  });
  rows.sort((a, b) => a.sortName.localeCompare(b.sortName));
  return rows;
}
