import { characters } from "./characters";
import { bosses } from "./bosses";
import { castles } from "./castles";
import { fishing } from "./fishing";
import { furniture } from "./furniture";
import { gear } from "./gear";
import { henchmen, jewels, mounts, minions } from "./galleries";
import { locations } from "./locations";
import { quests } from "./quests";
import { spells } from "./spells";
import { treasureCards } from "./treasureCards";
import {
  cantrip,
  extraSkillsIcon,
  gardening,
  monstrology,
  fishingSpells,
} from "./extraSkills";
import { scrolls } from "./scrolls";
import {
  type CategoryKey,
  type Character,
  type FishingSpot,
  type GalleryItem,
  type Quest,
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
  dataset: (Quest | Spell | Gear | Character | FishingSpot | Furniture | TreasureCard | Location | GalleryItem)[];
}[] = [
  { key: "Spells", icon: w101Icon("Damage_Spell"), dataset: spells },
  { key: "Treasure Cards", icon: w101Icon("Treasure_Card"), dataset: treasureCards },
  { key: "Gear", icon: w101Icon("All_Items"), dataset: gear },
  { key: "Furniture", icon: w101Icon("House"), dataset: furniture },
  { key: "Castles", icon: w101Icon("Castle"), dataset: castles },
  { key: "Scrolls", icon: w101Icon("Music_Scroll"), dataset: scrolls },
  { key: "Quests", icon: w101Icon("Quest"), dataset: quests },
  { key: "Characters", icon: w101Icon("Admin"), dataset: characters },
  { key: "Bosses", icon: w101Icon("Warning_Red"), dataset: bosses },
  { key: "Henchmen", icon: w101Icon("Minion"), dataset: henchmen },
  { key: "Fishing", icon: w101Icon("Fish_Rank_1"), dataset: fishing },
  { key: "Locations", icon: w101Icon("Aquila"), dataset: locations },
  { key: "Jewels", icon: w101Icon("Jewel"), dataset: jewels },
  { key: "Minions", icon: w101Icon("Minion"), dataset: minions },
  { key: "Mounts", icon: w101Icon("Mount"), dataset: mounts },
  { key: "Gardening", icon: extraSkillsIcon, dataset: gardening },
  { key: "Monstrology", icon: w101Icon("Monstrology"), dataset: monstrology },
  { key: "Cantrip", icon: w101Icon("Cantrip"), dataset: cantrip },
  { key: "Fishing Spells", icon: w101Icon("Fishing"), dataset: fishingSpells },
];
