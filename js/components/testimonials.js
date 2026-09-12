import { icons } from '../utils/icons.js';
import { testimonials } from '../data/testimonials.js';

export function TestimonialsSection() {
  if (!testimonials || testimonials.length === 0) return '';
  
  const starsHtml = Array(5).fill(icons.star).join(''); // Utilizing standard star icon

  return `
    <section class="section testimonials-section bg-light">
      <div class="container">
        <div class="section-header text-center animate-on-scroll slide-up">
          <h2 class="section-title">What our customers say</h2>
        </div>
        <div class="grid grid-3 testimonials__grid">
          ${testimonials.map((t, idx) => `
            <div class="testimonial-card card animate-on-scroll slide-up stagger-${(idx % 4) + 1}">
              <div class="testimonial-stars" style="color: #FBBF24; display: flex; gap: 4px; margin-bottom: 12px;">
                ${starsHtml}
              </div>
              <blockquote class="testimonial-quote">
                "${t.text}"
              </blockquote>
              <div class="testimonial-author">
                <div class="testimonial-avatar">${t.name.charAt(0)}</div>
                <div class="testimonial-info">
                  <strong>${t.name}</strong>
                  <span>${t.location}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}
