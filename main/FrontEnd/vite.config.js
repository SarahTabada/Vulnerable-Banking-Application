// Login Page
import '../assets/styles/style.css'
import { authenticateUser } from '../backend/api.js'

export async function renderLogin() {
  const appDiv = document.querySelector('#app')
  
  appDiv.innerHTML = `
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <h1 class="login-title">BankName</h1>
          <p class="login-subtitle">Secure Online Banking</p>
        </div>

        <form id="loginForm" class="login-form">
          <div class="form-group">
            <label class="form-label" for="username">Username or Email</label>
            <input type="text" class="form-control" id="username" required placeholder="Enter your username">
          </div>

          <div class="form-group">
            <label class="form-label" for="password">Password</label>
            <input type="password" class="form-control" id="password" required placeholder="Enter your password">
          </div>

          <div class="form-group">
            <label class="checkbox-label">
              <input type="checkbox" id="rememberMe"> Remember me
            </label>
          </div>

          <button type="submit" class="btn btn-primary login-btn" id="loginBtn">
            Sign In
          </button>

          <div class="login-links">
            <a href="#" id="forgotPasswordLink">Forgot Password?</a>
            <span>•</span>
            <a href="#" id="demoAccountsLink">Demo Accounts</a>
          </div>
        </form>

        <div id="demoAccounts" class="demo-accounts" style="display: none;">
          <h3>Demo User Accounts</h3>
          <p>Click any user below to login with their credentials:</p>
          
          <div class="demo-user-list">
            <div class="demo-user" data-username="john.doe">
              <div class="demo-user-info">
                <strong>John Doe</strong><br>
                <small>Personal Banking Customer</small>
              </div>
              <div class="demo-user-accounts">
                <span class="account-badge">Checking</span>
                <span class="account-badge">Savings</span>
                <span class="account-badge">Credit Card</span>
              </div>
            </div>

            <div class="demo-user" data-username="jane.smith">
              <div class="demo-user-info">
                <strong>Jane Smith</strong><br>
                <small>Business Account Holder</small>
              </div>
              <div class="demo-user-accounts">
                <span class="account-badge">Business Checking</span>
                <span class="account-badge">Business Savings</span>
                <span class="account-badge">Line of Credit</span>
              </div>
            </div>

            <div class="demo-user" data-username="admin">
              <div class="demo-user-info">
                <strong>Admin (Demo)</strong><br>
                <small>Administrator Access</small>
              </div>
              <div class="demo-user-accounts">
                <span class="account-badge">Admin</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Add form submission handler
  document.getElementById('loginForm').addEventListener('submit', handleLoginSubmit);
  
  // Set up demo accounts functionality
  setupDemoAccountsHandlers();
}

// Setup demo accounts event handlers
function setupDemoAccountsHandlers() {
  // Demo accounts toggle
  const demoAccountsLink = document.getElementById('demoAccountsLink');
  if (demoAccountsLink) {
    demoAccountsLink.addEventListener('click', function(e) {
      e.preventDefault();
      const demoDiv = document.getElementById('demoAccounts');
      if (demoDiv) {
        demoDiv.style.display = demoDiv.style.display === 'none' ? 'block' : 'none';
      }
    });
  }

  // Forgot password link
  const forgotPasswordLink = document.getElementById('forgotPasswordLink');
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', function(e) {
      e.preventDefault();
      alert('Forgot Password feature would redirect to password reset page');
    });
  }

  // Demo user selection
  document.addEventListener('click', function(e) {
    const demoUser = e.target.closest('.demo-user');
    if (demoUser) {
      const username = demoUser.getAttribute('data-username');
      if (username) {
        document.getElementById('username').value = username;
        const demoPwMap = {
          'john.doe': 'password123',
          'jane.smith': 'business456',
          'admin': 'admin123'
        };
        document.getElementById('password').value = demoPwMap[username] || '';
        document.getElementById('demoAccounts').style.display = 'none';
      }
    }
  });

  // Also keep the global functions for backwards compatibility
  window.showDemoAccounts = function() {
    const demoDiv = document.getElementById('demoAccounts');
    if (demoDiv) {
      demoDiv.style.display = demoDiv.style.display === 'none' ? 'block' : 'none';
    }
  };

  window.loginAsUser = function(username) {
    const demoPwMap = {
      'john.doe': 'password123',
      'jane.smith': 'business456',
      'admin': 'admin123'
    };
    document.getElementById('username').value = username;
    document.getElementById('password').value = demoPwMap[username] || '';
    document.getElementById('demoAccounts').style.display = 'none';
  };
}

// Handle login form submission
async function handleLoginSubmit(e) {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const rememberMe = document.getElementById('rememberMe').checked;
  
  const loginBtn = document.getElementById('loginBtn');
  loginBtn.textContent = 'Signing In...';
  loginBtn.disabled = true;

  try {
    // Call backend demo login endpoint
    const resp = await authenticateUser({ username, password });
    if (resp && resp.user) {
      localStorage.setItem('currentUser', JSON.stringify(resp.user));
      if (rememberMe) localStorage.setItem('rememberLogin', 'true');
      window.router.navigate('/');
    } else {
      throw new Error(resp && resp.error ? resp.error : 'Invalid username or password');
    }
    
  } catch (error) {
    alert(error.message);
    loginBtn.textContent = 'Sign In';
    loginBtn.disabled = false;
  }
}

// Demo credentials are seeded into the backend DB by the seed script.

