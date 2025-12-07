import { type Location } from "../types";

export const locations: Location[] = [
  {
    name: "Ravenwood",
    world: "Wizard City",
    zone: "The Commons",
    description:
      "Home of the main schools and professors; hub for early quests and spell training.",
    npcs: ["Merle Ambrose", "Dalia Falmea", "Cyrus Drake", "Moolinda Wu"],
    mapImage: "/Images/locations/ravenwood-map.png",
    bubbleImage: "/Images/locations/ravenwood-bubble.png",
  },
  {
    name: "The Oasis",
    world: "Krokotopia",
    zone: "Krokosphinx",
    description: "Central market and quest hub leading into the tombs of Krokotopia.",
    npcs: ["Sergeant Major Talbot", "Zan'ne"],
    bosses: ["General Khaba"],
    mapImage: "/Images/locations/oasis-map.png",
    bubbleImage: "/Images/locations/oasis-bubble.png",
  },
  {
    name: "Barkingham Palace",
    world: "Marleybone",
    zone: "Regent's Square",
    description:
      "Side dungeon with Clockwork foes, unique badges, and several notable item drops.",
    bosses: ["Meowiarty", "Chief Whip"],
    mapImage: "/Images/locations/barkingham-palace-map.png",
    bubbleImage: "/Images/locations/barkingham-palace-bubble.png",
  },
];
