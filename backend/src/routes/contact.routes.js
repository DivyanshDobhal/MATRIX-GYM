import { Router } from 'express';
import contactController from '../controllers/contact.controller.js';
import validate from '../middleware/validation.js';
import { contactSchema } from '../validators/contact.validator.js';

const router = Router();

// Route: POST /api/v1/contact
router.post('/', validate(contactSchema), contactController.submitContactForm);

export default router;
