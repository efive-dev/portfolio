(function () {
  const canvas = document.getElementById('flow-field-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const seedLabel = document.getElementById('flow-field-seed');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Classic Perlin noise (2D), seeded permutation table ---- */
  class Perlin {
    constructor(seed) {
      const p = new Uint8Array(256);
      for (let i = 0; i < 256; i++) p[i] = i;

      // mulberry32 — small deterministic PRNG so the field is fresh
      // per page load but reproducible within a session.
      let s = seed >>> 0;
      const rand = () => {
        s = (s + 0x6d2b79f5) >>> 0;
        let t = s;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
      this._rand = rand;

      for (let i = 255; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [p[i], p[j]] = [p[j], p[i]];
      }
      this.perm = new Uint8Array(512);
      for (let i = 0; i < 512; i++) this.perm[i] = p[i & 255];
    }
    static fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
    static lerp(t, a, b) { return a + t * (b - a); }
    static grad(hash, x, y) {
      const h = hash & 3;
      const u = h < 2 ? x : y;
      const v = h < 2 ? y : x;
      return ((h & 1) ? -u : u) + ((h & 2) ? -2 * v : 2 * v);
    }
    noise(x, y) {
      const X = Math.floor(x) & 255;
      const Y = Math.floor(y) & 255;
      x -= Math.floor(x);
      y -= Math.floor(y);
      const u = Perlin.fade(x);
      const v = Perlin.fade(y);
      const perm = this.perm;
      const aa = perm[X + perm[Y]];
      const ab = perm[X + perm[Y + 1]];
      const ba = perm[X + 1 + perm[Y]];
      const bb = perm[X + 1 + perm[Y + 1]];
      const x1 = Perlin.lerp(u, Perlin.grad(aa, x, y), Perlin.grad(ba, x - 1, y));
      const x2 = Perlin.lerp(u, Perlin.grad(ab, x, y - 1), Perlin.grad(bb, x - 1, y - 1));
      return Perlin.lerp(v, x1, x2); // ~[-1, 1]
    }
  }

  const seed = Math.floor(Math.random() * 1e6);
  const perlin = new Perlin(seed);
  if (seedLabel) seedLabel.textContent = `SEED_${String(seed).padStart(6, '0')}`;

  /* ---- Color: read the live --accent custom property ---- */
  function hexToRgb(hex) {
    const m = hex.trim().replace('#', '');
    const bigint = parseInt(m, 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
  }
  const accentHex = getComputedStyle(document.documentElement).getPropertyValue('--accent') || '#B24BFF';
  const [ar, ag, ab] = hexToRgb(accentHex);

  /* ---- Tunables ---- */
  const NOISE_SCALE = 0.0018;
  const NOISE_WEIGHT = 0.55;    // how much organic drift vs. clean orbiting
  const SEED_SPACING = 76;      // panel is narrower now — wider spacing keeps it sparse
  const STEP_LENGTH = 6.5;
  const MAX_STEPS = 220;        // longer strokes so spirals have room to wind
  const LINE_WIDTH_MIN = 1.6;
  const LINE_WIDTH_MAX = 3.2;
  const OPACITY_BASE = 0.09;
  const OPACITY_VARIANCE = 0.2;
  const DRIFT_SPEED = 0.00035;
  const TARGET_FPS = 24;

  let width = 0, height = 0, dpr = 1;
  let seedPoints = [];
  let attractors = [];
  let time = 0;

  function buildAttractors() {
    // 2–3 attractor/repeller points placed within the panel, in normalized
    // (0–1) coordinates so they scale with resize. Mixed signs give the
    // field a push-pull character instead of everything spiraling one way.
    const count = 3;
    attractors = [];
    for (let i = 0; i < count; i++) {
      attractors.push({
        nx: 0.25 + perlin._rand() * 0.6,
        ny: 0.15 + perlin._rand() * 0.7,
        sign: i === 1 ? -1 : 1,
        strength: 1.4 + perlin._rand() * 0.8,
        radiusFactor: 0.32 + perlin._rand() * 0.16, // fraction of min(width,height)
      });
    }
  }

  function buildSeedPoints() {
    seedPoints = [];
    const cols = Math.ceil(width / SEED_SPACING);
    const rows = Math.ceil(height / SEED_SPACING);
    for (let i = 0; i <= cols; i++) {
      for (let j = 0; j <= rows; j++) {
        seedPoints.push([
          i * SEED_SPACING + (Math.random() - 0.5) * SEED_SPACING * 0.5,
          j * SEED_SPACING + (Math.random() - 0.5) * SEED_SPACING * 0.5,
        ]);
      }
    }
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const rect = canvas.getBoundingClientRect();
    width = Math.max(1, Math.round(rect.width));
    height = Math.max(1, Math.round(rect.height));
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildAttractors();
    buildSeedPoints();
  }

  function fieldAngle(x, y) {
    const noiseAngle = perlin.noise(x * NOISE_SCALE + time, y * NOISE_SCALE) * Math.PI * 2.2;
    let vx = Math.cos(noiseAngle) * NOISE_WEIGHT;
    let vy = Math.sin(noiseAngle) * NOISE_WEIGHT;

    const minDim = Math.min(width, height);
    for (let i = 0; i < attractors.length; i++) {
      const a = attractors[i];
      const ax = a.nx * width;
      const ay = a.ny * height;
      const radius = a.radiusFactor * minDim * 2.2;
      const dx = x - ax;
      const dy = y - ay;
      const dist = Math.hypot(dx, dy) + 1;
      if (dist > radius) continue;
      const falloff = Math.pow(1 - Math.min(dist / radius, 1), 1.5);
      const influence = a.strength * falloff;
      const pointAngle = Math.atan2(dy, dx);
      const tangentAngle = pointAngle + a.sign * (Math.PI / 2);
      vx += Math.cos(tangentAngle) * influence;
      vy += Math.sin(tangentAngle) * influence;
    }
    return Math.atan2(vy, vx);
  }

  function drawField() {
    ctx.clearRect(0, 0, width, height);

    seedPoints.forEach(([sx, sy], idx) => {
      let x = sx;
      let y = sy;
      const opacity = OPACITY_BASE + (idx % 5) * (OPACITY_VARIANCE / 5);
      const lineWidth = LINE_WIDTH_MIN + (idx % 3) * ((LINE_WIDTH_MAX - LINE_WIDTH_MIN) / 2);

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.strokeStyle = `rgba(${ar}, ${ag}, ${ab}, ${opacity.toFixed(3)})`;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      for (let step = 0; step < MAX_STEPS; step++) {
        const angle = fieldAngle(x, y);
        const nx = x + Math.cos(angle) * STEP_LENGTH;
        const ny = y + Math.sin(angle) * STEP_LENGTH;
        if (nx < -60 || nx > width + 60 || ny < -60 || ny > height + 60) break;
        ctx.lineTo(nx, ny);
        x = nx;
        y = ny;
      }
      ctx.stroke();
    });
  }

  let rafId = null;
  let lastFrameTime = 0;
  const frameInterval = 1000 / TARGET_FPS;

  function tick(now) {
    rafId = requestAnimationFrame(tick);
    if (now - lastFrameTime < frameInterval) return;
    lastFrameTime = now;
    time += DRIFT_SPEED;
    drawField();
  }

  function start() {
    if (getComputedStyle(canvas).display === 'none') return; // hidden below 900px
    resize();
    if (reduceMotion) {
      drawField();
    } else {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(tick);
    }
  }

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (getComputedStyle(canvas).display === 'none') {
        if (rafId) cancelAnimationFrame(rafId);
        return;
      }
      resize();
      if (reduceMotion) drawField();
      else if (!rafId) rafId = requestAnimationFrame(tick);
    }, 150);
  });

  start();
})();
