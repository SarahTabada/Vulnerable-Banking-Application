// Simple Admin Dashboard page (mock data)
import '../assets/styles/style.css'
import { renderNavbar, updateNavbarActive } from '../components/navbar.js'
import { getCurrentUser, isAuthenticated } from '../utils/auth.js'

function getMockSiteStats() {
  // Try to read some mock global data from localStorage if present
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const alerts = JSON.parse(localStorage.getItem('securityAlerts') || '[]');

  // Aggregate transactions count if users have generated transactions
  let totalTransactions = 0;
  users.forEach(u => {
    if (u.transactions && Array.isArray(u.transactions)) totalTransactions += u.transactions.length;
  });

  return {
    totalUsers: users.length || 1,
    totalTransactions: totalTransactions || Math.floor(Math.random() * 500) + 50,
    openAlerts: alerts.length,
    recentAlerts: alerts.slice(-5).reverse()
  };
}

export async function renderAdmin() {
  if (!isAuthenticated()) {
    window.router.navigate('/login');
    return;
  }

  const currentUser = getCurrentUser();
  if (!currentUser || !(currentUser.isAdmin || currentUser.userType === 'admin')) {
    // Not authorized for admin - redirect to home
    window.router.navigate('/');
    return;
  }

  const stats = getMockSiteStats();
  const appDiv = document.querySelector('#app');

  appDiv.innerHTML = `
    ${renderNavbar('/admin')}
    <div class="main-content">
      <div class="card">
        <div class="card-header">
          <h1>Admin Dashboard</h1>
        </div>
        <div class="card-grid">
          <div class="stat-card">
            <h3>Users</h3>
            <p class="stat-value">${stats.totalUsers}</p>
          </div>
          <div class="stat-card">
            <h3>Transactions</h3>
            <p class="stat-value">${stats.totalTransactions}</p>
          </div>
          <div class="stat-card">
            <h3>Open Alerts</h3>
            <p class="stat-value">${stats.openAlerts}</p>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3>Recent Security Alerts</h3>
          </div>
          <div class="alerts-list">
            ${stats.recentAlerts.length ? stats.recentAlerts.map(a => `
              <div class="alert-item">
                <div><strong>${a.title}</strong> <small>${a.date}</small></div>
                <div>${a.detail}</div>
              </div>
            `).join('') : '<p>No recent alerts</p>'}
          </div>
        </div>

        
      </div>
    </div>
  `;

  updateNavbarActive('/admin');

  // No direct alert management actions available in the demo admin UI
}
