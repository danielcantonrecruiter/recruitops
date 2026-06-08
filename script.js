// ===== Mobile Menu Toggle =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// ===== Scroll-Triggered Animations =====
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

fadeEls.forEach(el => observer.observe(el));

// ===== Animate process steps on scroll =====
const processSteps = document.querySelectorAll('.process-step');
const stepObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add staggered animation
      const allSteps = Array.from(entry.target.parentElement.querySelectorAll('.process-step'));
      const idx = allSteps.indexOf(entry.target);
      entry.target.style.transitionDelay = `${idx * 0.15}s`;
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

processSteps.forEach(el => stepObserver.observe(el));

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

if (contactForm && formFeedback) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;
    formFeedback.className = 'form-feedback';

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    // Simulate form submission (replace with actual endpoint)
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      formFeedback.textContent = 'Thanks for reaching out, Daniel! He typically responds within 24 hours.';
      formFeedback.className = 'form-feedback success';
      contactForm.reset();
    } catch (err) {
      formFeedback.textContent = 'Something went wrong. Email Daniel directly at daniel.canton620@yahoo.com';
      formFeedback.className = 'form-feedback error';
    } finally {
      btn.textContent = originalText;
      btn.disabled = false;
    }
  });
}

// ===== Smooth scroll offset for fixed nav =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const navHeight = 68;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  });
});

// ===== Floating stat entrance animation =====
const stats = document.querySelectorAll('.floating-stat');
stats.forEach((stat, i) => {
  stat.style.opacity = '0';
  stat.style.transform = 'translateY(10px)';
  stat.style.transition = `opacity 0.5s ease ${0.3 + i * 0.15}s, transform 0.5s ease ${0.3 + i * 0.15}s`;
  setTimeout(() => {
    stat.style.opacity = '1';
    stat.style.transform = 'translateY(0)';
  }, 400);
});