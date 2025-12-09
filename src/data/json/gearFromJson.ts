import { type Gear } from "../../types";
import { jsonArrayEntries } from "./index";

type RawItem = {
  name?: string;
  slot?: string; // e.g., "Boots"
  label?: string;
  wiki_url?: string;
  categories?: string[];
  display_name?: string;
  level_required?: number | null;
  school?: string | null;
  bonuses?: Record<string, unknown>;
  bonuses_raw?: string[];
  item_cards?: unknown[];
  dropped_by?: string[];
  vendor_sell_price?: number | null;
  tradeable?: boolean;
  no_auction?: boolean;
};

const coerceSchool = (value: string | null | undefined): Gear["school"] => {
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
  return "Balance";
};

const makeLocation = (droppedBy?: string[]) => {
  if (droppedBy && droppedBy.length)
    return `Dropped — ${droppedBy.slice(0, 2).join(", ")}${droppedBy.length > 2 ? ", …" : ""}`;
  return "Vendor or Miscellaneous";
};

const statsFrom = (bonusesRaw?: string[]) =>
  bonusesRaw && bonusesRaw.length ? bonusesRaw.join(", ") : "No listed stats";

const subcategoryFrom = (slot?: string, categories?: string[]) => categories?.[0] ?? slot ?? "Gear";

// Try to identify gear-ish records: presence of "slot" or obvious gear fields.
const isGearish = (entry: any): entry is RawItem =>
  entry && typeof entry === "object" && ("slot" in entry || "bonuses_raw" in entry || "level_required" in entry);

export const gearFromJson: Gear[] = jsonArrayEntries()
  .filter(isGearish)
  .map((item): Gear | null => {
    if (!item.name || !item.slot) return null;
    return {
      name: item.name,
      school: coerceSchool(item.school),
      type: item.slot || "Gear",
      subcategory: subcategoryFrom(item.slot, item.categories),
      level: item.level_required ?? 0,
      stats: statsFrom(item.bonuses_raw),
      location: makeLocation(item.dropped_by),
      sources: item.wiki_url ? [{ type: "Other", detail: "Wiki", location: item.wiki_url }] : undefined,
    };
  })
  .filter((v): v is Gear => v !== null);
