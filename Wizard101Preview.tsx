import React, { useState, useEffect } from "react";

const SPELLS = [
  {
    name: "Fire Cat",
    school: "Fire",
    rank: 1,
    accuracy: "75%",
    pipCost: 1,
    rarity: "",
    spellement: "",
    acquisition: "",
    effect: "Small fire hit",
    description: "A small fire creature that deals light damage.",
    imageUrl: ""
  },
  {
    name: "Frost Beetle",
    school: "Ice",
    rank: 1,
    accuracy: "85%",
    pipCost: 1,
    rarity: "",
    spellement: "",
    acquisition: "",
    effect: "Small ice hit",
    description: "A tiny beetle that delivers a shard of ice.",
    imageUrl: ""
  },
  {
    name: "Fire Elf",
    school: "Fire",
    rank: 2,
    accuracy: "70%",
    pipCost: 2,
    rarity: "",
    spellement: "",
    acquisition: "",
    effect: "Fire damage over time",
    description: "Applies a fire DoT over several rounds.",
    imageUrl: ""
  },
  {
    name: "Sunbird",
    school: "Fire",
    rank: 3,
    accuracy: "75%",
    pipCost: 3,
    rarity: "",
    spellement: "",
    acquisition: "",
    effect: "Moderate fire hit",
    description: "A fiery bird that swoops in for strong damage.",
    imageUrl: ""
  },
  {
    name: "Fire Elemental",
    school: "Fire",
    rank: 3,
    accuracy: "85%",
    pipCost: 3,
    rarity: "",
    spellement: "",
    acquisition: "",
    effect: "Summon fire minion",
    description: "Summons a fire minion to assist in battle.",
    imageUrl: ""
  },
  {
    name: "Meteor Strike",
    school: "Fire",
    rank: 4,
    accuracy: "75%",
    pipCost: 4,
    rarity: "",
    spellement: "",
    acquisition: "",
    effect: "Fire AoE hit",
    description: "Calls down meteors that damage all enemies.",
    imageUrl: ""
  },
  {
    name: "Phoenix",
    school: "Fire",
    rank: 5,
    accuracy: "70%",
    pipCost: 5,
    rarity: "",
    spellement: "",
    acquisition: "",
    effect: "High single-target fire hit",
    description: "A Phoenix rises in flame to scorch an enemy.",
    imageUrl: ""
  },
  {
    name: "Fireblade",
    school: "Fire",
    rank: 0,
    accuracy: "100%",
    pipCost: 0,
    rarity: "",
    spellement: "",
    acquisition: "",
    effect: "+35% next fire hit",
    description: "Adds a blade to boost the next Fire spell.",
    imageUrl: ""
  },
  {
    name: "Fuel",
    school: "Fire",
    rank: 0,
    accuracy: "100%",
    pipCost: 0,
    rarity: "",
    spellement: "",
    acquisition: "",
    effect: "Stacking fire traps",
    description: "Places multiple fire traps on the enemy.",
    imageUrl: ""
  },
  {
    name: "Smoke Screen",
    school: "Fire",
    rank: 0,
    accuracy: "85%",
    pipCost: 1,
    rarity: "",
    spellement: "",
    acquisition: "",
    effect: "-70% accuracy to next spells",
    description: "A cloud of smoke to lower enemy accuracy.",
    imageUrl: ""
  },
  {
    name: "Detonate",
    school: "Fire",
    rank: 0,
    accuracy: "100%",
    pipCost: 0,
    rarity: "",
    spellement: "",
    acquisition: "",
    effect: "Trigger DoT immediately",
    description: "Detonates a Damage over Time effect early.",
    imageUrl: ""
  }
];

const GEAR = [
  {
    name: "Pyromancer Hat",
    type: "Hat",
    school: "Fire",
    stats: "+5% Accuracy",
    level: 10,
    rarity: "Common",
    set: "",
    droppedBy: "",
    vendor: "",
    world: "",
    imageUrl: ""
  },
  {
    name: "Ice Robe",
    type: "Robe",
    school: "Ice",
    stats: "+45 Health",
    level: 8,
    rarity: "Uncommon",
    set: "",
    droppedBy: "",
    vendor: "",
    world: "",
    imageUrl: ""
  }
];

