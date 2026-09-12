// ============================================================
// STATE — Simple Reactive State Management
// ============================================================

const STORAGE_KEY = 'star_health_advisor';

export const State = {
  _data: {},
  _subscribers: {},

  /**
   * Initialize state from localStorage
   */
  init() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        this._data = JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not load state from storage:', e);
      this._data = {};
    }

    // Set defaults
    if (!this._data.savedPlans) this._data.savedPlans = [];
    if (!this._data.comparePlans) this._data.comparePlans = [];
    if (!this._data.enquiries) this._data.enquiries = [];
    if (!this._data.familyMembers) this._data.familyMembers = [];
    if (!this._data.findMyPlan) this._data.findMyPlan = {};
  },

  /**
   * Get a value from state
   */
  get(key) {
    return this._data[key];
  },

  /**
   * Set a value in state (persists to localStorage)
   */
  set(key, value) {
    this._data[key] = value;
    this._persist();
    this._notify(key, value);
  },

  /**
   * Update a value (merge for objects)
   */
  update(key, updater) {
    const current = this._data[key];
    const newValue = typeof updater === 'function' ? updater(current) : { ...current, ...updater };
    this.set(key, newValue);
  },

  /**
   * Subscribe to state changes for a key
   */
  subscribe(key, callback) {
    if (!this._subscribers[key]) {
      this._subscribers[key] = [];
    }
    this._subscribers[key].push(callback);

    // Return unsubscribe function
    return () => {
      this._subscribers[key] = this._subscribers[key].filter(cb => cb !== callback);
    };
  },

  /**
   * Notify subscribers of a change
   */
  _notify(key, value) {
    if (this._subscribers[key]) {
      this._subscribers[key].forEach(cb => {
        try {
          cb(value);
        } catch (e) {
          console.warn('State subscriber error:', e);
        }
      });
    }

    // Also notify wildcard subscribers
    if (this._subscribers['*']) {
      this._subscribers['*'].forEach(cb => {
        try {
          cb(key, value);
        } catch (e) {
          console.warn('State subscriber error:', e);
        }
      });
    }
  },

  /**
   * Persist state to localStorage
   */
  _persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this._data));
    } catch (e) {
      console.warn('Could not persist state:', e);
    }
  },

  // ── User Management ──────────────────────────────────────

  getUser() {
    return this._data.user || null;
  },

  setUser(user) {
    this.set('user', user);
  },

  clearUser() {
    this.set('user', null);
  },

  isLoggedIn() {
    return !!this._data.user;
  },

  // ── Plan Comparison ──────────────────────────────────────

  getComparePlans() {
    return this._data.comparePlans || [];
  },

  addComparePlan(planSlug) {
    const plans = this.getComparePlans();
    if (!plans.includes(planSlug) && plans.length < 4) {
      this.set('comparePlans', [...plans, planSlug]);
      return true;
    }
    return false;
  },

  removeComparePlan(planSlug) {
    const plans = this.getComparePlans();
    this.set('comparePlans', plans.filter(s => s !== planSlug));
  },

  isInCompare(planSlug) {
    return this.getComparePlans().includes(planSlug);
  },

  clearCompare() {
    this.set('comparePlans', []);
  },

  // ── Saved Plans ──────────────────────────────────────────

  getSavedPlans() {
    return this._data.savedPlans || [];
  },

  toggleSavedPlan(planSlug) {
    const saved = this.getSavedPlans();
    if (saved.includes(planSlug)) {
      this.set('savedPlans', saved.filter(s => s !== planSlug));
    } else {
      this.set('savedPlans', [...saved, planSlug]);
    }
  },

  isPlanSaved(planSlug) {
    return this.getSavedPlans().includes(planSlug);
  },

  // ── Enquiries ────────────────────────────────────────────

  getEnquiries() {
    return this._data.enquiries || [];
  },

  addEnquiry(enquiry) {
    const enquiries = this.getEnquiries();
    const newEnquiry = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
      ...enquiry,
      createdAt: new Date().toISOString(),
      status: 'submitted'
    };
    this.set('enquiries', [...enquiries, newEnquiry]);
    return newEnquiry;
  },

  // ── Find My Plan Data ────────────────────────────────────

  getFindMyPlanData() {
    return this._data.findMyPlan || {};
  },

  setFindMyPlanData(data) {
    this.set('findMyPlan', data);
  },

  clearFindMyPlanData() {
    this.set('findMyPlan', {});
  },

  // ── Family Members ───────────────────────────────────────

  getFamilyMembers() {
    return this._data.familyMembers || [];
  },

  setFamilyMembers(members) {
    this.set('familyMembers', members);
  },

  addFamilyMember(member) {
    const members = this.getFamilyMembers();
    const newMember = {
      id: Date.now().toString(36),
      ...member
    };
    this.set('familyMembers', [...members, newMember]);
    return newMember;
  },

  removeFamilyMember(id) {
    const members = this.getFamilyMembers();
    this.set('familyMembers', members.filter(m => m.id !== id));
  },

  // ── Toast Helper ─────────────────────────────────────────

  showToast(message, type = 'info') {
    this._notify('toast', { message, type });
  }
};
