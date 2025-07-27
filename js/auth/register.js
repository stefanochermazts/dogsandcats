// Registration Form Handler

class RegistrationForm {
  constructor() {
    this.form = document.getElementById('registerForm');
    this.userTypeRadios = document.querySelectorAll('input[name="userType"]');
    this.associationFields = document.getElementById('associationFields');
    this.passwordToggles = document.querySelectorAll('[data-js="password-toggle"]');
    
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    this.setupPasswordToggles();
    this.setupUserTypeToggle();
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
    
    // Password confirmation
    const confirmPassword = document.getElementById('confirmPassword');
    if (confirmPassword) {
      confirmPassword.addEventListener('input', () => this.validatePasswordMatch());
    }
  }
  
  setupPasswordToggles() {
    this.passwordToggles.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const field = toggle.closest('.password-field');
        const input = field.querySelector('input');
        
        if (input.type === 'password') {
          input.type = 'text';
          field.classList.add('password-field--visible');
          toggle.setAttribute('aria-label', window.i18n ? window.i18n.t('auth.hidePassword') : 'Nascondi password');
        } else {
          input.type = 'password';
          field.classList.remove('password-field--visible');
          toggle.setAttribute('aria-label', window.i18n ? window.i18n.t('auth.showPassword') : 'Mostra password');
        }
      });
    });
  }
  
  setupUserTypeToggle() {
    this.userTypeRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        this.toggleConditionalFields();
      });
    });
  }
  
  toggleConditionalFields() {
    const selectedType = document.querySelector('input[name="userType"]:checked').value;
    
    if (selectedType === 'associazione') {
      this.associationFields.style.display = 'block';
      this.setFieldsRequired(this.associationFields, true);
    } else {
      this.associationFields.style.display = 'none';
      this.setFieldsRequired(this.associationFields, false);
    }
  }
  
  setFieldsRequired(container, required) {
    const inputs = container.querySelectorAll('input[required], input[data-required="true"]');
    inputs.forEach(input => {
      if (required) {
        input.setAttribute('required', '');
        input.setAttribute('data-required', 'true');
      } else {
        input.removeAttribute('required');
        input.removeAttribute('data-required');
      }
    });
  }
  
  async handleSubmit(e) {
    e.preventDefault();
    
    if (!this.validateForm()) {
      return;
    }
    
    this.showLoading();
    
    try {
      const formData = this.getFormData();
      const result = await this.submitRegistration(formData);
      
      if (result.success) {
        this.showSuccess();
      } else {
        this.showError(result.message);
      }
    } catch (error) {
      console.error('Registration error:', error);
      this.showError(window.i18n ? window.i18n.t('auth.register.error') : 'Errore durante la registrazione');
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
    
    // Validate password match
    if (!this.validatePasswordMatch()) {
      isValid = false;
    }
    
    // Validate checkboxes
    if (!this.validateConsents()) {
      isValid = false;
    }
    
    return isValid;
  }
  
  validateField(input) {
    const value = input.value.trim();
    const fieldName = input.name;
    let isValid = true;
    let message = '';
    
    // Required validation
    if (input.hasAttribute('required') && !value) {
      isValid = false;
      message = this.getErrorMessage('required', fieldName);
    }
    
    // Email validation
    if (isValid && input.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        message = this.getErrorMessage('email');
      }
    }
    
    // Password validation
    if (isValid && input.type === 'password' && input.name === 'password' && value) {
      if (value.length < 8) {
        isValid = false;
        message = this.getErrorMessage('passwordLength');
      }
    }
    
    // VAT number validation (basic)
    if (isValid && input.name === 'vatNumber' && value) {
      if (value.length < 11) {
        isValid = false;
        message = this.getErrorMessage('vatNumber');
      }
    }
    
    this.displayFieldError(input, isValid ? '' : message);
    return isValid;
  }
  
  validatePasswordMatch() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (confirmPassword && password !== confirmPassword) {
      this.displayFieldError(
        document.getElementById('confirmPassword'),
        this.getErrorMessage('passwordMatch')
      );
      return false;
    }
    
    this.displayFieldError(document.getElementById('confirmPassword'), '');
    return true;
  }
  
  validateConsents() {
    const privacyConsent = document.getElementById('privacyConsent');
    const termsConsent = document.getElementById('termsConsent');
    let isValid = true;
    
    if (!privacyConsent.checked) {
      this.displayFieldError(privacyConsent, this.getErrorMessage('privacyRequired'));
      isValid = false;
    }
    
    if (!termsConsent.checked) {
      this.displayFieldError(termsConsent, this.getErrorMessage('termsRequired'));
      isValid = false;
    }
    
    return isValid;
  }
  
  getFormData() {
    const formData = new FormData(this.form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
      if (key.includes('Consent')) {
        data[key] = formData.has(key);
      } else {
        data[key] = value;
      }
    }
    
    return data;
  }
  
  async submitRegistration(data) {
    // Simulazione API call per ora
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Registration data:', data);
        
        // Simula successo
        resolve({
          success: true,
          message: 'Registrazione completata'
        });
      }, 2000);
    });
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
      email: 'Inserisci un indirizzo email valido',
      passwordLength: 'La password deve essere di almeno 8 caratteri',
      passwordMatch: 'Le password non coincidono',
      vatNumber: 'Inserisci un codice fiscale/partita IVA valido',
      privacyRequired: 'Devi accettare la Privacy Policy',
      termsRequired: 'Devi accettare i Termini di Servizio'
    };
    
    if (window.i18n) {
      return window.i18n.t(`auth.register.error.${type}`, { field: this.getFieldLabel(field) });
    }
    
    return messages[type] || 'Errore di validazione';
  }
  
  getFieldLabel(fieldName) {
    const labels = {
      firstName: 'Nome',
      lastName: 'Cognome',
      email: 'Email',
      password: 'Password',
      organizationName: 'Nome Organizzazione'
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
  
  showSuccess() {
    this.hideLoading();
    document.getElementById('successMessage').style.display = 'block';
    this.form.style.display = 'none';
  }
  
  showError(message) {
    this.hideLoading();
    // Implementa la visualizzazione degli errori se necessario
    alert(message); // Temporaneo
  }
}

// Inizializza quando il DOM è pronto
document.addEventListener('DOMContentLoaded', function() {
  new RegistrationForm();
}); 