const CHARACTERS = [
  { name: "Cassandra Goldenthorn", role: "Vendor", world: "Wizard City", location: "Olde Town", imageUrl: "" },
  { name: "Torrence", role: "Quest Giver", world: "Wizard City", location: "Olde Town", imageUrl: "" },
  { name: "Eloise Merryweather", role: "Vendor", world: "Wizard City", location: "The Commons", sells: "Stitching", imageUrl: "" },
  { name: "Mr. Lincoln", role: "Administrator", world: "Wizard City", location: "Ravenwood", imageUrl: "" },
  { name: "Harold Argleston", role: "Librarian", world: "Wizard City", location: "Library", imageUrl: "" },
  { name: "Dworgyn", role: "Trainer", world: "Wizard City", location: "Nightside", teaches: "Death Spells", imageUrl: "" },
  { name: "Mortis", role: "Trainer", world: "Wizard City", location: "Nightside", teaches: "Feint / Traps", imageUrl: "" },
  { name: "Boris Tallstaff", role: "Quest Giver", world: "Wizard City", location: "Library", imageUrl: "" },
  { name: "Alhazred's Student", role: "Student", world: "Wizard City", location: "Krok Alley", imageUrl: "" },
  { name: "Lady Oriel", role: "Quest Giver", world: "Wizard City", location: "Unicorn Way", imageUrl: "" },
  { name: "Merle Ambrose", role: "Headmaster", world: "Wizard City", location: "Ravenwood", teaches: "Main Story", imageUrl: "" },
  { name: "Gamma", role: "Guide", world: "Wizard City", location: "Ravenwood", teaches: "Tutorial", imageUrl: "" },
  { name: "Dalia Falmea", role: "Trainer", world: "Wizard City", location: "Ravenwood", teaches: "Fire Spells", imageUrl: "" },
  { name: "Halston Balestrom", role: "Trainer", world: "Wizard City", location: "Ravenwood", teaches: "Storm Spells", imageUrl: "" },
  { name: "Lydia Greyrose", role: "Trainer", world: "Wizard City", location: "Ravenwood", teaches: "Ice Spells", imageUrl: "" },
  { name: "Malorn Ashthorn", role: "Trainer", world: "Wizard City", location: "Ravenwood", teaches: "Death Spells", imageUrl: "" },
  { name: "Arthur Wethersfield", role: "Trainer", world: "Wizard City", location: "Ravenwood", teaches: "Balance Spells", imageUrl: "" },
  { name: "Cyrus Drake", role: "Trainer", world: "Wizard City", location: "Ravenwood", teaches: "Myth Spells", imageUrl: "" },
  { name: "Sergeant Muldoon", role: "Quest Giver", world: "Wizard City", location: "The Commons", imageUrl: "" },
  { name: "Zeke", role: "Vendor", world: "Wizard City", location: "The Commons", sells: "Quest Items", imageUrl: "" },
  { name: "Diego the Duelmaster", role: "Trainer", world: "Wizard City", location: "Unicorn Way", teaches: "PvP Basics", imageUrl: "" },
  { name: "Private Connelly", role: "Quest Giver", world: "Wizard City", location: "Triton Avenue", imageUrl: "" },
  { name: "Susie Gryphonbane", role: "Quest Giver", world: "Wizard City", location: "Cyclops Lane", imageUrl: "" },
  { name: "Blad Raveneye", role: "Trainer", world: "Wizard City", location: "Triton Avenue", teaches: "Storm Spells", imageUrl: "" },
  { name: "Nolan Stormgate", role: "Student", world: "Wizard City", location: "Unicorn Way", imageUrl: "" },
  { name: "Abigail Dools", role: "Student", world: "Wizard City", location: "Ravenwood", imageUrl: "" },
  { name: "Lucky Hookline", role: "Trainer", world: "Wizard City", location: "The Commons", teaches: "Fishing", imageUrl: "" },
  { name: "Molly Earthsong", role: "Trainer", world: "Wizard City", location: "Ravenwood", teaches: "Life Spells", imageUrl: "" },
  { name: "Pierce Stanson", role: "Quest Giver", world: "Wizard City", location: "Golem Court", imageUrl: "" },
  { name: "Bailey Blue", role: "Vendor", world: "Wizard City", location: "Shopping District", sells: "Clothing", imageUrl: "" },
  { name: "Cassandra Hawkins", role: "Quest Giver", world: "Wizard City", location: "Colossus Boulevard", imageUrl: "" },
  { name: "Private O’Ryan", role: "Quest Giver", world: "Wizard City", location: "Firecat Alley", imageUrl: "" },
  { name: "Mr. Rowley", role: "Vendor", world: "Wizard City", location: "Shopping District", sells: "Wands", imageUrl: "" },
  { name: "Ms. Dowager", role: "Quest Giver", world: "Wizard City", location: "The Commons", imageUrl: "" },
  { name: "Emily Silverthistle", role: "Student", world: "Wizard City", location: "Ravenwood", imageUrl: "" },
  { name: "Tara Dawn", role: "Vendor", world: "Wizard City", location: "Shopping District", imageUrl: "" },
  { name: "Sgt. Major Talbot", role: "Quest Giver", world: "Wizard City", location: "The Commons", imageUrl: "" }
];

