const PREFIX = "fashion-hub:";

/** Safe localStorage read. Returns the fallback when storage is unavailable, empty, corrupt or invalid. */
export function readStorage<T>(key: string, fallback: T, validate?: (value: unknown) => value is T): T {
  try {
    if (typeof window === "undefined") return fallback;
    const raw = window.localStorage.getItem(PREFIX + key);
    if (raw === null) return fallback;
    const parsed: unknown = JSON.parse(raw);
    if (validate && !validate(parsed)) return fallback;
    return parsed as T;
  } catch {
    return fallback;
  }
}

export function writeStorage(key: string, value: unknown): boolean {
  try {
    if (typeof window === "undefined") return false;
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export const storageKey = (key: string) => PREFIX + key;
