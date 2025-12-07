import React, { type ReactNode, useEffect, useMemo, useState } from "react";
import { categories } from "./data/categories";
import { furniture } from "./data/furniture";
import { gear } from "./data/gear";
import { locations } from "./data/locations";
import { schools } from "./data/schools";
import { spells } from "./data/spells";
import { treasureCards } from "./data/treasureCards";
import { type WorldBubble, worlds } from "./data/worlds";
import {
  type CategoryKey,
  type Character,
  type FishingSpot,
  type Gear,
  type School,
  type Spell,
  type Furniture,
  type TreasureCard,
  type SpellSource,
  type Location,
} from "./types";
import worldBubbleFallback from "./assets/icons/worlds/bubble-fallback.svg";
import worldMapFallback from "./assets/icons/worlds/map-fallback.svg";
import { formatLibraryFileName, libraryPath, w101Icon } from "./lib/library";

const PAGE_SIZE = 8;

const worldFallbackImage = worldMapFallback;

const schoolIcons: Record<School, string> = {
  All: w101Icon("All"),
  Fire: w101Icon("Fire_School"),
  Ice: w101Icon("Ice_School"),
  Storm: w101Icon("Storm_School"),
  Myth: w101Icon("Myth_School"),
  Life: w101Icon("Life_School"),
  Death: w101Icon("Death_School"),
  Balance: w101Icon("Balance_School"),
  Sun: w101Icon("Sun"),
  Moon: w101Icon("Moon"),
  Star: w101Icon("Star"),
  Shadow: w101Icon("Shadow"),
};

const categoryIconFallback: Record<CategoryKey, string> = {
  Spells: w101Icon("Damage_Spell"),
  "Treasure Cards": w101Icon("Treasure_Card"),
  Gear: w101Icon("All_Items"),
  Furniture: w101Icon("House"),
  Characters: w101Icon("Admin"),
  Fishing: w101Icon("Fish_Rank_1"),
  Locations: w101Icon("Aquila"),
};

const characterFilters = [
  "All",
  "Trainer",
  "Professor",
  "Vendor",
  "Quest Giver",
  "Boss",
  "Minion",
  "Dropping Loot",
  "Ally",
  "Support",
];

const placeholderThumb = (label: string) =>
  `https://dummyimage.com/240x240/f4e6c4/2b1441&text=${encodeURIComponent(label)}`;

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const formatPercent = (value: string | number) =>
  typeof value === "string"
    ? value.includes("%")
      ? value
      : `${value}%`
    : `${value}%`;

const libraryPathFromSlug = (
  folder: string,
  name: string,
  extension: "png" | "jpg" | "jpeg" | "webp" = "png",
  formatter: (value: string) => string = slugify,
) => libraryPath(folder, name, extension, formatter);

const worldBubblePath = (name: string) => libraryPathFromSlug("worlds/bubbles", name);
const worldMapPath = (name: string) => libraryPathFromSlug("worlds/maps", name);

const statIconFor = (label: string, value?: string) => {
  if (label === "School" && value && value in schoolIcons) {
    return schoolIcons[value as School];
  }

  if (label === "Role" && value) {
    return libraryPath("Icons", value, "webp", formatLibraryFileName);
  }

  return libraryPath("Icons", value ?? label, "webp", formatLibraryFileName);
};

const mergeStatLines = (
  base: { label: string; value: ReactNode; icon?: string }[],
  template: { label: string; value: ReactNode; icon?: string }[],
) => {
  const labels = new Set(base.map((line) => line.label));
  return [...base, ...template.filter((line) => !labels.has(line.label))];
};

const spellTemplate = (spell: Spell) => [
  { label: "Card Type", value: spell.cardType ?? "Damage", icon: w101Icon("Damage_Spell") },
  { label: "Target", value: spell.target ?? "Single Enemy", icon: w101Icon("All_Enemies") },
  {
    label: "Level Requirement",
    value: spell.levelRequirement ? `Level ${spell.levelRequirement}+` : "Level 1+ apprentice",
    icon: w101Icon("PvP_Level"),
  },
  {
    label: "Training Cost",
    value: spell.trainingPointCost ?? "0 training points + 80 gold",
    icon: w101Icon("Training_Point"),
  },
  {
    label: "School Pip Cost",
    value: spell.schoolPipCost ? `${spell.schoolPipCost} school pip` : "No school pip cost",
    icon: w101Icon(`${spell.school}_School_Pip`),
  },
  {
    label: "Shadow Pip Cost",
    value: spell.shadowPipCost ? `${spell.shadowPipCost} shadow pip` : "No shadow pips required",
    icon: w101Icon("Shadow_Pip"),
  },
  { label: "Card Text", value: spell.effect, icon: w101Icon("Effect_Spell") },
];

