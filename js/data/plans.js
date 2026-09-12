// ============================================================
// PLANS DATA — Star Health Insurance Plans
// ============================================================
// This file contains all plan information. Update here when
// plan details change. All data should be verified/current.
// ============================================================

export const plans = [
  {
    slug: 'family-health-optima',
    name: 'Family Health Optima Insurance Plan',
    shortName: 'Family Health Optima',
    tagline: 'Comprehensive family health coverage with floater benefit',
    description: 'A comprehensive family floater health insurance plan designed to provide extensive coverage for the entire family under a single policy. It offers a wide range of benefits including hospitalisation, pre and post hospitalisation expenses, and more.',
    featured: true,
    suitableFor: ['Family', 'Couple', 'Individual'],
    suitableForDesc: 'Families looking for comprehensive floater coverage for all members',
    category: 'family',
    highlights: [
      'Family floater coverage under a single sum insured',
      'Wide range of coverage options',
      'Pre and post hospitalisation expenses covered',
      'Daycare procedures covered',
      'Automatic recharge of sum insured',
      'No claim bonus benefit'
    ],
    benefits: [
      { title: 'Hospitalisation Cover', desc: 'Coverage for in-patient hospitalisation expenses including room rent, nursing, ICU charges' },
      { title: 'Pre-Hospitalisation', desc: 'Medical expenses incurred before hospitalisation as per policy terms' },
      { title: 'Post-Hospitalisation', desc: 'Medical expenses incurred after discharge as per policy terms' },
      { title: 'Daycare Procedures', desc: 'Coverage for procedures that do not require 24-hour hospitalisation' },
      { title: 'Ambulance Cover', desc: 'Ambulance charges as per policy terms' },
      { title: 'Automatic Recharge', desc: 'Sum insured gets automatically recharged after exhaustion under certain conditions' },
      { title: 'No Claim Bonus', desc: 'Increase in sum insured for claim-free years as per policy terms' },
      { title: 'AYUSH Treatment', desc: 'Coverage for treatment under Ayurveda, Yoga, Unani, Siddha, and Homeopathy' }
    ],
    eligibility: {
      entryAge: 'As per policy terms (adults and children)',
      familyDefinition: 'Self, spouse, dependent children, and parents as per policy terms',
      renewability: 'Lifelong renewability as per policy terms'
    },
    waitingPeriods: [
      { title: 'Initial Waiting Period', desc: 'As specified in policy document' },
      { title: 'Pre-Existing Conditions', desc: 'Waiting period as specified in policy document' },
      { title: 'Specific Conditions', desc: 'Waiting period for specified conditions as per policy terms' }
    ],
    exclusions: [
      'Pre-existing diseases during waiting period',
      'Cosmetic or aesthetic treatment (unless medically necessary)',
      'Treatment related to substance abuse',
      'Self-inflicted injuries',
      'Conditions as specified in the policy document'
    ],
    importantNotes: [
      'Please refer to the official policy document for complete terms, conditions, and exclusions',
      'Coverage amounts and sub-limits are subject to the sum insured chosen',
      'Tax benefits may be available under Section 80D of the Income Tax Act'
    ],
    faqs: [
      { q: 'Can I cover my entire family under one plan?', a: 'Yes, Family Health Optima is designed as a family floater plan where all family members share a common sum insured.' },
      { q: 'What happens if the entire sum insured is exhausted?', a: 'The plan offers an automatic recharge feature where the sum insured can be restored under certain conditions as specified in the policy.' },
      { q: 'Is this plan renewable for life?', a: 'Yes, the plan offers lifelong renewability as per the terms of the policy.' }
    ]
  },

  {
    slug: 'comprehensive-insurance',
    name: 'Star Comprehensive Insurance Policy',
    shortName: 'Star Comprehensive',
    tagline: 'Wide-ranging health protection with comprehensive benefits',
    description: 'A comprehensive individual and family health insurance policy that offers extensive coverage including hospitalisation, outpatient consultations, and wellness benefits. Designed for those who want thorough health protection.',
    featured: true,
    suitableFor: ['Individual', 'Family', 'Couple'],
    suitableForDesc: 'Individuals and families seeking extensive health coverage',
    category: 'individual',
    highlights: [
      'Comprehensive hospitalisation coverage',
      'Outpatient consultation benefits',
      'Wellness and preventive care benefits',
      'Maternity cover options',
      'Wide network of hospitals',
      'Cashless treatment facility'
    ],
    benefits: [
      { title: 'In-Patient Hospitalisation', desc: 'Complete coverage for hospitalisation expenses as per policy terms' },
      { title: 'Outpatient Consultations', desc: 'Coverage for doctor consultations and diagnostics without hospitalisation' },
      { title: 'Wellness Benefits', desc: 'Preventive health check-ups and wellness programs as per policy terms' },
      { title: 'Maternity Cover', desc: 'Maternity-related expenses as per policy terms and conditions' },
      { title: 'New Born Baby Cover', desc: 'Coverage for newborn baby from day one as per policy terms' },
      { title: 'Organ Donor Expenses', desc: 'Medical expenses of organ donor as per policy terms' },
      { title: 'Emergency Ambulance', desc: 'Ambulance charges during medical emergency' },
      { title: 'AYUSH Treatment', desc: 'Coverage for AYUSH treatments as per policy terms' }
    ],
    eligibility: {
      entryAge: 'As per policy terms',
      familyDefinition: 'Self, spouse, dependent children as per policy terms',
      renewability: 'Lifelong renewability as per policy terms'
    },
    waitingPeriods: [
      { title: 'Initial Waiting Period', desc: 'As specified in policy document' },
      { title: 'Pre-Existing Conditions', desc: 'Waiting period as specified in policy document' },
      { title: 'Specific Conditions', desc: 'As per policy terms' }
    ],
    exclusions: [
      'Pre-existing diseases during waiting period',
      'Cosmetic treatments unless medically necessary',
      'Conditions as specified in the policy document',
      'Treatment not prescribed by medical practitioner'
    ],
    importantNotes: [
      'Please refer to the official policy document for complete details',
      'Sub-limits may apply for certain benefits',
      'Cashless facility available at network hospitals'
    ],
    faqs: [
      { q: 'Does this plan cover outpatient expenses?', a: 'Yes, the Star Comprehensive plan includes outpatient consultation benefits as per the policy terms.' },
      { q: 'Is maternity covered?', a: 'Maternity cover is available as per the policy terms and conditions, subject to applicable waiting periods.' }
    ]
  },

  {
    slug: 'young-star',
    name: 'Young Star Insurance Policy',
    shortName: 'Young Star',
    tagline: 'Designed for young adults starting their health insurance journey',
    description: 'A health insurance plan specifically designed for young adults aged 18 to 40. It offers affordable premiums and coverage tailored to the needs of young individuals and young families starting their health insurance journey.',
    featured: false,
    suitableFor: ['Young Adult', 'Individual'],
    suitableForDesc: 'Young adults aged 18-40 looking for their first health insurance plan',
    category: 'individual',
    highlights: [
      'Designed for ages 18-40',
      'Affordable premium options',
      'Modern healthcare benefits',
      'Outpatient cover available',
      'No claim bonus benefits',
      'Tax benefits under Section 80D'
    ],
    benefits: [
      { title: 'Hospitalisation Cover', desc: 'In-patient hospitalisation expenses as per policy terms' },
      { title: 'Daycare Procedures', desc: 'Coverage for listed daycare procedures' },
      { title: 'Pre & Post Hospitalisation', desc: 'Expenses before and after hospitalisation as per policy terms' },
      { title: 'Outpatient Cover', desc: 'Outpatient consultation expenses as per policy terms' },
      { title: 'Annual Health Check-up', desc: 'Preventive health check-up benefit' },
      { title: 'No Claim Bonus', desc: 'Sum insured enhancement for claim-free years' }
    ],
    eligibility: {
      entryAge: '18 to 40 years as per policy terms',
      familyDefinition: 'Self, spouse, dependent children as per policy terms',
      renewability: 'Lifelong renewability as per policy terms'
    },
    waitingPeriods: [
      { title: 'Initial Waiting Period', desc: 'As specified in policy document' },
      { title: 'Pre-Existing Conditions', desc: 'As specified in policy document' }
    ],
    exclusions: [
      'Pre-existing diseases during waiting period',
      'Conditions as specified in the policy document'
    ],
    importantNotes: [
      'This plan is specifically designed for individuals aged 18-40',
      'Please refer to the policy document for complete terms and conditions'
    ],
    faqs: [
      { q: 'What age group is this plan for?', a: 'Young Star is designed for individuals aged 18 to 40 years at the time of entry.' },
      { q: 'Can I continue this policy after age 40?', a: 'Yes, the policy offers lifelong renewability as per the terms of the policy.' }
    ]
  },

  {
    slug: 'senior-citizens-red-carpet',
    name: 'Star Senior Citizens Red Carpet Health Insurance Policy',
    shortName: 'Senior Citizens Red Carpet',
    tagline: 'Comprehensive health protection for senior citizens',
    description: 'A health insurance plan specifically designed for senior citizens aged 60 and above. It offers coverage tailored to the healthcare needs of elderly individuals, including pre-existing conditions coverage after the waiting period.',
    featured: true,
    suitableFor: ['Senior Citizen', 'Parents'],
    suitableForDesc: 'Senior citizens aged 60 and above seeking dedicated health coverage',
    category: 'senior',
    highlights: [
      'Designed for ages 60 and above',
      'Pre-existing conditions covered after waiting period',
      'No medical test up to specified age and sum insured',
      'Daycare procedures covered',
      'Ambulance cover included',
      'Lifelong renewability'
    ],
    benefits: [
      { title: 'Hospitalisation Cover', desc: 'In-patient hospitalisation expenses as per policy terms' },
      { title: 'Pre-Existing Conditions', desc: 'Covered after the specified waiting period as per policy terms' },
      { title: 'Daycare Procedures', desc: 'Coverage for listed daycare procedures' },
      { title: 'Pre & Post Hospitalisation', desc: 'Expenses before and after hospitalisation as per policy terms' },
      { title: 'Emergency Ambulance', desc: 'Ambulance charges as per policy terms' },
      { title: 'Annual Health Check-up', desc: 'Preventive health check-up benefit' }
    ],
    eligibility: {
      entryAge: '60 years and above as per policy terms',
      familyDefinition: 'Individual or senior citizen couple as per policy terms',
      renewability: 'Lifelong renewability as per policy terms'
    },
    waitingPeriods: [
      { title: 'Initial Waiting Period', desc: 'As specified in policy document' },
      { title: 'Pre-Existing Conditions', desc: 'As specified in policy document' }
    ],
    exclusions: [
      'Pre-existing diseases during the specified waiting period',
      'Conditions as specified in the policy document'
    ],
    importantNotes: [
      'This plan is specifically designed for individuals aged 60 and above',
      'Medical screening may be required based on age and sum insured',
      'Please refer to the official policy document for complete details'
    ],
    faqs: [
      { q: 'Is there an upper age limit?', a: 'The plan is designed for entry from age 60 onwards with lifelong renewability as per policy terms.' },
      { q: 'Are pre-existing conditions covered?', a: 'Yes, pre-existing conditions are covered after the specified waiting period as stated in the policy document.' }
    ]
  },

  {
    slug: 'health-assure',
    name: 'Star Health Assure Insurance Policy',
    shortName: 'Health Assure',
    tagline: 'Flexible health insurance with customisable features',
    description: 'A flexible health insurance plan that allows policyholders to customise their coverage based on individual needs. It offers both individual and family floater options with various add-on benefits.',
    featured: false,
    suitableFor: ['Individual', 'Family'],
    suitableForDesc: 'Individuals and families looking for flexible, customisable health coverage',
    category: 'individual',
    highlights: [
      'Customisable coverage options',
      'Individual and floater options',
      'Multiple sum insured options',
      'No claim bonus benefit',
      'Cashless hospitalisation',
      'Wide hospital network'
    ],
    benefits: [
      { title: 'In-Patient Hospitalisation', desc: 'Hospitalisation expenses as per policy terms' },
      { title: 'Daycare Procedures', desc: 'Coverage for daycare procedures as per policy terms' },
      { title: 'Pre & Post Hospitalisation', desc: 'Medical expenses before and after hospitalisation' },
      { title: 'Organ Donor Cover', desc: 'Medical expenses of organ donor as per policy terms' },
      { title: 'Emergency Ambulance', desc: 'Ambulance charges as per policy terms' },
      { title: 'No Claim Bonus', desc: 'Sum insured enhancement for claim-free years' }
    ],
    eligibility: {
      entryAge: 'As per policy terms',
      familyDefinition: 'Self, spouse, dependent children as per policy terms',
      renewability: 'Lifelong renewability as per policy terms'
    },
    waitingPeriods: [
      { title: 'Initial Waiting Period', desc: 'As specified in policy document' },
      { title: 'Pre-Existing Conditions', desc: 'As specified in policy document' }
    ],
    exclusions: [
      'Pre-existing diseases during waiting period',
      'Conditions as specified in the policy document'
    ],
    importantNotes: [
      'Coverage can be customised based on individual requirements',
      'Please refer to the policy document for complete terms and conditions'
    ],
    faqs: [
      { q: 'Can I customise my coverage?', a: 'Yes, Health Assure offers customisable features allowing you to tailor coverage to your specific needs.' }
    ]
  },

  {
    slug: 'women-care',
    name: 'Star Women Care Insurance Policy',
    shortName: 'Star Women Care',
    tagline: 'Dedicated health insurance designed for women',
    description: 'A health insurance plan specifically designed to address the unique healthcare needs of women. It covers a range of women-specific conditions and procedures along with general health coverage.',
    featured: false,
    suitableFor: ['Individual', 'Women'],
    suitableForDesc: 'Women looking for health coverage that addresses women-specific health needs',
    category: 'individual',
    highlights: [
      'Designed specifically for women',
      'Women-specific condition coverage',
      'Maternity benefits as per policy terms',
      'New-born baby coverage',
      'Wellness benefits',
      'Lifelong renewability'
    ],
    benefits: [
      { title: 'In-Patient Hospitalisation', desc: 'Hospitalisation expenses as per policy terms' },
      { title: 'Women-Specific Conditions', desc: 'Coverage for conditions specific to women as per policy terms' },
      { title: 'Maternity Benefits', desc: 'Maternity-related coverage as per policy terms' },
      { title: 'New-Born Baby Cover', desc: 'Coverage for newborn baby as per policy terms' },
      { title: 'Daycare Procedures', desc: 'Coverage for listed daycare procedures' },
      { title: 'Preventive Health Check-up', desc: 'Annual health check-up benefit' }
    ],
    eligibility: {
      entryAge: 'As per policy terms (women)',
      familyDefinition: 'Individual (women) as per policy terms',
      renewability: 'Lifelong renewability as per policy terms'
    },
    waitingPeriods: [
      { title: 'Initial Waiting Period', desc: 'As specified in policy document' },
      { title: 'Maternity Waiting Period', desc: 'As specified in policy document' }
    ],
    exclusions: [
      'Pre-existing diseases during waiting period',
      'Conditions as specified in the policy document'
    ],
    importantNotes: [
      'This plan is exclusively designed for women',
      'Maternity benefits are subject to waiting periods',
      'Please refer to the official policy document for complete details'
    ],
    faqs: [
      { q: 'Is this plan available for men?', a: 'No, Star Women Care is specifically designed for women.' },
      { q: 'Does it cover maternity?', a: 'Yes, maternity benefits are available as per the policy terms and subject to the applicable waiting period.' }
    ]
  },

  {
    slug: 'health-premier',
    name: 'Star Health Premier Insurance Policy',
    shortName: 'Health Premier',
    tagline: 'Premium health insurance with enhanced benefits',
    description: 'A premium health insurance plan offering enhanced coverage and benefits for individuals and families who want comprehensive protection with higher sum insured options and additional features.',
    featured: false,
    suitableFor: ['Individual', 'Family', 'Couple'],
    suitableForDesc: 'Individuals and families seeking premium health coverage with higher benefits',
    category: 'individual',
    highlights: [
      'Higher sum insured options',
      'Enhanced coverage benefits',
      'Comprehensive hospitalisation cover',
      'International coverage options',
      'Wellness and preventive benefits',
      'Premium hospital network'
    ],
    benefits: [
      { title: 'In-Patient Hospitalisation', desc: 'Comprehensive hospitalisation expenses as per policy terms' },
      { title: 'Enhanced Coverage', desc: 'Higher sub-limits and enhanced benefits compared to standard plans' },
      { title: 'Pre & Post Hospitalisation', desc: 'Extended pre and post hospitalisation coverage' },
      { title: 'Daycare Procedures', desc: 'Coverage for daycare procedures as per policy terms' },
      { title: 'Wellness Benefits', desc: 'Comprehensive preventive and wellness benefits' },
      { title: 'No Claim Bonus', desc: 'Enhanced no claim bonus for claim-free years' }
    ],
    eligibility: {
      entryAge: 'As per policy terms',
      familyDefinition: 'Self, spouse, dependent children as per policy terms',
      renewability: 'Lifelong renewability as per policy terms'
    },
    waitingPeriods: [
      { title: 'Initial Waiting Period', desc: 'As specified in policy document' },
      { title: 'Pre-Existing Conditions', desc: 'As specified in policy document' }
    ],
    exclusions: [
      'Pre-existing diseases during waiting period',
      'Conditions as specified in the policy document'
    ],
    importantNotes: [
      'Premium plan with enhanced features and higher coverage',
      'Please refer to the official policy document for complete details'
    ],
    faqs: [
      { q: 'How is this different from the standard plans?', a: 'Health Premier offers higher sum insured options, enhanced sub-limits, and additional premium features compared to standard plans.' }
    ]
  }
];

