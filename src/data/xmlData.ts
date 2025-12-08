import type { Quest } from "../types";
import spellsXml from "../../RDF TO  XML Indexes/Category Spells.xml?raw";
import balanceSpellsXml from "../../RDF TO  XML Indexes/Category Balance Spells.xml?raw";

const parseSpellSubjects = (xml: string) => {
  if (typeof DOMParser === "undefined") return [] as string[];

  const doc = new DOMParser().parseFromString(xml, "application/xml");
  const subjects = Array.from(doc.querySelectorAll("swivt\\:Subject"));

  return subjects
    .map((subject) => subject.querySelector("rdfs\\:label")?.textContent?.trim())
    .filter((value): value is string => Boolean(value));
};

const allSpells = parseSpellSubjects(spellsXml);
const balanceSpells = parseSpellSubjects(balanceSpellsXml);

export const xmlDataStats = {
  totalSpells: allSpells.length,
  balanceSpellCount: balanceSpells.length,
  sampleSpells: allSpells.slice(0, 5),
};

export const xmlSpellEntries: Quest[] = allSpells.map((name) => ({ name }));
export const xmlBalanceSpellEntries: Quest[] = balanceSpells.map((name) => ({ name }));
