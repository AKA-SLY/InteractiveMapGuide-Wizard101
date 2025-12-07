import React, { useEffect, useMemo, useState } from "react";
import { categories } from "./data/categories";
import { furniture } from "./data/furniture";
import { gear } from "./data/gear";
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
} from "./types";
import allSchoolIcon from "./assets/icons/schools/all.svg";
import balanceIcon from "./assets/icons/schools/balance.svg";
import deathIcon from "./assets/icons/schools/death.svg";
import fireIcon from "./assets/icons/schools/fire.svg";
import iceIcon from "./assets/icons/schools/ice.svg";
import lifeIcon from "./assets/icons/schools/life.svg";
import moonIcon from "./assets/icons/schools/moon.svg";
import mythIcon from "./assets/icons/schools/myth.svg";
import shadowIcon from "./assets/icons/schools/shadow.svg";
import starIcon from "./assets/icons/schools/star.svg";
import stormIcon from "./assets/icons/schools/storm.svg";
import sunIcon from "./assets/icons/schools/sun.svg";
import characterIcon from "./assets/icons/categories/character.svg";
import fishingIcon from "./assets/icons/categories/fishing.svg";
import furnitureIcon from "./assets/icons/categories/furniture.svg";
import gearIcon from "./assets/icons/categories/gear.svg";
import spellIcon from "./assets/icons/categories/spell.svg";
import treasureIcon from "./assets/icons/categories/treasure.svg";
import worldBubbleFallback from "./assets/icons/worlds/bubble-fallback.svg";
import worldMapFallback from "./assets/icons/worlds/map-fallback.svg";

const PAGE_SIZE = 8;

const worldFallbackImage = worldMapFallback;

const schoolIcons: Record<School, string> = {
  All: allSchoolIcon,
  Fire: fireIcon,
  Ice: iceIcon,
  Storm: stormIcon,
  Myth: mythIcon,
  Life: lifeIcon,
  Death: deathIcon,
  Balance: balanceIcon,
  Sun: sunIcon,
  Moon: moonIcon,
  Star: starIcon,
  Shadow: shadowIcon,
};

const categoryIconFallback: Record<CategoryKey, string> = {
  Spells: spellIcon,
  "Treasure Cards": treasureIcon,
  Gear: gearIcon,
  Furniture: furnitureIcon,
  Characters: characterIcon,
  Fishing: fishingIcon,
};

const placeholderThumb = (label: string) =>
  `https://dummyimage.com/160x160/f4e6c4/2b1441&text=${encodeURIComponent(label)}`;

function getItemImage(item: CatalogItem, category: CategoryKey) {
  if ((item as CatalogItem).image) return (item as CatalogItem).image as string;

  if (category === "Spells") return schoolIcons[(item as Spell).school];
  if (category === "Treasure Cards") return schoolIcons[(item as TreasureCard).school];
  if (category === "Gear") return schoolIcons[(item as Gear).school];
  if (category === "Fishing")
    return (item as FishingSpot).school === "Any"
      ? categoryIconFallback.Fishing
      : schoolIcons[(item as FishingSpot).school];

  return categoryIconFallback[category] ?? placeholderThumb(item.name.slice(0, 8));
}

type CatalogItem = Spell | Gear | Character | FishingSpot | TreasureCard | Furniture;

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
    default:
      return "";
  }
}

