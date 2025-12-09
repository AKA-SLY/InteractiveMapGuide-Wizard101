import { type Furniture } from "../../types";
import { jsonArrayEntries } from "./index";

type Raw = Record<string, any>;

const isFurnitureish = (e: Raw) =>
  e && typeof e === "object" && typeof e.name === "string" && (e.world || e.location || e.subcategory || e.category === "Furniture");

const firstStr = (arr: any): string | undefined =>
  Array.isArray(arr) ? arr.find((x) => typeof x === "string") : undefined;

export const furnitureFromJson: Furniture[] = jsonArrayEntries()
  .filter(isFurnitureish)
  .map((e: Raw): Furniture | null => {
    if (!e.name) return null;
    const tags: string[] | undefined = Array.isArray(e.tags) ? e.tags.filter((t: any) => typeof t === "string") : undefined;
    return {
      name: e.name as string,
      subcategory: (e.subcategory as string) || (e.type as string) || (e.category as string) || "Indoor",
      world: (e.world as string) || "Unknown",
      location: (e.location as string) || (e.vendor as string) || "Unknown",
      rarity: (e.rarity as string) || undefined,
      buyPrice: (e.buy_price as string) || (e.buy as string) || undefined,
      sellPrice: (e.sell_price as string) || undefined,
      crafting: (e.crafting as string) || undefined,
      tags: tags ?? (firstStr(e.shape) ? [firstStr(e.shape)!] : undefined),
      interactive: Boolean(e.interactive),
      description: (e.description as string) || (e.note as string) || undefined,
    };
  })
  .filter((v): v is Furniture => v !== null);
