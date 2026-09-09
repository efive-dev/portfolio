document.addEventListener('DOMContentLoaded', () => {
  /* Mobile nav toggle */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = !links.classList.contains('open');
      links.classList.toggle('open', isOpen);
      links.style.display = isOpen ? 'flex' : '';
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.documentElement.classList.toggle('nav-open', isOpen);
    });
    links.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        links.classList.remove('open');
        links.style.display = '';
        toggle.setAttribute('aria-expanded', 'false');
        document.documentElement.classList.remove('nav-open');
      })
    );
  }

  /* Duplicate marquee content once for seamless looping */
  document.querySelectorAll('.marquee-content').forEach((track) => {
    if (track.dataset.doubled) return;
    track.insertAdjacentHTML('beforeend', track.innerHTML);
    track.dataset.doubled = 'true';
  });

  /* Highlight active section link on index page */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => {
              link.classList.toggle(
                'active',
                link.getAttribute('href') === `#${entry.target.id}`
              );
            });
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
  }

  /* Contact form: static-site friendly fallback via mailto */
  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      const subject = encodeURIComponent(`Portfolio contact from ${name || 'website visitor'}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:hello@example.com?subject=${subject}&body=${body}`;
    });
  }
});
