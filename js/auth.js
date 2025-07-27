// Authentication Manager

class AuthManager {
  constructor() {
    this.user = null;
    this.token = null;
    this.authLinks = document.querySelector('[data-js="auth-links"]');
    this.userMenu = document.querySelector('[data-js="user-menu"]');
    this.mobileAuthLinks = document.querySelector('[data-js="mobile-auth-links"]');
    this.mobileUserMenu = document.querySelector('[data-js="mobile-user-menu"]');
    
    this.init();
  }
  
  init() {
    this.checkAuthStatus();
    this.setupEventListeners();
  }
  
  checkAuthStatus() {
    // Controlla se l'utente è autenticato
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        this.user = JSON.parse(userData);
        this.token = token;
        this.showUserMenu();
      } catch (error) {
        console.error('Error parsing user data:', error);
        this.logout();
      }
    } else {
      this.showAuthLinks();
    }
  }
  
  setupEventListeners() {
    // User menu toggle (desktop)
    const userToggle = document.querySelector('[data-js="user-toggle"]');
    if (userToggle) {
      userToggle.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleUserDropdown();
      });
      
      // Chiudi dropdown quando si clicca fuori
      document.addEventListener('click', (e) => {
        if (!userToggle.closest('.header__user').contains(e.target)) {
          this.closeUserDropdown();
        }
      });
    }
    
    // Logout buttons
    const logoutBtns = document.querySelectorAll('[data-js="logout"], [data-js="mobile-logout"]');
    logoutBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.logout();
      });
    });
    
    // Chiudi dropdown con ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeUserDropdown();
      }
    });
  }
  
  showAuthLinks() {
    if (this.authLinks) {
      this.authLinks.style.display = 'flex';
    }
    if (this.userMenu) {
      this.userMenu.style.display = 'none';
    }
    if (this.mobileAuthLinks) {
      this.mobileAuthLinks.style.display = 'flex';
    }
    if (this.mobileUserMenu) {
      this.mobileUserMenu.style.display = 'none';
    }
  }
  
  showUserMenu() {
    if (this.authLinks) {
      this.authLinks.style.display = 'none';
    }
    if (this.userMenu) {
      this.userMenu.style.display = 'block';
    }
    if (this.mobileAuthLinks) {
      this.mobileAuthLinks.style.display = 'none';
    }
    if (this.mobileUserMenu) {
      this.mobileUserMenu.style.display = 'block';
    }
    
    this.updateUserInfo();
  }
  
  updateUserInfo() {
    if (!this.user) return;
    
    const userName = `${this.user.firstName} ${this.user.lastName}`;
    const userType = this.getUserTypeLabel(this.user.type);
    const dashboardUrl = this.getDashboardUrl(this.user.type);
    
    // Update desktop user menu
    const userNameEl = document.querySelector('[data-js="user-name"]');
    if (userNameEl) {
      userNameEl.textContent = userName;
    }
    
    // Update mobile user menu
    const mobileUserNameEl = document.querySelector('[data-js="mobile-user-name"]');
    const mobileUserTypeEl = document.querySelector('[data-js="mobile-user-type"]');
    
    // Update dashboard links
    this.updateDashboardLinks(dashboardUrl);
    
    if (mobileUserNameEl) {
      mobileUserNameEl.textContent = userName;
    }
    if (mobileUserTypeEl) {
      mobileUserTypeEl.textContent = userType;
    }
  }
  
  getUserTypeLabel(type) {
    const labels = {
      proprietario: 'Proprietario',
      associazione: 'Associazione',
      volontario: 'Volontario',
      admin: 'Amministratore'
    };
    
    if (window.i18n) {
      return window.i18n.t(`auth.userType.${type}`, labels[type]);
    }
    
    return labels[type] || type;
  }
  
  getDashboardUrl(userType) {
    const dashboardUrls = {
      proprietario: '/dashboard/owner.html',
      associazione: '/dashboard/association.html',
      volontario: '/dashboard/volunteer.html',
      admin: '/admin/dashboard.html'
    };
    
    return dashboardUrls[userType] || '/dashboard';
  }
  
  updateDashboardLinks(dashboardUrl) {
    // Update all dashboard links in the page
    const dashboardLinks = document.querySelectorAll('a[href="/dashboard"], a[data-i18n="nav.dashboard"]');
    
    dashboardLinks.forEach(link => {
      if (link.href || link.getAttribute('href')) {
        link.href = dashboardUrl;
      }
    });
  }
  
  toggleUserDropdown() {
    const userToggle = document.querySelector('[data-js="user-toggle"]');
    const isExpanded = userToggle.getAttribute('aria-expanded') === 'true';
    
    if (isExpanded) {
      this.closeUserDropdown();
    } else {
      this.openUserDropdown();
    }
  }
  
  openUserDropdown() {
    const userToggle = document.querySelector('[data-js="user-toggle"]');
    if (userToggle) {
      userToggle.setAttribute('aria-expanded', 'true');
    }
  }
  
  closeUserDropdown() {
    const userToggle = document.querySelector('[data-js="user-toggle"]');
    if (userToggle) {
      userToggle.setAttribute('aria-expanded', 'false');
    }
  }
  
  login(userData, token) {
    this.user = userData;
    this.token = token;
    
    // Determina se è un token demo
    const isDemoToken = token && token.startsWith('demo_token_');
    
    // Salva i dati
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isDemoToken', isDemoToken.toString());
    
    // Aggiorna UI
    this.showUserMenu();
    
    // Emetti evento personalizzato
    this.emitAuthEvent('login', { user: userData, isDemo: isDemoToken });
  }
  
  logout() {
    // Rimuovi dati dal localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('authExpiration');
    localStorage.removeItem('isDemoToken');
    
    // Reset stato interno
    this.user = null;
    this.token = null;
    
    // Aggiorna UI
    this.showAuthLinks();
    
    // Emetti evento personalizzato
    this.emitAuthEvent('logout');
    
    // Redirect alla home se necessario
    if (this.isProtectedPage()) {
      window.location.href = '/';
    }
  }
  
  isProtectedPage() {
    const protectedPaths = ['/dashboard', '/profilo', '/impostazioni'];
    const currentPath = window.location.pathname;
    
    return protectedPaths.some(path => currentPath.startsWith(path));
  }
  
  emitAuthEvent(type, data = {}) {
    const event = new CustomEvent(`auth:${type}`, {
      detail: data
    });
    document.dispatchEvent(event);
  }
  
  // Utility methods
  isAuthenticated() {
    return !!this.token && !!this.user;
  }
  
  getUser() {
    return this.user;
  }
  
  getToken() {
    return this.token;
  }
  
  getUserType() {
    return this.user ? this.user.type : null;
  }
  
  hasRole(role) {
    return this.getUserType() === role;
  }

  isDemoToken() {
    const token = localStorage.getItem('authToken');
    return token && token.startsWith('demo_token_');
  }

  isRealToken() {
    return !this.isDemoToken();
  }
}

// Inizializza il manager di autenticazione
document.addEventListener('DOMContentLoaded', function() {
  window.authManager = new AuthManager();
  
  // Esponi metodi globali per compatibilità
  window.login = (userData, token) => window.authManager.login(userData, token);
  window.logout = () => window.authManager.logout();
  window.isAuthenticated = () => window.authManager.isAuthenticated();
}); 