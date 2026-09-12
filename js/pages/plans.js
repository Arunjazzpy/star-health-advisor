// js/pages/plans.js
import { PlanCard } from '../components/plan-card.js';
import { icons } from '../utils/icons.js';
import { plans, planCategories, getPlansByCategory } from '../data/plans.js';
import { State } from '../state.js';
import { Router } from '../router.js';

let currentCategory = 'all';

export function render(params) {
  currentCategory = 'all';
  const displayPlans = getPlansByCategory(currentCategory);
  
  return `
    <div class="plans-page">
      <div class="page-header bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div class="container text-center">
          <h1 class="text-4xl font-bold mb-4">Health Insurance Plans</h1>
          <p class="text-xl opacity-90 max-w-2xl mx-auto">Explore Star Health Insurance plans and find the coverage that fits your needs.</p>
        </div>
      </div>
      
      <div class="container section">
        <div class="plans-page__filter flex flex-wrap justify-center gap-3 mb-10">
          ${planCategories.map(cat => `
            <button class="filter-pill ${cat.id === currentCategory ? 'active' : ''}" data-category="${cat.id}">${cat.label}</button>
          `).join('')}
        </div>
        
        <div class="plans-page__grid grid grid-3" id="plans-grid">
          ${renderPlansGrid(displayPlans)}
        </div>
      </div>
      
      <div class="compare-bar" id="compare-bar" style="display: none; position: fixed; bottom: 0; left: 0; right: 0; background: white; box-shadow: 0 -4px 6px rgba(0,0,0,0.1); padding: 16px; border-top: 1px solid var(--color-border); z-index: 50;">
        <div class="container flex justify-between items-center">
          <div>
            <span class="font-semibold" id="compare-count">0 plans selected</span>
            <span class="text-sm text-gray-500 ml-2">Select up to 3 plans to compare</span>
          </div>
          <div class="flex gap-4 items-center">
            <button class="text-sm text-primary hover-underline" id="clear-compare">Clear</button>
            <button class="btn btn-primary" id="btn-compare" disabled>Compare Plans</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderPlansGrid(plansList) {
  if (plansList.length === 0) {
    return `<div class="col-span-3 text-center py-12 text-gray-500">No plans found in this category.</div>`;
  }
  return plansList.map(plan => PlanCard(plan, { showCompare: true })).join('');
}

export function mount(params) {
  const container = document.querySelector('.plans-page');
  if (!container) return;
  const grid = document.getElementById('plans-grid');
  const compareBar = document.getElementById('compare-bar');
  const compareCount = document.getElementById('compare-count');
  const btnCompare = document.getElementById('btn-compare');
  const clearCompare = document.getElementById('clear-compare');
  
  // Filter click handler
  container.querySelectorAll('.filter-pill').forEach(btn => {
    btn.addEventListener('click', (e) => {
      container.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentCategory = e.target.dataset.category;
      
      const filteredPlans = getPlansByCategory(currentCategory);
      grid.innerHTML = renderPlansGrid(filteredPlans);
      attachCompareHandlers();
    });
  });
  
  function updateCompareBar() {
    const selected = State.getComparePlans();
    if (selected.length > 0) {
      compareBar.style.display = 'block';
      compareCount.textContent = `${selected.length} plan${selected.length > 1 ? 's' : ''} selected`;
      btnCompare.disabled = selected.length < 2;
    } else {
      compareBar.style.display = 'none';
    }
    
    // Update checkbox states
    document.querySelectorAll('.compare-checkbox').forEach(cb => {
      cb.checked = selected.includes(cb.value);
    });
  }
  
  function attachCompareHandlers() {
    document.querySelectorAll('.compare-checkbox').forEach(cb => {
      cb.addEventListener('change', (e) => {
        if (e.target.checked) {
          State.addComparePlan(e.target.value);
        } else {
          State.removeComparePlan(e.target.value);
        }
        updateCompareBar();
      });
    });
  }
  
  attachCompareHandlers();
  
  State.subscribe('comparePlans', updateCompareBar);
  updateCompareBar();
  
  if (clearCompare) {
    clearCompare.addEventListener('click', () => {
      State.clearCompare();
      updateCompareBar();
    });
  }
  
  if (btnCompare) {
    btnCompare.addEventListener('click', () => {
      // Show comparison inline
      const selected = State.getComparePlans();
      if (selected.length >= 2) {
        import('../components/comparison-table.js').then(({ ComparisonTable }) => {
          const compHtml = `
            <div class="section container">
              <div class="section-header text-center">
                <h2 class="section-title">Plan Comparison</h2>
              </div>
              ${ComparisonTable(selected)}
              <div class="text-center mt-8">
                <a href="#/get-guidance" class="btn btn-primary">Get Guidance on These Plans</a>
              </div>
            </div>
          `;
          grid.innerHTML = compHtml;
        });
      }
    });
  }
}

export function unmount() {}
