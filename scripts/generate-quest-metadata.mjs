import { readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const questsDir = join(process.cwd(), "html's", "Quests");
const outputPath = join(process.cwd(), "src", "data", "json", "questsFromHtmlMeta.json");

function extractTitle(html) {
  const m = html.match(/<title>([^<]+)<\/title>/i);
  if (!m) return null;
  const raw = m[1].trim();
  const namePart = raw.replace(/\s*-\s*Wizard101\s+Wiki\s*$/i, "");
  return namePart || raw;
}

function extractCategories(html) {
  const match = html.match(/"wgCategories":\s*(\[[^\]]*\])/);
  if (!match) return [];
  try {
    const parsed = JSON.parse(match[1].replace(/\\"/g, '"'));
    return Array.isArray(parsed)
      ? parsed.filter((c) => typeof c === "string").map((c) => c.trim()).filter(Boolean)
      : [];
  } catch (err) {
    console.error("Failed to parse quest categories", err);
    return [];
  }
}

function extractFirstParagraph(html) {
  const p = html.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  if (!p) return undefined;
  const text = p[1]
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text || undefined;
}

function inferWorld(categories) {
  const questCategory = categories.find((c) => /Quests/i.test(c));
  if (!questCategory) return undefined;
  const match = questCategory.match(/^(.+?)(?: Side)? Quests$/i);
  if (match) return match[1];
  return undefined;
}

async function buildMetadata() {
  const files = await readdir(questsDir);
  const questFiles = files.filter((file) => file.toLowerCase().endsWith(".html"));
  const collected = [];

  for (const file of questFiles) {
    const raw = await readFile(join(questsDir, file), "utf8");
    const pageTitle = extractTitle(raw);
    if (!pageTitle) continue;
    const questName = pageTitle.replace(/^Quest:/, "").trim();
    if (!questName) continue;

    const categories = extractCategories(raw);
    collected.push({
      name: questName,
      description: extractFirstParagraph(raw),
      category: categories.find((c) => /Quests/i.test(c)) ?? categories[0],
      world: inferWorld(categories),
    });
  }

  await writeFile(outputPath, JSON.stringify(collected, null, 2), "utf8");
  console.log(`Wrote ${collected.length} quests to ${outputPath}`);
}

buildMetadata().catch((err) => {
  console.error(err);
  process.exit(1);
});
