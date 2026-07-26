import { google } from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();

class GoogleSheetsService {
  constructor() {
    this.sheets = null;
    this.spreadsheetId = process.env.GOOGLE_SHEET_ID;
    this.isConfigured = false;
    this.init();
  }

  init() {
    try {
      const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
      let privateKey = process.env.GOOGLE_PRIVATE_KEY;

      if (!this.spreadsheetId || !clientEmail || !privateKey) {
        console.warn('[Google Sheets] Missing credentials. Sheets logging disabled.');
        return;
      }

      // Handle escaped newlines from environment variables
      privateKey = privateKey.replace(/\\n/g, '\n').replace(/"/g, '');

      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: clientEmail,
          private_key: privateKey,
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      this.sheets = google.sheets({ version: 'v4', auth });
      this.isConfigured = true;
      console.log('[Google Sheets] Service initialized successfully.');
    } catch (error) {
      console.error('[Google Sheets] Failed to initialize:', error.message);
    }
  }

  /**
   * Helper to append data to a specific sheet
   */
  async appendData(range, values) {
    if (!this.isConfigured) return;
    
    try {
      await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [values],
        },
      });
      console.log(`[Google Sheets] Updated Successfully: ${range}`);
    } catch (error) {
      console.error(`[Google Sheets] Error appending to ${range}:`, error.message);
    }
  }

  /**
   * Registration Sheet
   * Columns: Timestamp, Name, Email, Phone, OAuth Provider, Membership, Source
   */
  async appendRegistration(data) {
    const { name, email, phone, provider, membership, source } = data;
    await this.appendData('Registration!A:G', [
      new Date().toLocaleString(),
      name || 'N/A',
      email || 'N/A',
      phone || 'N/A',
      provider || 'Local',
      membership || 'None',
      source || 'Web'
    ]);
  }

  /**
   * Contact Sheet
   * Columns: Timestamp, Name, Email, Subject, Message
   */
  async appendContact(data) {
    const { name, email, subject, message } = data;
    await this.appendData('Contact!A:E', [
      new Date().toLocaleString(),
      name || 'N/A',
      email || 'N/A',
      subject || 'N/A',
      message || 'N/A'
    ]);
  }

  /**
   * Membership Sheet
   * Columns: Timestamp, Name, Email, Plan, Amount, Payment Status
   */
  async appendMembership(data) {
    const { name, email, plan, amount, paymentStatus } = data;
    await this.appendData('Membership!A:F', [
      new Date().toLocaleString(),
      name || 'N/A',
      email || 'N/A',
      plan || 'N/A',
      amount || '0',
      paymentStatus || 'Pending'
    ]);
  }

  /**
   * Trainer Booking
   * Columns: Timestamp, Name, Email, Trainer, Preferred Time
   */
  async appendTrainerBooking(data) {
    const { name, email, trainer, preferredTime } = data;
    await this.appendData('Trainer Booking!A:E', [
      new Date().toLocaleString(),
      name || 'N/A',
      email || 'N/A',
      trainer || 'N/A',
      preferredTime || 'N/A'
    ]);
  }
}

export default new GoogleSheetsService();
