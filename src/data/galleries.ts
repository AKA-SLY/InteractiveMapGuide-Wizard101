import { libraryRoot } from "../lib/library";
import { type GalleryItem } from "../types";
import {
  fireSpellFiles,
  henchmenFiles,
  iconFiles,
  jewelFiles,
  minionFiles,
  worldMapFiles,
} from "./libraryFiles";

const readableName = (fileName: string, prefix?: string) => {
  const withoutExt = fileName.replace(/\.[^.]+$/, "");
  const withoutPrefix = prefix ? withoutExt.replace(new RegExp(`^${prefix}`), "") : withoutExt;
  return withoutPrefix.replace(/_/g, " ").trim();
};

const buildGallery = (
  files: readonly string[],
  folder: string,
  category: GalleryItem["category"],
  prefix?: string,
): GalleryItem[] =>
  files.map((file) => ({
    name: readableName(file, prefix),
    category,
    image: libraryRoot(folder, file),
  }));

export const fireSpellCards: GalleryItem[] = buildGallery(
  fireSpellFiles,
  "Wizard101 Fire_Spells",
  "Spell Cards",
);

export const henchmen: GalleryItem[] = buildGallery(henchmenFiles, "Henchment", "Henchmen");

export const jewels: GalleryItem[] = buildGallery(jewelFiles, "Jewels", "Jewels");

export const minions: GalleryItem[] = buildGallery(minionFiles, "Minions", "Minions");

export const worldMaps: GalleryItem[] = buildGallery(worldMapFiles, "World map Images", "World Maps");

export const icons: GalleryItem[] = buildGallery(iconFiles, "Icons", "Icons");

export const mounts: GalleryItem[] = icons.filter((icon) => /mount/i.test(icon.name));
