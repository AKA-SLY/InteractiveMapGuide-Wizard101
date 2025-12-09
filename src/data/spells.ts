import { libraryRoot } from "../lib/library";
import { type Spell } from "../types";
import { astralSpells } from "./astralSpells";
import { fireSpellFiles } from "./libraryFiles";

const normalizeName = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");

const spellImageMap = new Map<string, string>();

fireSpellFiles.forEach((file) => {
  const key = normalizeName(file.replace(/\.[^.]+$/, ""));
  if (!spellImageMap.has(key)) {
    spellImageMap.set(key, libraryRoot("Wizard101 Fire_Spells", file));
  }
});

const spellImage = (name: string) => spellImageMap.get(normalizeName(name));

const baseSpells: Spell[] = [
  {
    name: "Fire Cat",
    school: "Fire",
    rank: 1,
    pipCost: 1,
    accuracy: "75%",
    effect: "65–105 Fire damage",
    description: "A quick Fire opener that is reliable early on.",
    sources: [
      { type: "Trainer", detail: "Learned from Dalia Falmea", location: "Ravenwood" },
      { type: "Vendor", detail: "Treasure card from library vendor" },
    ],
    hasTreasureCard: true,
  },
  {
    name: "Fireblade",
    school: "Fire",
    rank: 0,
    pipCost: 0,
    accuracy: "100%",
    effect: "+35% to next Fire damage spell",
    description: "Core buff for every Fire hitter—stack before any big attack.",
    sources: [
      { type: "Trainer", detail: "Dalia Falmea teaches at level 7", location: "Ravenwood" },
      { type: "Quest", detail: "Given after the early Fire questline" },
    ],
    hasTreasureCard: true,
  },
  {
    name: "Fire Trap",
    school: "Fire",
    rank: 0,
    pipCost: 0,
    accuracy: "100%",
    effect: "+30% to next Fire spell on target",
    description: "Easy-to-stack trap that amplifies any following Fire hit.",
    sources: [
      { type: "Trainer", detail: "Dalia Falmea", location: "Ravenwood" },
      { type: "Quest", detail: "Unlocked through Fire study" },
    ],
    hasTreasureCard: true,
  },
  {
    name: "Fire Elf",
    school: "Fire",
    rank: 2,
    pipCost: 2,
    accuracy: "80%",
    effect: "210 Fire damage over 3 rounds",
    description: "Damage-over-time opener that keeps shields at bay.",
    sources: [
      { type: "Trainer", detail: "Dalia Falmea", location: "Ravenwood" },
      { type: "Dropped", detail: "Fire elites across Krokotopia" },
    ],
    hasTreasureCard: true,
  },
  {
    name: "Sunbird",
    school: "Fire",
    rank: 3,
    pipCost: 3,
    accuracy: "80%",
    effect: "305–345 Fire damage",
    description: "Reliable single-target hit for early and midgame bosses.",
    sources: [
      { type: "Trainer", detail: "Dalia Falmea", location: "Ravenwood" },
      { type: "Quest", detail: "Earned in Fire studies", location: "Fire School" },
    ],
    hasTreasureCard: true,
  },
  {
    name: "Heck Hound",
    school: "Fire",
    rank: 3,
    pipCost: 3,
    accuracy: "75%",
    effect: "Damage-over-time scales with each pip used",
    description: "Load extra pips to ramp this DoT for shield-piercing pressure.",
    sources: [
      { type: "Trainer", detail: "Dalia Falmea", location: "Ravenwood" },
      { type: "Dropped", detail: "Kraken, Krokopatra, and early bosses" },
    ],
    treasureCardNote: "Treasure card variant stacks separately and appears in packs.",
    hasTreasureCard: true,
  },
  {
    name: "Meteor Strike",
    school: "Fire",
    rank: 4,
    pipCost: 4,
    accuracy: "75%",
    effect: "305–345 Fire damage to all enemies",
    description: "Classic Fire AoE that clears mobs once you gain power pips.",
    sources: [
      { type: "Trainer", detail: "Dalia Falmea", location: "Ravenwood" },
      { type: "Quest", detail: "Unlocked during Krokotopia progression" },
    ],
    hasTreasureCard: true,
  },
  {
    name: "Phoenix",
    school: "Fire",
    rank: 5,
    pipCost: 5,
    accuracy: "70%",
    effect: "515–595 Fire damage",
    description: "Solid midgame boss killer once you have blades.",
    sources: [
      { type: "Trainer", detail: "Dalia Falmea", location: "Ravenwood" },
      { type: "Quest", detail: "Krokotopia story progression" },
    ],
  },
  {
    name: "Power Link",
    school: "Fire",
    rank: 5,
    pipCost: 5,
    accuracy: "80%",
    effect: "305 Fire damage over 3 rounds + 203 healing over 3 rounds",
    description: "Provides steady sustain while keeping pressure on a single foe.",
    sources: [
      { type: "Trainer", detail: "Dalia Falmea", location: "Ravenwood" },
      { type: "Quest", detail: "Rewarded during Dragonspyre" },
    ],
    hasTreasureCard: true,
  },
  {
    name: "Helephant",
    school: "Fire",
    rank: 6,
    pipCost: 6,
    accuracy: "80%",
    effect: "585–645 Fire damage",
    description: "Signature late-game Fire nuke before moving into shadow hits.",
    sources: [
      { type: "Trainer", detail: "Dalia Falmea", location: "Ravenwood" },
      { type: "Dropped", detail: "Dropped by Dragonspyre bosses" },
    ],
  },
  {
    name: "Efreet",
    school: "Fire",
    rank: 8,
    pipCost: 8,
    accuracy: "75%",
    effect: "835–915 Fire damage and -45% accuracy to target",
    description: "Heavy burst with a crippling weakness to slow down enemy casts.",
    sources: [
      { type: "Trainer", detail: "Dalia Falmea", location: "Ravenwood" },
      { type: "Quest", detail: "Awarded in Zafaria storyline" },
    ],
  },
  {
    name: "Snow Serpent",
    school: "Ice",
    rank: 2,
    pipCost: 2,
    accuracy: "85%",
    effect: "190–230 Ice damage",
    description: "Cheap Ice hitter with great accuracy for combos.",
    sources: [
      { type: "Trainer", detail: "Lydia Greyrose", location: "Ravenwood" },
      { type: "Dropped", detail: "Frost themed mobs in Krokotopia" },
    ],
  },
  {
    name: "Ice Beetle",
    school: "Ice",
    rank: 1,
    pipCost: 1,
    accuracy: "90%",
    effect: "65–105 Ice damage",
    description: "Early-game poke that pairs with traps for quick finishes.",
    sources: [
      { type: "Trainer", detail: "Lydia Greyrose", location: "Ravenwood" },
      { type: "Vendor", detail: "Treasure card versions at library" },
    ],
    hasTreasureCard: true,
  },
  {
    name: "Ice Trap",
    school: "Ice",
    rank: 0,
    pipCost: 0,
    accuracy: "100%",
    effect: "+30% to next Ice spell on target",
    description: "Simple trap that boosts any following Ice hit.",
    sources: [
      { type: "Trainer", detail: "Lydia Greyrose", location: "Ravenwood" },
      { type: "Quest", detail: "Awarded in early Ice quests" },
    ],
    hasTreasureCard: true,
  },
  {
    name: "Iceblade",
    school: "Ice",
    rank: 0,
    pipCost: 0,
    accuracy: "100%",
    effect: "+40% to next Ice damage spell",
    description: "Bread-and-butter Ice buff for both hitters and tanks.",
    sources: [
      { type: "Trainer", detail: "Lydia Greyrose", location: "Ravenwood" },
      { type: "Quest", detail: "Gained after early Ice story quests" },
    ],
    hasTreasureCard: true,
  },
  {
    name: "Blizzard",
    school: "Ice",
    rank: 4,
    pipCost: 4,
    accuracy: "80%",
    effect: "290–370 Ice damage to all enemies",
    description: "Go-to mob clear that stays consistent thanks to high accuracy.",
    sources: [
      { type: "Trainer", detail: "Lydia Greyrose", location: "Ravenwood" },
      { type: "Quest", detail: "Unlocked mid Krokotopia" },
    ],
    hasTreasureCard: true,
  },
  {
    name: "Colossus",
    school: "Ice",
    rank: 5,
    pipCost: 5,
    accuracy: "80%",
    effect: "460–540 Ice damage",
    description: "Chunky single-target hit that benefits from Ice’s natural resist.",
    sources: [
      { type: "Trainer", detail: "Lydia Greyrose", location: "Ravenwood" },
      { type: "Quest", detail: "Given mid-MB storyline", location: "Marleybone" },
    ],
    hasTreasureCard: true,
  },
  {
    name: "Frostbite",
    school: "Ice",
    rank: 5,
    pipCost: 5,
    accuracy: "75%",
    effect: "45 Ice damage + 420 Ice damage over 3 rounds",
    description: "Premium DoT that slices through shields and sets up follow-ups.",
    sources: [
      { type: "Trainer", detail: "Lydia Greyrose", location: "Ravenwood" },
      { type: "Dropped", detail: "Dropped by bosses in Marleybone" },
    ],
    hasTreasureCard: true,
  },
  {
    name: "Ice Wyvern",
    school: "Ice",
    rank: 6,
    pipCost: 6,
    accuracy: "85%",
    effect: "515–595 Ice damage",
    description: "Efficient boss finisher when you need accuracy over raw damage.",
    sources: [
      { type: "Trainer", detail: "Lydia Greyrose", location: "Ravenwood" },
      { type: "Quest", detail: "Granted in Dragonspyre" },
    ],
  },
  {
    name: "Frost Giant",
    school: "Ice",
    rank: 7,
    pipCost: 7,
    accuracy: "80%",
    effect: "460–540 Ice damage to all enemies and Stun",
    description: "Arena staple that freezes entire mobs for a free follow-up.",
    sources: [
      { type: "Trainer", detail: "Lydia Greyrose", location: "Ravenwood" },
      { type: "Quest", detail: "Earned late Marleybone" },
    ],
    hasTreasureCard: true,
  },
  {
    name: "Tower Shield",
    school: "Ice",
    rank: 0,
    pipCost: 0,
    accuracy: "100%",
    effect: "-50% to next incoming damage spell",
    description: "Universal shield that keeps tanks alive through heavy hits.",
    sources: [
      { type: "Trainer", detail: "Lydia Greyrose", location: "Ravenwood" },
      { type: "Vendor", detail: "Treasure cards from many libraries" },
    ],
    hasTreasureCard: true,
  },
  {
    name: "Woolly Mammoth",
    school: "Ice",
    rank: 8,
    pipCost: 8,
    accuracy: "80%",
    effect: "770–830 Ice damage and Stun",
    description: "High-level burst that also steals a round with an automatic stun.",
    sources: [
      { type: "Trainer", detail: "Lydia Greyrose", location: "Ravenwood" },
      { type: "Quest", detail: "Unlocked in Zafaria" },
    ],
  },
];

// Merge core (Elemental/Spirit/Balance) spell samples with Astral (Sun/Moon/Star)
export const spells: Spell[] = [...baseSpells, ...astralSpells].map((spell) => ({
  ...spell,
  image: spell.image ?? spellImage(spell.name),
}));
