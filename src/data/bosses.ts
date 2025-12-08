import { characters } from "./characters";
import { type Character } from "../types";

export const bosses: Character[] = characters.filter((npc) =>
  (npc.classification ?? []).includes("Boss"),
);
