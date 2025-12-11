import { type Quest } from "../types";

// Load saved HTML quest pages from the local repo (as raw strings)
// Folder name has an apostrophe, so use backticks for the glob path.
const htmlModules = import.meta.glob(`../../html's/Quests/*.html`, { as: "raw", eager: true }) as Record<string, string>;

function extractTitle(html: string): string | null {
  const m = html.match(/<title>([^<]+)<\/title>/i);
  if (!m) return null;
  const raw = m[1].trim();
  // e.g., "Quest:A Sight for Core Eyes - Wizard101 Wiki"
  const namePart = raw.replace(/\s*-\s*Wizard101\s+Wiki\s*$/i, "");
  return namePart || raw;
}

function wikiUrlFor(pageTitle: string): string {
  // Expect pageTitle like "Quest:Some Name"; convert spaces to underscores
  const path = pageTitle.replace(/\s+/g, "_");
  // Keep colon and apostrophes; encode other characters safely
  return encodeURI(`https://wiki.wizard101central.com/wiki/${path}`);
}

const collected: Quest[] = [];

for (const raw of Object.values(htmlModules)) {
  const pageTitle = extractTitle(raw);
  if (!pageTitle) continue;
  const questName = pageTitle.replace(/^Quest:/, "").trim();
  if (!questName) continue;
  collected.push({
    name: questName,
    wikiUrl: wikiUrlFor(pageTitle),
  });
}

export const questsFromHtml: Quest[] = collected;
