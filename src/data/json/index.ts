// Auto-ingest all JSON files under /Json to populate datasets.
// Vite will inline these at build via eager glob import.

export type JsonModule = { default: unknown } | unknown;

// Key: virtual path, Value: parsed JSON (module.default or value)
export const jsonModules: Record<string, any> = {};

const modules = import.meta.glob("../../Json/**/*.json", { eager: true }) as Record<string, JsonModule>;

for (const [key, mod] of Object.entries(modules)) {
  const value: any = (mod as any)?.default ?? mod;
  jsonModules[key] = value;
}

export const allJsonArrays = (): any[][] => {
  const out: any[][] = [];
  for (const value of Object.values(jsonModules)) {
    if (Array.isArray(value)) out.push(value);
  }
  return out;
};

export const jsonArrayEntries = (): any[] => allJsonArrays().flat();

// Flatten plain object maps (non-arrays) into their values to support
// datasets stored as keyed records instead of JSON arrays.
export const jsonRecordValues = (): any[] => {
  const out: any[] = [];
  for (const value of Object.values(jsonModules)) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      out.push(...Object.values(value as Record<string, unknown>));
    }
  }
  return out;
};

export type JsonCategoryPage = {
  category: string;
  slug: string;
  title?: string;
  tables: { class?: string[]; rows?: string[][] }[];
};

export const jsonCategoryPages: JsonCategoryPage[] = [];

const categoryModules = import.meta.glob("../../Json/**/data.json", { eager: true }) as Record<string, JsonModule>;

for (const [key, mod] of Object.entries(categoryModules)) {
  const value: any = (mod as any)?.default ?? mod;
  const [, afterJson] = key.split("/Json/");
  const [category] = afterJson?.split("/") ?? [];

  if (!category || !value || typeof value !== "object") continue;

  for (const [slug, page] of Object.entries(value as Record<string, any>)) {
    const tables = Array.isArray((page as any)?.tables) ? ((page as any).tables as any[]) : [];
    jsonCategoryPages.push({
      category,
      slug,
      title: (page as any)?.title as string | undefined,
      tables,
    });
  }
}

export const flattenJsonCells = (tables: JsonCategoryPage["tables"]): string[] =>
  tables
    .flatMap((table) => table?.rows ?? [])
    .flat()
    .map((cell) => (cell == null ? "" : String(cell)).trim())
    .filter(Boolean);

export const wikiUrlFromSlug = (slug: string) =>
  `https://www.wizard101central.com/wiki/${slug.replace(/\.html?$/i, "")}`;
