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

export function render(params) {
  const savedData = State.get('findMyPlanData');
  if (savedData && params.resume) {
    state = savedData;
  } else if (!params.step) {
    state.currentStep = 1;
  }
  
  return `
    <div class="find-plan min-h-screen bg-slate-50 flex flex-col">
      <div class="bg-white border-b sticky top-0 z-10 py-4">
        <div class="container max-w-4xl">
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm font-semibold text-gray-500">Step ${state.currentStep} of 6</span>
            <button class="btn btn-ghost btn-sm btn-close">${icons.x || 'X'}</button>
          </div>
          <div class="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div class="bg-primary h-full transition-all duration-300" style="width: ${(state.currentStep / 6) * 100}%"></div>
          </div>
        </div>
      </div>
      
      <div class="flex-grow container max-w-3xl py-12" id="step-container">
        ${renderCurrentStep()}
      </div>
      
      <div class="bg-white border-t py-4 sticky bottom-0 z-10">
        <div class="container max-w-4xl flex justify-between items-center">
          ${state.currentStep > 1 && state.currentStep < 6 
            ? `<button class="btn btn-ghost btn-back">${icons.chevronLeft || '<'} Back</button>` 
            : `<div></div>`}
          
          ${state.currentStep < 5 
            ? `<button class="btn btn-primary btn-next px-8">Next ${icons.chevronRight || '>'}</button>` 
            : state.currentStep === 5 
              ? `<button class="btn btn-primary btn-next px-8">See Results</button>`
              : `<div></div>`
          }
        </div>
      </div>
    </div>
  `;
}

function renderCurrentStep() {
  const stepContent = [
    renderStep1,
    renderStep2,
    renderStep3,
    renderStep4,
    renderStep5,
    renderStep6
  ][state.currentStep - 1]();
  
  return `<div class="step-enter animate-on-scroll fade-in">${stepContent}</div>`;
}

