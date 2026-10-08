"use client";

import { DEFAULT_THEME, STORAGE_KEY, THEMES } from "@/content/themes";

/*
  A tiny external store around localStorage, read with useSyncExternalStore.
  getServerSnapshot() returns the default so server and hydration render the
  same thing; React then swaps to the real stored value right after hydration.
  Reacting to "storage" keeps multiple tabs in sync.
*/

const listeners = new Set();

function emit() {
  for (const listener of listeners) listener();
}

export function subscribe(listener) {
  listeners.add(listener);

  const onStorage = (event) => {
    if (event.key === STORAGE_KEY) emit();
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function getSnapshot() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && THEMES.some((t) => t.id === stored)) return stored;
  } catch {
    /* private mode etc. */
  }
  return DEFAULT_THEME;
}

export function getServerSnapshot() {
  return DEFAULT_THEME;
}

export function setStoredTheme(id) {
  if (!THEMES.some((t) => t.id === id)) return;
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {
    /* ignore */
  }
  emit();
}
