"use client";

const THEME_STORAGE_KEY = "matthew-clark-portfolio-theme";

export function ThemeToggle() {
  function toggleTheme() {
    const root = document.documentElement;
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = nextTheme;

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // The selected theme still applies when storage is unavailable.
    }
  }

  return (
    <button
      className="theme-control"
      type="button"
      aria-label="Toggle color theme"
      title="Toggle color theme"
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
