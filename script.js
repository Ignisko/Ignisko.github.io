// ===== Dark Mode Toggle =====
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

// Update icon based on current theme
function updateThemeIcon() {
  const icon = themeToggle.querySelector('i');
  if (html.getAttribute('data-theme') === 'dark') {
    icon.className = 'fas fa-sun';
  } else {
    icon.className = 'fas fa-moon';
  }
}

// Initialize icon
updateThemeIcon();

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon();
});

// ===== Typewriter Effect for Tagline =====
const tagline = document.getElementById('tagline');
const text = 'exploring, building, thinking';
let index = 0;

function typeWriter() {
  if (index < text.length) {
    tagline.textContent += text.charAt(index);
    index++;
    setTimeout(typeWriter, 80);
  }
}

// Start typing animation after a short delay
setTimeout(typeWriter, 500);

// ===== Scroll-triggered Fade-in Animations =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all elements with fade-in class
document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});

// ===== Smooth Scroll for Internal Links =====
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
  });
});

// ===== Animated Fish - Jump on Scroll, Transform on Click =====
const fish = document.getElementById('fish');
let hasJumped = false;
let isCross = false;

// Observe when footer comes into view - fish jumps but stays fish
const footerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !hasJumped) {
      // Trigger fish jump animation (stays as fish)
      fish.classList.add('jump');
      hasJumped = true;

      // Remove jump class after animation completes
      setTimeout(() => {
        fish.classList.remove('jump');
        hasJumped = false;
      }, 800);
    }
  });
}, {
  threshold: 0.5
});

// Observe the footer
const footer = document.querySelector('footer');
if (footer) {
  footerObserver.observe(footer);
}

// Click to toggle between fish and cross
fish.addEventListener('click', () => {
  if (isCross) {
    // Transform back to fish with jump
    fish.classList.add('jump');
    setTimeout(() => {
      fish.textContent = '>(((\'>';
      fish.classList.remove('cross');
      fish.classList.remove('jump');
      isCross = false;
    }, 400);
  } else {
    // Jump and become cross
    fish.classList.add('jump');
    setTimeout(() => {
      fish.textContent = '✝';
      fish.classList.add('cross');
      fish.classList.remove('jump');
      isCross = true;
    }, 800);
  }
});
