/*
 * Blog pages script (blog/index.html and every post).
 * Handles: smooth scroll, the nav hide-on-scroll + blurred-background state,
 * the mobile menu sheet, and a simple fade/rise-in for cards and article text.
 * Deliberately separate from js/main.js, which drives the homepage's
 * section-pinning animations and expects elements that only exist there.
 */
(() => {
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGSAP = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';

  const nav = $('#nav'), sheet = $('#sheet'), menuBtn = $('#menuBtn'), toTop = $('#toTop');
  let lenis = null;

  function setMenu(open) {
    if (!sheet || !menuBtn) return;
    sheet.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.textContent = open ? 'Close' : 'Menu';
  }
  if (menuBtn) menuBtn.addEventListener('click', () => setMenu(!sheet.classList.contains('is-open')));
  document.addEventListener('click', e => { if (e.target.closest('.sheet a')) setMenu(false); });

  if (toTop) toTop.addEventListener('click', () => {
    lenis ? lenis.scrollTo(0, { duration: 1.4 }) : scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });

  if (reduce || !hasGSAP) return; // static, fully readable page either way

  document.documentElement.classList.add('motion');
  gsap.registerPlugin(ScrollTrigger);

  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.95, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  if (nav) {
    ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: self => {
        const y = self.scroll();
        nav.classList.toggle('is-hidden', self.direction === 1 && y > 400 && !sheet.classList.contains('is-open'));
      }
    });
  }

  // Post list: cards rise in, staggered.
  gsap.from('.postcard', {
    opacity: 0, y: 26, duration: 0.8, ease: 'power3.out', stagger: 0.08,
    scrollTrigger: { trigger: '.blog-list', start: 'top 88%', once: true }
  });

  // Single post: heading and body settle in.
  gsap.from('.post__head > *', {
    opacity: 0, y: 20, duration: 0.9, ease: 'power3.out', stagger: 0.08,
    scrollTrigger: { trigger: '.post__head', start: 'top 85%', once: true }
  });
  gsap.from('.article > *', {
    opacity: 0, y: 16, duration: 0.7, ease: 'power2.out', stagger: 0.05,
    scrollTrigger: { trigger: '.article', start: 'top 88%', once: true }
  });
})();
