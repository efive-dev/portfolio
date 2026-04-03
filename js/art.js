/* ══════════════════════════════════════════════════════════════
   ART — generative art gallery
   Lazy-loads art/_index.json, renders a grid, opens a lightbox.

   How to add an artwork:
     1. Put the image in  art/images/my-artwork.png  (or any format)
     2. Add an entry to   art/_index.json
   See README.md for the full schema.
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
      renderGrid();
    } catch (err) {
      if (loadingEl) {
        loadingEl.textContent =
          'could not load gallery — site must be served over http (not file://).';
      }
      console.warn('[Art] failed to load manifest:', err);
    }
  }

  /* ── detect media type from file extension ── */
  function mediaType(src) {
    if (!src) return 'none';
    const ext = src.split('.').pop().toLowerCase();
    if (ext === 'mp4' || ext === 'webm' || ext === 'ogg') return 'video';
    if (ext === 'gif') return 'gif';
    return 'image';
  }

  /* ── build thumbnail element for the grid card ── */
  function cardMedia(art) {
    if (!art.image) {
      return `<div class="art-card-placeholder">${art.medium || 'no media'}</div>`;
    }
    const type = mediaType(art.image);
    if (type === 'video') {
      // muted autoplay loop as a silent thumbnail
      return `<video class="art-card-video" src="${art.image}"
                muted autoplay loop playsinline preload="metadata"
                aria-label="${art.title}"></video>`;
    }
    // gif and images both use <img> (gif animates automatically)
    return `<img src="${art.image}" alt="${art.title}" loading="lazy">`;
  }

  /* ── build full lightbox media element ── */
  function lightboxMedia(art) {
    if (!art.image) return '';
    const type = mediaType(art.image);
    if (type === 'video') {
      return `<video class="art-overlay-video" src="${art.image}"
                controls autoplay loop muted playsinline
                aria-label="${art.title}"></video>`;
    }
    return `<img class="art-overlay-img" src="${art.image}" alt="${art.title}">`;
  }

  /* ── render gallery grid ── */
  function renderGrid() {
    const loadingEl = document.getElementById('art-loading');
    const gridEl    = document.getElementById('art-grid');
    if (loadingEl) loadingEl.style.display = 'none';

    if (artworks.length === 0) {
      gridEl.innerHTML = `
        <div style="padding:40px;font-size:11px;letter-spacing:.15em;color:var(--fg-mid);text-transform:uppercase">
          no artworks yet — add entries to art/_index.json
        </div>`;
      return;
    }

    gridEl.innerHTML = artworks.map(art => `
      <div class="art-card" onclick="Art.openArtwork('${art.id}')">
        ${cardMedia(art)}
        <div class="art-card-info">
          <div class="art-card-title">${art.title}</div>
          <div class="art-card-medium">${art.medium}</div>
        </div>
      </div>
    `).join('');
  }

  /* ── open lightbox ── */
  function openArtwork(id) {
    const art = artworks.find(a => a.id === id);
    if (!art) return;

    const overlay   = document.getElementById('art-overlay');
    const contentEl = document.getElementById('art-overlay-content');
    const sl        = document.getElementById('status-left');

    contentEl.innerHTML = `
      <div class="art-overlay-label">${art.medium}${art.date ? ' · ' + art.date : ''}</div>
      <div class="art-overlay-title">${art.title}</div>
      ${lightboxMedia(art)}
      ${art.description
        ? `<p class="art-overlay-desc">${art.description}</p>`
        : ''
      }
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

  /* public API */
  return { ensureLoaded: load, openArtwork, closeArtwork };
})();

window.Art = Art;
