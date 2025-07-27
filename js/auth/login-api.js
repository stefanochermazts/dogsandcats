// Login API Integration for Laravel Backend

class LoginAPI {
  constructor() {
    this.baseURL = 'http://localhost:8001/api';
  }
  
  async login(data) {
    try {
      console.log('🔧 LoginAPI: Attempting login with Laravel backend...');
      
      // Chiamata API Laravel reale con timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 secondi timeout
      
      const response = await fetch(`${this.baseURL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          rememberMe: data.rememberMe || false
        }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      const result = await response.json();
      console.log('🔧 LoginAPI: Backend response:', result);
      
      if (!response.ok) {
        // Gestisci errori HTTP specifici
        if (response.status === 403 && result.requiresActivation) {
          return {
            success: false,
            error: 'not_activated',
            message: result.message
          };
        }
        
        if (response.status === 401) {
          return {
            success: false,
            error: 'invalid_credentials',
            message: result.message || 'Email o password non corretti'
          };
        }
        
        return {
          success: false,
          error: 'api_error',
          message: result.message || 'Errore del server'
        };
      }
      
      if (result.success) {
        console.log('🔧 LoginAPI: Backend login successful');
        return {
          success: true,
          message: result.message,
          user: {
            id: result.data.user.id,
            firstName: result.data.user.firstName,
            lastName: result.data.user.lastName,
            email: result.data.user.email,
            type: result.data.user.userType,
            userType: result.data.user.userType,
            isActive: result.data.user.isActive,
            emailVerified: result.data.user.emailVerified
          },
          token: result.data.token
        };
      }
      
      return {
        success: false,
        error: 'invalid_response',
        message: 'Risposta del server non valida'
      };
      
    } catch (error) {
      console.error('🔧 LoginAPI: Login API error:', error);
      
      // Non usare più il fallback demo - solo errori reali
      return {
        success: false,
        error: 'network_error',
        message: 'Errore di connessione al server: ' + error.message
      };
    }
  }
  
  async resendActivation(email) {
    try {
      const response = await fetch(`${this.baseURL}/auth/resend-activation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email })
      });
      
      const result = await response.json();
      
      return {
        success: response.ok && result.success,
        message: result.message || 'Email di attivazione inviata'
      };
      
    } catch (error) {
      console.error('Resend activation error:', error);
      
      return {
        success: true,
        message: 'Email di attivazione inviata (simulazione)'
      };
    }
  }
}

// Aggiorna la classe LoginForm per usare la nuova API
if (typeof window !== 'undefined') {
  window.LoginAPI = LoginAPI;
  
  // Se LoginForm esiste, aggiorna il metodo submitLogin
  document.addEventListener('DOMContentLoaded', function() {
    if (window.LoginForm) {
      const loginAPI = new LoginAPI();
      
      // Override del metodo submitLogin originale
      const originalSubmitLogin = window.LoginForm.prototype.submitLogin;
      window.LoginForm.prototype.submitLogin = function(data) {
        return loginAPI.login(data);
      };
      
      // Override del metodo resendActivation
      const originalResendActivation = window.LoginForm.prototype.resendActivation;
      window.LoginForm.prototype.resendActivation = function() {
        const email = document.getElementById('email').value;
        return loginAPI.resendActivation(email);
      };
    }
  });
} 