const treasureTemplate = (card: TreasureCard) => [
  { label: "Card Type", value: "Treasure Card", icon: w101Icon("Treasure_Card") },
  { label: "Target", value: card.target ?? "Single Enemy", icon: w101Icon("All_Enemies") },
  {
    label: "Level Requirement",
    value: card.levelRequirement ?? "Level 1+ apprentice",
    icon: w101Icon("PvP_Level"),
  },
  {
    label: "Purchase", 
    value: card.trainingPointCost ?? "Library & Bazaar pricing",
    icon: w101Icon("Gold"),
  },
];

const gearTemplate = (piece: Gear) => [
  {
    label: "Rarity",
    value: piece.rarity ?? "Dropped + Bazaar", 
    icon: w101Icon("All_Items"),
  },
  {
    label: "Auction",
    value: piece.auctionable ?? "Yes, Bazaar eligible",
    icon: w101Icon("Gold_Trophy"),
  },
];

const characterTemplate = (npc: Character) => [
  { label: "School", value: npc.school ?? "Neutral", icon: npc.school ? schoolIcons[npc.school] : w101Icon("All") },
  { label: "Rank", value: npc.rank ?? "NPC", icon: w101Icon("Warning_Red") },
  {
    label: "Health",
    value: npc.health ? `${npc.health} HP` : "Non-combatant",
    icon: w101Icon("Health"),
  },
  {
    label: "Cheats",
    value: npc.cheats ?? "No cheats observed",
    icon: w101Icon("Warning_Red_1"),
  },
];

const furnitureTemplate = (item: Furniture) => [
  { label: "Category", value: item.subcategory, icon: w101Icon("House") },
  { label: "Rarity", value: item.rarity ?? "Common", icon: w101Icon("All_Items") },
  { label: "Buy Price", value: item.buyPrice ?? "Vendor gold", icon: w101Icon("Gold") },
  { label: "Sell Price", value: item.sellPrice ?? "75% vendor value", icon: w101Icon("Gold_Chest") },
  { label: "Crafting", value: item.crafting ?? "No recipe required", icon: w101Icon("Crafting") },
  {
    label: "Housing Tags",
    value: (item.tags ?? ["Indoor Placement"]).join(", "),
    icon: w101Icon("Attic"),
  },
];

const fishingTemplate = (spot: FishingSpot) => [
  { label: "Rarity", value: spot.rarity ?? "Common", icon: w101Icon("Fish_Rank_1") },
  { label: "Tank", value: spot.tank ?? "Regular Aquarium", icon: w101Icon("Aquarium") },
  { label: "XP", value: spot.xp ? `${spot.xp} XP on catch` : "Base fishing XP", icon: w101Icon("XP") },
  { label: "Size", value: spot.size ?? "Small Fry to Whopper", icon: w101Icon("Fish_Rank_2") },
];

const locationTemplate = (loc: Location) => [
  { label: "World", value: loc.world, icon: statIconFor("World") },
  {
    label: "Access",
    value: loc.access ?? "Story progression",
    icon: w101Icon("Archmastery"),
  },
];

function getItemImage(item: CatalogItem, category: CategoryKey) {
  if ((item as CatalogItem).image) return (item as CatalogItem).image as string;

  if (category === "Spells")
    return libraryPath(
      "Wizard101 Fire_Spells",
      (item as Spell).name,
      "png",
      formatLibraryFileName,
    );
  if (category === "Treasure Cards")
    return libraryPath("treasure-cards", (item as TreasureCard).name);
  if (category === "Gear") return libraryPath("gear", (item as Gear).name);
  if (category === "Furniture")
    return libraryPath("furniture", (item as Furniture).name);
  if (category === "Characters")
    return libraryPath("characters", (item as Character).name);
  if (category === "Fishing") return libraryPath("fishing", (item as FishingSpot).name);
  if (category === "Locations") return libraryPath("locations", (item as Location).name);

  return (
    libraryPath("Icons", category, "webp", formatLibraryFileName) ||
    categoryIconFallback[category] ||
    placeholderThumb(item.name.slice(0, 8))
  );
}

