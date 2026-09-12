import { icons } from '../utils/icons.js';

const WHATSAPP_NUMBER = '918848679874';
const DEFAULT_MESSAGE = "Hi, I'm interested in Star Health Insurance plans. Can you help me?";

export function renderWhatsAppFab() {
  const url = `https://api.whatsapp.com/send?phone=918848679874&text=${encodeURIComponent(DEFAULT_MESSAGE)}`;
  return `
    <a href="${url}" target="_blank" rel="noopener noreferrer" class="whatsapp-fab" aria-label="Chat with us on WhatsApp" title="Chat with us">
      ${icons.whatsapp}
    </a>
  `;
}

export function WhatsAppButton(text = 'WhatsApp an Advisor') {
  const url = `https://api.whatsapp.com/send?phone=918848679874&text=${encodeURIComponent(DEFAULT_MESSAGE)}`;
  return `
    <a href="${url}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-icon">
      ${icons.whatsapp} ${text}
    </a>
  `;
}
