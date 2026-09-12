// js/pages/home.js
import { HeroSection } from '../components/hero.js';
import { TrustSection } from '../components/trust-section.js';
import { FamilyStorySection } from '../components/family-story.js';
import { TestimonialsSection } from '../components/testimonials.js';
import { PlanCard } from '../components/plan-card.js';
import { FaqAccordion, initFaqAccordion } from '../components/faq-accordion.js';
import { icons } from '../utils/icons.js';
import { getFeaturedPlans } from '../data/plans.js';
import { faqs } from '../data/faqs.js';

export function render(params) {
  const featuredPlans = getFeaturedPlans();
  const previewFaqs = faqs.slice(0, 5);

  return `
    <div class="home-page">
      ${HeroSection()}
      
      <section class="section container animate-on-scroll fade-in">
        <div class="section-header text-center">
          <h2 class="section-title">How it Works</h2>
          <p class="section-subtitle">Your journey to the right health insurance</p>
        </div>
        <div class="how-it-works grid grid-4">
          <div class="how-it-works__step text-center">
            <div class="how-it-works__icon">${icons.search || ''}</div>
            <h3>Discover</h3>
            <p>Tell us a bit about yourself and your needs.</p>
          </div>
          <div class="how-it-works__step text-center">
            <div class="how-it-works__icon">${icons.sliders || ''}</div>
            <h3>Personalise</h3>
            <p>We filter plans to match your unique requirements.</p>
          </div>
          <div class="how-it-works__step text-center">
            <div class="how-it-works__icon">${icons.fileText || ''}</div>
            <h3>Explore</h3>
            <p>Compare tailored plan options clearly.</p>
          </div>
          <div class="how-it-works__step text-center">
            <div class="how-it-works__icon">${icons.messageCircle || ''}</div>
            <h3>Connect</h3>
            <p>Get expert guidance to finalize your choice.</p>
          </div>
        </div>
      </section>

      <section class="section container animate-on-scroll slide-up bg-slate-50">
        <div class="section-header">
          <h2 class="section-title">Explore popular plans</h2>
        </div>
        <div class="grid grid-3">
          ${featuredPlans.map(plan => PlanCard(plan)).join('')}
        </div>
        <div class="text-center mt-8">
          <a href="#/plans" class="btn btn-outline">View all plans ${icons.arrowRight || ''}</a>
        </div>
      </section>

      <section class="section container animate-on-scroll scale-in">
        <div class="cta-banner text-center rounded-xl p-10 bg-navy text-white">
          <h2>Not sure which plan is right? Let us help.</h2>
          <p class="mb-6 opacity-80">Our guided tool or expert advisors can point you in the right direction.</p>
          <div class="flex justify-center gap-4 flex-wrap">
            <a href="#/find-my-plan" class="btn btn-primary">Find My Plan</a>
            <a href="#/get-guidance" class="btn btn-outline text-white border-white hover-bg-white hover-text-navy">Talk to Advisor</a>
          </div>
        </div>
      </section>

      ${FamilyStorySection()}
      ${TrustSection()}
      ${TestimonialsSection()}

      <section class="section container animate-on-scroll slide-up">
        <div class="section-header">
          <h2 class="section-title">Frequently Asked Questions</h2>
        </div>
        <div class="faq-preview max-w-3xl mx-auto">
          ${FaqAccordion(previewFaqs)}
          <div class="text-center mt-6">
            <a href="#/faq" class="text-primary font-medium hover-underline">View all FAQs ${icons.arrowRight || ''}</a>
          </div>
        </div>
      </section>

      <section class="section container animate-on-scroll fade-in">
        <div class="text-center bg-blue-50 p-12 rounded-2xl">
          <h2 class="section-title mb-4">Ready to find the right plan?</h2>
          <a href="#/find-my-plan" class="btn btn-primary btn-lg mt-4">Find My Plan</a>
        </div>
      </section>
    </div>
  `;
}

export function mount(params) {
  initFaqAccordion('.faq-preview .accordion');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

export function unmount() {}
