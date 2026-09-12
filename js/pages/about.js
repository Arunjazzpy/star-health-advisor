import { icons } from '../utils/icons.js';
import { TrustSection } from '../components/trust-section.js';
import { Router } from '../router.js';

export function render(params) {
  return `
    <div class="about-page">
      <div class="container section">
        <div class="about-page__header section-header text-center animate-on-scroll slide-up">
          <h1 class="section-title">About Your Advisor</h1>
          <p class="section-subtitle">Personalised guidance on Star Health Insurance plans.</p>
        </div>

        <div class="about-page__story grid grid-2" style="gap: 4rem; align-items: center; margin-bottom: 4rem;">
          <div class="about-page__content animate-on-scroll slide-up">
            <h2 style="font-size: 2rem; color: var(--color-navy); margin-bottom: 1.5rem;">Making insurance simpler</h2>
            <p style="color: var(--color-text-secondary); font-size: 1.1rem; line-height: 1.8; margin-bottom: 1rem;">
              We are dedicated to helping families understand health insurance and make informed decisions. Navigating policy terms, benefits, and exclusions shouldn't be confusing or overwhelming.
            </p>
            <p style="color: var(--color-text-secondary); font-size: 1.1rem; line-height: 1.8; margin-bottom: 1rem;">
              With years of experience guiding clients through Star Health's comprehensive product lineup, our approach is straightforward: we listen to your needs, explain your options clearly, and provide guidance tailored to your family's unique situation.
            </p>
            <p style="color: var(--color-text-secondary); font-size: 1.1rem; line-height: 1.8;">
              Whether you are looking for an individual policy, family floater cover, or specialized senior citizen plans, we are here to support you at every step—from choosing the right plan to assisting during claims.
            </p>
          </div>

          <div class="about-page__advisor-card card shadow-lg animate-on-scroll stagger-1" style="border-radius: 16px; overflow: hidden; background: var(--color-white);">
            <div style="background: var(--color-navy); height: 120px; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 2rem;">
              <div style="width: 100px; height: 100px; border-radius: 50%; background: var(--color-bg); border: 4px solid var(--color-white); display: flex; align-items: center; justify-content: center; transform: translateY(50%); color: var(--color-primary);">
                ${icons.user || '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'}
              </div>
            </div>
            <div style="padding: 3rem 2rem 2rem; text-align: center;">
              <h3 style="font-size: 1.5rem; color: var(--color-navy); margin-bottom: 0.5rem; font-weight: 600;">Arun Kumar M T</h3>
              <p style="color: var(--color-primary); font-weight: 500; margin-bottom: 1rem;">Star Health Insurance Advisor</p>
              <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; color: var(--color-text-secondary); margin-bottom: 1.5rem;">
                ${icons.mapPin} India
              </div>
              <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                <a href="tel:+918848679874" class="btn btn-outline" style="width: 100%; display: flex; justify-content: center; align-items: center; gap: 0.5rem;">${icons.phone} Contact Advisor</a>
              </div>
            </div>
          </div>
        </div>

        <div class="about-page__values section">
          <h2 class="text-center" style="font-size: 2rem; color: var(--color-navy); margin-bottom: 3rem;">Our Core Values</h2>
          <div class="grid grid-3" style="gap: 2rem;">
            <div class="card p-6 text-center animate-on-scroll stagger-1" style="background: var(--color-white); border-radius: 12px;">
              <div style="width: 60px; height: 60px; background: var(--color-primary-light); color: var(--color-primary); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem;">
                ${icons.eye}
              </div>
              <h3 style="font-size: 1.25rem; font-weight: 600; color: var(--color-navy); margin-bottom: 1rem;">Transparency</h3>
              <p style="color: var(--color-text-secondary); line-height: 1.6;">No hidden information. We explain both benefits and limitations clearly.</p>
            </div>

            <div class="card p-6 text-center animate-on-scroll stagger-2" style="background: var(--color-white); border-radius: 12px;">
              <div style="width: 60px; height: 60px; background: var(--color-primary-light); color: var(--color-primary); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem;">
                ${icons.zap}
              </div>
              <h3 style="font-size: 1.25rem; font-weight: 600; color: var(--color-navy); margin-bottom: 1rem;">Simplicity</h3>
              <p style="color: var(--color-text-secondary); line-height: 1.6;">We break down complex insurance terms into clear, simple guidance.</p>
            </div>

            <div class="card p-6 text-center animate-on-scroll stagger-3" style="background: var(--color-white); border-radius: 12px;">
              <div style="width: 60px; height: 60px; background: var(--color-primary-light); color: var(--color-primary); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem;">
                ${icons.heart}
              </div>
              <h3 style="font-size: 1.25rem; font-weight: 600; color: var(--color-navy); margin-bottom: 1rem;">Your Interests First</h3>
              <p style="color: var(--color-text-secondary); line-height: 1.6;">Our guidance is focused on what may genuinely suit your family's needs.</p>
            </div>
          </div>
        </div>

      </div>
      
      ${TrustSection()}

      <div class="section text-center" style="background: var(--color-bg); padding: 4rem 1rem;">
        <h2 style="font-size: 2rem; color: var(--color-navy); margin-bottom: 1.5rem;">Ready to find your plan?</h2>
        <a href="#/plans" class="btn btn-primary btn-lg">Find My Plan ${icons.arrowRight}</a>
      </div>
    </div>
  `;
}

export function mount(params) {}
