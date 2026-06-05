import { ALL_CREATURES } from './creatures';

/** One streak tale: standalone paragraph keyed by creature id. */
export interface StreakCreatureStory {
  title?: string;
  body: string;
}

/**
 * Creature ids from series 1–3 plus a mythic finale (diverse regions / seasons). Order here is pool
 * membership only; unlock order is random at claim time. The first seven are the original tales; the
 * remaining "legend" tales keep the streak rewarding once the starter set is collected.
 */
export const STREAK_STORY_POOL: string[] = [
  // Original tales
  'gear-bunny',
  'turbo-turtle',
  's2-crystal-caterpillar',
  's2-emerald-elk',
  's3-dino-beetle',
  'mecha-moth',
  'magma-core',
  // Legend tales — unlocked after the starter tales as the streak keeps going
  'natura-prime',
  'ocean-emperor',
  'celestial-phoenix',
  's2-internet-spirit',
  's2-aurora-whale',
  's3-rex-supreme',
  'binsters-claymars',
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
  'natura-prime': {
    body: `Long after the first seven tales were told, the Sparkle Grasslands stirred awake a legend: Seedatron, grown from the very first seed wrapped around the very first circuit. It does not hurry, because forests taught it that the best things take seasons. When a tired sprout forgets how to grow, Seedatron presses one giant finger to the soil and hums the oldest song there is—part lullaby, part instruction manual. Kids who keep their streak alive swear they can feel that hum in their toothbrush, like roots cheering quietly underground.`,
  },
  'ocean-emperor': {
    body: `Leviatron is half whale, half submarine, and entirely too polite to brag about either. It patrols the deepest trenches with a sonar crown that pings every lost thing back toward home—lost floaties, lost ships, lost confidence. The Sparkle Coast says it only surfaces for two reasons: a storm that needs calming, and a kid who kept a long, long streak. When it breaches, the spray spells “proud of you” in salt and starlight before the wave even lands.`,
  },
  'celestial-phoenix': {
    body: `Solarnix is stitched from solar wind and the patient kind of starlight that takes ages to arrive. Most creatures glow; Solarnix collects glow and gives it back on cloudy days. It circles the highest reaches of the Sparkle Sky, dropping warm feathers that turn into sunrise wherever they land. Legend says a streak strong enough to wake Solarnix earns you one of those feathers—and that anyone who carries it will never, ever forget to smile.`,
  },
  's2-internet-spirit': {
    body: `Webweaver is laughter that learned to travel at the speed of light. It lives in the hum between every screen, collecting the jokes people forgot to finish and the kind messages they were too shy to send. When a streak stretches long enough, Webweaver weaves all those little kindnesses into a single bright thread and ties it gently to your wrist. You can’t see it, but it tugs—just a little—every time you do something brave, like brushing the back teeth nobody else remembers.`,
  },
  's2-aurora-whale': {
    body: `Borealisk swims through air thinner than water, painting the polar night in slow ribbons of green and violet. It is shy, so it only shows up where someone has been quietly consistent—coming back, night after night, doing the small good thing. The Sparkle Sky says Borealisk reads streaks the way other creatures read maps, and that the brightest auroras are simply Borealisk saying, to one specific kid, “I saw every single day. Well done.”`,
  },
  's3-rex-supreme': {
    body: `Tyrannotron was supposed to be the scariest thing in the Sparkle Range, and for about a week it tried very hard to be. Then it met a streak—a real one, kept by someone smaller and far more stubborn than any dinosaur—and decided that showing up every day was more impressive than any roar. Now its plasma jaws are mostly used for grinning, and its giant footprints fill with rainwater that fossils love to splash in. It calls long streaks “the only kind of power worth stomping for.”`,
  },
  'binsters-claymars': {
    body: `Binsters Claymars is the six-headed dragon of perfect dental hygiene, and it almost never appears. Each head guards a different corner of your smile, and together they only wake for the rarest thing in any world: a streak that simply would not quit. When all the other tales have been told and all the legends collected, Binsters unfurls its rainbow belly across the whole sky and says, in six voices at once, the thing every Sparkle creature has been trying to tell you all along—“You kept going. That’s the magic. That was always the magic.”`,
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
