// js/pages/find-my-plan.js
import { icons } from '../utils/icons.js';
import { plans, matchPlans } from '../data/plans.js';
import { PlanCard } from '../components/plan-card.js';
import { State } from '../state.js';
import { Router } from '../router.js';

let state = {
  currentStep: 1,
  answers: {
    protectWho: null,
    familyMembers: [],
    budget: 25000,
    priorities: [],
    location: ''
  }
};

let isTransitioning = false;

function safeAnswers() {
  if (!state || typeof state !== 'object') {
    state = { currentStep: 1, answers: {} };
  }
  if (!state.answers || typeof state.answers !== 'object') {
    state.answers = {
      protectWho: null,
      familyMembers: [],
      budget: 25000,
      priorities: [],
      location: ''
    };
  }
  if (!Array.isArray(state.answers.familyMembers)) state.answers.familyMembers = [];
  if (!Array.isArray(state.answers.priorities)) state.answers.priorities = [];
  return state.answers;
}

export function render(params = {}) {
  try {
    let saved = null;
    try {
      if (State && typeof State.get === 'function') {
        saved = State.get('findMyPlan');
      }
    } catch (e) {}

    if (params && params.resume && saved && typeof saved === 'object' && saved.answers) {
      state = saved;
    } else if (!params || !params.step) {
      state = {
        currentStep: 1,
        answers: {
          protectWho: null,
          familyMembers: [],
          budget: 25000,
          priorities: [],
          location: ''
        }
      };
    }

    const currentStepNum = Math.min(Math.max(1, state.currentStep || 1), 6);

    return `
      <div class="find-plan min-h-screen bg-slate-50 flex flex-col" style="opacity: 1; visibility: visible; min-height: 80vh;">
        <!-- Step Header -->
        <div class="bg-white border-b sticky top-0 z-10 py-4" style="background: #FFFFFF; border-bottom: 1px solid #E2E8F0; position: sticky; top: 0; z-index: 10;">
          <div class="container max-w-4xl" style="max-width: 56rem; margin: 0 auto; padding: 0 1rem;">
            <div class="flex justify-between items-center mb-2" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <span class="text-sm font-semibold text-gray-500" id="step-indicator-text" style="color: #64748B; font-weight: 600; font-size: 0.875rem;">Step ${currentStepNum} of 6</span>
              <button type="button" class="btn btn-ghost btn-sm btn-close" style="background: transparent; border: none; cursor: pointer; font-size: 1.25rem;">✕</button>
            </div>
            <div class="w-full bg-gray-200 h-2 rounded-full overflow-hidden" style="background: #E2E8F0; height: 8px; border-radius: 9999px; overflow: hidden;">
              <div class="bg-primary h-full transition-all duration-300" id="step-progress-bar" style="width: ${(currentStepNum / 6) * 100}%; background: #2563EB; height: 100%; transition: width 0.3s ease;"></div>
            </div>
          </div>
        </div>
        
        <!-- Step Content Container -->
        <div class="flex-grow container max-w-3xl py-8" id="step-container" style="max-width: 48rem; margin: 0 auto; padding: 2rem 1rem; flex-grow: 1;">
          ${renderCurrentStep()}
        </div>
        
        <!-- Step Footer Navigation -->
        <div class="bg-white border-t py-4 sticky bottom-0 z-10" id="footer-actions" style="background: #FFFFFF; border-top: 1px solid #E2E8F0; position: sticky; bottom: 0; z-index: 10;">
          ${renderFooterActions()}
        </div>
      </div>
    `;
  } catch (err) {
    console.error('Fatal render error in find-my-plan:', err);
    return `
      <div class="container max-w-3xl py-12 text-center" style="max-width: 48rem; margin: 0 auto; padding: 3rem 1rem; text-align: center;">
        <h2 style="font-size: 1.5rem; color: #0F172A; margin-bottom: 1rem; font-weight: 700;">Find My Plan</h2>
        <p style="color: #64748B; margin-bottom: 1.5rem;">Let us help you find the right coverage.</p>
        <a href="#/get-guidance" class="btn btn-primary" style="display: inline-block; background: #2563EB; color: #FFF; padding: 0.75rem 1.5rem; border-radius: 8px; text-decoration: none; font-weight: 600;">Get Guidance from Advisor</a>
      </div>
    `;
  }
}

