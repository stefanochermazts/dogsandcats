// Dashboard Management

class DashboardManager {
  constructor() {
    this.charts = {};
    this.refreshInterval = null;
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    this.loadDashboardData();
    this.setupAutoRefresh();
  }
  
  setupEventListeners() {
    // Refresh button
    const refreshBtn = document.querySelector('[data-js="refresh-dashboard"]');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => this.refreshDashboard());
    }
    
    // Chart filter
    const chartFilter = document.querySelector('[data-js="chart-filter"]');
    if (chartFilter) {
      chartFilter.addEventListener('change', (e) => this.updateRegistrationsChart(e.target.value));
    }
    
    // View all activity
    const viewAllActivity = document.querySelector('[data-js="view-all-activity"]');
    if (viewAllActivity) {
      viewAllActivity.addEventListener('click', (e) => {
        e.preventDefault();
        this.showAllActivity();
      });
    }
    
    // Manage unverified users
    const manageUnverified = document.querySelector('[data-js="manage-unverified"]');
    if (manageUnverified) {
      manageUnverified.addEventListener('click', () => {
        window.location.href = 'users.html?filter=unverified';
      });
    }
    
    // Retry button
    const retryBtn = document.querySelector('[data-js="retry-dashboard"]');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => this.loadDashboardData());
    }
  }
  
  setupAutoRefresh() {
    // Auto-refresh ogni 5 minuti
    this.refreshInterval = setInterval(() => {
      this.loadDashboardData(true); // silent refresh
    }, 5 * 60 * 1000);
  }
  
  async loadDashboardData(silent = false) {
    try {
      if (!silent) {
        this.showLoading();
      }
      
      const [statsData, activityData] = await Promise.all([
        window.adminCommon.makeAuthenticatedRequest('/admin/dashboard/stats'),
        window.adminCommon.makeAuthenticatedRequest('/admin/dashboard/recent-activity')
      ]);
      
      if (statsData.success && activityData.success) {
        this.updateStatistics(statsData.data);
        this.updateCharts(statsData.data);
        this.updateRecentActivity(activityData.data.activities);
        this.updateRecentUsers(statsData.data.recentUsers);
        this.updateAlerts(statsData.data.requiresAttention);
        this.showContent();
      } else {
        throw new Error('Invalid response data');
      }
      
    } catch (error) {
      console.error('Dashboard load error:', error);
      if (!silent) {
        this.showError(error.message);
      }
    }
  }
  
  refreshDashboard() {
    this.loadDashboardData();
    if (window.adminCommon) {
      window.adminCommon.showNotification('Dashboard aggiornata', 'success', 3000);
    }
  }
  
  updateStatistics(data) {
    const stats = data.userStats;
    
    // Total users
    this.updateStatCard('total-users', stats.total, `+${stats.new_this_month}`, 'questo mese');
    
    // Active users
    const activePercentage = stats.total > 0 ? Math.round((stats.active / stats.total) * 100) : 0;
    this.updateStatCard('active-users', stats.active, `${activePercentage}%`, 'del totale');
    
    // Verified users
    const verifiedPercentage = stats.total > 0 ? Math.round((stats.verified / stats.total) * 100) : 0;
    this.updateStatCard('verified-users', stats.verified, `${verifiedPercentage}%`, 'del totale');
    
    // Login today
    this.updateStatCard('login-today', stats.activity.active_today, stats.activity.active_this_week, 'questa settimana');
  }
  
  updateStatCard(cardType, value, changeValue, changeLabel) {
    const valueEl = document.querySelector(`[data-js="${cardType}"]`);
    const changeEl = document.querySelector(`[data-js="${cardType.replace('-', '-').replace('users', 'change').replace('today', 'change')}"]`);
    
    if (valueEl) {
      valueEl.textContent = this.formatNumber(value);
    }
    
    if (changeEl) {
      const changeValueEl = changeEl.querySelector('.stat-card__change-value');
      const changeLabelEl = changeEl.querySelector('.stat-card__change-label');
      
      if (changeValueEl) changeValueEl.textContent = changeValue;
      if (changeLabelEl) changeLabelEl.textContent = changeLabel;
    }
  }
  
  updateCharts(data) {
    this.updateRegistrationsChart(30, data.registrationsChart);
    this.updateUserTypesChart(data.userStats.by_type);
  }
  
  updateRegistrationsChart(days = 30, chartData = null) {
    const canvas = document.getElementById('registrationsChart');
    if (!canvas) return;
    
    // Distruggi chart esistente
    if (this.charts.registrations) {
      this.charts.registrations.destroy();
    }
    
    // Usa dati forniti o carica nuovi dati
    if (chartData) {
      this.renderRegistrationsChart(canvas, chartData);
    } else {
      this.loadRegistrationsData(days).then(data => {
        this.renderRegistrationsChart(canvas, data);
      });
    }
  }
  
  async loadRegistrationsData(days) {
    try {
      const response = await window.adminCommon.makeAuthenticatedRequest(
        `/admin/dashboard/advanced-stats?group_by=day&start_date=${this.getDateDaysAgo(days)}&end_date=${this.getDateToday()}`
      );
      
      if (response.success) {
        return response.data.registrations;
      }
      
      return [];
    } catch (error) {
      console.error('Error loading registrations data:', error);
      return [];
    }
  }
  
  renderRegistrationsChart(canvas, data) {
    const ctx = canvas.getContext('2d');
    
    // Prepara dati per Chart.js
    const labels = data.map(item => {
      const date = new Date(item.period);
      return date.toLocaleDateString('it-IT', { month: 'short', day: 'numeric' });
    });
    
    const datasets = [
      {
        label: 'Totale',
        data: data.map(item => item.total),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      },
      {
        label: 'Proprietari',
        data: data.map(item => item.proprietario),
        borderColor: 'rgb(139, 92, 246)',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.4
      },
      {
        label: 'Associazioni',
        data: data.map(item => item.associazione),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4
      },
      {
        label: 'Volontari',
        data: data.map(item => item.volontario),
        borderColor: 'rgb(251, 146, 60)',
        backgroundColor: 'rgba(251, 146, 60, 0.1)',
        tension: 0.4
      }
    ];
    
    this.charts.registrations = new Chart(ctx, {
      type: 'line',
      data: { labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              usePointStyle: true
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        },
        interaction: {
          intersect: false,
          mode: 'index'
        }
      }
    });
  }
  
  updateUserTypesChart(typeData) {
    const canvas = document.getElementById('userTypesChart');
    if (!canvas) return;
    
    // Distruggi chart esistente
    if (this.charts.userTypes) {
      this.charts.userTypes.destroy();
    }
    
    const ctx = canvas.getContext('2d');
    
    const data = {
      labels: ['Proprietari', 'Associazioni', 'Volontari', 'Admin'],
      datasets: [{
        data: [
          typeData.proprietario,
          typeData.associazione,
          typeData.volontario,
          typeData.admin
        ],
        backgroundColor: [
          'rgba(139, 92, 246, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 146, 60, 0.8)'
        ],
        borderColor: [
          'rgb(139, 92, 246)',
          'rgb(59, 130, 246)',
          'rgb(34, 197, 94)',
          'rgb(251, 146, 60)'
        ],
        borderWidth: 2
      }]
    };
    
    this.charts.userTypes = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              usePointStyle: true
            }
          }
        }
      }
    });
  }
  
  updateRecentActivity(activities) {
    const container = document.querySelector('[data-js="recent-activity"]');
    if (!container) return;
    
    if (!activities || activities.length === 0) {
      container.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">Nessuna attività recente</p>';
      return;
    }
    
    container.innerHTML = activities.slice(0, 8).map(activity => `
      <div class="activity-item">
        <div class="activity-item__icon activity-item__icon--${activity.type}">
          ${this.getActivityIcon(activity.type)}
        </div>
        <div class="activity-item__content">
          <p class="activity-item__description">${activity.description}</p>
          <span class="activity-item__time">${window.adminCommon.formatRelativeTime(activity.timestamp)}</span>
        </div>
      </div>
    `).join('');
  }
  
  updateRecentUsers(users) {
    const container = document.querySelector('[data-js="recent-users"]');
    if (!container) return;
    
    if (!users || users.length === 0) {
      container.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">Nessun utente recente</p>';
      return;
    }
    
    container.innerHTML = users.slice(0, 6).map(user => `
      <div class="user-item" onclick="this.handleUserClick(${user.id})">
        <div class="user-item__avatar">
          ${this.getInitials(user.fullName)}
        </div>
        <div class="user-item__info">
          <h4 class="user-item__name">${user.fullName}</h4>
          <div class="user-item__meta">
            <span class="user-item__type">${user.userTypeLabel}</span>
            <div class="user-item__status ${user.isActive ? '' : 'user-item__status--inactive'}"></div>
            <span>${window.adminCommon.formatRelativeTime(user.createdAt)}</span>
          </div>
        </div>
      </div>
    `).join('');
  }
  
  updateAlerts(attention) {
    const container = document.querySelector('[data-js="dashboard-alerts"]');
    if (!container) return;
    
    let hasAlerts = false;
    
    // Unverified users alert
    if (attention.unverified > 0) {
      const unverifiedCount = document.querySelector('[data-js="unverified-count"]');
      if (unverifiedCount) {
        unverifiedCount.textContent = attention.unverified;
      }
      hasAlerts = true;
    }
    
    // Show/hide alerts container
    container.style.display = hasAlerts ? 'block' : 'none';
  }
  
  getActivityIcon(type) {
    const icons = {
      registration: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="8.5" cy="7" r="4"/>
        <line x1="20" y1="8" x2="20" y2="14"/>
        <line x1="23" y1="11" x2="17" y2="11"/>
      </svg>`,
      login: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
        <polyline points="10,17 15,12 10,7"/>
        <line x1="15" y1="12" x2="3" y2="12"/>
      </svg>`
    };
    
    return icons[type] || icons.login;
  }
  
  getInitials(name) {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }
  
  formatNumber(num) {
    return new Intl.NumberFormat('it-IT').format(num);
  }
  
  getDateDaysAgo(days) {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date.toISOString().split('T')[0];
  }
  
  getDateToday() {
    return new Date().toISOString().split('T')[0];
  }
  
  showLoading() {
    const loading = document.getElementById('dashboardLoading');
    const content = document.getElementById('dashboardContent');
    const error = document.getElementById('dashboardError');
    
    if (loading) loading.style.display = 'block';
    if (content) content.style.display = 'none';
    if (error) error.style.display = 'none';
  }
  
  showContent() {
    const loading = document.getElementById('dashboardLoading');
    const content = document.getElementById('dashboardContent');
    const error = document.getElementById('dashboardError');
    
    if (loading) loading.style.display = 'none';
    if (content) content.style.display = 'block';
    if (error) error.style.display = 'none';
  }
  
  showError(message) {
    const loading = document.getElementById('dashboardLoading');
    const content = document.getElementById('dashboardContent');
    const error = document.getElementById('dashboardError');
    const errorMessage = document.querySelector('[data-js="error-message"]');
    
    if (loading) loading.style.display = 'none';
    if (content) content.style.display = 'none';
    if (error) error.style.display = 'block';
    if (errorMessage) errorMessage.textContent = message;
  }
  
  showAllActivity() {
    // Implementa modal o pagina separata per tutte le attività
    alert('Funzionalità in arrivo: visualizzazione completa delle attività');
  }
  
  destroy() {
    // Cleanup charts
    Object.values(this.charts).forEach(chart => {
      if (chart) chart.destroy();
    });
    
    // Clear refresh interval
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }
}

// Handle user click (definito globalmente per onclick)
window.handleUserClick = function(userId) {
  window.location.href = `users.html?user=${userId}`;
};

// Inizializza dashboard quando il DOM è pronto
document.addEventListener('DOMContentLoaded', function() {
  // Aspetta che admin auth sia completato
  setTimeout(() => {
    if (window.currentAdminUser) {
      window.dashboardManager = new DashboardManager();
    }
  }, 500);
});

// Cleanup quando si lascia la pagina
window.addEventListener('beforeunload', function() {
  if (window.dashboardManager) {
    window.dashboardManager.destroy();
  }
}); 