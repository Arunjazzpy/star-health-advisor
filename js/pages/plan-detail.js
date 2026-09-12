// js/pages/plan-detail.js
import { icons } from '../utils/icons.js';
import { getPlanBySlug } from '../data/plans.js';
import { FaqAccordion, initFaqAccordion } from '../components/faq-accordion.js';
import { State } from '../state.js';
import { Router } from '../router.js';

export function render(params) {
  const plan = getPlanBySlug(params.slug);
  
  if (!plan) {
    return `
      <div class="container text-center py-24">
        <div class="text-6xl mb-4">🔍</div>
        <h1 class="text-3xl font-bold mb-4">Plan Not Found</h1>
        <p class="text-gray-600 mb-8">We couldn't find the plan you're looking for.</p>
        <a href="#/plans" class="btn btn-primary">Browse All Plans</a>
      </div>
    `;
  }
  
  const savedPlans = State.get('savedPlans') || [];
  const isSaved = savedPlans.includes(plan.slug);

  return `
    <div class="plan-detail">
      <div class="bg-gradient-to-r from-blue-900 to-navy text-white py-12">
        <div class="container">
          <div class="text-sm opacity-80 mb-6 font-medium">
            <a href="#/plans" class="hover-underline">Plans</a> &gt; <span>${plan.name}</span>
          </div>
          <h1 class="text-4xl font-bold mb-4">${plan.name}</h1>
          <p class="text-xl opacity-90 max-w-3xl mb-6">${plan.tagline || plan.shortDescription || 'Comprehensive coverage for you.'}</p>
          <div class="flex flex-wrap gap-2">
            ${(plan.suitableFor || []).map(tag => `<span class="bg-white/20 px-3 py-1 rounded-full text-sm">${tag}</span>`).join('')}
          </div>
        </div>
      </div>
      
      <div class="container section plan-detail__layout grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="plan-detail__main lg:col-span-2 space-y-12">
          
          <section id="about">
            <h2 class="text-2xl font-bold mb-4 border-b pb-2">What is this plan?</h2>
            <div class="prose max-w-none text-gray-700 leading-relaxed">
              <p>${plan.description || plan.longDescription || plan.shortDescription || ''}</p>
            </div>
          </section>

          ${plan.suitableForDesc ? `
          <section id="suitable-for">
            <h2 class="text-2xl font-bold mb-4 border-b pb-2">Who is it suitable for?</h2>
            <p class="text-gray-700">${plan.suitableForDesc}</p>
          </section>` : ''}

          <section id="benefits">
            <h2 class="text-2xl font-bold mb-4 border-b pb-2">Key Benefits</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${(plan.benefits || []).map(benefit => `
                <div class="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                  <div class="text-success mt-1 flex-shrink-0">${icons.check || '✓'}</div>
                  <div>
                    <h4 class="font-semibold">${benefit.title}</h4>
                    <p class="text-sm text-gray-600">${benefit.desc}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </section>

          <section id="eligibility">
            <h2 class="text-2xl font-bold mb-4 border-b pb-2">Eligibility</h2>
            <ul class="space-y-3 text-gray-700">
              <li class="flex gap-2"><span class="font-medium min-w-[150px]">Entry Age:</span> <span>${plan.eligibility?.entryAge || 'Check brochure'}</span></li>
              <li class="flex gap-2"><span class="font-medium min-w-[150px]">Family Definition:</span> <span>${plan.eligibility?.familyDefinition || 'Check brochure'}</span></li>
              <li class="flex gap-2"><span class="font-medium min-w-[150px]">Renewability:</span> <span>${plan.eligibility?.renewability || 'Lifelong'}</span></li>
            </ul>
          </section>

          ${plan.waitingPeriods && plan.waitingPeriods.length ? `
          <section id="waiting-periods">
            <h2 class="text-2xl font-bold mb-4 border-b pb-2">Waiting Periods</h2>
            <ul class="list-disc pl-5 space-y-2 text-gray-700">
              ${plan.waitingPeriods.map(wp => `<li><strong>${wp.title}:</strong> ${wp.desc}</li>`).join('')}
            </ul>
          </section>` : ''}

          ${plan.importantNotes && plan.importantNotes.length ? `
          <section id="important">
            <h2 class="text-2xl font-bold mb-4 border-b pb-2">Important things to know</h2>
            <ul class="list-disc pl-5 space-y-2 text-gray-700">
              ${plan.importantNotes.map(note => `<li>${note}</li>`).join('')}
            </ul>
          </section>` : ''}

          ${plan.exclusions && plan.exclusions.length ? `
          <section id="exclusions">
            <h2 class="text-2xl font-bold mb-4 border-b pb-2">Exclusions & Limitations</h2>
            <div class="bg-red-50 p-4 rounded-lg text-gray-700">
              <ul class="space-y-2">
                ${plan.exclusions.map(ex => `
                  <li class="flex items-start gap-2">
                    <span class="text-error mt-0.5">${icons.info || 'i'}</span>
                    <span>${ex}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          </section>` : ''}

          ${plan.faqs && plan.faqs.length ? `
          <section id="faqs">
            <h2 class="text-2xl font-bold mb-4 border-b pb-2">Frequently Asked Questions</h2>
            ${FaqAccordion(plan.faqs.map(f => ({ question: f.q, answer: f.a })))}
          </section>` : ''}
          
        </div>
        
        <div class="plan-detail__sidebar relative">
          <div class="plan-detail__sidebar-card card sticky top-24 p-6 shadow-lg border border-gray-100">
            <h3 class="text-xl font-bold mb-6">${plan.name}</h3>
            
            <div class="space-y-4">
              <a href="#/get-guidance" class="btn btn-primary btn-full justify-center">Talk to an Advisor</a>
              <a href="#/find-my-plan" class="btn btn-outline btn-full justify-center">Check if this may suit me</a>
            </div>
            
            <hr class="my-6 border-gray-200">
            
            <div class="flex gap-4">
              <button id="btn-save" data-plan-slug="${plan.slug}" class="btn btn-ghost flex-1 justify-center ${isSaved ? 'text-primary' : 'text-gray-600'}">
                ${icons.bookmark || '🔖'} <span class="ml-2">${isSaved ? 'Saved' : 'Save Plan'}</span>
              </button>
              <a href="https://api.whatsapp.com/send?phone=918848679874&text=Hi%20Arun%20Kumar%2C%20I%20am%20interested%20in%20learning%20more%20about%20this%20plan." target="_blank" rel="noopener noreferrer" class="btn btn-ghost flex-1 justify-center text-green-600">
                ${icons.whatsapp || '💬'} <span class="ml-2">WhatsApp</span>
              </a>
            </div>
            
            <div class="mt-6 text-xs text-center text-gray-500">
              Advisor: Arun Kumar M T<br>
              Email: arunarunkumarmt@gmail.com
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function mount(params) {
  if (document.querySelector('.plan-detail__main .accordion')) {
    initFaqAccordion('.plan-detail__main .accordion');
  }
  
  const btnSave = document.getElementById('btn-save');
  if (btnSave) {
    btnSave.addEventListener('click', (e) => {
      const btn = e.currentTarget;
      const planSlug = btn.dataset.planSlug;
      let savedPlans = State.get('savedPlans') || [];
      
      if (savedPlans.includes(planSlug)) {
        savedPlans = savedPlans.filter(s => s !== planSlug);
        btn.classList.remove('text-primary');
        btn.classList.add('text-gray-600');
        btn.querySelector('span').textContent = 'Save Plan';
      } else {
        savedPlans.push(planSlug);
        btn.classList.remove('text-gray-600');
        btn.classList.add('text-primary');
        btn.querySelector('span').textContent = 'Saved';
      }
      State.set('savedPlans', savedPlans);
    });
  }
}

export function unmount() {}