function renderFooterActions() {
  const currentStepNum = Math.min(Math.max(1, state.currentStep || 1), 6);
  return `
    <div class="container max-w-4xl flex justify-between items-center" style="display: flex; justify-content: space-between; align-items: center; max-width: 56rem; margin: 0 auto; padding: 0 1rem;">
      ${currentStepNum > 1 && currentStepNum < 6 
        ? `<button type="button" class="btn btn-outline btn-back" style="padding: 0.5rem 1.25rem; border: 1.5px solid #CBD5E1; border-radius: 8px; background: #FFF; color: #0F172A; font-weight: 600; cursor: pointer;">← Back</button>` 
        : `<div></div>`}
      
      ${currentStepNum < 5 
        ? `<button type="button" class="btn btn-primary btn-next px-8" style="padding: 0.5rem 1.75rem; border: none; border-radius: 8px; background: #2563EB; color: #FFF; font-weight: 600; cursor: pointer;">Next →</button>` 
        : currentStepNum === 5 
          ? `<button type="button" class="btn btn-primary btn-next px-8" style="padding: 0.5rem 1.75rem; border: none; border-radius: 8px; background: #2563EB; color: #FFF; font-weight: 600; cursor: pointer;">See Results</button>`
          : `<div></div>`
      }
    </div>
  `;
}

function renderCurrentStep() {
  try {
    const stepIndex = Math.min(Math.max(1, state.currentStep || 1), 6) - 1;
    const stepFns = [
      renderStep1,
      renderStep2,
      renderStep3,
      renderStep4,
      renderStep5,
      renderStep6
    ];
    const stepFn = stepFns[stepIndex] || renderStep1;
    return `<div class="step-card-wrapper" style="opacity: 1; visibility: visible; display: block;">${stepFn()}</div>`;
  } catch (e) {
    console.error('Error rendering step:', e);
    return renderStep1();
  }
}

