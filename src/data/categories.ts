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
import spellIcon from "../assets/icons/categories/spell.svg";
import treasureIcon from "../assets/icons/categories/treasure.svg";
import gearIcon from "../assets/icons/categories/gear.svg";
import furnitureIcon from "../assets/icons/categories/furniture.svg";
import characterIcon from "../assets/icons/categories/character.svg";
import fishingIcon from "../assets/icons/categories/fishing.svg";
import locationIcon from "../assets/icons/categories/location.svg";

export const categories: {
  key: CategoryKey;
  icon: string;
  dataset: (Spell | Gear | Character | FishingSpot | Furniture | TreasureCard | Location)[];
}[] = [
  { key: "Spells", icon: spellIcon, dataset: spells },
  { key: "Treasure Cards", icon: treasureIcon, dataset: treasureCards },
  { key: "Gear", icon: gearIcon, dataset: gear },
  { key: "Furniture", icon: furnitureIcon, dataset: furniture },
  { key: "Characters", icon: characterIcon, dataset: characters },
  { key: "Fishing", icon: fishingIcon, dataset: fishing },
  { key: "Locations", icon: locationIcon, dataset: locations },
];
