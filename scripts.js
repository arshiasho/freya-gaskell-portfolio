(function() {
  /* ── Scroll restoration — snap to hash on load ── */
  history.scrollRestoration = 'manual';
  window.addEventListener('load', function() {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) el.scrollIntoView({ behavior: 'instant' });
    }
  });

  /* ── Reveal on scroll ── */
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => observer.observe(el));

  /* ── Sticky nav show/hide ── */
  const stickyNav = document.getElementById('stickyNav');
  if (stickyNav) {
    const heroSection = document.getElementById('hero');
    function updateStickyNav() {
      if (heroSection) {
        stickyNav.classList.toggle('visible', heroSection.getBoundingClientRect().bottom <= 60);
      } else {
        stickyNav.classList.toggle('visible', window.scrollY > 200);
      }
    }
    window.addEventListener('scroll', updateStickyNav, { passive: true });
    updateStickyNav();
  }

  /* ── Back to top ── */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > window.innerHeight);
    }, { passive: true });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Lightbox ── */
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');

    function openLightbox(src, alt) {
      lightboxImg.src = src;
      lightboxImg.alt = alt || '';
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    document.querySelectorAll('[data-zoom]').forEach(el => {
      el.addEventListener('click', () => {
        const src = el.getAttribute('data-zoom');
        const img = el.querySelector('img');
        openLightbox(src, img ? img.alt : '');
      });
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target === lightboxImg) closeLightbox();
    });
    lightboxClose.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
    });
  }
})();
