require('dotenv').config();
const mongoose = require('mongoose');
const MealPlan = require('../models/MealPlan');

// Meal plans data matching the frontend
const mealPlansData = [
  {
    name: 'Weight Loss Plan',
    description: 'Calorie-controlled meals designed for sustainable weight loss',
    duration: 28,
    price: 149.99,
    targetCalories: 1650,
    type: 'weight-loss',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061',
    features: ['Personalized meal plan', 'Grocery shopping lists', 'Nutrition tracking', 'Weekly check-ins'],
    active: true
  },
  {
    name: 'Muscle Building Plan',
    description: 'High-protein meals designed to support muscle growth and recovery',
    duration: 28,
    price: 169.99,
    targetCalories: 2350,
    type: 'muscle-gain',
    image: 'https://images.unsplash.com/photo-1532384748853-8f54a8f476e2',
    features: ['High-protein recipes', 'Supplement recommendations', 'Workout nutrition tips', 'Recovery meal options'],
    active: true
  },
  {
    name: 'Maintenance Plan',
    description: 'Balanced meals designed to maintain your current weight and improve overall health',
    duration: 28,
    price: 139.99,
    targetCalories: 2000,
    type: 'maintenance',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    features: ['Balanced nutrition', 'Flexible meal options', 'Recipe variations', 'Family-friendly options'],
    active: true
  },
  {
    name: 'Ketogenic Diet Plan',
    description: 'Low-carb, high-fat meals designed to maintain ketosis for weight loss and improved energy',
    duration: 28,
    price: 159.99,
    targetCalories: 1750,
    type: 'keto',
    image: 'https://images.unsplash.com/photo-1592050862964-ac03443f4035',
    features: ['Macro tracking', 'Ketosis tips', 'Meal prep guides', 'Keto-friendly snacks'],
    active: true
  },
  {
    name: 'Vegetarian Plan',
    description: 'Plant-based meals rich in protein and nutrients designed for vegetarians',
    duration: 28,
    price: 144.99,
    targetCalories: 1850,
    type: 'vegetarian',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999',
    features: ['Plant-based protein sources', 'Iron-rich meals', 'Complete nutrition', 'Sustainable food options'],
    active: true
  },
  {
    name: 'Vegan Plan',
    description: 'Entirely plant-based meals rich in protein and nutrients designed for vegans',
    duration: 28,
    price: 149.99,
    targetCalories: 1750,
    type: 'vegan',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0',
    features: ['Plant-based protein sources', 'B12-fortified options', 'Complete nutrition', 'Sustainable food options'],
    active: true
  }
];

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    try {
      // Clear existing meal plans (optional)
      await MealPlan.deleteMany({});
      console.log('Cleared existing meal plans');
      
      // Insert new meal plans
      const result = await MealPlan.insertMany(mealPlansData);
      console.log(`Added ${result.length} meal plans to the database`);
      
      // Log the added meal plans
      result.forEach(plan => {
        console.log(`- ${plan.name} (${plan._id})`);
      });
    } catch (error) {
      console.error('Error adding meal plans:', error);
    } finally {
      // Close the connection
      mongoose.connection.close();
      console.log('Disconnected from MongoDB');
    }
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  }); 