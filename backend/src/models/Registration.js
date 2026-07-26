import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    membership: {
      type: String,
      enum: ['Starter', 'Pro', 'Elite'],
      required: true,
    },
    preferredTime: {
      type: String,
      enum: ['Morning', 'Afternoon', 'Evening'],
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Contacted', 'Enrolled'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

const Registration = mongoose.model('Registration', registrationSchema);
export default Registration;
