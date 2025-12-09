import { type Quest } from "../../types";
import { jsonArrayEntries } from "./index";

type Raw = Record<string, any>;

const isQuestish = (e: Raw) => e && typeof e === "object" && typeof e.name === "string" && (e.category || e.world || e.wiki_url);

export const questsFromJson: Quest[] = jsonArrayEntries()
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