const FISHING = [
  {
    name: "Icecuda",
    world: "Wizard City",
    rarity: "Common",
    school: "Ice",
    initialRank: "",
    xp: "",
    aquarium: "",
    imageUrl: ""
  },
  {
    name: "Grape Jellyfish",
    world: "Krokotopia",
    rarity: "Uncommon",
    school: "Life",
    initialRank: "",
    xp: "",
    aquarium: "",
    imageUrl: ""
  }
];

const WORLDS = [
  {
    name: "Wizard City",
    levelRange: "1-10",
    zones: [
      "The Commons",
      "Ravenwood",
      "Unicorn Way",
      "Triton Avenue",
      "Cyclops Lane",
      "Firecat Alley",
      "Colossus Boulevard",
      "Crab Alley"
    ],
    questTypes: ["Storyline", "Side", "Tutorial", "Fishing", "Crafting"],
    totalQuests: 102,
    storylineSummary: "Your first steps into magic, protecting the city from undead and corrupted creatures.",
    keyNPCs: ["Merle Ambrose", "Gamma", "Sergeant Muldoon", "Halston Balestrom", "Dalia Falmea"],
    imageUrl: ""
  },
  {
    name: "Krokotopia",
    levelRange: "10-20",
    zones: ["The Oasis", "Pyramid of the Sun", "Krokosphinx", "Tomb of Storms", "Well of Spirits"],
    questTypes: ["Storyline", "Side", "Dungeon"],
    totalQuests: 89,
    storylineSummary: "Ancient desert sands, magical artifacts, and freeing Manders from Krok oppression.",
    keyNPCs: ["Shalek the Wise", "Zane HammerTail", "Alhazred"],
    imageUrl: ""
  },
  {
    name: "Marleybone",
    levelRange: "20-30",
    zones: ["Regent's Square", "Hyde Park", "Chelsea Court", "Scotland Yard", "Katzenstein's Lab"],
    questTypes: ["Storyline", "Side", "Street", "Instance"],
    totalQuests: 94,
    storylineSummary: "Dark alleyways, rooftop chases, and uncovering the schemes of Meowiarty.",
    keyNPCs: ["Sherlock Bones", "Watson", "Barkingham Palace Officials"],
    imageUrl: ""
  },
  {
    name: "Mooshu",
    levelRange: "30-40",
    zones: ["Hametsu Village", "Tatakai Outpost", "Shoshun Village", "Jade Palace", "Ancient Burial Grounds"],
    questTypes: ["Storyline", "Side", "Boss"],
    totalQuests: 113,
    storylineSummary: "Restoring the Emperor and saving a peaceful world tainted by evil magic.",
    keyNPCs: ["Emperor Yoshihito", "Moolinda Wu", "Shiruko Temple Guardians"],
    imageUrl: ""
  },
  {
    name: "Dragonspyre",
    levelRange: "40-50",
    zones: ["The Basilica", "The Atheneum", "The Grand Chasm", "The Drake Hatchery", "The Crystal Grove", "Dragon's Roost"],
    questTypes: ["Storyline", "Dungeon", "Side"],
    totalQuests: 152,
    storylineSummary: "Volcanic ruins, ancient drakes, and the climactic battle with Malistaire.",
    keyNPCs: ["Cyrus Drake", "The Dragon Guardians", "Dmitri Volov"],
    imageUrl: ""
  }
];

