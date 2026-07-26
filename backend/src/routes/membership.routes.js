import { Router } from 'express';
import membershipController from '../controllers/membership.controller.js';

const router = Router();

// Route: GET /api/v1/memberships
router.get('/', membershipController.getMemberships);

export default router;