/**
 * Get a plan by slug
 */
export function getPlanBySlug(slug) {
  return plans.find(p => p.slug === slug);
}

/**
 * Get plans by category
 */
export function getPlansByCategory(category) {
  if (!category || category === 'all') return plans;
  return plans.filter(p => p.category === category);
}

/**
 * Get featured plans
 */
export function getFeaturedPlans() {
  return plans.filter(p => p.featured);
}

/**
 * Get plans suitable for a given category
 */
export function getPlansForAudience(audience) {
  return plans.filter(p => p.suitableFor.some(s => s.toLowerCase().includes(audience.toLowerCase())));
}

/**
 * Smart plan matching based on user preferences
 */
export function matchPlans(preferences) {
  const { coverFor, priorities = [], budget } = preferences || {};

  const results = plans.map(plan => {
    let score = 1; // Base score so every plan gets evaluated
    const reasons = [];

    // 1. CoverFor matching
    if (coverFor === 'myself') {
      if (plan.slug === 'young-star') { score += 4; reasons.push('Ideal for young individuals'); }
      else if (plan.suitableFor.includes('Individual')) { score += 3; reasons.push('Suitable for individual coverage'); }
    } else if (coverFor === 'spouse') {
      if (plan.suitableFor.includes('Couple') || plan.suitableFor.includes('Family')) { score += 4; reasons.push('Offers couple & family coverage'); }
    } else if (coverFor === 'family') {
      if (plan.slug === 'family-health-optima') { score += 5; reasons.push('Top choice for family floater protection'); }
      else if (plan.suitableFor.includes('Family')) { score += 4; reasons.push('Designed for family coverage'); }
    } else if (coverFor === 'parents') {
      if (plan.slug === 'senior-citizens-red-carpet') { score += 5; reasons.push('Specially tailored for senior parents'); }
      else if (plan.suitableFor.includes('Senior Citizen') || plan.suitableFor.includes('Parents')) { score += 4; reasons.push('Suitable for parent & senior coverage'); }
    } else if (coverFor === 'myself_parents') {
      if (plan.slug === 'senior-citizens-red-carpet' || plan.slug === 'family-health-optima' || plan.slug === 'comprehensive-insurance') {
        score += 4; reasons.push('Great for multi-generational family coverage');
      }
    } else if (coverFor === 'children') {
      if (plan.suitableFor.includes('Family') || plan.slug === 'comprehensive-insurance') {
        score += 4; reasons.push('Comprehensive child & family protection');
      }
    } else if (coverFor === 'other') {
      if (plan.featured) { score += 3; reasons.push('Popular comprehensive choice'); }
    }

    // 2. Priority matching
    if (priorities && priorities.length > 0) {
      if (priorities.includes('affordable')) {
        if (plan.slug === 'young-star' || plan.slug === 'health-assure') {
          score += 3; reasons.push('Economical premium structure');
        }
      }
      if (priorities.includes('family')) {
        if (plan.suitableFor.includes('Family')) {
          score += 2; reasons.push('Family-focused benefits');
        }
      }
      if (priorities.includes('high_cover') || priorities.includes('higher-coverage')) {
        if (plan.slug === 'health-premier' || plan.slug === 'comprehensive-insurance') {
          score += 3; reasons.push('High sum insured & premium coverage options');
        }
      }
      if (priorities.includes('senior')) {
        if (plan.slug === 'senior-citizens-red-carpet') {
          score += 4; reasons.push('Senior citizen specialized benefits');
        }
      }
      if (priorities.includes('maternity')) {
        if (plan.slug === 'women-care' || plan.slug === 'comprehensive-insurance') {
          score += 4; reasons.push('Includes maternity & newborn care');
        }
      }
      if (priorities.includes('hospital')) {
        if (plan.slug === 'comprehensive-insurance' || plan.slug === 'health-assure') {
          score += 2; reasons.push('Extensive cashless hospital network benefits');
        }
      }
      if (priorities.includes('critical')) {
        if (plan.slug === 'comprehensive-insurance' || plan.slug === 'health-premier') {
          score += 3; reasons.push('Critical illness & organ donor protection');
        }
      }
    }

    // Fallback reason
    if (reasons.length === 0) {
      reasons.push(plan.tagline || 'Comprehensive health protection');
    }

    return { plan, score, reasons };
  });

  return results.sort((a, b) => b.score - a.score);
}

/** Plan categories for filtering */
export const planCategories = [
  { id: 'all', label: 'All Plans' },
  { id: 'individual', label: 'Individual' },
  { id: 'family', label: 'Family' },
  { id: 'senior', label: 'Senior Citizen' }
];