const paginate = (items, page, perPage = 20) => {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return items.slice(start, end);
};

const filterBySchool = (items, school) => {
  if (school === "All") return items;
  return items.filter((item) => item.school === school);
};

const filterCharactersByRole = (items, role) => {
  if (role === "All") return items;
  return items.filter((item) => item.role === role);
};

const getTotalPages = (items, perPage = 20) => {
  return Math.max(1, Math.ceil(items.length / perPage));
};

const DATA = {
  Spells: SPELLS,
  Gear: GEAR,
  Characters: CHARACTERS,
  Fishing: FISHING
};

const ICONS = {
  Spells: "📜",
  Gear: "🛡️",
  Characters: "🧍",
  Fishing: "🎣"
};

function Wizard101Preview() {
  const categories = Object.keys(DATA);
  const schools = [
    "All",
    "Fire",
    "Ice",
    "Storm",
    "Myth",
    "Life",
    "Death",
    "Balance"
  ];
  const characterTypes = [
    "All",
    "Trainer",
    "Vendor",
    "Boss",
    "Companion",
    "Quest Giver",
    "Student",
    "Guide"
  ];

  const [activeCategory, setActiveCategory] = useState("Spells");
  const [activeSchool, setActiveSchool] = useState("All");
  const [activeCharacterType, setActiveCharacterType] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedWorld, setSelectedWorld] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const currentData = DATA[activeCategory] || [];

  let filtered = filterBySchool(currentData, activeSchool);
  if (activeCategory === "Characters") {
    filtered = filterCharactersByRole(filtered, activeCharacterType);
  }

  const totalPages = getTotalPages(filtered, 20);
  const paginatedItems = paginate(filtered, currentPage, 20);

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePage = (p) => setCurrentPage(p);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, activeSchool, activeCharacterType]);

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        background: "#1a1421",
        color: "white"
      }}
    >
      <div
        style={{
          width: "60px",
          background: "#120d18",
          paddingTop: 20,
          display: "flex",
          flexDirection: "column",
          gap: 14
        }}
      >
        {categories.map((c) => (
          <div
            key={c}
            onClick={() => setActiveCategory(c)}
            style={{
              cursor: "pointer",
              background: activeCategory === c ? "#8c4bff" : "#3a2b50",
              borderRadius: "6px 6px 0 0",
              width: 50,
              height: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {ICONS[c]}
          </div>
        ))}
      </div>

      <div
        style={{
          width: "40%",
          background: "#2d213b",
          padding: 20,
          overflowY: "auto"
        }}
      >
        <h2>Lookup — {activeCategory}</h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            marginBottom: 14
          }}
        >
          {schools.map((s) => (
            <button
              key={s}
              onClick={() => setActiveSchool(s)}
              style={{
                padding: "6px 12px",
                borderRadius: 20,
                background: activeSchool === s ? "#5a3e79" : "#3a2b50",
                border:
                  activeSchool === s ? "2px solid #ffd369" : "1px solid white"
              }}
            >
              {s}
            </button>
          ))}
        </div>

        {activeCategory === "Characters" && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              marginBottom: 20
            }}
          >
            {characterTypes.map((t) => (
              <button
                key={t}
                onClick={() => setActiveCharacterType(t)}
                style={{
                  padding: "5px 10px",
                  borderRadius: 14,
                  background:
                    activeCharacterType === t ? "#7b3e6e" : "#3a2b50",
                  border:
                    activeCharacterType === t
                      ? "2px solid #ff9de2"
                      : "1px solid white"
                }}
              >
                {t}
              </button>
            ))}
          </div>
        )}

        {paginatedItems.map((item, i) => (
          <div
            key={i}
            onClick={() => setSelectedItem(item)}
            style={{
              padding: "12px 14px",
              background: "#3a2b50",
              borderRadius: 6,
              cursor: "pointer"
            }}
          >
            {item.name}
          </div>
        ))}

        {totalPages > 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 8,
              marginTop: 16
            }}
          >
            <button disabled={currentPage === 1} onClick={handlePrev}>
              Prev
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => handlePage(i + 1)}
                style={{
                  background:
                    currentPage === i + 1 ? "#8c4bff" : "#3a2b50",
                  color: "white"
                }}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        )}
      </div>

      <div
        style={{
          flex: 1,
          background: "#241a30",
          padding: 30
        }}
      >
        <h2>World Map</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 30
          }}
        >
          {WORLDS.map((w) => (
            <div
              key={w.name}
              onClick={() => setSelectedWorld(w)}
              style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                background: "#5a3e79",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "3px solid white",
                cursor: "pointer"
              }}
            >
              {w.name}
            </div>
          ))}
        </div>
      </div>

      {selectedItem && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000
          }}
        >
          <div
            style={{
              background: "#2b1f3a",
              borderRadius: 12,
              padding: 24,
              width: "420px",
              maxWidth: "90vw",
              boxShadow: "0 0 20px rgba(0,0,0,0.5)",
              border: "2px solid #ffd369"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12
              }}
            >
              <h3 style={{ margin: 0 }}>{selectedItem.name}</h3>
              <button
                onClick={() => setSelectedItem(null)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "white",
                  fontSize: 18,
                  cursor: "pointer"
                }}
              >
                ✕
              </button>
            </div>

            {activeCategory === "Spells" && (
              <div>
                <div
                  style={{
                    display: "flex",
                    gap: 16,
                    marginBottom: 12
                  }}
                >
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 12,
                      border: "2px solid #ffb347",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#3a2b50",
                      fontSize: 12,
                      textAlign: "center"
                    }}
                  >
                    {selectedItem.imageUrl ? (
                      <img
                        src={selectedItem.imageUrl}
                        alt={selectedItem.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: 10
                        }}
                      />
                    ) : (
                      <span>Spell Icon</span>
                    )}
                  </div>

                  <div style={{ fontSize: 13, lineHeight: 1.5 }}>
                    <div>
                      <strong>School:</strong> {selectedItem.school || "—"}
                    </div>
                    <div>
                      <strong>Rank:</strong> {selectedItem.rank ?? "—"}
                    </div>
                    <div>
                      <strong>Pip Cost:</strong> {selectedItem.pipCost ?? "—"}
                    </div>
                    <div>
                      <strong>Accuracy:</strong> {selectedItem.accuracy || "—"}
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: 8, fontSize: 13 }}>
                  <strong>Effect:</strong> {selectedItem.effect || "—"}
                </div>

                <div style={{ marginBottom: 8, fontSize: 13 }}>
                  <strong>Description:</strong> {selectedItem.description || "—"}
                </div>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    marginTop: 8,
                    fontSize: 12
                  }}
                >
                  <div>
                    <strong>Rarity:</strong> {selectedItem.rarity || "—"}
                  </div>
                  <div>
                    <strong>Spellement:</strong> {selectedItem.spellement || "—"}
                  </div>
                  <div>
                    <strong>Acquisition:</strong> {selectedItem.acquisition || "—"}
                  </div>
                </div>
              </div>
            )}

            {activeCategory !== "Spells" && (
              <div style={{ fontSize: 13 }}>
                <div style={{ marginBottom: 6 }}>
                  <strong>Category:</strong> {activeCategory}
                </div>
                <div>Select a spell to see full spell details.</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Wizard101Preview;
