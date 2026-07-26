import { Router } from 'express';
import healthController from '../controllers/health.controller.js';

const router = Router();

// Route: GET /health (often queried at /health by load balancers, or v1/health)
router.get('/', healthController.checkHealth);

export default router;
