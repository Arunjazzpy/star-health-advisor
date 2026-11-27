import { icons } from '../utils/icons.js';
import { State } from '../state.js';

export function PlanCard(plan, options = {}) {
  if (!plan) return '';
  const { showCompare = true, compact = false } = options;
  const slug = plan.slug || '';
  
  const highlightsHtml = (plan.highlights || []).slice(0, 4).map(h => `
    <li class="plan-highlight">
      ${icons.check || '✓'} <span>${h}</span>
    </li>
  `).join('');

  const tagsHtml = (plan.suitableFor || []).map(tag => `
    <span class="plan-tag">${tag}</span>
  `).join('');

  let isCompared = false;
  try {
    const comparePlans = (State && typeof State.getComparePlans === 'function') ? State.getComparePlans() : [];
    isCompared = Array.isArray(comparePlans) && comparePlans.includes(slug);
  } catch (e) {
    isCompared = false;
  }

  return `
    <div class="card plan-card ${compact ? 'plan-card--compact' : ''} card-hover" data-slug="${slug}">
      ${plan.featured ? `<div class="plan-badge">Popular</div>` : ''}
      <div class="plan-card-header">
        <h3 class="plan-title">${plan.shortName || plan.name || 'Star Health Plan'}</h3>
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
            <input type="checkbox" class="compare-checkbox" value="${slug}" data-slug="${slug}" 
              ${isCompared ? 'checked' : ''}>
            Add to compare
          </label>
        </div>
      ` : ''}
      <div class="plan-card-actions">
        <a href="#/plan/${slug}" class="btn btn-outline btn-sm w-full">View Details</a>
        <a href="#/get-guidance" class="btn btn-primary btn-sm w-full">Get Guidance</a>
      </div>
    </div>
  `;
}
