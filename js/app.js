// ============================================================
// APP — Main Application Entry Point
// ============================================================
// Star Health Insurance Advisor — Premium SPA
// ============================================================

import { Router } from './router.js';
import { State } from './state.js';
import { initScrollAnimations } from './utils/animations.js';

// ── Initialize State ─────────────────────────────────────────
State.init();

// ── Component Imports (loaded eagerly) ───────────────────────
let navbarModule, footerModule, whatsappModule;

async function initShell() {
  // Load shell components
  const [navbar, footer, whatsapp] = await Promise.all([
    import('./components/navbar.js?v=1.3'),
    import('./components/footer.js?v=1.3'),
    import('./components/whatsapp-cta.js?v=1.3')
  ]);

  navbarModule = navbar;
  footerModule = footer;
  whatsappModule = whatsapp;

  // Render navbar
  const navRoot = document.getElementById('navbar-root');
  if (navRoot && navbar.renderNavbar) {
    navRoot.innerHTML = navbar.renderNavbar();
    if (navbar.initNavbar) navbar.initNavbar();
  }

  // Render footer
  const footerRoot = document.getElementById('footer-root');
  if (footerRoot && footer.renderFooter) {
    footerRoot.innerHTML = footer.renderFooter();
  }

  // Render WhatsApp FAB
  const whatsappRoot = document.getElementById('whatsapp-fab-root');
  if (whatsappRoot && whatsapp.renderWhatsAppFab) {
    whatsappRoot.innerHTML = whatsapp.renderWhatsAppFab();
  }
}

// ── Register Routes ──────────────────────────────────────────
// Pages are lazy-loaded for performance

Router.register('/', async () => {
  const module = await import('./pages/home.js?v=1.3');
  return module;
});

Router.register('/plans', async () => {
  const module = await import('./pages/plans.js?v=1.3');
  return module;
});

Router.register('/plans/:slug', async (params) => {
  const module = await import('./pages/plan-detail.js?v=1.3');
  return module;
});

Router.register('/plan/:slug', async (params) => {
  const module = await import('./pages/plan-detail.js?v=1.3');
  return module;
});

Router.register('/find-my-plan', async () => {
  const module = await import('./pages/find-my-plan.js?v=1.3');
  return module;
});

Router.register('/get-guidance', async () => {
  const module = await import('./pages/get-guidance.js?v=1.3');
  return module;
});

Router.register('/contact', async () => {
  const module = await import('./pages/contact.js?v=1.3');
  return module;
});

Router.register('/about', async () => {
  const module = await import('./pages/about.js?v=1.3');
  return module;
});

Router.register('/faq', async () => {
  const module = await import('./pages/faq.js?v=1.3');
  return module;
});

Router.register('/dashboard', async () => {
  const module = await import('./pages/dashboard.js?v=1.3');
  return module;
});

Router.register('/privacy', async () => {
  const module = await import('./pages/privacy.js?v=1.3');
  return module;
});

Router.register('/terms', async () => {
  const module = await import('./pages/terms.js?v=1.3');
  return module;
});

Router.register('/login', async () => {
  // Login is a modal, redirect to home and show modal
  const { showLoginModal } = await import('./components/login-modal.js?v=1.2');
  showLoginModal();
  // Return home page
  const module = await import('./pages/home.js?v=1.2');
  return module;
});

// ── Router Hooks ─────────────────────────────────────────────

// Update active nav link after navigation
Router.after((path) => {
  updateActiveNav(path);
  updatePageTitle(path);
});

function updateActiveNav(path) {
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPath = href.replace('#', '');

    if (path === linkPath || (linkPath !== '/' && path.startsWith(linkPath))) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function updatePageTitle(path) {
  const titles = {
    '/': 'Star Health Insurance Advisor — Find the Right Health Plan',
    '/plans': 'Health Insurance Plans — Star Health Insurance Advisor',
    '/find-my-plan': 'Find My Plan — Star Health Insurance Advisor',
    '/get-guidance': 'Get Personalised Guidance — Star Health Insurance Advisor',
    '/contact': 'Contact — Star Health Insurance Advisor',
    '/about': 'About Your Advisor — Star Health Insurance Advisor',
    '/faq': 'FAQs — Star Health Insurance Advisor',
    '/dashboard': 'Dashboard — Star Health Insurance Advisor',
    '/privacy': 'Privacy Policy — Star Health Insurance Advisor',
    '/terms': 'Terms of Service — Star Health Insurance Advisor'
  };

  document.title = titles[path] || 'Star Health Insurance Advisor';
}

// ── Toast Notifications ──────────────────────────────────────

State.subscribe('toast', ({ message, type }) => {
  showToast(message, type);
});

function showToast(message, type = 'info') {
  const toastRoot = document.getElementById('toast-root');
  if (!toastRoot) return;

  const iconMap = {
    success: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>',
    error: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    info: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
  };

  const toast = document.createElement('div');
  toast.className = `toast toast--${type} toast-enter`;
  toast.innerHTML = `${iconMap[type] || iconMap.info}<span>${message}</span>`;

  toastRoot.appendChild(toast);

  // Auto-remove after 4 seconds
  setTimeout(() => {
    toast.classList.remove('toast-enter');
    toast.classList.add('toast-exit');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// ── Login State Change ───────────────────────────────────────

State.subscribe('user', (user) => {
  // Re-render navbar to reflect login state
  if (navbarModule) {
    const navRoot = document.getElementById('navbar-root');
    if (navRoot && navbarModule.renderNavbar) {
      navRoot.innerHTML = navbarModule.renderNavbar();
      if (navbarModule.initNavbar) navbarModule.initNavbar();
      // Re-apply active state
      updateActiveNav(Router.getPath());
    }
  }
});

// ── Initialize App ───────────────────────────────────────────

async function init() {
  try {
    // Initialize shell (navbar, footer, whatsapp)
    await initShell();

    // Initialize router (handles first route)
    Router.init();

    // Log init
    console.log('🛡️ Star Health Insurance Advisor — Ready');
  } catch (error) {
    console.error('App initialization error:', error);
  }
}

// Start the app
init();
