import { type Spell } from "../../types";
import { jsonArrayEntries, jsonCategoryPages, jsonRecordValues, wikiUrlFromSlug } from "./index";

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

const simpleSpells = [...jsonArrayEntries(), ...jsonRecordValues()]
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

const parsePipCost = (value: string | null | undefined) => {
  const digits = (value ?? "").match(/\d+/g)?.map(Number) ?? [];
  return digits.length ? digits.reduce((sum, n) => sum + n, 0) : 0;
};

const pickHeader = (rows: any[][]) => {
  const index = rows.findIndex((row) => row.some((cell) => typeof cell === "string" && /spell/i.test(cell)));
  return { index, header: index >= 0 ? rows[index] : [] } as const;
};

const lookupCell = (row: any[], headers: string[], key: string) => {
  const index = headers.findIndex((h) => h.includes(key));
  return index >= 0 ? row[index] : undefined;
};

const toString = (value: any) => (value == null ? "" : String(value)).trim();

const parseSpellTables = (page: (typeof jsonCategoryPages)[number]): Spell[] => {
  const school = schoolFromCategory(page.category) ?? "Balance";
  const baseSource = { type: "Other" as const, detail: "Wizard101 Wiki", location: wikiUrlFromSlug(page.slug) };

  return page.tables.flatMap((table) => {
    const rows = table.rows ?? [];
    if (!rows.length) return [] as Spell[];

    const { index: headerIndex, header } = pickHeader(rows);
    const normalizedHeader = header.map((h) => toString(h).toLowerCase());
    const dataRows = normalizedHeader.length ? rows.slice(headerIndex + 1) : rows.slice(1);

    return dataRows
      .map((rowRaw) => {
        const row = rowRaw as any[];
        const name = toString(lookupCell(row, normalizedHeader, "spell") ?? row[0]);
        if (!name) return null;

        const pipCost = parsePipCost(toString(lookupCell(row, normalizedHeader, "pip")));
        const description = toString(lookupCell(row, normalizedHeader, "description") ?? row[3] ?? "See wiki entry");
        const levelRequirementRaw = lookupCell(row, normalizedHeader, "level") ?? row[1];
        const levelRequirement = Number.isFinite(Number(levelRequirementRaw)) ? Number(levelRequirementRaw) : undefined;

        const questNote = row.slice(header.length).map(toString).find((v) => v.toLowerCase().includes("quest"));
        const sources = questNote
          ? [baseSource, { type: "Quest", detail: questNote } as Spell["sources"][number]]
          : [baseSource];

        return {
          name,
          school,
          rank: pipCost || 0,
          pipCost,
          accuracy: "100%",
          effect: description || "See wiki entry",
          description: description || "See wiki entry",
          levelRequirement,
          sources,
        } satisfies Spell;
      })
      .filter((v): v is Spell => v !== null);
  });
};

const categorySpells: Spell[] = jsonCategoryPages
  .filter((page) => /spell/i.test(page.category))
  .flatMap(parseSpellTables);

export const spellsFromJson: Spell[] = [...simpleSpells, ...categorySpells];
