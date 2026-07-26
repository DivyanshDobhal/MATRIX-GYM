import { z } from 'zod';

export const registrationSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .trim()
    .min(3, 'Name must be at least 3 characters long'),
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .email('Please provide a valid email address'),
  phone: z
    .string({ required_error: 'Phone number is required' })
    .trim()
    .regex(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  membership: z
    .enum(['Free Trial', 'Starter', 'Pro', 'Elite'], {
      required_error: 'Membership type must be one of: Free Trial, Starter, Pro, Elite'
    }),
  preferredTime: z
    .enum(['Morning', 'Afternoon', 'Evening'], {
      required_error: 'Preferred time must be one of: Morning, Afternoon, Evening'
    }),
  age: z.string().optional().or(z.number().optional()),
  gender: z.string().optional(),
  goal: z.string().optional(),
  weight: z.string().optional(),
  height: z.string().optional()
});
