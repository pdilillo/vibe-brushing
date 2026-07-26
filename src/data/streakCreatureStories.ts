import { ALL_CREATURES } from './creatures';

/** One streak tale: standalone paragraph keyed by creature id. */
export interface StreakCreatureStory {
  title?: string;
  body: string;
}

/**
 * Creature ids from series 1–4 plus mythic finales (diverse regions / seasons). Order here is pool
 * membership only; unlock order is random at claim time. The first seven are the original tales; the
 * next seven are legend tales; the remaining epic tales (and Foliape as the final mythic) keep the
 * streak rewarding through thirty completed cycles.
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
  // Epic tales — unlocked as the streak journey continues toward thirty
  'prism-fox',
  'echo-owl',
  'bloom-guardian',
  'storm-ray',
  'kraken-kit',
  'tide-titan',
  'volcano-drake',
  'infernal-titan',
  'neon-dragon',
  'metro-mind',
  'aurora-serpent',
  'star-whale',
  's2-crystal-guardian',
  's2-deep-crystal',
  's3-spirit-king',
  'leaf-kong',
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
  'prism-fox': {
    body: `Spectravix was born when a rainbow got tired of being looked at and decided to run instead. Its tail splits light into tiny data streams that spell out compliments only the brave can read. The Sparkle Grasslands say if you brush with extra care, Spectravix leaves a single color on your mirror—just for you—like a secret sticker the world forgot to peel off. It calls long streaks “the best kind of light,” because they shine even when nobody is watching.`,
  },
  'echo-owl': {
    body: `Sonarhoot does not hoot—it pings. Every ping is a tiny “hello” bounced off the moon and returned with a sticker’s worth of encouragement. It patrols the treetops at bedtime, listening for the soft click of a toothbrush finishing its job. Kids who keep their streak alive say Sonarhoot’s eyes glow a little brighter on night seven, like twin porch lights that mean “I heard you. Good job.”`,
  },
  'bloom-guardian': {
    body: `Floratron was once a single daisy that refused to wilt during a drought. It grew bark armor, circuit leaves, and a heart made of patience. Now it walks the meadow slowly—not because it is tired, but because it likes to notice things. When someone keeps a streak going, Floratron plants a flower in their honor that blooms only in their imagination, which is the most real place flowers grow anyway.`,
  },
  'storm-ray': {
    body: `Voltamanta glides through the Sparkle Coast with wings that crackle like friendly static. It does not chase storms—it herds them away from sandcastles and sleepy seagulls. Sailors say a long streak sounds like Voltamanta’s hum: steady, electric, and impossible to ignore once you feel it. It believes the bravest thing you can do at the end of a long day is still show up and brush.`,
  },
  'kraken-kit': {
    body: `Tentabot is a baby kraken who thinks every toothbrush is a tentacle practice buddy. It ties itself in cheerful knots on the ocean floor and untangles only for kids who remembered to brush. The Sparkle Coast keeps a tally of Tentabot sightings, and every sighting lines up with someone who did not skip a day. It says consistency is just kindness aimed at your future self.`,
  },
  'tide-titan': {
    body: `Wavezilla is enormous, which is awkward when you are also gentle. It used to knock over piers by accident until it learned to surf its own waves instead. Now it carries lost beach toys home and leaves foam letters on the sand that spell “proud.” A streak long enough to wake Wavezilla is, it says, the only tide worth turning.`,
  },
  'volcano-drake': {
    body: `Rocketdrake was hatched inside a launch pad that someone left running. It roared once, decided roaring was overrated, and became the Sparkle Range’s loudest cheerleader instead. Its jet-boosters only fire for celebrations—birthdays, first wiggly teeth, and streaks that refuse to break. Rocketdrake insists every brave habit is a small launch toward something bigger.`,
  },
  'infernal-titan': {
    body: `Eruptor could have been the scariest volcano in the Sparkle Range, but it chose warmth over thunder. It melts worry into lava glass bracelets and hands them out to anyone who kept going when quitting felt easier. The mountains say Eruptor only stirs for streaks that glow from the inside—and that is the only kind of fire worth keeping lit.`,
  },
  'neon-dragon': {
    body: `Glodragon sleeps curled around the tallest billboard in the Sparkle City, dreaming in scrolling lights. It wakes when someone’s streak outshines the neon—quiet, steady, day after day. Then it unfurls and paints the skyline in colors that spell “you did it” in a language only night owls and dedicated brushers can read. Glodragon says glow is earned, not given.`,
  },
  'metro-mind': {
    body: `Urbatron is the city’s memory made metal—a mind that remembers every small good habit anyone ever tried. It rides the subways without a ticket because the trains owe it favors. When a streak stretches long enough, Urbatron leaves a transfer pass on your pillow: good for one ride to anywhere you have been brave. It calls that “proof you are going places.”`,
  },
  'aurora-serpent': {
    body: `Prismdrake coils through the northern sky, stitching auroras together with a tail that hums in seven colors. It is shy, so it only appears where someone has been quietly consistent. The Sparkle Sky says Prismdrake reads streaks the way snakes read warmth—and that the prettiest lights are simply Prismdrake whispering, “I saw every single day.”`,
  },
  'star-whale': {
    body: `Cosmolub swims between constellations, singing a song so low only streaks can hear it. It collects falling stars that nobody wished on and returns them as second chances. Kids who keep brushing say Cosmolub’s song feels like a hug from space—vast, patient, and sure you are worth the trip. It believes the universe is mostly made of people who came back tomorrow.`,
  },
  's2-crystal-guardian': {
    body: `Geodiatron stood at the mouth of the Crystal Caverns so long it became part of the wall—and then decided walls were too boring. Now it walks with gem fists that heal cracked quartz and cracked confidence alike. A streak strong enough to wake Geodiatron earns a pebble that glows in your pocket, warm as a handshake from the earth itself.`,
  },
  's2-deep-crystal': {
    body: `Abyssalith lives where light forgets to go, holding a lantern made from the first pearl ever found. It does not fear the dark because it brought its own sparkle. Divers say Abyssalith only rises for streaks that dive deep—past “I’ll do it later,” past “just this once,” all the way to “I showed up again.” That is the depth where real treasure lives.`,
  },
  's3-spirit-king': {
    body: `Phantomarch wears a crown of mist and manners. It rules the Phantom Realm with a velvet voice and a strict law: no haunting before bedtime, and no skipping teeth. Long streaks ring its throne room like polite applause. Phantomarch says the bravest kings are not the loudest—they are the ones who keep their promises to themselves, one small night at a time.`,
  },
  'leaf-kong': {
    body: `Foliape is the last tale—the mythic one—and it almost never speaks. It is every forest, every season, every leaf that ever learned to hold on through wind. When a streak reaches the kind of length that makes other creatures stop and stare, Foliape opens one enormous hand and offers a single green leaf that never wilts. Keep it in your heart, it says without saying, and you will always know how to grow back.`,
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
