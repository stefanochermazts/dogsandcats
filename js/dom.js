// DOM.js - Helper DOM manipulation

/**
 * Selettori semantici per elementi DOM
 */
export const selectors = {
  // Selettori per data attributes
  byData: (name, value = null) => {
    const selector = value ? `[data-${name}="${value}"]` : `[data-${name}]`;
    return document.querySelector(selector);
  },
  
  byDataAll: (name, value = null) => {
    const selector = value ? `[data-${name}="${value}"]` : `[data-${name}]`;
    return document.querySelectorAll(selector);
  },
  
  // Selettori per classi
  byClass: (className) => document.querySelector(`.${className}`),
  byClassAll: (className) => document.querySelectorAll(`.${className}`),
  
  // Selettori per ID
  byId: (id) => document.getElementById(id),
  
  // Selettori per tag
  byTag: (tagName) => document.querySelector(tagName),
  byTagAll: (tagName) => document.querySelectorAll(tagName)
};

/**
 * Crea un elemento DOM
 * @param {string} tagName - Nome del tag
 * @param {Object} attributes - Attributi dell'elemento
 * @param {string|Element} content - Contenuto dell'elemento
 * @returns {Element} - Elemento creato
 */
export function createElement(tagName, attributes = {}, content = '') {
  const element = document.createElement(tagName);
  
  // Aggiungi attributi
  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'className') {
      element.className = value;
    } else if (key === 'textContent') {
      element.textContent = value;
    } else if (key === 'innerHTML') {
      element.innerHTML = value;
    } else if (key.startsWith('data-')) {
      element.setAttribute(key, value);
    } else {
      element.setAttribute(key, value);
    }
  });
  
  // Aggiungi contenuto
  if (content) {
    if (typeof content === 'string') {
      element.textContent = content;
    } else if (content instanceof Element) {
      element.appendChild(content);
    }
  }
  
  return element;
}

/**
 * Aggiunge classi CSS a un elemento
 * @param {Element} element - Elemento target
 * @param {...string} classes - Classi da aggiungere
 */
export function addClasses(element, ...classes) {
  element.classList.add(...classes);
}

/**
 * Rimuove classi CSS da un elemento
 * @param {Element} element - Elemento target
 * @param {...string} classes - Classi da rimuovere
 */
export function removeClasses(element, ...classes) {
  element.classList.remove(...classes);
}

/**
 * Toggle classi CSS su un elemento
 * @param {Element} element - Elemento target
 * @param {...string} classes - Classi da toggle
 */
export function toggleClasses(element, ...classes) {
  classes.forEach(className => {
    element.classList.toggle(className);
  });
}

/**
 * Verifica se un elemento ha una classe
 * @param {Element} element - Elemento da verificare
 * @param {string} className - Classe da verificare
 * @returns {boolean} - True se ha la classe
 */
export function hasClass(element, className) {
  return element.classList.contains(className);
}

/**
 * Imposta attributi su un elemento
 * @param {Element} element - Elemento target
 * @param {Object} attributes - Attributi da impostare
 */
