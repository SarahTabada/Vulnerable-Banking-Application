// Banking Navigation Component
import { getCurrentUser, logout } from '../utils/auth.js';

export function renderNavbar(currentPath = '/') {
  const currentUser = getCurrentUser();
  
  let navItems = [
    { path: '/', label: 'Dashboard', icon: '', shortLabel: 'Home' },
    { path: '/accounts', label: 'Accounts', icon: '', shortLabel: 'Accounts' },
    { path: '/transfer', label: 'Transfer', icon: '', shortLabel: 'Transfer' },
    { path: '/transactions', label: 'Transactions', icon: '', shortLabel: 'History' },
    { path: '/payments', label: 'Bill Pay', icon: '', shortLabel: 'Bills' },
    { path: '/profile', label: 'Profile', icon: '', shortLabel: 'Profile' }
  ];

  // Add admin link for admin users
  if (currentUser && (currentUser.isAdmin || currentUser.userType === 'admin')) {
    navItems.push({ path: '/admin', label: 'Admin', icon: '', shortLabel: 'Admin' });
  }

  return `
    <nav class="navbar">
      <div class="navbar-container">
        <a href="/" class="navbar-brand" data-link>
          BankName
        </a>
        
        <!-- Mobile menu button -->
        <button class="mobile-menu-btn" onclick="toggleMobileMenu()">
          <span class="hamburger"></span>
          <span class="hamburger"></span>
          <span class="hamburger"></span>
        </button>
        
        <div class="navbar-menu" id="navbarMenu">
          <ul class="navbar-nav">
            ${navItems.map(item => `
              <li>
                <a href="${item.path}" 
                   class="nav-link ${currentPath === item.path ? 'active' : ''}" 
                   data-link
                   title="${item.label}">
                  ${item.icon ? `<span class="nav-icon">${item.icon}</span>` : ''}
                  <span class="nav-label">${item.shortLabel}</span>
                </a>
              </li>
            `).join('')}
          </ul>
          
          ${currentUser ? `
            <div class="navbar-user">
              <div class="user-dropdown">
                <button class="user-toggle" onclick="toggleUserMenu()">
                  <span class="user-avatar"></span>
                  <span class="user-name">${currentUser.firstName}</span>
                  <span class="dropdown-arrow">v</span>
                </button>
                <div class="user-menu" id="userMenu">
                  <div class="user-info-dropdown">
                    <div class="user-details">
                      <strong>${currentUser.firstName} ${currentUser.lastName}</strong>
                      <small>${currentUser.email}</small>
                    </div>
                  </div>
                  <button class="dropdown-item" onclick="handleLogout()">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    </nav>
  `;
}

// Handle logout
window.handleLogout = function() {
  const confirmation = confirm('Are you sure you want to log out?');
  if (confirmation) {
    logout();
    window.router.navigate('/login');
  }
};

// Toggle mobile menu
window.toggleMobileMenu = function() {
  const menu = document.getElementById('navbarMenu');
  const btn = document.querySelector('.mobile-menu-btn');
  
  if (menu && btn) {
    menu.classList.toggle('show');
    btn.classList.toggle('active');
  }
};

// Toggle user dropdown menu
window.toggleUserMenu = function() {
  const userMenu = document.getElementById('userMenu');
  if (userMenu) {
    userMenu.classList.toggle('show');
  }
};

// Close menus when clicking outside
document.addEventListener('click', function(e) {
  // Close mobile menu
  if (!e.target.closest('.navbar-menu') && !e.target.closest('.mobile-menu-btn')) {
    const menu = document.getElementById('navbarMenu');
    const btn = document.querySelector('.mobile-menu-btn');
    if (menu && btn) {
      menu.classList.remove('show');
      btn.classList.remove('active');
    }
  }
  
  // Close user menu
  if (!e.target.closest('.user-dropdown')) {
    const userMenu = document.getElementById('userMenu');
    if (userMenu) {
      userMenu.classList.remove('show');
    }
  }
});

// Helper function to update navbar active state
export function updateNavbarActive(currentPath) {
  document.querySelectorAll('.navbar-nav a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
}