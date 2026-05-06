// ===== PERSONA 5 PORTFOLIO SCRIPTS =====

// LOADING SCREEN
const loadFill = document.getElementById('loadFill');
const loadingScreen = document.getElementById('loading-screen');
const battleIntro = document.getElementById('battleIntro');
let progress = 0;
const loadInterval = setInterval(() => {
  progress += Math.random() * 15;
  if (progress >= 100) {
    progress = 100;
    clearInterval(loadInterval);
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      // Trigger battle intro after loading
      setTimeout(() => {
        if (battleIntro) battleIntro.classList.add('done');
      }, 1200);
    }, 400);
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
  spawnSpark(e.clientX, e.clientY);
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

// ===== MOUSE SPARK PARTICLES =====
let lastSparkTime = 0;
function spawnSpark(x, y) {
  const now = Date.now();
  if (now - lastSparkTime < 40) return; // throttle
  lastSparkTime = now;
  const colors = ['#FF0000','#FF3300','#FFD700','#FF6600','#ffffff'];
  const count = Math.floor(Math.random() * 3) + 1;
  for (let i = 0; i < count; i++) {
    const spark = document.createElement('div');
    spark.className = 'spark';
    const size = Math.random() * 5 + 2;
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * 30 + 10;
    const dx = Math.cos(angle) * dist + 'px';
    const dy = Math.sin(angle) * dist + 'px';
    spark.style.cssText = `
      width:${size}px;
      height:${size}px;
      left:${x}px;
      top:${y}px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      --dx:${dx};
      --dy:${dy};
      animation-duration:${Math.random()*0.3+0.4}s;
    `;
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 700);
  }
}

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

// ===== GLITCH EFFECT on section titles =====
const glitchTitles = document.querySelectorAll('.glitch-title');
glitchTitles.forEach(el => {
  // Set data-text to the text content for pseudo-elements
  el.setAttribute('data-text', el.textContent);
});
function triggerGlitch(el) {
  el.classList.remove('glitching');
  void el.offsetWidth; // reflow
  el.classList.add('glitching');
  setTimeout(() => el.classList.remove('glitching'), 350);
}
// Auto-glitch on scroll into view
const glitchObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(() => triggerGlitch(entry.target), 200);
      glitchObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
glitchTitles.forEach(el => glitchObserver.observe(el));
// Also glitch on hover
glitchTitles.forEach(el => {
  el.addEventListener('mouseenter', () => triggerGlitch(el));
});

// GLITCH EFFECT on hero name (original)
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

// ===== SECTION TITLE SWOOSH REVEAL =====
const titleWraps = document.querySelectorAll('.section-title-wrap');
const swooshObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('swoosh-active');
      swooshObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
titleWraps.forEach(el => swooshObserver.observe(el));

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
