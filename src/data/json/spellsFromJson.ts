import { type Spell } from "../../types";
import {
  jsonArrayEntries,
  jsonCategoryPages,
  wikiUrlFromSlug,
} from "./index";

type Raw = Record<string, any>;

const coerceSchool = (value: string | null | undefined): Spell["school"] | null => {
  const v = (value ?? "").toLowerCase();
  if (v === "fire") return "Fire";
  if (v === "ice") return "Ice";
  if (v === "storm") return "Storm";
  if (v === "myth") return "Myth";
  if (v === "life") return "Life";
  if (v === "death") return "Death";
  if (v === "balance") return "Balance";
  if (v === "sun") return "Sun";
  if (v === "moon") return "Moon";
  if (v === "star") return "Star";
  if (v === "shadow") return "Shadow";
  return null;
};

const isSpellish = (e: Raw) =>
  e && typeof e === "object" && typeof e.name === "string" && (e.school != null || e.pip_cost != null || e.accuracy != null || e.effect != null);

const simpleSpells = jsonArrayEntries()
  .filter(isSpellish)
  .map((e: Raw): Spell | null => {
    const school = coerceSchool(e.school);
    if (!e.name || !school) return null;
    const pip = Number(e.pip_cost ?? e.pips ?? e.cost ?? 0) || 0;
    const rank = Number(e.rank ?? 0) || 0;
    const accuracy = typeof e.accuracy === "string" ? e.accuracy : (e.accuracy != null ? `${e.accuracy}%` : "100%");
    const effect = (e.effect as string) || (e.description as string) || "Spell effect";
    const description = (e.description as string) || effect;
    const sources = e.wiki_url ? [{ type: "Other", detail: "Wiki", location: e.wiki_url as string }] : [];
    return {
      name: e.name as string,
      school,
      rank,
      pipCost: pip,
      accuracy,
      effect,
      description,
      sources,
      hasTreasureCard: Boolean(e.has_treasure_card ?? e.treasure_card),
    };
  })
  .filter((v): v is Spell => v !== null);

const schoolFromCategory = (category: string): Spell["school"] | null => {
  const normalized = category.toLowerCase();
  if (normalized.includes("fire")) return "Fire";
  if (normalized.includes("ice")) return "Ice";
  if (normalized.includes("storm")) return "Storm";
  if (normalized.includes("myth")) return "Myth";
  if (normalized.includes("life")) return "Life";
  if (normalized.includes("death")) return "Death";
  if (normalized.includes("balance")) return "Balance";
  if (normalized.includes("sun")) return "Sun";
  if (normalized.includes("moon")) return "Moon";
  if (normalized.includes("star")) return "Star";
  if (normalized.includes("shadow")) return "Shadow";
  return null;
};

const cleanTitle = (title?: string) =>
  title?.replace(/^ItemCard:/i, "").replace(/-\s*Wizard101 Wiki.*$/i, "").trim() ?? undefined;

const categorySpells: Spell[] = jsonCategoryPages
  .filter((page) => /spell/i.test(page.category))
  .map((page) => {
    const school = schoolFromCategory(page.category);
    const name = cleanTitle(page.title) ?? page.slug.replace(/\.html?$/i, "").replace(/[_-]/g, " ");
    const sources = [{ type: "Other", detail: "Wizard101 Wiki", location: wikiUrlFromSlug(page.slug) }];
    return {
      name,
      school: school ?? "Balance",
      rank: 0,
      pipCost: 0,
      accuracy: "100%",
      effect: "See wiki entry",
      description: "Imported from scraped spell data",
      sources,
    };
  });

export const spellsFromJson: Spell[] = [...simpleSpells, ...categorySpells];
