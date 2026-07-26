import Inquiry from '../models/Inquiry.js';
import { google } from 'googleapis';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';

class ContactController {
  /**
   * Submit contact request message and log in MongoDB
   */
  submitContactForm = async (req, res, next) => {
    try {
      const { name, email, subject, message } = req.body;

      // Save inquiry to MongoDB
      const newInquiry = await Inquiry.create({
        name,
        email,
        subject,
        message
      });

      // Log to Google Sheets
      try {
        const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID;
        const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
        const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

        if (SPREADSHEET_ID && clientEmail && privateKey) {
          const auth = new google.auth.GoogleAuth({
            credentials: {
              client_email: clientEmail,
              private_key: privateKey,
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
          });

          const sheets = google.sheets({ version: 'v4', auth });
          
          await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: 'Sheet1!A:E',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
              values: [
                [
                  new Date().toLocaleString(),
                  name,
                  email,
                  subject || 'N/A',
                  message
                ]
              ]
            }
          });
        } else {
          console.warn("Google Sheets credentials are not configured. Contact saved only to MongoDB.");
        }
      } catch (sheetError) {
        console.error("Failed to append to Google Sheets:", sheetError);
      }

      new ApiResponse(200, { inquiry: newInquiry }, 'Contact inquiry sent successfully.').send(res);
    } catch (error) {
      next(new ApiError(500, error.message || 'Failed to submit contact message.'));
    }
  };
}

export default new ContactController();
