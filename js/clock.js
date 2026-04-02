/* ══════════════════════════════════════════════════════════════
   CLOCK — status bar real-time clock
   ══════════════════════════════════════════════════════════════ */

function updateClock() {
  const el = document.getElementById('status-right');
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleTimeString('en-GB', {
    hour:   '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

updateClock();
setInterval(updateClock, 1000);
