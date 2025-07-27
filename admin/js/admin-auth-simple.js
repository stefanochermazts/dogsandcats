// Admin Authentication - VERSIONE SEMPLIFICATA

class AdminAuth {
  constructor() {
    this.init();
  }
  
  init() {
    console.log('🔧 AdminAuth Simple: Initializing...');
    this.checkAuth();
  }
  
  checkAuth() {
    try {
      console.log('🔧 AdminAuth Simple: Checking authentication...');
      
      const token = localStorage.getItem('authToken');
      const userStr = localStorage.getItem('user');
      
      console.log('🔧 AdminAuth Simple: Token:', !!token);
      console.log('🔧 AdminAuth Simple: User data:', !!userStr);
      
      if (!token || !userStr) {
        console.log('🔧 AdminAuth Simple: No auth data found, redirecting');
        this.redirectToLogin();
        return;
      }
      
      const user = JSON.parse(userStr);
      console.log('🔧 AdminAuth Simple: User:', user);
      
      // Verifica che sia admin
      if (user.type !== 'admin') {
        console.log('🔧 AdminAuth Simple: User is not admin');
        this.showAccessDenied();
        return;
      }
      
      console.log('🔧 AdminAuth Simple: Authentication successful!');
      this.updateUserInfo(user);
      this.showContent();
      
    } catch (error) {
      console.error('🔧 AdminAuth Simple: Error:', error);
      this.redirectToLogin();
    }
  }
  
  updateUserInfo(user) {
    console.log('🔧 AdminAuth Simple: Updating user info');
    
    const fullName = `${user.firstName || user.first_name} ${user.lastName || user.last_name}`;
    
    // Aggiorna nome utente nell'header
    const userNameElements = document.querySelectorAll('[data-js="admin-user-name"]');
    userNameElements.forEach(el => {
      el.textContent = fullName;
    });
    
    // Salva info utente globalmente
    window.currentAdminUser = user;
  }
  
  showContent() {
    console.log('🔧 AdminAuth Simple: Showing content');
    
    // Rimuovi eventuali overlay di loading
    const loadingOverlay = document.getElementById('adminLoadingOverlay');
    if (loadingOverlay) {
      loadingOverlay.remove();
    }
    
    // Mostra il contenuto
    document.body.style.visibility = 'visible';
  }
  
  redirectToLogin() {
    console.log('🔧 AdminAuth Simple: Redirecting to login');
    window.location.href = '../pages/auth/login.html';
  }
  
  showAccessDenied() {
    console.log('🔧 AdminAuth Simple: Showing access denied');
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
        <h1 style="color: #dc3545; margin-bottom: 20px;">Accesso Negato</h1>
        <p style="color: #6c757d; margin-bottom: 30px;">Non hai i permessi necessari per accedere all'area amministratore.</p>
        <button onclick="window.location.href='../index.html'" style="
          background: #dc3545;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        ">Torna alla Home</button>
      </div>
    `;
  }
  
  logout() {
    console.log('🔧 AdminAuth Simple: Logging out');
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('authExpiration');
    window.location.href = '../pages/auth/login.html';
  }
}

// Inizializza
window.adminAuth = new AdminAuth(); 