export function setAttributes(element, attributes) {
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

/**
 * Ottiene attributi da un elemento
 * @param {Element} element - Elemento target
 * @param {...string} attributes - Attributi da ottenere
 * @returns {Object} - Oggetto con gli attributi
 */
export function getAttributes(element, ...attributes) {
  const result = {};
  attributes.forEach(attr => {
    result[attr] = element.getAttribute(attr);
  });
  return result;
}

/**
 * Rimuove attributi da un elemento
 * @param {Element} element - Elemento target
 * @param {...string} attributes - Attributi da rimuovere
 */
export function removeAttributes(element, ...attributes) {
  attributes.forEach(attr => {
    element.removeAttribute(attr);
  });
}

/**
 * Aggiunge event listeners a un elemento
 * @param {Element} element - Elemento target
 * @param {Object} events - Eventi da aggiungere
 */
export function addEventListeners(element, events) {
  Object.entries(events).forEach(([event, handler]) => {
    element.addEventListener(event, handler);
  });
}

/**
 * Rimuove event listeners da un elemento
 * @param {Element} element - Elemento target
 * @param {Object} events - Eventi da rimuovere
 */
export function removeEventListeners(element, events) {
  Object.entries(events).forEach(([event, handler]) => {
    element.removeEventListener(event, handler);
  });
}

/**
 * Gestisce il focus su un elemento
 * @param {Element} element - Elemento da focalizzare
 * @param {boolean} scroll - Se scrollare all'elemento
 */
export function focusElement(element, scroll = true) {
  element.focus();
  if (scroll) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

/**
 * Nasconde un elemento
 * @param {Element} element - Elemento da nascondere
 * @param {string} method - Metodo per nascondere (display, visibility, opacity)
 */
export function hideElement(element, method = 'display') {
  switch (method) {
    case 'display':
      element.style.display = 'none';
      break;
    case 'visibility':
      element.style.visibility = 'hidden';
      break;
    case 'opacity':
      element.style.opacity = '0';
      break;
  }
}

/**
 * Mostra un elemento
 * @param {Element} element - Elemento da mostrare
 * @param {string} method - Metodo per mostrare (display, visibility, opacity)
 */
export function showElement(element, method = 'display') {
  switch (method) {
    case 'display':
      element.style.display = '';
      break;
    case 'visibility':
      element.style.visibility = 'visible';
      break;
    case 'opacity':
      element.style.opacity = '1';
      break;
  }
}

/**
 * Toggle visibilità di un elemento
 * @param {Element} element - Elemento da toggle
 * @param {string} method - Metodo per toggle
 */
export function toggleElement(element, method = 'display') {
  const isHidden = method === 'display' 
    ? element.style.display === 'none'
    : method === 'visibility'
    ? element.style.visibility === 'hidden'
    : element.style.opacity === '0';
  
  if (isHidden) {
    showElement(element, method);
  } else {
    hideElement(element, method);
  }
}

/**
 * Verifica se un elemento è visibile
 * @param {Element} element - Elemento da verificare
 * @returns {boolean} - True se visibile
 */
export function isElementVisible(element) {
  const style = window.getComputedStyle(element);
  return style.display !== 'none' && 
         style.visibility !== 'hidden' && 
         style.opacity !== '0';
}

/**
 * Ottiene le dimensioni di un elemento
 * @param {Element} element - Elemento target
 * @returns {Object} - Oggetto con width, height, top, left
 */
export function getElementDimensions(element) {
  const rect = element.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
    top: rect.top + window.pageYOffset,
    left: rect.left + window.pageXOffset,
    right: rect.right + window.pageXOffset,
    bottom: rect.bottom + window.pageYOffset
  };
}

/**
 * Posiziona un elemento in modo assoluto
 * @param {Element} element - Elemento da posizionare
 * @param {number} x - Posizione X
 * @param {number} y - Posizione Y
 */
export function positionElement(element, x, y) {
  element.style.position = 'absolute';
  element.style.left = `${x}px`;
  element.style.top = `${y}px`;
}

/**
 * Centra un elemento nel viewport
 * @param {Element} element - Elemento da centrare
 */
export function centerElement(element) {
  const rect = element.getBoundingClientRect();
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  
  const left = (windowWidth - rect.width) / 2;
  const top = (windowHeight - rect.height) / 2;
  
  positionElement(element, left, top);
}

/**
 * Crea un elemento con animazione
 * @param {string} tagName - Nome del tag
 * @param {Object} attributes - Attributi
 * @param {string} animationClass - Classe CSS per l'animazione
 * @returns {Element} - Elemento creato
 */
export function createAnimatedElement(tagName, attributes = {}, animationClass = 'animate-fade-in') {
  const element = createElement(tagName, attributes);
  addClasses(element, animationClass);
  return element;
}

/**
 * Aggiunge un elemento al DOM con animazione
 * @param {Element} parent - Elemento parent
 * @param {Element} child - Elemento da aggiungere
 * @param {string} animationClass - Classe CSS per l'animazione
 */
export function appendWithAnimation(parent, child, animationClass = 'animate-fade-in') {
  addClasses(child, animationClass);
  parent.appendChild(child);
}

/**
 * Rimuove un elemento dal DOM con animazione
 * @param {Element} element - Elemento da rimuovere
 * @param {string} animationClass - Classe CSS per l'animazione
 * @param {number} delay - Delay prima della rimozione
 */
export function removeWithAnimation(element, animationClass = 'animate-fade-out', delay = 300) {
  addClasses(element, animationClass);
  setTimeout(() => {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }, delay);
}

/**
 * Crea un observer per elementi che entrano nel viewport
 * @param {Function} callback - Callback da eseguire
 * @param {Object} options - Opzioni dell'observer
 * @returns {IntersectionObserver} - Observer creato
 */
export function createIntersectionObserver(callback, options = {}) {
  const defaultOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
    ...options
  };
  
  return new IntersectionObserver(callback, defaultOptions);
}

/**
 * Crea un observer per il resize di un elemento
 * @param {Element} element - Elemento da osservare
 * @param {Function} callback - Callback da eseguire
 * @returns {ResizeObserver} - Observer creato
 */
export function createResizeObserver(element, callback) {
  const observer = new ResizeObserver(callback);
  observer.observe(element);
  return observer;
}

/**
 * Gestisce il focus trap per accessibilità
 * @param {Element} container - Container per il focus trap
 * @param {Element} firstFocusable - Primo elemento focusabile
 * @param {Element} lastFocusable - Ultimo elemento focusabile
 */
export function createFocusTrap(container, firstFocusable, lastFocusable) {
  const handleKeyDown = (event) => {
    if (event.key === 'Tab') {
      if (event.shiftKey) {
        if (document.activeElement === firstFocusable) {
          event.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          event.preventDefault();
          firstFocusable.focus();
        }
      }
    }
  };
  
  container.addEventListener('keydown', handleKeyDown);
  
  // Focus sul primo elemento
  firstFocusable.focus();
  
  // Restituisce la funzione per rimuovere il listener
  return () => {
    container.removeEventListener('keydown', handleKeyDown);
  };
} 