function renderStep1() {
  const answers = safeAnswers();
  const options = [
    { id: 'myself', label: 'Myself', icon: (icons && icons.user) || '👤' },
    { id: 'spouse', label: 'Myself + Spouse', icon: (icons && icons.heart) || '❤️' },
    { id: 'family', label: 'My Family', icon: (icons && icons.users) || '👨‍👩‍👧‍👦' },
    { id: 'parents', label: 'My Parents', icon: (icons && icons.user) || '👵👴' },
    { id: 'children', label: 'Children', icon: (icons && icons.user) || '👶' },
    { id: 'myself_parents', label: 'Myself + Parents', icon: (icons && icons.users) || '👪' },
    { id: 'other', label: 'Other', icon: (icons && icons.plus) || '➕' }
  ];

  return `
    <h1 class="text-3xl font-bold mb-8 text-center text-navy" style="font-size: 1.875rem; font-weight: 700; color: #0F172A; text-align: center; margin-bottom: 2rem;">Who would you like to protect?</h1>
    <div class="grid grid-2 md:grid-cols-3 gap-4" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
      ${options.map(opt => `
        <div class="selectable-card card p-6 text-center cursor-pointer border-2 transition-all ${answers.protectWho === opt.id ? 'border-primary bg-primary-light/10 ring-2 ring-primary/20' : 'border-gray-200 hover:border-primary/50'}" data-type="single" data-field="protectWho" data-value="${opt.id}" style="padding: 1.5rem; text-align: center; cursor: pointer; border-radius: 12px; background: #FFFFFF; border: 2px solid ${answers.protectWho === opt.id ? '#2563EB' : '#E2E8F0'}; transition: all 0.2s ease;">
          <div class="text-3xl mb-3 text-primary mx-auto flex justify-center" style="font-size: 2rem; margin-bottom: 0.75rem; color: #2563EB; display: flex; justify-content: center;">${opt.icon}</div>
          <div class="font-medium" style="color: #0F172A; font-weight: 600; font-size: 1rem;">${opt.label}</div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderStep2() {
  const answers = safeAnswers();
  return `
    <h1 class="text-3xl font-bold mb-4 text-center text-navy" style="font-size: 1.875rem; font-weight: 700; color: #0F172A; text-align: center; margin-bottom: 0.75rem;">Tell us about your family</h1>
    <p class="text-center text-gray-600 mb-8" style="text-align: center; color: #475569; margin-bottom: 2rem;">This helps us find plans with appropriate age eligibility and family combinations.</p>
    
    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8" id="add-member-form" style="background: #FFFFFF; padding: 1.5rem; border-radius: 12px; border: 1px solid #E2E8F0; margin-bottom: 2rem;">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
        <div class="form-group mb-0">
          <label class="form-label text-sm" style="color: #0F172A; font-weight: 600; display: block; margin-bottom: 0.5rem;">Name (Optional)</label>
          <input type="text" id="member-name" class="form-input" placeholder="e.g. Rahul" style="color: #0F172A; background: #FFFFFF; border: 1.5px solid #CBD5E1; padding: 0.75rem; border-radius: 8px; width: 100%;">
        </div>
        <div class="form-group mb-0">
          <label class="form-label text-sm" style="color: #0F172A; font-weight: 600; display: block; margin-bottom: 0.5rem;">Relationship</label>
          <select id="member-rel" class="form-select" style="color: #0F172A; background: #FFFFFF; border: 1.5px solid #CBD5E1; padding: 0.75rem; border-radius: 8px; width: 100%;">
            <option value="Self" style="color: #0F172A; background: #FFF;">Self</option>
            <option value="Spouse" style="color: #0F172A; background: #FFF;">Spouse</option>
            <option value="Son" style="color: #0F172A; background: #FFF;">Son</option>
            <option value="Daughter" style="color: #0F172A; background: #FFF;">Daughter</option>
            <option value="Father" style="color: #0F172A; background: #FFF;">Father</option>
            <option value="Mother" style="color: #0F172A; background: #FFF;">Mother</option>
            <option value="Father-in-law" style="color: #0F172A; background: #FFF;">Father-in-law</option>
            <option value="Mother-in-law" style="color: #0F172A; background: #FFF;">Mother-in-law</option>
          </select>
        </div>
        <div class="form-group mb-0">
          <label class="form-label text-sm" style="color: #0F172A; font-weight: 600; display: block; margin-bottom: 0.5rem;">Age (Years)</label>
          <input type="number" id="member-age" class="form-input" min="0" max="120" placeholder="e.g. 35" style="color: #0F172A; background: #FFFFFF; border: 1.5px solid #CBD5E1; padding: 0.75rem; border-radius: 8px; width: 100%;">
        </div>
      </div>
      <button type="button" class="btn btn-outline btn-sm" id="btn-add-member" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border: 1.5px solid #CBD5E1; border-radius: 8px; background: #FFF; color: #0F172A; font-weight: 600; cursor: pointer;">+ Add family member</button>
    </div>

    <div class="space-y-3" id="members-list" style="display: flex; flex-direction: column; gap: 0.75rem;">
      ${answers.familyMembers.length === 0 ? '<p class="text-center text-gray-500 italic" style="text-align: center; color: #64748B; font-style: italic;">No members added yet.</p>' : ''}
      ${answers.familyMembers.map((m, i) => `
        <div class="member-row flex justify-between items-center bg-slate-50 p-4 rounded-lg border border-gray-200" style="display: flex; justify-content: space-between; align-items: center; background: #F8FAFC; padding: 1rem; border-radius: 8px; border: 1px solid #E2E8F0;">
          <div>
            <span class="font-semibold" style="color: #0F172A; font-weight: 600;">${(m && m.relationship) || 'Member'}</span>
            <span class="text-gray-500 ml-2" style="color: #64748B;">${(m && m.name) ? `(${m.name})` : ''}</span>
            <span class="ml-4 text-sm bg-white px-2 py-1 rounded border border-gray-200" style="color: #0F172A; background: #FFF; padding: 0.25rem 0.5rem; border-radius: 4px; border: 1px solid #CBD5E1; margin-left: 0.5rem;">Age: ${(m && m.age) || 0}</span>
          </div>
          <button type="button" class="btn-remove-member text-error hover:bg-red-50 p-2 rounded" data-index="${i}" style="color: #EF4444; border: none; background: transparent; cursor: pointer; font-weight: 600;">✕</button>
        </div>
      `).join('')}
    </div>
  `;
}

function renderStep3() {
  const answers = safeAnswers();
  const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  
  return `
    <h1 class="text-3xl font-bold mb-4 text-center text-navy" style="font-size: 1.875rem; font-weight: 700; color: #0F172A; text-align: center; margin-bottom: 0.75rem;">What budget are you comfortable with?</h1>
    <p class="text-center text-gray-600 mb-12" style="text-align: center; color: #475569; margin-bottom: 2.5rem;">Select an approximate annual premium you are willing to pay.</p>
    
    <div class="max-w-xl mx-auto" style="max-width: 36rem; margin: 0 auto;">
      <div class="text-center mb-8" style="text-align: center; margin-bottom: 2rem;">
        <div class="text-4xl font-bold text-primary mb-2" id="budget-display" style="font-size: 2.25rem; font-weight: 700; color: #2563EB;">${answers.budget ? formatCurrency(answers.budget) + '/yr' : 'Not sure'}</div>
      </div>
      
      <input type="range" id="budget-slider" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary mb-4" min="5000" max="50000" step="1000" value="${answers.budget || 25000}" style="width: 100%; height: 8px; background: #E2E8F0; border-radius: 8px; outline: none; cursor: pointer; margin-bottom: 1rem;">
      
      <div class="flex justify-between text-sm text-gray-500 font-medium mb-12" style="display: flex; justify-content: space-between; font-size: 0.875rem; color: #64748B; margin-bottom: 2.5rem;">
        <span>₹5,000/yr</span>
        <span>₹50,000+/yr</span>
      </div>
      
      <div class="text-center" style="text-align: center;">
        <button type="button" class="btn btn-ghost text-gray-500 hover:text-gray-800" id="btn-no-budget" style="background: transparent; border: none; color: #64748B; cursor: pointer;">I don't know my budget</button>
      </div>
    </div>
  `;
}

function renderStep4() {
  const answers = safeAnswers();
  const priorities = [
    { id: 'affordable', label: 'Affordable Premium', icon: (icons && icons.dollarSign) || '💰' },
    { id: 'family', label: 'Family Protection', icon: (icons && icons.users) || '👨‍👩‍👧‍👦' },
    { id: 'high_cover', label: 'Higher Coverage', icon: (icons && icons.trending) || '📈' },
    { id: 'senior', label: 'Senior Citizen Care', icon: (icons && icons.user) || '👴' },
    { id: 'hospital', label: 'Hospitalisation', icon: (icons && icons.activity) || '🏥' },
    { id: 'critical', label: 'Critical Illness', icon: (icons && icons.heart) || '❤️' },
    { id: 'maternity', label: 'Maternity Cover', icon: (icons && icons.user) || '👶' },
    { id: 'not_sure', label: 'Not Sure', icon: (icons && icons.helpCircle) || '❓' }
  ];

  return `
    <h1 class="text-3xl font-bold mb-4 text-center text-navy" style="font-size: 1.875rem; font-weight: 700; color: #0F172A; text-align: center; margin-bottom: 0.75rem;">What matters most to you?</h1>
    <p class="text-center text-gray-600 mb-8" style="text-align: center; color: #475569; margin-bottom: 2rem;">Select up to 3 features that are important to you.</p>
    
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem;">
      ${priorities.map(p => `
        <div class="selectable-card card p-4 text-center cursor-pointer border-2 transition-all ${answers.priorities.includes(p.id) ? 'border-primary bg-primary-light/10 ring-2 ring-primary/20' : 'border-gray-200 hover:border-primary/50'}" data-type="multi" data-field="priorities" data-value="${p.id}" style="padding: 1rem; text-align: center; cursor: pointer; border-radius: 12px; background: #FFFFFF; border: 2px solid ${answers.priorities.includes(p.id) ? '#2563EB' : '#E2E8F0'}; transition: all 0.2s ease;">
          <div class="text-2xl mb-2 text-primary mx-auto flex justify-center" style="font-size: 1.5rem; margin-bottom: 0.5rem; color: #2563EB; display: flex; justify-content: center;">${p.icon}</div>
          <div class="font-medium text-sm" style="color: #0F172A; font-weight: 600; font-size: 0.875rem;">${p.label}</div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderStep5() {
  const answers = safeAnswers();
  return `
    <h1 class="text-3xl font-bold mb-4 text-center text-navy" style="font-size: 1.875rem; font-weight: 700; color: #0F172A; text-align: center; margin-bottom: 0.75rem;">Where are you located?</h1>
    <p class="text-center text-gray-600 mb-8" style="text-align: center; color: #475569; margin-bottom: 2rem;">Premium rates and network hospitals vary by location.</p>
    
    <div class="max-w-md mx-auto" style="max-width: 28rem; margin: 0 auto;">
      <div class="form-group">
        <label class="form-label" style="color: #0F172A; font-weight: 600; display: block; margin-bottom: 0.5rem;">City / PIN Code</label>
        <div class="relative" style="position: relative;">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400" style="position: absolute; top: 0; bottom: 0; left: 0; padding-left: 0.75rem; display: flex; align-items: center;">
            📍
          </div>
          <input type="text" id="location-input" class="form-input form-input-lg pl-10 w-full" placeholder="e.g. Mumbai or 400001" value="${answers.location || ''}" style="padding-left: 2.5rem; color: #0F172A; background: #FFFFFF; border: 1.5px solid #CBD5E1; padding-top: 0.75rem; padding-bottom: 0.75rem; border-radius: 8px; width: 100%;">
        </div>
      </div>
    </div>
  `;
}

function renderStep6() {
  const answers = safeAnswers();
  let matchedPlans = [];
  try {
    if (typeof matchPlans === 'function') {
      matchedPlans = matchPlans({
        coverFor: answers.protectWho,
        priorities: answers.priorities,
        budget: answers.budget
      }) || [];
    }
  } catch (e) {
    console.warn('Plan matching error:', e);
    matchedPlans = [];
  }
  
  matchedPlans = (matchedPlans || []).filter(m => m && m.plan && m.plan.slug);
  
  return `
    <div class="text-center mb-10" style="text-align: center; margin-bottom: 2.5rem;">
      <div class="inline-block bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-bold mb-4 flex items-center justify-center gap-2 max-w-max mx-auto" style="display: inline-flex; align-items: center; gap: 0.5rem; background: #DCFCE7; color: #166534; padding: 0.25rem 1rem; border-radius: 9999px; font-weight: 700; font-size: 0.875rem; margin-bottom: 1rem;">
        ✓ Analysis Complete
      </div>
      <h1 class="text-3xl font-bold mb-4 text-navy" style="font-size: 1.875rem; font-weight: 700; color: #0F172A; margin-bottom: 1rem;">Plans to explore based on your preferences</h1>
      <p class="text-gray-600 max-w-2xl mx-auto" style="color: #475569; max-width: 42rem; margin: 0 auto;">We've found these potential matches based on your family size, age, and priorities. Review them or speak to an advisor for a final recommendation.</p>
    </div>
    
    ${matchedPlans.length > 0 ? `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; margin-bottom: 3rem;">
        ${matchedPlans.slice(0, 4).map(match => `
          <div class="relative" style="position: relative;">
            <div class="absolute -top-3 -right-3 z-10 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1" style="position: absolute; top: -12px; right: -12px; z-index: 10; background: #2563EB; color: #FFF; font-size: 0.75rem; font-weight: 700; padding: 0.25rem 0.75rem; border-radius: 9999px;">
              ★ Potential Match
            </div>
            ${PlanCard(match.plan, { showCompare: true })}
            <div class="bg-blue-50 mt-[-10px] pt-6 pb-4 px-4 rounded-b-xl border border-t-0 border-blue-100 text-sm text-blue-800" style="background: #EFF6FF; border: 1px solid #DBEAFE; border-top: none; padding: 1.5rem 1rem 1rem 1rem; border-bottom-left-radius: 12px; border-bottom-right-radius: 12px; color: #1E40AF; font-size: 0.875rem;">
              <strong class="block mb-1" style="display: block; margin-bottom: 0.25rem;">Why this fits:</strong>
              ${(match.reasons || []).join(' • ')}
            </div>
          </div>
        `).join('')}
      </div>
    ` : `
      <div class="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200 mb-12" style="text-align: center; padding: 3rem 1.5rem; background: #FFF; border-radius: 12px; border: 1px solid #E2E8F0; margin-bottom: 3rem;">
        <div class="text-4xl mb-4" style="font-size: 2.25rem; margin-bottom: 1rem;">🤔</div>
        <h3 class="text-xl font-bold mb-2" style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">We couldn't find an exact match</h3>
        <p class="text-gray-600 mb-6" style="color: #475569; margin-bottom: 1.5rem;">Your requirements are unique. Our advisors can help craft a custom solution.</p>
        <a href="#/get-guidance" class="btn btn-primary" style="display: inline-block; background: #2563EB; color: #FFF; padding: 0.75rem 1.5rem; border-radius: 8px; text-decoration: none; font-weight: 600;">Talk to an Advisor</a>
      </div>
    `}
    
    <div class="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center" style="background: #FFF; padding: 2rem; border-radius: 12px; border: 1px solid #E2E8F0; text-align: center;">
      <h3 class="text-xl font-bold mb-6" style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1.5rem;">Next Steps</h3>
      <div class="flex flex-wrap justify-center gap-4" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem;">
        <a href="#/plans" class="btn btn-outline" style="padding: 0.5rem 1.25rem; border: 1.5px solid #CBD5E1; border-radius: 8px; background: #FFF; color: #0F172A; text-decoration: none; font-weight: 600;">Explore All Plans</a>
        <a href="#/get-guidance" class="btn btn-primary" style="padding: 0.5rem 1.25rem; border: none; border-radius: 8px; background: #2563EB; color: #FFF; text-decoration: none; font-weight: 600;">Get Personalised Guidance</a>
        <button type="button" id="btn-restart" class="btn btn-ghost" style="background: transparent; border: none; color: #64748B; cursor: pointer;">Start Over</button>
      </div>
    </div>
  `;
}

export function mount(params = {}) {
  isTransitioning = false;
  try {
    attachStepHandlers();
  } catch (e) {
    console.error('Error mounting step handlers:', e);
  }
  
  function saveStepData() {
    try {
      const answers = safeAnswers();
      if (state.currentStep === 3) {
        const slider = document.getElementById('budget-slider');
        if (slider) answers.budget = parseInt(slider.value, 10);
      } else if (state.currentStep === 5) {
        const input = document.getElementById('location-input');
        if (input) answers.location = input.value;
      }
    } catch (e) {
      console.warn('Error saving step data:', e);
    }
  }

  function updateView() {
    try {
      if (State && typeof State.set === 'function') {
        State.set('findMyPlan', state);
      }
    } catch (e) {
      console.warn('Error saving state:', e);
    }
    
    const stepContainer = document.getElementById('step-container');
    const indicatorText = document.getElementById('step-indicator-text');
    const progressBar = document.getElementById('step-progress-bar');
    const footerActions = document.getElementById('footer-actions');
    
    if (stepContainer) {
      stepContainer.innerHTML = renderCurrentStep();
      const currentStepNum = Math.min(Math.max(1, state.currentStep || 1), 6);
      if (indicatorText) indicatorText.textContent = `Step ${currentStepNum} of 6`;
      if (progressBar) progressBar.style.width = `${(currentStepNum / 6) * 100}%`;
      if (footerActions) footerActions.innerHTML = renderFooterActions();
      
      attachStepHandlers();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const pageContent = document.getElementById('page-content');
      if (pageContent) {
        pageContent.innerHTML = render(params);
        mount(params);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }
  
  function attachStepHandlers() {
    const btnNext = document.querySelector('.btn-next');
    const btnBack = document.querySelector('.btn-back');
    const btnClose = document.querySelector('.btn-close');
    
    if (btnNext) {
      btnNext.onclick = (e) => {
        if (e) e.preventDefault();
        if (isTransitioning) return;
        isTransitioning = true;
        saveStepData();
        if (state.currentStep < 6) {
          state.currentStep++;
          updateView();
        }
        setTimeout(() => { isTransitioning = false; }, 200);
      };
    }
    
    if (btnBack) {
      btnBack.onclick = (e) => {
        if (e) e.preventDefault();
        if (isTransitioning) return;
        isTransitioning = true;
        saveStepData();
        if (state.currentStep > 1) {
          state.currentStep--;
          updateView();
        }
        setTimeout(() => { isTransitioning = false; }, 200);
      };
    }
    
    if (btnClose) {
      btnClose.onclick = (e) => {
        if (e) e.preventDefault();
        if (Router && typeof Router.navigate === 'function') {
          Router.navigate('/');
        } else {
          window.location.hash = '/';
        }
      };
    }

    document.querySelectorAll('.selectable-card').forEach(card => {
      card.onclick = (e) => {
        if (e) e.preventDefault();
        const type = card.dataset.type;
        const field = card.dataset.field;
        const value = card.dataset.value;
        const answers = safeAnswers();
        
        if (type === 'single') {
          if (isTransitioning) return;
          isTransitioning = true;
          answers[field] = value;
          
          document.querySelectorAll('.selectable-card').forEach(c => {
            c.style.borderColor = '#E2E8F0';
          });
          card.style.borderColor = '#2563EB';
          
          setTimeout(() => {
            if (state.currentStep < 6) {
              state.currentStep++;
              updateView();
            }
            isTransitioning = false;
          }, 150);
        } else if (type === 'multi') {
          let arr = answers[field];
          if (arr.includes(value)) {
            answers[field] = arr.filter(v => v !== value);
            card.style.borderColor = '#E2E8F0';
          } else {
            if (arr.length < 3) {
              arr.push(value);
              card.style.borderColor = '#2563EB';
            } else {
              if (window.State && typeof State.showToast === 'function') {
                State.showToast('You can select up to 3 priorities.', 'info');
              } else {
                alert('You can select up to 3 priorities.');
              }
            }
          }
        }
      };
    });
    
    const btnAddMember = document.getElementById('btn-add-member');
    if (btnAddMember) {
      btnAddMember.onclick = (e) => {
        if (e) e.preventDefault();
        const nameInput = document.getElementById('member-name');
        const relInput = document.getElementById('member-rel');
        const ageInput = document.getElementById('member-age');
        
        const name = nameInput ? nameInput.value : '';
        const rel = relInput ? relInput.value : 'Self';
        const age = ageInput ? ageInput.value : '';
        
        if (!age) {
          if (window.State && typeof State.showToast === 'function') {
            State.showToast('Please enter age.', 'error');
          } else {
            alert('Please enter age.');
          }
          return;
        }
        
        const answers = safeAnswers();
        answers.familyMembers.push({ name, relationship: rel, age: parseInt(age, 10) });
        updateView();
      };
    }
    
    document.querySelectorAll('.btn-remove-member').forEach(btn => {
      btn.onclick = (e) => {
        if (e) e.preventDefault();
        const idx = parseInt(e.currentTarget.dataset.index, 10);
        const answers = safeAnswers();
        answers.familyMembers.splice(idx, 1);
        updateView();
      };
    });
    
    const budgetSlider = document.getElementById('budget-slider');
    const budgetDisplay = document.getElementById('budget-display');
    const btnNoBudget = document.getElementById('btn-no-budget');
    
    if (budgetSlider) {
      budgetSlider.oninput = (e) => {
        const val = parseInt(e.target.value, 10);
        const answers = safeAnswers();
        answers.budget = val;
        const formatCurrency = (v) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);
        if (budgetDisplay) budgetDisplay.textContent = formatCurrency(val) + '/yr';
      };
    }
    
    if (btnNoBudget) {
      btnNoBudget.onclick = (e) => {
        if (e) e.preventDefault();
        const answers = safeAnswers();
        answers.budget = null;
        if (state.currentStep < 6) {
          state.currentStep++;
          updateView();
        }
      };
    }
    
    const btnRestart = document.getElementById('btn-restart');
    if (btnRestart) {
      btnRestart.onclick = (e) => {
        if (e) e.preventDefault();
        state = {
          currentStep: 1,
          answers: { protectWho: null, familyMembers: [], budget: 25000, priorities: [], location: '' }
        };
        try {
          if (State && typeof State.set === 'function') {
            State.set('findMyPlan', state);
          }
        } catch (err) {}
        updateView();
      };
    }

    document.querySelectorAll('.compare-checkbox').forEach(chk => {
      chk.onchange = (e) => {
        const slug = e.target.dataset.slug || e.target.value;
        if (e.target.checked) {
          if (State && typeof State.addComparePlan === 'function') State.addComparePlan(slug);
        } else {
          if (State && typeof State.removeComparePlan === 'function') State.removeComparePlan(slug);
        }
      };
    });
  }
}

export function unmount() {
  try {
    if (State && typeof State.set === 'function') {
      State.set('findMyPlan', state);
    }
  } catch (e) {}
}
