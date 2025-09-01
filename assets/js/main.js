// main.js - theme toggle + scroll animations + skill progress
(function () {
  // Helpers
  var doc = document.documentElement;
  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  var stored = localStorage.getItem('theme');

  function applyTheme(theme) {
    doc.setAttribute('data-theme', theme);
    var btn = document.getElementById('theme-toggle');
    if (btn) btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
  }

  // Initialize theme
  var initial = stored || (prefersDark ? 'dark' : 'light');
  applyTheme(initial);

  // Toggle button
  var tbtn = document.getElementById('theme-toggle');
  if (tbtn) {
    tbtn.addEventListener('click', function () {
      var current = doc.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      var next = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      applyTheme(next);
      // subtle bounce
      tbtn.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-6px)' }, { transform: 'translateY(0)' }], { duration: 380, easing: 'cubic-bezier(.2,.9,.3,1)' });
    });
  }

  // IntersectionObserver for reveal-on-scroll
  var motionAllowed = !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  if (motionAllowed && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Reveal children cards
          var el = entry.target;
          var children = el.querySelectorAll('.skill-card, .timeline-item, .edu-card, .yt-channel');
          children.forEach(function (c, i) {
            setTimeout(function () {
              c.classList.add('revealed');
              // trigger progress animation if skill-ring
              var ring = c.querySelector('.skill-ring');
              if (ring) animateSkillRing(ring);
            }, i * 90);
          });
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal-on-scroll').forEach(function (el) { io.observe(el); });
  } else {
    // No motion: reveal immediately
    document.querySelectorAll('.reveal-on-scroll .skill-card, .reveal-on-scroll .timeline-item, .reveal-on-scroll .edu-card, .reveal-on-scroll .yt-channel')
      .forEach(function (c) { c.classList.add('revealed'); });
  }

  // Animate skill ring (simple numeric fill)
  function animateSkillRing(el) {
    if (!el || el.dataset._animated) return;
    var target = parseInt(el.getAttribute('data-progress') || '80', 10);
    var start = 0;
    var duration = 900;
    var startTime = null;
    function step(ts) {
      if (!startTime) startTime = ts;
      var t = Math.min(1, (ts - startTime) / duration);
      var current = Math.round(start + (target - start) * easeOutCubic(t));
      el.textContent = current + '%';
      el.style.background = `conic-gradient(var(--accent) ${current * 3.6}deg, rgba(0,0,0,0.04) ${current * 3.6}deg)`;
      if (t < 1) requestAnimationFrame(step);
      else el.dataset._animated = '1';
    }
    requestAnimationFrame(step);
  }

  function easeOutCubic(x) { return 1 - Math.pow(1 - x, 3); }

  // Attach small hover micro-interactions
  document.addEventListener('mouseover', function (e) {
    var card = e.target.closest('.skill-card, .yt-channel, .edu-card, .timeline-item');
    if (card) {
      card.style.transform = 'translateY(-6px)';
      card.style.boxShadow = '0 14px 40px rgba(8,15,37,0.08)';
    }
  });
  document.addEventListener('mouseout', function (e) {
    var card = e.target.closest('.skill-card, .yt-channel, .edu-card, .timeline-item');
    if (card) {
      card.style.transform = '';
      card.style.boxShadow = '';
    }
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: motionAllowed ? 'smooth' : 'auto', block: 'start' });
      }
    });
  });
})();
