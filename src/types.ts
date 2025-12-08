export type School =
  | "All"
  | "Fire"
  | "Ice"
  | "Storm"
  | "Myth"
  | "Life"
  | "Death"
  | "Balance"
  | "Sun"
  | "Moon"
  | "Star"
  | "Shadow";

export type SpellSource = {
  type:
    | "Trainer"
    | "Quest"
    | "Vendor"
    | "Dropped"
    | "Crafted"
    | "TC Vendor"
    | "Pack"
    | "Other";
  detail: string;
  location?: string;
  npc?: string;
};

export type Spell = {
  name: string;
  school: Exclude<School, "All">;
  rank: number;
  pipCost: number;
  accuracy: string;
  effect: string;
  description: string;
  target?: string;
  levelRequirement?: number;
  trainingPointCost?: string;
  schoolPipCost?: number;
  shadowPipCost?: number;
  cardType?: string;
  sources: SpellSource[];
  image?: string;
  hasTreasureCard?: boolean;
  treasureCardNote?: string;
};

export type Gear = {
  name: string;
  school: Exclude<School, "All">;
  type: string;
  subcategory: string;
  level: number;
  stats: string;
  location: string;
  rarity?: string;
  auctionable?: string;
  setName?: string;
  setBonus?: string;
  image?: string;
  sources?: SpellSource[];
};

export type Furniture = {
  name: string;
  subcategory: string;
  world: string;
  location: string;
  rarity?: string;
  buyPrice?: string;
  sellPrice?: string;
  crafting?: string;
  tags?: string[];
  interactive?: boolean;
  description?: string;
  image?: string;
  sources?: SpellSource[];
};

export type TreasureCard = {
  name: string;
  relatedSpell?: string;
  school: Exclude<School, "All">;
  pipCost: number;
  accuracy: string;
  effect: string;
  description: string;
  target?: string;
  levelRequirement?: string;
  trainingPointCost?: string;
  sources: SpellSource[];
  image?: string;
};

export type Quest = {
  name: string;
  world?: string;
  category?: string;
  description?: string;
  wikiUrl?: string;
  image?: string;
  sources?: SpellSource[];
};

export type Location = {
  name: string;
  world: string;
  zone?: string;
  description?: string;
  access?: string;
  mapImage?: string;
  bubbleImage?: string;
  npcs?: string[];
  bosses?: string[];
  collectibles?: string[];
  image?: string;
  sources?: SpellSource[];
};

export type GalleryItem = {
  name: string;
  category: string;
  image: string;
  tags?: string[];
  wikiUrl?: string;
};

export type Character = {
  name: string;
  role: string;
  world: string;
  location: string;
  school?: Exclude<School, "All">;
  rank?: string;
  health?: number;
  cheats?: string;
  classification?: (
    | "Trainer"
    | "Boss"
    | "Minion"
    | "Vendor"
    | "Quest Giver"
    | "Dropping Loot"
    | "Ally"
    | "Professor"
    | "Support"
  )[];
  loot?: string[];
  tip?: string;
  image?: string;
  wikiUrl?: string;
  sources?: SpellSource[];
};

export type FishingSpot = {
  name: string;
  world: string;
  school: Exclude<School, "All"> | "Any";
  rank: string;
  note: string;
  rarity?: string;
  tank?: string;
  xp?: number;
  size?: string;
  image?: string;
  wikiUrl?: string;
  sources?: SpellSource[];
};

export type CategoryKey =
  | "Spells"
  | "Treasure Cards"
  | "Gear"
  | "Characters"
  | "Fishing"
  | "Furniture"
  | "Castles"
  | "Scrolls"
  | "Quests"
  | "Locations"
  | "Henchmen"
  | "Jewels"
  | "Minions"
  | "Mounts"
  | "Gardening"
  | "Monstrology"
  | "Cantrip"
  | "Bosses"
  | "Fishing Spells";
