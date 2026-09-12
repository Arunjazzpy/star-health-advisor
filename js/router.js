// ============================================================
// ROUTER — Hash-based SPA Router
// ============================================================

export const Router = {
  routes: {},
  currentRoute: null,
  currentParams: {},
  beforeHooks: [],
  afterHooks: [],

  /**
   * Register a route handler
   * @param {string} path - Route path (e.g., '/plans', '/plans/:slug')
   * @param {Function} handler - Async function returning { render, mount, unmount }
   */
  register(path, handler) {
    this.routes[path] = handler;
  },

  /**
   * Add a before-navigation hook
   */
  before(hook) {
    this.beforeHooks.push(hook);
  },

  /**
   * Add an after-navigation hook
   */
  after(hook) {
    this.afterHooks.push(hook);
  },

  /**
   * Navigate to a path
   */
  navigate(path) {
    window.location.hash = path;
  },

  /**
   * Get current route params
   */
  getParams() {
    return { ...this.currentParams };
  },

  /**
   * Get current path
   */
  getCurrentPath() {
    return this.getPath();
  },

  /**
   * Extract path from hash
   */
  getPath() {
    const hash = window.location.hash.slice(1) || '/';
    return hash;
  },

  /**
   * Match path against registered routes
   */
  matchRoute(path) {
    // Exact match first
    if (this.routes[path]) {
      return { handler: this.routes[path], params: {} };
    }

    // Parametric match
    for (const [pattern, handler] of Object.entries(this.routes)) {
      const params = this.extractParams(pattern, path);
      if (params !== null) {
        return { handler, params };
      }
    }

    return null;
  },

  /**
   * Extract params from a path given a pattern
   */
  extractParams(pattern, path) {
    const patternParts = pattern.split('/');
    const pathParts = path.split('/');

    if (patternParts.length !== pathParts.length) return null;

    const params = {};
    for (let i = 0; i < patternParts.length; i++) {
      if (patternParts[i].startsWith(':')) {
        params[patternParts[i].slice(1)] = decodeURIComponent(pathParts[i]);
      } else if (patternParts[i] !== pathParts[i]) {
        return null;
      }
    }

    return params;
  },

  /**
   * Handle route change
   */
  async handleRoute() {
    const path = this.getPath();
    const match = this.matchRoute(path);

    if (!match) {
      // 404 - redirect to home
      this.navigate('/');
      return;
    }

    // Run before hooks
    for (const hook of this.beforeHooks) {
      const proceed = await hook(path, this.currentRoute);
      if (proceed === false) return;
    }

    // Unmount current page
    if (this.currentRoute?.unmount) {
      try {
        this.currentRoute.unmount();
      } catch (e) {
        console.warn('Error unmounting page:', e);
      }
    }

    this.currentParams = match.params;

    try {
      // Get page module
      const pageModule = await match.handler(match.params);
      this.currentRoute = pageModule;

      // Render
      const container = document.getElementById('page-content');
      if (container) {
        container.innerHTML = '';
        container.className = 'page-enter';

        const html = pageModule.render(match.params);
        container.innerHTML = html;

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'instant' });

        // Mount (attach event listeners)
        if (pageModule.mount) {
          // Small delay to allow DOM to render
          requestAnimationFrame(() => {
            pageModule.mount(match.params);
            
            // Initialize scroll animations
            if (window.initScrollAnimations) {
              window.initScrollAnimations();
            }
          });
        }
      }

      // Run after hooks
      for (const hook of this.afterHooks) {
        hook(path, match.params);
      }
    } catch (error) {
      console.error('Error rendering page:', error);
      const container = document.getElementById('page-content');
      if (container) {
        container.innerHTML = `
          <div class="page" style="display:flex;align-items:center;justify-content:center;min-height:60vh;">
            <div class="empty-state">
              <div class="empty-state__icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/>
                </svg>
              </div>
              <h3 class="empty-state__title">Something went wrong</h3>
              <p class="empty-state__desc">Please try refreshing the page.</p>
              <button class="btn btn-primary" onclick="location.hash='/'">Back to Home</button>
            </div>
          </div>
        `;
      }
    }
  },

  /**
   * Initialize the router
   */
  init() {
    // Listen for hash changes
    window.addEventListener('hashchange', () => this.handleRoute());

    // Handle initial route
    if (!window.location.hash) {
      window.location.hash = '/';
    } else {
      this.handleRoute();
    }
  }
};
