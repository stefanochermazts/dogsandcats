// Login Form Handler

class LoginForm {
  constructor() {
    this.form = document.getElementById('loginForm');
    this.passwordToggle = document.querySelector('[data-js="password-toggle"]');
    this.demoCredentials = document.getElementById('demoCredentials');
    
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    this.setupPasswordToggle();
    this.setupDemoAccounts();
  }
  
  setupEventListeners() {
    // Form submission
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    
    // Real-time validation
    const inputs = this.form.querySelectorAll('input');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
    });
    
    // Resend activation
    const resendBtn = document.getElementById('resendActivation');
    if (resendBtn) {
      resendBtn.addEventListener('click', () => this.resendActivation());
    }
  }
  
  setupPasswordToggle() {
    if (this.passwordToggle) {
      this.passwordToggle.addEventListener('click', (e) => {
        e.preventDefault();
        const field = this.passwordToggle.closest('.password-field');
        const input = field.querySelector('input');
        
        if (input.type === 'password') {
          input.type = 'text';
          field.classList.add('password-field--visible');
          this.passwordToggle.setAttribute('aria-label', window.i18n ? window.i18n.t('auth.hidePassword') : 'Nascondi password');
        } else {
          input.type = 'password';
          field.classList.remove('password-field--visible');
          this.passwordToggle.setAttribute('aria-label', window.i18n ? window.i18n.t('auth.showPassword') : 'Mostra password');
        }
      });
    }
  }
  
  setupDemoAccounts() {
    // Hide demo credentials in production
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      this.demoCredentials.style.display = 'none';
    }
    
    // Global function for demo buttons
    window.fillDemoCredentials = (email, password) => {
      document.getElementById('email').value = email;
      document.getElementById('password').value = password;
    };
  }
  
  async handleSubmit(e) {
    e.preventDefault();
    
    if (!this.validateForm()) {
      return;
    }
    
    this.showLoading();
    this.hideMessages();
    
    try {
      const formData = this.getFormData();
      const result = await this.submitLogin(formData);
      
      if (result.success) {
        this.handleSuccessfulLogin(result);
      } else {
        this.handleLoginError(result);
      }
    } catch (error) {
      console.error('Login error:', error);
      this.showError(window.i18n ? window.i18n.t('auth.login.error') : 'Errore durante l\'accesso');
    }
  }
  
  validateForm() {
    let isValid = true;
    const inputs = this.form.querySelectorAll('input[required]');
    
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });
    
    return isValid;
  }
  
  validateField(input) {
    const value = input.value.trim();
    let isValid = true;
    let message = '';
    
    // Required validation
    if (input.hasAttribute('required') && !value) {
      isValid = false;
      message = this.getErrorMessage('required', input.name);
    }
    
    // Email validation
    if (isValid && input.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        message = this.getErrorMessage('email');
      }
    }
    
    this.displayFieldError(input, isValid ? '' : message);
    return isValid;
  }
  
  getFormData() {
    const formData = new FormData(this.form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
      if (key === 'rememberMe') {
        data[key] = formData.has(key);
      } else {
        data[key] = value;
      }
    }
    
    return data;
  }
  
  async submitLogin(data) {
    // Simulazione API call per ora
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Login data:', data);
        
        // Simula diversi scenari basati sull'email
        if (data.email.includes('notactivated')) {
          resolve({
            success: false,
            error: 'not_activated',
            message: 'Account non attivato'
          });
        } else if (data.email.includes('invalid')) {
          resolve({
            success: false,
            error: 'invalid_credentials',
            message: 'Credenziali non valide'
          });
        } else {
          // Determina il tipo di utente dall'email
          let userType = 'proprietario';
          if (data.email.includes('associazione')) userType = 'associazione';
          if (data.email.includes('volontario')) userType = 'volontario';
          if (data.email.includes('admin')) userType = 'admin';
          
          // Dati specifici per tipo utente
          let userData = {
            id: 1,
            email: data.email,
            type: userType,
            firstName: 'Demo',
            lastName: 'User'
          };
          
          // Dati specifici per admin
          if (userType === 'admin') {
            userData = {
              id: 1,
              email: data.email,
              type: 'admin',
              firstName: 'Admin',
              lastName: 'Demo',
              userType: 'admin',
              isActive: true,
              emailVerified: true
            };
          }
          
          resolve({
            success: true,
            user: userData,
            token: 'demo_token_' + Date.now()
          });
        }
      }, 1500);
    });
  }
  
  handleSuccessfulLogin(result) {
    this.hideLoading();
    
    // Salva i dati di sessione
    this.saveUserSession(result);
    
    // Aggiorna l'auth manager globale se disponibile
    if (window.authManager) {
      window.authManager.login(result.user, result.token);
    }
    
    // Redirect basato sul tipo di utente (gestisce sia type che userType)
    const userType = result.user.type || result.user.userType;
    this.redirectUser(userType);
  }
  
  handleLoginError(result) {
    this.hideLoading();
    
    if (result.error === 'not_activated') {
      this.showActivationPrompt();
    } else {
      this.showError(result.message);
    }
  }
  
  saveUserSession(result) {
    // Salva token e dati utente
    localStorage.setItem('authToken', result.token);
    localStorage.setItem('user', JSON.stringify(result.user));
    
    // Se "Ricordami" è selezionato, salva per più tempo
    const rememberMe = document.getElementById('rememberMe').checked;
    if (rememberMe) {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 30);
      localStorage.setItem('authExpiration', expirationDate.toISOString());
    }
  }
  
  redirectUser(userType) {
    // URL di redirect basati sul tipo di utente
    const redirectUrls = {
      proprietario: '/dashboard/owner.html',
      associazione: '/dashboard/association.html',
      volontario: '/dashboard/volunteer.html',
      admin: '/admin/dashboard-complete.html'
    };
    
    const redirectUrl = redirectUrls[userType] || '/';
    
    // Mostra messaggio di successo prima del redirect
    this.showSuccessMessage(() => {
      window.location.href = redirectUrl;
    });
  }
  
  async resendActivation() {
    const email = document.getElementById('email').value;
    
    if (!email) {
      alert('Inserisci la tua email prima di richiedere una nuova attivazione');
      return;
    }
    
    try {
      // Simula invio email di attivazione
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Email di attivazione inviata nuovamente');
    } catch (error) {
      alert('Errore nell\'invio dell\'email di attivazione');
    }
  }
  
  displayFieldError(input, message) {
    const errorId = input.id + 'Error';
    const errorElement = document.getElementById(errorId);
    
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = message ? 'block' : 'none';
    }
    
    if (message) {
      input.classList.add('form__input--error');
    } else {
      input.classList.remove('form__input--error');
    }
  }
  
  clearFieldError(input) {
    this.displayFieldError(input, '');
  }
  
  getErrorMessage(type, field = '') {
    const messages = {
      required: `Il campo ${this.getFieldLabel(field)} è obbligatorio`,
      email: 'Inserisci un indirizzo email valido'
    };
    
    if (window.i18n) {
      return window.i18n.t(`auth.login.error.${type}`, { field: this.getFieldLabel(field) });
    }
    
    return messages[type] || 'Errore di validazione';
  }
  
  getFieldLabel(fieldName) {
    const labels = {
      email: 'Email',
      password: 'Password'
    };
    
    return labels[fieldName] || fieldName;
  }
  
  showLoading() {
    document.getElementById('loadingState').style.display = 'block';
    document.getElementById('submitBtn').disabled = true;
    this.form.style.opacity = '0.7';
  }
  
  hideLoading() {
    document.getElementById('loadingState').style.display = 'none';
    document.getElementById('submitBtn').disabled = false;
    this.form.style.opacity = '1';
  }
  
  hideMessages() {
    document.getElementById('loginError').style.display = 'none';
    document.getElementById('activationPrompt').style.display = 'none';
  }
  
  showError(message) {
    const errorElement = document.getElementById('loginError');
    const messageElement = document.getElementById('loginErrorMessage');
    
    messageElement.textContent = message;
    errorElement.style.display = 'block';
  }
  
  showActivationPrompt() {
    document.getElementById('activationPrompt').style.display = 'block';
  }
  
  showSuccessMessage(callback) {
    // Crea un messaggio di successo temporaneo
    const successDiv = document.createElement('div');
    successDiv.className = 'auth-success';
    successDiv.innerHTML = `
      <div class="auth-success__icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22,4 12,14.01 9,11.01"/>
        </svg>
      </div>
      <h3>Accesso effettuato!</h3>
      <p>Reindirizzamento in corso...</p>
    `;
    
    // Sostituisce il form con il messaggio di successo
    this.form.style.display = 'none';
    this.form.parentNode.insertBefore(successDiv, this.form);
    
    // Redirect dopo 2 secondi
    setTimeout(callback, 2000);
  }
}

// Inizializza quando il DOM è pronto
document.addEventListener('DOMContentLoaded', function() {
  new LoginForm();
}); 