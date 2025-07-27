// Admin Authentication Guard - DEBUG VERSION

class AdminAuth {
  constructor() {
    this.baseURL = 'http://localhost:8001/api';
    this.init();
  }
  
  init() {
    console.log('🔧 AdminAuth: Initializing...');
    this.checkAdminAuth();
  }
  
  async checkAdminAuth() {
    try {
      console.log('🔧 AdminAuth: Starting auth check...');
      
      const token = localStorage.getItem('authToken');
      const userStr = localStorage.getItem('user');
      
      console.log('🔧 AdminAuth: Token found:', !!token);
      console.log('🔧 AdminAuth: User data found:', !!userStr);
      
      if (!token) {
        console.log('🔧 AdminAuth: No token found, redirecting to login');
        this.redirectToLogin();
        return;
      }
      
      // Se abbiamo i dati utente in localStorage, verifica prima quelli
      if (userStr) {
        const localUser = JSON.parse(userStr);
        console.log('🔧 AdminAuth: Local user data:', localUser);
        
        // Verifica che sia admin
        if (localUser.type !== 'admin') {
          console.log('🔧 AdminAuth: User is not admin, showing access denied');
          this.showAccessDenied();
          return;
        }
        
        // Se è un token demo, usa i dati locali
        if (token.startsWith('demo_token_')) {
          console.log('🔧 AdminAuth: Demo token detected, using local auth');
          this.updateUserInfo(localUser);
          this.showAdminContent();
          return;
        }
      }
      
      console.log('🔧 AdminAuth: Attempting backend authentication...');
      
      // Prova a verificare con il backend Laravel
      try {
        const response = await fetch(`${this.baseURL}/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          }
        });
        
        console.log('🔧 AdminAuth: Backend response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('🔧 AdminAuth: Backend response data:', data);
          
          if (data.success) {
            const user = data.data.user;
            
            // Verifica che sia admin
            if (user.userType !== 'admin') {
              console.log('🔧 AdminAuth: Backend user is not admin');
              this.showAccessDenied();
              return;
            }
            
            // Verifica che sia attivo
            if (!user.isActive) {
              console.log('🔧 AdminAuth: Backend user is not active');
              this.showAccountInactive();
              return;
            }
            
            // Verifica che sia verificato
            if (!user.emailVerified) {
              console.log('🔧 AdminAuth: Backend user email not verified');
              this.showEmailNotVerified();
              return;
            }
            
            console.log('🔧 AdminAuth: Backend authentication successful');
            // Utente valido - aggiorna UI
            this.updateUserInfo(user);
            this.showAdminContent();
            return;
          }
        }
        
        console.log('🔧 AdminAuth: Backend auth failed, response not ok');
        throw new Error('Backend auth failed');
        
      } catch (backendError) {
        console.warn('🔧 AdminAuth: Backend authentication failed:', backendError.message);
        
        // Se è un errore di token demo, usa direttamente i dati locali
        if (backendError.message.includes('demo_token') || backendError.message.includes('demo_token_detected')) {
          console.log('🔧 AdminAuth: Demo token error detected');
          if (userStr) {
            const localUser = JSON.parse(userStr);
            
            // Verifica che sia admin
            if (localUser.type === 'admin') {
              console.log('🔧 AdminAuth: Using demo token authentication for admin');
              this.updateUserInfo(localUser);
              this.showAdminContent();
              return;
            }
          }
        }
        
        // Fallback ai dati locali se il backend non è disponibile
        if (userStr) {
          const localUser = JSON.parse(userStr);
          console.log('🔧 AdminAuth: Trying local fallback with user:', localUser);
          
          // Verifica che sia admin
          if (localUser.type === 'admin') {
            console.log('🔧 AdminAuth: Using local authentication fallback for admin');
            this.updateUserInfo(localUser);
            this.showAdminContent();
            return;
          }
        }
        
        console.log('🔧 AdminAuth: No valid authentication found');
        throw new Error('No valid authentication found');
      }
      
    } catch (error) {
      console.error('🔧 AdminAuth: Admin auth check failed:', error);
      this.redirectToLogin();
    }
  }
  
  updateUserInfo(user) {
    console.log('🔧 AdminAuth: Updating user info:', user);
    
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
    
    console.log('🔧 AdminAuth: Normalized user:', normalizedUser);
    
    // Aggiorna nome utente nell'header
    const userNameElements = document.querySelectorAll('[data-js="admin-user-name"]');
    userNameElements.forEach(el => {
      el.textContent = normalizedUser.fullName;
    });
    
    // Salva info utente globalmente
    window.currentAdminUser = normalizedUser;
  }
  
  showAdminContent() {
    console.log('🔧 AdminAuth: Showing admin content');
    
    // Rimuovi eventuali overlay di loading
    const loadingOverlay = document.getElementById('adminLoadingOverlay');
    if (loadingOverlay) {
      loadingOverlay.remove();
    }
    
    // Mostra il contenuto
    document.body.style.visibility = 'visible';
  }
  
  redirectToLogin() {
    console.log('🔧 AdminAuth: Redirecting to login');
    
    // Salva l'URL corrente per il redirect dopo il login
    localStorage.setItem('adminRedirectUrl', window.location.pathname);
    
    // Redirect al login
    window.location.href = '../pages/auth/login.html';
  }
  
  showAccessDenied() {
    console.log('🔧 AdminAuth: Showing access denied');
    this.showErrorPage(
      'Accesso Negato', 
      'Non hai i permessi necessari per accedere all\'area amministratore.',
      'Torna alla Home',
      '../index.html'
    );
  }
  
  showAccountInactive() {
    console.log('🔧 AdminAuth: Showing account inactive');
    this.showErrorPage(
      'Account Non Attivo',
      'Il tuo account non è attivo. Contatta l\'amministratore.',
      'Logout',
      () => this.logout()
    );
  }
  
  showEmailNotVerified() {
    console.log('🔧 AdminAuth: Showing email not verified');
    this.showErrorPage(
      'Email Non Verificata',
      'Devi verificare la tua email prima di accedere all\'area amministratore.',
      'Torna alla Home',
      '../index.html'
    );
  }
  
  showErrorPage(title, message, buttonText, buttonAction) {
    console.log('🔧 AdminAuth: Showing error page:', title);
    
    // Nascondi tutto il contenuto
    document.body.innerHTML = `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        font-family: Arial, sans-serif;
        text-align: center;
        padding: 20px;
      ">
        <h1 style="color: #dc3545; margin-bottom: 20px;">${title}</h1>
        <p style="color: #6c757d; margin-bottom: 30px; max-width: 500px;">${message}</p>
        <button onclick="
          ${typeof buttonAction === 'function' ? 'window.adminAuth.logout()' : `window.location.href='${buttonAction}'`}
        " style="
          background: #dc3545;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        ">${buttonText}</button>
      </div>
    `;
  }
  
  async logout() {
    console.log('🔧 AdminAuth: Logging out');
    
    try {
      // Prova a fare logout dal backend
      const token = localStorage.getItem('authToken');
      if (token && !token.startsWith('demo_token_')) {
        await fetch(`${this.baseURL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          }
        });
      }
    } catch (error) {
      console.warn('🔧 AdminAuth: Backend logout failed:', error);
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

// Inizializza
window.adminAuth = new AdminAuth(); 