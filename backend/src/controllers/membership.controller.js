import ApiResponse from '../utils/ApiResponse.js';

class MembershipController {
  /**
   * Get available membership plans (Starter, Pro, Elite)
   */
  getMemberships = async (req, res, next) => {
    try {
      const plans = {
        Starter: {
          title: 'Starter Plan',
          price: '$29 / Month',
          features: [
            'Access to gym floor and standard equipment',
            'Full locker room & shower access',
            '1 complimentary fitness assessment',
            'Standard gym hours access'
          ]
        },
        Pro: {
          title: 'Pro Plan',
          price: '$59 / Month',
          features: [
            'All Starter plan benefits included',
            'Unlimited access to all group classes',
            '2 complimentary personal coaching sessions',
            'Access to sauna, recovery lounge, and pools',
            'Extended gym hours access'
          ]
        },
        Elite: {
          title: 'Elite Plan',
          price: '$99 / Month',
          features: [
            'All Pro plan benefits included',
            'Unlimited personal training & custom routines',
            '24/7 priority keycard gym access',
            'Dedicated personal locker space',
            'Custom nutrition counseling & diet planning',
            'Complimentary access to the juice bar'
          ]
        }
      };

      new ApiResponse(200, plans, 'Membership plans retrieved successfully.').send(res);
    } catch (error) {
      next(error);
    }
  };
}

export default new MembershipController();
