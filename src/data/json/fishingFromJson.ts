import { type FishingSpot } from "../../types";
import { jsonArrayEntries } from "./index";

type Raw = Record<string, any>;

const coerceSchool = (value: string | null | undefined): FishingSpot["school"] => {
  const v = (value ?? "").toLowerCase();
  if (v === "fire") return "Fire";
  if (v === "ice") return "Ice";
  if (v === "storm") return "Storm";
  if (v === "myth") return "Myth";
  if (v === "life") return "Life";
  if (v === "death") return "Death";
  if (v === "balance") return "Balance";
  return "Any";
};

const isFishingish = (e: Raw) =>
  e && typeof e === "object" && typeof e.name === "string" && (e.world || e.school || e.rank || e.category === "Fishing");

export const fishingFromJson: FishingSpot[] = jsonArrayEntries()
  .filter(isFishingish)
  .map((e: Raw): FishingSpot | null => {
    if (!e.name) return null;
    return {
      name: e.name as string,
      world: (e.world as string) || "Unknown",
      school: coerceSchool(e.school),
      rank: (e.rank as string) || "Unknown",
      note: (e.note as string) || (e.description as string) || "",
      rarity: (e.rarity as string) || undefined,
      tank: (e.tank as string) || undefined,
      xp: typeof e.xp === "number" ? (e.xp as number) : undefined,
      size: (e.size as string) || undefined,
    };
  })
  .filter((v): v is FishingSpot => v !== null);
