/* ══════════════════════════════════════════════════════════════
   BACKGROUND — refined ASCII dot grid
   ─────────────────────────────────────────────────────────────
   Guiding principle: barely there.
   The grid is always visible but never distracting.

   - Only two characters: · and a rarer ◦
     (fewer chars = calmer, more uniform texture)
   - Very low base opacity, gentle mouse glow only
   - Mouse influence: wide, soft, low-ceiling
   - No ripples, no flashing, no size changes
   - Slow character cycling — feels still
   ══════════════════════════════════════════════════════════════ */

(function () {
  const canvas = document.getElementById('ascii-canvas');
  const ctx    = canvas.getContext('2d');

  // Only two glyphs — mostly dots, occasionally a slightly heavier one
  const GLYPHS = ['·', '·', '·', '·', '·', '◦'];
  const CELL   = 32;   // generous spacing keeps it sparse and airy

  let cols, rows, grid;
  const mouse = { x: -9999, y: -9999 };

  /* ── init ── */
  function init() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.ceil(canvas.width  / CELL) + 1;
    rows = Math.ceil(canvas.height / CELL) + 1;

    grid = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({
        char:    '·',
        age:     Math.random() * 600,
        // very slow, randomised — each cell feels independent
        period:  500 + Math.random() * 800,
      }))
    );
  }

  /* ── input — only mouse position, no click handler ── */
  document.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  document.addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
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

    const rgb = baseRGB();
    ctx.font         = "300 10px 'DM Mono', monospace";
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cell = grid[r][c];
        const cx   = c * CELL;
        const cy   = r * CELL;

        // age cell — swap glyph when it completes its period
        cell.age++;
        if (cell.age >= cell.period) {
          cell.char   = GLYPHS[Math.random() * GLYPHS.length | 0];
          cell.age    = 0;
          cell.period = 500 + Math.random() * 800;
        }

        // smooth mouse proximity — wide radius (300px), very low ceiling
        const dx   = cx - mouse.x;
        const dy   = cy - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const prox = Math.max(0, 1 - dist / 300);

        // base opacity deliberately low; hover adds a calm lift
        const op = 0.085 + prox * prox * 0.68;

        ctx.fillStyle = `rgba(${rgb},${op})`;
        ctx.fillText(cell.char, cx, cy);
      }
    }
  }

  window.addEventListener('resize', init);
  init();
  draw();
})();
