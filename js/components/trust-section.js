import { icons } from '../utils/icons.js';

export function TrustSection() {
  return `
    <section class="section trust-section bg-light">
      <div class="container">
        <div class="section-header text-center animate-on-scroll slide-up">
          <span class="section-overline">WHY AN ADVISOR</span>
          <h2 class="section-title">Insurance doesn't have to be confusing</h2>
          <p class="section-subtitle">We help you understand your options, so you can make informed decisions for your family's health.</p>
        </div>
        
        <div class="grid grid-4 trust-grid">
          <div class="feature-card card animate-on-scroll slide-up stagger-1">
            <div class="feature-icon">${icons.target}</div>
            <h3 class="feature-title">Personalised Guidance</h3>
            <p class="feature-desc">Get help understanding which options may fit your requirements.</p>
          </div>
          <div class="feature-card card animate-on-scroll slide-up stagger-2">
            <div class="feature-icon">${icons.compare}</div>
            <h3 class="feature-title">Simple Comparisons</h3>
            <p class="feature-desc">Understand important differences without drowning in insurance jargon.</p>
          </div>
          <div class="feature-card card animate-on-scroll slide-up stagger-3">
            <div class="feature-icon">${icons.messageCircle}</div>
            <h3 class="feature-title">Human Support</h3>
            <p class="feature-desc">Talk directly with an advisor who understands your needs.</p>
          </div>
          <div class="feature-card card animate-on-scroll slide-up stagger-4">
            <div class="feature-icon">${icons.shield}</div>
            <h3 class="feature-title">End-to-End Assistance</h3>
            <p class="feature-desc">Get support throughout your insurance journey — from selection to claims.</p>
          </div>
        </div>
      </div>
    </section>
  `;
}
