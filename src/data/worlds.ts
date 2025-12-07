import { worldBubblePath, worldMapPath } from "../lib/library";

export type WorldBubble = {
  name: string;
  summary: string;
  bubbleImage?: string;
  mapImage?: string;
};

export const worlds: WorldBubble[] = [
  {
    name: "Wizard City",
    summary: "Start here — classes, commons, and basics.",
    bubbleImage: worldBubblePath("Wizard City"),
    mapImage: worldMapPath("Wizard City"),
  },
  {
    name: "Krokotopia",
    summary: "Pyramids, Balance lessons, and hidden obelisks.",
    bubbleImage: worldBubblePath("Krokotopia"),
    mapImage: worldMapPath("Krokotopia"),
  },
  {
    name: "Marleybone",
    summary: "Cobblestone capers with clockworks and detectives.",
    bubbleImage: worldBubblePath("Marleybone"),
    mapImage: worldMapPath("Marleybone"),
  },
  {
    name: "Mooshu",
    summary: "Spiritual gardens, Oni bosses, and Jade Palace.",
    bubbleImage: worldBubblePath("Mooshu"),
    mapImage: worldMapPath("Mooshu"),
  },
  {
    name: "Dragonspyre",
    summary: "Lava forges, Drake brothers, and final exams.",
    bubbleImage: worldBubblePath("Dragonspyre"),
    mapImage: worldMapPath("Dragonspyre"),
  },
  {
    name: "Celestia",
    summary: "Underwater domes and the birth of Astral magic.",
    bubbleImage: worldBubblePath("Celestia"),
    mapImage: worldMapPath("Celestia"),
  },
  {
    name: "Zafaria",
    summary: "Savannah rings, Drum Jungle, and Baobab market.",
    bubbleImage: worldBubblePath("Zafaria"),
    mapImage: worldMapPath("Zafaria"),
  },
  {
    name: "Avalon",
    summary: "Knights, Wyrd woods, and King Artorius’ quests.",
    bubbleImage: worldBubblePath("Avalon"),
    mapImage: worldMapPath("Avalon"),
  },
  {
    name: "Azteca",
    summary: "Dying world of Aztecosaurs racing against comets.",
    bubbleImage: worldBubblePath("Azteca"),
    mapImage: worldMapPath("Azteca"),
  },
  {
    name: "Khrysalis",
    summary: "Shadow-touched siege against the Umbra Legion.",
    bubbleImage: worldBubblePath("Khrysalis"),
    mapImage: worldMapPath("Khrysalis"),
  },
  {
    name: "Polaris",
    summary: "Frozen revolution led by Rasputin’s Borealis army.",
    bubbleImage: worldBubblePath("Polaris"),
    mapImage: worldMapPath("Polaris"),
  },
  {
    name: "Mirage",
    summary: "Dunes, thieves, and grand libraries in Aggrobah.",
    bubbleImage: worldBubblePath("Mirage"),
    mapImage: worldMapPath("Mirage"),
  },
  {
    name: "Empyrea",
    summary: "Skyship arcs through Storm and Chaos segments.",
    bubbleImage: worldBubblePath("Empyrea"),
    mapImage: worldMapPath("Empyrea"),
  },
  {
    name: "Karamelle",
    summary: "Candy citadels hiding surprisingly dark secrets.",
    bubbleImage: worldBubblePath("Karamelle"),
    mapImage: worldMapPath("Karamelle"),
  },
];
