/* ══════════════════════════════════════════════════════════════
   ART — generative art gallery
   ─────────────────────────────────────────────────────────────
   Lazy-loads art/_index.json, groups artworks by series,
   renders each series under its own labelled section,
   opens a lightbox on click.

   JSON schema for each artwork:
   {
     "id":          "my-slug",           // unique, no spaces
     "title":       "piece title",
     "date":        "2025-04-01",        // optional
     "series":      "series name",       // optional — groups the piece
     "medium":      "canvas api",
     "description": "shown in lightbox", // optional
     "image":       "art/images/x.png"  // png/jpg/webp/gif/mp4/webm
                                         // leave "" for placeholder
   }

   Artworks without a "series" field are collected under a
   special group rendered last, with no section header.
   ══════════════════════════════════════════════════════════════ */

const Art = (() => {
  let loaded   = false;
  let artworks = [];

  /* ── load manifest ── */
  async function load() {
    if (loaded) return;
    const loadingEl = document.getElementById('art-loading');
    try {
      const res = await fetch('art/_index.json');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      artworks = await res.json();
      loaded   = true;
      renderGallery();
    } catch (err) {
      if (loadingEl) loadingEl.textContent =
        'could not load gallery — site must be served over http (not file://).';
      console.warn('[Art] failed to load manifest:', err);
    }
  }

  /* ── group artworks by series ── */
  function groupBySeries(items) {
    const map    = new Map();   // preserves insertion order of first appearance
    const ungrouped = [];

    for (const art of items) {
      if (art.series) {
        if (!map.has(art.series)) map.set(art.series, []);
        map.get(art.series).push(art);
      } else {
        ungrouped.push(art);
      }
    }

    // Return array of { name, items } — ungrouped last, name = null
    const groups = [];
    for (const [name, items] of map) groups.push({ name, items });
    if (ungrouped.length) groups.push({ name: null, items: ungrouped });
    return groups;
  }

  /* ── media type detection ── */
  function mediaType(src) {
    if (!src) return 'none';
    const ext = src.split('.').pop().toLowerCase();
    if (['mp4', 'webm', 'ogg'].includes(ext)) return 'video';
    if (ext === 'gif') return 'gif';
    return 'image';
  }

  /* ── card thumbnail HTML ── */
  function cardMedia(art) {
    if (!art.image)
      return `<div class="art-card-placeholder">${art.medium || 'no media'}</div>`;
    if (mediaType(art.image) === 'video')
      return `<video class="art-card-video" src="${art.image}"
                muted autoplay loop playsinline preload="metadata"
                aria-label="${art.title}"></video>`;
    return `<img src="${art.image}" alt="${art.title}" loading="lazy">`;
  }

  /* ── lightbox media HTML ── */
  function lightboxMedia(art) {
    if (!art.image) return '';
    if (mediaType(art.image) === 'video')
      return `<video class="art-overlay-video" src="${art.image}"
                controls autoplay loop muted playsinline
                aria-label="${art.title}"></video>`;
    return `<img class="art-overlay-img" src="${art.image}" alt="${art.title}">`;
  }

  /* ── render one grid of cards ── */
  function renderGrid(items) {
    return `
      <div class="art-grid">
        ${items.map(art => `
          <div class="art-card" onclick="Art.openArtwork('${art.id}')">
            ${cardMedia(art)}
            <div class="art-card-info">
              <div class="art-card-title">${art.title}</div>
              <div class="art-card-medium">${art.medium}</div>
            </div>
          </div>
        `).join('')}
      </div>`;
  }

  /* ── render full gallery (all series) ── */
  function renderGallery() {
    const loadingEl = document.getElementById('art-loading');
    const container = document.getElementById('art-gallery');
    if (loadingEl) loadingEl.style.display = 'none';

    if (artworks.length === 0) {
      container.innerHTML = `
        <p class="loading-msg">no artworks yet — add entries to art/_index.json</p>`;
      return;
    }

    const groups = groupBySeries(artworks);

    container.innerHTML = groups.map(group => `
      <section class="art-series">
        ${group.name
          ? `<div class="section-rule art-series-rule">
               <span class="section-rule-label">${group.name}</span>
               <div class="section-rule-line"></div>
               <span class="art-series-count">${group.items.length}</span>
             </div>`
          : ''}
        ${renderGrid(group.items)}
      </section>
    `).join('');
  }

  /* ── open lightbox ── */
  function openArtwork(id) {
    const art = artworks.find(a => a.id === id);
    if (!art) return;

    const overlay   = document.getElementById('art-overlay');
    const contentEl = document.getElementById('art-overlay-content');
    const sl        = document.getElementById('status-left');

    const seriesLine = art.series
      ? `<span class="art-overlay-series">${art.series}</span> · ` : '';

    contentEl.innerHTML = `
      <div class="art-overlay-label">${seriesLine}${art.medium}${art.date ? ' · ' + art.date : ''}</div>
      <div class="art-overlay-title">${art.title}</div>
      ${lightboxMedia(art)}
      ${art.description ? `<p class="art-overlay-desc">${art.description}</p>` : ''}
    `;

    overlay.classList.add('open');
    if (sl) sl.innerHTML = `viewing: ${art.title}<span class="blink"></span>`;
  }

  /* ── close lightbox ── */
  function closeArtwork() {
    document.getElementById('art-overlay').classList.remove('open');
    const sl = document.getElementById('status-left');
    if (sl) sl.innerHTML = `ready<span class="blink"></span>`;
  }

  return { ensureLoaded: load, openArtwork, closeArtwork };
})();

window.Art = Art;
