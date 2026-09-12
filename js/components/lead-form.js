import { State } from '../state.js';
import { plans } from '../data/plans.js';

export function LeadForm(options = {}) {
  const planOptions = (plans || []).map(p => `<option value="${p.slug}">${p.name}</option>`).join('');

  return `
    <div class="lead-form-container card">
      <form id="lead-form" class="lead-form">
        
        <div class="form-step step-1 active">
          <h3>Step 1: Your Details</h3>
          <div class="form-group">
            <label class="form-label">Full Name *</label>
            <input type="text" name="name" class="form-input" required placeholder="John Doe">
          </div>
          <div class="form-group">
            <label class="form-label">Mobile Number *</label>
            <input type="tel" name="phone" class="form-input" required pattern="[0-9]{10}" placeholder="9876543210">
          </div>
          <div class="form-group">
            <label class="form-label">Email Address *</label>
            <input type="email" name="email" class="form-input" required placeholder="john@example.com">
          </div>
          <div class="form-group">
            <label class="form-label">City/State</label>
            <input type="text" name="location" class="form-input" placeholder="e.g. Mumbai, Maharashtra">
          </div>
          <button type="button" class="btn btn-primary w-full next-step-btn">Next Step &rarr;</button>
        </div>

        <div class="form-step step-2" style="display: none;">
          <h3>Step 2: Your Requirements</h3>
          <div class="form-group">
            <label class="form-label">Plan Interested In</label>
            <select name="plan" class="form-select">
              <option value="">-- Select a Plan --</option>
              ${planOptions}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Who needs coverage?</label>
            <select name="coverage" class="form-select">
              <option value="self">Self</option>
              <option value="family">Family (Self + Spouse + Kids)</option>
              <option value="parents">Parents</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Preferred Contact Method</label>
            <select name="contactMethod" class="form-select">
              <option value="call">Phone Call</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="email">Email</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Message (Optional)</label>
            <textarea name="message" class="form-textarea" rows="3" placeholder="Any specific requirements..."></textarea>
          </div>
          <div class="form-actions" style="display: flex; gap: 1rem;">
            <button type="button" class="btn btn-outline prev-step-btn">&larr; Back</button>
            <button type="submit" class="btn btn-primary flex-1">Submit Enquiry</button>
          </div>
        </div>

        <div class="form-step step-success text-center" style="display: none; padding: 2rem 0;">
          <h3 class="color-success">Thank You!</h3>
          <p>Your enquiry has been submitted successfully. Our advisor Arun Kumar will get in touch with you shortly.</p>
          <button type="button" class="btn btn-primary mt-4 reset-form-btn">New Enquiry</button>
        </div>
        
      </form>
    </div>
  `;
}

export function initLeadForm() {
  const form = document.getElementById('lead-form');
  if (!form) return;

  const step1 = form.querySelector('.step-1');
  const step2 = form.querySelector('.step-2');
  const stepSuccess = form.querySelector('.step-success');
  const nextBtn = form.querySelector('.next-step-btn');
  const prevBtn = form.querySelector('.prev-step-btn');
  const resetBtn = form.querySelector('.reset-form-btn');

  nextBtn.addEventListener('click', () => {
    // Basic validation for step 1
    const nameInput = form.querySelector('[name="name"]');
    const phoneInput = form.querySelector('[name="phone"]');
    const emailInput = form.querySelector('[name="email"]');

    if (nameInput.checkValidity() && phoneInput.checkValidity() && emailInput.checkValidity()) {
      step1.style.display = 'none';
      step2.style.display = 'block';
    } else {
      form.reportValidity();
    }
  });

  prevBtn.addEventListener('click', () => {
    step2.style.display = 'none';
    step1.style.display = 'block';
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data.date = new Date().toISOString();
    
    // Save to State (ensure method exists)
    if (State.addEnquiry) {
      State.addEnquiry(data);
    } else {
      console.log('Enquiry captured:', data);
    }

    step2.style.display = 'none';
    stepSuccess.style.display = 'block';
    form.reset();
  });

  resetBtn.addEventListener('click', () => {
    stepSuccess.style.display = 'none';
    step1.style.display = 'block';
  });
}
