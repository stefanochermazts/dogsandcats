// Users Management

class UsersManager {
  constructor() {
    this.currentPage = 1;
    this.perPage = 15;
    this.sortBy = 'created_at';
    this.sortOrder = 'desc';
    this.filters = {
      search: '',
      userType: '',
      isActive: '',
      emailVerified: ''
    };
    this.users = [];
    this.totalUsers = 0;
    
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    this.loadUsers();
    this.checkUrlParams();
  }
  
  checkUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Applica filtri da URL
    if (urlParams.get('filter') === 'unverified') {
      const verifiedFilter = document.querySelector('[data-js="filter-verified"]');
      if (verifiedFilter) {
        verifiedFilter.value = 'unverified';
        this.filters.emailVerified = 'unverified';
      }
    }
    
    // Se c'è un user ID, aprilo
    const userId = urlParams.get('user');
    if (userId) {
      setTimeout(() => this.viewUser(userId), 1000);
    }
  }
  
  setupEventListeners() {
    // Search input
    const searchInput = document.querySelector('[data-js="search-input"]');
    if (searchInput) {
      const debouncedSearch = window.adminCommon.debounce((value) => {
        this.filters.search = value;
        this.currentPage = 1;
        this.loadUsers();
        this.updateSearchClear(value);
      }, 500);
      
      searchInput.addEventListener('input', (e) => debouncedSearch(e.target.value));
    }
    
    // Search clear
    const searchClear = document.querySelector('[data-js="search-clear"]');
    if (searchClear) {
      searchClear.addEventListener('click', () => {
        const searchInput = document.querySelector('[data-js="search-input"]');
        if (searchInput) {
          searchInput.value = '';
          this.filters.search = '';
          this.currentPage = 1;
          this.loadUsers();
          this.updateSearchClear('');
        }
      });
    }
    
    // Filter selects
    this.setupFilterListeners();
    
    // Clear filters button
    const clearFilters = document.querySelector('[data-js="clear-filters"]');
    if (clearFilters) {
      clearFilters.addEventListener('click', () => this.clearAllFilters());
    }
    
    // Refresh button
    const refreshBtn = document.querySelector('[data-js="refresh-users"]');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => this.refreshUsers());
    }
    
    // Export button
    const exportBtn = document.querySelector('[data-js="export-users"]');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => this.exportUsers());
    }
    
    // Retry button
    const retryBtn = document.querySelector('[data-js="retry-users"]');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => this.loadUsers());
    }
    
    // Table sorting
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-js="sort"]')) {
        const sortButton = e.target.closest('[data-js="sort"]');
        const sortField = sortButton.dataset.sort;
        this.handleSort(sortField);
      }
    });
    
    // Modal handlers
    this.setupModalHandlers();
    
    // Pagination handlers
    this.setupPaginationHandlers();
  }
  
  setupFilterListeners() {
    const filters = ['filter-user-type', 'filter-status', 'filter-verified'];
    
    filters.forEach(filterId => {
      const filter = document.querySelector(`[data-js="${filterId}"]`);
      if (filter) {
        filter.addEventListener('change', (e) => {
          switch(filterId) {
            case 'filter-user-type':
              this.filters.userType = e.target.value;
              break;
            case 'filter-status':
              this.filters.isActive = e.target.value;
              break;
            case 'filter-verified':
              this.filters.emailVerified = e.target.value;
              break;
          }
          this.currentPage = 1;
          this.loadUsers();
        });
      }
    });
  }
  
  setupModalHandlers() {
    // Modal close buttons
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-js="modal-close"], [data-js="modal-backdrop"]')) {
        this.closeModal('userDetailModal');
      }
      
      if (e.target.matches('[data-js="delete-modal-close"], [data-js="delete-modal-backdrop"]')) {
        this.closeModal('confirmDeleteModal');
      }
    });
    
    // Confirm delete
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-js="confirm-delete"]')) {
        this.confirmDeleteUser();
      }
    });
    
    // Edit user
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-js="edit-user"]')) {
        // Implementa modal di edit o redirect
        alert('Funzionalità di modifica in arrivo');
      }
    });
  }
  
  setupPaginationHandlers() {
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-js="pagination-prev"]') && !e.target.disabled) {
        this.currentPage--;
        this.loadUsers();
      }
      
      if (e.target.matches('[data-js="pagination-next"]') && !e.target.disabled) {
        this.currentPage++;
        this.loadUsers();
      }
      
      if (e.target.matches('.pagination-page')) {
        const page = parseInt(e.target.dataset.page);
        if (page && page !== this.currentPage) {
          this.currentPage = page;
          this.loadUsers();
        }
      }
    });
  }
  
  async loadUsers() {
    try {
      this.showLoading();
      
      const params = new URLSearchParams({
        page: this.currentPage,
        per_page: this.perPage,
        sort_by: this.sortBy,
        sort_order: this.sortOrder,
        ...this.filters
      });
      
      // Rimuovi parametri vuoti
      for (let [key, value] of params.entries()) {
        if (!value) params.delete(key);
      }
      
      const response = await window.adminCommon.makeAuthenticatedRequest(
        `/admin/users?${params.toString()}`
      );
      
      if (response.success) {
        this.users = response.data.users;
        this.totalUsers = response.data.pagination.total;
        this.renderUsers();
        this.renderPagination(response.data.pagination);
        this.showContent();
      } else {
        throw new Error('Failed to load users');
      }
      
    } catch (error) {
      console.error('Users load error:', error);
      this.showError(error.message);
    }
  }
  
  renderUsers() {
    const tbody = document.querySelector('[data-js="users-table-body"]');
    if (!tbody) return;
    
    if (!this.users || this.users.length === 0) {
      this.showEmpty();
      return;
    }
    
    tbody.innerHTML = this.users.map(user => `
      <tr class="users-table__row">
        <td class="users-table__cell">${user.id}</td>
        <td class="users-table__cell">
          <div class="user-cell">
            <div class="user-cell__avatar">
              ${this.getInitials(user.first_name + ' ' + user.last_name)}
            </div>
            <div class="user-cell__info">
              <h4 class="user-cell__name">${user.first_name} ${user.last_name}</h4>
              <p class="user-cell__email">${user.email}</p>
            </div>
          </div>
        </td>
        <td class="users-table__cell">${user.email}</td>
        <td class="users-table__cell">
          <span class="user-type-badge user-type-badge--${user.user_type}">
            ${this.getUserTypeLabel(user.user_type)}
          </span>
        </td>
        <td class="users-table__cell">
          <div style="display: flex; flex-direction: column; gap: 0.25rem;">
            <span class="status-badge status-badge--${user.is_active ? 'active' : 'inactive'}">
              <span class="status-badge__dot"></span>
              ${user.is_active ? 'Attivo' : 'Non attivo'}
            </span>
            <span class="status-badge status-badge--${user.email_verified_at ? 'verified' : 'unverified'}">
              ${user.email_verified_at ? 'Verificato' : 'Non verificato'}
            </span>
          </div>
        </td>
        <td class="users-table__cell">
          <span class="time-display">${window.adminCommon.formatDate(user.created_at)}</span>
        </td>
        <td class="users-table__cell">
          <span class="time-display ${!user.last_login_at ? 'time-display--never' : ''}">
            ${user.last_login_at ? window.adminCommon.formatDate(user.last_login_at) : 'Mai'}
          </span>
        </td>
        <td class="users-table__cell">
          <div class="table-actions">
            <button class="table-action table-action--view" 
                    onclick="window.usersManager.viewUser(${user.id})"
                    title="Visualizza dettagli">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </button>
            <button class="table-action table-action--toggle" 
                    onclick="window.usersManager.toggleUserStatus(${user.id})"
                    title="${user.is_active ? 'Disattiva' : 'Attiva'} utente">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 1v6M12 17v6M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            </button>
            ${!user.email_verified_at ? `
              <button class="table-action table-action--edit" 
                      onclick="window.usersManager.verifyUserEmail(${user.id})"
                      title="Verifica email">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22,4 12,14.01 9,11.01"/>
                </svg>
              </button>
            ` : ''}
            ${user.user_type !== 'admin' ? `
              <button class="table-action table-action--delete" 
                      onclick="window.usersManager.deleteUser(${user.id}, '${user.first_name} ${user.last_name}')"
                      title="Elimina utente">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3,6 5,6 21,6"/>
                  <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2v2"/>
                  <line x1="10" y1="11" x2="10" y2="17"/>
                  <line x1="14" y1="11" x2="14" y2="17"/>
                </svg>
              </button>
            ` : ''}
          </div>
        </td>
      </tr>
    `).join('');
  }
  
  renderPagination(pagination) {
    const paginationContainer = document.getElementById('usersPagination');
    if (!paginationContainer) return;
    
    // Update pagination info
    const paginationInfo = document.querySelector('[data-js="pagination-info"]');
    if (paginationInfo) {
      paginationInfo.textContent = 
        `Visualizzati ${pagination.from || 0}-${pagination.to || 0} di ${pagination.total} utenti`;
    }
    
    // Update pagination buttons
    const prevBtn = document.querySelector('[data-js="pagination-prev"]');
    const nextBtn = document.querySelector('[data-js="pagination-next"]');
    
    if (prevBtn) {
      prevBtn.disabled = pagination.current_page <= 1;
    }
    
    if (nextBtn) {
      nextBtn.disabled = pagination.current_page >= pagination.last_page;
    }
    
    // Render page numbers
    const pagesContainer = document.querySelector('[data-js="pagination-pages"]');
    if (pagesContainer) {
      pagesContainer.innerHTML = this.generatePageNumbers(pagination);
    }
    
    paginationContainer.style.display = 'flex';
  }
  
  generatePageNumbers(pagination) {
    const { current_page: current, last_page: total } = pagination;
    const pages = [];
    
    // Logica per mostrare le pagine (max 7 pagine visibili)
    let start = Math.max(1, current - 3);
    let end = Math.min(total, current + 3);
    
    if (current <= 4) {
      end = Math.min(total, 7);
    }
    
    if (current > total - 4) {
      start = Math.max(1, total - 6);
    }
    
    // Prima pagina + ellipsis
    if (start > 1) {
      pages.push(`<button class="pagination-page" data-page="1">1</button>`);
      if (start > 2) {
        pages.push(`<span class="pagination-ellipsis">...</span>`);
      }
    }
    
    // Pagine centrali
    for (let i = start; i <= end; i++) {
      pages.push(
        `<button class="pagination-page ${i === current ? 'pagination-page--active' : ''}" data-page="${i}">${i}</button>`
      );
    }
    
    // Ellipsis + ultima pagina
    if (end < total) {
      if (end < total - 1) {
        pages.push(`<span class="pagination-ellipsis">...</span>`);
      }
      pages.push(`<button class="pagination-page" data-page="${total}">${total}</button>`);
    }
    
    return pages.join('');
  }
  
  async viewUser(userId) {
    try {
      const response = await window.adminCommon.makeAuthenticatedRequest(`/admin/users/${userId}`);
      
      if (response.success) {
        this.showUserModal(response.data);
      } else {
        throw new Error('Failed to load user details');
      }
      
    } catch (error) {
      console.error('Error loading user details:', error);
      window.adminCommon.showNotification('Errore nel caricamento dei dettagli utente', 'error');
    }
  }
  
  showUserModal(user) {
    const modal = document.getElementById('userDetailModal');
    const modalTitle = document.querySelector('[data-js="modal-user-name"]');
    const modalBody = document.querySelector('[data-js="modal-user-details"]');
    
    if (modalTitle) {
      modalTitle.textContent = `${user.first_name} ${user.last_name}`;
    }
    
    if (modalBody) {
      modalBody.innerHTML = `
        <div class="user-details">
          <div class="user-details__section">
            <h4>Informazioni Generali</h4>
            <div class="user-details__grid">
              <div class="user-details__item">
                <label>Nome Completo</label>
                <span>${user.full_name}</span>
              </div>
              <div class="user-details__item">
                <label>Email</label>
                <span>${user.email}</span>
              </div>
              <div class="user-details__item">
                <label>Tipo Utente</label>
                <span class="user-type-badge user-type-badge--${user.user_type}">${this.getUserTypeLabel(user.user_type)}</span>
              </div>
              <div class="user-details__item">
                <label>Telefono</label>
                <span>${user.phone || 'Non fornito'}</span>
              </div>
            </div>
          </div>
          
          ${user.organization_name ? `
            <div class="user-details__section">
              <h4>Informazioni Organizzazione</h4>
              <div class="user-details__grid">
                <div class="user-details__item">
                  <label>Nome Organizzazione</label>
                  <span>${user.organization_name}</span>
                </div>
                <div class="user-details__item">
                  <label>P.IVA / Codice Fiscale</label>
                  <span>${user.vat_number || 'Non fornito'}</span>
                </div>
              </div>
            </div>
          ` : ''}
          
          ${user.skills && user.skills.length > 0 ? `
            <div class="user-details__section">
              <h4>Competenze Volontario</h4>
              <div class="user-details__grid">
                <div class="user-details__item">
                  <label>Competenze</label>
                  <span>${Array.isArray(user.skills) ? user.skills.join(', ') : user.skills}</span>
                </div>
                <div class="user-details__item">
                  <label>Stato Disponibilità</label>
                  <span>${user.availability_status || 'Non specificato'}</span>
                </div>
              </div>
            </div>
          ` : ''}
          
          <div class="user-details__section">
            <h4>Stato Account</h4>
            <div class="user-details__grid">
              <div class="user-details__item">
                <label>Stato</label>
                <span class="status-badge status-badge--${user.is_active ? 'active' : 'inactive'}">
                  <span class="status-badge__dot"></span>
                  ${user.is_active ? 'Attivo' : 'Non attivo'}
                </span>
              </div>
              <div class="user-details__item">
                <label>Email Verificata</label>
                <span class="status-badge status-badge--${user.email_verified_at ? 'verified' : 'unverified'}">
                  ${user.email_verified_at ? 'Verificato' : 'Non verificato'}
                </span>
              </div>
              <div class="user-details__item">
                <label>Data Registrazione</label>
                <span>${window.adminCommon.formatDate(user.created_at)}</span>
              </div>
              <div class="user-details__item">
                <label>Ultimo Accesso</label>
                <span>${user.last_login_at ? window.adminCommon.formatDate(user.last_login_at) : 'Mai'}</span>
              </div>
            </div>
          </div>
          
          <div class="user-details__section">
            <h4>Consensi GDPR</h4>
            <div class="user-details__grid">
              <div class="user-details__item">
                <label>Privacy Policy</label>
                <span>${user.privacy_consent ? '✓ Accettata' : '✗ Non accettata'}</span>
              </div>
              <div class="user-details__item">
                <label>Termini e Condizioni</label>
                <span>${user.terms_consent ? '✓ Accettati' : '✗ Non accettati'}</span>
              </div>
              <div class="user-details__item">
                <label>Marketing</label>
                <span>${user.marketing_consent ? '✓ Accettato' : '✗ Non accettato'}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }
    
    this.showModal('userDetailModal');
  }
  
  async toggleUserStatus(userId) {
    try {
      const response = await window.adminCommon.makeAuthenticatedRequest(
        `/admin/users/${userId}/toggle-active`,
        { method: 'POST' }
      );
      
      if (response.success) {
        window.adminCommon.showNotification(response.message, 'success');
        this.loadUsers(); // Ricarica la tabella
      } else {
        throw new Error(response.message || 'Failed to toggle user status');
      }
      
    } catch (error) {
      console.error('Error toggling user status:', error);
      window.adminCommon.showNotification('Errore nell\'aggiornamento dello stato utente', 'error');
    }
  }
  
  async verifyUserEmail(userId) {
    try {
      const response = await window.adminCommon.makeAuthenticatedRequest(
        `/admin/users/${userId}/verify-email`,
        { method: 'POST' }
      );
      
      if (response.success) {
        window.adminCommon.showNotification(response.message, 'success');
        this.loadUsers(); // Ricarica la tabella
      } else {
        throw new Error(response.message || 'Failed to verify email');
      }
      
    } catch (error) {
      console.error('Error verifying email:', error);
      window.adminCommon.showNotification('Errore nella verifica dell\'email', 'error');
    }
  }
  
  deleteUser(userId, userName) {
    this.userToDelete = userId;
    
    const deleteModal = document.getElementById('confirmDeleteModal');
    const userNameEl = document.querySelector('[data-js="delete-user-name"]');
    
    if (userNameEl) {
      userNameEl.textContent = userName;
    }
    
    this.showModal('confirmDeleteModal');
  }
  
  async confirmDeleteUser() {
    if (!this.userToDelete) return;
    
    try {
      const response = await window.adminCommon.makeAuthenticatedRequest(
        `/admin/users/${this.userToDelete}`,
        { method: 'DELETE' }
      );
      
      if (response.success) {
        window.adminCommon.showNotification(response.message, 'success');
        this.closeModal('confirmDeleteModal');
        this.loadUsers(); // Ricarica la tabella
      } else {
        throw new Error(response.message || 'Failed to delete user');
      }
      
    } catch (error) {
      console.error('Error deleting user:', error);
      window.adminCommon.showNotification('Errore nell\'eliminazione dell\'utente', 'error');
    } finally {
      this.userToDelete = null;
    }
  }
  
  async exportUsers() {
    try {
      const params = new URLSearchParams({
        format: 'json',
        ...this.filters
      });
      
      // Rimuovi parametri vuoti
      for (let [key, value] of params.entries()) {
        if (!value) params.delete(key);
      }
      
      const response = await window.adminCommon.makeAuthenticatedRequest(
        `/admin/dashboard/export-users?${params.toString()}`
      );
      
      if (response.success) {
        // Crea e scarica file JSON
        const dataStr = JSON.stringify(response.data.users, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `utenti_dogsandcats_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        window.adminCommon.showNotification(
          `Esportati ${response.data.count} utenti`,
          'success'
        );
      } else {
        throw new Error('Failed to export users');
      }
      
    } catch (error) {
      console.error('Error exporting users:', error);
      window.adminCommon.showNotification('Errore nell\'esportazione degli utenti', 'error');
    }
  }
  
  handleSort(field) {
    if (this.sortBy === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = field;
      this.sortOrder = 'desc';
    }
    
    this.currentPage = 1;
    this.updateSortUI();
    this.loadUsers();
  }
  
  updateSortUI() {
    // Rimuovi classi di ordinamento precedenti
    document.querySelectorAll('.users-table__header--sorted-asc, .users-table__header--sorted-desc').forEach(el => {
      el.classList.remove('users-table__header--sorted-asc', 'users-table__header--sorted-desc');
    });
    
    // Aggiungi classe di ordinamento corrente
    const currentSortHeader = document.querySelector(`[data-sort="${this.sortBy}"]`);
    if (currentSortHeader) {
      currentSortHeader.classList.add(`users-table__header--sorted-${this.sortOrder}`);
    }
  }
  
  clearAllFilters() {
    // Reset filtri
    this.filters = {
      search: '',
      userType: '',
      isActive: '',
      emailVerified: ''
    };
    this.currentPage = 1;
    
    // Reset UI
    const searchInput = document.querySelector('[data-js="search-input"]');
    if (searchInput) searchInput.value = '';
    
    const filterSelects = document.querySelectorAll('.filter-select');
    filterSelects.forEach(select => select.value = '');
    
    this.updateSearchClear('');
    this.loadUsers();
  }
  
  refreshUsers() {
    this.loadUsers();
    window.adminCommon.showNotification('Elenco utenti aggiornato', 'success', 3000);
  }
  
  updateSearchClear(value) {
    const searchClear = document.querySelector('[data-js="search-clear"]');
    if (searchClear) {
      searchClear.style.display = value ? 'block' : 'none';
    }
  }
  
  showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  }
  
  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  }
  
  getUserTypeLabel(type) {
    const labels = {
      proprietario: 'Proprietario',
      associazione: 'Associazione',
      volontario: 'Volontario',
      admin: 'Admin'
    };
    return labels[type] || type;
  }
  
  getInitials(name) {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }
  
  showLoading() {
    const loading = document.getElementById('usersLoading');
    const table = document.getElementById('usersTable');
    const empty = document.getElementById('usersEmpty');
    const error = document.getElementById('usersError');
    const pagination = document.getElementById('usersPagination');
    
    if (loading) loading.style.display = 'block';
    if (table) table.style.display = 'none';
    if (empty) empty.style.display = 'none';
    if (error) error.style.display = 'none';
    if (pagination) pagination.style.display = 'none';
  }
  
  showContent() {
    const loading = document.getElementById('usersLoading');
    const table = document.getElementById('usersTable');
    const empty = document.getElementById('usersEmpty');
    const error = document.getElementById('usersError');
    
    if (loading) loading.style.display = 'none';
    if (table) table.style.display = 'block';
    if (empty) empty.style.display = 'none';
    if (error) error.style.display = 'none';
  }
  
  showEmpty() {
    const loading = document.getElementById('usersLoading');
    const table = document.getElementById('usersTable');
    const empty = document.getElementById('usersEmpty');
    const error = document.getElementById('usersError');
    const pagination = document.getElementById('usersPagination');
    
    if (loading) loading.style.display = 'none';
    if (table) table.style.display = 'none';
    if (empty) empty.style.display = 'block';
    if (error) error.style.display = 'none';
    if (pagination) pagination.style.display = 'none';
  }
  
  showError(message) {
    const loading = document.getElementById('usersLoading');
    const table = document.getElementById('usersTable');
    const empty = document.getElementById('usersEmpty');
    const error = document.getElementById('usersError');
    const errorMessage = document.querySelector('[data-js="users-error-message"]');
    const pagination = document.getElementById('usersPagination');
    
    if (loading) loading.style.display = 'none';
    if (table) table.style.display = 'none';
    if (empty) empty.style.display = 'none';
    if (error) error.style.display = 'block';
    if (pagination) pagination.style.display = 'none';
    if (errorMessage) errorMessage.textContent = message;
  }
}

// Inizializza users manager quando il DOM è pronto
document.addEventListener('DOMContentLoaded', function() {
  // Aspetta che admin auth sia completato
  setTimeout(() => {
    if (window.currentAdminUser) {
      window.usersManager = new UsersManager();
    }
  }, 500);
}); 