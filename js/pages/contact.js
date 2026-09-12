import { icons } from '../utils/icons.js';
import { Router } from '../router.js';

export function render(params) {
  return `
    <div class="contact-page container section">
      <div class="contact-page__header section-header text-center animate-on-scroll slide-up">
        <h1 class="section-title">Talk to a Star Health Insurance Advisor</h1>
        <p class="section-subtitle">We're here to help you understand your options.</p>
      </div>

      <div class="contact-page__grid grid grid-2" style="max-width: 900px; margin: 0 auto; gap: 2rem;">
        
        <!-- Call Card -->
        <a href="tel:+918848679874" class="contact-card card card-hover animate-on-scroll stagger-1" style="display: flex; flex-direction: column; align-items: center; text-align: center; padding: 2.5rem 1.5rem; text-decoration: none; border-radius: 12px; background: var(--color-white);">
          <div class="contact-card__icon--call" style="background: var(--color-primary-light); color: var(--color-primary); width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
            ${icons.phone}
          </div>
          <h3 style="font-size: 1.25rem; font-weight: 600; color: var(--color-navy); margin-bottom: 0.5rem;">Call Us</h3>
          <p style="color: var(--color-text-secondary); font-size: 1.1rem;">+91 88486 79874</p>
        </a>

        <!-- WhatsApp Card -->
        <a href="https://api.whatsapp.com/send?phone=918848679874&text=Hi%20Arun%20Kumar%2C%20I%20would%20like%20to%20know%20more%20about%20Star%20Health%20Insurance%20plans." target="_blank" rel="noopener noreferrer" class="contact-card card card-hover animate-on-scroll stagger-2" style="display: flex; flex-direction: column; align-items: center; text-align: center; padding: 2.5rem 1.5rem; text-decoration: none; border-radius: 12px; background: var(--color-white);">
          <div class="contact-card__icon--whatsapp" style="background: #DCF8C6; color: #25D366; width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
            ${icons.whatsapp}
          </div>
          <h3 style="font-size: 1.25rem; font-weight: 600; color: var(--color-navy); margin-bottom: 0.5rem;">WhatsApp</h3>
          <p style="color: var(--color-text-secondary); font-size: 1.1rem;">Chat with Arun Kumar M T</p>
        </a>

        <!-- Email Card -->
        <a href="mailto:arunarunkumarmt@gmail.com" class="contact-card card card-hover animate-on-scroll stagger-3" style="display: flex; flex-direction: column; align-items: center; text-align: center; padding: 2.5rem 1.5rem; text-decoration: none; border-radius: 12px; background: var(--color-white);">
          <div class="contact-card__icon--email" style="background: var(--color-primary-light); color: var(--color-primary); width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
            ${icons.mail}
          </div>
          <h3 style="font-size: 1.25rem; font-weight: 600; color: var(--color-navy); margin-bottom: 0.5rem;">Email</h3>
          <p style="color: var(--color-text-secondary); font-size: 1.1rem;">arunarunkumarmt@gmail.com</p>
        </a>

        <!-- Enquiry Card -->
        <a href="#/get-guidance" class="contact-card card card-hover animate-on-scroll stagger-4" style="display: flex; flex-direction: column; align-items: center; text-align: center; padding: 2.5rem 1.5rem; text-decoration: none; border-radius: 12px; background: var(--color-white);">
          <div class="contact-card__icon--form" style="background: var(--color-primary-light); color: var(--color-primary); width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
            ${icons.fileText}
          </div>
          <h3 style="font-size: 1.25rem; font-weight: 600; color: var(--color-navy); margin-bottom: 0.5rem;">Submit Enquiry</h3>
          <p style="color: var(--color-text-secondary); font-size: 1.1rem;">Fill out a detailed requirements form</p>
        </a>
      </div>

      <div class="text-center mt-8 animate-on-scroll fade-in">
        <p style="color: var(--color-text-secondary); margin-bottom: 1rem;"><em>Tap to call or message directly.</em></p>
        <div style="display: inline-block; background: var(--color-bg); padding: 1rem 2rem; border-radius: 30px; border: 1px solid var(--color-border);">
          <span style="display: flex; align-items: center; gap: 0.5rem; color: var(--color-navy); font-weight: 500;">
            ${icons.clock} Available Monday to Saturday, 9 AM to 7 PM
          </span>
        </div>
      </div>
    </div>
  `;
}

export function mount(params) {
  // Animations are handled by global scroll observer if set up, or add a simple fallback here if needed.
}
