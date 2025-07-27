// Utils.js - Funzioni di utilità

/**
 * Debounce function per limitare le chiamate di funzione
 * @param {Function} func - Funzione da debounce
 * @param {number} wait - Tempo di attesa in millisecondi
 * @returns {Function} - Funzione debounced
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function per limitare le chiamate di funzione
 * @param {Function} func - Funzione da throttle
 * @param {number} limit - Limite di tempo in millisecondi
 * @returns {Function} - Funzione throttled
 */
export function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Formatta una data in formato leggibile
 * @param {Date|string} date - Data da formattare
 * @param {string} locale - Locale per la formattazione
 * @returns {string} - Data formattata
 */
export function formatDate(date, locale = 'it-IT') {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Formatta un numero con separatori delle migliaia
 * @param {number} number - Numero da formattare
 * @param {string} locale - Locale per la formattazione
 * @returns {string} - Numero formattato
 */
export function formatNumber(number, locale = 'it-IT') {
  return new Intl.NumberFormat(locale).format(number);
}

/**
 * Genera un ID univoco
 * @returns {string} - ID univoco
 */
export function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * Valida un indirizzo email
 * @param {string} email - Email da validare
 * @returns {boolean} - True se valida
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida un numero di telefono italiano
 * @param {string} phone - Telefono da validare
 * @returns {boolean} - True se valido
 */
export function isValidPhone(phone) {
  const phoneRegex = /^(\+39|0039)?[ ]?[0-9]{3}[ ]?[0-9]{3}[ ]?[0-9]{4}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Sanitizza una stringa per prevenire XSS
 * @param {string} str - Stringa da sanitizzare
 * @returns {string} - Stringa sanitizzata
 */
export function sanitizeString(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/**
 * Capitalizza la prima lettera di una stringa
 * @param {string} str - Stringa da capitalizzare
 * @returns {string} - Stringa capitalizzata
 */
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Trunca una stringa a una lunghezza specifica
 * @param {string} str - Stringa da troncare
 * @param {number} length - Lunghezza massima
 * @param {string} suffix - Suffisso da aggiungere
 * @returns {string} - Stringa troncata
 */
export function truncate(str, length = 100, suffix = '...') {
  if (str.length <= length) return str;
  return str.substring(0, length) + suffix;
}

/**
 * Converte una stringa in slug
 * @param {string} str - Stringa da convertire
 * @returns {string} - Slug
 */
export function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Ottiene parametri dall'URL
 * @param {string} name - Nome del parametro
 * @returns {string|null} - Valore del parametro
 */
export function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

/**
 * Imposta parametri nell'URL
 * @param {string} name - Nome del parametro
 * @param {string} value - Valore del parametro
 */
export function setUrlParameter(name, value) {
  const url = new URL(window.location);
  url.searchParams.set(name, value);
  window.history.replaceState({}, '', url);
}

/**
 * Rimuove parametri dall'URL
 * @param {string} name - Nome del parametro
 */
export function removeUrlParameter(name) {
  const url = new URL(window.location);
  url.searchParams.delete(name);
  window.history.replaceState({}, '', url);
}

/**
 * Copia testo negli appunti
 * @param {string} text - Testo da copiare
 * @returns {Promise<boolean>} - True se copiato con successo
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback per browser più vecchi
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    return true;
  }
}

/**
 * Verifica se un elemento è visibile nel viewport
 * @param {Element} element - Elemento da verificare
 * @returns {boolean} - True se visibile
 */
export function isElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Aggiunge una classe CSS con animazione
 * @param {Element} element - Elemento target
 * @param {string} className - Classe da aggiungere
 * @param {number} duration - Durata in millisecondi
 */
export function addClassWithAnimation(element, className, duration = 300) {
  element.classList.add(className);
  setTimeout(() => {
    element.classList.remove(className);
  }, duration);
}

/**
 * Verifica se il dispositivo è mobile
 * @returns {boolean} - True se mobile
 */
export function isMobile() {
  return window.innerWidth <= 768;
}

/**
 * Verifica se il dispositivo è tablet
 * @returns {boolean} - True se tablet
 */
export function isTablet() {
  return window.innerWidth > 768 && window.innerWidth <= 1024;
}

/**
 * Verifica se il dispositivo è desktop
 * @returns {boolean} - True se desktop
 */
export function isDesktop() {
  return window.innerWidth > 1024;
}

/**
 * Ottiene le dimensioni dello schermo
 * @returns {Object} - Oggetto con width e height
 */
export function getScreenSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
}

/**
 * Logga messaggi solo in modalità debug
 * @param {string} message - Messaggio da loggare
 * @param {string} level - Livello di log (log, warn, error)
 */
export function debugLog(message, level = 'log') {
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console[level](`[DEBUG] ${message}`);
  }
}

/**
 * Verifica se il browser supporta una feature
 * @param {string} feature - Feature da verificare
 * @returns {boolean} - True se supportata
 */
export function supportsFeature(feature) {
  const features = {
    'localStorage': () => {
      try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
        return true;
      } catch (e) {
        return false;
      }
    },
    'sessionStorage': () => {
      try {
        sessionStorage.setItem('test', 'test');
        sessionStorage.removeItem('test');
        return true;
      } catch (e) {
        return false;
      }
    },
    'serviceWorker': () => 'serviceWorker' in navigator,
    'pushManager': () => 'PushManager' in window,
    'intersectionObserver': () => 'IntersectionObserver' in window,
    'resizeObserver': () => 'ResizeObserver' in window,
    'webp': () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
  };
  
  return features[feature] ? features[feature]() : false;
} 