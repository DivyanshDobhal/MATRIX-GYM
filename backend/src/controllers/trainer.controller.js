import ApiResponse from '../utils/ApiResponse.js';

class TrainerController {
  /**
   * Get all personal trainers
   */
  getTrainers = async (req, res, next) => {
    try {
      const trainers = [
        {
          name: 'Marcus Vance',
          specialization: 'Strength & Powerlifting Coach',
          experience: '8 Years',
          photo: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&q=80&w=400'
        },
        {
          name: 'Sarah Jenkins',
          specialization: 'HIIT & Conditioning Specialist',
          experience: '6 Years',
          photo: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&q=80&w=400'
        },
        {
          name: 'David Cho',
          specialization: 'Bodybuilding & Hypertrophy Expert',
          experience: '10 Years',
          photo: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=400'
        },
        {
          name: 'Elena Rostova',
          specialization: 'Yoga, Mobility & Flexibility Guide',
          experience: '7 Years',
          photo: 'https://images.unsplash.com/photo-1609899537878-39d4b5ec1be7?auto=format&fit=crop&q=80&w=400'
        }
      ];

      new ApiResponse(200, trainers, 'Elite trainers retrieved successfully.').send(res);
    } catch (error) {
      next(error);
    }
  };
}

export default new TrainerController();
