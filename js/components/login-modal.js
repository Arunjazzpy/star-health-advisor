import { icons } from '../utils/icons.js';
import { State } from '../state.js';
import { Router } from '../router.js';

export function showLoginModal() {
  if (document.getElementById('login-modal')) return;

  const modalHtml = `
    <div class="modal-overlay modal-overlay-enter" id="login-modal">
      <div class="modal-content modal-content-enter" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button class="btn btn-ghost btn-icon modal-close" id="login-modal-close" aria-label="Close">
          ${icons.x}
        </button>
        <div class="modal-header">
          <h2 id="modal-title">Welcome back</h2>
          <p>Sign in to save your insurance journey and enquiries.</p>
        </div>
        <div class="modal-body">
          <button class="btn btn-outline w-full auth-btn" data-auth="google">
            ${icons.google} Continue with Google
          </button>
          <div class="modal-divider" style="text-align: center; margin: 16px 0; color: var(--color-text-secondary); font-size: 0.875rem;">
            <span>or</span>
          </div>
          <button class="btn btn-outline w-full auth-btn" data-auth="phone">
            ${icons.phone} Continue with Mobile
          </button>
          <button class="btn btn-outline w-full auth-btn" data-auth="email" style="margin-top: 12px;">
            ${icons.mail} Continue with Email
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  document.body.style.overflow = 'hidden';

  const modal = document.getElementById('login-modal');
  const closeBtn = document.getElementById('login-modal-close');

  const closeModal = () => {
    hideLoginModal();
  };

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  
  const escHandler = (e) => {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);

  // Mock auth logic
  modal.querySelectorAll('.auth-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      State.setUser({ name: 'User', email: 'user@example.com' });
      closeModal();
      Router.navigate('/dashboard');
      window.location.reload();
    });
  });
}

export function hideLoginModal() {
  const modal = document.getElementById('login-modal');
  if (modal) {
    modal.classList.remove('modal-overlay-enter');
    modal.querySelector('.modal-content').classList.remove('modal-content-enter');
    setTimeout(() => {
      modal.remove();
      document.body.style.overflow = '';
    }, 300);
  }
}
