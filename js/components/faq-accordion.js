import { icons } from '../utils/icons.js';

export function FaqAccordion(faqs, options = {}) {
  if (!faqs || faqs.length === 0) return '';

  return `
    <div class="accordion">
      ${faqs.map((faq, index) => `
        <div class="accordion-item" data-index="${index}">
          <button class="accordion-trigger" aria-expanded="false">
            <span class="accordion-question">${faq.question}</span>
            <span class="accordion-icon">${icons.chevronDown}</span>
          </button>
          <div class="accordion-body">
            <div class="accordion-content">
              ${faq.answer}
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

export function initFaqAccordion(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const items = container.querySelectorAll('.accordion-item');
  
  items.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    
    // Add keyboard interaction
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        trigger.click();
      }
    });

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('accordion-item--open');
      
      // Close all
      items.forEach(i => {
        i.classList.remove('accordion-item--open');
        i.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
      });

      // Open clicked if it was closed
      if (!isOpen) {
        item.classList.add('accordion-item--open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}
