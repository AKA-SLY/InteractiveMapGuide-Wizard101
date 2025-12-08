import { libraryPath, formatLibraryFileName } from "../lib/library";
import { type Spell } from "../types";

// Minimal Astral spell population to address missing Sun/Moon/Star coverage.
// Images point directly to the existing official assets under:
//   public/W101 Images/ Extra Skill Spells/<School> Spells/(Spell)_<Name>.webp

const astralImage = (school: "Sun" | "Moon" | "Star", name: string) =>
  libraryPath(
    ` Extra Skill Spells/${school} Spells`,
    `(Spell)_${formatLibraryFileName(name)}`,
    "webp",
    (v) => v,
  );

const sun = (
  name: string,
  props: Partial<Spell> = {},
): Spell => ({
  name,
  school: "Sun",
  rank: 0,
  pipCost: props.pipCost ?? 0,
  accuracy: props.accuracy ?? "100%",
  effect: props.effect ?? "Sun enchant or utility",
  description: props.description ?? "Sun school enhance/utility card.",
  sources: props.sources ?? [
    { type: "Trainer", detail: "Celestia Base Camp", location: "Celestia" },
  ],
  hasTreasureCard: props.hasTreasureCard ?? true,
  image: astralImage("Sun", name),
});

const moon = (
  name: string,
  props: Partial<Spell> = {},
): Spell => ({
  name,
  school: "Moon",
  rank: props.rank ?? 5,
  pipCost: props.pipCost ?? 6,
  accuracy: props.accuracy ?? "100%",
  effect: props.effect ?? "Polymorph or Shift",
  description: props.description ?? "Moon school polymorph/shift spell.",
  sources: props.sources ?? [
    { type: "Trainer", detail: "Celestia Base Camp", location: "Celestia" },
  ],
  image: astralImage("Moon", name),
});

const star = (
  name: string,
  props: Partial<Spell> = {},
): Spell => ({
  name,
  school: "Star",
  rank: props.rank ?? 1,
  pipCost: props.pipCost ?? 2,
  accuracy: props.accuracy ?? "100%",
  effect: props.effect ?? "Aura",
  description: props.description ?? "Star school aura buff.",
  sources: props.sources ?? [
    { type: "Trainer", detail: "Celestia Base Camp", location: "Celestia" },
  ],
  image: astralImage("Star", name),
});

export const astralSpells: Spell[] = [
  // Sun – enchants, utilities
  sun("Accurate"),
  sun("Keen Eyes"),
  sun("Strong"),
  sun("Giant"),
  sun("Gargantuan"),
  sun("Colossal"),
  sun("Extraordinary"),
  sun("Epic"),
  sun("Primordial"),
  sun("Sharpened Blade"),
  sun("Potent Trap"),
  sun("Aegis"),
  sun("Indemnity"),
  sun("Solar Shield"),
  sun("Solar Blade"),
  sun("Solar Surge"),
  sun("Monstrous"),
  sun("Daybreaker", { pipCost: 0 }),
  sun("Nightbringer", { pipCost: 0 }),
  // Some popular mutate tags from Sun folder
  sun("Mutate Kraken", { description: "Sun mutate card.", pipCost: 0 }),
  sun("Mutate Phoenix", { description: "Sun mutate card.", pipCost: 0 }),

  // Moon – polymorphs and shifts
  moon("Polymorph Gobbler"),
  moon("Polymorph Mander"),
  moon("Polymorph Treant"),
  moon("Polymorph Draconian"),
  moon("Polymorph Cat Bandit"),
  moon("Polymorph Colossus"),
  moon("Shift Jade Oni", { pipCost: 3 }),
  moon("Shift Rattlebones", { pipCost: 3 }),
  moon("Shift Samoorai", { pipCost: 3 }),
  moon("Shift Bunferatu", { pipCost: 3 }),
  moon("Shift Krokopatra", { pipCost: 3 }),
  moon("Shift Black Knight", { pipCost: 3 }),
  moon("Shift GreenOak", { pipCost: 3 }),
  moon("Break Free (Moon)", { pipCost: 2 }),

  // Star – auras
  star("Amplify"),
  star("Fortify"),
  star("Furnace"),
  star("Galvanic Field"),
  star("Infallible"),
  star("Mend"),
  star("Reliquary"),
  star("Virulence"),
  star("Punishment"),
  star("Chastisement"),
  star("Cycle of Life"),
  star("Empowerment"),
  star("Devotion"),
  star("Sleet Storm"),
  star("Vengeance"),
  star("Conviction"),
  star("Berserk"),
];
