/**
 * Secret word bank. Organized into categories to keep the list easy to
 * review and extend. Categories are NOT hidden from players: the
 * Imposter's reveal screen shows a category hint (and its emoji), and
 * every word carries its own emoji so the game is playable without
 * reading — see docs/GAME_RULES.md "Imposter privacy" and "Word bank".
 *
 * Every word has a single, unique-within-its-category emoji. Where the
 * original word had no clean 1:1 emoji (obscure terms, abstract
 * multi-word concepts, or a collision with another word in the same
 * category), the word itself was swapped for a different, similarly-
 * themed, concrete word that does have one — a deliberate content
 * decision (project owner call), not a Figma mapping. Several of the
 * swapped-out words were also just poor fits for young kids anyway
 * (e.g. "Earthquake", "Housewarming", "Escape Room"), so this pass
 * doubles as making the word list itself more kid-appropriate.
 */

export const CATEGORY_EMOJI = {
  food: '🍽️',
  animals: '🐾',
  places: '🗺️',
  occupations: '💼',
  objects: '📦',
  entertainment: '🎭',
  nature: '🌿',
  technology: '💻',
  sportsAndGames: '⚽',
  holidays: '🎉',
} as const;

export const WORD_CATEGORIES = {
  food: [
    ['Pizza', '🍕'],
    ['Sushi', '🍣'],
    ['Taco', '🌮'],
    ['Pancake', '🥞'],
    ['Spaghetti', '🍝'],
    ['Burrito', '🌯'],
    ['Croissant', '🥐'],
    ['Dumpling', '🥟'],
    ['Waffle', '🧇'],
    ['Burger', '🍔'],
    ['Ramen', '🍜'],
    ['Falafel', '🧆'],
    ['Donut', '🍩'],
    ['Pretzel', '🥨'],
    ['Curry', '🍛'],
    ['Bagel', '🥯'],
    ['Hot Dog', '🌭'],
    ['Sandwich', '🥪'],
    ['Popcorn', '🍿'],
    ['Ice Cream', '🍦'],
  ],
  animals: [
    ['Elephant', '🐘'],
    ['Penguin', '🐧'],
    ['Octopus', '🐙'],
    ['Kangaroo', '🦘'],
    ['Giraffe', '🦒'],
    ['Dolphin', '🐬'],
    ['Hedgehog', '🦔'],
    ['Peacock', '🦚'],
    ['Cheetah', '🐆'],
    ['Bat', '🦇'],
    ['Flamingo', '🦩'],
    ['Raccoon', '🦝'],
    ['Otter', '🦦'],
    ['Chameleon', '🦎'],
    ['Koala', '🐨'],
    ['Turtle', '🐢'],
    ['Parrot', '🦜'],
    ['Seal', '🦭'],
    ['Fox', '🦊'],
    ['Sloth', '🦥'],
  ],
  places: [
    ['Beach', '🏖️'],
    ['Airport', '✈️'],
    ['Library', '📚'],
    ['Museum', '🏛️'],
    ['Volcano', '🌋'],
    ['Castle', '🏰'],
    ['Desert', '🏜️'],
    ['Ferris Wheel', '🎡'],
    ['Jungle', '🌴'],
    ['Stadium', '🏟️'],
    ['Bridge', '🌉'],
    ['Glacier', '🏔️'],
    ['Farm', '🚜'],
    ['Subway', '🚇'],
    ['Playground', '🛝'],
    ['Campsite', '⛺'],
    ['Marketplace', '🛒'],
    ['Cruise Ship', '🚢'],
    ['Amusement Park', '🎠'],
    ['Garden', '🌷'],
  ],
  occupations: [
    ['Firefighter', '🧑‍🚒'],
    ['Astronaut', '🧑‍🚀'],
    ['Chef', '🧑‍🍳'],
    ['Dentist', '🦷'],
    ['Pilot', '🧑‍✈️'],
    ['Teacher', '🧑‍🏫'],
    ['Scientist', '🧑‍🔬'],
    ['Plumber', '🧑‍🔧'],
    ['Detective', '🕵️'],
    ['Artist', '🧑‍🎨'],
    ['Singer', '🧑‍🎤'],
    ['Surgeon', '🧑‍⚕️'],
    ['Judge', '🧑‍⚖️'],
    ['Photographer', '📸'],
    ['Lifeguard', '🛟'],
    ['Police Officer', '👮'],
    ['Construction Worker', '👷'],
    ['Barista', '☕'],
    ['Royal Guard', '💂'],
    ['Farmer', '🧑‍🌾'],
  ],
  objects: [
    ['Umbrella', '☂️'],
    ['Backpack', '🎒'],
    ['Telescope', '🔭'],
    ['Candle', '🕯️'],
    ['Mirror', '🪞'],
    ['Ladder', '🪜'],
    ['Compass', '🧭'],
    ['Frying Pan', '🍳'],
    ['Paintbrush', '🖌️'],
    ['Flashlight', '🔦'],
    ['Suitcase', '🧳'],
    ['Broom', '🧹'],
    ['Thermometer', '🌡️'],
    ['Scissors', '✂️'],
    ['Anchor', '⚓'],
    ['Trophy', '🏆'],
    ['Kettle', '🫖'],
    ['Bucket', '🪣'],
    ['Magnifying Glass', '🔍'],
    ['Lantern', '🏮'],
  ],
  entertainment: [
    ['Circus', '🎪'],
    ['Magic Trick', '🎩'],
    ['Movie Night', '🎬'],
    ['Karaoke', '🎤'],
    ['Board Game', '🎲'],
    ['Roller Coaster', '🎢'],
    ['Fireworks', '🎆'],
    ['Parade', '🎉'],
    ['Dance Party', '💃'],
    ['Superhero', '🦸'],
    ['Kite Flying', '🪁'],
    ['Puzzle', '🧩'],
    ['Video Game', '🎮'],
    ['Comic Book', '📖'],
    ['Bubble Blowing', '🫧'],
    ['Face Painting', '🎨'],
    ['Hide and Seek', '🙈'],
    ['Cotton Candy', '🍭'],
    ['Balloon Pop', '🎈'],
    ['Concert', '🎵'],
  ],
  nature: [
    ['Thunderstorm', '⛈️'],
    ['Rainbow', '🌈'],
    ['Snowman', '⛄'],
    ['Tornado', '🌪️'],
    ['Sunrise', '🌅'],
    ['Moon', '🌙'],
    ['Blizzard', '🌨️'],
    ['Butterfly', '🦋'],
    ['Seashell', '🐚'],
    ['Comet', '☄️'],
    ['Flower', '🌸'],
    ['Fog', '🌫️'],
    ['Coral Reef', '🪸'],
    ['Cactus', '🌵'],
    ['Star', '⭐'],
    ['Snail', '🐌'],
    ['Leaf', '🍁'],
    ['Frost', '🧊'],
    ['Tree', '🌳'],
    ['Sun', '☀️'],
  ],
  technology: [
    ['Robot', '🤖'],
    ['Rocket', '🚀'],
    ['Satellite', '🛰️'],
    ['Smartwatch', '⌚'],
    ['Printer', '🖨️'],
    ['Telephone', '☎️'],
    ['Keyboard', '⌨️'],
    ['Battery', '🔋'],
    ['Headphones', '🎧'],
    ['Lightbulb', '💡'],
    ['Television', '📺'],
    ['Alarm Clock', '⏰'],
    ['Magnet', '🧲'],
    ['Traffic Light', '🚦'],
    ['Speaker', '🔊'],
    ['Antenna', '📡'],
    ['Video Camera', '🎥'],
    ['Camera', '📷'],
    ['Microphone', '🎙️'],
    ['Charger', '🔌'],
  ],
  sportsAndGames: [
    ['Chess', '♟️'],
    ['Bowling', '🎳'],
    ['Archery', '🏹'],
    ['Surfing', '🏄'],
    ['Gymnastics', '🤸'],
    ['Fencing', '🤺'],
    ['Golf', '⛳'],
    ['Skateboarding', '🛹'],
    ['Rock Climbing', '🧗'],
    ['Table Tennis', '🏓'],
    ['Rowing', '🚣'],
    ['Frisbee', '🥏'],
    ['Snowboarding', '🏂'],
    ['Badminton', '🏸'],
    ['Wrestling', '🤼'],
    ['Darts', '🎯'],
    ['Volleyball', '🏐'],
    ['Hockey', '🏒'],
    ['Cycling', '🚴'],
    ['Marathon', '🏃'],
  ],
  holidays: [
    ['Birthday Party', '🎂'],
    ['Halloween', '🎃'],
    ['New Year', '🥳'],
    ['Wedding', '💒'],
    ['Graduation', '🎓'],
    ['Picnic', '🧺'],
    ['High Five', '🙌'],
    ['Road Trip', '🚗'],
    ['Campfire', '🔥'],
    ['Sleepover', '🛌'],
    ['Marshmallow', '🍡'],
    ['Cupcake', '🧁'],
    ['Ribbon', '🎀'],
    ['Confetti', '🎊'],
    ['Piñata', '🪅'],
    ['Present', '🎁'],
    ['Medal', '🏅'],
    ['Drum', '🥁'],
    ['Crown', '👑'],
    ['Snow Day', '❄️'],
  ],
} as const satisfies Record<string, [word: string, emoji: string][]>;

