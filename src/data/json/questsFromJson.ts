import { type Quest } from "../../types";
import { jsonArrayEntries, jsonCategoryPages, wikiUrlFromSlug } from "./index";

type Raw = Record<string, any>;

const isQuestish = (e: Raw) => e && typeof e === "object" && typeof e.name === "string" && (e.category || e.world || e.wiki_url);

const simpleQuests = jsonArrayEntries()
  .filter(isQuestish)
  .map((e: Raw): Quest | null => {
    if (!e.name) return null;
    return {
      name: e.name as string,
      world: (e.world as string) || undefined,
      category: (e.category as string) || undefined,
      description: (e.description as string) || (e.note as string) || undefined,
      wikiUrl: (e.wiki_url as string) || (e.wikiUrl as string) || undefined,
    };
  })
  .filter((v): v is Quest => v !== null);

const cleanName = (title?: string) =>
  title?.replace(/^Quest:/i, "").replace(/-\s*Wizard101 Wiki.*$/i, "").trim() ?? undefined;

const categoryQuests: Quest[] = jsonCategoryPages
  .filter((page) => /quest/i.test(page.category))
  .map((page) => ({
    name: cleanName(page.title) ?? page.slug.replace(/\.html?$/i, "").replace(/[_-]/g, " "),
    category: page.category,
    wikiUrl: wikiUrlFromSlug(page.slug),
  }));

export const questsFromJson: Quest[] = [...simpleQuests, ...categoryQuests];
