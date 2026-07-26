import Membership from '../models/Membership.js';
import User from '../models/User.js';
import googleSheetsService from '../services/googleSheetsService.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';

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

  /**
   * Purchase a membership plan
   */
  purchaseMembership = async (req, res, next) => {
    try {
      const { name, email, plan, amount } = req.body;
      
      // We assume user is authenticated and req.user exists, 
      // but we handle graceful fallback for generic requests if needed.
      const userId = req.user?.id || null;

      let newMembership = null;
      if (userId) {
        newMembership = await Membership.create({
          userId,
          plan,
          status: 'Active'
        });

        // Also update the User's current membership
        await User.findByIdAndUpdate(userId, { membership: plan });
      }

      // Log to Google Sheets silently
      await googleSheetsService.appendMembership({
        name,
        email,
        plan,
        amount,
        paymentStatus: 'Paid'
      });

      new ApiResponse(200, { membership: newMembership }, 'Membership purchased successfully.').send(res);
    } catch (error) {
      next(new ApiError(500, error.message || 'Failed to purchase membership.'));
    }
  };
}

export default new MembershipController();
