// Admin Authentication Guard

class AdminAuth {
  constructor() {
    this.baseURL = 'http://localhost:8001/api';
    this.init();
  }
  
  init() {
    this.checkAdminAuth();
  }
  
  async checkAdminAuth() {
    try {
      const token = localStorage.getItem('authToken');
      const userStr = localStorage.getItem('user');
      
      if (!token) {
        this.redirectToLogin();
        return;
      }
      
      // Se abbiamo i dati utente in localStorage, verifica prima quelli
      if (userStr) {
        const localUser = JSON.parse(userStr);
        
        // Verifica che sia admin
        if (localUser.type !== 'admin') {
          this.showAccessDenied();
          return;
        }
        
        // Se è un token demo, usa i dati locali
        if (token.startsWith('demo_token_')) {
          console.log('Using demo authentication for admin');
          this.updateUserInfo(localUser);
          this.showAdminContent();
          return;
        }
      }
      
      // Prova a verificare con il backend Laravel
      try {
        const response = await fetch(`${this.baseURL}/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          
          if (data.success) {
            const user = data.data.user;
            
            // Verifica che sia admin
            if (user.userType !== 'admin') {
              this.showAccessDenied();
              return;
            }
            
            // Verifica che sia attivo
            if (!user.isActive) {
              this.showAccountInactive();
              return;
            }
            
            // Verifica che sia verificato
            if (!user.emailVerified) {
              this.showEmailNotVerified();
              return;
            }
            
            // Utente valido - aggiorna UI
            this.updateUserInfo(user);
            this.showAdminContent();
            return;
          }
        }
        
        throw new Error('Backend auth failed');
        
      } catch (backendError) {
        console.warn('Backend authentication failed, checking local data:', backendError.message);
        
        // Se è un errore di token demo, usa direttamente i dati locali
        if (backendError.message.includes('demo_token') || backendError.message.includes('demo_token_detected')) {
          if (userStr) {
            const localUser = JSON.parse(userStr);
            
            // Verifica che sia admin
            if (localUser.type === 'admin') {
              console.log('Using demo token authentication for admin');
              this.updateUserInfo(localUser);
              this.showAdminContent();
              return;
            }
          }
        }
        
        // Fallback ai dati locali se il backend non è disponibile
        if (userStr) {
          const localUser = JSON.parse(userStr);
          
          // Verifica che sia admin
          if (localUser.type === 'admin') {
            console.log('Using local authentication fallback for admin');
            this.updateUserInfo(localUser);
            this.showAdminContent();
            return;
          }
        }
        
        throw new Error('No valid authentication found');
      }
      
    } catch (error) {
      console.error('Admin auth check failed:', error);
      this.redirectToLogin();
    }
  }
  
  updateUserInfo(user) {
    // Normalizza i dati utente per gestire formati diversi
    const normalizedUser = {
      id: user.id,
      firstName: user.firstName || user.first_name,
      lastName: user.lastName || user.last_name,
      email: user.email,
      userType: user.userType || user.type,
      fullName: user.fullName || `${user.firstName || user.first_name} ${user.lastName || user.last_name}`,
      isActive: user.isActive !== undefined ? user.isActive : true,
      emailVerified: user.emailVerified !== undefined ? user.emailVerified : true
    };
    
    // Aggiorna nome utente nell'header
    const userNameElements = document.querySelectorAll('[data-js="admin-user-name"]');
    userNameElements.forEach(el => {
      el.textContent = normalizedUser.fullName;
    });
    
    // Salva info utente globalmente
    window.currentAdminUser = normalizedUser;
  }
  
  showAdminContent() {
    // Rimuovi eventuali overlay di loading
    const loadingOverlay = document.getElementById('adminLoadingOverlay');
    if (loadingOverlay) {
      loadingOverlay.remove();
    }
    
    // Mostra il contenuto
    document.body.style.visibility = 'visible';
  }
  
  redirectToLogin() {
    // Salva l'URL corrente per il redirect dopo il login
    localStorage.setItem('adminRedirectUrl', window.location.pathname);
    
    // Redirect al login
    window.location.href = '../pages/auth/login.html';
  }
  
  showAccessDenied() {
    this.showErrorPage(
      'Accesso Negato', 
      'Non hai i permessi necessari per accedere all\'area amministratore.',
      'Torna alla Home',
      '../index.html'
    );
  }
  
  showAccountInactive() {
    this.showErrorPage(
      'Account Non Attivo',
      'Il tuo account non è attivo. Contatta l\'amministratore.',
      'Logout',
      () => this.logout()
    );
  }
  
  showEmailNotVerified() {
    this.showErrorPage(
      'Email Non Verificata',
      'Devi verificare la tua email prima di accedere all\'area amministratore.',
      'Logout',
      () => this.logout()
    );
  }
  
  showErrorPage(title, message, buttonText, buttonAction) {
    document.body.innerHTML = `
      <div style="
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--bg-secondary);
        padding: 2rem;
      ">
        <div style="
          max-width: 400px;
          padding: 3rem;
          background-color: var(--bg-primary);
          border-radius: 1rem;
          border: 1px solid var(--border-color);
          text-align: center;
        ">
          <div style="
            width: 4rem;
            height: 4rem;
            margin: 0 auto 1.5rem;
            background-color: var(--error-50);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--error-500);
          ">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
          </div>
          <h1 style="
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 0.75rem;
          ">${title}</h1>
          <p style="
            color: var(--text-secondary);
            margin-bottom: 2rem;
            line-height: 1.6;
          ">${message}</p>
          <button 
            onclick="${typeof buttonAction === 'string' ? `window.location.href='${buttonAction}'` : 'window.adminAuth.logout()'}"
            style="
              background-color: var(--primary-color);
              color: white;
              border: none;
              padding: 0.75rem 1.5rem;
              border-radius: 0.5rem;
              font-weight: 500;
              cursor: pointer;
              transition: background-color 0.2s;
            "
            onmouseover="this.style.backgroundColor='var(--primary-color-hover)'"
            onmouseout="this.style.backgroundColor='var(--primary-color)'"
          >${buttonText}</button>
        </div>
      </div>
    `;
  }
  
  async logout() {
    try {
      const token = localStorage.getItem('authToken');
      
      if (token) {
        await fetch(`${this.baseURL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          }
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
    
    // Pulisci localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('authExpiration');
    localStorage.removeItem('adminRedirectUrl');
    
    // Redirect al login
    window.location.href = '../pages/auth/login.html';
  }
}

// Crea overlay di loading iniziale
document.addEventListener('DOMContentLoaded', function() {
  // Nascondi il contenuto inizialmente
  document.body.style.visibility = 'hidden';
  
  // Crea overlay di loading
  const loadingOverlay = document.createElement('div');
  loadingOverlay.id = 'adminLoadingOverlay';
  loadingOverlay.innerHTML = `
    <div style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(--bg-secondary);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    ">
      <div style="text-align: center;">
        <div style="
          width: 2.5rem;
          height: 2.5rem;
          border: 3px solid var(--border-color);
          border-top-color: var(--primary-color);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        "></div>
        <p style="color: var(--text-secondary);">Verifica autenticazione...</p>
      </div>
    </div>
    <style>
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    </style>
  `;
  
  document.body.appendChild(loadingOverlay);
  
  // Inizializza controllo auth
  window.adminAuth = new AdminAuth();
}); 