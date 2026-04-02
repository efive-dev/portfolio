/* ══════════════════════════════════════════════════════════════
   BACKGROUND — animated ASCII dot-grid
   • Mouse proximity brightens nearby cells
   • Click spawns an outward ripple wave
   ══════════════════════════════════════════════════════════════ */

(function () {
  const canvas = document.getElementById('ascii-canvas');
  const ctx    = canvas.getContext('2d');

  const CHARS = ['·', '+', '×', '∙', '•', '◦'];
  const CELL  = 10;   // grid cell size in px

  let cols, rows, grid;
  let mouse   = { x: -999, y: -999 };
  let ripples = [];   // { x, y, born, maxR }

  /* ── init / resize ── */
  function init() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.ceil(canvas.width  / CELL) + 1;
    rows = Math.ceil(canvas.height / CELL) + 1;

    grid = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({
        char:  CHARS[Math.random() * CHARS.length | 0],
        age:   Math.random() * 200,
        speed: 0.28 + Math.random() * 0.45,
      }))
    );
  }

  /* ── input listeners ── */
  document.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  document.addEventListener('touchmove', e => {
    if (e.touches.length > 0) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }
  }, { passive: true });

  document.addEventListener('click', e => {
    ripples.push({ x: e.clientX, y: e.clientY, born: Date.now(), maxR: 320 });
  });

  /* ── draw loop ── */
  function draw() {
    requestAnimationFrame(draw);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const theme     = document.documentElement.getAttribute('data-theme') || 'dark';
    const baseColor = theme === 'light'
      ? '0,0,0'
      : theme === 'amber'
      ? '180,100,0'
      : '200,200,200';

    ctx.font         = "300 11px 'DM Mono', monospace";
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';

    const now = Date.now();

    // cull dead ripples
    ripples = ripples.filter(rp => (now - rp.born) * 0.35 < rp.maxR + 60);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cell = grid[r][c];

        // age & occasionally shuffle character
        cell.age += cell.speed;
        if (cell.age > 120 + Math.random() * 180) {
          cell.char = CHARS[Math.random() * CHARS.length | 0];
          cell.age  = 0;
        }

        const cx = c * CELL;
        const cy = r * CELL;

        /* mouse proximity ── */
        const mdx  = cx - mouse.x;
        const mdy  = cy - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        const mouseFactor = Math.max(0, 1 - mDist / 160);

        /* ripple influence ── */
        let rippleFactor = 0;
        for (const rp of ripples) {
          const age  = now - rp.born;
          const fr   = age * 0.35;          // ripple front radius
          const rdx  = cx - rp.x;
          const rdy  = cy - rp.y;
          const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
          const wave = Math.abs(rdist - fr);
          if (wave < 32) {
            const falloff = Math.max(0, 1 - fr / rp.maxR);
            rippleFactor  = Math.max(rippleFactor, (1 - wave / 32) * falloff);
          }
        }

        const op = 0.05 + mouseFactor * 0.36 + rippleFactor * 0.55;

        ctx.fillStyle = `rgba(${baseColor},${op})`;
        ctx.fillText(cell.char, cx, cy);
      }
    }
  }

  window.addEventListener('resize', init);
  init();
  draw();
})();
