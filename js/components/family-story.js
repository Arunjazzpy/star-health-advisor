import { icons } from '../utils/icons.js';

export function FamilyStorySection() {
  return `
    <section class="section family-story-section">
      <div class="container">
        <div class="family-timeline">
          <div class="timeline-item animate-on-scroll slide-up stagger-1">
            <div class="timeline-icon">${icons.user}</div>
            <div class="timeline-content">
              <h4>You</h4>
              <p>Your health journey starts here</p>
            </div>
          </div>
          <div class="timeline-item animate-on-scroll slide-up stagger-2">
            <div class="timeline-icon">${icons.heart}</div>
            <div class="timeline-content">
              <h4>Spouse</h4>
              <p>Protect the ones closest to you</p>
            </div>
          </div>
          <div class="timeline-item animate-on-scroll slide-up stagger-3">
            <div class="timeline-icon">${icons.users}</div>
            <div class="timeline-content">
              <h4>Children</h4>
              <p>Secure their future from day one</p>
            </div>
          </div>
          <div class="timeline-item animate-on-scroll slide-up stagger-4">
            <div class="timeline-icon">${icons.users}</div>
            <div class="timeline-content">
              <h4>Parents</h4>
              <p>Give back the care they gave you</p>
            </div>
          </div>
        </div>
        
        <div class="together-card card text-center animate-on-scroll slide-up stagger-5">
          <h3>Health protection should be simple for the whole family.</h3>
          <a href="#/find-my-plan" class="btn btn-primary btn-lg mt-4">Find a plan for your family &rarr;</a>
        </div>
      </div>
    </section>
  `;
}
