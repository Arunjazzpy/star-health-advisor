import { icons } from '../utils/icons.js';
import { plans } from '../data/plans.js';

export function ComparisonTable(planSlugs) {
  if (!planSlugs || planSlugs.length === 0) {
    return `<div class="empty-state"><div class="empty-state__icon">${icons.compare}</div><h3 class="empty-state__title">No plans selected</h3><p class="empty-state__desc">Select 2-4 plans to compare them side by side.</p><a href="#/plans" class="btn btn-primary">Browse Plans</a></div>`;
  }

  const selectedPlans = planSlugs.map(slug => plans.find(p => p.slug === slug)).filter(Boolean);
  
  if (selectedPlans.length === 0) return '';

  return `
    <div class="comparison-table-wrapper overflow-x-auto">
      <table class="comparison-table" style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th style="text-align: left; padding: 16px; border-bottom: 2px solid var(--color-border); min-width: 160px; background: var(--color-bg);">Feature</th>
            ${selectedPlans.map(plan => `
              <th style="text-align: left; padding: 16px; border-bottom: 2px solid var(--color-border); min-width: 200px; background: var(--color-bg);">
                <h4 style="margin-bottom: 8px; color: var(--color-navy);">${plan.shortName || plan.name}</h4>
                <a href="#/plan/${plan.slug}" class="btn btn-outline btn-sm">Details</a>
              </th>
            `).join('')}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="feature-label" style="padding: 14px 16px; border-bottom: 1px solid var(--color-border); font-weight: 600; color: var(--color-navy);">Suitable For</td>
            ${selectedPlans.map(plan => `
              <td style="padding: 14px 16px; border-bottom: 1px solid var(--color-border);">${(plan.suitableFor || []).join(', ')}</td>
            `).join('')}
          </tr>
          <tr>
            <td class="feature-label" style="padding: 14px 16px; border-bottom: 1px solid var(--color-border); font-weight: 600; color: var(--color-navy);">Key Highlights</td>
            ${selectedPlans.map(plan => `
              <td style="padding: 14px 16px; border-bottom: 1px solid var(--color-border);">
                <ul style="list-style: none; padding: 0; margin: 0;">
                  ${(plan.highlights || []).slice(0, 4).map(h => `<li style="display: flex; align-items: flex-start; gap: 6px; margin-bottom: 6px; font-size: 0.875rem;"><span style="color: var(--color-primary); flex-shrink: 0; margin-top: 2px;">${icons.check}</span> ${h}</li>`).join('')}
                </ul>
              </td>
            `).join('')}
          </tr>
          <tr>
            <td class="feature-label" style="padding: 14px 16px; border-bottom: 1px solid var(--color-border); font-weight: 600; color: var(--color-navy);">Entry Age</td>
            ${selectedPlans.map(plan => `
              <td style="padding: 14px 16px; border-bottom: 1px solid var(--color-border);">${plan.eligibility?.entryAge || 'As per policy terms'}</td>
            `).join('')}
          </tr>
          <tr>
            <td class="feature-label" style="padding: 14px 16px; border-bottom: 1px solid var(--color-border); font-weight: 600; color: var(--color-navy);">Family Coverage</td>
            ${selectedPlans.map(plan => `
              <td style="padding: 14px 16px; border-bottom: 1px solid var(--color-border);">${plan.eligibility?.familyDefinition || 'As per policy terms'}</td>
            `).join('')}
          </tr>
          <tr>
            <td class="feature-label" style="padding: 14px 16px; border-bottom: 1px solid var(--color-border); font-weight: 600; color: var(--color-navy);">Waiting Periods</td>
            ${selectedPlans.map(plan => `
              <td style="padding: 14px 16px; border-bottom: 1px solid var(--color-border);">
                ${(plan.waitingPeriods || []).map(wp => `<div style="margin-bottom: 4px; font-size: 0.875rem;"><strong>${wp.title}:</strong> ${wp.desc}</div>`).join('')}
              </td>
            `).join('')}
          </tr>
          <tr>
            <td class="feature-label" style="padding: 14px 16px; border-bottom: 1px solid var(--color-border); font-weight: 600; color: var(--color-navy);">Important Notes</td>
            ${selectedPlans.map(plan => `
              <td style="padding: 14px 16px; border-bottom: 1px solid var(--color-border);">
                <ul style="list-style: disc; padding-left: 18px; margin: 0; font-size: 0.875rem;">
                  ${(plan.importantNotes || []).map(note => `<li style="margin-bottom: 4px;">${note}</li>`).join('')}
                </ul>
              </td>
            `).join('')}
          </tr>
        </tbody>
      </table>
    </div>
  `;
}
