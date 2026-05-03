(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Cursor glow ---------- */
  const glow = document.querySelector('.cursor-glow');
  if (glow && !prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
    let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
    let initialized = false, rafScheduled = false;

    function render() {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      glow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      const dx = Math.abs(targetX - currentX);
      const dy = Math.abs(targetY - currentY);
      if (dx > 0.5 || dy > 0.5) {
        rafScheduled = true;
        requestAnimationFrame(render);
      } else {
        rafScheduled = false;
      }
    }

    document.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!initialized) {
        currentX = targetX;
        currentY = targetY;
        glow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
        glow.classList.add('active');
        initialized = true;
      }
      if (!rafScheduled) {
        rafScheduled = true;
        requestAnimationFrame(render);
      }
    }, { passive: true });

    document.addEventListener('mouseleave', () => glow.classList.remove('active'));
    document.addEventListener('mouseenter', () => { if (initialized) glow.classList.add('active'); });
  }

  /* ---------- Sticky header state ---------- */
  const header = document.querySelector('.site-header');
  if (header) {
    let scrolled = false;
    function onScroll() {
      const next = window.scrollY > 12;
      if (next !== scrolled) {
        scrolled = next;
        header.classList.toggle('scrolled', scrolled);
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Reveal on scroll ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          // tiny stagger so items in the same section feel orchestrated
          setTimeout(() => e.target.classList.add('visible'), i * 60);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('visible'));
  }

  /* ---------- Tagline rotator (typewriter) ---------- */
  const rotatorEl = document.querySelector('.rotator');
  const rotatorText = document.querySelector('.rotator-text');
  if (rotatorEl && rotatorText && !prefersReducedMotion) {
    const words = (rotatorEl.dataset.words || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (words.length > 1) {
      let i = 0;
      let charIndex = words[0].length;
      let deleting = false;

      function tick() {
        const word = words[i];
        if (deleting) {
          charIndex--;
          rotatorText.textContent = word.slice(0, charIndex);
          if (charIndex === 0) {
            deleting = false;
            i = (i + 1) % words.length;
            setTimeout(tick, 220);
            return;
          }
          setTimeout(tick, 38);
        } else {
          charIndex++;
          rotatorText.textContent = words[i].slice(0, charIndex);
          if (charIndex === words[i].length) {
            deleting = true;
            setTimeout(tick, 2200);
            return;
          }
          setTimeout(tick, 70 + Math.random() * 60);
        }
      }

      setTimeout(() => { deleting = true; tick(); }, 2400);
    }
  }

  /* ---------- Year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
