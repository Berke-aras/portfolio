// ===== PERSONA 5 PORTFOLIO SCRIPTS =====

// LOADING SCREEN
const loadFill = document.getElementById('loadFill');
const loadingScreen = document.getElementById('loading-screen');
let progress = 0;
const loadInterval = setInterval(() => {
  progress += Math.random() * 15;
  if (progress >= 100) {
    progress = 100;
    clearInterval(loadInterval);
    setTimeout(() => loadingScreen.classList.add('hidden'), 400);
  }
  loadFill.style.width = progress + '%';
}, 80);

// CUSTOM CURSOR
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursorTrail');
let trailX = 0, trailY = 0;
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});
function animateTrail() {
  const cx = parseFloat(cursor.style.left) || 0;
  const cy = parseFloat(cursor.style.top) || 0;
  trailX += (cx - trailX) * 0.12;
  trailY += (cy - trailY) * 0.12;
  trail.style.left = trailX + 'px';
  trail.style.top = trailY + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();
document.querySelectorAll('a, button, .p5-btn, .project-card, .contact-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    trail.style.width = '50px';
    trail.style.height = '50px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '12px';
    cursor.style.height = '12px';
    trail.style.width = '30px';
    trail.style.height = '30px';
  });
});

// NAVBAR SCROLL
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// SCROLL REVEAL — experience items
const expItems = document.querySelectorAll('.exp-item');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 150);
    }
  });
}, { threshold: 0.2 });
expItems.forEach(el => revealObserver.observe(el));

// SCROLL REVEAL — generic cards
const revealEls = document.querySelectorAll('.skill-category, .project-card, .contact-item, .info-card');
const genericObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '0';
      entry.target.style.transform = 'translateY(20px)';
      entry.target.style.transition = `opacity .5s ease ${i * 0.08}s, transform .5s ease ${i * 0.08}s`;
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, 50);
      genericObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => genericObserver.observe(el));

// GLITCH EFFECT on hero name
const nameLines = document.querySelectorAll('.name-line');
function glitch(el) {
  const original = el.textContent;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%';
  let iter = 0;
  const interval = setInterval(() => {
    el.textContent = original.split('').map((ch, idx) => {
      if (idx < iter) return original[idx];
      return chars[Math.floor(Math.random() * chars.length)];
    }).join('');
    if (iter >= original.length) { el.textContent = original; clearInterval(interval); }
    iter += .5;
  }, 40);
}
nameLines.forEach(el => {
  el.addEventListener('mouseenter', () => glitch(el));
});

// PARALLAX — hero bg text
const heroBg = document.querySelector('.hero-bg-text');
window.addEventListener('scroll', () => {
  if (heroBg) heroBg.style.transform = `translate(-50%, calc(-50% + ${window.scrollY * 0.15}px))`;
});

// ACTIVE NAV LINK
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--red)' : '';
  });
});

// SMOOTH SECTION ENTRANCE
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.05 });
document.querySelectorAll('section').forEach(s => {
  s.style.opacity = '0';
  s.style.transform = 'translateY(30px)';
  s.style.transition = 'opacity .7s ease, transform .7s ease';
  sectionObserver.observe(s);
});
// Hero starts visible
const heroSection = document.getElementById('hero');
if (heroSection) {
  heroSection.style.opacity = '1';
  heroSection.style.transform = 'translateY(0)';
}
