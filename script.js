(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Theme toggle ---------- */
  var toggle = document.querySelector('.theme-toggle');
  if (toggle) {
    function current() {
      return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    }
    function apply(theme) {
      if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
      toggle.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
    }
    toggle.setAttribute('aria-pressed', current() === 'light' ? 'true' : 'false');
    toggle.addEventListener('click', function () {
      var next = current() === 'light' ? 'dark' : 'light';
      apply(next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  /* ---------- Contribution graph: drop the block if the service is unreachable ---------- */
  var gh = document.querySelector('.gh img');
  if (gh) {
    var hideGh = function () {
      var fig = gh.closest('.gh');
      if (fig) fig.hidden = true;
    };
    gh.addEventListener('error', hideGh);
    // covers the case where the image already failed before this script ran
    if (gh.complete && gh.naturalWidth === 0) hideGh();
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll('.rv');
  if (!reduced && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          setTimeout(function () { entry.target.classList.add('in'); }, i * 90);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
