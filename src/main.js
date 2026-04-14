/**
 * Hinton Construction Ltd — Main JS
 * Handles: nav, scroll animations, counters, parallax, lightbox, form, map
 */

'use strict';

/* ─── State ──────────────────────────────────────────────────── */
let countersRun = false;
let lightboxImages = [];
let lightboxIndex = 0;

/* ─── DOM refs ───────────────────────────────────────────────── */
const nav       = document.getElementById('mainNav');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
const overlay   = document.getElementById('mobileOverlay');
const lightbox  = document.getElementById('lightbox');
const lbImg     = document.getElementById('lightboxImg');
const lbCaption = document.getElementById('lightboxCaption');
const lbClose   = document.getElementById('lightboxClose');
const lbPrev    = document.getElementById('lightboxPrev');
const lbNext    = document.getElementById('lightboxNext');
const lbBg      = document.getElementById('lightboxBackdrop');
const heroBg    = document.querySelector('.hero-bg');

/* ══════════════════════════════════════════════════════════════
   NAVIGATION
══════════════════════════════════════════════════════════════ */
function initNav() {
  // Scroll: add .scrolled class when page scrolls
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Hamburger toggle
  hamburger.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMenu);

  // Close on nav link click (mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Keyboard: close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = nav.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

function toggleMenu() {
  const isOpen = navLinks.classList.toggle('is-open');
  hamburger.classList.toggle('is-active', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  overlay.classList.toggle('is-active', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeMenu() {
  navLinks.classList.remove('is-open');
  hamburger.classList.remove('is-active');
  hamburger.setAttribute('aria-expanded', 'false');
  overlay.classList.remove('is-active');
  document.body.style.overflow = '';
}

/* ══════════════════════════════════════════════════════════════
   PARALLAX
══════════════════════════════════════════════════════════════ */
function initParallax() {
  if (!heroBg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let ticking = false;

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const heroH = heroBg.parentElement.offsetHeight;
        if (scrollY < heroH) {
          const offset = scrollY * 0.35;
          heroBg.style.transform = `scale(1.04) translateY(${offset}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ══════════════════════════════════════════════════════════════
   INTERSECTION OBSERVER — Scroll animations
══════════════════════════════════════════════════════════════ */
function initScrollAnimations() {
  const items = document.querySelectorAll('.fade-in');
  if (!items.length) return;

  // Immediately show items already in view (above fold)
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  items.forEach(el => observer.observe(el));
}

/* ══════════════════════════════════════════════════════════════
   ANIMATED COUNTERS
══════════════════════════════════════════════════════════════ */
function initCounters() {
  const counterEls = document.querySelectorAll('[data-count]');
  if (!counterEls.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const runCounter = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = prefersReduced ? 0 : 1100;
    const startTime = performance.now();

    const ease = (t) => 1 - Math.pow(1 - t, 3); // cubic ease-out

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.round(ease(progress) * target);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersRun) {
          countersRun = true;
          counterEls.forEach(runCounter);
          observer.disconnect();
        }
      });
    },
    { threshold: 0.5 }
  );

  // Observe first counter
  if (counterEls[0]) observer.observe(counterEls[0]);
}

/* ══════════════════════════════════════════════════════════════
   GALLERY LIGHTBOX
══════════════════════════════════════════════════════════════ */
function initLightbox() {
  const galleryItems = document.querySelectorAll('.gi');
  if (!galleryItems.length || !lightbox) return;

  // Build images array from gallery
  lightboxImages = Array.from(galleryItems).map(gi => ({
    src:     gi.dataset.src,
    caption: gi.dataset.caption || '',
    alt:     gi.querySelector('img')?.alt || ''
  }));

  // Open lightbox on gallery item click
  galleryItems.forEach((gi, i) => {
    gi.addEventListener('click', () => openLightbox(i));
    gi.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(i);
      }
    });
  });

  // Controls
  lbClose?.addEventListener('click', closeLightbox);
  lbBg?.addEventListener('click', closeLightbox);
  lbPrev?.addEventListener('click', () => navigateLightbox(-1));
  lbNext?.addEventListener('click', () => navigateLightbox(1));

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (lightbox.hidden) return;
    switch (e.key) {
      case 'Escape':    closeLightbox(); break;
      case 'ArrowLeft': navigateLightbox(-1); break;
      case 'ArrowRight':navigateLightbox(1); break;
    }
  });
}

function openLightbox(index) {
  lightboxIndex = index;
  showLightboxImage(index);
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
  lbClose?.focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = '';
  // Return focus to the gallery item that was clicked
  document.querySelectorAll('.gi')[lightboxIndex]?.focus();
}

function navigateLightbox(direction) {
  lightboxIndex = (lightboxIndex + direction + lightboxImages.length) % lightboxImages.length;
  showLightboxImage(lightboxIndex);
}

function showLightboxImage(index) {
  const item = lightboxImages[index];
  if (!item || !lbImg) return;

  lbImg.style.opacity = '0';
  lbImg.style.transition = 'opacity 0.2s ease';

  lbImg.src = item.src;
  lbImg.alt = item.alt;

  lbImg.onload = () => {
    lbImg.style.opacity = '1';
  };

  if (lbCaption) lbCaption.textContent = item.caption;
}


/* ══════════════════════════════════════════════════════════════
   LEAFLET MAP
══════════════════════════════════════════════════════════════ */
function initMap() {
  const mapEl = document.getElementById('map');
  if (!mapEl || typeof L === 'undefined') return;

  // Christchurch, Canterbury, NZ
  const christchurch = [-43.5321, 172.6362];

  const map = L.map('map', {
    center: christchurch,
    zoom: 10,
    scrollWheelZoom: false,
    attributionControl: true
  });

  // CartoDB Voyager tiles (lightweight, beautiful)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);

  // Custom marker
  const icon = L.divIcon({
    className: '',
    html: `
      <div style="
        width:44px;height:44px;
        background:#2B7CC1;
        border:3px solid #fff;
        border-radius:50% 50% 50% 0;
        transform:rotate(-45deg);
        box-shadow:0 4px 12px rgba(43,124,193,0.5);
      "></div>
    `,
    iconSize: [44, 44],
    iconAnchor: [22, 44],
    popupAnchor: [0, -48]
  });

  L.marker(christchurch, { icon })
    .addTo(map)
    .bindPopup(`
      <div style="font-family:'Poppins',sans-serif;padding:4px 2px">
        <strong style="font-size:0.875rem;color:#0d1117">Hinton Construction Ltd</strong><br>
        <span style="font-size:0.75rem;color:#64748b">Christchurch / Canterbury, NZ</span><br>
        <a href="mailto:hintonconstruct@gmail.com" style="font-size:0.75rem;color:#2B7CC1">hintonconstruct@gmail.com</a>
      </div>
    `, { maxWidth: 220 })
    .openPopup();
}

/* ══════════════════════════════════════════════════════════════
   ACTIVE NAV LINK (highlight on scroll)
══════════════════════════════════════════════════════════════ */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id], div[id="home"]');
  const navAs = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !navAs.length) return;

  const setActive = () => {
    const scrollY = window.scrollY + nav.offsetHeight + 80;
    let current = '';

    sections.forEach(sec => {
      if (sec.offsetTop <= scrollY) current = sec.id;
    });

    navAs.forEach(a => {
      a.classList.toggle('is-active', a.getAttribute('href') === `#${current}`);
    });
  };

  window.addEventListener('scroll', setActive, { passive: true });
  setActive();
}

/* ══════════════════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initParallax();
  initScrollAnimations();
  initCounters();
  initLightbox();

  initActiveNav();

  // Map initializes after Leaflet loads
  if (typeof L !== 'undefined') {
    initMap();
  } else {
    // Wait for leaflet script (loaded sync but just in case)
    window.addEventListener('load', initMap);
  }
});
