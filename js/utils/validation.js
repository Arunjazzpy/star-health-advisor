// ============================================================
// VALIDATION — Form Validation Utilities
// ============================================================

/**
 * Validate an email address
 */
export function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Validate Indian mobile number
 */
export function isValidPhone(phone) {
  if (!phone) return false;
  // Clean all non-digit characters and leading zeros or +91
  let cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('91') && cleaned.length > 10) {
    cleaned = cleaned.slice(2);
  }
  if (cleaned.startsWith('0')) {
    cleaned = cleaned.replace(/^0+/, '');
  }
  return /^[6-9]\d{9}$/.test(cleaned);
}

/**
 * Check if a value is non-empty
 */
export function isRequired(value) {
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return value !== null && value !== undefined;
}

/**
 * Validate age (1-120)
 */
export function isValidAge(age) {
  const num = parseInt(age, 10);
  return !isNaN(num) && num >= 1 && num <= 120;
}

/**
 * Validate name (letters, dots, hyphens, spaces, 2-60 chars)
 */
export function isValidName(name) {
  if (!name) return false;
  const trimmed = name.trim();
  return trimmed.length >= 2 && trimmed.length <= 60;
}

/**
 * Validate a full form and return errors object
 * @param {Object} values - Form field values { fieldName: value }
 * @param {Object} rules - Validation rules { fieldName: [{ test: fn, message: string }] }
 * @returns {Object} errors - { fieldName: errorMessage } or empty if valid
 */
export function validateForm(values, rules) {
  const errors = {};

  for (const [field, fieldRules] of Object.entries(rules)) {
    for (const rule of fieldRules) {
      if (!rule.test(values[field])) {
        errors[field] = rule.message;
        break; // Stop at first error for this field
      }
    }
  }

  return errors;
}

/**
 * Show form error for a specific field
 */
export function showFieldError(fieldId, message) {
  const field = document.getElementById(fieldId);
  if (!field) return;

  // Add error class
  field.classList.add('form-input--error');

  // Remove existing error message
  clearFieldError(fieldId);

  // Add error message
  const errorEl = document.createElement('div');
  errorEl.className = 'form-error';
  errorEl.id = `${fieldId}-error`;
  errorEl.setAttribute('role', 'alert');
  errorEl.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
    <span>${message}</span>
  `;

  field.parentElement.appendChild(errorEl);
  field.setAttribute('aria-describedby', `${fieldId}-error`);
}

/**
 * Clear error for a specific field
 */
export function clearFieldError(fieldId) {
  const field = document.getElementById(fieldId);
  if (!field) return;

  field.classList.remove('form-input--error');

  const errorEl = document.getElementById(`${fieldId}-error`);
  if (errorEl) errorEl.remove();

  field.removeAttribute('aria-describedby');
}

/**
 * Clear all form errors in a container
 */
export function clearAllErrors(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.querySelectorAll('.form-input--error').forEach(el => {
    el.classList.remove('form-input--error');
    el.removeAttribute('aria-describedby');
  });

  container.querySelectorAll('.form-error').forEach(el => el.remove());
}

/**
 * Format phone number for display
 */
export function formatPhone(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  if (cleaned.length === 12 && cleaned.startsWith('91')) {
    return `+91 ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
  }
  return phone;
}
