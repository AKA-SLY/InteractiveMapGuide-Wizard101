import { type Location } from "../../types";
import { jsonArrayEntries } from "./index";

type Raw = Record<string, any>;

const isLocationish = (e: Raw) =>
  e && typeof e === "object" && typeof e.name === "string" && (e.world || e.zone || e.category === "Location");

const toArray = (v: any): string[] | undefined =>
  Array.isArray(v) ? v.filter((x) => typeof x === "string") : undefined;

export const locationsFromJson: Location[] = jsonArrayEntries()
  .filter(isLocationish)
  .map((e: Raw): Location | null => {
    if (!e.name) return null;
    return {
      name: e.name as string,
      world: (e.world as string) || "Unknown World",
      zone: (e.zone as string) || undefined,
      description: (e.description as string) || (e.note as string) || undefined,
      access: (e.access as string) || undefined,
      npcs: toArray(e.npcs),
      bosses: toArray(e.bosses),
      collectibles: toArray(e.collectibles),
    };
  })
  .filter((v): v is Location => v !== null);
