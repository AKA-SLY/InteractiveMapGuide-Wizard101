import { type TreasureCard } from "../types";

export const treasureCards: TreasureCard[] = [
  {
    name: "Fire Cat (TC)",
    relatedSpell: "Fire Cat",
    school: "Fire",
    pipCost: 1,
    accuracy: "75%",
    effect: "65–105 Fire damage",
    description: "Single-hit treasure card version of the classic Fire Cat.",
    sources: [
      {
        type: "Vendor",
        detail: "Ravenwood Library treasure card vendor",
        location: "Wizard City",
      },
      { type: "Dropped", detail: "Various Fire mobs in Wizard City" },
    ],
  },
  {
    name: "Fireblade (TC)",
    relatedSpell: "Fireblade",
    school: "Fire",
    pipCost: 0,
    accuracy: "100%",
    effect: "+35% to next Fire damage spell",
    description: "Treasure card version that stacks separately from trained blades.",
    sources: [
      { type: "Vendor", detail: "Librarian Fitzhume", location: "Wizard City" },
      { type: "Crafted", detail: "Crafted via Lore packs and recipes" },
    ],
  },
  {
    name: "Iceblade (TC)",
    relatedSpell: "Iceblade",
    school: "Ice",
    pipCost: 0,
    accuracy: "100%",
    effect: "+40% to next Ice damage spell",
    description: "Treasure card version ideal for stacking buffs in team play.",
    sources: [
      { type: "Vendor", detail: "Librarian Harold Argleston", location: "Wizard City" },
      { type: "Dropped", detail: "Nightshade, Foulgaze, and Krok bosses" },
    ],
  },
  {
    name: "Colossus (TC)",
    relatedSpell: "Colossus",
    school: "Ice",
    pipCost: 5,
    accuracy: "80%",
    effect: "460–540 Ice damage",
    description: "Treasure card version of the heavy Ice single-target hit.",
    sources: [
      { type: "Pack", detail: "Zeus Exalted Pack" },
      { type: "Dropped", detail: "Kraken, Krokopatra, various dungeons" },
    ],
  },
];
