/* ═══════════════════════════════════════════════════════
   OMNET REVIEW CAROUSEL ENGINE
   Converts flat review grids into paginated carousels.
   Auto-detects review blocks, wraps them, adds controls.
═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  function buildCarousel(container) {
    // Get all direct review children (cards with inline styles or .review-card)
    const cards = Array.from(container.children);
    if (cards.length < 2) return;

    // Wrap in carousel structure
    const wrap  = document.createElement('div');
    wrap.className = 'review-carousel-wrap';

    const track = document.createElement('div');
    track.className = 'review-carousel-track';

    cards.forEach(card => {
      const slide = document.createElement('div');
      slide.className = 'review-carousel-slide';
      // Apply review-card class for consistent styling
      if (!card.classList.contains('review-card')) {
        card.classList.add('review-card');
      }
      slide.appendChild(card);
      track.appendChild(slide);
    });

    wrap.appendChild(track);
    container.appendChild(wrap);

    // Controls
    const controls = document.createElement('div');
    controls.className = 'carousel-controls';

    const prevBtn = document.createElement('button');
    prevBtn.className = 'carousel-btn carousel-prev';
    prevBtn.innerHTML = '<i class="ri-arrow-left-line"></i>';
    prevBtn.setAttribute('aria-label', 'Previous reviews');

    const dots = document.createElement('div');
    dots.className = 'carousel-dots';

    const nextBtn = document.createElement('button');
    nextBtn.className = 'carousel-btn carousel-next';
    nextBtn.innerHTML = '<i class="ri-arrow-right-line"></i>';
    nextBtn.setAttribute('aria-label', 'Next reviews');

    controls.appendChild(prevBtn);
    controls.appendChild(dots);
    controls.appendChild(nextBtn);
    container.appendChild(controls);

    // State
    let current = 0;
    let perPage = getPerPage();
    const total = cards.length;

    function getPerPage() {
      const w = window.innerWidth;
      if (w < 640) return 1;
      if (w < 1024) return 2;
      return 3;
    }

    function pages() { return Math.ceil(total / perPage); }

    function buildDots() {
      dots.innerHTML = '';
      for (let i = 0; i < pages(); i++) {
        const d = document.createElement('button');
        d.className = 'carousel-dot' + (i === current ? ' active' : '');
        d.setAttribute('aria-label', `Page ${i + 1}`);
        d.addEventListener('click', () => goTo(i));
        dots.appendChild(d);
      }
    }

    function goTo(page) {
      current = Math.max(0, Math.min(page, pages() - 1));
      const slideW = track.children[0]?.offsetWidth + 32 || 0; // +gap(2rem=32px)
      track.style.transform = `translateX(-${current * perPage * slideW}px)`;

      // Update dots
      dots.querySelectorAll('.carousel-dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });
      prevBtn.disabled = current === 0;
      nextBtn.disabled = current >= pages() - 1;
    }

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));

    // Touch/swipe
    let startX = 0;
    wrap.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    wrap.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) goTo(current + (diff > 0 ? 1 : -1));
    });

    // Responsive rebuild
    window.addEventListener('resize', () => {
      const newPer = getPerPage();
      if (newPer !== perPage) {
        perPage = newPer;
        current = 0;
        buildDots();
        goTo(0);
      }
    });

    buildDots();
    goTo(0);
  }

  /* ── Auto-detect review grids and convert them ── */
  function initCarousels() {
    // Find all grid containers that hold review/testimonial cards
    const candidates = document.querySelectorAll(
      '[style*="grid"][style*="auto-fit"], .review-grid, .testimonial-grid, .reviews-grid'
    );

    candidates.forEach(el => {
      // Only carouselize if it has 3+ children that look like review cards
      const children = Array.from(el.children);
      const hasReviews = children.some(c =>
        c.querySelector('[class*="star"], .ri-star-fill, [style*="star"]') ||
        c.textContent.includes('★') ||
        c.querySelector('p[style*="italic"]') ||
        c.querySelector('.ri-star-fill')
      );
      if (hasReviews && children.length >= 3) {
        el.classList.add('review-carousel-converted');
        buildCarousel(el);
      }
    });

    // Also target explicit review sections by class
    document.querySelectorAll('.reviews-section .grid, .testimonial-section .grid').forEach(grid => {
      if (grid.children.length >= 3) buildCarousel(grid);
    });
  }

  /* ── Generic paginated carousel for any .carousel-init element ── */
  window.initCarousel = function(wrap, opts = {}) {
    const track = wrap.querySelector('.review-carousel-track');
    if (!track) return;
    buildCarousel(wrap, opts);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousels);
  } else {
    initCarousels();
  }
})();
