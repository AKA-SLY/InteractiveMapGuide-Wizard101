import { type Gear } from "../types";

export const gear: Gear[] = [
  {
    name: "Novice Fire Hat",
    school: "Fire",
    type: "Hat",
    subcategory: "Starter",
    level: 10,
    stats: "+5% Accuracy, +40 Health",
    location: "Vendor — The Commons",
  },
  {
    name: "Ice Seafarer Robe",
    school: "Ice",
    type: "Robe",
    subcategory: "Dungeon Drops",
    level: 15,
    stats: "+75 Health, +8% Resist",
    location: "Drop — Lady Blackhope (Wizard City)",
    setName: "Seafarer Set",
    setBonus: "+40 Health, +1% Power Pip for 2 pieces",
  },
  {
    name: "Shocking Blade",
    school: "Storm",
    type: "Athame",
    subcategory: "Crafted",
    level: 20,
    stats: "+75 Health, +7% Damage",
    location: "Crafted — Marleybone",
  },
  {
    name: "Avalon Vanguard Boots",
    school: "Balance",
    type: "Boots",
    subcategory: "Set Piece",
    level: 70,
    stats: "+8% Damage, +6% Resist, +120 Health",
    location: "Drop — High level Avalon bosses",
    setName: "Vanguard of Avalon",
    setBonus: "+5% Damage (2pcs), +10% Incoming Heal (3pcs)",
  },
];
