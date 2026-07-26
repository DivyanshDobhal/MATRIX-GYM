import mongoose from 'mongoose';

const nutritionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    calories: {
      type: Number,
      required: true,
    },
    protein: {
      type: Number, // in grams
    },
    carbs: {
      type: Number, // in grams
    },
    fat: {
      type: Number, // in grams
    },
    water: {
      type: Number, // in ml or liters
    },
    mealPlan: {
      type: String, // could be a detailed text or JSON string mapping meals
    },
  },
  {
    timestamps: true,
  }
);

const Nutrition = mongoose.model('Nutrition', nutritionSchema);
export default Nutrition;
