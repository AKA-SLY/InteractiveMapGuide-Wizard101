import React, { useMemo, useState } from "react";
import {
  categories,
  characters,
  fishing,
  gear,
  schools,
  spells,
  type Character,
  type FishingSpot,
  type Gear,
  type School,
  type Spell,
} from "./data";

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
  return (
    <div className="overlay">
      <div className="panel">
        <header className="panel__header">
          <div>
            <p className="eyebrow">{category}</p>
            <h3 className="panel__title">{item.name}</h3>
          </div>
          <button className="ghost" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </header>

        <p className="panel__meta">{formatMeta(item, category)}</p>

        {category === "Spells" && (
          <>
            <p className="panel__body">{(item as Spell).description}</p>
            <ul className="pill-list">
              <li>Accuracy: {(item as Spell).accuracy}</li>
              <li>Effect: {(item as Spell).effect}</li>
            </ul>
          </>
        )}

        {category === "Gear" && (
          <>
            <p className="panel__body">{(item as Gear).stats}</p>
            <p className="panel__body">Location: {(item as Gear).location}</p>
          </>
        )}

        {category === "Characters" && (
          <>
            <p className="panel__body">
              {(item as Character).role} in {(item as Character).world}
            </p>
            {(item as Character).tip && (
              <p className="panel__body">Tip: {(item as Character).tip}</p>
            )}
          </>
        )}

        {category === "Fishing" && (
          <>
            <p className="panel__body">{(item as FishingSpot).note}</p>
            <ul className="pill-list">
              <li>World: {(item as FishingSpot).world}</li>
              <li>School: {(item as FishingSpot).school}</li>
              <li>Rank: {(item as FishingSpot).rank}</li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

function App() {
  const [category, setCategory] = useState<string>("Spells");
  const [school, setSchool] = useState<School>("All");
  const [search, setSearch] = useState<string>("");
  const [selected, setSelected] = useState<
    Spell | Gear | Character | FishingSpot | null
  >(null);

  const dataset = useMemo(() => {
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

      <main className="layout" id="list">
        <aside className="sidebar">
          <p className="eyebrow">Categories</p>
          <div className="sidebar__items">
            {categories.map((c) => (
              <button
                key={c.key}
                className={c.key === category ? "tab active" : "tab"}
                onClick={() => {
                  setCategory(c.key);
                  setSelected(null);
                }}
              >
                <span className="icon" aria-hidden>
                  {c.icon}
                </span>
                {c.key}
              </button>
            ))}
          </div>

          <div className="filter">
            <label htmlFor="school">Filter by school</label>
            <div className="pill-row">
              {schools.map((s) => (
                <button
                  key={s}
                  id={s === school ? "school" : undefined}
                  className={s === school ? "pill active" : "pill"}
                  onClick={() => setSchool(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

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
        </aside>

        <section className="content">
          <div className="content__header">
            <div>
              <p className="eyebrow">{filtered.length} results</p>
              <h2>{category}</h2>
            </div>
            <p className="hint">
              Tip: click any card to see quick stats. The list updates instantly
              as you type.
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="empty">No matches—try a different school or name.</div>
          ) : (
            <div className="grid">
              {filtered.map((item) => (
                <article
                  key={item.name}
                  className="card"
                  onClick={() => setSelected(item)}
                >
                  <div className="card__header">
                    <span className="dot" />
                    <p className="eyebrow">{category}</p>
                  </div>
                  <h3>{item.name}</h3>
                  <p className="muted">{formatMeta(item, category)}</p>
                  <p className="card__cta">Open details →</p>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      {selected && (
        <Details
          item={selected}
          category={category}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

export default App;
