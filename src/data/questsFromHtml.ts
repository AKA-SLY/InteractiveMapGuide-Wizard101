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

function extractCategories(html: string): string[] {
  const match = html.match(/"wgCategories":\s*(\[[^\]]*\])/);
  if (!match) return [];
  try {
    const parsed = JSON.parse(match[1].replace(/\\"/g, '"')) as unknown;
    return Array.isArray(parsed)
      ? parsed.filter((c): c is string => typeof c === "string").map((c) => c.trim()).filter(Boolean)
      : [];
  } catch (err) {
    console.error("Failed to parse quest categories", err);
    return [];
  }
}

function extractFirstParagraph(html: string): string | undefined {
  const p = html.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  if (!p) return undefined;
  const text = p[1]
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text || undefined;
}

function inferWorld(categories: string[]): string | undefined {
  const questCategory = categories.find((c) => /Quests/i.test(c));
  if (!questCategory) return undefined;
  const match = questCategory.match(/^(.+?)(?: Side)? Quests$/i);
  if (match) return match[1];
  return undefined;
}

const collected: Quest[] = [];

for (const raw of Object.values(htmlModules)) {
  const pageTitle = extractTitle(raw);
  if (!pageTitle) continue;
  const questName = pageTitle.replace(/^Quest:/, "").trim();
  if (!questName) continue;

  const categories = extractCategories(raw);
  const world = inferWorld(categories);

  collected.push({
    name: questName,
    description: extractFirstParagraph(raw),
    category: categories.find((c) => /Quests/i.test(c)) ?? categories[0],
    world,
  });
}

export const questsFromHtml: Quest[] = collected;
