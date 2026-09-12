import { icons } from '../utils/icons.js';
import { State } from '../state.js';

export function PlanCard(plan, options = {}) {
  const { showCompare = true, compact = false } = options;
  
  const highlightsHtml = (plan.highlights || []).slice(0, 4).map(h => `
    <li class="plan-highlight">
      ${icons.check} <span>${h}</span>
    </li>
  `).join('');

  const tagsHtml = (plan.suitableFor || []).map(tag => `
    <span class="plan-tag">${tag}</span>
  `).join('');

  const comparePlans = State.getComparePlans();
  const isCompared = comparePlans.includes(plan.slug);

  return `
    <div class="card plan-card ${compact ? 'plan-card--compact' : ''} card-hover" data-slug="${plan.slug}">
      ${plan.featured ? `<div class="plan-badge">Popular</div>` : ''}
      <div class="plan-card-header">
        <h3 class="plan-title">${plan.shortName || plan.name}</h3>
        <p class="plan-tagline">${plan.tagline || ''}</p>
      </div>
      <div class="plan-tags">
        ${tagsHtml}
      </div>
      <ul class="plan-highlights">
        ${highlightsHtml}
      </ul>
      ${showCompare ? `
        <div class="plan-compare form-group">
          <label class="form-label" style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
            <input type="checkbox" class="compare-checkbox" value="${plan.slug}" data-slug="${plan.slug}" 
              ${isCompared ? 'checked' : ''}>
            Add to compare
          </label>
        </div>
      ` : ''}
      <div class="plan-card-actions">
        <a href="#/plan/${plan.slug}" class="btn btn-outline btn-sm w-full">View Details</a>
        <a href="#/get-guidance" class="btn btn-primary btn-sm w-full">Get Guidance</a>
      </div>
    </div>
  `;
}
