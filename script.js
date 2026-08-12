const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const filters = [...document.querySelectorAll('[data-filter]')];
const projectCards = [...document.querySelectorAll('[data-category]')];
const signals = [
  'AUDIO + POSE + RACKET',
  'HARDWARE + AGENT FEEDBACK',
  'IK + INVERSE DYNAMICS',
  'BUILD + TEST + SHARE',
];

document.querySelector('[data-year]').textContent = new Date().getFullYear();

navToggle?.addEventListener('click', () => {
  const open = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!open));
  header.classList.toggle('nav-open', !open);
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navToggle?.setAttribute('aria-expanded', 'false');
    header.classList.remove('nav-open');
  });
});

filters.forEach((button) => {
  button.addEventListener('click', () => {
    filters.forEach((candidate) => candidate.classList.remove('is-active'));
    button.classList.add('is-active');
    const filter = button.dataset.filter;

    projectCards.forEach((card) => {
      const visible = filter === 'all' || card.dataset.category === filter;
      card.hidden = !visible;
    });
  });
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('[data-reveal]');

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 },
  );
  revealItems.forEach((item) => revealObserver.observe(item));
}

const sections = [...document.querySelectorAll('main section[id]')];
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle('is-current', link.getAttribute('href') === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: '-35% 0px -55%', threshold: 0 },
  );
  sections.forEach((section) => sectionObserver.observe(section));
}

const signalOutput = document.querySelector('[data-signal]');
if (signalOutput && !reduceMotion) {
  let signalIndex = 0;
  window.setInterval(() => {
    signalIndex = (signalIndex + 1) % signals.length;
    signalOutput.classList.add('is-switching');
    window.setTimeout(() => {
      signalOutput.textContent = signals[signalIndex];
      signalOutput.classList.remove('is-switching');
    }, 180);
  }, 2800);
}

window.addEventListener(
  'scroll',
  () => header.classList.toggle('is-scrolled', window.scrollY > 12),
  { passive: true },
);
