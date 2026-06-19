// Accounts Page - View all account details
import '../assets/styles/style.css'
import { renderNavbar, updateNavbarActive } from '../components/navbar.js'
import { formatCurrency, formatDate } from '../assets/mockData.js'
import { fetchUserAccounts, fetchTransactions } from '../backend/api.js'

export async function renderAccounts() {
  const appDiv = document.querySelector('#app')

  // Load accounts from API
  let accounts = [];
  try {
    const accountsResp = await fetchUserAccounts();
    accounts = Array.isArray(accountsResp) ? accountsResp : (accountsResp.accounts || accountsResp.data || []);
  } catch (err) {
    console.error('Error fetching accounts:', err);
    accounts = [];
  }

  // Build accounts HTML (fetch small set of recent transactions per account)
  let accountsHtml = '';
  for (const account of accounts) {
    let transactions = [];
    try {
      const tResp = await fetchTransactions(account.id, { limit: 3 });
      transactions = Array.isArray(tResp) ? tResp : (tResp.transactions || tResp.data || []);
    } catch (e) {
      transactions = [];
    }

    accountsHtml += `
          <div class="card mb-4">
            <div class="account-card">
              <div class="account-type">${account.type}</div>
              <div class="account-number">${account.accountNumber || account.maskedNumber || ''}</div>
              <div class="account-balance">${formatCurrency(account.balance || 0)}</div>
              <div class="account-label">${account.nickname || ''}</div>
              ${account.type === 'Credit Card' ? `
                <div style="margin-top: 1rem; font-size: 0.875rem;">
                  Available Credit: ${formatCurrency(account.availableBalance || 0)}<br>
                  Credit Limit: ${formatCurrency(account.creditLimit || 0)}
                </div>
              ` : `
                <div style="margin-top: 1rem; font-size: 0.875rem;">
                  Available Balance: ${formatCurrency(account.availableBalance || account.balance || 0)}
                </div>
              `}
            </div>
            
            <div style="margin-top: 1.5rem;">
              <div class="flex justify-between items-center mb-3">
                <h4>Recent Activity</h4>
                <button class="btn btn-sm btn-secondary" onclick="viewAllTransactions(${account.id})">
                  View All
                </button>
              </div>
              
              ${transactions.length > 0 ? `
                <div class="transaction-list">
                  ${transactions.map(transaction => `
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
              ` : `
                <p class="text-center" style="color: var(--text-light); padding: 2rem;">
                  No recent transactions
                </p>
              `}
            </div>
            
            <div class="flex gap-4 mt-4">
              <button class="btn btn-primary" onclick="initiateTransfer(${account.id})">
                Transfer Money
              </button>
              <button class="btn btn-secondary" onclick="downloadStatement(${account.id})">
                Download Statement
              </button>
            </div>
          </div>
    `;
  }

  appDiv.innerHTML = `
    ${renderNavbar('/accounts')}
    <div class="main-content">
      <h1>My Accounts</h1>
      <p>View and manage your banking accounts</p>

      <!-- Account Details Cards -->
      ${accountsHtml}
      <!-- Account Actions -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Account Services</h3>
        </div>
        <div class="card-grid">
          <div>
            <h4>Digital Services</h4>
            <ul style="list-style: none; padding: 0;">
              <li style="margin-bottom: 0.5rem;">
                <button class="btn btn-secondary btn-sm"> eStatements</button>
              </li>
              <li style="margin-bottom: 0.5rem;">
                <button class="btn btn-secondary btn-sm"> Account Alerts</button>
              </li>
              <li style="margin-bottom: 0.5rem;">
                <button class="btn btn-secondary btn-sm"> Mobile Deposit</button>
              </li>
            </ul>
          </div>
          <div>
            <h4>Account Management</h4>
            <ul style="list-style: none; padding: 0;">
              <li style="margin-bottom: 0.5rem;">
                <button class="btn btn-secondary btn-sm"> Open New Account</button>
              </li>
              <li style="margin-bottom: 0.5rem;">
                <button class="btn btn-secondary btn-sm"> Freeze/Unfreeze Card</button>
              </li>
              <li style="margin-bottom: 0.5rem;">
                <button class="btn btn-secondary btn-sm"> Contact Support</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;

  // Update navbar active state
  updateNavbarActive('/accounts');

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

// Helper functions for account actions
window.viewAllTransactions = function(accountId) {
  const router = window.router;
  if (router) {
    router.navigate(`/transactions?account=${accountId}`);
  }
};

window.initiateTransfer = function(accountId) {
  const router = window.router;
  if (router) {
    router.navigate(`/transfer?from=${accountId}`);
  }
};

window.downloadStatement = function(accountId) {
  // In a real app, this would trigger a download
  alert(`Statement download would start for account ${accountId}`);
};