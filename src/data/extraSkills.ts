import { libraryPath, w101Icon } from "../lib/library";
import { type GalleryItem } from "../types";

const extraSkillPath = (folder: string, file: string) =>
  libraryPath(folder, file, "webp", (value) => value);

const spellCard = (
  name: string,
  category: GalleryItem["category"],
  folder: string,
  file: string,
  tags: string[],
): GalleryItem => ({
  name,
  category,
  image: extraSkillPath(folder, file),
  tags,
});

const iconSpell = (
  name: string,
  category: GalleryItem["category"],
  iconName: string,
  tags: string[],
): GalleryItem => ({
  name,
  category,
  image: libraryPath("Icons", iconName, "webp"),
  tags,
});

// Expand Gardening spells using the official images already placed in the repo.
// We list the known filenames from public/W101 Images/ Extra Skill Spells/Gardening Spells
// and auto-generate GalleryItems so they populate the app without manual entry.

const gardeningFiles: { file: string; tags?: string[] }[] = [
  { file: "(Spell)_Ant_Lion" },
  { file: "(Spell)_Bee_Hive" },
  { file: "(Spell)_Bee_Team", tags: ["Rank 2 gardening attack", "Hits 3 pests for 30 per rank"] },
  { file: "(Spell)_Bee_Swarm" },
  { file: "(Spell)_Bold_Magic" },
  { file: "(Spell)_Brilliant_Beams", tags: ["Energy 5", "Pollinates large area"] },
  { file: "(Spell)_Bug_Bolt", tags: ["Rank 1 gardening attack", "Removes one pest"] },
  { file: "(Spell)_Deep_Freeze", tags: ["Rank 5 pest clear", "Freezes medium area"] },
  { file: "(Spell)_Downpour" },
  { file: "(Spell)_Dragonflies" },
  { file: "(Spell)_Enchanted_Lg_Soil" },
  { file: "(Spell)_Enchanted_Med_Soil" },
  { file: "(Spell)_Enchanted_Sm_Soil" },
  { file: "(Spell)_Flute_Duet" },
  { file: "(Spell)_Flute_Ensemble" },
  { file: "(Spell)_Flute_Solo" },
  { file: "(Spell)_Fly_Swatter" },
  { file: "(Spell)_Gusty_Winds" },
  { file: "(Spell)_Large_Soil" },
  { file: "(Spell)_Medium_Soil" },
  { file: "(Spell)_Miniature_Bloodbats" },
  { file: "(Spell)_Mist" },
  { file: "(Spell)_Monsoon" },
  { file: "(Spell)_Pest_Bomb" },
  { file: "(Spell)_Pest_Zapper" },
  { file: "(Spell)_Plant_All" },
  { file: "(Spell)_Plow" },
  { file: "(Spell)_Plow_All" },
  { file: "(Spell)_Pungent_Bug_Spray" },
  { file: "(Spell)_Putrid_Bug_Spray" },
  { file: "(Spell)_Revive" },
  { file: "(Spell)_Second_Spring" },
  { file: "(Spell)_Shower" },
  { file: "(Spell)_Small_Soil" },
  { file: "(Spell)_Solar_Flares" },
  { file: "(Spell)_Streaming_Sunlight" },
  { file: "(Spell)_Strawman" },
  { file: "(Spell)_Summon_Pixie" },
  { file: "(Spell)_Touch_of_Magic" },
  { file: "(Spell)_Warming_Rays" },
  { file: "(Spell)_Wind_Chimes" },
  { file: "(Spell)_Worker_Bee" },
  { file: "(Item_Card)_Growzone_Layer", tags: ["Item card", "Adds temporary 3×3 large plot layer"] },
  { file: "(Item_Card)_Summon_Pixie", tags: ["Item card", "Summons gardening pixie helper"] },
  { file: "(Treasure_Card)_Baby_Sunbird" },
  { file: "(Treasure_Card)_Bee_Swarm" },
  { file: "(Treasure_Card)_Flute_Solo" },
  { file: "(Treasure_Card)_Flute_Symphony" },
  { file: "(Treasure_Card)_Fly_Swatter" },
  { file: "(Treasure_Card)_Itsy_Bitsy_Spider" },
  { file: "(Treasure_Card)_Pungent_Bug_Spray" },
  { file: "(Treasure_Card)_Putrid_Bug_Spray" },
  { file: "(Treasure_Card)_Second_Spring" },
  { file: "(Treasure_Card)_Shower" },
  { file: "(Treasure_Card)_Solar_Flares" },
  { file: "(Treasure_Card)_Strawman" },
  { file: "(Treasure_Card)_Streaming_Sunlight" },
  { file: "(Treasure_Card)_Summon_Pixie" },
  { file: "(Treasure_Card)_Supreme_Sunburst" },
];

