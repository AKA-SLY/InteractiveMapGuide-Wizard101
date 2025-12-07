import React, { useEffect, useMemo, useState } from "react";
import { categories } from "./data/categories";
import { characters } from "./data/characters";
import { fishing } from "./data/fishing";
import { gear } from "./data/gear";
import { schools } from "./data/schools";
import { spells } from "./data/spells";
import { type WorldBubble, worlds } from "./data/worlds";
import {
  type CategoryKey,
  type Character,
  type FishingSpot,
  type Gear,
  type School,
  type Spell,
} from "./types";

const PAGE_SIZE = 8;

const worldFallbackImage =
  "https://dummyimage.com/900x520/dacfb2/2c1c4a&text=World+map";

const schoolIcons: Record<Exclude<School, "All">, string> = {
  Fire: "🔥",
  Ice: "❄️",
  Storm: "⚡️",
  Myth: "🐍",
  Life: "🍃",
  Death: "💀",
  Balance: "⚖️",
  Sun: "☀️",
  Moon: "🌙",
  Star: "⭐️",
  Shadow: "🌑",
};

const placeholderThumb = (label: string) =>
  `https://dummyimage.com/160x160/f4e6c4/2b1441&text=${encodeURIComponent(label)}`;

function formatMeta(item: Spell | Gear | Character | FishingSpot, active: string) {
  switch (active) {
    case "Spells": {
      const spell = item as Spell;
      return `${spell.school} • Rank ${spell.rank} • ${spell.pipCost} pip${
        spell.pipCost === 1 ? "" : "s"
      }`;
    }
    case "Gear": {
      const piece = item as Gear;
      return `${piece.school} ${piece.type} • L${piece.level} • ${piece.stats}`;
    }
    case "Characters": {
      const npc = item as Character;
      return `${npc.role} • ${npc.world} — ${npc.location}`;
    }
    case "Fishing": {
      const spot = item as FishingSpot;
      return `${spot.world} • ${spot.rank} • ${spot.school}`;
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
  item: Spell | Gear | Character | FishingSpot;
  category: string;
  onClose: () => void;
}) {
  const thumb =
    (item as Spell | Gear | Character | FishingSpot).image ??
    placeholderThumb(item.name.slice(0, 10));

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
      default:
        return [];
    }
  })();

  const description = (() => {
    if (category === "Spells") return (item as Spell).description;
    if (category === "Gear") return (item as Gear).stats;
    if (category === "Characters") return (item as Character).tip;
    if (category === "Fishing") return (item as FishingSpot).note;
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
  const [selected, setSelected] = useState<
    Spell | Gear | Character | FishingSpot | null
  >(null);
  const [worldFocus, setWorldFocus] = useState<WorldBubble | null>(null);
  const [page, setPage] = useState<number>(1);
  const [showImages, setShowImages] = useState<boolean>(true);

  const dataset = useMemo<(Spell | Gear | Character | FishingSpot)[]>(() => {
    switch (category) {
      case "Spells":
        return spells;
      case "Gear":
        return gear;
      case "Characters":
        return characters;
      case "Fishing":
        return fishing;
      default:
        return spells;
    }
  }, [category]);

  useEffect(() => {
    setPage(1);
  }, [category, school, search]);

  const filtered = useMemo(() => {
    return dataset.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase().trim());

      if (school === "All") return matchesSearch;

      if (category === "Spells" || category === "Gear") {
        return (item as Spell | Gear).school === school && matchesSearch;
      }

      if (category === "Fishing") {
        const spot = item as FishingSpot;
        return (spot.school === school || spot.school === "Any") && matchesSearch;
      }

      // Characters don’t filter by school, just the search box.
      return matchesSearch;
    });
  }, [dataset, school, search, category]);

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
                  {c.icon}
                </span>
                <span className="bookmark__label">{c.key}</span>
              </button>
            ))}
          </div>

          <div className="bookmark-body">
            <div className="school-rail" aria-label="Schools">
              {schools.map((s) => {
                const icon =
                  s === "All" ? "🌌" : schoolIcons[s as Exclude<School, "All">];
                return (
                  <button
                    key={s}
                    className={s === school ? "school-pill active" : "school-pill"}
                    onClick={() => setSchool(s)}
                    aria-pressed={s === school}
                    aria-label={`${s} school`}
                  >
                    <span className="school-pill__icon" aria-hidden>
                      {icon}
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
                      : category === "Gear"
                        ? (item as Gear).school
                        : category === "Fishing"
                          ? (item as FishingSpot).school
                          : null;

                  const schoolIcon =
                    itemSchool && itemSchool !== "Any"
                      ? schoolIcons[itemSchool as Exclude<School, "All">]
                      : null;

                  const thumb = (item as Spell | Gear | Character | FishingSpot).image;
                  const displayThumb = thumb ?? placeholderThumb(item.name.slice(0, 6));

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
                          {schoolIcon}
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
                  backgroundImage: world.bubbleImage
                    ? `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.7), rgba(78,51,119,0.5)), url(${world.bubbleImage})`
                    : undefined,
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
