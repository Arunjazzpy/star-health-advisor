import { icons } from '../utils/icons.js';
import { faqs, faqCategories, getFaqsByCategory, searchFaqs } from '../data/faqs.js';
import { FaqAccordion, initFaqAccordion } from '../components/faq-accordion.js';

export function render(params) {
  const categoriesHtml = faqCategories.map(cat => `
    <button class="faq-page__category-btn btn ${cat.id === 'all' ? 'btn-primary' : 'btn-outline'}" data-category="${cat.id}" style="border-radius: 20px; margin: 0.25rem;">
      ${cat.label}
    </button>
  `).join('');

  return `
    <div class="faq-page container section">
      <div class="faq-page__header section-header text-center animate-on-scroll slide-up">
        <h1 class="section-title">Frequently Asked Questions</h1>
        <p class="section-subtitle">Find answers to common questions about health insurance.</p>
        
        <div class="faq-page__search" style="max-width: 600px; margin: 2rem auto 0; position: relative;">
          <div style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--color-text-secondary);">
            ${icons.search}
          </div>
          <input type="text" id="faqSearch" class="form-input w-full" placeholder="Search questions..." style="padding-left: 3rem; padding-right: 1rem; border-radius: 24px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        </div>
      </div>

      <div class="faq-page__categories" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem; margin-bottom: 2rem;">
        ${categoriesHtml}
      </div>

      <div class="faq-page__list mx-auto" id="faqListContainer" style="max-width: 800px;">
        ${FaqAccordion(faqs)}
      </div>

      <div class="text-center mt-12 pt-8" style="border-top: 1px solid var(--color-border);">
        <h3 style="font-size: 1.5rem; color: var(--color-navy); margin-bottom: 1rem;">Still have questions?</h3>
        <p style="color: var(--color-text-secondary); margin-bottom: 1.5rem;">Talk to an advisor for personalized guidance.</p>
        <a href="#/contact" class="btn btn-outline">Contact Advisor</a>
      </div>
    </div>
  `;
}

export function mount(params) {
  initFaqAccordion('.faq-page__list');
  
  const searchInput = document.getElementById('faqSearch');
  const categoryBtns = document.querySelectorAll('.faq-page__category-btn');
  const listContainer = document.getElementById('faqListContainer');
  let currentCategory = 'all';

  function renderList(faqsToRender) {
    if (faqsToRender.length === 0) {
      listContainer.innerHTML = `
        <div class="text-center p-8" style="color: var(--color-text-secondary);">
          <p>No questions found matching your search.</p>
        </div>
      `;
    } else {
      listContainer.innerHTML = FaqAccordion(faqsToRender);
      initFaqAccordion('.faq-page__list');
    }
  }

  // Debounce helper
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  const handleSearch = debounce((query) => {
    let filtered = [];
    if (query.trim() === '') {
      filtered = currentCategory === 'all' ? faqs : getFaqsByCategory(currentCategory);
    } else {
      filtered = searchFaqs(query);
      // reset category to All visually when searching
      categoryBtns.forEach(b => {
        b.classList.remove('btn-primary');
        b.classList.add('btn-outline');
        if (b.dataset.category === 'all') {
          b.classList.remove('btn-outline');
          b.classList.add('btn-primary');
        }
      });
      currentCategory = 'all';
    }
    renderList(filtered);
  }, 300);

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      handleSearch(e.target.value);
    });
  }

  categoryBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const cat = e.target.dataset.category;
      currentCategory = cat;
      if (searchInput) searchInput.value = '';
      
      categoryBtns.forEach(b => {
        b.classList.remove('btn-primary');
        b.classList.add('btn-outline');
      });
      e.target.classList.remove('btn-outline');
      e.target.classList.add('btn-primary');

      const filtered = cat === 'all' ? faqs : getFaqsByCategory(cat);
      renderList(filtered);
    });
  });
}
