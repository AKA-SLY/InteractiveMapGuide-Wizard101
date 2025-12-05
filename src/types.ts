export type School =
  | "All"
  | "Fire"
  | "Ice"
  | "Storm"
  | "Myth"
  | "Life"
  | "Death"
  | "Balance"
  | "Astral"
  | "Shadow";

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

export type CategoryKey = "Spells" | "Gear" | "Characters" | "Fishing";
