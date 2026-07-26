import Registration from '../models/Registration.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';

class RegistrationController {
  /**
   * Register a new member and log in MongoDB
   */
  register = async (req, res, next) => {
    try {
      const { name, email, phone, membership, preferredTime, age, gender, goal, weight, height } = req.body;

      // Note: We might store extra details in a separate profile model if they create an account,
      // but for the basic registration we use the Registration model.
      
      const newRegistration = await Registration.create({
        name,
        email,
        phone,
        membership,
        preferredTime,
        // Depending on schema updates, you could append other fields if added to Registration schema.
      });

      new ApiResponse(201, { registration: newRegistration }, 'Registration Successful').send(res);
    } catch (error) {
      next(new ApiError(500, error.message || 'Failed to complete registration.'));
    }
  };
}

export default new RegistrationController();
