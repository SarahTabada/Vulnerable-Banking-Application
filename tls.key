:root {
  /* Banking Theme Colors */
  --primary-blue: #1a365d;
  --secondary-blue: #2d4a6b;
  --accent-blue: #3b82f6;
  --light-blue: #e6f2ff;
  --success-green: #10b981;
  --warning-yellow: #f59e0b;
  --danger-red: #ef4444;
  --text-dark: #1f2937;
  --text-light: #6b7280;
  --background-white: #ffffff;
  --background-gray: #f9fafb;
  --border-gray: #e5e7eb;
  --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);

  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1.6;
  font-weight: 400;
  color: var(--text-dark);
  background-color: var(--background-gray);
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  background-color: var(--background-gray);
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* Typography */
h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-blue);
  margin-bottom: 1rem;
}

h2 {
  font-size: 2rem;
  font-weight: 600;
  color: var(--primary-blue);
  margin-bottom: 0.75rem;
}

h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--secondary-blue);
  margin-bottom: 0.5rem;
}

p {
  color: var(--text-light);
  margin-bottom: 1rem;
}

/* Navigation */
.navbar {
  background-color: var(--primary-blue);
  color: white;
  padding: 0.75rem 1rem;
  box-shadow: var(--shadow);
  position: relative;
}

.navbar-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand {
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  text-decoration: none;
  white-space: nowrap;
}

/* Mobile menu button */
.mobile-menu-btn {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
}

.hamburger {
  width: 20px;
  height: 2px;
  background-color: white;
  margin: 2px 0;
  transition: 0.3s;
}

.mobile-menu-btn.active .hamburger:nth-child(1) {
  transform: rotate(-45deg) translate(-4px, 4px);
}

.mobile-menu-btn.active .hamburger:nth-child(2) {
  opacity: 0;
}

.mobile-menu-btn.active .hamburger:nth-child(3) {
  transform: rotate(45deg) translate(-4px, -4px);
}

/* Navbar menu */
.navbar-menu {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.navbar-nav {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 0.5rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  white-space: nowrap;
}

.nav-link:hover,
.nav-link.active {
  background-color: var(--secondary-blue);
}

.nav-icon {
  font-size: 1rem;
}

.nav-label {
  font-size: 0.875rem;
}

/* User dropdown */
.navbar-user {
  position: relative;
}

.user-dropdown {
  position: relative;
}

.user-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--secondary-blue);
  color: white;
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background-color 0.2s;
}

.user-toggle:hover {
  background-color: var(--accent-blue);
}

.user-avatar {
  font-size: 1rem;
}

.user-name {
  font-size: 0.875rem;
}

.dropdown-arrow {
  font-size: 0.625rem;
  transition: transform 0.2s;
}

.user-toggle.active .dropdown-arrow {
  transform: rotate(180deg);
}

.user-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: var(--background-white);
  border: 1px solid var(--border-gray);
  border-radius: 0.5rem;
  box-shadow: var(--shadow-lg);
  min-width: 200px;
  z-index: 1000;
  display: none;
  margin-top: 0.25rem;
}

.user-menu.show {
  display: block;
}

.user-info-dropdown {
  padding: 1rem;
  border-bottom: 1px solid var(--border-gray);
}

.user-details strong {
  display: block;
  color: var(--text-dark);
  font-size: 0.875rem;
}

.user-details small {
  color: var(--text-light);
  font-size: 0.75rem;
}

.dropdown-item {
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  color: var(--text-dark);
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.dropdown-item:hover {
  background-color: var(--background-gray);
}

/* Cards */
.card {
  background-color: var(--background-white);
  border-radius: 0.75rem;
  box-shadow: var(--shadow);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--border-gray);
}

.card-header {
  border-bottom: 1px solid var(--border-gray);
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--primary-blue);
  margin: 0;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

/* Buttons */
.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}

.btn-primary {
  background-color: var(--accent-blue);
  color: white;
}

.btn-primary:hover {
  background-color: var(--primary-blue);
}

.btn-secondary {
  background-color: var(--background-white);
  color: var(--accent-blue);
  border: 1px solid var(--accent-blue);
}

.btn-secondary:hover {
  background-color: var(--light-blue);
}

.btn-success {
  background-color: var(--success-green);
  color: white;
}

.btn-danger {
  background-color: var(--danger-red);
  color: white;
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

/* Forms */
.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  font-weight: 500;
  color: var(--text-dark);
  margin-bottom: 0.5rem;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-gray);
  border-radius: 0.5rem;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.2s;
}

.form-control:focus {
  outline: none;
  border-color: var(--accent-blue);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

/* Account Cards */
.account-card {
  background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
  color: white;
  border-radius: 1rem;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.account-card::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
}

.account-type {
  font-size: 0.875rem;
  opacity: 0.9;
  margin-bottom: 0.5rem;
}

.account-number {
  font-size: 1rem;
  font-family: 'Courier New', monospace;
  opacity: 0.8;
  margin-bottom: 1rem;
}

.account-balance {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.account-label {
  font-size: 0.875rem;
  opacity: 0.8;
}

/* Transaction List */
.transaction-list {
  border: 1px solid var(--border-gray);
  border-radius: 0.75rem;
  overflow: hidden;
}

.transaction-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--border-gray);
  background-color: var(--background-white);
  transition: background-color 0.2s;
}

.transaction-item:last-child {
  border-bottom: none;
}

.transaction-item:hover {
  background-color: var(--background-gray);
}

.transaction-info {
  flex: 1;
}

.transaction-description {
  font-weight: 500;
  color: var(--text-dark);
  margin-bottom: 0.25rem;
}

.transaction-date {
  font-size: 0.875rem;
  color: var(--text-light);
}

