// Global variables
let hamburger;
let navLinks;

// Mobile navbar toggle - Fixed with DOM ready and debug
document.addEventListener('DOMContentLoaded', function() {
  hamburger = document.querySelector('.hamburger');
  navLinks = document.querySelector('.nav-links');
  
  if (hamburger && navLinks) {
    console.log('Hamburger and navLinks found');
    hamburger.addEventListener('click', () => {
      console.log('Hamburger clicked');
      navLinks.classList.toggle('active');
      console.log('Nav active:', navLinks.classList.contains('active'));
    });
    
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
      }
    });
  } else {
    console.error('Hamburger or navLinks not found');
  }

  // Smooth scrolling for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
      // Close mobile menu
      if (navLinks) {
        navLinks.classList.remove('active');
      }
    });
  });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

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
