import { characters } from "./characters";
import { fishing } from "./fishing";
import { furniture } from "./furniture";
import { gear } from "./gear";
import { locations } from "./locations";
import { spells } from "./spells";
import { treasureCards } from "./treasureCards";
import {
  type CategoryKey,
  type Character,
  type FishingSpot,
  type Furniture,
  type Gear,
  type Location,
  type Spell,
  type TreasureCard,
} from "../types";
import { w101Icon } from "../lib/library";

export const categories: {
  key: CategoryKey;
  icon: string;
  dataset: (Spell | Gear | Character | FishingSpot | Furniture | TreasureCard | Location)[];
}[] = [
  { key: "Spells", icon: w101Icon("Damage_Spell"), dataset: spells },
  { key: "Treasure Cards", icon: w101Icon("Treasure_Card"), dataset: treasureCards },
  { key: "Gear", icon: w101Icon("All_Items"), dataset: gear },
  { key: "Furniture", icon: w101Icon("House"), dataset: furniture },
  { key: "Characters", icon: w101Icon("Admin"), dataset: characters },
  { key: "Fishing", icon: w101Icon("Fish_Rank_1"), dataset: fishing },
  { key: "Locations", icon: w101Icon("Aquila"), dataset: locations },
];
