document.addEventListener('DOMContentLoaded', () => {

  // ===== STICKY HEADER =====
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 40);
  });

  // ===== MOBILE HAMBURGER MENU =====
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
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
  }

  // ===== INTERACTIVE LENS STUDIO TABS =====
  const tabBtns = document.querySelectorAll('.studio-tab-btn');
  const tabPanes = document.querySelectorAll('.studio-tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  // ===== 1-TAP WHATSAPP CONSULTATION BUILDER (4-STEP PERMUTATIONS) =====
  const categoryPills = document.querySelectorAll('#pill-category .builder-pill');
  const brandPills = document.querySelectorAll('#pill-brand .builder-pill');
  const visionPills = document.querySelectorAll('#pill-vision .builder-pill');
  const coatingPills = document.querySelectorAll('#pill-coating .builder-pill');
  const whatsappBuilderBtn = document.getElementById('builder-whatsapp-btn');
  const summaryEl = document.getElementById('builder-live-summary');

  let selectedCategory = 'Everyday Prescription Glasses';
  let selectedBrand = 'Ray-Ban';
  let selectedVision = 'Single Vision (Distance / Reading)';
  let selectedCoating = 'Blue Light Cut + Anti-Glare (ARC)';

  function updateWhatsAppLink() {
    if (summaryEl) {
      summaryEl.innerHTML = `<strong>${selectedCategory}</strong> &bull; <strong>${selectedBrand}</strong> &bull; <strong>${selectedVision}</strong> &bull; <strong>${selectedCoating}</strong>`;
    }
    if (!whatsappBuilderBtn) return;
    const msg = `Hi Hilton Opticals, I am looking for ${selectedCategory} (Brand preference: ${selectedBrand}) with ${selectedVision} lenses and ${selectedCoating} coating. Please guide me on available models and pricing.`;
    const encoded = encodeURIComponent(msg);
    whatsappBuilderBtn.href = `https://wa.me/917670888982?text=${encoded}`;
  }

  function bindPillGroup(pills, setter) {
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        setter(pill.getAttribute('data-val') || pill.textContent.trim());
        updateWhatsAppLink();
      });
    });
  }

  bindPillGroup(categoryPills, val => { selectedCategory = val; });
  bindPillGroup(brandPills, val => { selectedBrand = val; });
  bindPillGroup(visionPills, val => { selectedVision = val; });
  bindPillGroup(coatingPills, val => { selectedCoating = val; });

  updateWhatsAppLink();

  // ===== FAQ CATEGORY FILTER & ACCORDION =====
  const faqFilterBtns = document.querySelectorAll('.faq-filter-btn');
  const faqItems = document.querySelectorAll('.faq-item');

  faqFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      faqFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      faqItems.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close other open items
      faqItems.forEach(other => {
        other.classList.remove('active');
        const otherBtn = other.querySelector('.faq-question');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });

      // Toggle clicked item
      if (!isActive) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ===== STAT COUNTER ANIMATION =====
  function animateCounters() {
    document.querySelectorAll('[data-count]').forEach(el => {
      const target = parseInt(el.getAttribute('data-count'));
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 1800;
      const start = performance.now();

      function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const val = Math.floor(target * eased);
        el.textContent = val.toLocaleString() + suffix;
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
    }, { threshold: 0.2 });
    statsObs.observe(statsSection);
  }

  // ===== CONTACT FORM VALIDATION (FormSubmit.co Emailer Preserved) =====
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      const name = form.querySelector('#form-name');
      const email = form.querySelector('#form-email');
      const phone = form.querySelector('#form-phone');
      const message = form.querySelector('#form-message');
      const status = document.getElementById('form-status');

      if (!name || !name.value.trim()) valid = false;
      if (!email || !email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) valid = false;
      if (!phone || !phone.value.trim()) valid = false;
      if (!message || !message.value.trim()) valid = false;

      if (!valid) {
        alert('Please fill in all required fields with valid details.');
        return;
      }

      const submitBtn = form.querySelector('.form-submit');
      if (submitBtn) {
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
      }

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(res => {
        if (res.ok) {
          form.reset();
          if (status) {
            status.textContent = 'Thank you! Your message has been sent successfully.';
            status.style.display = 'block';
            status.style.color = '#22c55e';
          }
        } else {
          throw new Error('Form submission failed');
        }
      }).catch(() => {
        if (status) {
          status.textContent = 'Something went wrong. Please try again.';
          status.style.display = 'block';
          status.style.color = '#ef4444';
        }
      }).finally(() => {
        if (submitBtn) {
          submitBtn.textContent = 'Submit Message';
          submitBtn.disabled = false;
        }
      });
    });
  }

  // ===== SMOOTH SCROLL FOR NAV LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  // ===== FADE-IN SCROLL ANIMATION OBSERVER =====
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length) {
    const fadeObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    fadeEls.forEach(el => fadeObs.observe(el));
  }

});
