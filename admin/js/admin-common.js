// Admin Common Functionality

class AdminCommon {
  constructor() {
    this.baseURL = 'http://localhost:8001/api';
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    this.setupThemeToggle();
    this.setupUserMenu();
    this.setupLanguageSelector();
  }
  
  setupEventListeners() {
    // Logout buttons
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-js="admin-logout"]')) {
        e.preventDefault();
        this.handleLogout();
      }
    });
  }
  
  setupThemeToggle() {
    const themeToggle = document.querySelector('[data-js="theme-toggle"]');
    if (!themeToggle) return;
    
    themeToggle.addEventListener('click', () => {
      const html = document.documentElement;
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
    
    // Applica tema salvato
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }
  
  setupUserMenu() {
    const userToggle = document.querySelector('[data-js="admin-user-toggle"]');
    const userDropdown = document.querySelector('[data-js="admin-user-dropdown"]');
    
    if (!userToggle || !userDropdown) return;
    
    userToggle.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggleUserDropdown();
    });
    
    // Chiudi dropdown quando si clicca fuori
    document.addEventListener('click', (e) => {
      if (!userToggle.closest('.admin-header__user').contains(e.target)) {
        this.closeUserDropdown();
      }
    });
    
    // Chiudi dropdown con ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeUserDropdown();
      }
    });
  }
  
  setupLanguageSelector() {
    // Usa il sistema i18n esistente se disponibile
    if (window.i18n) {
      setTimeout(() => {
        window.i18n.init();
      }, 100);
    }
  }
  
  toggleUserDropdown() {
    const userToggle = document.querySelector('[data-js="admin-user-toggle"]');
    const isExpanded = userToggle.getAttribute('aria-expanded') === 'true';
    
    if (isExpanded) {
      this.closeUserDropdown();
    } else {
      this.openUserDropdown();
    }
  }
  
  openUserDropdown() {
    const userToggle = document.querySelector('[data-js="admin-user-toggle"]');
    if (userToggle) {
      userToggle.setAttribute('aria-expanded', 'true');
    }
  }
  
  closeUserDropdown() {
    const userToggle = document.querySelector('[data-js="admin-user-toggle"]');
    if (userToggle) {
      userToggle.setAttribute('aria-expanded', 'false');
    }
  }
  
  async handleLogout() {
    if (window.adminAuth) {
      window.adminAuth.logout();
    }
  }
  
  // Utility per chiamate API
  async makeAuthenticatedRequest(endpoint, options = {}) {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      throw new Error('No authentication token');
    }
    
    const defaultOptions = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    };
    
    const mergedOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      }
    };
    
    const response = await fetch(`${this.baseURL}${endpoint}`, mergedOptions);
    
    if (response.status === 401) {
      // Token scaduto o non valido
      if (window.adminAuth) {
        window.adminAuth.redirectToLogin();
      }
      throw new Error('Authentication required');
    }
    
    if (response.status === 403) {
      // Non autorizzato
      throw new Error('Access denied');
    }
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }
    
    return response.json();
  }
  
  // Utility per mostrare notifiche
  showNotification(message, type = 'info', duration = 5000) {
    const notification = document.createElement('div');
    notification.className = `admin-notification admin-notification--${type}`;
    notification.innerHTML = `
      <div class="admin-notification__content">
        <div class="admin-notification__icon">
          ${this.getNotificationIcon(type)}
        </div>
        <span class="admin-notification__message">${message}</span>
        <button class="admin-notification__close" onclick="this.parentElement.parentElement.remove()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    `;
    
    // Aggiungi stili se non esistono
    if (!document.getElementById('admin-notification-styles')) {
      const styles = document.createElement('style');
      styles.id = 'admin-notification-styles';
      styles.textContent = `
        .admin-notification {
          position: fixed;
          top: 5rem;
          right: 1rem;
          max-width: 400px;
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          z-index: 1000;
          animation: slideInRight 0.3s ease-out;
        }
        
        .admin-notification--success {
          border-color: var(--success-200);
          background-color: var(--success-50);
        }
        
        .admin-notification--error {
          border-color: var(--error-200);
          background-color: var(--error-50);
        }
        
        .admin-notification--warning {
          border-color: var(--warning-200);
          background-color: var(--warning-50);
        }
        
        .admin-notification__content {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
        }
        
        .admin-notification__icon {
          flex-shrink: 0;
        }
        
        .admin-notification__message {
          flex: 1;
          font-size: 0.875rem;
          color: var(--text-primary);
        }
        
        .admin-notification__close {
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 0.25rem;
          transition: all 0.2s;
        }
        
        .admin-notification__close:hover {
          background-color: var(--bg-secondary);
          color: var(--text-primary);
        }
        
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        [data-theme="dark"] .admin-notification--success {
          border-color: var(--success-700);
          background-color: var(--success-900);
        }
        
        [data-theme="dark"] .admin-notification--error {
          border-color: var(--error-700);
          background-color: var(--error-900);
        }
        
        [data-theme="dark"] .admin-notification--warning {
          border-color: var(--warning-700);
          background-color: var(--warning-900);
        }
      `;
      document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Rimuovi automaticamente dopo duration
    if (duration > 0) {
      setTimeout(() => {
        if (notification.parentElement) {
          notification.remove();
        }
      }, duration);
    }
  }
  
  getNotificationIcon(type) {
    const icons = {
      success: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--success-600);">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22,4 12,14.01 9,11.01"/>
      </svg>`,
      error: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--error-600);">
        <circle cx="12" cy="12" r="10"/>
        <line x1="15" y1="9" x2="9" y2="15"/>
        <line x1="9" y1="9" x2="15" y2="15"/>
      </svg>`,
      warning: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--warning-600);">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>`,
      info: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--blue-600);">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 16v-4"/>
        <path d="M12 8h.01"/>
      </svg>`
    };
    
    return icons[type] || icons.info;
  }
  
  // Utility per formattare date
  formatDate(dateString, options = {}) {
    if (!dateString) return 'Mai';
    
    const date = new Date(dateString);
    const defaultOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    
    const mergedOptions = { ...defaultOptions, ...options };
    
    return new Intl.DateTimeFormat('it-IT', mergedOptions).format(date);
  }
  
  // Utility per formattare date relative
  formatRelativeTime(dateString) {
    if (!dateString) return 'Mai';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Ora';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min fa`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} ore fa`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} giorni fa`;
    
    return this.formatDate(dateString, { year: 'numeric', month: 'short', day: 'numeric' });
  }
  
  // Utility per debounce
  debounce(func, wait) {
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
}

// Inizializza quando il DOM è pronto
document.addEventListener('DOMContentLoaded', function() {
  window.adminCommon = new AdminCommon();
}); 