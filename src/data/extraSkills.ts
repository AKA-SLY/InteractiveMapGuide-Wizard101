import { libraryPath, w101Icon } from "../lib/library";
import { type GalleryItem } from "../types";

const placeholderSkill = (
  name: string,
  category: GalleryItem["category"],
  iconName: string,
  note?: string,
): GalleryItem => ({
  name: note ? `${name} — ${note}` : name,
  category,
  image: libraryPath("Icons", iconName, "webp"),
});

export const gardening: GalleryItem[] = [
  placeholderSkill("Seed Vault", "Gardening", "Gardening"),
  placeholderSkill("Mystic Soil", "Gardening", "Gardening_Utility"),
];

export const monstrology: GalleryItem[] = [
  placeholderSkill("Animus Extraction", "Monstrology", "Monstrology"),
  placeholderSkill("Expel Monster", "Monstrology", "Monstrology_Rank"),
];

export const cantrip: GalleryItem[] = [
  placeholderSkill("Dungeon Recall", "Cantrip", "Cantrip"),
  placeholderSkill("School Symbol", "Cantrip", "All_Schools"),
];

export const extraSkillsIcon = w101Icon("Utility");
