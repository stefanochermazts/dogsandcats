// API.js - Chiamate fetch per il backend

const API_BASE_URL = '/api';

/**
 * Classe per gestire le chiamate API
 */
class ApiClient {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    };
  }

  /**
   * Effettua una richiesta HTTP
   * @param {string} endpoint - Endpoint dell'API
   * @param {Object} options - Opzioni della richiesta
   * @returns {Promise} - Promise con la risposta
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: { ...this.defaultHeaders, ...options.headers },
      ...options
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      
      return await response.text();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  /**
   * GET request
   * @param {string} endpoint - Endpoint dell'API
   * @param {Object} params - Parametri query
   * @returns {Promise} - Promise con la risposta
   */
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    
    return this.request(url, {
      method: 'GET'
    });
  }

  /**
   * POST request
   * @param {string} endpoint - Endpoint dell'API
   * @param {Object} data - Dati da inviare
   * @returns {Promise} - Promise con la risposta
   */
  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  /**
   * PUT request
   * @param {string} endpoint - Endpoint dell'API
   * @param {Object} data - Dati da inviare
   * @returns {Promise} - Promise con la risposta
   */
  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  /**
   * PATCH request
   * @param {string} endpoint - Endpoint dell'API
   * @param {Object} data - Dati da inviare
   * @returns {Promise} - Promise con la risposta
   */
  async patch(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  }

  /**
   * DELETE request
   * @param {string} endpoint - Endpoint dell'API
   * @returns {Promise} - Promise con la risposta
   */
  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE'
    });
  }

  /**
   * Upload file
   * @param {string} endpoint - Endpoint dell'API
   * @param {FormData} formData - FormData con i file
   * @returns {Promise} - Promise con la risposta
   */
  async upload(endpoint, formData) {
    return this.request(endpoint, {
      method: 'POST',
      body: formData,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    });
  }
}

// Istanza globale dell'API client
const api = new ApiClient();

// API specifiche per DogsAndCats

/**
 * API per gli animali
 */
export const animalsApi = {
  /**
   * Ottiene tutti gli animali
   * @param {Object} filters - Filtri per la ricerca
   * @returns {Promise} - Promise con gli animali
   */
  getAll: (filters = {}) => api.get('/animals', filters),

  /**
   * Ottiene un animale specifico
   * @param {number} id - ID dell'animale
   * @returns {Promise} - Promise con l'animale
   */
  getById: (id) => api.get(`/animals/${id}`),

  /**
   * Crea un nuovo animale
   * @param {Object} animalData - Dati dell'animale
   * @returns {Promise} - Promise con l'animale creato
   */
  create: (animalData) => api.post('/animals', animalData),

  /**
   * Aggiorna un animale
   * @param {number} id - ID dell'animale
   * @param {Object} animalData - Dati dell'animale
   * @returns {Promise} - Promise con l'animale aggiornato
   */
  update: (id, animalData) => api.put(`/animals/${id}`, animalData),

  /**
   * Elimina un animale
   * @param {number} id - ID dell'animale
   * @returns {Promise} - Promise con la risposta
   */
  delete: (id) => api.delete(`/animals/${id}`),

  /**
   * Cerca animali
   * @param {Object} searchParams - Parametri di ricerca
   * @returns {Promise} - Promise con gli animali trovati
   */
  search: (searchParams) => api.get('/animals/search', searchParams)
};

/**
 * API per le adozioni
 */
