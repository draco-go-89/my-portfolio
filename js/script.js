// Global variables
let hamburger;
let navLinks;
let navItems;
let themeToggle;

// Mobile navbar toggle - Fixed with DOM ready and debug
document.addEventListener('DOMContentLoaded', function() {
  hamburger = document.querySelector('.hamburger');
  navLinks = document.querySelector('.nav-links');
  
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

  navItems = document.querySelectorAll('.nav-links a');
  themeToggle = document.querySelector('.theme-toggle');

  // Enhanced smooth scrolling for nav links
  navItems.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          smoothScrollTo(target.offsetTop - 80, 1000);
        }
      }

      navLinks?.classList.remove('active');
    });
  });

  setActiveNavLink();
  window.addEventListener('scroll', setActiveNavLink);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.documentElement.dataset.theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      themeToggle.classList.toggle('active');
      const icon = themeToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
      }
      localStorage.setItem('theme', document.documentElement.dataset.theme);
    });
  }

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.dataset.theme = savedTheme;
    if (savedTheme === 'dark') {
      themeToggle?.classList.add('active');
      const icon = themeToggle?.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      }
    }
  }
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

function setActiveNavLink() {
  if (!navItems) return;
  const fromTop = window.scrollY + 100;

  navItems.forEach(link => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) {
      link.classList.remove('active');
      return;
    }

    const section = document.querySelector(href);
    if (!section) {
      link.classList.remove('active');
      return;
    }

    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    link.classList.toggle('active', fromTop >= top && fromTop < bottom);
  });
}

const heroPhrases = [
  'Passionate Software Engineer.',
  'Building modern web experiences.',
  'Turning ideas into interfaces.',
  'Creating polished portfolio projects.'
];
let heroIndex = 0;
const heroPhraseElement = document.querySelector('.hero-subtitle');
function rotateHeroText() {
  if (!heroPhraseElement) return;
  heroIndex = (heroIndex + 1) % heroPhrases.length;
  heroPhraseElement.style.opacity = '0';
  setTimeout(() => {
    heroPhraseElement.textContent = heroPhrases[heroIndex];
    heroPhraseElement.style.opacity = '1';
  }, 400);
}
if (heroPhraseElement) {
  setInterval(rotateHeroText, 5000);
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

// Mouse
let mouseX = 0, mouseY = 0;

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

// Form submission: open user's email client (mailto)
const contactForm = document.querySelector('#contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    const name = document.querySelector('#name')?.value?.trim() || '';
    const email = document.querySelector('#email')?.value?.trim() || '';
    const message = document.querySelector('#message')?.value?.trim() || '';

    if (!name || !email || !message) {
      e.preventDefault();
      alert('Please fill in all fields.');
      return;
    }

    const to = 'lubos8999@gmail.com';
    const subject = `${name} - Feedback`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

    e.preventDefault();
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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

