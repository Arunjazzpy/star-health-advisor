export function render(params) {
  return `
    <div class="legal-page container section">
      <div class="legal-page__header section-header text-center">
        <h1 class="section-title">Privacy Policy</h1>
        <p class="section-subtitle">Last updated: October 2023</p>
      </div>

      <div class="legal-page__content card p-8" style="max-width: 800px; margin: 0 auto; background: var(--color-white); border-radius: 12px; color: var(--color-text-secondary); line-height: 1.8;">
        
        <h2 style="color: var(--color-navy); font-size: 1.5rem; margin: 2rem 0 1rem; border-bottom: 1px solid var(--color-border); padding-bottom: 0.5rem;">1. Information We Collect</h2>
        <p class="mb-4">We collect personal information that you voluntarily provide when using our services or filling out forms on our website. This may include:</p>
        <ul class="mb-4" style="list-style-type: disc; margin-left: 2rem;">
          <li>Name and contact information (email address, phone number)</li>
          <li>Demographic information (age, location)</li>
          <li>Health insurance requirements and preferences</li>
          <li>Family composition details relevant to policy selection</li>
        </ul>

        <h2 style="color: var(--color-navy); font-size: 1.5rem; margin: 2rem 0 1rem; border-bottom: 1px solid var(--color-border); padding-bottom: 0.5rem;">2. How We Use Your Information</h2>
        <p class="mb-4">We use the information collected solely to provide personalized health insurance advisory services. Specifically, we use it to:</p>
        <ul class="mb-4" style="list-style-type: disc; margin-left: 2rem;">
          <li>Analyze your insurance requirements</li>
          <li>Recommend appropriate Star Health Insurance plans</li>
          <li>Contact you regarding your enquiry via your preferred method</li>
          <li>Assist you with policy issuance and claims processes</li>
        </ul>

        <h2 style="color: var(--color-navy); font-size: 1.5rem; margin: 2rem 0 1rem; border-bottom: 1px solid var(--color-border); padding-bottom: 0.5rem;">3. Information Sharing</h2>
        <p class="mb-4"><strong>We do not sell, rent, or trade your personal information to third parties.</strong> Your data is shared only with Star Health and Allied Insurance Co. Ltd. strictly for the purpose of policy quotation and issuance when you decide to proceed with a plan.</p>

        <h2 style="color: var(--color-navy); font-size: 1.5rem; margin: 2rem 0 1rem; border-bottom: 1px solid var(--color-border); padding-bottom: 0.5rem;">4. Data Security</h2>
        <p class="mb-4">We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. We collect only what is strictly necessary to assist you.</p>

        <h2 style="color: var(--color-navy); font-size: 1.5rem; margin: 2rem 0 1rem; border-bottom: 1px solid var(--color-border); padding-bottom: 0.5rem;">5. Your Rights</h2>
        <p class="mb-4">You have the right to request access to, correction of, or deletion of your personal data held by us. You can also opt out of further communications at any time.</p>

        <h2 style="color: var(--color-navy); font-size: 1.5rem; margin: 2rem 0 1rem; border-bottom: 1px solid var(--color-border); padding-bottom: 0.5rem;">6. Contact Us</h2>
        <p class="mb-4">If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
        <p>Email: arunarunkumarmt@gmail.com<br>Phone: +91 88486 79874</p>

        <h2 style="color: var(--color-navy); font-size: 1.5rem; margin: 2rem 0 1rem; border-bottom: 1px solid var(--color-border); padding-bottom: 0.5rem;">7. Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last updated" date at the top of this page.</p>
        
      </div>
    </div>
  `;
}

export function mount(params) {}
