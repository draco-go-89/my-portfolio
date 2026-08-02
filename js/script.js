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
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
    
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
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

/* ===========================================
   MUSIC PLAYER — Interactive Logic
   Glassmorphism Popup with Audio Controls
   =========================================== */

// Wait for DOM to be fully loaded before binding player events
document.addEventListener('DOMContentLoaded', function () {

  // --- Grab all music player DOM elements ---
  const musicToggleBtn = document.getElementById('musicToggleBtn');   // Floating music button
  const musicModal     = document.getElementById('musicPlayerModal');  // Overlay + popup
  const closeBtn       = document.getElementById('closeMusicPlayer');  // Close (×) button
  const audio          = document.getElementById('musicAudio');        // <audio> element
  const playPauseBtn   = document.getElementById('playPauseBtn');     // Play/Pause button
  const progressSlider = document.getElementById('progressSlider');    // Seek bar
  const currentTimeEl  = document.getElementById('currentTime');       // Current time label
  const durationEl     = document.getElementById('duration');          // Total duration label
  const volumeSlider   = document.getElementById('volumeSlider');      // Volume slider
  const artCircle      = document.querySelector('.music-art-circle');  // Album art circle

  // --- Helper: format seconds to MM:SS ---
  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  // --- 1. Toggle modal on floating button click ---
  if (musicToggleBtn && musicModal) {
    musicToggleBtn.addEventListener('click', function () {
      // Show the overlay by adding 'active' class
      musicModal.classList.add('active');
    });
  }

  // --- 2. Close modal when close button is clicked ---
  if (closeBtn && musicModal) {
    closeBtn.addEventListener('click', function () {
      musicModal.classList.remove('active');
      // If music is playing, pause it when closing modal
      if (audio && !audio.paused) {
        audio.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        artCircle.classList.remove('spinning');
      }
    });
  }

  // --- 3. Close modal when clicking outside the popup (on the overlay) ---
  if (musicModal) {
    musicModal.addEventListener('click', function () {
      musicModal.classList.remove('active');
      if (audio && !audio.paused) {
        audio.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        artCircle.classList.remove('spinning');
      }
    });
  }

  // --- 4. Play/Pause toggle ---
  if (playPauseBtn && audio) {
    playPauseBtn.addEventListener('click', function () {
      if (audio.paused) {
        // Play the audio
        audio.play().catch(function (err) {
          // If no song file added yet, show friendly message in console
          console.warn('Music player: No audio source loaded yet. Add a song file to play.');
        });
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        artCircle.classList.add('spinning');
      } else {
        // Pause the audio
        audio.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        artCircle.classList.remove('spinning');
      }
    });
  }

  // --- 5. Update progress bar + time as audio plays ---
  if (audio && progressSlider && currentTimeEl && durationEl) {
    audio.addEventListener('timeupdate', function () {
      // Calculate progress percentage
      const progress = (audio.currentTime / audio.duration) * 100;
      if (!isNaN(progress)) {
        progressSlider.value = progress;
      }
      // Update time labels
      currentTimeEl.textContent = formatTime(audio.currentTime);
      durationEl.textContent   = formatTime(audio.duration);
    });

    // --- 6. Seek when user drags the progress slider ---
    progressSlider.addEventListener('input', function () {
      const seekTime = (this.value / 100) * audio.duration;
      if (!isNaN(seekTime)) {
        audio.currentTime = seekTime;
      }
    });
  }

  // --- 7. Set duration when audio metadata loads ---
  if (audio && durationEl) {
    audio.addEventListener('loadedmetadata', function () {
      durationEl.textContent = formatTime(audio.duration);
    });
  }

  // --- 8. When audio ends, reset play button and progress ---
  if (audio && playPauseBtn && progressSlider && currentTimeEl && artCircle) {
    audio.addEventListener('ended', function () {
      playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
      progressSlider.value = 0;
      currentTimeEl.textContent = '00:00';
      artCircle.classList.remove('spinning');
    });
  }

  // --- 9. Volume control ---
  if (volumeSlider && audio) {
    volumeSlider.addEventListener('input', function () {
      // Volume range: 0 to 1 (slider gives 0–100)
      audio.volume = this.value / 100;
    });
  }

  // --- 10. If no audio source, show a placeholder state ---
  // The placeholder info is already in the HTML; this just prevents console errors
  if (audio) {
    // No source added yet — that's fine, user will add later
    audio.volume = (volumeSlider ? volumeSlider.value : 70) / 100;
  }

});

