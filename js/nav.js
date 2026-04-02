/* ══════════════════════════════════════════════════════════════
   NAV — page routing + mobile hamburger menu
   ══════════════════════════════════════════════════════════════ */

/**
 * Switch to a page section and update all UI chrome.
 * @param {string}      id  - page id suffix (e.g. 'blog')
 * @param {Element|null} btn - the nav button that was clicked
 */
window.showPage = function showPage(id, btn) {
  // swap active page
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + id)?.classList.add('active');

  // sync nav buttons in BOTH desktop and mobile nav by matching label text
  const label = btn ? btn.textContent.trim().toLowerCase() : id;
  document.querySelectorAll('.nav-btn').forEach(b => {
    b.classList.toggle('active', b.textContent.trim().toLowerCase() === label);
  });

  // update big side label
  const big = document.getElementById('big-label');
  if (big) big.textContent = id;

  // update status bar
  const sl = document.getElementById('status-left');
  if (sl) sl.innerHTML = `${id}<span class="blink"></span>`;

  // lazy-load data sections
  if (id === 'blog') window.Blog?.ensureLoaded();
  if (id === 'art')  window.Art?.ensureLoaded();
};

/* ── MOBILE HAMBURGER ── */
window.toggleMobileNav = function toggleMobileNav() {
  const nav     = document.getElementById('mobile-nav');
  const overlay = document.getElementById('mobile-nav-overlay');
  const btn     = document.getElementById('hamburger-btn');
  const isOpen  = nav.classList.toggle('open');
  overlay.classList.toggle('active', isOpen);
  btn.classList.toggle('open', isOpen);
  btn.setAttribute('aria-expanded', String(isOpen));
};

window.closeMobileNav = function closeMobileNav() {
  document.getElementById('mobile-nav').classList.remove('open');
  document.getElementById('mobile-nav-overlay').classList.remove('active');
  const btn = document.getElementById('hamburger-btn');
  btn.classList.remove('open');
  btn.setAttribute('aria-expanded', 'false');
};

/* ── KEYBOARD: close overlays on Escape ── */
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  window.Blog?.closePost();
  window.Art?.closeArtwork();
  closeMobileNav();
});
