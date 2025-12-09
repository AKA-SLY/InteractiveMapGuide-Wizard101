// Generic merge-by-name helper with curated-first precedence.
// Items from the right-hand arrays are only included if their name (case-insensitive)
// does not already exist in the left-hand items.

export function mergeByName<T extends { name: string }>(...lists: T[][]): T[] {
  const out: T[] = [];
  const seen = new Set<string>();
  const push = (item: T) => {
    const key = item.name.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    out.push(item);
  };
  for (const list of lists) {
    for (const item of list) push(item);
  }
  return out;
}
