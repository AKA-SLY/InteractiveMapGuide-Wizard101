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

function stripTags(text) {
  return text
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/gi, "&")
    .replace(/&rsquo;/gi, "'")
    .replace(/&ldquo;|&rdquo;/gi, '"')
    .replace(/&hellip;/gi, "…")
    .replace(/&#8211;|&ndash;/gi, "-")
    .replace(/&#8212;|&mdash;/gi, "—");
}

function htmlToLines(html) {
  const prepared = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<img[^>]+alt="([^"]+)"[^>]*>/gi, " $1 ")
    .replace(/<br\s*\/?\s*>/gi, "\n")
    .replace(/<li[^>]*>/gi, "\n- ")
    .replace(/<\/(p|div|tr|table)>/gi, "\n")
    .replace(/<td[^>]*>/gi, " ")
    .replace(/<hr[^>]*>/gi, "\n")
    .replace(/<h\d[^>]*>/gi, "\n")
    .replace(/<\/h\d>/gi, "\n");

  return stripTags(prepared)
    .split(/\n+/)
    .map((line) =>
      line
        .replace(/\(Icon\)\s*/gi, "")
        .replace(/\.png/gi, "")
        .replace(/\s+/g, " ")
        .trim(),
    )
    .filter(Boolean);
}

const LABEL_PATTERNS = [
  /^Prequest:/i,
  /^Given By:/i,
  /^Giver Location:/i,
  /^Goals:/i,
  /^Hand In:/i,
  /^Reward:/i,
  /^Leads To:/i,
  /^Quest Dialogue:/i,
];

function isLabel(line) {
  return LABEL_PATTERNS.some((re) => re.test(line)) || /^This is a/i.test(line);
}

function extractQuestSection(html) {
  const start = html.search(/id="Quest_Information"/i);
  if (start === -1) return undefined;
  const after = html.slice(start);
  const nextHeader = after.search(/<h1><span class="mw-headline" id="(?!Quest_Information)/i);
  if (nextHeader === -1) return after;
  return after.slice(0, nextHeader);
}

function extractQuestDetails(html) {
  const section = extractQuestSection(html);
  if (!section) return {};

  const lines = htmlToLines(section);
  const details = {
    prequest: undefined,
    givenBy: undefined,
    giverLocation: undefined,
    questType: undefined,
    goals: [],
    handIn: undefined,
    reward: [],
    leadsTo: undefined,
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^Prequest:/i.test(line)) {
      details.prequest = line.replace(/^Prequest:/i, "").trim();
    } else if (/^Given By:/i.test(line)) {
      details.givenBy = line.replace(/^Given By:/i, "").trim();
    } else if (/^Giver Location:/i.test(line)) {
      details.giverLocation = line.replace(/^Giver Location:/i, "").trim();
    } else if (/^This is a/i.test(line)) {
      details.questType = line;
    } else if (/^Goals:/i.test(line)) {
      const goalLines = [];
      for (let j = i + 1; j < lines.length; j++) {
        if (isLabel(lines[j])) break;
        goalLines.push(lines[j]);
        i = j;
      }
      details.goals = goalLines;
    } else if (/^Hand In:/i.test(line)) {
      details.handIn = line.replace(/^Hand In:/i, "").trim();
    } else if (/^Reward:/i.test(line)) {
      const rewardLines = [];
      for (let j = i + 1; j < lines.length; j++) {
        if (isLabel(lines[j])) break;
        rewardLines.push(lines[j]);
        i = j;
      }
      details.reward = rewardLines;
    } else if (/^Leads To:/i.test(line)) {
      details.leadsTo = line.replace(/^Leads To:/i, "").trim();
    }
  }

  return details;
}

function buildDescription(details) {
  const normalizeRewards = (lines = []) => {
    const cleaned = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (/^\(Quest\)/i.test(line)) continue;

      const next = lines[i + 1];
      if (/^(Gold|XP|Experience|Arena Tickets|Crowns|Training Point|Badge|Loot)/i.test(line) && next && /^-?\d+/.test(next)) {
        cleaned.push(`${line}: ${next.trim()}`);
        i++;
        continue;
      }

      cleaned.push(line.trim());
    }

    return cleaned.filter(Boolean);
  };

  const parts = [];

  if (details.prequest) parts.push(`Prequest: ${details.prequest}`);

  if (details.givenBy) {
    const location = details.giverLocation ? ` (${details.giverLocation})` : "";
    parts.push(`Given by: ${details.givenBy}${location}`);
  }

  if (details.questType) parts.push(details.questType);

  if (details.goals?.length) {
    const formattedGoals = details.goals
      .map((goal) => (goal.startsWith("-") ? goal : `- ${goal}`))
      .join("\n");
    parts.push(`Goals:\n${formattedGoals}`);
  }

  if (details.handIn) parts.push(`Hand in: ${details.handIn}`);

  const rewards = normalizeRewards(details.reward);
  if (rewards.length) {
    parts.push(`Rewards: ${rewards.join("; ")}`);
  }

  if (details.leadsTo) parts.push(`Leads to: ${details.leadsTo}`);

  return parts.length ? parts.join("\n") : undefined;
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
    const questDetails = extractQuestDetails(raw);
    collected.push({
      name: questName,
      description: buildDescription(questDetails),
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