function renderStep1() {
  const options = [
    { id: 'myself', label: 'Myself', icon: icons.user || '👤' },
    { id: 'spouse', label: 'Myself + Spouse', icon: icons.heart || '❤️' },
    { id: 'family', label: 'My Family', icon: icons.users || '👨‍👩‍👧‍👦' },
    { id: 'parents', label: 'My Parents', icon: icons.user || '👵👴' },
    { id: 'children', label: 'Children', icon: icons.user || '👶' },
    { id: 'myself_parents', label: 'Myself + Parents', icon: icons.users || '👪' },
    { id: 'other', label: 'Other', icon: icons.plus || '➕' }
  ];

  return `
    <h1 class="text-3xl font-bold mb-8 text-center text-navy">Who would you like to protect?</h1>
    <div class="grid grid-2 md:grid-cols-3 gap-4">
      ${options.map(opt => `
        <div class="selectable-card card p-6 text-center cursor-pointer border-2 transition-all ${state.answers.protectWho === opt.id ? 'border-primary bg-primary-light/10 ring-2 ring-primary/20' : 'border-gray-200 hover:border-primary/50'}" data-type="single" data-field="protectWho" data-value="${opt.id}">
          <div class="text-3xl mb-3 text-primary mx-auto flex justify-center">${opt.icon}</div>
          <div class="font-medium">${opt.label}</div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderStep2() {
  return `
    <h1 class="text-3xl font-bold mb-8 text-center text-navy">Tell us about your family</h1>
    <p class="text-center text-gray-600 mb-8">This helps us find plans with appropriate age eligibility and family combinations.</p>
    
    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8" id="add-member-form">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div class="form-group mb-0">
          <label class="form-label text-sm">Name (Optional)</label>
          <input type="text" id="member-name" class="form-input" placeholder="e.g. Rahul">
        </div>
        <div class="form-group mb-0">
          <label class="form-label text-sm">Relationship</label>
          <select id="member-rel" class="form-select">
            <option value="Self">Self</option>
            <option value="Spouse">Spouse</option>
            <option value="Son">Son</option>
            <option value="Daughter">Daughter</option>
            <option value="Father">Father</option>
            <option value="Mother">Mother</option>
            <option value="Father-in-law">Father-in-law</option>
            <option value="Mother-in-law">Mother-in-law</option>
          </select>
        </div>
        <div class="form-group mb-0">
          <label class="form-label text-sm">Age (Years)</label>
          <input type="number" id="member-age" class="form-input" min="0" max="120" placeholder="e.g. 35">
        </div>
      </div>
      <button class="btn btn-outline btn-sm" id="btn-add-member">${icons.plus || '+'} Add family member</button>
    </div>

    <div class="space-y-3" id="members-list">
      ${state.answers.familyMembers.length === 0 ? '<p class="text-center text-gray-500 italic">No members added yet.</p>' : ''}
      ${state.answers.familyMembers.map((m, i) => `
        <div class="member-row flex justify-between items-center bg-slate-50 p-4 rounded-lg border border-gray-200">
          <div>
            <span class="font-semibold">${m.relationship}</span>
            <span class="text-gray-500 ml-2">${m.name ? \`(\${m.name})\` : ''}</span>
            <span class="ml-4 text-sm bg-white px-2 py-1 rounded border border-gray-200">Age: ${m.age}</span>
          </div>
          <button class="btn-remove-member text-error hover:bg-red-50 p-2 rounded" data-index="${i}">${icons.x || 'X'}</button>
        </div>
      `).join('')}
    </div>
  `;
}

function renderStep3() {
  const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  
  return `
    <h1 class="text-3xl font-bold mb-4 text-center text-navy">What budget are you comfortable with?</h1>
    <p class="text-center text-gray-600 mb-12">Select an approximate annual premium you are willing to pay.</p>
    
    <div class="max-w-xl mx-auto">
      <div class="text-center mb-8">
        <div class="text-4xl font-bold text-primary mb-2" id="budget-display">${state.answers.budget ? formatCurrency(state.answers.budget) + '/yr' : 'Not sure'}</div>
      </div>
      
      <input type="range" id="budget-slider" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary mb-4" min="5000" max="50000" step="1000" value="${state.answers.budget || 25000}">
      
      <div class="flex justify-between text-sm text-gray-500 font-medium mb-12">
        <span>₹5,000/yr</span>
        <span>₹50,000+/yr</span>
      </div>
      
      <div class="text-center">
        <button class="btn btn-ghost text-gray-500 hover:text-gray-800" id="btn-no-budget">I don't know my budget</button>
      </div>
    </div>
  `;
}

function renderStep4() {
  const priorities = [
    { id: 'affordable', label: 'Affordable Premium', icon: icons.dollarSign || '💰' },
    { id: 'family', label: 'Family Protection', icon: icons.users || '👨‍👩‍👧‍👦' },
    { id: 'high_cover', label: 'Higher Coverage', icon: icons.trending || '📈' },
    { id: 'senior', label: 'Senior Citizen Care', icon: icons.user || '👴' },
    { id: 'hospital', label: 'Hospitalisation', icon: icons.activity || '🏥' },
    { id: 'critical', label: 'Critical Illness', icon: icons.heart || '❤️' },
    { id: 'maternity', label: 'Maternity Cover', icon: icons.user || '👶' },
    { id: 'not_sure', label: 'Not Sure', icon: icons.helpCircle || '❓' }
  ];

  return `
    <h1 class="text-3xl font-bold mb-4 text-center text-navy">What matters most to you?</h1>
    <p class="text-center text-gray-600 mb-8">Select up to 3 features that are important to you.</p>
    
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      ${priorities.map(p => `
        <div class="selectable-card card p-4 text-center cursor-pointer border-2 transition-all ${state.answers.priorities.includes(p.id) ? 'border-primary bg-primary-light/10 ring-2 ring-primary/20' : 'border-gray-200 hover:border-primary/50'}" data-type="multi" data-field="priorities" data-value="${p.id}">
          <div class="text-2xl mb-2 text-primary mx-auto flex justify-center">${p.icon}</div>
          <div class="font-medium text-sm">${p.label}</div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderStep5() {
  return `
    <h1 class="text-3xl font-bold mb-4 text-center text-navy">Where are you located?</h1>
    <p class="text-center text-gray-600 mb-8">Premium rates and network hospitals vary by location.</p>
    
    <div class="max-w-md mx-auto">
      <div class="form-group">
        <label class="form-label">City / PIN Code</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            ${icons.mapPin || '📍'}
          </div>
          <input type="text" id="location-input" class="form-input form-input-lg pl-10 w-full" placeholder="e.g. Mumbai or 400001" value="${state.answers.location || ''}">
        </div>
      </div>
    </div>
  `;
}

function renderStep6() {
  const matchedPlans = matchPlans ? matchPlans({
    coverFor: state.answers.protectWho,
    priorities: state.answers.priorities,
    budget: state.answers.budget
  }) : [];
  
  return `
    <div class="text-center mb-10">
      <div class="inline-block bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-bold mb-4 flex items-center justify-center gap-2 max-w-max mx-auto">
        ${icons.check || '✓'} Analysis Complete
      </div>
      <h1 class="text-3xl font-bold mb-4 text-navy">Plans to explore based on your preferences</h1>
      <p class="text-gray-600 max-w-2xl mx-auto">We've found these potential matches based on your family size, age, and priorities. Review them or speak to an advisor for a final recommendation.</p>
    </div>
    
    ${matchedPlans.length > 0 ? `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        ${matchedPlans.slice(0, 4).map(match => `
          <div class="relative">
            <div class="absolute -top-3 -right-3 z-10 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
              ${icons.star || '★'} Potential Match
            </div>
            ${PlanCard(match.plan, { showCompare: true })}
            <div class="bg-blue-50 mt-[-10px] pt-6 pb-4 px-4 rounded-b-xl border border-t-0 border-blue-100 text-sm text-blue-800">
              <strong class="block mb-1">Why this fits:</strong>
              ${match.reasons.join(' • ')}
            </div>
          </div>
        `).join('')}
      </div>
    ` : `
      <div class="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200 mb-12">
        <div class="text-4xl mb-4">🤔</div>
        <h3 class="text-xl font-bold mb-2">We couldn't find an exact match</h3>
        <p class="text-gray-600 mb-6">Your requirements are unique. Our advisors can help craft a custom solution.</p>
        <a href="#/get-guidance" class="btn btn-primary">Talk to an Advisor</a>
      </div>
    `}
    
    <div class="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
      <h3 class="text-xl font-bold mb-6">Next Steps</h3>
      <div class="flex flex-wrap justify-center gap-4">
        <a href="#/compare" class="btn btn-outline">Compare Selected</a>
        <a href="#/get-guidance" class="btn btn-primary">Get Personalised Guidance</a>
        <button id="btn-restart" class="btn btn-ghost">Start Over</button>
      </div>
    </div>
  `;
}

export function mount(params) {
  const container = document.getElementById('step-container');
  const btnNext = document.querySelector('.btn-next');
  const btnBack = document.querySelector('.btn-back');
  const btnClose = document.querySelector('.btn-close');
  
  if (btnNext) {
    btnNext.addEventListener('click', () => {
      saveStepData();
      if (state.currentStep < 6) {
        state.currentStep++;
        updateView();
      }
    });
  }
  
  if (btnBack) {
    btnBack.addEventListener('click', () => {
      saveStepData();
      if (state.currentStep > 1) {
        state.currentStep--;
        updateView();
      }
    });
  }
  
  if (btnClose) {
    btnClose.addEventListener('click', () => {
      Router.navigate('/');
    });
  }
  
  attachStepHandlers();
  
  function updateView() {
    State.set('findMyPlanData', state);
    const container = document.getElementById('page-content');
    if (container) {
      container.innerHTML = render(params);
      mount(params);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
  
  function saveStepData() {
    if (state.currentStep === 3) {
      const slider = document.getElementById('budget-slider');
      if (slider) state.answers.budget = parseInt(slider.value, 10);
    } else if (state.currentStep === 5) {
      const input = document.getElementById('location-input');
      if (input) state.answers.location = input.value;
    }
  }
  
  function attachStepHandlers() {
    document.querySelectorAll('.selectable-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const type = card.dataset.type;
        const field = card.dataset.field;
        const value = card.dataset.value;
        
        if (type === 'single') {
          state.answers[field] = value;
          setTimeout(() => {
            if (btnNext) btnNext.click();
          }, 300);
        } else if (type === 'multi') {
          let arr = state.answers[field];
          if (arr.includes(value)) {
            state.answers[field] = arr.filter(v => v !== value);
            card.classList.remove('border-primary', 'bg-primary-light/10', 'ring-2', 'ring-primary/20');
            card.classList.add('border-gray-200');
          } else {
            if (arr.length < 3) {
              arr.push(value);
              card.classList.add('border-primary', 'bg-primary-light/10', 'ring-2', 'ring-primary/20');
              card.classList.remove('border-gray-200');
            } else {
              alert('You can select up to 3 priorities.');
            }
          }
        }
      });
    });
    
    const btnAddMember = document.getElementById('btn-add-member');
    if (btnAddMember) {
      btnAddMember.addEventListener('click', () => {
        const name = document.getElementById('member-name').value;
        const rel = document.getElementById('member-rel').value;
        const age = document.getElementById('member-age').value;
        
        if (!age) {
          alert('Please enter age.');
          return;
        }
        
        state.answers.familyMembers.push({ name, relationship: rel, age: parseInt(age, 10) });
        updateView();
      });
    }
    
    document.querySelectorAll('.btn-remove-member').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.dataset.index, 10);
        state.answers.familyMembers.splice(idx, 1);
        updateView();
      });
    });
    
    const budgetSlider = document.getElementById('budget-slider');
    const budgetDisplay = document.getElementById('budget-display');
    const btnNoBudget = document.getElementById('btn-no-budget');
    
    if (budgetSlider) {
      budgetSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        state.answers.budget = val;
        const formatCurrency = (v) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);
        budgetDisplay.textContent = formatCurrency(val) + '/yr';
      });
    }
    
    if (btnNoBudget) {
      btnNoBudget.addEventListener('click', () => {
        state.answers.budget = null;
        if (btnNext) btnNext.click();
      });
    }
    
    const btnRestart = document.getElementById('btn-restart');
    if (btnRestart) {
      btnRestart.addEventListener('click', () => {
        state = {
          currentStep: 1,
          answers: { protectWho: null, familyMembers: [], budget: 25000, priorities: [], location: '' }
        };
        State.set('findMyPlanData', state);
        updateView();
      });
    }

    document.querySelectorAll('.compare-checkbox').forEach(chk => {
      chk.addEventListener('change', (e) => {
        const slug = e.target.dataset.slug || e.target.value;
        if (e.target.checked) {
          State.addComparePlan(slug);
        } else {
          State.removeComparePlan(slug);
        }
      });
    });
  }
}

export function unmount() {
  State.set('findMyPlanData', state);
}
