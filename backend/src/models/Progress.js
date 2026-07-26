import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    weight: {
      type: Number, // in kg
    },
    bodyFat: {
      type: Number, // percentage
    },
    BMI: {
      type: Number,
    },
    photos: [
      {
        type: String, // URLs to progress photos
      }
    ],
    measurements: {
      chest: Number,
      waist: Number,
      arms: Number,
      legs: Number,
    },
    weeklyProgress: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Progress = mongoose.model('Progress', progressSchema);
export default Progress;
