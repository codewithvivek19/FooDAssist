const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  fitnessGoals: {
    type: String,
    enum: ['weight-loss', 'muscle-gain', 'maintenance', 'general-health'],
    default: 'general-health'
  },
  dietaryPreferences: [{
    type: String,
    enum: ['vegetarian', 'vegan', 'gluten-free']
  }],
  bodyDetails: {
    weight: { type: Number },
    height: { type: Number },
    bodyType: { 
      type: String, 
      enum: ['ectomorph', 'mesomorph', 'endomorph'] 
    },
    activityLevel: { 
      type: String, 
      enum: ['sedentary', 'light', 'moderate', 'active', 'very-active'] 
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other']
    },
    age: { type: Number }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema); 