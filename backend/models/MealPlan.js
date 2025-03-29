const mongoose = require('mongoose');

const mealPlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true,
    enum: [7, 14, 28]
  },
  price: {
    type: Number,
    required: true
  },
  targetCalories: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['weight-loss', 'muscle-gain', 'maintenance', 'keto', 'vegetarian', 'vegan']
  },
  image: {
    type: String,
    required: true
  },
  includedMeals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meal'
  }],
  features: [{
    type: String
  }],
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('MealPlan', mealPlanSchema); 