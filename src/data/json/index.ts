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
