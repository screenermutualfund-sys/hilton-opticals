document.addEventListener('DOMContentLoaded', () => {

  // ===== STICKY HEADER =====
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ===== HAMBURGER MENU =====
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // ===== PRODUCT TAG INTERACTION =====
  const tags = document.querySelectorAll('.product-tag');
  tags.forEach(tag => {
    tag.addEventListener('click', () => {
      tag.classList.toggle('active');
    });
  });

  // ===== SCROLL REVEAL ANIMATIONS =====
  const fadeEls = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  fadeEls.forEach(el => observer.observe(el));

  // ===== STAT COUNTER ANIMATION =====
  function animateCounters() {
    document.querySelectorAll('[data-count]').forEach(el => {
      const target = parseInt(el.getAttribute('data-count'));
      const suffix = el.getAttribute('data-suffix') || '';
      const noComma = el.hasAttribute('data-no-comma');
      const duration = 2000;
      const start = performance.now();

      function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const val = Math.floor(target * eased);
        el.textContent = (noComma ? val.toString() : val.toLocaleString()) + suffix;
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    });
  }

  const statsSection = document.querySelector('.about-stats-grid');
  if (statsSection) {
    const statsObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateCounters();
        statsObs.unobserve(statsSection);
      }
    }, { threshold: 0.3 });
    statsObs.observe(statsSection);
  }

  // ===== CONTACT FORM — Real Email via FormSubmit.co =====
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      let valid = true;

      const name = form.querySelector('#form-name');
      const email = form.querySelector('#form-email');
      const phone = form.querySelector('#form-phone');
      const message = form.querySelector('#form-message');

      // Reset
      form.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));

      if (!name.value.trim()) { name.closest('.form-group').classList.add('error'); valid = false; }
      if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { email.closest('.form-group').classList.add('error'); valid = false; }
      if (!phone.value.trim() || !/^[0-9+\- ]{10,15}$/.test(phone.value)) { phone.closest('.form-group').classList.add('error'); valid = false; }
      if (!message.value.trim()) { message.closest('.form-group').classList.add('error'); valid = false; }

      if (!valid) {
        e.preventDefault();
        return;
      }

      // If valid, let the form submit naturally to formsubmit.co
      const btn = form.querySelector('.form-submit');
      btn.textContent = 'Sending...';
      btn.disabled = true;
    });
  }

  // ===== SMOOTH SCROLL FOR NAV LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
