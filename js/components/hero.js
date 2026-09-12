import { icons } from '../utils/icons.js';

export function HeroSection() {
  return `
    <section class="hero-section section">
      <div class="container hero-container grid grid-2">
        <div class="hero-content">
          <div class="hero-overline hero-animate-1">
            ${icons.shield} Star Health Insurance Advisor
          </div>
          <h1 class="hero-title hero-animate-2">Find the right health insurance for you and your family.</h1>
          <p class="hero-subtitle hero-animate-3">Understand your options, explore Star Health Insurance plans, and get personalised guidance from an advisor.</p>
          <div class="hero-actions hero-animate-4">
            <a href="#/find-my-plan" class="btn btn-primary btn-lg">Find My Plan &rarr;</a>
            <a href="#/contact" class="btn btn-secondary btn-lg">Talk to an Advisor</a>
          </div>
        </div>
        <div class="hero-visual hero-animate-5">
          <div class="hero-visual-bg"></div>
          <div class="hero-icon-wrapper">
            ${icons.users}
          </div>
          <div class="hero-stat-card stat-1 card card-hover">
            <div class="stat-icon">${icons.shield}</div>
            <div class="stat-text">
              <strong>Personalised Guidance</strong>
              <span>Expert advice tailored for you</span>
            </div>
          </div>
          <div class="hero-stat-card stat-2 card card-hover">
            <div class="stat-icon">${icons.users}</div>
            <div class="stat-text">
              <strong>Family Coverage</strong>
              <span>Protect your loved ones</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
