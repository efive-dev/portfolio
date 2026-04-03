/* ══════════════════════════════════════════════════════════════
   ICONS — dynamic SVG sprite loader
   ══════════════════════════════════════════════════════════════

   Reads icons/_index.json for the list of icon names, then
   fetches each icons/<name>.svg, strips the outer <svg> wrapper,
   and injects it as a <symbol id="icon-<name>"> into #icon-sprite.

   To add a new icon:
     1. Create  icons/mytech.svg  (standard SVG with viewBox)
     2. Add     "mytech"  to  icons/_index.json
     3. Use in HTML:
           <span class="tech-chip" data-tech="mytech">
             <svg class="tech-icon"><use href="#icon-mytech"/></svg>Label
           </span>
     4. Add accent colour in css/pages.css under "per-tech accent colours"
   ══════════════════════════════════════════════════════════════ */

(async function loadIcons() {
  const sprite = document.getElementById('icon-sprite');
  if (!sprite) return;

  let names = [];
  try {
    const res = await fetch('icons/_index.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    names = await res.json();
  } catch (err) {
    console.warn('[Icons] could not load manifest:', err);
    return;
  }

  const parser = new DOMParser();

  await Promise.all(names.map(async name => {
    try {
      const res  = await fetch(`icons/${name}.svg`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();

      const doc   = parser.parseFromString(text, 'image/svg+xml');
      const svgEl = doc.querySelector('svg');
      if (!svgEl) throw new Error('no <svg> element found');

      const symbol = document.createElementNS('http://www.w3.org/2000/svg', 'symbol');
      symbol.setAttribute('id', `icon-${name}`);
      symbol.setAttribute('viewBox', svgEl.getAttribute('viewBox') || '0 0 16 16');
      // Copy all child nodes (paths, lines, etc.) into the symbol
      svgEl.childNodes.forEach(node => symbol.appendChild(node.cloneNode(true)));

      sprite.appendChild(symbol);
    } catch (err) {
      console.warn(`[Icons] failed to load icon "${name}":`, err);
    }
  }));
})();
