import { icons } from '../utils/icons.js';
import { plans } from '../data/plans.js';
import { State } from '../state.js';
import { Router } from '../router.js';
import { isValidEmail, isValidPhone, isRequired, isValidName, showFieldError, clearFieldError, clearAllErrors } from '../utils/validation.js';

let currentStep = 1;
const totalSteps = 3;

export function render(params) {
  currentStep = 1;
  const planOptions = plans.map(p => `<option value="${p.slug}">${p.name}</option>`).join('');

  return `
    <div class="guidance-page container section">
      <div class="guidance-page__header section-header text-center animate-on-scroll slide-up">
        <h1 class="section-title">Get Personalised Guidance</h1>
        <p class="section-subtitle">Share your requirements and an advisor will help you find the right plan.</p>
      </div>

      <div class="guidance-page__container" style="max-width: 800px; margin: 0 auto;">
        <!-- Step Indicators -->
        <div class="guidance-page__steps mb-8 flex justify-between relative" style="position: relative; display: flex; justify-content: space-between; margin-bottom: 2rem;">
          <div style="position: absolute; top: 50%; left: 0; right: 0; height: 2px; background: var(--color-border); z-index: 1; transform: translateY(-50%);"></div>
          <div class="step-indicator" data-step="1" style="position: relative; z-index: 2; background: var(--color-bg); padding: 0 10px; color: var(--color-primary); font-weight: 600;">1. Personal Info</div>
          <div class="step-indicator" data-step="2" style="position: relative; z-index: 2; background: var(--color-bg); padding: 0 10px; color: var(--color-text-secondary);">2. Requirements</div>
          <div class="step-indicator" data-step="3" style="position: relative; z-index: 2; background: var(--color-bg); padding: 0 10px; color: var(--color-text-secondary);">3. Review</div>
        </div>

        <div class="guidance-page__form card guidance-page__card p-8 shadow-md" style="background: var(--color-white); border-radius: 12px; padding: 2rem;">
          <form id="guidanceForm">
            <!-- Step 1: Personal Info -->
            <div id="step-1" class="form-step active-step">
              <h2 style="font-size: 1.5rem; margin-bottom: 1.5rem; color: var(--color-navy);">Personal Information</h2>
              
              <div class="form-group mb-4">
                <label class="form-label" for="name">Full Name *</label>
                <input type="text" id="name" name="name" class="form-input w-full p-3 border rounded" placeholder="Your name">
                <span class="form-error text-sm text-red-500 mt-1 hidden" id="error-name"></span>
              </div>
              
              <div class="form-group mb-4">
                <label class="form-label" for="mobile">Mobile Number *</label>
                <input type="tel" id="mobile" name="mobile" class="form-input w-full p-3 border rounded" placeholder="+91">
                <span class="form-error text-sm text-red-500 mt-1 hidden" id="error-mobile"></span>
              </div>
              
              <div class="form-group mb-4">
                <label class="form-label" for="email">Email Address *</label>
                <input type="email" id="email" name="email" class="form-input w-full p-3 border rounded" placeholder="your@email.com">
                <span class="form-error text-sm text-red-500 mt-1 hidden" id="error-email"></span>
              </div>
              
              <div class="form-group mb-6">
                <label class="form-label" for="location">City/State</label>
                <input type="text" id="location" name="location" class="form-input w-full p-3 border rounded" placeholder="Your city">
              </div>

              <div class="flex justify-end mt-6" style="display: flex; justify-content: flex-end;">
                <button type="button" class="btn btn-primary btn-next" data-next="2">Next Step ${icons.arrowRight}</button>
              </div>
            </div>

            <!-- Step 2: Requirements -->
            <div id="step-2" class="form-step hidden" style="display: none;">
              <h2 style="font-size: 1.5rem; margin-bottom: 1.5rem; color: var(--color-navy);">Your Requirements</h2>
              
              <div class="form-group mb-4">
                <label class="form-label" for="planInterest">Plan interested in</label>
                <select id="planInterest" name="planInterest" class="form-select w-full p-3 border rounded">
                  <option value="">Select a plan (optional)</option>
                  ${planOptions}
                </select>
              </div>

              <div class="grid grid-2" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                <div class="form-group">
                  <label class="form-label" for="coverageFor">Who needs coverage?</label>
                  <select id="coverageFor" name="coverageFor" class="form-select w-full p-3 border rounded">
                    <option value="Self">Self</option>
                    <option value="Family">Family</option>
                    <option value="Parents">Parents</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div class="form-group">
                  <label class="form-label" for="familySize">Number of members</label>
                  <input type="number" id="familySize" name="familySize" class="form-input w-full p-3 border rounded" min="1" value="1">
                </div>
              </div>

              <div class="form-group mb-4">
                <label class="form-label" for="budget">Approximate Budget (Annual)</label>
                <select id="budget" name="budget" class="form-select w-full p-3 border rounded">
                  <option value="Under ₹10,000">Under ₹10,000</option>
                  <option value="₹10,000-25,000">₹10,000 - ₹25,000</option>
                  <option value="₹25,000-50,000">₹25,000 - ₹50,000</option>
                  <option value="Above ₹50,000">Above ₹50,000</option>
                  <option value="Not sure">Not sure</option>
                </select>
              </div>

              <div class="form-group mb-4">
                <label class="form-label block mb-2">Preferred contact method</label>
                <div style="display: flex; gap: 1.5rem;">
                  <label><input type="radio" name="contactMethod" value="Call" checked> Call</label>
                  <label><input type="radio" name="contactMethod" value="WhatsApp"> WhatsApp</label>
                  <label><input type="radio" name="contactMethod" value="Email"> Email</label>
                </div>
              </div>

              <div class="form-group mb-4">
                <label class="form-label" for="contactTime">Preferred contact time</label>
                <select id="contactTime" name="contactTime" class="form-select w-full p-3 border rounded">
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                  <option value="Anytime">Anytime</option>
                </select>
              </div>

              <div class="form-group mb-6">
                <label class="form-label" for="message">Optional message</label>
                <textarea id="message" name="message" class="form-textarea w-full p-3 border rounded" rows="3" placeholder="Any specific requirements..."></textarea>
              </div>

              <div class="flex justify-between mt-6" style="display: flex; justify-content: space-between;">
                <button type="button" class="btn btn-outline btn-back" data-back="1">${icons.chevronLeft} Back</button>
                <button type="button" class="btn btn-primary btn-next" data-next="3">Review Summary ${icons.arrowRight}</button>
              </div>
            </div>

            <!-- Step 3: Summary Review -->
            <div id="step-3" class="form-step hidden" style="display: none;">
              <h2 style="font-size: 1.5rem; margin-bottom: 1.5rem; color: var(--color-navy);">Review Your Details</h2>
              <div class="guidance-page__summary bg-gray-50 p-4 rounded mb-6" style="background: var(--color-bg); padding: 1.5rem; border-radius: 8px;" id="summaryContent">
                <!-- Summary content inserted via JS -->
              </div>
              <div class="flex justify-between mt-6" style="display: flex; justify-content: space-between;">
                <button type="button" class="btn btn-outline btn-back" data-back="2">${icons.chevronLeft} Back</button>
                <button type="submit" class="btn btn-primary" id="submitBtn">Submit Requirements ${icons.check}</button>
              </div>
            </div>
          </form>

          <!-- Step 4: Success -->
          <div id="step-4" class="guidance-success hidden text-center" style="display: none; padding: 2rem 0;">
            <div style="color: var(--color-success); margin-bottom: 1.5rem;">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin: 0 auto;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
            <h2 style="font-size: 2rem; color: var(--color-navy); margin-bottom: 1rem;">You're all set.</h2>
            <p style="color: var(--color-text-secondary); margin-bottom: 2rem; font-size: 1.1rem;">We've received your requirements. An advisor will get in touch with you shortly.</p>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
              <button type="button" class="btn btn-outline" id="btnBackHome">Back to Home</button>
              <a href="https://api.whatsapp.com/send?phone=918848679874&text=Hi%20Arun%20Kumar%2C%20I%20have%20submitted%20my%20guidance%20request." target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem;">${icons.whatsapp} WhatsApp an Advisor</a>
            </div>
          </div>

        </div>
      </div>
    </div>
  `;
}

