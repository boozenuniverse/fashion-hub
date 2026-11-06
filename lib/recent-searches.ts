export const MAX_RECENT = 6;

/** Adds a search to the front of the list, case-insensitively de-duplicated and capped. */
export function addRecentSearch(list: string[], query: string, max = MAX_RECENT): string[] {
  const q = query.trim().replace(/\s+/g, " ");
  if (q.length < 2) return list;
  return [q, ...list.filter((x) => x.toLowerCase() !== q.toLowerCase())].slice(0, max);
}

export const removeRecentSearch = (list: string[], query: string): string[] => list.filter((x) => x !== query);
