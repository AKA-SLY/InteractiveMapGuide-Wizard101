import { type GalleryItem } from "../types";

// Load the CSV from the local repo (raw string at build time)
// Note: the folder name contains an apostrophe, so use backticks for the path string.
const csvModules = import.meta.glob(`../../html's/*.csv`, { as: "raw", eager: true }) as Record<string, string>;

function parseCsv(raw: string): { url: string; title: string }[] {
  const out: { url: string; title: string }[] = [];
  if (!raw) return out;
  const lines = raw.split(/\r?\n/);
  // Expect header like: mw-allpages-chunk href,mw-allpages-chunk
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line || !line.includes(",")) continue;
    const comma = line.indexOf(",");
    const url = line.slice(0, comma).trim();
    const title = line.slice(comma + 1).trim();
    if (!url || !title) continue;
    out.push({ url, title });
  }
  return out;
}

const aggregate: GalleryItem[] = [];

for (const [path, raw] of Object.entries(csvModules)) {
  // Only pick the item list CSV; ignore any other CSVs in that folder if present
  if (!/Incomplete ItemList\.csv$/i.test(path)) continue;
  const rows = parseCsv(raw);
  for (const r of rows) {
    // Minimal gallery entry: name + link.
    // Category fixed to "Items" so the gallery renderer can group/filter.
    aggregate.push({
      name: r.title.replace(/^Item:/, ""),
      category: "Items",
      image: "", // no local images in this CSV
      wikiUrl: r.url,
    });
  }
}

export const itemsFromCsv: GalleryItem[] = aggregate;
