// Banking Dashboard Home Page
import '../assets/styles/style.css'
import { renderNavbar, updateNavbarActive } from '../components/navbar.js'
import { 
  formatCurrency,
  formatDate 
} from '../assets/mockData.js'
import { getUserSpecificData, isAuthenticated } from '../utils/auth.js'

export async function renderHome() {
  // Check if user is authenticated
  if (!isAuthenticated()) {
    window.router.navigate('/login');
    return;
  }

  const appDiv = document.querySelector('#app')
  const userData = getUserSpecificData();
  
  if (!userData) {
    window.router.navigate('/login');
    return;
  }

  const { user, accounts, transactions } = userData;
  const recentTransactions = transactions.slice(0, 3);
  const totalBalance = accounts
    .filter(account => !account.type.includes('Credit') && !account.type.includes('Mortgage'))
    .reduce((total, account) => total + account.balance, 0);
  
  appDiv.innerHTML = `
    ${renderNavbar('/')}
    <div class="main-content">
      <div class="flex justify-between items-center mb-4">
        <div>
          <h1>Welcome back, ${user.firstName}!</h1>
          <p>Here's your account overview for today</p>
        </div>
        <div class="text-right">
          <div class="account-label">Total Balance</div>
          <div class="account-balance">${formatCurrency(totalBalance)}</div>
        </div>
      </div>

      <!-- Account Cards -->
      <div class="card-grid">
        ${accounts.map(account => `
          <div class="account-card">
            <div class="account-type">${account.type}</div>
            <div class="account-number">${account.accountNumber}</div>
            <div class="account-balance">${formatCurrency(account.balance)}</div>
            <div class="account-label">${account.nickname}</div>
          </div>
        `).join('')}
      </div>

      <!-- Quick Actions -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Quick Actions</h3>
        </div>
        <div class="flex gap-4">
          <a href="/transfer" class="btn btn-primary" data-link>Transfer Money</a>
          <a href="/payments" class="btn btn-secondary" data-link>Pay Bills</a>
          <a href="/transactions" class="btn btn-secondary" data-link>View Statements</a>
        </div>
      </div>

      <!-- Recent Transactions -->
      <div class="card">
        <div class="card-header">
          <div class="flex justify-between items-center">
            <h3 class="card-title">Recent Transactions</h3>
            <a href="/transactions" class="btn btn-sm btn-secondary" data-link>View All</a>
          </div>
        </div>
        <div class="transaction-list">
          ${recentTransactions.map(transaction => `
            <div class="transaction-item">
              <div class="transaction-info">
                <div class="transaction-description">${transaction.description}</div>
                <div class="transaction-date">${formatDate(transaction.date)}</div>
              </div>
              <div class="transaction-amount ${transaction.amount > 0 ? 'positive' : 'negative'}">
                ${formatCurrency(transaction.amount)}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Account Summary -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Account Summary</h3>
        </div>
        <div class="card-grid">
          <div>
            <h4>This Month</h4>
            <p>Total Deposits: <span class="transaction-amount positive">${formatCurrency(3500.00)}</span></p>
            <p>Total Withdrawals: <span class="transaction-amount negative">${formatCurrency(-1847.22)}</span></p>
            <p>Net Change: <span class="transaction-amount positive">${formatCurrency(1652.78)}</span></p>
          </div>
          <div>
            <h4>Account Status</h4>
            <p>All accounts are in good standing</p>
            <p>No pending transactions</p>
            <p>Last login: ${formatDate(new Date().toISOString().split('T')[0])}</p>
          </div>
        </div>
      </div>
    </div>
  `;

  // Update navbar active state
  updateNavbarActive('/');

  // Add event listeners for data-link elements
  document.querySelectorAll("[data-link]").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const router = window.router;
      if (router) {
        router.navigate(link.getAttribute("href"));
      }
    });
  });
}