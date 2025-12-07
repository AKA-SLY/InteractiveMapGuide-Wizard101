import { libraryRoot } from "../lib/library";
import { type GalleryItem } from "../types";
import { worlds } from "./worlds";
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
  buildTags?: (file: string) => string[] | undefined,
): GalleryItem[] =>
  files.map((file) => ({
    name: readableName(file, prefix),
    category,
    image: libraryRoot(folder, file),
    tags: buildTags?.(file),
  }));

const inferWorldTag = (file: string) => {
  const normalized = file.replace(/\.[^.]+$/, "").replace(/[_-]/g, " ").toLowerCase();
  const match = worlds.find((world) =>
    normalized.includes(world.name.toLowerCase().replace(/\s+/g, " ")),
  );

  return [match?.name ?? "Unknown World"];
};

export const fireSpellCards: GalleryItem[] = buildGallery(
  fireSpellFiles,
  "Wizard101 Fire_Spells",
  "Spell Cards",
);

export const henchmen: GalleryItem[] = buildGallery(henchmenFiles, "Henchment", "Henchmen");

export const jewels: GalleryItem[] = buildGallery(jewelFiles, "Jewels", "Jewels");

export const minions: GalleryItem[] = buildGallery(
  minionFiles,
  "Minions",
  "Minions",
  undefined,
  inferWorldTag,
);

export const worldMaps: GalleryItem[] = buildGallery(worldMapFiles, "World map Images", "World Maps");

export const icons: GalleryItem[] = buildGallery(iconFiles, "Icons", "Icons");

export const mounts: GalleryItem[] = icons.filter((icon) => /mount/i.test(icon.name));
