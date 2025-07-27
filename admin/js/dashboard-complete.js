// Dashboard Complete - Carica dati reali dal backend

class DashboardComplete {
  constructor() {
    this.baseURL = 'http://localhost:8001/api';
    this.init();
  }
  
  init() {
    console.log('🔧 Dashboard Complete: Initializing...');
    this.updateUserInfo();
    this.loadDashboardData();
  }
  
  updateUserInfo() {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        const userNameElement = document.querySelector('[data-js="admin-user-name"]');
        
        if (userNameElement) {
          userNameElement.textContent = `${user.firstName} ${user.lastName}`;
        }
        
        console.log('🔧 Dashboard Complete: User info updated');
      } catch (error) {
        console.error('🔧 Dashboard Complete: Error updating user info:', error);
      }
    }
  }
  
  async loadDashboardData() {
    try {
      console.log('🔧 Dashboard Complete: Loading dashboard data...');
      
      // Carica statistiche generali
      await this.loadGeneralStats();
      
      // Carica attività recenti
      await this.loadRecentActivity();
      
      console.log('🔧 Dashboard Complete: Dashboard data loaded successfully');
      
    } catch (error) {
      console.error('🔧 Dashboard Complete: Error loading dashboard data:', error);
      this.showFallbackData();
    }
  }
  
  async loadGeneralStats() {
    try {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        console.log('🔧 Dashboard Complete: No token found');
        this.showLoadingState('Caricamento statistiche...');
        return;
      }
      
      console.log('🔧 Dashboard Complete: Loading real stats from backend...');
      
      const response = await fetch(`${this.baseURL}/admin/dashboard/general`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('🔧 Dashboard Complete: General stats loaded:', data);
        this.updateStats(data.data);
      } else {
        throw new Error('Failed to load general stats');
      }
      
    } catch (error) {
      console.error('🔧 Dashboard Complete: Failed to load real stats:', error);
      this.showErrorState('Errore nel caricamento delle statistiche');
    }
  }
  
  async loadRecentActivity() {
    try {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        console.log('🔧 Dashboard Complete: No token found');
        this.showLoadingState('Caricamento attività...');
        return;
      }
      
      console.log('🔧 Dashboard Complete: Loading real activity from backend...');
      
      const response = await fetch(`${this.baseURL}/admin/dashboard/recent-activity`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('🔧 Dashboard Complete: Recent activity loaded:', data);
        this.updateActivity(data.data);
      } else {
        throw new Error('Failed to load recent activity');
      }
      
    } catch (error) {
      console.error('🔧 Dashboard Complete: Failed to load real activity:', error);
      this.showErrorState('Errore nel caricamento delle attività');
    }
  }
  
  updateStats(stats) {
    // Aggiorna le statistiche con dati reali
    if (stats.totalUsers !== undefined) {
      document.getElementById('totalUsers').textContent = stats.totalUsers.toLocaleString();
    }
    if (stats.totalAdoptions !== undefined) {
      document.getElementById('totalAdoptions').textContent = stats.totalAdoptions.toLocaleString();
    }
    if (stats.totalVolunteers !== undefined) {
      document.getElementById('totalVolunteers').textContent = stats.totalVolunteers.toLocaleString();
    }
    if (stats.totalAssociations !== undefined) {
      document.getElementById('totalAssociations').textContent = stats.totalAssociations.toLocaleString();
    }
    
    // Aggiorna i trend percentuali
    this.updateTrend('usersChange', stats.usersChange);
    this.updateTrend('adoptionsChange', stats.adoptionsChange);
    this.updateTrend('volunteersChange', stats.volunteersChange);
    this.updateTrend('associationsChange', stats.associationsChange);
  }
  
  updateTrend(statName, value) {
    if (value !== undefined) {
      const trendElements = document.querySelectorAll(`[data-trend="${statName}"]`);
      trendElements.forEach(element => {
        const isPositive = value >= 0;
        element.textContent = `${isPositive ? '+' : ''}${value}%`;
        element.className = `stat-card__trend ${isPositive ? 'stat-card__trend--positive' : 'stat-card__trend--negative'}`;
      });
    }
  }
  
  updateActivity(activities) {
    const container = document.getElementById('recentActivity');
    
    if (!activities || activities.length === 0) {
      container.innerHTML = `
        <div class="dashboard-activity__empty">
          <div class="dashboard-activity__empty-icon">📭</div>
          <h3 class="dashboard-activity__empty-title">Nessuna attività recente</h3>
          <p class="dashboard-activity__empty-description">Non ci sono attività da mostrare al momento.</p>
        </div>
      `;
      return;
    }
    
    container.innerHTML = activities.map(activity => `
      <div class="activity-item">
        <div class="activity-item__icon">
          ${this.getActivityIcon(activity.type)}
        </div>
        <div class="activity-item__content">
          <h4 class="activity-item__title">${activity.title}</h4>
          <p class="activity-item__description">${activity.description}</p>
          <span class="activity-item__time">${this.formatDate(activity.created_at)}</span>
        </div>
      </div>
    `).join('');
  }
  
  getActivityIcon(type) {
    const icons = {
      'user_registered': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="8.5" cy="7" r="4"/>
        <line x1="20" y1="8" x2="20" y2="14"/>
        <line x1="23" y1="11" x2="17" y2="11"/>
      </svg>`,
      'adoption': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>`,
      'volunteer': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>`,
      'association': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9,22 9,12 15,12 15,22"/>
      </svg>`,
      'default': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12,6 12,12 16,14"/>
      </svg>`
    };
    return icons[type] || icons.default;
  }
  
  formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Pochi minuti fa';
    } else if (diffInHours < 24) {
      return `${diffInHours} ore fa`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} giorni fa`;
    }
  }
  
  showLoadingState(message) {
    console.log('🔧 Dashboard Complete: Showing loading state:', message);
    
    // Mostra stato di caricamento per le statistiche
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
      card.classList.add('stat-card--loading');
    });
    
    document.getElementById('totalUsers').textContent = 'Caricamento...';
    document.getElementById('totalAdoptions').textContent = 'Caricamento...';
    document.getElementById('totalVolunteers').textContent = 'Caricamento...';
    document.getElementById('totalAssociations').textContent = 'Caricamento...';
    
    // Mostra stato di caricamento per le attività
    const container = document.getElementById('recentActivity');
    container.innerHTML = `
      <div class="activity-item activity-item--loading">
        <div class="activity-item__icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12,6 12,12 16,14"/>
          </svg>
        </div>
        <div class="activity-item__content">
          <h4 class="activity-item__title">Caricamento...</h4>
          <p class="activity-item__description">${message}</p>
          <span class="activity-item__time">Ora</span>
        </div>
      </div>
    `;
  }
  
  showErrorState(message) {
    console.log('🔧 Dashboard Complete: Showing error state:', message);
    
    // Mostra stato di errore per le statistiche
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
      card.classList.add('stat-card--error');
    });
    
    document.getElementById('totalUsers').textContent = 'Errore';
    document.getElementById('totalAdoptions').textContent = 'Errore';
    document.getElementById('totalVolunteers').textContent = 'Errore';
    document.getElementById('totalAssociations').textContent = 'Errore';
    
    // Mostra stato di errore per le attività
    const container = document.getElementById('recentActivity');
    container.innerHTML = `
      <div class="activity-item activity-item--error">
        <div class="activity-item__icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
        </div>
        <div class="activity-item__content">
          <h4 class="activity-item__title">Errore</h4>
          <p class="activity-item__description">${message}</p>
          <span class="activity-item__time">Ora</span>
        </div>
      </div>
    `;
  }
  
  showFallbackData() {
    console.log('🔧 Dashboard Complete: Showing fallback data');
    this.showErrorState('Impossibile caricare i dati reali. Verifica la connessione al backend.');
  }
}

// Inizializza quando il DOM è pronto
document.addEventListener('DOMContentLoaded', () => {
  window.dashboardComplete = new DashboardComplete();
}); 