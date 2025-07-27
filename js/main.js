// Main JavaScript - Entry Point

// Inizializzazione dell'applicazione
document.addEventListener('DOMContentLoaded', function() {
  console.log('DogsAndCats - Inizializzazione applicazione');
  
  // Aspetta che i18n sia inizializzato
  setTimeout(() => {
    if (window.i18n) {
      window.i18n.init();
    }
  }, 100);
  
  // Inizializza il tema
  initializeTheme();
  
  // Inizializza i componenti
  initializeComponents();
  
  // Inizializza gli event listeners
  initializeEventListeners();
});

// Gestione del tema
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  let theme = savedTheme || (prefersDark ? 'dark' : 'light');
  
  // Applica il tema
  applyTheme(theme);
  
  // Salva la preferenza
  localStorage.setItem('theme', theme);
  
  console.log('Tema inizializzato:', theme);
}

function applyTheme(theme) {
  const root = document.documentElement;
  
  if (theme === 'dark') {
    root.setAttribute('data-theme', 'dark');
  } else {
    root.removeAttribute('data-theme');
  }
}

function toggleTheme() {
  const root = document.documentElement;
  const currentTheme = root.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  applyTheme(newTheme);
  localStorage.setItem('theme', newTheme);
  
  console.log('Tema cambiato:', newTheme);
}

// Inizializzazione componenti
function initializeComponents() {
  // Aggiorna l'anno nel footer
  updateCurrentYear();
  
  // Inizializza la navigazione mobile
  initializeMobileNavigation();
  
  console.log('Componenti inizializzati');
}

// Event listeners
function initializeEventListeners() {
  // Theme toggle
  const themeToggle = document.querySelector('[data-js="theme-toggle"]');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  
  // Mobile menu toggle
  const menuToggle = document.querySelector('[data-js="menu-toggle"]');
  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMobileMenu);
  }
  
  // Smooth scroll per i link interni
  initializeSmoothScroll();
  
  // Lazy loading per le immagini
  initializeLazyLoading();
  
  console.log('Event listeners inizializzati');
}

// Navigazione mobile
function initializeMobileNavigation() {
  const menuToggle = document.querySelector('[data-js="menu-toggle"]');
  const mobileNav = document.querySelector('.header__mobile-nav');
  
  if (!menuToggle || !mobileNav) return;
  
  // Chiudi il menu quando si clicca su un link
  const mobileLinks = mobileNav.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });
  
  // Chiudi il menu quando si clicca fuori
  document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !mobileNav.contains(e.target)) {
      closeMobileMenu();
    }
  });
  
  // Chiudi il menu con ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
    }
  });
}

function toggleMobileMenu() {
  const menuToggle = document.querySelector('[data-js="menu-toggle"]');
  const mobileNav = document.querySelector('.header__mobile-nav');
  
  if (!menuToggle || !mobileNav) return;
  
  const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
  
  if (isExpanded) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

function openMobileMenu() {
  const menuToggle = document.querySelector('[data-js="menu-toggle"]');
  const mobileNav = document.querySelector('.header__mobile-nav');
  
  if (!menuToggle || !mobileNav) return;
  
  menuToggle.setAttribute('aria-expanded', 'true');
  mobileNav.setAttribute('aria-hidden', 'false');
  mobileNav.classList.add('header__mobile-nav--open');
  
  // Aggiorna l'aria-label del pulsante
  if (window.i18n) {
    menuToggle.setAttribute('aria-label', window.i18n.t('menu.close'));
  }
  
  // Focus trap per accessibilità
  const firstLink = mobileNav.querySelector('a');
  if (firstLink) {
    firstLink.focus();
  }
  
  // Blocca lo scroll del body
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  const menuToggle = document.querySelector('[data-js="menu-toggle"]');
  const mobileNav = document.querySelector('.header__mobile-nav');
  
  if (!menuToggle || !mobileNav) return;
  
  menuToggle.setAttribute('aria-expanded', 'false');
  mobileNav.setAttribute('aria-hidden', 'true');
  mobileNav.classList.remove('header__mobile-nav--open');
  
  // Aggiorna l'aria-label del pulsante
  if (window.i18n) {
    menuToggle.setAttribute('aria-label', window.i18n.t('menu.open'));
  }
  
  // Ripristina lo scroll del body
  document.body.style.overflow = '';
  
  // Riporta il focus al menu toggle
  menuToggle.focus();
}

// Smooth scroll
function initializeSmoothScroll() {
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  
  internalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Lazy loading
function initializeLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
  }
}

// Utility functions
function updateCurrentYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Gestione errori
window.addEventListener('error', function(e) {
  console.error('Errore JavaScript:', e.error);
});

// Performance monitoring
window.addEventListener('load', function() {
  if ('performance' in window) {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log('Tempo di caricamento:', loadTime + 'ms');
  }
});

// Service Worker registration (per future PWA)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js')
      .then(function(registration) {
        console.log('Service Worker registrato:', registration);
      })
      .catch(function(error) {
        console.log('Errore registrazione Service Worker:', error);
      });
  });
} 