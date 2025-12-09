import { type TreasureCard } from "../../types";
import { jsonArrayEntries } from "./index";

type Raw = Record<string, any>;

const coerceSchool = (value: string | null | undefined): TreasureCard["school"] | null => {
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

const isTC = (e: Raw) =>
  e && typeof e === "object" && typeof e.name === "string" && (e.related_spell != null || /\(TC\)/i.test(e.name) || e.is_treasure_card === true);

export const treasureCardsFromJson: TreasureCard[] = jsonArrayEntries()
  .filter(isTC)
  .map((e: Raw): TreasureCard | null => {
    const school = coerceSchool(e.school);
    if (!e.name || !school) return null;
    const pipCost = Number(e.pip_cost ?? e.pips ?? 0) || 0;
    const accuracy = typeof e.accuracy === "string" ? e.accuracy : (e.accuracy != null ? `${e.accuracy}%` : "100%");
    const effect = (e.effect as string) || (e.description as string) || "Treasure card";
    const description = (e.description as string) || effect;
    return {
      name: (e.name as string).includes("(TC)") ? (e.name as string) : `${e.name} (TC)`,
      relatedSpell: (e.related_spell as string) || undefined,
      school,
      pipCost,
      accuracy,
      effect,
      description,
      sources: e.wiki_url ? [{ type: "Other", detail: "Wiki", location: e.wiki_url as string }] : [],
    };
  })
  .filter((v): v is TreasureCard => v !== null);
