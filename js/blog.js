/* ══════════════════════════════════════════════════════════════
   BLOG — lazy-loads post manifest, renders list, fetches post
          bodies on demand from posts/<id>.html
   ══════════════════════════════════════════════════════════════

   How to add a post:
     1. Create  posts/my-slug.html   (HTML fragment, no <html>/<head>)
     2. Add an entry to posts/_index.json
   See README.md for the full template.
   ══════════════════════════════════════════════════════════════ */

const Blog = (() => {
  let loaded = false;
  let posts  = [];

  /* ── date helper ── */
  function formatDate(str) {
    return new Date(str + 'T00:00:00').toLocaleDateString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric',
    });
  }

  /* ── load manifest ── */
  async function load() {
    if (loaded) return;

    const loadingEl = document.getElementById('blog-loading');

    try {
      const res = await fetch('./posts/_index.json');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      posts  = await res.json();
      loaded = true;
      renderList();
    } catch (err) {
      if (loadingEl) {
        loadingEl.textContent =
          'could not load posts — site must be served over http (not file://).';
      }
      console.warn('[Blog] failed to load manifest:', err);
    }
  }

  /* ── render post list ── */
  function renderList() {
    const loadingEl = document.getElementById('blog-loading');
    const listEl    = document.getElementById('blog-list');
    if (loadingEl) loadingEl.style.display = 'none';

    if (posts.length === 0) {
      listEl.innerHTML =
        '<li style="padding:40px 0;font-size:11px;letter-spacing:.15em;color:var(--fg-mid);text-transform:uppercase">no posts yet</li>';
      return;
    }

    listEl.innerHTML = [...posts].reverse().map(p => `
      <li class="blog-entry" onclick="Blog.openPost('${p.id}')">
        <div class="blog-entry-header">
          <span class="blog-title">${p.title}</span>
          <span class="blog-date">${formatDate(p.date)}</span>
        </div>
        <p class="blog-excerpt">${p.excerpt}</p>
        <div class="blog-tags">
          ${p.tags.map(t => `<span class="blog-tag">${t}</span>`).join('')}
        </div>
      </li>
    `).join('');
  }

  /* ── open a post (fetch its .html file on demand) ── */
  async function openPost(id) {
    const post = posts.find(p => p.id === id);
    if (!post) return;

    const overlay    = document.getElementById('post-overlay');
    const contentEl  = document.getElementById('post-content');
    const metaEl     = document.getElementById('post-overlay-meta');
    const statusLeft = document.getElementById('status-left');

    // show overlay immediately with spinner
    overlay.classList.add('open');
    contentEl.innerHTML = '<div class="loading-msg">loading…</div>';
    metaEl.textContent  = '';
    if (statusLeft) statusLeft.innerHTML = `reading: ${post.title}<span class="blink"></span>`;

    try {
      const res  = await fetch(`posts/${post.id}.html`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const body = await res.text();

      metaEl.textContent = `${formatDate(post.date)} · ${post.tags.join(' · ')}`;
      contentEl.innerHTML = `
        <div class="post-header">
          <h1 class="post-title">${post.title}</h1>
          <div class="post-meta">${formatDate(post.date)} · ${post.tags.join(' · ')}</div>
        </div>
        <div class="post-body">${body}</div>
      `;
      // scroll back to top of overlay
      overlay.scrollTop = 0;
    } catch (err) {
      contentEl.innerHTML =
        '<div class="loading-msg">could not load post body.</div>';
      console.warn('[Blog] failed to load post:', err);
    }
  }

  /* ── close overlay ── */
  function closePost() {
    document.getElementById('post-overlay').classList.remove('open');
    const sl = document.getElementById('status-left');
    if (sl) sl.innerHTML = `ready<span class="blink"></span>`;
  }

  /* public API */
  return { ensureLoaded: load, openPost, closePost };
})();

window.Blog = Blog;