type CatalogItem =
  | Spell
  | Gear
  | Character
  | FishingSpot
  | TreasureCard
  | Furniture
  | Location;

function formatMeta(item: CatalogItem, active: string) {
  switch (active) {
    case "Spells": {
      const spell = item as Spell;
      return `${spell.school} • Rank ${spell.rank} • ${spell.pipCost} pip${
        spell.pipCost === 1 ? "" : "s"
      }`;
    }
    case "Treasure Cards": {
      const tc = item as TreasureCard;
      return `${tc.school} • ${tc.pipCost} pip${tc.pipCost === 1 ? "" : "s"}`;
    }
    case "Gear": {
      const piece = item as Gear;
      return `${piece.school} ${piece.type} • ${piece.subcategory} • L${piece.level}`;
    }
    case "Characters": {
      const npc = item as Character;
      return `${npc.role} • ${npc.world} — ${npc.location}`;
    }
    case "Fishing": {
      const spot = item as FishingSpot;
      return `${spot.world} • ${spot.rank} • ${spot.school}`;
    }
    case "Furniture": {
      const furni = item as Furniture;
      return `${furni.world} • ${furni.subcategory}`;
    }
    case "Locations": {
      const location = item as Location;
      const zone = location.zone ? ` • ${location.zone}` : "";
      return `${location.world}${zone}`;
    }
    default:
      return "";
  }
}

