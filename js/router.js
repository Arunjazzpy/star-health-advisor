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
            try {
              pageModule.mount(match.params);
            } catch (mountErr) {
              console.warn('Page mount error:', mountErr);
            }
            
            // Initialize scroll animations
            if (window.initScrollAnimations) {
              window.initScrollAnimations();
            }
          });
        }
      }

      // Run after hooks
      for (const hook of this.afterHooks) {
        try {
          hook(path, match.params);
        } catch (hErr) {
          console.warn('After hook error:', hErr);
        }
      }
    } catch (error) {
      console.error('Error rendering page:', error);
      const container = document.getElementById('page-content');
      if (container) {
        // If find-my-plan failed, fall back smoothly to get-guidance
        if (path.includes('find-my-plan')) {
          try {
            const fallbackModule = await import('./pages/get-guidance.js');
            this.currentRoute = fallbackModule;
            container.innerHTML = fallbackModule.render(match.params);
            if (fallbackModule.mount) fallbackModule.mount(match.params);
            return;
          } catch (e2) {
            console.error('Fallback guidance load error:', e2);
          }
        }
        
        container.innerHTML = `
          <div class="page" style="display:flex;align-items:center;justify-content:center;min-height:60vh;">
            <div class="empty-state text-center p-8">
              <h3 class="empty-state__title text-2xl font-bold mb-2" style="color: #0F172A;">Something went wrong</h3>
              <p class="empty-state__desc text-gray-600 mb-6" style="color: #64748B;">Please try refreshing or restarting your selection.</p>
              <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
                <button class="btn btn-primary" onclick="localStorage.clear();location.hash='/get-guidance'">Get Personalised Guidance</button>
                <button class="btn btn-outline" onclick="location.hash='/'">Back to Home</button>
              </div>
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
