// ============================================================
// BACKEND API CLIENT — Spring Boot + MySQL Integration
// ============================================================

// Change this to your deployed backend URL (e.g., Railway / Render) when live
export const BACKEND_API_URL = 'http://localhost:8080/api/leads';

/**
 * Send lead submission to the Spring Boot + MySQL backend.
 * Fails gracefully if the backend server is not running locally.
 * @param {Object} data - Lead form data
 */
export async function sendLeadToBackend(data) {
  if (!BACKEND_API_URL) return null;

  const payload = {
    name: data.name || '',
    mobile: data.mobile || data.phone || '',
    email: data.email || '',
    location: data.location || data.city || '',
    planInterest: data.planInterest || data.plan || '',
    coverageFor: data.coverageFor || data.coverage || data.coverFor || '',
    familySize: data.familySize ? parseInt(data.familySize, 10) : null,
    budget: data.budget || '',
    contactMethod: data.contactMethod || 'Call',
    contactTime: data.contactTime || 'Anytime',
    message: data.message || '',
    status: 'NEW'
  };

  try {
    const response = await fetch(BACKEND_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.warn('Backend API returned status:', response.status);
      return null;
    }

    const result = await response.json();
    console.log('Lead saved to MySQL backend:', result);
    return result;
  } catch (error) {
    console.warn('Backend API unreachable (is Spring Boot running?):', error.message);
    return null;
  }
}

/**
 * Fetch all leads from the Spring Boot + MySQL backend (requires advisor admin key).
 * @param {string} adminKey
 * @returns {Promise<{ok: boolean, unauthorized?: boolean, leads: Array, error?: string}>}
 */
export async function fetchLeadsFromBackend(adminKey) {
  try {
    const response = await fetch(BACKEND_API_URL, {
      headers: { 'X-Admin-Key': adminKey || '' }
    });
    if (response.status === 401) {
      return { ok: false, unauthorized: true, leads: [], error: 'Invalid admin password' };
    }
    if (!response.ok) {
      return { ok: false, leads: [], error: `HTTP ${response.status}` };
    }
    const leads = await response.json();
    return { ok: true, leads: Array.isArray(leads) ? leads : [] };
  } catch (error) {
    return { ok: false, leads: [], error: error.message };
  }
}

/**
 * Update a lead's status (e.g., NEW, CONTACTED, CONVERTED).
 */
export async function updateLeadStatusInBackend(id, status, adminKey) {
  try {
    const response = await fetch(`${BACKEND_API_URL}/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-Admin-Key': adminKey || ''
      },
      body: JSON.stringify({ status })
    });
    return response.ok;
  } catch (error) {
    console.warn('Error updating lead status:', error.message);
    return false;
  }
}

/**
 * Delete a lead by ID.
 */
export async function deleteLeadInBackend(id, adminKey) {
  try {
    const response = await fetch(`${BACKEND_API_URL}/${id}`, {
      method: 'DELETE',
      headers: { 'X-Admin-Key': adminKey || '' }
    });
    return response.ok;
  } catch (error) {
    console.warn('Error deleting lead:', error.message);
    return false;
  }
}