export const adoptionsApi = {
  /**
   * Ottiene tutte le adozioni
   * @param {Object} filters - Filtri per la ricerca
   * @returns {Promise} - Promise con le adozioni
   */
  getAll: (filters = {}) => api.get('/adoptions', filters),

  /**
   * Ottiene un'adozione specifica
   * @param {number} id - ID dell'adozione
   * @returns {Promise} - Promise con l'adozione
   */
  getById: (id) => api.get(`/adoptions/${id}`),

  /**
   * Crea una nuova adozione
   * @param {Object} adoptionData - Dati dell'adozione
   * @returns {Promise} - Promise con l'adozione creata
   */
  create: (adoptionData) => api.post('/adoptions', adoptionData),

  /**
   * Aggiorna un'adozione
   * @param {number} id - ID dell'adozione
   * @param {Object} adoptionData - Dati dell'adozione
   * @returns {Promise} - Promise con l'adozione aggiornata
   */
  update: (id, adoptionData) => api.put(`/adoptions/${id}`, adoptionData),

  /**
   * Elimina un'adozione
   * @param {number} id - ID dell'adozione
   * @returns {Promise} - Promise con la risposta
   */
  delete: (id) => api.delete(`/adoptions/${id}`)
};

/**
 * API per i memoriali
 */
export const memorialsApi = {
  /**
   * Ottiene tutti i memoriali
   * @param {Object} filters - Filtri per la ricerca
   * @returns {Promise} - Promise con i memoriali
   */
  getAll: (filters = {}) => api.get('/memorials', filters),

  /**
   * Ottiene un memoriale specifico
   * @param {number} id - ID del memoriale
   * @returns {Promise} - Promise con il memoriale
   */
  getById: (id) => api.get(`/memorials/${id}`),

  /**
   * Crea un nuovo memoriale
   * @param {Object} memorialData - Dati del memoriale
   * @returns {Promise} - Promise con il memoriale creato
   */
  create: (memorialData) => api.post('/memorials', memorialData),

  /**
   * Aggiorna un memoriale
   * @param {number} id - ID del memoriale
   * @param {Object} memorialData - Dati del memoriale
   * @returns {Promise} - Promise con il memoriale aggiornato
   */
  update: (id, memorialData) => api.put(`/memorials/${id}`, memorialData),

  /**
   * Elimina un memoriale
   * @param {number} id - ID del memoriale
   * @returns {Promise} - Promise con la risposta
   */
  delete: (id) => api.delete(`/memorials/${id}`)
};

/**
 * API per gli utenti
 */
export const usersApi = {
  /**
   * Registra un nuovo utente
   * @param {Object} userData - Dati dell'utente
   * @returns {Promise} - Promise con l'utente creato
   */
  register: (userData) => api.post('/auth/register', userData),

  /**
   * Effettua il login
   * @param {Object} credentials - Credenziali
   * @returns {Promise} - Promise con il token
   */
  login: (credentials) => api.post('/auth/login', credentials),

  /**
   * Effettua il logout
   * @returns {Promise} - Promise con la risposta
   */
  logout: () => api.post('/auth/logout'),

  /**
   * Ottiene il profilo utente
   * @returns {Promise} - Promise con il profilo
   */
  getProfile: () => api.get('/auth/profile'),

  /**
   * Aggiorna il profilo utente
   * @param {Object} profileData - Dati del profilo
   * @returns {Promise} - Promise con il profilo aggiornato
   */
  updateProfile: (profileData) => api.put('/auth/profile', profileData)
};

/**
 * API per i contatti
 */
export const contactApi = {
  /**
   * Invia un messaggio di contatto
   * @param {Object} messageData - Dati del messaggio
   * @returns {Promise} - Promise con la risposta
   */
  sendMessage: (messageData) => api.post('/contact', messageData)
};

/**
 * API per le statistiche
 */
export const statsApi = {
  /**
   * Ottiene le statistiche generali
   * @returns {Promise} - Promise con le statistiche
   */
  getGeneral: () => api.get('/stats/general'),

  /**
   * Ottiene le statistiche delle adozioni
   * @returns {Promise} - Promise con le statistiche
   */
  getAdoptions: () => api.get('/stats/adoptions'),

  /**
   * Ottiene le statistiche dei memoriali
   * @returns {Promise} - Promise con le statistiche
   */
  getMemorials: () => api.get('/stats/memorials')
};

// Esporta l'istanza API per uso diretto
export { api }; 