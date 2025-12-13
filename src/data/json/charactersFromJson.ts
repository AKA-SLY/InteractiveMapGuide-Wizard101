import { type Character } from "../../types";
import { flattenJsonCells, jsonArrayEntries, jsonCategoryPages, wikiUrlFromSlug } from "./index";

type Raw = Record<string, any>;

const coerceSchool = (value: string | null | undefined): Character["school"] | undefined => {
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
  return undefined;
};

const toArray = (v: any): string[] | undefined =>
  Array.isArray(v) ? v.filter((x) => typeof x === "string") : undefined;

const isCharacterish = (e: Raw) => e && typeof e === "object" && typeof e.name === "string" && (e.world || e.location || e.role);

const simpleCharacters = jsonArrayEntries()
  .filter(isCharacterish)
  .map((e: Raw): Character | null => {
    if (!e.name) return null;
    const role = (e.role as string) || (e.type as string) || "NPC";
    const world = (e.world as string) || "Unknown World";
    const location = (e.location as string) || e.zone || "Unknown Location";
    const classification = toArray(e.classification) ?? toArray(e.tags);
    const loot = toArray(e.loot);
    const wikiUrl = (e.wiki_url as string) || (e.wikiUrl as string);
    return {
      name: e.name as string,
      role,
      world,
      location,
      school: coerceSchool(e.school),
      rank: e.rank as string | undefined,
      health: typeof e.health === "number" ? (e.health as number) : undefined,
      cheats: e.cheats as string | undefined,
      classification: classification as any,
      loot,
      tip: (e.tip as string) || (e.note as string) || undefined,
      wikiUrl,
    };
  })
  .filter((v): v is Character => v !== null);

const cleanName = (title?: string) =>
  title?.replace(/^NPC:/i, "").replace(/-\s*Wizard101 Wiki.*$/i, "").trim() ?? undefined;

const categoryCharacters: Character[] = jsonCategoryPages
  .filter((page) => /npc/i.test(page.category) || /trainer/i.test(page.category))
  .map((page) => {
    const name = cleanName(page.title) ?? page.slug.replace(/\.html?$/i, "").replace(/[_-]/g, " ");
    const world = page.category.replace(/\s*npc$/i, "").trim() || "Unknown World";
    const cells = flattenJsonCells(page.tables);
    const location = cells.find((cell) => /commons|area|street|swamp|village|plaza/i.test(cell)) ?? cells[0] ?? world;
    const role = /trainer/i.test(page.category) ? "Trainer" : "NPC";
    const classification = /trainer/i.test(page.category) ? (["Trainer"] as Character["classification"]) : undefined;
    return {
      name,
      role,
      world,
      location: location || world,
      classification,
      wikiUrl: wikiUrlFromSlug(page.slug),
    };
  });

export const charactersFromJson: Character[] = [...simpleCharacters, ...categoryCharacters];