export function mount(params) {
  const form = document.getElementById('guidanceForm');
  const btnNextList = document.querySelectorAll('.btn-next');
  const btnBackList = document.querySelectorAll('.btn-back');
  const stepIndicators = document.querySelectorAll('.step-indicator');
  const btnBackHome = document.getElementById('btnBackHome');

  if (btnBackHome) {
    btnBackHome.addEventListener('click', () => {
      Router.navigate('/');
    });
  }

  // Real-time validation
  const nameInput = document.getElementById('name');
  const mobileInput = document.getElementById('mobile');
  const emailInput = document.getElementById('email');

  if(nameInput) nameInput.addEventListener('blur', () => validateField('name', isValidName, 'Please enter a valid name.'));
  if(mobileInput) mobileInput.addEventListener('blur', () => validateField('mobile', isValidPhone, 'Please enter a valid 10-digit mobile number.'));
  if(emailInput) emailInput.addEventListener('blur', () => validateField('email', isValidEmail, 'Please enter a valid email address.'));

  btnNextList.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const nextStepNum = parseInt(e.currentTarget.getAttribute('data-next'));
      if (currentStep === 1) {
        if (!validateStep1()) return;
      }
      if (nextStepNum === 3) {
        generateSummary();
      }
      goToStep(nextStepNum);
    });
  });

  btnBackList.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const backStepNum = parseInt(e.currentTarget.getAttribute('data-back'));
      goToStep(backStepNum);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data.date = new Date().toISOString();
    data.status = 'Pending';
    
    // Add enquiry to state
    if (State.addEnquiry) {
      State.addEnquiry(data);
    }
    
    // Hide form, show success
    form.style.display = 'none';
    document.getElementById('step-4').style.display = 'block';
    updateStepIndicators(3); // Keep review active or distinct
  });

  function validateField(id, validator, errorMsg) {
    const input = document.getElementById(id);
    if (!input) return false;
    if (!validator(input.value)) {
      if(typeof showFieldError === 'function') showFieldError(id, errorMsg);
      else {
        const errorEl = document.getElementById(`error-${id}`);
        if(errorEl) { errorEl.textContent = errorMsg; errorEl.classList.remove('hidden'); }
      }
      return false;
    } else {
      if(typeof clearFieldError === 'function') clearFieldError(id);
      else {
         const errorEl = document.getElementById(`error-${id}`);
         if(errorEl) { errorEl.classList.add('hidden'); }
      }
      return true;
    }
  }

  function validateStep1() {
    const isNameValid = validateField('name', isValidName || isRequired, 'Please enter your name.');
    const isMobileValid = validateField('mobile', isValidPhone, 'Please enter a valid mobile number.');
    const isEmailValid = validateField('email', isValidEmail, 'Please enter a valid email.');
    return isNameValid && isMobileValid && isEmailValid;
  }

  function goToStep(stepNum) {
    document.getElementById(`step-${currentStep}`).style.display = 'none';
    document.getElementById(`step-${stepNum}`).style.display = 'block';
    currentStep = stepNum;
    updateStepIndicators(stepNum);
  }

  function updateStepIndicators(stepNum) {
    stepIndicators.forEach(ind => {
      const s = parseInt(ind.getAttribute('data-step'));
      if (s <= stepNum) {
        ind.style.color = 'var(--color-primary)';
        ind.style.fontWeight = '600';
      } else {
        ind.style.color = 'var(--color-text-secondary)';
        ind.style.fontWeight = 'normal';
      }
    });
  }

  function generateSummary() {
    const formData = new FormData(form);
    const summaryContainer = document.getElementById('summaryContent');
    const fields = [
      { key: 'name', label: 'Name' },
      { key: 'mobile', label: 'Mobile' },
      { key: 'email', label: 'Email' },
      { key: 'location', label: 'Location' },
      { key: 'planInterest', label: 'Plan Interested In' },
      { key: 'coverageFor', label: 'Coverage For' },
      { key: 'familySize', label: 'Members' },
      { key: 'budget', label: 'Budget' },
      { key: 'contactMethod', label: 'Contact Method' },
      { key: 'contactTime', label: 'Contact Time' }
    ];

    let html = '<div style="display: grid; gap: 0.75rem;">';
    fields.forEach(f => {
      const val = formData.get(f.key);
      let displayVal = val || 'Not specified';
      if (f.key === 'planInterest' && val) {
        const p = plans.find(plan => plan.id === val);
        if (p) displayVal = p.name;
      }
      html += `
        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--color-border); padding-bottom: 0.5rem;">
          <span style="color: var(--color-text-secondary);">${f.label}</span>
          <span style="font-weight: 500; color: var(--color-navy); text-align: right;">${displayVal}</span>
        </div>
      `;
    });
    html += '</div>';
    summaryContainer.innerHTML = html;
  }
}
