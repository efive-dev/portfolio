/* ══════════════════════════════════════════════════════════════
   BACKGROUND — refined ASCII dot grid
   ─────────────────────────────────────────────────────────────
   Guiding principle: barely there.
   The grid is always visible but never distracting.

   - Only two characters: · and a rarer ◦
     (fewer chars = calmer, more uniform texture)
   - Very low base opacity, gentle mouse glow only
   - Mouse influence: wide, soft, low-ceiling
   - Click ripple: expanding ring that briefly excites cells
   - Slow character cycling — feels still
   ══════════════════════════════════════════════════════════════ */

(function () {
  const canvas = document.getElementById('ascii-canvas');
  const ctx    = canvas.getContext('2d');

  // Only two glyphs — mostly dots, occasionally a slightly heavier one
  const GLYPHS        = ['·', '·', '·', '·', '·', '◦'];
  // Glyphs briefly shown on cells hit by a ripple
  const RIPPLE_GLYPHS = ['+', '×', '◦', '✕', '+'];
  const CELL          = 32;

  let cols, rows, grid;
  const mouse   = { x: -9999, y: -9999 };
  const ripples = [];   // active ripple objects

  /* ── init ── */
  function init() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.ceil(canvas.width  / CELL) + 1;
    rows = Math.ceil(canvas.height / CELL) + 1;

    grid = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({
        char:       '·',
        age:        Math.random() * 600,
        period:     500 + Math.random() * 800,
        rippleChar: null,   // override glyph while ripple is active
        rippleAge:  0,      // counts down from RIPPLE_HOLD to 0
      }))
    );
  }

  /* ── input ── */
  document.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  document.addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  // Click → spawn a ripple
  document.addEventListener('click', e => {
    ripples.push({
      x:        e.clientX,
      y:        e.clientY,
      radius:   0,
      speed:    6,          // px per frame — how fast the ring expands
      maxR:     Math.max(canvas.width, canvas.height) * 0.6,
      thickness: 48,        // ring thickness in px
      dead:     false,
    });
  });

  /* ── theme colour ── */
  function baseRGB() {
    const th = document.documentElement.getAttribute('data-theme') || 'dark';
    if (th === 'light') return '30,30,30';
    if (th === 'amber') return '160,80,0';
    return '200,210,190';
  }

  /* ── draw ── */
  function draw() {
    requestAnimationFrame(draw);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Advance ripples
    for (const rip of ripples) {
      rip.radius += rip.speed;
      if (rip.radius > rip.maxR) rip.dead = true;
    }
    // Prune dead ripples
    for (let i = ripples.length - 1; i >= 0; i--) {
      if (ripples[i].dead) ripples.splice(i, 1);
    }

    const RIPPLE_HOLD = 18;   // frames a cell stays "excited" after ring passes

    const rgb = baseRGB();
    ctx.font         = "300 10px 'DM Mono', monospace";
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cell = grid[r][c];
        const cx   = c * CELL;
        const cy   = r * CELL;

        // ── normal glyph cycling ──
        cell.age++;
        if (cell.age >= cell.period) {
          cell.char   = GLYPHS[Math.random() * GLYPHS.length | 0];
          cell.age    = 0;
          cell.period = 500 + Math.random() * 800;
        }

        // ── check each active ripple ──
        let rippleBoost = 0;
        for (const rip of ripples) {
          const dx   = cx - rip.x;
          const dy   = cy - rip.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const inner = rip.radius - rip.thickness;
          const outer = rip.radius;

          if (dist >= inner && dist <= outer) {
            // Cell is inside the ring right now — excite it
            const t = 1 - (dist - inner) / rip.thickness; // 0..1 within ring
            rippleBoost = Math.max(rippleBoost, t);

            if (cell.rippleAge === 0) {
              // stamp a ripple glyph the first frame the ring hits
              cell.rippleChar = RIPPLE_GLYPHS[Math.random() * RIPPLE_GLYPHS.length | 0];
              cell.rippleAge  = RIPPLE_HOLD;
            }
          }
        }

        // ── decay ripple glyph ──
        let extraOp  = 0;
        let useChar  = cell.char;
        if (cell.rippleAge > 0) {
          cell.rippleAge--;
          const fade  = cell.rippleAge / RIPPLE_HOLD;   // 1 → 0
          extraOp     = fade * 0.75;
          useChar     = cell.rippleChar;
          if (cell.rippleAge === 0) cell.rippleChar = null;
        }
        extraOp = Math.max(extraOp, rippleBoost * 0.75);

        // ── mouse proximity glow ──
        const mdx  = cx - mouse.x;
        const mdy  = cy - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        const prox  = Math.max(0, 1 - mdist / 300);

        // base opacity + hover lift + ripple boost
        const op = 0.18 + prox * prox * 0.55 + extraOp;

        ctx.fillStyle = `rgba(${rgb},${Math.min(op, 1)})`;
        ctx.fillText(useChar, cx, cy);
      }
    }
  }

  window.addEventListener('resize', init);
  init();
  draw();
})();