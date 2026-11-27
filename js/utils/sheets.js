// ============================================================
// GOOGLE SHEETS INTEGRATION — Lead Submission Logger
// ============================================================

// Replace this URL with your published Google Apps Script Web App URL
export const GOOGLE_SHEET_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzLHGkRRuI_eLhiuZAETHWBWvKKMItdwKs3lSNNyeYKP-rlB-fUpfrRsrhzMULZcmAC/exec';

/**
 * Send lead form submission to Google Sheet database
 * @param {Object} data - Lead form data
 */
export async function sendLeadToGoogleSheet(data) {
  if (!GOOGLE_SHEET_WEB_APP_URL || GOOGLE_SHEET_WEB_APP_URL.length < 10) {
    console.log('Google Sheet integration URL pending configuration. Data saved locally:', data);
    return;
  }

  try {
    const payload = {
      name: data.name || '',
      phone: data.phone || data.mobile || '',
      email: data.email || '',
      location: data.location || data.city || '',
      plan: data.plan || data.planInterest || 'General Enquiry',
      coverage: data.coverage || data.coverFor || '',
      contactMethod: data.contactMethod || 'WhatsApp / Call',
      message: data.message || '',
      date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };

    await fetch(GOOGLE_SHEET_WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    console.log('Lead sent to Google Sheet successfully');
  } catch (error) {
    console.error('Error sending lead to Google Sheet:', error);
  }
}
