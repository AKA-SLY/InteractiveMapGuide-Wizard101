import { type Furniture } from "../types";
import { furnitureFromJson } from "./json/furnitureFromJson";
import { mergeByName } from "./util/merge";

const baseFurniture: Furniture[] = [
  {
    name: "Ravenwood Oak Desk",
    subcategory: "Indoor",
    world: "Wizard City",
    location: "Vendor — Furniture Shoppe, The Commons",
    interactive: false,
    description: "Classic wooden desk with drawers for scroll storage.",
  },
  {
    name: "Aztecan Fern Pot",
    subcategory: "Outdoor",
    world: "Azteca",
    location: "Crafted — Transmute dealer, Three Points",
    interactive: false,
    description: "Large potted fern that matches stone courtyards.",
  },
  {
    name: "Marleybone Gear Rack",
    subcategory: "Wall",
    world: "Marleybone",
    location: "Drop — Counterweight West",
    interactive: true,
    description: "Wall-mounted rack that displays up to three weapons.",
  },
];

export const furniture: Furniture[] = mergeByName<Furniture>(baseFurniture, furnitureFromJson);
