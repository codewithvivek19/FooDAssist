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

module.exports = router; 