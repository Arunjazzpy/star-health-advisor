import { icons } from '../utils/icons.js';
import { State } from '../state.js';
import { Router } from '../router.js';
import { plans } from '../data/plans.js';
import { fetchLeadsFromBackend, updateLeadStatusInBackend, deleteLeadInBackend } from '../utils/api.js';

export function render(params) {
  if (!State.isLoggedIn()) {
    return `
      <div class="container section text-center" style="min-height: 60vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <div style="width: 80px; height: 80px; background: var(--color-primary-light); color: var(--color-primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 2rem;">
          ${icons.lock}
        </div>
        <h2 style="font-size: 2rem; color: var(--color-navy); margin-bottom: 1rem;">Access Restricted</h2>
        <p style="color: var(--color-text-secondary); margin-bottom: 2rem; max-width: 400px;">Please log in or create an account to view your personalized dashboard, saved plans, and enquiries.</p>
        <a href="#/login" class="btn btn-primary">Log In / Register</a>
      </div>
    `;
  }

  const user = State.getUser() || { name: 'User', email: '', phone: '' };

  return `
    <div class="dashboard-page" style="background: var(--color-bg); min-height: 100vh; padding: 2rem 0;">
      <div class="container">
        
        <div class="dashboard__header mb-8" style="background: var(--color-white); padding: 2rem; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
          <h1 style="font-size: 2rem; color: var(--color-navy); margin-bottom: 0.5rem;">Welcome back, ${user.name}</h1>
          <p style="color: var(--color-text-secondary);">Manage your profile, view saved plans, and track your enquiries.</p>
        </div>

        <div class="dashboard__layout" style="display: grid; grid-template-columns: 250px 1fr; gap: 2rem;">
          
          <!-- Sidebar -->
          <aside class="dashboard__sidebar" style="background: var(--color-white); border-radius: 12px; padding: 1rem; height: fit-content; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <nav style="display: flex; flex-direction: column; gap: 0.5rem;">
              <button class="nav-item active" data-section="profile" style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem; border-radius: 8px; border: none; background: transparent; text-align: left; cursor: pointer; color: var(--color-navy); font-weight: 500; transition: all 0.2s;">
                ${icons.user} My Profile
              </button>
              <button class="nav-item" data-section="family" style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem; border-radius: 8px; border: none; background: transparent; text-align: left; cursor: pointer; color: var(--color-text-secondary); transition: all 0.2s;">
                ${icons.users} My Family
              </button>
              <button class="nav-item" data-section="saved" style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem; border-radius: 8px; border: none; background: transparent; text-align: left; cursor: pointer; color: var(--color-text-secondary); transition: all 0.2s;">
                ${icons.bookmark} Saved Plans
              </button>
              <button class="nav-item" data-section="enquiries" style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem; border-radius: 8px; border: none; background: transparent; text-align: left; cursor: pointer; color: var(--color-text-secondary); transition: all 0.2s;">
                ${icons.messageCircle} My Enquiries
              </button>
              <button class="nav-item" data-section="leads" style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem; border-radius: 8px; border: none; background: transparent; text-align: left; cursor: pointer; color: var(--color-text-secondary); transition: all 0.2s;">
                ${icons.fileText || icons.messageCircle} MySQL Leads
              </button>
              <button class="nav-item" data-section="contact" style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem; border-radius: 8px; border: none; background: transparent; text-align: left; cursor: pointer; color: var(--color-text-secondary); transition: all 0.2s;">
                ${icons.phone} Contact Advisor
              </button>
              <div style="height: 1px; background: var(--color-border); margin: 1rem 0;"></div>
              <button id="btnLogout" style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem; border-radius: 8px; border: none; background: transparent; text-align: left; cursor: pointer; color: var(--color-error); transition: all 0.2s;">
                ${icons.logOut} Logout
              </button>
            </nav>
          </aside>

          <!-- Content Area -->
          <main class="dashboard__content" style="background: var(--color-white); border-radius: 12px; padding: 2rem; box-shadow: 0 2px 4px rgba(0,0,0,0.05); min-height: 500px;">
            
            <!-- Profile Section -->
            <section id="section-profile" class="content-section">
              <h2 style="font-size: 1.5rem; color: var(--color-navy); border-bottom: 1px solid var(--color-border); padding-bottom: 1rem; margin-bottom: 1.5rem;">My Profile</h2>
              <div class="form-group mb-4">
                <label class="form-label">Name</label>
                <div style="padding: 0.75rem; background: var(--color-bg); border-radius: 6px; border: 1px solid var(--color-border);">${user.name}</div>
              </div>
              <div class="form-group mb-4">
                <label class="form-label">Email</label>
                <div style="padding: 0.75rem; background: var(--color-bg); border-radius: 6px; border: 1px solid var(--color-border);">${user.email}</div>
              </div>
              <div class="form-group mb-4">
                <label class="form-label">Phone</label>
                <div style="padding: 0.75rem; background: var(--color-bg); border-radius: 6px; border: 1px solid var(--color-border);">${user.phone || 'Not provided'}</div>
              </div>
              <button class="btn btn-outline mt-4">Edit Profile</button>
            </section>

            <!-- Family Section -->
            <section id="section-family" class="content-section" style="display: none;">
               <h2 style="font-size: 1.5rem; color: var(--color-navy); border-bottom: 1px solid var(--color-border); padding-bottom: 1rem; margin-bottom: 1.5rem;">Family Members</h2>
               <div style="text-align: center; padding: 3rem 1rem; color: var(--color-text-secondary);">
                 <div style="display: inline-flex; background: var(--color-bg); padding: 1rem; border-radius: 50%; margin-bottom: 1rem;">${icons.users}</div>
                 <p>No family members added yet.</p>
                 <button class="btn btn-primary mt-4">${icons.plus} Add Member</button>
               </div>
            </section>

            <!-- Saved Plans Section -->
            <section id="section-saved" class="content-section" style="display: none;">
               <h2 style="font-size: 1.5rem; color: var(--color-navy); border-bottom: 1px solid var(--color-border); padding-bottom: 1rem; margin-bottom: 1.5rem;">Saved Plans</h2>
               <div id="savedPlansContainer"></div>
            </section>

            <!-- Enquiries Section -->
            <section id="section-enquiries" class="content-section" style="display: none;">
               <h2 style="font-size: 1.5rem; color: var(--color-navy); border-bottom: 1px solid var(--color-border); padding-bottom: 1rem; margin-bottom: 1.5rem;">My Enquiries</h2>
               <div id="enquiriesContainer"></div>
            </section>

            <!-- MySQL Leads Section -->
            <section id="section-leads" class="content-section" style="display: none;">
               <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--color-border); padding-bottom: 1rem; margin-bottom: 1.5rem;">
                 <h2 style="font-size: 1.5rem; color: var(--color-navy); margin: 0;">MySQL Leads</h2>
                 <button type="button" id="btnRefreshLeads" class="btn btn-outline btn-sm">Refresh</button>
               </div>
               <div id="leadsContainer"></div>
            </section>

            <!-- Contact Section -->
            <section id="section-contact" class="content-section" style="display: none;">
               <h2 style="font-size: 1.5rem; color: var(--color-navy); border-bottom: 1px solid var(--color-border); padding-bottom: 1rem; margin-bottom: 1.5rem;">Contact Advisor</h2>
               <div style="display: grid; gap: 1rem;">
                   <div style="display: flex; align-items: center; gap: 1rem; padding: 1.5rem; border: 1px solid var(--color-border); border-radius: 8px;">
                     <div style="color: var(--color-primary);">${icons.user}</div>
                     <div>
                       <div style="font-weight: 600; color: var(--color-navy);">Arun Kumar M T</div>
                       <div style="color: var(--color-text-secondary); font-size: 0.9rem;">Star Health Insurance Advisor</div>
                     </div>
                   </div>
                   <a href="tel:+918848679874" style="display: flex; align-items: center; gap: 1rem; padding: 1.5rem; border: 1px solid var(--color-border); border-radius: 8px; text-decoration: none; color: inherit;" class="card-hover">
                     <div style="color: var(--color-primary);">${icons.phone}</div>
                     <div>
                       <div style="font-weight: 600; color: var(--color-navy);">Call</div>
                       <div style="color: var(--color-text-secondary); font-size: 0.9rem;">+91 88486 79874</div>
                     </div>
                   </a>
                   <a href="https://api.whatsapp.com/send?phone=918848679874&text=Hi%20Arun%20Kumar%2C%20I%20am%20contacting%20you%20from%20my%20dashboard." target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; gap: 1rem; padding: 1.5rem; border: 1px solid var(--color-border); border-radius: 8px; text-decoration: none; color: inherit;" class="card-hover">
                     <div style="color: #25D366;">${icons.whatsapp}</div>
                     <div>
                       <div style="font-weight: 600; color: var(--color-navy);">WhatsApp</div>
                       <div style="color: var(--color-text-secondary); font-size: 0.9rem;">Chat instantly</div>
                     </div>
                   </a>
               </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  `;
}

