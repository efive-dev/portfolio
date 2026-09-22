/*
 * Portfolio scroll choreography.
 * Requires (loaded before this file): gsap, ScrollTrigger, Lenis (all in js/vendor/).
 *
 * Sections, in order:
 *   1. intro         letters swell from hairline to heavy
 *   2. hero scroll   code card expands into the full-bleed dark section
 *   3. nav / rail    theme, active section and progress follow scroll position
 *   4. about         text "types" itself with a caret
 *   5. tools         font weight follows the viewport centre
 *   6. work          horizontal gallery (desktop only)
 *   7. experience    pinned, scroll steps through jobs
 *   8. contact       headline swells as it arrives
 *
 * If GSAP fails to load or the visitor prefers reduced motion, the page
 * falls back to a static, fully readable layout.
 */
(() => {
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGSAP = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';

  const nav = $('#nav'), hero = $('#home'), morph = $('#morph'), slot = $('#slot');
  let lenis = null;

  /* ---------- navigation helpers ---------- */
  function goTo(target) {
    if (target === '#home') { lenis ? lenis.scrollTo(0, { duration: 1.6 }) : scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); return; }
    const el = $(target); if (!el) return;
    lenis ? lenis.scrollTo(el, { duration: 1.6 }) : el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  }
  const sheet = $('#sheet'), menuBtn = $('#menuBtn');
  function setMenu(open) {
    sheet.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.textContent = open ? 'Close' : 'Menu';
  }
  menuBtn.addEventListener('click', () => setMenu(!sheet.classList.contains('is-open')));
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-go]');
    if (a) { e.preventDefault(); setMenu(false); goTo(a.dataset.go); return; }
    if (e.target.closest('[data-placeholder]')) e.preventDefault();
  });

  /* ---------- experience stepper (shared by both modes) ---------- */
  const rows = $$('.row'), details = $$('.detail');
  let jobIdx = 0;
  function setJob(i) {
    if (i === jobIdx && rows[i].classList.contains('is-active')) return;
    jobIdx = i;
    rows.forEach((r, k) => { r.classList.toggle('is-active', k === i); r.setAttribute('aria-pressed', k === i); });
    details.forEach((d, k) => d.classList.toggle('is-active', k === i));
  }

  /* ---------- static fallback ---------- */
  if (reduce || !hasGSAP) {
    document.documentElement.classList.add('reduce');
    rows.forEach((r, i) => r.addEventListener('click', () => setJob(i)));
    return;
  }

  document.documentElement.classList.add('motion');
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  /* ---------- smooth scrolling ---------- */
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.95, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  /* ---------- text splitting ---------- */
  function splitChars(root) {
    $$('.line', root).forEach(line => {
      const words = line.textContent.trim().split(' ');
      line.textContent = '';
      words.forEach((w, wi) => {
        const ws = document.createElement('span'); ws.style.display = 'inline-block'; ws.style.whiteSpace = 'nowrap'; ws.setAttribute('aria-hidden', 'true');
        [...w].forEach(ch => { const c = document.createElement('span'); c.className = 'char'; c.textContent = ch; ws.appendChild(c); });
        line.appendChild(ws);
        if (wi < words.length - 1) line.appendChild(document.createTextNode(' '));
      });
    });
    return $$('.char', root);
  }
  function splitWords(el) {
    const words = el.textContent.trim().split(/\s+/);
    el.setAttribute('aria-label', words.join(' '));
    el.innerHTML = words.map(w => `<span class="w" aria-hidden="true">${w}</span>`).join(' ');
    return $$('.w', el);
  }
  const nameChars = splitChars($('#name'));
  const contactChars = splitChars($('#contactH'));
  const morphWords = splitWords($('#morphText'));
  const aboutEl = $('#aboutText');
  const aboutWords = splitWords(aboutEl);
  const caret = document.createElement('span'); caret.className = 'caret'; caret.setAttribute('aria-hidden', 'true'); aboutEl.appendChild(caret);

  /* ---------- hero card -> full-bleed dark ---------- */
  const M = { p: 0 };
  function drawMorph() {
    const W = hero.clientWidth, H = hero.clientHeight;
    const l = slot.offsetLeft, t = slot.offsetTop, r = W - l - slot.offsetWidth, b = H - t - slot.offsetHeight, k = 1 - M.p;
    morph.style.clipPath = `inset(${t * k}px ${r * k}px ${b * k}px ${l * k}px round ${28 * k}px)`;
  }

  /* ---------- 1. intro: letters swell from hairline to heavy ---------- */
  gsap.set(nameChars, { yPercent: 112, fontWeight: 200 });
  gsap.set(nav, { opacity: 0 });
  gsap.timeline({ delay: 0.15 })
    .to(nameChars, { yPercent: 0, fontWeight: 800, duration: 1.5, ease: 'expo.out', stagger: 0.07 }, 0)
    .to(nav, { opacity: 1, duration: 1, ease: 'power2.out' }, 0.6)
    .to(morph, { opacity: 1, duration: 0.9, ease: 'power2.out' }, 0.7)
    .fromTo('.fade-in', { y: 24 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.14 }, 0.8);

  /* ---------- 2. hero scroll ---------- */
  const heroTl = gsap.timeline({
    scrollTrigger: { trigger: hero, start: 'top top', end: '+=150%', scrub: 1, pin: true, anticipatePin: 1, invalidateOnRefresh: true }
  });
  heroTl
    .to(M, { p: 1, duration: 1, ease: 'power2.inOut', onUpdate: drawMorph }, 0)
    .to('.slot__code', { opacity: 0, duration: 0.3, ease: 'none' }, 0.05)
    .to('.intro span, .status > *', { opacity: 0, y: -20, duration: 0.3, ease: 'none' }, 0)
    .to('#name', { yPercent: -7, ease: 'none', duration: 1 }, 0)
    .fromTo(nameChars, { fontWeight: 800 }, { fontWeight: 300, duration: 0.8, ease: 'none', stagger: 0.04, immediateRender: false }, 0)
    .fromTo(morphWords, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', stagger: 0.05 }, 0.55)
    .to({}, { duration: 0.3 });
  drawMorph();

  /* ---------- 3. nav, rail and theme driven by scroll position ---------- */
  const ents = [
    { el: hero, sec: 'home', bg: 'var(--papaya-whip)' },
    { el: $('#about'), sec: 'about', dark: true, bg: 'var(--brick-red)' },
    { el: $('#tools'), sec: 'about', dark: false, bg: 'var(--steel-blue)' },
    { el: $('#work'), sec: 'work', dark: true, bg: 'var(--deep-space-blue)' },
    { el: $('#experience'), sec: 'experience', dark: false, bg: 'var(--papaya-whip)' },
    { el: $('#contact'), sec: 'contact', dark: true, bg: 'var(--molten-lava)' }
  ];
  ents.forEach(e => { e.st = ScrollTrigger.create({ trigger: e.el, start: 'top top' }); });
  const railLinks = $$('.rail__n'), fill = $('#railFill');
  let lastSec = '';
  function syncState(y) {
    let cur = ents[0], themeEnt = ents[0];
    ents.forEach(e => {
      if (y + innerHeight * 0.5 >= e.st.start) cur = e;
      if (y + 60 >= e.st.start) themeEnt = e;
    });
    const dark = themeEnt.sec === 'home' ? heroTl.scrollTrigger.progress > 0.62 : themeEnt.dark;
    document.body.classList.toggle('on-dark', !!dark);
    document.body.style.setProperty('--page', themeEnt.sec === 'home' && dark ? 'var(--brick-red)' : themeEnt.bg);
    if (cur.sec !== lastSec) { lastSec = cur.sec; railLinks.forEach(l => l.classList.toggle('is-current', l.dataset.sec === cur.sec)); }
  }
  ScrollTrigger.create({
    start: 0, end: 'max',
    onUpdate: self => {
      const y = self.scroll();
      fill.style.transform = `scaleY(${self.progress})`;
      nav.classList.toggle('is-hidden', self.direction === 1 && y > 500 && !sheet.classList.contains('is-open'));
      syncState(y);
    }
  });
  ScrollTrigger.addEventListener('refresh', () => { drawMorph(); syncState(scrollY); });

  /* ---------- 4. about: text types itself, a caret follows ---------- */
  ScrollTrigger.create({
    trigger: aboutEl, start: 'top 75%', end: 'bottom 45%',
    onUpdate: self => {
      const n = aboutWords.length, f = self.progress * n;
      aboutWords.forEach((w, i) => { w.style.opacity = 0.25 + 0.75 * Math.min(1, Math.max(0, f - i)); });
      const w = aboutWords[Math.min(n - 1, Math.floor(f))];
      caret.style.left = (w.offsetLeft + (f >= n ? w.offsetWidth : 0) + 3) + 'px';
      caret.style.top = w.offsetTop + 'px';
    }
  });
  $$('.fact').forEach((f, i) => {
    const kids = [...f.children], d = { s: 0 };
    gsap.set(kids, { y: 20 });
    ScrollTrigger.create({
      trigger: '#facts', start: 'top 88%', once: true,
      onEnter: () => {
        gsap.to(d, { s: 1, duration: 1, delay: i * 0.12, ease: 'expo.out', onUpdate: () => f.style.setProperty('--sx', d.s) });
        gsap.to(kids, { opacity: 1, y: 0, duration: 0.9, delay: 0.2 + i * 0.12, ease: 'power3.out', stagger: 0.08 });
      }
    });
  });

  /* ---------- 5. tools: weight wave follows the viewport centre ---------- */
  const toolRows = $$('.tool').map(r => ({ r, n: $('.tool__n', r), d: $('.tool__d', r) }));
  function wave() {
    const vh = innerHeight;
    toolRows.forEach(o => {
      const b = o.r.getBoundingClientRect();
      const d = Math.min(1, Math.abs(b.top + b.height / 2 - vh * 0.5) / (vh * 0.42));
      const k = Math.pow(1 - d, 1.6);
      o.n.style.fontWeight = Math.round(200 + k * 600);
      o.n.style.opacity = (0.28 + 0.72 * k).toFixed(3);
      o.d.style.opacity = (0.12 + 0.88 * k).toFixed(3);
    });
  }
  ScrollTrigger.create({ trigger: '#tools', start: 'top bottom', end: 'bottom top', onUpdate: wave, onRefresh: wave });

  /* ---------- 6. work: horizontal gallery (desktop) ---------- */
  const mm = gsap.matchMedia();
  mm.add('(min-width: 900px)', () => {
    const track = $('#track'), bar = $('#workBar');
    const dist = () => Math.max(0, track.offsetWidth - innerWidth);
    const h = gsap.to(track, {
      x: () => -dist(), ease: 'none',
      scrollTrigger: {
        trigger: '#work', start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true,
        onUpdate: self => { bar.style.transform = `scaleX(${self.progress})`; }
      }
    });
    $$('.proj').forEach(p => {
      gsap.fromTo($('.vis', p), { xPercent: -5 }, { xPercent: 5, ease: 'none', scrollTrigger: { trigger: p, containerAnimation: h, start: 'left right', end: 'right left', scrub: true } });
      gsap.fromTo(p, { opacity: 0.35, scale: 0.96 }, { opacity: 1, scale: 1, ease: 'none', scrollTrigger: { trigger: p, containerAnimation: h, start: 'left 95%', end: 'left 45%', scrub: true } });
    });
    gsap.fromTo('.work__intro h2', { xPercent: 0 }, { xPercent: -14, ease: 'none', scrollTrigger: { trigger: '.work__intro', containerAnimation: h, start: 'left left', end: 'right left', scrub: true } });
    return () => { bar.style.transform = ''; };
  });

  /* ---------- 7. experience: scroll steps through jobs, weight morphs ---------- */
  const expST = ScrollTrigger.create({
    trigger: '#experience', start: 'top top', end: '+=300%', pin: true, anticipatePin: 1,
    onUpdate: self => setJob(Math.min(rows.length - 1, Math.floor(self.progress * rows.length)))
  });
  rows.forEach((r, i) => r.addEventListener('click', () => {
    const y = expST.start + (expST.end - expST.start) * ((i + 0.5) / rows.length);
    lenis ? lenis.scrollTo(y, { duration: 1.2 }) : scrollTo({ top: y, behavior: 'smooth' });
  }));

  /* ---------- 8. contact: headline swells as it arrives ---------- */
  gsap.set(contactChars, { fontWeight: 200 });
  gsap.to(contactChars, {
    fontWeight: 800, ease: 'none', stagger: 0.03,
    scrollTrigger: { trigger: '#contact', start: 'top 80%', end: 'top 10%', scrub: 1 }
  });

  /* ---------- keep in sync ---------- */
  addEventListener('load', () => ScrollTrigger.refresh());
  document.fonts && document.fonts.ready.then(() => ScrollTrigger.refresh());
})();