function Details({
  item,
  category,
  onClose,
  onSelectCharacter,
  onSelectLocation,
}: {
  item: CatalogItem;
  category: CategoryKey;
  onClose: () => void;
  onSelectCharacter: (name: string) => void;
  onSelectLocation: (name: string) => void;
}) {
  const thumb = getItemImage(item, category);
  const thumbFallback =
    categoryIconFallback[category] ?? placeholderThumb(item.name.slice(0, 8));

  const linkToLocation = (name: string) => (
    <button className="chip-link" onClick={() => onSelectLocation(name)}>
      {name}
    </button>
  );

  const linkToCharacter = (name: string) => (
    <button className="chip-link" onClick={() => onSelectCharacter(name)}>
      {name}
    </button>
  );

  const statLines: { label: string; value: ReactNode; icon?: string }[] = (() => {
    switch (category) {
      case "Spells": {
        const spell = item as Spell;
        return mergeStatLines(
          [
            { label: "School", value: spell.school, icon: statIconFor("School", spell.school) },
            { label: "Rank", value: String(spell.rank), icon: statIconFor("Rank") },
            {
              label: "Pips",
              value: `${spell.pipCost} pip${spell.pipCost === 1 ? "" : "s"}`,
              icon: statIconFor("Pip"),
            },
            { label: "Accuracy", value: formatPercent(spell.accuracy), icon: statIconFor("Accuracy") },
            { label: "Effect", value: spell.effect, icon: statIconFor("Effect") },
            ...(spell.treasureCardNote
              ? [{ label: "Treasure card", value: spell.treasureCardNote }]
              : []),
          ],
          spellTemplate(spell),
        );
      }
      case "Treasure Cards": {
        const tc = item as TreasureCard;
        return mergeStatLines(
          [
            { label: "School", value: tc.school, icon: statIconFor("School", tc.school) },
            {
              label: "Pips",
              value: `${tc.pipCost} pip${tc.pipCost === 1 ? "" : "s"}`,
              icon: statIconFor("Pip"),
            },
            { label: "Accuracy", value: formatPercent(tc.accuracy), icon: statIconFor("Accuracy") },
            { label: "Effect", value: tc.effect, icon: statIconFor("Effect") },
            ...(tc.relatedSpell ? [{ label: "Related spell", value: tc.relatedSpell }] : []),
          ],
          treasureTemplate(tc),
        );
      }
      case "Gear": {
        const piece = item as Gear;
        return mergeStatLines(
          [
            { label: "Slot", value: piece.type, icon: statIconFor("Amulet") },
            { label: "School", value: piece.school, icon: statIconFor("School", piece.school) },
            { label: "Level", value: `L${piece.level}`, icon: statIconFor("Level") },
            { label: "Stats", value: piece.stats, icon: statIconFor("Stats") },
            { label: "Location", value: piece.location, icon: statIconFor("Location") },
            { label: "Subcategory", value: piece.subcategory, icon: statIconFor("Subcategory") },
            ...(piece.setName
              ? [{ label: "Set", value: piece.setName, icon: statIconFor("Set") }]
              : []),
            ...(piece.setBonus
              ? [{ label: "Set bonus", value: piece.setBonus, icon: statIconFor("Bonus") }]
              : []),
          ],
          gearTemplate(piece),
        );
      }
      case "Characters": {
        const npc = item as Character;
        return mergeStatLines(
          [
            { label: "Role", value: npc.role, icon: statIconFor("Role", npc.role) },
            { label: "World", value: npc.world, icon: statIconFor("World") },
            { label: "Location", value: linkToLocation(npc.location), icon: statIconFor("Location") },
            ...(npc.classification && npc.classification.length
              ? [
                  {
                    label: "Subcategory",
                    value: npc.classification.join(", "),
                    icon: statIconFor("Category"),
                  },
                ]
              : []),
            ...(npc.loot && npc.loot.length
              ? [{ label: "Dropping loot", value: npc.loot.join(", "), icon: statIconFor("Loot") }]
              : []),
            ...(npc.tip ? [{ label: "Tip", value: npc.tip, icon: statIconFor("Tip") }] : []),
          ],
          characterTemplate(npc),
        );
      }
      case "Fishing": {
        const spot = item as FishingSpot;
        return mergeStatLines(
          [
            { label: "World", value: spot.world, icon: statIconFor("World") },
            { label: "School", value: spot.school, icon: statIconFor("School", spot.school) },
            { label: "Rank", value: spot.rank, icon: statIconFor("Rank") },
            { label: "Notes", value: spot.note, icon: statIconFor("Notes") },
          ],
          fishingTemplate(spot),
        );
      }
      case "Furniture": {
        const furni = item as Furniture;
        return mergeStatLines(
          [
            { label: "World", value: furni.world, icon: statIconFor("World") },
            { label: "Subcategory", value: furni.subcategory, icon: statIconFor("Subcategory") },
            { label: "Location", value: furni.location, icon: statIconFor("Location") },
            ...(furni.interactive !== undefined
              ? [
                  {
                    label: "Interactive",
                    value: furni.interactive ? "Yes" : "No",
                    icon: statIconFor("Interactive"),
                  },
                ]
              : []),
          ],
          furnitureTemplate(furni),
        );
      }
      case "Locations": {
        const loc = item as Location;
        return mergeStatLines(
          [
            { label: "World", value: loc.world, icon: statIconFor("World") },
            ...(loc.zone ? [{ label: "Zone", value: loc.zone, icon: statIconFor("Zone") }] : []),
            ...(loc.npcs && loc.npcs.length
              ? [{ label: "NPCs", value: loc.npcs.map(linkToCharacter), icon: statIconFor("NPC") }]
              : []),
            ...(loc.bosses && loc.bosses.length
              ? [{ label: "Bosses", value: loc.bosses.join(", "), icon: statIconFor("Boss") }]
              : []),
            ...(loc.collectibles && loc.collectibles.length
              ? [
                  {
                    label: "Collectibles",
                    value: loc.collectibles.join(", "),
                    icon: statIconFor("Collectible"),
                  },
                ]
              : []),
          ],
          locationTemplate(loc),
        );
      }
      default:
        return [];
    }
  })();

  const description = (() => {
    if (category === "Spells") return (item as Spell).description;
    if (category === "Treasure Cards") return (item as TreasureCard).description;
    if (category === "Gear") return (item as Gear).stats;
    if (category === "Characters") return (item as Character).tip;
    if (category === "Fishing") return (item as FishingSpot).note;
    if (category === "Furniture") return (item as Furniture).description;
    if (category === "Locations") return (item as Location).description;
    return undefined;
  })();

  const sources: SpellSource[] | undefined = (() => {
    if (category === "Spells") return (item as Spell).sources;
    if (category === "Treasure Cards") return (item as TreasureCard).sources;
    if ((item as Gear).sources) return (item as Gear).sources;
    if ((item as Character).sources) return (item as Character).sources;
    if ((item as Furniture).sources) return (item as Furniture).sources;
    if ((item as FishingSpot).sources) return (item as FishingSpot).sources;
    if ((item as Location).sources) return (item as Location).sources;
    return undefined;
  })();

  const moreDetails: { label: string; value: string }[] = (() => {
    switch (category) {
      case "Spells": {
        const spell = item as Spell;
        return [
          { label: "Description", value: spell.description },
          { label: "Effect", value: spell.effect },
          { label: "Accuracy", value: `${spell.accuracy}%` },
          {
            label: "Treasure card available",
            value: spell.hasTreasureCard ? "Yes" : "No",
          },
          ...(spell.treasureCardNote
            ? [{ label: "Treasure card note", value: spell.treasureCardNote }]
            : []),
        ];
      }
      case "Treasure Cards": {
        const tc = item as TreasureCard;
        return [
          { label: "Description", value: tc.description },
          ...(tc.relatedSpell
            ? [{ label: "Related spell", value: tc.relatedSpell }]
            : []),
        ];
      }
      case "Gear": {
        const piece = item as Gear;
        return [
          { label: "Stats", value: piece.stats },
          { label: "Location", value: piece.location },
          ...(piece.setName ? [{ label: "Set", value: piece.setName }] : []),
          ...(piece.setBonus ? [{ label: "Set bonus", value: piece.setBonus }] : []),
        ];
      }
      case "Characters": {
        const npc = item as Character;
        return [
          { label: "Role", value: npc.role },
          { label: "Location", value: npc.location },
          ...(npc.tip ? [{ label: "Tip", value: npc.tip }] : []),
        ];
      }
      case "Fishing": {
        const spot = item as FishingSpot;
        return [
          { label: "Rank", value: spot.rank },
          { label: "Notes", value: spot.note },
        ];
      }
      case "Furniture": {
        const furni = item as Furniture;
        return [
          { label: "Location", value: furni.location },
          ...(furni.description
            ? [{ label: "Description", value: furni.description }]
            : []),
          ...(furni.interactive !== undefined
            ? [{ label: "Interactive", value: furni.interactive ? "Yes" : "No" }]
            : []),
        ];
      }
      case "Locations": {
        const loc = item as Location;
        return [
          ...(loc.description ? [{ label: "Description", value: loc.description }] : []),
          ...(loc.npcs && loc.npcs.length
            ? [{ label: "NPCs", value: loc.npcs.join(", ") }]
            : []),
          ...(loc.bosses && loc.bosses.length
            ? [{ label: "Bosses", value: loc.bosses.join(", ") }]
            : []),
          ...(loc.collectibles && loc.collectibles.length
            ? [{ label: "Collectibles", value: loc.collectibles.join(", ") }]
            : []),
        ];
      }
      default:
        return [];
    }
  })();

  return (
    <div className="overlay">
      <div className="panel">
        <header className="panel__header">
          <div>
            <p className="eyebrow">{category}</p>
            <h3 className="panel__title">{item.name}</h3>
            <p className="panel__meta">{formatMeta(item, category)}</p>
          </div>
          <button className="ghost" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </header>

        <div className="panel__summary">
          <div className="panel__thumb panel__thumb--stacked">
            <img
              src={thumb}
              alt=""
              onError={(e) => {
                if (e.currentTarget.src !== thumbFallback) {
                  e.currentTarget.src = thumbFallback;
                }
              }}
            />
            <p className="hint">Official art can replace this placeholder.</p>
          </div>
          <div className="panel__stats" role="list">
            {statLines.map((line) => (
              <div className="stat-row" role="listitem" key={line.label}>
                <span className="stat-row__label">
                  {line.icon && (
                    <img
                      src={line.icon}
                      alt=""
                      className="stat-row__icon"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  )}
                  {line.label}
                </span>
                <span className="stat-row__value">{line.value}</span>
              </div>
            ))}
          </div>
        </div>

        {description && (
          <details className="accordion" open>
            <summary>Details & description</summary>
            <div className="accordion__body">
              <p className="panel__body">{description}</p>
              {category === "Spells" && (
                <ul className="pill-list">
                  <li>Accuracy: {(item as Spell).accuracy}%</li>
                  <li>Effect: {(item as Spell).effect}</li>
                </ul>
              )}
              {category === "Fishing" && (
                <ul className="pill-list">
                  <li>World: {(item as FishingSpot).world}</li>
                  <li>School: {(item as FishingSpot).school}</li>
                  <li>Rank: {(item as FishingSpot).rank}</li>
                </ul>
              )}
              {category === "Furniture" && (
                <ul className="pill-list">
                  <li>World: {(item as Furniture).world}</li>
                  <li>Subcategory: {(item as Furniture).subcategory}</li>
                </ul>
              )}
              {category === "Locations" && (
                <ul className="pill-list">
                  <li>World: {(item as Location).world}</li>
                  {(item as Location).zone && <li>Zone: {(item as Location).zone}</li>}
                  {(item as Location).npcs && (item as Location).npcs!.length > 0 && (
                    <li>NPCs: {(item as Location).npcs!.join(", ")}</li>
                  )}
                  {(item as Location).bosses && (item as Location).bosses!.length > 0 && (
                    <li>Bosses: {(item as Location).bosses!.join(", ")}</li>
                  )}
                </ul>
              )}
            </div>
          </details>
        )}

        {moreDetails.length > 0 && (
          <details className="accordion" open>
            <summary>Full stat breakdown</summary>
            <div className="accordion__body stat-grid">
              {moreDetails.map((line) => (
                <div className="stat-row" role="listitem" key={line.label}>
                  <span className="stat-row__label">{line.label}</span>
                  <span className="stat-row__value">{line.value}</span>
                </div>
              ))}
            </div>
          </details>
        )}

        {sources && sources.length > 0 && (
          <details className="accordion" open>
            <summary>Acquisition & sources</summary>
            <div className="accordion__body source-list">
              {sources.map((src) => (
                <div className="stat-row" key={`${src.type}-${src.detail}`}>
                  <span className="stat-row__label">{src.type}</span>
                  <span className="stat-row__value">
                    {src.detail}
                    {src.location && (
                      <>
                        {" "}—{" "}
                        <button
                          className="chip-link chip-link--inline"
                          onClick={() => onSelectLocation(src.location!)}
                        >
                          {src.location}
                        </button>
                      </>
                    )}
                    {src.npc && (
                      <>
                        {" "}(
                        <button
                          className="chip-link chip-link--inline"
                          onClick={() => onSelectCharacter(src.npc!)}
                        >
                          NPC: {src.npc}
                        </button>
                        )
                      </>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </details>
        )}
      </div>
    </div>
  );
}

function App() {
  const [category, setCategory] = useState<CategoryKey>("Spells");
  const [school, setSchool] = useState<School>("All");
  const [search, setSearch] = useState<string>("");
  const [selected, setSelected] = useState<CatalogItem | null>(null);
  const [worldFocus, setWorldFocus] = useState<WorldBubble | null>(null);
  const [page, setPage] = useState<number>(1);
  const [showImages, setShowImages] = useState<boolean>(true);
  const [tcOnly, setTcOnly] = useState<boolean>(false);
  const [characterFilter, setCharacterFilter] = useState<string>("All");

  const dataset = useMemo<CatalogItem[]>(() => {
    const entry = categories.find((c) => c.key === category);

    if (entry) return entry.dataset as CatalogItem[];
    if (category === "Spells") return spells;
    if (category === "Treasure Cards") return treasureCards;
    if (category === "Gear") return gear;
    if (category === "Furniture") return furniture;
    if (category === "Locations") return locations as CatalogItem[];
    return [];
  }, [category]);

  useEffect(() => {
    setPage(1);
    setCharacterFilter("All");
  }, [category, school, search]);

  useEffect(() => {
    if (category !== "Spells") {
      setTcOnly(false);
    }
  }, [category]);

  const filtered = useMemo(() => {
    return dataset.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase().trim());

      if (school === "All") {
        if (category === "Spells" && tcOnly) {
          return (item as Spell).hasTreasureCard && matchesSearch;
        }
        return matchesSearch;
      }

      if (category === "Spells") {
        const spell = item as Spell;
        return (
          spell.school === school &&
          matchesSearch &&
          (tcOnly ? spell.hasTreasureCard === true : true)
        );
      }

      if (category === "Treasure Cards") {
        const tc = item as TreasureCard;
        return tc.school === school && matchesSearch;
      }

      if (category === "Gear") {
        return (item as Gear).school === school && matchesSearch;
      }

      if (category === "Fishing") {
        const spot = item as FishingSpot;
        return (spot.school === school || spot.school === "Any") && matchesSearch;
      }

      if (category === "Characters") {
        const char = item as Character;
        if (characterFilter === "All") return matchesSearch;

        const tags = char.classification ?? [char.role];
        return tags.some((tag) => tag.toLowerCase().includes(characterFilter.toLowerCase())) && matchesSearch;
      }

      return matchesSearch;
    });
  }, [dataset, school, search, category, tcOnly, characterFilter]);

  const sorted = useMemo(
    () => [...filtered].sort((a, b) => a.name.localeCompare(b.name)),
    [filtered],
  );

  const openCharacter = (name: string) => {
    const match = characters.find((npc) => npc.name === name);
    if (match) {
      setCategory("Characters");
      setSelected(match);
    }
  };

  const openLocation = (name: string) => {
    const match = locations.find((loc) => loc.name === name);
    if (match) {
      setCategory("Locations");
      setSelected(match);
    }
  };

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const pageItems = sorted.slice(start, start + PAGE_SIZE);

  return (
    <div className="page">
      <header className="hero">
        <div>
          <p className="eyebrow">Wizard101 toolkit</p>
          <h1>Interactive Guide</h1>
          <p className="lede">
            Browse spells, gear, characters, and fishing spots with quick filters
            and mobile-friendly cards. No more blank white page—the content loads
            instantly.
          </p>
          <div className="actions">
            <a className="primary" href="https://aka-sly.github.io/InteractiveMapGuide-Wizard101/">
              View live preview
            </a>
            <a className="ghost" href="#list">
              Jump to list
            </a>
          </div>
        </div>
      </header>

      <main className="content-layout" id="list">
        <section className="bookmark-shell">
          <div className="bookmark-tabs" aria-label="Categories">
            {categories.map((c) => (
              <button
                key={c.key}
                className={c.key === category ? "bookmark active" : "bookmark"}
                aria-pressed={c.key === category}
                onClick={() => {
                  setCategory(c.key);
                  setSelected(null);
                }}
              >
                <span className="icon" aria-hidden>
                  <img src={c.icon} alt="" />
                </span>
                <span className="bookmark__label">{c.key}</span>
              </button>
            ))}
          </div>

          <div className="bookmark-body">
            <div className="school-rail" aria-label="Schools">
              {schools.map((s) => {
                const icon = schoolIcons[s];
                return (
                  <button
                    key={s}
                    className={s === school ? "school-pill active" : "school-pill"}
                    onClick={() => setSchool(s)}
                    aria-pressed={s === school}
                    aria-label={`${s} school`}
                  >
                    <span className="school-pill__icon" aria-hidden>
                      <img src={icon} alt="" />
                    </span>
                    <span className="sr-only">{s}</span>
                  </button>
                );
              })}
            </div>

            {category === "Characters" && (
              <div className="filter-rail" aria-label="Character subcategories">
                {characterFilters.map((filter) => (
                  <button
                    key={filter}
                    className={
                      characterFilter === filter ? "filter-pill active" : "filter-pill"
                    }
                    onClick={() => setCharacterFilter(filter)}
                    aria-pressed={characterFilter === filter}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            )}

            <div className="bookmark-header">
              <div>
                <p className="eyebrow">Filter & search</p>
                <h2>{category}</h2>
              </div>
              <p className="hint">
                Pick a school, type a name, and tap a card. Everything lives in
                this left-edge bookmark box.
              </p>
            </div>

            <div className="filter-grid">
              <div className="filter">
                <label htmlFor="search">Search by name</label>
                <input
                  id="search"
                  type="text"
                  placeholder="Type to search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              {category === "Spells" && (
                <label className="toggle" htmlFor="tc-only">
                  <input
                    id="tc-only"
                    type="checkbox"
                    checked={tcOnly}
                    onChange={(e) => setTcOnly(e.target.checked)}
                  />
                  <span>Show only spells that have a treasure card</span>
                </label>
              )}
            </div>

            <div className="content__header">
              <div>
                <p className="eyebrow" aria-live="polite">
                  {sorted.length} result{sorted.length === 1 ? "" : "s"}
                </p>
                <h3 className="panel__title">{category} picks</h3>
              </div>
              <div className="row-controls">
                <button className="ghost" onClick={() => setShowImages((v) => !v)}>
                  {showImages ? "Hide thumbnails" : "Show thumbnails"}
                </button>
                <div className="pager" aria-label="Page selector">
                  <button
                    className="ghost"
                    onClick={() => setPage(Math.max(1, safePage - 1))}
                    disabled={safePage === 1}
                    aria-label="Previous page"
                  >
                    ← Prev
                  </button>
                  <span>
                    Page {safePage} / {totalPages}
                  </span>
                  <button
                    className="ghost"
                    onClick={() => setPage(Math.min(totalPages, safePage + 1))}
                    disabled={safePage === totalPages}
                    aria-label="Next page"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="empty">
                No matches—try a different school or name.
              </div>
            ) : (
              <div className="row-cards" role="list">
                {pageItems.map((item) => {
                  const itemSchool =
                    category === "Spells"
                      ? (item as Spell).school
                      : category === "Treasure Cards"
                        ? (item as TreasureCard).school
                      : category === "Gear"
                        ? (item as Gear).school
                        : category === "Fishing"
                          ? (item as FishingSpot).school
                          : null;

                  const schoolIcon =
                    itemSchool && itemSchool !== "Any"
                      ? schoolIcons[itemSchool as School]
                      : null;

                  const displayThumb = getItemImage(item, category);
                  const displayFallback =
                    categoryIconFallback[category] ?? placeholderThumb(item.name.slice(0, 8));

                  return (
                    <article
                      key={item.name}
                      className="row-card"
                      role="listitem"
                      onClick={() => setSelected(item)}
                    >
                      {showImages ? (
                        <img
                          className="row-card__thumb"
                          src={displayThumb}
                          alt=""
                          onError={(e) => {
                            if (e.currentTarget.src !== displayFallback) {
                              e.currentTarget.src = displayFallback;
                            }
                          }}
                        />
                      ) : (
                        <div className="row-card__thumb row-card__thumb--off">Img</div>
                      )}
                      <div className="row-card__body">
                        <h3>{item.name}</h3>
                        <p className="row-card__meta">{formatMeta(item, category)}</p>
                      </div>
                      {schoolIcon && (
                        <span className="school-chip" title={`${itemSchool} school`}>
                          <img src={schoolIcon} alt={`${itemSchool} school icon`} />
                        </span>
                      )}
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <aside className="world-panel" aria-label="World bubbles">
          <div className="world-panel__header">
            <div>
              <p className="eyebrow">World atlas</p>
              <h2>World bubbles</h2>
            </div>
            <p className="hint">
              Worlds stay on the right. Click any bubble to open a map pop-up.
            </p>
          </div>

          <div className="world-panel__list">
            {worlds.map((world) => (
              <button
                key={world.name}
                className="world-bubble world-bubble--button"
                onClick={() => setWorldFocus(world)}
                aria-label={`Open details for ${world.name}`}
                style={{
                  backgroundImage: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.7), rgba(78,51,119,0.5)), url(${worldBubblePath(world.name)}), url(${world.bubbleImage ?? worldBubbleFallback}), url(${worldBubbleFallback})`,
                }}
              >
                <div className="world-bubble__overlay">
                  <div className="world-bubble__name">{world.name}</div>
                  <div className="world-bubble__summary">{world.summary}</div>
                </div>
              </button>
            ))}
          </div>

          <p className="hint">
            Map pop-ups will hold interactive markers later for Prospector Zeke,
            bosses, minions, and quests.
          </p>
        </aside>
      </main>

      {selected && (
        <Details
          item={selected}
          category={category}
          onClose={() => setSelected(null)}
          onSelectCharacter={openCharacter}
          onSelectLocation={openLocation}
        />
      )}

      {worldFocus && (
        <div className="overlay">
          <div className="panel">
            <header className="panel__header">
              <div>
                <p className="eyebrow">World</p>
                <h3 className="panel__title">{worldFocus.name}</h3>
              </div>
              <button className="ghost" onClick={() => setWorldFocus(null)}>
                ✕
              </button>
            </header>
            <p className="panel__body">{worldFocus.summary}</p>
            <div className="map-frame">
              <img
                src={worldFocus.mapImage ?? worldMapPath(worldFocus.name)}
                alt={`${worldFocus.name} map preview`}
                onError={(e) => {
                  if (e.currentTarget.src !== worldFallbackImage) {
                    e.currentTarget.src = worldFallbackImage;
                  }
                }}
              />
            </div>

            {locations.filter((loc) => loc.world === worldFocus.name).length > 0 && (
              <div className="world-locations">
                <div className="world-locations__header">
                  <p className="eyebrow">Locations</p>
                  <h4>Explore {worldFocus.name}</h4>
                </div>
                <div className="world-locations__list">
                  {locations
                    .filter((loc) => loc.world === worldFocus.name)
                    .map((loc) => (
                      <button
                        key={loc.name}
                        className="world-locations__chip"
                        onClick={() => {
                          setCategory("Locations");
                          setSelected(loc);
                          setWorldFocus(null);
                        }}
                      >
                        {loc.name}
                        {loc.zone ? ` — ${loc.zone}` : ""}
                      </button>
                    ))}
                </div>
              </div>
            )}

            <p className="hint">
              Future updates will place interactive markers on these maps for
              Prospector Zeke items, bosses, minions, or quest paths.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
