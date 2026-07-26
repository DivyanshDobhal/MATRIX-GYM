import { Router } from 'express';
import registrationController from '../controllers/registration.controller.js';
import validate from '../middleware/validation.js';
import { registrationSchema } from '../validators/registration.validator.js';

const router = Router();

// Route: POST /api/v1/register
router.post('/', validate(registrationSchema), registrationController.register);

export default router;
