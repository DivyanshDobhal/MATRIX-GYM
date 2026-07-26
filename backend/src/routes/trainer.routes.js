import { Router } from 'express';
import trainerController from '../controllers/trainer.controller.js';

const router = Router();

// Route: GET /api/v1/trainers
router.get('/', trainerController.getTrainers);

// Route: POST /api/v1/trainers/book
router.post('/book', trainerController.bookTrainer);

export default router;
