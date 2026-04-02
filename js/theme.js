/* ══════════════════════════════════════════════════════════════
   THEME — switching + localStorage persistence
   ══════════════════════════════════════════════════════════════ */

const THEME_KEY = 'efive-theme';

/**
 * Apply a theme and mark the correct toggle button(s) active.
 * @param {string} t  - 'dark' | 'light' | 'amber'
 * @param {Element|null} btn - the button that was clicked (optional)
 */
window.setTheme = function setTheme(t, btn) {
  document.documentElement.setAttribute('data-theme', t);

  // Mark all matching toggles active (desktop + mobile nav have duplicates)
  document.querySelectorAll('.theme-toggle').forEach(b => {
    b.classList.toggle('active', b.textContent.trim() === t);
  });

  try { localStorage.setItem(THEME_KEY, t); } catch { /* storage blocked */ }
};

// Restore on first load (runs synchronously, before paint)
(function restoreTheme() {
  let saved = 'dark';
  try { saved = localStorage.getItem(THEME_KEY) || 'dark'; } catch {}
  document.documentElement.setAttribute('data-theme', saved);

  // Sync button active states after DOM is parsed
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.theme-toggle').forEach(b => {
      b.classList.toggle('active', b.textContent.trim() === saved);
    });
  });
})();
