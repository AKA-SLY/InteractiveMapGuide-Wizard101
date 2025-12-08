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

export const gardening: GalleryItem[] = [
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
  spellCard(
    "Summon Pixie",
    "Gardening",
    "Extra Skill Spells/Gardening Spells",
    "(Item_Card)_Summon_Pixie",
    ["Item card", "Summons gardening pixie helper"],
  ),
  spellCard(
    "Bug Bolt",
    "Gardening",
    "Extra Skill Spells/Gardening Spells",
    "(Spell)_Bug_Bolt",
    ["Rank 1 gardening attack", "Removes one pest"],
  ),
  spellCard(
    "Brilliant Beams",
    "Gardening",
    "Extra Skill Spells/Gardening Spells",
    "(Spell)_Brilliant_Beams",
    ["Energy 5", "Pollinates large area"],
  ),
  spellCard(
    "Deep Freeze",
    "Gardening",
    "Extra Skill Spells/Gardening Spells",
    "(Spell)_Deep_Freeze",
    ["Rank 5 pest clear", "Freezes medium area"],
  ),
];

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
