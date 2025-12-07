import { characters } from "./characters";
import { fishing } from "./fishing";
import { gear } from "./gear";
import { spells } from "./spells";
import {
  type CategoryKey,
  type Character,
  type FishingSpot,
  type Gear,
  type Spell,
} from "../types";

export const categories: {
  key: CategoryKey;
  icon: string;
  dataset: (Spell | Gear | Character | FishingSpot)[];
}[] = [
  { key: "Spells", icon: "📜", dataset: spells },
  { key: "Gear", icon: "🛡️", dataset: gear },
  { key: "Characters", icon: "🧙", dataset: characters },
  { key: "Fishing", icon: "🎣", dataset: fishing },
];