.transaction-amount {
  font-weight: 600;
  font-size: 1.125rem;
}

.transaction-amount.positive {
  color: var(--success-green);
}

.transaction-amount.negative {
  color: var(--danger-red);
}

/* Utility Classes */
.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}

.mt-4 {
  margin-top: 2rem;
}

.mb-4 {
  margin-bottom: 2rem;
}

.flex {
  display: flex;
}

.justify-between {
  justify-content: space-between;
}

.items-center {
  align-items: center;
}

.gap-4 {
  gap: 1rem;
}

/* Status badges */
.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 9999px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.status-success {
  background-color: rgba(16, 185, 129, 0.1);
  color: var(--success-green);
}

.status-pending {
  background-color: rgba(245, 158, 11, 0.1);
  color: var(--warning-yellow);
}

.status-failed {
  background-color: rgba(239, 68, 68, 0.1);
  color: var(--danger-red);
}

/* Responsive */
@media (max-width: 768px) {
  .navbar-container {
    flex-direction: column;
    gap: 1rem;
  }

  .navbar-nav {
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }

  .main-content {
    padding: 1rem;
  }

  .card-grid {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .transaction-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  h1 {
    font-size: 2rem;
  }
}

/* Login Page Styles */
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
  padding: 2rem;
}

.login-card {
  background-color: var(--background-white);
  border-radius: 1rem;
  box-shadow: var(--shadow-lg);
  padding: 3rem;
  width: 100%;
  max-width: 500px;
  position: relative;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-blue);
  margin-bottom: 0.5rem;
}

.login-subtitle {
  color: var(--text-light);
  font-size: 1.1rem;
  margin: 0;
}

.login-form {
  margin-bottom: 2rem;
}

.login-btn {
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 1rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  color: var(--text-dark);
  cursor: pointer;
}

.login-links {
  text-align: center;
  margin-top: 1.5rem;
  color: var(--text-light);
}

.login-links a {
  color: var(--accent-blue);
  text-decoration: none;
  font-weight: 500;
}

.login-links a:hover {
  text-decoration: underline;
}

.login-links span {
  margin: 0 0.5rem;
}

/* Demo Accounts Section */
.demo-accounts {
  border-top: 1px solid var(--border-gray);
  padding-top: 1.5rem;
  margin-top: 1.5rem;
}

.demo-accounts h3 {
  color: var(--primary-blue);
  margin-bottom: 0.5rem;
}

.demo-accounts p {
  color: var(--text-light);
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.demo-user-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.demo-user {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid var(--border-gray);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  background-color: var(--background-gray);
}

.demo-user:hover {
  border-color: var(--accent-blue);
  background-color: var(--light-blue);
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.demo-user-info strong {
  color: var(--text-dark);
  font-weight: 600;
}

.demo-user-info small {
  color: var(--text-light);
}

.demo-user-accounts {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.account-badge {
  background-color: var(--accent-blue);
  color: white;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  white-space: nowrap;
}

.login-footer {
  border-top: 1px solid var(--border-gray);
  padding-top: 1.5rem;
  text-align: center;
}

.security-notice p {
  color: var(--text-light);
  font-size: 0.85rem;
  margin: 0.25rem 0;
}

/* Login Page Responsive */
@media (max-width: 768px) {
  .login-container {
    padding: 1rem;
  }
  
  .login-card {
    padding: 2rem;
  }
  
  .login-title {
    font-size: 2rem;
  }
  
  .demo-user {
    flex-direction: column;
    gap: 0.75rem;
    text-align: center;
  }
  
  .demo-user-accounts {
    justify-content: center;
  }
}

/* Navbar Responsive */
@media (max-width: 1024px) {
  .navbar-nav {
    gap: 0.25rem;
  }
  
  .nav-link {
    padding: 0.375rem 0.5rem;
    font-size: 0.8125rem;
  }
  
  .nav-label {
    font-size: 0.8125rem;
  }
}

@media (max-width: 768px) {
  .navbar {
    padding: 0.75rem 1rem;
  }

  .mobile-menu-btn {
    display: flex;
  }

  .navbar-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: var(--primary-blue);
    border-top: 1px solid var(--secondary-blue);
    flex-direction: column;
    gap: 0;
    z-index: 999;
  }

  .navbar-menu.show {
    display: flex;
  }

  .navbar-nav {
    flex-direction: column;
    gap: 0;
    width: 100%;
    padding: 0.5rem 0;
  }

  .nav-link {
    padding: 0.75rem 1rem;
    border-radius: 0;
    justify-content: flex-start;
    font-size: 0.9375rem;
  }

  .nav-link:hover,
  .nav-link.active {
    background-color: var(--secondary-blue);
  }

  .navbar-user {
    width: 100%;
    border-top: 1px solid var(--secondary-blue);
    padding: 0.5rem 0;
  }

  .user-dropdown {
    width: 100%;
  }

  .user-toggle {
    width: 100%;
    justify-content: flex-start;
    padding: 0.75rem 1rem;
    border-radius: 0;
  }

  .user-menu {
    position: static;
    width: 100%;
    border: none;
    border-radius: 0;
    box-shadow: none;
    background: var(--secondary-blue);
    margin-top: 0;
  }

  .user-info-dropdown {
    background: var(--primary-blue);
    border-bottom: 1px solid var(--accent-blue);
  }

  .user-details strong {
    color: white;
  }

  .user-details small {
    color: var(--text-light-blue);
  }

  .dropdown-item {
    color: white;
    border-radius: 0;
    padding: 0.75rem 1rem;
  }

  .dropdown-item:hover {
    background-color: var(--accent-blue);
  }
}
