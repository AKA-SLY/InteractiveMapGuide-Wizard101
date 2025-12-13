import { w101Icon } from "../../lib/library";
import { type GalleryItem } from "../../types";
import { jsonCategoryPages, wikiUrlFromSlug } from "./index";

const placeholder = w101Icon("Mount");

export const mountsFromJson: GalleryItem[] = jsonCategoryPages
  .filter((page) => page.category.toLowerCase() === "mounts")
  .map((page) => ({
    name: (page.title ?? page.slug.replace(/\.html?$/i, "")).replace(/[_-]/g, " ").replace(/\s+-\s*Wizard101 Wiki.*/i, "").trim(),
    category: "Mounts",
    image: placeholder,
    wikiUrl: wikiUrlFromSlug(page.slug),
  }));