export type WordCategory = keyof typeof WORD_CATEGORIES;

/** Display label for the Imposter's category hint — see docs/GAME_RULES.md "Imposter privacy". */
const CATEGORY_LABELS: Record<WordCategory, string> = {
  food: 'Food',
  animals: 'Animals',
  places: 'Places',
  occupations: 'Occupations',
  objects: 'Objects',
  entertainment: 'Entertainment',
  nature: 'Nature',
  technology: 'Technology',
  sportsAndGames: 'Sports & Games',
  holidays: 'Holidays & Celebrations',
};

export type WordEntry = {
  word: string;
  emoji: string;
  category: string;
  categoryEmoji: string;
};

const ALL_WORDS: WordEntry[] = Object.entries(WORD_CATEGORIES).flatMap(([key, words]) => {
  const category = key as WordCategory;
  return words.map(([word, emoji]) => ({
    word,
    emoji,
    category: CATEGORY_LABELS[category],
    categoryEmoji: CATEGORY_EMOJI[category],
  }));
});

/**
 * Picks a random secret word (with its emoji and category), optionally
 * excluding words already used this session so repeat games stay varied.
 * Falls back to the full pool if every word has been used.
 */
export function getRandomWordEntry(excluding: readonly string[] = []): WordEntry {
  const excludeSet = new Set(excluding);
  const available = ALL_WORDS.filter((entry) => !excludeSet.has(entry.word));
  const pool = available.length > 0 ? available : ALL_WORDS;
  return pool[Math.floor(Math.random() * pool.length)];
}