export function mount(params) {
  if (!State.isLoggedIn()) return;

  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.content-section');
  const btnLogout = document.getElementById('btnLogout');

  // Load Saved Plans
  const savedPlansIds = State.getSavedPlans ? State.getSavedPlans() : [];
  const savedPlansContainer = document.getElementById('savedPlansContainer');
  if (savedPlansIds.length === 0) {
    savedPlansContainer.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem; color: var(--color-text-secondary);">
        <p>You haven't saved any plans yet.</p>
        <a href="#/plans" class="btn btn-outline mt-4">Browse Plans</a>
      </div>
    `;
  } else {
    let html = '<div class="grid grid-2" style="gap: 1.5rem;">';
    savedPlansIds.forEach(id => {
      const plan = plans.find(p => p.slug === id || p.id === id);
      if (plan) {
        html += `
          <div class="card p-4" style="border: 1px solid var(--color-border); border-radius: 8px;">
            <div style="font-weight: 600; color: var(--color-navy); margin-bottom: 0.5rem; font-size: 1.1rem;">${plan.name}</div>
            <div style="color: var(--color-text-secondary); font-size: 0.9rem; margin-bottom: 1rem;">${plan.category || 'Health Plan'}</div>
            <a href="#/plan/${plan.slug}" class="text-primary" style="font-weight: 500; font-size: 0.9rem; text-decoration: none;">View Details &rarr;</a>
          </div>
        `;
      }
    });
    html += '</div>';
    savedPlansContainer.innerHTML = html;
  }

  // Load Enquiries
  const enquiries = State.getEnquiries ? State.getEnquiries() : [];
  const enquiriesContainer = document.getElementById('enquiriesContainer');
  if (enquiries.length === 0) {
    enquiriesContainer.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem; color: var(--color-text-secondary);">
        <p>No active enquiries.</p>
        <a href="#/get-guidance" class="btn btn-outline mt-4">Submit Enquiry</a>
      </div>
    `;
  } else {
    let html = '<div style="display: flex; flex-direction: column; gap: 1rem;">';
    enquiries.forEach(enq => {
      const date = new Date(enq.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
      const planName = enq.planInterest ? (plans.find(p => p.id === enq.planInterest)?.name || enq.planInterest) : 'General Guidance';
      html += `
        <div style="padding: 1.5rem; border: 1px solid var(--color-border); border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-weight: 600; color: var(--color-navy); margin-bottom: 0.25rem;">${planName}</div>
            <div style="color: var(--color-text-secondary); font-size: 0.9rem;">Submitted on ${date}</div>
          </div>
          <span style="background: var(--color-primary-light); color: var(--color-primary); padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.85rem; font-weight: 500;">${enq.status}</span>
        </div>
      `;
    });
    html += '</div>';
    enquiriesContainer.innerHTML = html;
  }

  // Load MySQL Leads (Admin-protected)
  const ADMIN_KEY_STORAGE = 'star_health_admin_key';
  const leadsContainer = document.getElementById('leadsContainer');
  const btnRefreshLeads = document.getElementById('btnRefreshLeads');
  const esc = (str) => String(str ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function renderAdminUnlockForm(errorMsg = '') {
    if (!leadsContainer) return;
    leadsContainer.innerHTML = `
      <form id="adminUnlockForm" style="max-width: 380px; margin: 2rem auto; padding: 1.5rem; border: 1px solid var(--color-border); border-radius: 10px; background: var(--color-bg);">
        <div style="font-weight: 600; color: var(--color-navy); margin-bottom: 0.5rem;">Advisor Access Only</div>
        <p style="font-size: 0.9rem; color: var(--color-text-secondary); margin-bottom: 1rem;">Enter your advisor admin password to view MySQL leads.</p>
        ${errorMsg ? `<div style="color: #B91C1C; font-size: 0.85rem; margin-bottom: 0.75rem;">${esc(errorMsg)}</div>` : ''}
        <input type="password" id="adminKeyInput" class="form-input" placeholder="Admin password" required style="width: 100%; margin-bottom: 0.75rem; padding: 0.65rem; border: 1px solid var(--color-border); border-radius: 6px;">
        <button type="submit" class="btn btn-primary" style="width: 100%;">Unlock Leads</button>
      </form>
    `;
    const unlockForm = document.getElementById('adminUnlockForm');
    if (unlockForm) {
      unlockForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const val = document.getElementById('adminKeyInput')?.value || '';
        sessionStorage.setItem(ADMIN_KEY_STORAGE, val);
        loadMySQLLeads();
      });
    }
  }

  async function loadMySQLLeads() {
    if (!leadsContainer) return;
    const adminKey = sessionStorage.getItem(ADMIN_KEY_STORAGE) || '';
    if (!adminKey) {
      renderAdminUnlockForm();
      return;
    }

    leadsContainer.innerHTML = `<p style="color: var(--color-text-secondary);">Loading leads from MySQL backend...</p>`;
    const res = await fetchLeadsFromBackend(adminKey);

    if (res.unauthorized) {
      sessionStorage.removeItem(ADMIN_KEY_STORAGE);
      renderAdminUnlockForm('Incorrect admin password. Please try again.');
      return;
    }

    if (!res.ok) {
      leadsContainer.innerHTML = `
        <div style="padding: 1.5rem; border: 1px solid #FECACA; background: #FEF2F2; border-radius: 8px; color: #991B1B;">
          <div style="font-weight: 600; margin-bottom: 0.5rem;">Backend server is not reachable</div>
          <div style="font-size: 0.9rem;">Make sure your Spring Boot app is running in Eclipse on <code>http://localhost:8080</code>.</div>
        </div>
      `;
      return;
    }

    if (res.leads.length === 0) {
      leadsContainer.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: var(--color-text-secondary);">
          <p>No leads in MySQL yet.</p>
          <a href="#/get-guidance" class="btn btn-outline mt-4">Submit a Test Lead</a>
        </div>
      `;
      return;
    }

    leadsContainer.innerHTML = `
      <div style="display: flex; justify-content: flex-end; margin-bottom: 0.75rem;">
        <button type="button" id="btnLockLeads" class="btn btn-outline btn-sm">Lock Leads</button>
      </div>
      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
          <thead>
            <tr style="border-bottom: 2px solid var(--color-border); text-align: left; color: var(--color-navy);">
              <th style="padding: 0.75rem 0.5rem;">Name</th>
              <th style="padding: 0.75rem 0.5rem;">Contact</th>
              <th style="padding: 0.75rem 0.5rem;">Plan / Coverage</th>
              <th style="padding: 0.75rem 0.5rem;">Budget</th>
              <th style="padding: 0.75rem 0.5rem;">Status</th>
              <th style="padding: 0.75rem 0.5rem;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${res.leads.map(lead => `
              <tr style="border-bottom: 1px solid var(--color-border);">
                <td style="padding: 0.75rem 0.5rem;">
                  <div style="font-weight: 600; color: var(--color-navy);">${esc(lead.name)}</div>
                  <div style="color: var(--color-text-secondary); font-size: 0.8rem;">${esc(lead.location || '—')}</div>
                </td>
                <td style="padding: 0.75rem 0.5rem;">
                  <div>${esc(lead.mobile)}</div>
                  <div style="color: var(--color-text-secondary); font-size: 0.8rem;">${esc(lead.email)}</div>
                </td>
                <td style="padding: 0.75rem 0.5rem;">
                  <div>${esc(lead.planInterest || 'General')}</div>
                  <div style="color: var(--color-text-secondary); font-size: 0.8rem;">${esc(lead.coverageFor || '')}${lead.familySize ? ` (${esc(lead.familySize)})` : ''}</div>
                </td>
                <td style="padding: 0.75rem 0.5rem;">${esc(lead.budget || '—')}</td>
                <td style="padding: 0.75rem 0.5rem;">
                  <select class="lead-status-select" data-id="${lead.id}" style="padding: 0.35rem 0.5rem; border: 1px solid var(--color-border); border-radius: 6px; background: #fff; color: var(--color-navy);">
                    <option value="NEW" ${lead.status === 'NEW' ? 'selected' : ''}>NEW</option>
                    <option value="CONTACTED" ${lead.status === 'CONTACTED' ? 'selected' : ''}>CONTACTED</option>
                    <option value="CONVERTED" ${lead.status === 'CONVERTED' ? 'selected' : ''}>CONVERTED</option>
                  </select>
                </td>
                <td style="padding: 0.75rem 0.5rem;">
                  <button type="button" class="btn-delete-lead" data-id="${lead.id}" style="background: transparent; border: none; color: #EF4444; cursor: pointer; font-weight: 600;">Delete</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    const btnLock = document.getElementById('btnLockLeads');
    if (btnLock) {
      btnLock.addEventListener('click', () => {
        sessionStorage.removeItem(ADMIN_KEY_STORAGE);
        renderAdminUnlockForm();
      });
    }

    leadsContainer.querySelectorAll('.lead-status-select').forEach(sel => {
      sel.addEventListener('change', async (e) => {
        const id = e.target.dataset.id;
        await updateLeadStatusInBackend(id, e.target.value, adminKey);
      });
    });

    leadsContainer.querySelectorAll('.btn-delete-lead').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = e.currentTarget.dataset.id;
        if (await deleteLeadInBackend(id, adminKey)) {
          loadMySQLLeads();
        }
      });
    });
  }

  if (btnRefreshLeads) {
    btnRefreshLeads.addEventListener('click', loadMySQLLeads);
  }
  loadMySQLLeads();

  // Navigation Logic
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      // update active state
      navItems.forEach(n => {
        n.classList.remove('active');
        n.style.background = 'transparent';
        n.style.color = 'var(--color-text-secondary)';
      });
      const btn = e.currentTarget;
      btn.classList.add('active');
      btn.style.background = 'var(--color-bg)';
      btn.style.color = 'var(--color-primary)';

      // show section
      const targetId = `section-${btn.dataset.section}`;
      sections.forEach(s => s.style.display = 'none');
      document.getElementById(targetId).style.display = 'block';
    });
  });

  // Logout Logic
  btnLogout.addEventListener('click', () => {
    if (State.clearUser) State.clearUser();
    Router.navigate('/');
  });
  
  // Set initial active styles
  const activeBtn = document.querySelector('.nav-item.active');
  if(activeBtn) {
      activeBtn.style.background = 'var(--color-bg)';
      activeBtn.style.color = 'var(--color-primary)';
  }
}
