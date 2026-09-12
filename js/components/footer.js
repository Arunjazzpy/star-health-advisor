import { icons } from '../utils/icons.js';

export function renderFooter() {
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer-top grid grid-4">
          <div class="footer-brand">
            <a href="#/" class="footer-logo">
              ${icons.shield}
              <span>Star Health Insurance Advisor</span>
            </a>
            <p class="footer-tagline">Find the right health insurance for you and your family.</p>
            <div class="footer-advisor-info">
              <p><strong>Arun Kumar M T</strong></p>
              <p>Star Health Insurance Advisor</p>
              <p>${icons.phone} +91 88486 79874</p>
              <p>${icons.mail} arunarunkumarmt@gmail.com</p>
            </div>
          </div>
          <div class="footer-links">
            <h4 class="footer-title">Explore</h4>
            <ul>
              <li><a href="#/">Home</a></li>
              <li><a href="#/plans">Plans</a></li>
              <li><a href="#/find-my-plan">Find My Plan</a></li>
              <li><a href="#/faq">FAQs</a></li>
            </ul>
          </div>
          <div class="footer-links">
            <h4 class="footer-title">Support</h4>
            <ul>
              <li><a href="#/contact">Contact</a></li>
              <li><a href="https://api.whatsapp.com/send?phone=918848679874&text=Hi%20Arun%20Kumar%2C%20I%20would%20like%20to%20know%20more%20about%20Star%20Health%20Insurance%20plans." target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              <li><a href="#/contact">Talk to Advisor</a></li>
            </ul>
          </div>
          <div class="footer-links">
            <h4 class="footer-title">Legal</h4>
            <ul>
              <li><a href="#/privacy">Privacy</a></li>
              <li><a href="#/terms">Terms & Disclaimer</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p class="footer-disclaimer">
            <strong>Disclaimer:</strong> This is an advisor-operated website and is not the official Star Health Insurance corporate website. For official information, please visit the Star Health Insurance website. Star Health and Allied Insurance Co. Ltd.
          </p>
          <p class="footer-copyright">&copy; ${new Date().getFullYear()} Star Health Insurance Advisor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `;
}
