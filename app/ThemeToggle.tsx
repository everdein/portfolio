"use client";

import { useSyncExternalStore } from "react";

const THEME_STORAGE_KEY = "matthew-clark-portfolio-theme";
const THEME_CHANGE_EVENT = "portfolio-theme-change";
type Theme = "light" | "dark";

function getTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function subscribeToThemeChange(onStoreChange: () => void) {
  window.addEventListener(THEME_CHANGE_EVENT, onStoreChange);
  return () => window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeToThemeChange,
    getTheme,
    () => "light",
  );

  function toggleTheme() {
    const root = document.documentElement;
    const nextTheme: Theme = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = nextTheme;
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // The selected theme still applies when storage is unavailable.
    }
  }

  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      className="theme-control"
      type="button"
      aria-label={`Switch to ${nextTheme} theme`}
      aria-pressed={theme === "dark"}
      title={`Switch to ${nextTheme} theme`}
      onClick={toggleTheme}
    >
      <span className="theme-icon theme-icon-sun" aria-hidden="true">
        {"\u2600"}
      </span>
      <span className="theme-icon theme-icon-moon" aria-hidden="true">
        {"\u263e"}
      </span>
    </button>
  );
}
