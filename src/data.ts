export type School = "All" | "Fire" | "Ice" | "Storm" | "Myth" | "Life" | "Death" | "Balance";

export type Spell = {
  name: string;
  school: Exclude<School, "All">;
  rank: number;
  pipCost: number;
  accuracy: string;
  effect: string;
  description: string;
};

export type Gear = {
  name: string;
  school: Exclude<School, "All">;
  type: string;
  level: number;
  stats: string;
  location: string;
};

export type Character = {
  name: string;
  role: string;
  world: string;
  location: string;
  tip?: string;
};

export type FishingSpot = {
  name: string;
  world: string;
  school: Exclude<School, "All"> | "Any";
  rank: string;
  note: string;
};

export const schools: School[] = [
  "All",
  "Fire",
  "Ice",
  "Storm",
  "Myth",
  "Life",
  "Death",
  "Balance",
];

export const spells: Spell[] = [
  {
    name: "Fire Cat",
    school: "Fire",
    rank: 1,
    pipCost: 1,
    accuracy: "75%",
    effect: "65–105 Fire damage",
    description: "A quick Fire opener that is reliable early on.",
  },
  {
    name: "Snow Serpent",
    school: "Ice",
    rank: 2,
    pipCost: 2,
    accuracy: "85%",
    effect: "190–230 Ice damage",
    description: "Cheap Ice hitter with great accuracy for combos.",
  },
  {
    name: "Storm Shark",
    school: "Storm",
    rank: 3,
    pipCost: 3,
    accuracy: "70%",
    effect: "375–435 Storm damage",
    description: "Glass-cannon strike that pairs well with buffs.",
  },
  {
    name: "Phoenix",
    school: "Fire",
    rank: 5,
    pipCost: 5,
    accuracy: "70%",
    effect: "515–595 Fire damage",
    description: "Solid midgame boss killer once you have blades.",
  },
  {
    name: "Lifeblade",
    school: "Life",
    rank: 0,
    pipCost: 0,
    accuracy: "100%",
    effect: "+35% to next Life spell",
    description: "Essential buff for any Life hitter or support.",
  },
  {
    name: "Feint",
    school: "Death",
    rank: 0,
    pipCost: 0,
    accuracy: "100%",
    effect: "+70% outgoing / +30% incoming",
    description: "High-risk, high-reward trap used in nearly all strats.",
  },
];

export const gear: Gear[] = [
  {
    name: "Novice Fire Hat",
    school: "Fire",
    type: "Hat",
    level: 10,
    stats: "+5% Accuracy, +40 Health",
    location: "Vendor — The Commons",
  },
  {
    name: "Ice Seafarer Robe",
    school: "Ice",
    type: "Robe",
    level: 15,
    stats: "+75 Health, +8% Resist",
    location: "Drop — Lady Blackhope (Wizard City)",
  },
  {
    name: "Shocking Blade",
    school: "Storm",
    type: "Athame",
    level: 20,
    stats: "+75 Health, +7% Damage",
    location: "Crafted — Marleybone",
  },
];

export const characters: Character[] = [
  {
    name: "Merle Ambrose",
    role: "Headmaster",
    world: "Wizard City",
    location: "Ravenwood",
    tip: "Talk to him to move the main story forward.",
  },
  {
    name: "Gamma",
    role: "Guide",
    world: "Wizard City",
    location: "Ravenwood",
    tip: "Helps explain new mechanics for brand-new wizards.",
  },
  {
    name: "Eloise Merryweather",
    role: "Vendor",
    world: "Multiple",
    location: "The Commons",
    tip: "Sells stitching and collects world-specific crafts.",
  },
  {
    name: "Dworgyn",
    role: "Trainer",
    world: "Wizard City",
    location: "Nightside",
    tip: "Unlocks Feint and other key Death utility spells.",
  },
];

export const fishing: FishingSpot[] = [
  {
    name: "Icecuda",
    world: "Wizard City",
    school: "Ice",
    rank: "Rank 1",
    note: "Common starter fish found around the Commons pond.",
  },
  {
    name: "Grape Jellyfish",
    world: "Krokotopia",
    school: "Life",
    rank: "Rank 1",
    note: "Easier to catch in the Oasis when using Reveal Fish School.",
  },
  {
    name: "Silver Streak",
    world: "Grizzleheim",
    school: "Storm",
    rank: "Rank 2",
    note: "Prefers stormy ponds near Northguard’s waterfall.",
  },
];

export const categories = [
  { key: "Spells", icon: "📜", dataset: spells },
  { key: "Gear", icon: "🛡️", dataset: gear },
  { key: "Characters", icon: "🧙", dataset: characters },
  { key: "Fishing", icon: "🎣", dataset: fishing },
] as const;
