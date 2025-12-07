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
  setName?: string;
  setBonus?: string;
  image?: string;
};

export type Furniture = {
  name: string;
  subcategory: string;
  world: string;
  location: string;
  interactive?: boolean;
  description?: string;
  image?: string;
};

export type TreasureCard = {
  name: string;
  relatedSpell?: string;
  school: Exclude<School, "All">;
  pipCost: number;
  accuracy: string;
  effect: string;
  description: string;
  sources: SpellSource[];
  image?: string;
};

export type Character = {
  name: string;
  role: string;
  world: string;
  location: string;
  tip?: string;
  image?: string;
};

export type FishingSpot = {
  name: string;
  world: string;
  school: Exclude<School, "All"> | "Any";
  rank: string;
  note: string;
  image?: string;
};

export type CategoryKey =
  | "Spells"
  | "Treasure Cards"
  | "Gear"
  | "Characters"
  | "Fishing"
  | "Furniture";
