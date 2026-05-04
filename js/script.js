// Global variables
let hamburger;
let navLinks;
let bird;

// Faah sound globals
let faahSound = new Audio('assets/Faah.mp3');
faahSound.preload = 'auto';
faahSound.volume = 0.7;
let lastFaahTime = 0;
const FAH_MIN_INTERVAL = 2000; // 2 seconds debounce

// Play Faah sound with debounce (global function)
function playFaah() {
  const now = Date.now();
  if (now - lastFaahTime > FAH_MIN_INTERVAL) {
    faahSound.currentTime = 0;
    faahSound.play().catch(e => console.log('Audio play failed:', e));
    lastFaahTime = now;
  }
}

// Mobile navbar toggle - Fixed with DOM ready and debug
document.addEventListener('DOMContentLoaded', function() {
  hamburger = document.querySelector('.hamburger');
  navLinks = document.querySelector('.nav-links');
  bird = document.getElementById('bird');
  
  // Bird play button
  if (bird) {
    bird.style.pointerEvents = 'auto';
    bird.style.cursor = 'pointer';
    bird.addEventListener('click', playFaah);
    bird.addEventListener('touchstart', playFaah);
  }
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
    
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
      }
    });
  }

  // Enhanced smooth scrolling for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      const target = document.querySelector(href);
      if (target) {
        smoothScrollTo(target.offsetTop - 80, 1000);
      }
      // Close mobile menu
      if (navLinks) {
        navLinks.classList.remove('active');
      }
    });
  });
});

// Custom 144Hz smooth scroll polyfill with RAF
function smoothScrollTo(target, duration = 1200) {
  const start = window.pageYOffset;
  const distance = target - start;
  const startTime = performance.now();

  function animation(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3); // cubic ease-out

    window.scrollTo(0, start + distance * easeProgress);

    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

// Navbar scroll effect + back to top + bird
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  const backToTop = document.getElementById('backToTop');
  
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  if (backToTop) {
    if (window.scrollY > 200) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  }
  
  // Fast bird movement on scroll
  if (bird) {
    const scrollY = window.scrollY;
    const maxY = Math.sin(scrollY * 0.01) * 30;
    const maxX = Math.cos(scrollY * 0.005) * 20;
    bird.style.transform = `translateX(${maxX}px) translateY(${maxY}px) rotateZ(${Math.sin(scrollY * 0.002) * 5}deg)`;
  }
});

// Back to Top click handler
document.addEventListener('DOMContentLoaded', () => {
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      smoothScrollTo(0, 800);
    });
  }
});

// Smart bird: Flee mouse/touch + scroll flight
let mouseX = 0, mouseY = 0;

// Mouse
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Touch support (mobile)
document.addEventListener('touchmove', (e) => {
  const touch = e.touches[0];
  if (touch) {
    mouseX = touch.clientX;
    mouseY = touch.clientY;
  }
});

function updateBird() {
  if (bird) {
    const rect = bird.getBoundingClientRect();
    const birdCenterX = rect.left + rect.width / 2;
    const birdCenterY = rect.top + rect.height / 2;
    
    // Mouse/touch flee
    const dx = mouseX - birdCenterX;
    const dy = mouseY - birdCenterY;
    const distance = Math.sqrt(dx*dx + dy*dy);
    
    let fleeX = 0, fleeY = 0;
    if (distance < 120) {
      fleeX = (dx / distance) * 80 * (1 - distance/120); // Stronger closer
      fleeY = (dy / distance) * 80 * (1 - distance/120);
    }
    
    // Scroll flight (continuous)
    const scrollY = window.scrollY * 0.02;
    const scrollX = Math.sin(scrollY * 0.1) * 15;
    
    bird.style.transform = `translateX(${fleeX + scrollX}px) translateY(${fleeY + Math.sin(scrollY)*8}px) rotateZ(${Math.sin(Date.now() * 0.008 + scrollY)*12}deg)`;
  }
  requestAnimationFrame(updateBird);
}
updateBird();

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Simple validation
    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const message = document.querySelector('#message').value.trim();
    
    if (name && email && message) {
      alert('Thank you for your message! This is a demo - form will be sent in production.');
      this.reset();
    } else {
      alert('Please fill in all fields.');
    }
  });
}

// Animate skill bars on scroll
const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const skillBars = entry.target.querySelectorAll('.skill-progress');
      skillBars.forEach(bar => {
        bar.style.width = bar.dataset.progress + '%';
      });
    }
  });
}, observerOptions);

// Observe skills section
const skillsSection = document.querySelector('#skills');
if (skillsSection) {
  observer.observe(skillsSection);
}

// Videos page animations
const videosSection = document.querySelector('#videos');
if (videosSection) {
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const videoCards = entry.target.querySelectorAll('.video-card');
        videoCards.forEach((card, index) => {
          card.style.animationDelay = `${0.2 + index * 0.2}s`;
          card.classList.add('animate-in');
        });
      }
    });
  }, { threshold: 0.1 });
  videoObserver.observe(videosSection);
}

