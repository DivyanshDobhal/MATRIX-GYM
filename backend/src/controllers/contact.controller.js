import Inquiry from '../models/Inquiry.js';
import googleSheetsService from '../services/googleSheetsService.js';
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

      // Log to Google Sheets silently
      await googleSheetsService.appendContact({
        name,
        email,
        subject,
        message
      });

      new ApiResponse(200, { inquiry: newInquiry }, 'Contact inquiry sent successfully.').send(res);
    } catch (error) {
      next(new ApiError(500, error.message || 'Failed to submit contact message.'));
    }
  };
}

export default new ContactController();
