"use client";

import { useCallback, useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";
import { readStorage, storageKey, writeStorage } from "@/lib/storage";

/**
 * localStorage-backed state that is safe for static export: the first render always uses `initial`
 * (matching the server HTML), then the stored value is loaded in an effect and kept in sync across tabs.
 */
export function usePersistentState<T>(key: string, initial: T, validate?: (v: unknown) => v is T): [T, Dispatch<SetStateAction<T>>, boolean] {
  const [value, setValue] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);
  const validateRef = useRef(validate);
  validateRef.current = validate;

  useEffect(() => {
    setValue(readStorage<T>(key, initial, validateRef.current));
    setHydrated(true);
    const onStorage = (e: StorageEvent) => {
      if (e.key === storageKey(key)) setValue(readStorage<T>(key, initial, validateRef.current));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const set: Dispatch<SetStateAction<T>> = useCallback(
    (next) => {
      setValue((prev) => {
        const resolved = typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        writeStorage(key, resolved);
        return resolved;
      });
    },
    [key],
  );

  return [value, set, hydrated];
}