function Details({
  item,
  category,
  onClose,
}: {
  item: CatalogItem;
  category: CategoryKey;
  onClose: () => void;
}) {
  const thumb = getItemImage(item, category);

  const statLines: { label: string; value: string }[] = (() => {
    switch (category) {
      case "Spells": {
        const spell = item as Spell;
        return [
          { label: "School", value: spell.school },
          { label: "Rank", value: String(spell.rank) },
          { label: "Pips", value: `${spell.pipCost} pip${spell.pipCost === 1 ? "" : "s"}` },
          { label: "Accuracy", value: `${spell.accuracy}%` },
          { label: "Effect", value: spell.effect },
          ...(spell.treasureCardNote
            ? [{ label: "Treasure card", value: spell.treasureCardNote }]
            : []),
        ];
      }
      case "Treasure Cards": {
        const tc = item as TreasureCard;
        return [
          { label: "School", value: tc.school },
          { label: "Pips", value: `${tc.pipCost} pip${tc.pipCost === 1 ? "" : "s"}` },
          { label: "Accuracy", value: `${tc.accuracy}%` },
          { label: "Effect", value: tc.effect },
          ...(tc.relatedSpell ? [{ label: "Related spell", value: tc.relatedSpell }] : []),
        ];
      }
      case "Gear": {
        const piece = item as Gear;
        return [
          { label: "Slot", value: piece.type },
          { label: "School", value: piece.school },
          { label: "Level", value: `L${piece.level}` },
          { label: "Stats", value: piece.stats },
          { label: "Location", value: piece.location },
          { label: "Subcategory", value: piece.subcategory },
          ...(piece.setName ? [{ label: "Set", value: piece.setName }] : []),
          ...(piece.setBonus ? [{ label: "Set bonus", value: piece.setBonus }] : []),
        ];
      }
      case "Characters": {
        const npc = item as Character;
        return [
          { label: "Role", value: npc.role },
          { label: "World", value: npc.world },
          { label: "Location", value: npc.location },
          ...(npc.tip ? [{ label: "Tip", value: npc.tip }] : []),
        ];
      }
      case "Fishing": {
        const spot = item as FishingSpot;
        return [
          { label: "World", value: spot.world },
          { label: "School", value: spot.school },
          { label: "Rank", value: spot.rank },
          { label: "Notes", value: spot.note },
        ];
      }
      case "Furniture": {
        const furni = item as Furniture;
        return [
          { label: "World", value: furni.world },
          { label: "Subcategory", value: furni.subcategory },
          { label: "Location", value: furni.location },
          ...(furni.interactive !== undefined
            ? [{ label: "Interactive", value: furni.interactive ? "Yes" : "No" }]
            : []),
        ];
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
    return undefined;
  })();

  const sources: SpellSource[] | undefined = (() => {
    if (category === "Spells") return (item as Spell).sources;
    if (category === "Treasure Cards") return (item as TreasureCard).sources;
    return undefined;
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
            <img src={thumb} alt="" />
            <p className="hint">Official art can replace this placeholder.</p>
          </div>
          <div className="panel__stats" role="list">
            {statLines.map((line) => (
              <div className="stat-row" role="listitem" key={line.label}>
                <span className="stat-row__label">{line.label}</span>
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
                    {src.location ? ` — ${src.location}` : ""}
                    {src.npc ? ` (NPC: ${src.npc})` : ""}
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

  const dataset = useMemo<CatalogItem[]>(() => {
    const entry = categories.find((c) => c.key === category);

    if (entry) return entry.dataset as CatalogItem[];
    if (category === "Spells") return spells;
    if (category === "Treasure Cards") return treasureCards;
    if (category === "Gear") return gear;
    if (category === "Furniture") return furniture;
    return [];
  }, [category]);

  useEffect(() => {
    setPage(1);
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

      // Characters don’t filter by school, just the search box.
      return matchesSearch;
    });
  }, [dataset, school, search, category, tcOnly]);

  const sorted = useMemo(
    () => [...filtered].sort((a, b) => a.name.localeCompare(b.name)),
    [filtered],
  );

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

                  return (
                    <article
                      key={item.name}
                      className="row-card"
                      role="listitem"
                      onClick={() => setSelected(item)}
                    >
                      {showImages ? (
                        <img className="row-card__thumb" src={displayThumb} alt="" />
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
                  backgroundImage: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.7), rgba(78,51,119,0.5)), url(${world.bubbleImage ?? worldBubbleFallback})`,
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
                src={worldFocus.mapImage ?? worldFallbackImage}
                alt={`${worldFocus.name} map preview`}
                onError={(e) => {
                  if (e.currentTarget.src !== worldFallbackImage) {
                    e.currentTarget.src = worldFallbackImage;
                  }
                }}
              />
            </div>
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
