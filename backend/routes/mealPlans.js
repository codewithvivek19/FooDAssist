const express = require('express');
const router = express.Router();
const MealPlan = require('../models/MealPlan');

// Get all meal plans
router.get('/', async (req, res) => {
  try {
    const mealPlans = await MealPlan.find();
    res.json(mealPlans);
  } catch (error) {
    console.error('Error fetching meal plans:', error);
    res.status(500).json({ message: 'Error fetching meal plans' });
  }
});

// Add new meal plan
router.post('/', async (req, res) => {
  try {
    const mealPlan = new MealPlan(req.body);
    const savedMealPlan = await mealPlan.save();
    res.status(201).json(savedMealPlan);
  } catch (error) {
    console.error('Error adding meal plan:', error);
    res.status(400).json({ message: error.message });
  }
});

// Get meal plan by ID
router.get('/:id', async (req, res) => {
  try {
    const mealPlan = await MealPlan.findById(req.params.id);
    if (!mealPlan) {
      return res.status(404).json({ message: 'Meal plan not found' });
    }
    res.json(mealPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update meal plan
router.put('/:id', async (req, res) => {
  try {
    const updatedPlan = await MealPlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPlan) {
      return res.status(404).json({ message: 'Meal plan not found' });
    }
    res.json(updatedPlan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete meal plan
router.delete('/:id', async (req, res) => {
  try {
    const deletedPlan = await MealPlan.findByIdAndDelete(req.params.id);
    if (!deletedPlan) {
      return res.status(404).json({ message: 'Meal plan not found' });
    }
    res.json({ message: 'Meal plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Recommend meal plans based on body details
router.post('/recommend', async (req, res) => {
  try {
    const { 
      weight, 
      height, 
      bodyType, 
      activityLevel, 
      gender, 
      age,
      fitnessGoals 
    } = req.body;

    // Calculate BMI
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    
    // Calculate Base Metabolic Rate (BMR) using Harris-Benedict Equation
    let bmr;
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
    
    // Calculate Total Daily Energy Expenditure (TDEE)
    let activityMultiplier;
    switch (activityLevel) {
      case 'sedentary':
        activityMultiplier = 1.2;
        break;
      case 'light':
        activityMultiplier = 1.375;
        break;
      case 'moderate':
        activityMultiplier = 1.55;
        break;
      case 'active':
        activityMultiplier = 1.725;
        break;
      case 'very-active':
        activityMultiplier = 1.9;
        break;
      default:
        activityMultiplier = 1.2;
    }
    
    const tdee = Math.round(bmr * activityMultiplier);
    
    // Adjust calories based on fitness goal
    let targetCalories;
    let planType;
    
    switch (fitnessGoals) {
      case 'weight-loss':
        targetCalories = Math.round(tdee * 0.8); // 20% deficit
        planType = 'weight-loss';
        break;
      case 'muscle-gain':
        targetCalories = Math.round(tdee * 1.1); // 10% surplus
        planType = 'muscle-gain';
        break;
      case 'maintenance':
        targetCalories = tdee;
        planType = 'maintenance';
        break;
      default:
        targetCalories = tdee;
        planType = 'general-health';
    }
    
    // Adjust protein needs based on body type
    let proteinMultiplier;
    switch (bodyType) {
      case 'ectomorph':
        proteinMultiplier = 2.0; // Higher protein for ectomorphs
        break;
      case 'mesomorph':
        proteinMultiplier = 1.8;
        break;
      case 'endomorph':
        proteinMultiplier = 1.6; // Lower protein for endomorphs
        break;
      default:
        proteinMultiplier = 1.8;
    }
    
    const proteinTarget = Math.round(weight * proteinMultiplier);
    
    // Find suitable meal plans based on calculated values
    let mealPlansQuery = {
      active: true
    };
    
    // Add type filter if available
    if (planType) {
      mealPlansQuery.type = planType;
    }
    
    // Find plans with target calories within ±200 of calculated calories
    const lowerCalorieLimit = targetCalories - 200;
    const upperCalorieLimit = targetCalories + 200;
    
    const recommendedPlans = await MealPlan.find({
      ...mealPlansQuery,
      targetCalories: { $gte: lowerCalorieLimit, $lte: upperCalorieLimit }
    }).limit(3);
    
    // If no exact matches, find closest plans
    let finalRecommendations = recommendedPlans;
    if (recommendedPlans.length === 0) {
      finalRecommendations = await MealPlan.find(mealPlansQuery)
        .sort({ targetCalories: 1 })
        .limit(3);
    }
    
    res.json({
      metrics: {
        bmi,
        bmr: Math.round(bmr),
        tdee,
        targetCalories,
        proteinTarget
      },
      recommendedPlans: finalRecommendations
    });
  } catch (error) {
    console.error('Error generating meal plan recommendations:', error);
    res.status(500).json({ message: 'Error generating recommendations', error: error.message });
  }
});

module.exports = router; 