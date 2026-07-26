import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    muscleGroup: {
      type: String,
      required: true,
    },
    equipment: {
      type: String,
      default: 'Bodyweight',
    },
    description: {
      type: String,
    },
    videoUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Exercise = mongoose.model('Exercise', exerciseSchema);
export default Exercise;