const prettifyGardeningName = (file: string) => {
  // Strip leading (Type)_ and replace underscores with spaces
  const noPrefix = file.replace(/^\((?:Spell|Item_Card|Treasure_Card|TreasureCard)\)_/i, "");
  // Friendly expansions
  return noPrefix
    .replace(/_/g, " ")
    .replace(/\bLg\b/g, "Large")
    .replace(/\bSm\b/g, "Small")
    .trim();
};

const generatedGardening: GalleryItem[] = gardeningFiles.map(({ file, tags }) =>
  spellCard(
    prettifyGardeningName(file),
    "Gardening",
    "Extra Skill Spells/Gardening Spells",
    file,
    tags ?? []
  ),
);

// Deduplicate by name while preserving the richer tag entries from the curated list below.
const curatedGardening: GalleryItem[] = [
  // Keep a few curated items with helpful tags; they will override generated entries of same name
  spellCard(
    "Bee Team",
    "Gardening",
    "Extra Skill Spells/Gardening Spells",
    "(Spell)_Bee_Team",
    ["Rank 2 gardening attack", "Hits 3 pests for 30 per rank"],
  ),
  spellCard(
    "Growzone Layer",
    "Gardening",
    "Extra Skill Spells/Gardening Spells",
    "(Item_Card)_Growzone_Layer",
    ["Item card", "Adds temporary 3×3 large plot layer"],
  ),
];

const mergeByName = (items: GalleryItem[]) => {
  const map = new Map<string, GalleryItem>();
  for (const it of items) {
    map.set(it.name.toLowerCase(), it);
  }
  return Array.from(map.values());
};

export const gardening: GalleryItem[] = mergeByName([...generatedGardening, ...curatedGardening]);

export const monstrology: GalleryItem[] = [
  iconSpell(
    "Animus Extraction",
    "Monstrology",
    "Monstrology",
    ["Rank 1", "Collect animus from enemies"],
  ),
  iconSpell("Extract Undead", "Monstrology", "Monstrology_Rank_2", ["Undead animus", "Rank 2"]),
  iconSpell("Extract Elemental", "Monstrology", "Monstrology_Rank_3", ["Elemental animus", "Rank 3"]),
  iconSpell("Extract Myth", "Monstrology", "Monstrology_Rank_4", ["Myth animus", "Rank 4"]),
  iconSpell("Expel Monster", "Monstrology", "Monstrology_Rank_5", ["Animus crafting", "Banished minion"]),
  iconSpell("House Guest", "Monstrology", "Monstrology_House_Guest", ["Create house guests", "Use extracted animus"]),
];

export const cantrip: GalleryItem[] = [
  spellCard(
    "Float",
    "Cantrip",
    "Extra Skill Spells/Cantrip Spells",
    "(Spell)_Float",
    ["Teleport pad", "Rank 1 common cantrip"],
  ),
  spellCard(
    "Levitate Spellbook",
    "Cantrip",
    "Extra Skill Spells/Cantrip Spells",
    "(Spell)_Levitate_Spellbook",
    ["Interactable prop", "Rank 2"],
  ),
  spellCard(
    "Magic Touch",
    "Cantrip",
    "Extra Skill Spells/Cantrip Spells",
    "(Spell)_Magic_Touch",
    ["Reveals hidden object", "Rank 3"],
  ),
  spellCard(
    "Major Invisibility",
    "Cantrip",
    "Extra Skill Spells/Cantrip Spells",
    "(Spell)_Major_Invisibility",
    ["Hide wizard", "Rank 5"],
  ),
  spellCard(
    "Pass Cannonball",
    "Cantrip",
    "Extra Skill Spells/Cantrip Spells",
    "(Spell)_Pass_Cannonball",
    ["Social cantrip", "Pass game object"],
  ),
  spellCard(
    "Calescent Tracker",
    "Cantrip",
    "Extra Skill Spells/Cantrip Spells",
    "(Spell)_Calescent_Tracker",
    ["Race utility", "Trail marker"],
  ),
];

export const fishingSpells: GalleryItem[] = [
  spellCard(
    "Reveal Fish School",
    "Fishing Spells",
    "Extra Skill Spells/Fishing Spells",
    "(Spell)_Reveal_Fish_School",
    ["Rank 1 fishing", "Shows school of nearby fish"],
  ),
  spellCard(
    "Summon Fish",
    "Fishing Spells",
    "Extra Skill Spells/Fishing Spells",
    "(Spell)_Summon_Fish",
    ["Rank 2 fishing", "Resets fish in pond"],
  ),
  spellCard(
    "Charm Fish",
    "Fishing Spells",
    "Extra Skill Spells/Fishing Spells",
    "(Spell)_Charm_Fish",
    ["Rank 2 fishing", "Keeps fish from fleeing"],
  ),
];

export const extraSkillsIcon = w101Icon("Utility");
