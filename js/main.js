/*
 * Site script (home, blog index and every post). Vanilla JS, no dependencies.
 * - background video (paused for reduced-motion users)
 * - mobile menu (burger, overlay, Escape, resize)
 * - header that hides while scrolling down and returns when scrolling up
 * - video scrim that darkens as you leave the hero (home only)
 * - scroll-reveal for below-the-fold blocks
 * - scroll-spy for the nav pill (home only)
 * - count-up stats (home only)
 * - career tabs, back-to-top buttons
 */
(() => {
  'use strict';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const body = document.body;
  const isHome = body.classList.contains('home');

  /* ---------- background video ---------- */
  const video = $('.bg-video');
  if (video) {
    if (reduce) {
      video.removeAttribute('autoplay');
      video.pause();
    } else {
      const p = video.play();
      if (p && typeof p.catch === 'function') p.catch(() => { /* autoplay blocked: poster-less black bg is fine */ });
    }
  }

  /* ---------- mobile menu ---------- */
  const header = $('#header');
  const burger = $('#burger');
  const menu = $('#menu');
  const overlay = $('#menuOverlay');

  function setMenu(open) {
    if (!burger || !menu || !overlay) return;
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.hidden = !open;
    overlay.hidden = !open;
    body.classList.toggle('menu-open', open);
    if (open && header) header.classList.remove('is-hidden');
  }

  if (burger) burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
  if (overlay) overlay.addEventListener('click', () => setMenu(false));
  if (menu) menu.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  addEventListener('resize', () => { if (innerWidth > 720) setMenu(false); });

  /* ---------- header hide/show + scrim + progress ---------- */
  const progress = document.createElement('div');
  progress.className = 'progress';
  progress.setAttribute('aria-hidden', 'true');
  body.appendChild(progress);
  let lastY = scrollY;
  let ticking = false;

  function onScroll() {
    const y = scrollY;

    if (header && !body.classList.contains('menu-open')) {
      const dy = y - lastY;
      if (Math.abs(dy) > 4) {
        if (dy > 0 && y > 360) header.classList.add('is-hidden');
        else if (dy < 0 || y <= 360) header.classList.remove('is-hidden');
        lastY = y;
      }
    }

    if (progress) {
      const max = document.documentElement.scrollHeight - innerHeight;
      progress.style.setProperty('--p', max > 0 ? Math.min(1, y / max).toFixed(4) : 0);
    }

    if (isHome) {
      const t = Math.min(1, Math.max(0, y / (innerHeight * 0.75)));
      body.style.setProperty('--scrim', (0.2 + t * 0.6).toFixed(3));
    }
    ticking = false;
  }

  addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();


  /* ---------- headline: split into letters for the LED power-on ---------- */
  const headline = $('.headline');
  if (headline && !reduce) {
    let n = 0;
    $$(':scope > span', headline).forEach(line => {
      const text = line.textContent;
      line.textContent = '';
      line.classList.add('is-split');
      line.setAttribute('aria-hidden', 'true');
      [...text].forEach(c => {
        const ch = document.createElement('span');
        ch.className = 'ch';
        ch.textContent = c === ' ' ? '\u00a0' : c;
        ch.style.setProperty('--i', n++);
        line.appendChild(ch);
      });
    });
  }

  /* ---------- pointer effects (mouse / trackpad only) ---------- */
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (fine && !reduce) {
    // hero parallax: headline + video drift with the pointer
    const hero = $('#home');
    if (isHome && hero) {
      hero.addEventListener('pointermove', e => {
        const r = hero.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
        const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
        body.style.setProperty('--mx', x.toFixed(3));
        body.style.setProperty('--my', y.toFixed(3));
        hero.style.setProperty('--mx', x.toFixed(3));
        hero.style.setProperty('--my', y.toFixed(3));
      });
      hero.addEventListener('pointerleave', () => {
        body.style.setProperty('--mx', 0); body.style.setProperty('--my', 0);
        hero.style.setProperty('--mx', 0); hero.style.setProperty('--my', 0);
      });
    }

    // magnetic CTA buttons
    $$('.cta').forEach(btn => {
      btn.addEventListener('pointermove', e => {
        const r = btn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        btn.style.setProperty('--tx', (dx * 0.18).toFixed(1) + 'px');
        btn.style.setProperty('--ty', (dy * 0.28).toFixed(1) + 'px');
      });
      btn.addEventListener('pointerleave', () => {
        btn.style.removeProperty('--tx'); btn.style.removeProperty('--ty');
      });
    });

    // project cards: spotlight follows the pointer, visual tilts
    $$('.proj').forEach(card => {
      const vis = $('.visbox', card);
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--px', (e.clientX - r.left) + 'px');
        card.style.setProperty('--py', (e.clientY - r.top) + 'px');
        if (vis) {
          const v = vis.getBoundingClientRect();
          const nx = (e.clientX - (v.left + v.width / 2)) / v.width;
          const ny = (e.clientY - (v.top + v.height / 2)) / v.height;
          const cl = n => Math.max(-0.8, Math.min(0.8, n));
          vis.style.setProperty('--rx', (cl(nx) * 9).toFixed(2) + 'deg');
          vis.style.setProperty('--ry', (cl(ny) * -9).toFixed(2) + 'deg');
        }
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--py', '-60%');
        if (vis) { vis.style.setProperty('--rx', '0deg'); vis.style.setProperty('--ry', '0deg'); }
      });
    });
  }

  /* ---------- scroll reveal ---------- */
  const reveals = $$('.sr');
  if (reveals.length) {
    if (reduce || !('IntersectionObserver' in window)) {
      reveals.forEach(el => el.classList.add('is-in'));
    } else {
      const io = new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
      reveals.forEach(el => io.observe(el));
    }
  }

  /* ---------- scroll-spy (home) ---------- */
  if (isHome && 'IntersectionObserver' in window) {
    const links = $$('[data-sec]');
    const setActive = key => links.forEach(a => {
      const on = a.dataset.sec === key;
      a.classList.toggle('is-active', on);
      if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
    const spy = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) setActive(en.target.dataset.spy); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('[data-spy]').forEach(s => spy.observe(s));
  }

  /* ---------- count-up stats (home) ---------- */
  const stats = $('#stats');
  if (stats && !reduce) {
    const vals = $$('.stat__v', stats);
    const fmt = (el, v) => {
      el.textContent = (el.dataset.prefix || '') + v.toFixed(+el.dataset.dec || 0) + (el.dataset.suffix || '');
    };
    vals.forEach(el => fmt(el, 0)); // stats are still invisible (entrance delay), so no flash

    const run = () => vals.forEach((el, i) => {
      const target = parseFloat(el.dataset.target);
      const duration = 1500 + i * 80;
      setTimeout(() => {
        const t0 = performance.now();
        const step = now => {
          const p = Math.min(1, (now - t0) / duration);
          const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
          fmt(el, target * eased);
          if (p < 1) requestAnimationFrame(step); else fmt(el, target);
        };
        requestAnimationFrame(step);
      }, 480 + i * 90);
    });

    if ('IntersectionObserver' in window) {
      const once = new IntersectionObserver(entries => {
        if (entries.some(e => e.isIntersecting)) { run(); once.disconnect(); }
      }, { threshold: 0.25 });
      once.observe(stats);
    } else {
      run();
    }
  }

  /* ---------- career tabs ---------- */
  const rows = $$('.row');
  const details = $$('.detail');
  rows.forEach((row, i) => row.addEventListener('click', () => {
    rows.forEach((r, j) => { r.classList.toggle('is-active', i === j); r.setAttribute('aria-pressed', String(i === j)); });
    details.forEach((d, j) => d.classList.toggle('is-active', i === j));
  }));

  /* ---------- back to top ---------- */
  $$('[data-top]').forEach(btn => btn.addEventListener('click', () => {
    scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  }));
})();
