import { worldBubblePath, worldMapPath } from "../lib/library";

export type WorldMarker = {
  label: string;
  x: number;
  y: number;
  type?: "quest" | "trainer" | "boss" | "collectible" | "npc" | "vendor";
  note?: string;
};

export type WorldBubble = {
  name: string;
  summary: string;
  bubbleImage?: string;
  mapImage?: string;
  markers?: WorldMarker[];
};

export const worlds: WorldBubble[] = [
  {
    name: "Wizard City",
    summary: "Start here — classes, commons, and basics.",
    bubbleImage: worldBubblePath("Wizard City"),
    mapImage: worldMapPath("Wizard City"),
    markers: [
      { label: "Prospector Zeke — Smiths", x: 18, y: 55, type: "quest" },
      { label: "Ravenwood Classrooms", x: 48, y: 63, type: "trainer" },
      { label: "Unicorn Way", x: 71, y: 69, type: "quest" },
    ],
  },
  {
    name: "Krokotopia",
    summary: "Pyramids, Balance lessons, and hidden obelisks.",
    bubbleImage: worldBubblePath("Krokotopia"),
    mapImage: worldMapPath("Krokotopia"),
    markers: [
      { label: "Balance School Antechamber", x: 60, y: 56, type: "trainer" },
      { label: "Prospector Zeke — Beetles", x: 34, y: 66, type: "quest" },
      { label: "Temple of Storms", x: 79, y: 74, type: "boss" },
    ],
  },
  {
    name: "Marleybone",
    summary: "Cobblestone capers with clockworks and detectives.",
    bubbleImage: worldBubblePath("Marleybone"),
    mapImage: worldMapPath("Marleybone"),
    markers: [
      { label: "Digmoore Station", x: 24, y: 54, type: "npc", note: "Train travel" },
      { label: "Royal Museum", x: 57, y: 47, type: "boss" },
      { label: "Knight’s Court", x: 78, y: 63, type: "quest" },
    ],
  },
  {
    name: "Mooshu",
    summary: "Spiritual gardens, Oni bosses, and Jade Palace.",
    bubbleImage: worldBubblePath("Mooshu"),
    mapImage: worldMapPath("Mooshu"),
    markers: [
      { label: "Jade Palace", x: 55, y: 47, type: "npc" },
      { label: "Plague Oni", x: 25, y: 68, type: "boss" },
      { label: "Village of Sorrow", x: 73, y: 78, type: "quest" },
    ],
  },
  {
    name: "Dragonspyre",
    summary: "Lava forges, Drake brothers, and final exams.",
    bubbleImage: worldBubblePath("Dragonspyre"),
    mapImage: worldMapPath("Dragonspyre"),
    markers: [
      { label: "Bastion", x: 32, y: 40, type: "npc" },
      { label: "Great Spyre", x: 69, y: 58, type: "boss" },
      { label: "Dragonspyre Academy", x: 48, y: 62, type: "trainer" },
    ],
  },
  {
    name: "Celestia",
    summary: "Underwater domes and the birth of Astral magic.",
    bubbleImage: worldBubblePath("Celestia"),
    mapImage: worldMapPath("Celestia"),
    markers: [
      { label: "Survey Camp", x: 18, y: 62, type: "quest" },
      { label: "Celestia Base Camp", x: 48, y: 52, type: "npc" },
      { label: "Trial of the Spheres", x: 78, y: 58, type: "boss" },
    ],
  },
  {
    name: "Zafaria",
    summary: "Savannah rings, Drum Jungle, and Baobab market.",
    bubbleImage: worldBubblePath("Zafaria"),
    mapImage: worldMapPath("Zafaria"),
    markers: [
      { label: "Baobab Crossroads", x: 42, y: 48, type: "npc" },
      { label: "Savannah Baobab Chest", x: 63, y: 60, type: "collectible" },
      { label: "Drum Jungle", x: 77, y: 74, type: "boss" },
    ],
  },
  {
    name: "Avalon",
    summary: "Knights, Wyrd woods, and King Artorius’ quests.",
    bubbleImage: worldBubblePath("Avalon"),
    mapImage: worldMapPath("Avalon"),
    markers: [
      { label: "Caliburn", x: 34, y: 44, type: "npc" },
      { label: "Wyrd", x: 64, y: 62, type: "quest" },
      { label: "Keep of Ganelon", x: 78, y: 52, type: "boss" },
    ],
  },
  {
    name: "Azteca",
    summary: "Dying world of Aztecosaurs racing against comets.",
    bubbleImage: worldBubblePath("Azteca"),
    mapImage: worldMapPath("Azteca"),
    markers: [
      { label: "Zocalo", x: 36, y: 46, type: "npc" },
      { label: "Three Points", x: 54, y: 60, type: "trainer" },
      { label: "Twin Giants", x: 78, y: 64, type: "boss" },
    ],
  },
  {
    name: "Khrysalis",
    summary: "Shadow-touched siege against the Umbra Legion.",
    bubbleImage: worldBubblePath("Khrysalis"),
    mapImage: worldMapPath("Khrysalis"),
    markers: [
      { label: "Bastion", x: 38, y: 46, type: "npc" },
      { label: "Radiance Reborn", x: 66, y: 52, type: "quest" },
      { label: "Fort Rachias", x: 74, y: 66, type: "boss" },
    ],
  },
  {
    name: "Polaris",
    summary: "Frozen revolution led by Rasputin’s Borealis army.",
    bubbleImage: worldBubblePath("Polaris"),
    mapImage: worldMapPath("Polaris"),
    markers: [
      { label: "Walruskberg", x: 38, y: 50, type: "npc" },
      { label: "River of Frozen Tears", x: 62, y: 60, type: "quest" },
      { label: "Rasputin — Shadow Palace", x: 78, y: 68, type: "boss" },
    ],
  },
  {
    name: "Mirage",
    summary: "Dunes, thieves, and grand libraries in Aggrobah.",
    bubbleImage: worldBubblePath("Mirage"),
    mapImage: worldMapPath("Mirage"),
    markers: [
      { label: "Aggrobah Market", x: 36, y: 54, type: "npc" },
      { label: "Alkali Barrows", x: 62, y: 50, type: "quest" },
      { label: "Caterwaul Canyons", x: 78, y: 62, type: "collectible" },
    ],
  },
  {
    name: "Empyrea",
    summary: "Skyship arcs through Storm and Chaos segments.",
    bubbleImage: worldBubblePath("Empyrea"),
    mapImage: worldMapPath("Empyrea"),
    markers: [
      { label: "Port Aero", x: 30, y: 46, type: "npc" },
      { label: "Aerial Jungle", x: 54, y: 64, type: "quest" },
      { label: "Sky Anchor Base", x: 76, y: 58, type: "boss" },
    ],
  },
  {
    name: "Karamelle",
    summary: "Candy citadels hiding surprisingly dark secrets.",
    bubbleImage: worldBubblePath("Karamelle"),
    mapImage: worldMapPath("Karamelle"),
    markers: [
      { label: "Sweetburg", x: 34, y: 50, type: "npc" },
      { label: "Nana’s Skyway", x: 56, y: 60, type: "vendor" },
      { label: "Gutenstadt Factory", x: 78, y: 68, type: "boss" },
    ],
  },
];
