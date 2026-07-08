/* ============================================================
   Ghanem Mobile — main.js
   WhatsApp integration, nav behavior, scroll reveal, counters
   ============================================================ */

/**
 * WHATSAPP NUMBER — change this one value to update every
 * WhatsApp button/link on the page.
 * International format, digits only (no +, no spaces).
 */
const WHATSAPP_NUMBER = '972597774407';

/* ---------- WhatsApp links ----------
   Any element with [data-wa-message] becomes a WhatsApp link
   with its own pre-filled message. */
document.querySelectorAll('[data-wa-message]').forEach((el) => {
  const message = encodeURIComponent(el.dataset.waMessage);
  el.setAttribute('href', `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`);
  el.setAttribute('target', '_blank');
  el.setAttribute('rel', 'noopener noreferrer');
});

/* ---------- Navbar: solid background after scroll ---------- */
const navbar = document.getElementById('navbar');

const onScroll = () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
};

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- Mobile menu ---------- */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ---------- Scroll reveal animations ---------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

/* ---------- Animated counters (hero stats) ---------- */
const animateCounter = (el) => {
  const target = Number(el.dataset.counter);
  const duration = 1600;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    // easeOutCubic for a natural slowdown at the end
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased).toLocaleString('en-US');
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);

document.querySelectorAll('[data-counter]').forEach((el) => counterObserver.observe(el));

/* ---------- Active nav link highlighting ---------- */
const sections = document.querySelectorAll('section[id]');
const menuLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        menuLinks.forEach((link) => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${entry.target.id}`
          );
        });
      }
    });
  },
  { rootMargin: '-45% 0px -50% 0px' }
);

sections.forEach((section) => sectionObserver.observe(section));

/* ---------- Footer year ---------- */
document.getElementById('year').textContent = new Date().getFullYear();
