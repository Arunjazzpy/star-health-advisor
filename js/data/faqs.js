// ============================================================
// FAQ DATA
// ============================================================

export const faqCategories = [
  { id: 'all', label: 'All' },
  { id: 'getting-started', label: 'Getting Started' },
  { id: 'plans', label: 'Plans' },
  { id: 'premiums', label: 'Premiums' },
  { id: 'family', label: 'Family Coverage' },
  { id: 'senior', label: 'Senior Citizens' },
  { id: 'claims', label: 'Claims' },
  { id: 'documents', label: 'Documents' },
  { id: 'advisor', label: 'Advisor' }
];

export const faqs = [
  // Getting Started
  {
    id: 'gs-1',
    category: 'getting-started',
    question: 'What is health insurance and why do I need it?',
    answer: 'Health insurance is a financial safety net that covers medical expenses when you need treatment. It protects you from the high costs of hospitalisation, surgeries, and medical procedures. Without health insurance, a single medical emergency could significantly impact your savings.'
  },
  {
    id: 'gs-2',
    category: 'getting-started',
    question: 'I\'ve never bought health insurance before. Where do I start?',
    answer: 'Start by understanding who you want to cover (yourself, spouse, children, parents), your approximate budget, and what matters most to you (coverage amount, hospital network, specific benefits). Our "Find My Plan" tool can guide you through this process step by step.'
  },
  {
    id: 'gs-3',
    category: 'getting-started',
    question: 'What does "sum insured" mean?',
    answer: 'Sum insured is the maximum amount the insurance company will pay for your medical expenses during the policy period. For example, if your sum insured is ₹5 lakhs, the insurance will cover medical expenses up to ₹5 lakhs in a policy year as per the policy terms.'
  },
  {
    id: 'gs-4',
    category: 'getting-started',
    question: 'What does "family floater" mean?',
    answer: 'A family floater plan covers multiple family members under a single policy with a shared sum insured. This means any family member can use the sum insured when needed, making it often more cost-effective than buying individual policies for each member.'
  },

  // Plans
  {
    id: 'pl-1',
    category: 'plans',
    question: 'How do I choose the right plan?',
    answer: 'Consider these factors: who needs coverage, your family size, age of members, your budget, preferred coverage amount, and any specific health needs. Our "Find My Plan" tool helps you identify potentially suitable plans based on your specific situation.'
  },
  {
    id: 'pl-2',
    category: 'plans',
    question: 'What is the difference between individual and family plans?',
    answer: 'An individual plan covers one person with their own sum insured. A family floater plan covers multiple family members under a shared sum insured. Family floaters are often more cost-effective for families, while individual plans provide dedicated coverage per person.'
  },
  {
    id: 'pl-3',
    category: 'plans',
    question: 'Can I upgrade or change my plan later?',
    answer: 'Plan changes or upgrades may be available at the time of renewal, subject to the insurance company\'s terms and conditions. It\'s advisable to discuss your requirements with an advisor who can guide you through the available options.'
  },

  // Premiums
  {
    id: 'pr-1',
    category: 'premiums',
    question: 'What factors affect my premium?',
    answer: 'Premiums are generally determined by factors such as age, sum insured chosen, plan selected, number of family members covered, city of residence, and any pre-existing conditions. Younger individuals typically get lower premiums.'
  },
  {
    id: 'pr-2',
    category: 'premiums',
    question: 'What is a "no claim bonus"?',
    answer: 'A no claim bonus (NCB) is a reward for not making any claims during a policy year. Typically, the sum insured is increased by a certain percentage for each claim-free year, giving you higher coverage without additional premium. The exact terms vary by plan.'
  },
  {
    id: 'pr-3',
    category: 'premiums',
    question: 'Are there tax benefits for health insurance?',
    answer: 'Yes, premiums paid for health insurance may be eligible for tax deductions under Section 80D of the Income Tax Act. The deduction limits vary based on who is covered and their age. Please consult a tax advisor for specific guidance applicable to your situation.'
  },

  // Family Coverage
  {
    id: 'fm-1',
    category: 'family',
    question: 'Can I cover my parents under my family plan?',
    answer: 'Some plans allow parents to be included in a family floater policy, while others may require a separate policy for parents. Plans like the Family Health Optima allow including parents as per policy terms. Your advisor can help identify the best option.'
  },
  {
    id: 'fm-2',
    category: 'family',
    question: 'Are newborn babies covered?',
    answer: 'Many Star Health plans offer newborn baby coverage from day one as per the policy terms. The coverage details and conditions may vary by plan. Please check the specific plan document or consult with an advisor.'
  },
  {
    id: 'fm-3',
    category: 'family',
    question: 'Can I add a new family member to my existing policy?',
    answer: 'New family members can typically be added during the policy renewal period, subject to the plan\'s terms and conditions. Life events such as marriage or childbirth may also allow mid-term additions in certain plans.'
  },

  // Senior Citizens
  {
    id: 'sc-1',
    category: 'senior',
    question: 'Is there health insurance available for people above 60?',
    answer: 'Yes, Star Health offers the Senior Citizens Red Carpet plan specifically designed for individuals aged 60 and above. It provides comprehensive coverage tailored to the healthcare needs of senior citizens.'
  },
  {
    id: 'sc-2',
    category: 'senior',
    question: 'Are pre-existing conditions covered for senior citizens?',
    answer: 'Pre-existing conditions are typically covered after the specified waiting period as mentioned in the policy document. The Senior Citizens Red Carpet plan includes pre-existing condition coverage subject to these waiting periods.'
  },
  {
    id: 'sc-3',
    category: 'senior',
    question: 'Is medical testing required for senior citizen plans?',
    answer: 'Medical screening requirements depend on the age of the individual and the sum insured chosen. Some plans may offer coverage without medical tests up to a certain age and sum insured. Please check the specific plan terms or consult with an advisor.'
  },

  // Claims
  {
    id: 'cl-1',
    category: 'claims',
    question: 'What is cashless treatment?',
    answer: 'Cashless treatment means you can get treated at a network hospital without paying upfront. The insurance company settles the hospital bill directly with the hospital as per the policy terms. You may only need to pay any non-covered expenses.'
  },
  {
    id: 'cl-2',
    category: 'claims',
    question: 'How do I file a claim?',
    answer: 'For cashless claims, contact the insurance company\'s helpline before or at the time of hospitalisation. For reimbursement claims, pay the hospital bills and then submit the required documents to the insurance company within the specified timeframe. Your advisor can guide you through the process.'
  },
  {
    id: 'cl-3',
    category: 'claims',
    question: 'What documents are needed for a claim?',
    answer: 'Typically required documents include the claim form, hospital bills and receipts, doctor\'s prescriptions, diagnostic reports, discharge summary, and policy copy. The exact requirements may vary by claim type and plan.'
  },

  // Documents
  {
    id: 'dc-1',
    category: 'documents',
    question: 'Where can I find the official policy document?',
    answer: 'Official policy documents, including the policy wording with complete terms, conditions, and exclusions, are available on the official Star Health website. Your advisor can also help you access these documents.'
  },
  {
    id: 'dc-2',
    category: 'documents',
    question: 'What is a "waiting period"?',
    answer: 'A waiting period is a specified duration at the beginning of a policy during which certain conditions or treatments are not covered. Common waiting periods include initial waiting periods, pre-existing condition waiting periods, and specific condition waiting periods. These vary by plan.'
  },

  // Advisor
  {
    id: 'ad-1',
    category: 'advisor',
    question: 'Is this the official Star Health website?',
    answer: 'No, this is an advisor-operated website that provides information and guidance on Star Health Insurance plans. For official corporate information, please visit the official Star Health website. We are authorised Star Health Insurance advisors.'
  },
  {
    id: 'ad-2',
    category: 'advisor',
    question: 'How can an advisor help me?',
    answer: 'An advisor provides personalised guidance by understanding your specific needs, explaining plan differences in simple terms, helping you compare options, assisting with the application process, and supporting you throughout your insurance journey including claims assistance.'
  },
  {
    id: 'ad-3',
    category: 'advisor',
    question: 'Is there any cost for consulting with an advisor?',
    answer: 'There is no additional charge for consulting with our advisor. Advisors earn a commission from the insurance company when a policy is issued. The premium you pay is the same whether you buy directly or through an advisor.'
  }
];

/**
 * Get FAQs by category
 */
export function getFaqsByCategory(categoryId) {
  if (!categoryId || categoryId === 'all') return faqs;
  return faqs.filter(f => f.category === categoryId);
}

/**
 * Search FAQs
 */
export function searchFaqs(query) {
  const q = query.toLowerCase().trim();
  if (!q) return faqs;
  return faqs.filter(f =>
    f.question.toLowerCase().includes(q) ||
    f.answer.toLowerCase().includes(q)
  );
}
