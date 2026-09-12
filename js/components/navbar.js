import { icons } from '../utils/icons.js';
import { Router } from '../router.js';
import { State } from '../state.js';

export function renderNavbar() {
  const user = State.getUser();
  return `
    <header class="navbar" id="main-navbar">
      <div class="container navbar-container">
        <a href="#/" class="navbar-logo">
          ${icons.shield}
          <span>Star Health Insurance Advisor</span>
        </a>
        <nav class="navbar-links desktop-only">
          <a href="#/" class="nav-link">Home</a>
          <a href="#/plans" class="nav-link">Plans</a>
          <a href="#/find-my-plan" class="nav-link">Find My Plan</a>
          <a href="#/about" class="nav-link">Why Us</a>
          <a href="#/faq" class="nav-link">FAQs</a>
          <a href="#/contact" class="nav-link">Contact</a>
        </nav>
        <div class="navbar-actions desktop-only">
          <a href="#/find-my-plan" class="btn btn-primary btn-sm">Find My Plan</a>
          ${user ? `
            <a href="#/dashboard" class="btn btn-ghost btn-sm btn-icon">
              ${icons.user} ${user.name}
            </a>
            <button class="btn btn-ghost btn-sm" id="logout-btn">${icons.logOut}</button>
          ` : `
            <button class="btn btn-outline btn-sm btn-icon" id="login-btn">
              ${icons.logIn} Login
            </button>
          `}
        </div>
        <button class="btn btn-ghost btn-icon mobile-menu-toggle mobile-only" id="mobile-menu-btn" aria-label="Toggle menu">
          ${icons.menu}
        </button>
      </div>
      <div class="mobile-menu-overlay" id="mobile-menu">
        <div class="mobile-menu-content">
          <button class="btn btn-ghost btn-icon mobile-menu-close" id="mobile-menu-close" aria-label="Close menu">
            ${icons.x}
          </button>
          <nav class="mobile-nav-links">
            <a href="#/" class="mobile-nav-link">Home</a>
            <a href="#/plans" class="mobile-nav-link">Plans</a>
            <a href="#/find-my-plan" class="mobile-nav-link">Find My Plan</a>
            <a href="#/about" class="mobile-nav-link">Why Us</a>
            <a href="#/faq" class="mobile-nav-link">FAQs</a>
            <a href="#/contact" class="mobile-nav-link">Contact</a>
          </nav>
          <div class="mobile-nav-actions">
            <a href="#/find-my-plan" class="btn btn-primary w-full">Find My Plan</a>
            ${user ? `
              <a href="#/dashboard" class="btn btn-outline w-full">${icons.user} Dashboard</a>
              <button class="btn btn-outline w-full" id="mobile-logout-btn">${icons.logOut} Logout</button>
            ` : `
              <button class="btn btn-outline w-full" id="mobile-login-btn">${icons.logIn} Login</button>
            `}
          </div>
        </div>
      </div>
    </header>
  `;
}

export function initNavbar() {
  const navbar = document.getElementById('main-navbar');
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileClose = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');

  // Scroll listener
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  });

  // Mobile toggle
  if (mobileBtn && mobileClose && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
    
    mobileClose.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // Active link highlighting
  const updateActiveLinks = () => {
    const currentHash = window.location.hash || '#/';
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
      if (link.getAttribute('href') === currentHash) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };
  
  window.addEventListener('hashchange', updateActiveLinks);
  updateActiveLinks();

  // Login/Logout hooks
  import('./login-modal.js').then(({ showLoginModal }) => {
    const loginBtn = document.getElementById('login-btn');
    const mobileLoginBtn = document.getElementById('mobile-login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const mobileLogoutBtn = document.getElementById('mobile-logout-btn');

    if (loginBtn) loginBtn.addEventListener('click', showLoginModal);
    if (mobileLoginBtn) mobileLoginBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
      showLoginModal();
    });
    
    const doLogout = () => {
      State.clearUser();
      window.location.reload();
    };

    if (logoutBtn) logoutBtn.addEventListener('click', doLogout);
    if (mobileLogoutBtn) mobileLogoutBtn.addEventListener('click', doLogout);
  });
}
