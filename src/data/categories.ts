import { characters } from "./characters";
import { fishing } from "./fishing";
import { furniture } from "./furniture";
import { gear } from "./gear";
import { spells } from "./spells";
import { treasureCards } from "./treasureCards";
import {
  type CategoryKey,
  type Character,
  type FishingSpot,
  type Furniture,
  type Gear,
  type Spell,
  type TreasureCard,
} from "../types";

export const categories: {
  key: CategoryKey;
  icon: string;
  dataset: (Spell | Gear | Character | FishingSpot | Furniture | TreasureCard)[];
}[] = [
  { key: "Spells", icon: "📜", dataset: spells },
  { key: "Treasure Cards", icon: "🎴", dataset: treasureCards },
  { key: "Gear", icon: "🛡️", dataset: gear },
  { key: "Furniture", icon: "🪑", dataset: furniture },
  { key: "Characters", icon: "🧙", dataset: characters },
  { key: "Fishing", icon: "🎣", dataset: fishing },
];
