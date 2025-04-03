import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './MealPlans.css';

// Enhanced meal plans with more options and details
const mealPlans = [
  {
    id: 'weight-loss',
    name: 'Weight Loss Plan',
    description: 'Calorie-controlled meals designed for sustainable weight loss',
    meals: [
      { day: 'Monday', breakfast: 'Protein Smoothie Bowl', lunch: 'Grilled Chicken Salad', dinner: 'Baked Salmon with Vegetables' },
      { day: 'Tuesday', breakfast: 'Greek Yogurt with Berries', lunch: 'Turkey and Avocado Wrap', dinner: 'Lentil Soup with Side Salad' },
      { day: 'Wednesday', breakfast: 'Vegetable Omelette', lunch: 'Quinoa Bowl with Roasted Vegetables', dinner: 'Grilled Tilapia with Steamed Broccoli' }
    ],
    calories: '1500-1800',
    protein: '120g-140g',
    price: 149.99,
    duration: 28,
    type: 'weight-loss',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061',
    features: ['Personalized meal plan', 'Grocery shopping lists', 'Nutrition tracking', 'Weekly check-ins']
  },
  {
    id: 'muscle-gain',
    name: 'Muscle Building Plan',
    description: 'High-protein meals designed to support muscle growth and recovery',
    meals: [
      { day: 'Monday', breakfast: 'Protein Pancakes with Banana', lunch: 'Chicken and Rice Bowl', dinner: 'Steak with Sweet Potato and Asparagus' },
      { day: 'Tuesday', breakfast: 'Oatmeal with Protein Powder and Nuts', lunch: 'Turkey and Quinoa Wrap', dinner: 'Salmon with Brown Rice and Broccoli' },
      { day: 'Wednesday', breakfast: 'Egg White Scramble with Vegetables', lunch: 'Tuna Salad Sandwich', dinner: 'Bison Burger with Roasted Vegetables' }
    ],
    calories: '2200-2500',
    protein: '180g-220g',
    price: 169.99,
    duration: 28,
    type: 'muscle-gain',
    image: 'https://images.unsplash.com/photo-1532384748853-8f54a8f476e2',
    features: ['High-protein recipes', 'Supplement recommendations', 'Workout nutrition tips', 'Recovery meal options']
  },
  {
    id: 'maintenance',
    name: 'Maintenance Plan',
    description: 'Balanced meals designed to maintain your current weight and improve overall health',
    meals: [
      { day: 'Monday', breakfast: 'Avocado Toast with Poached Eggs', lunch: 'Mediterranean Bowl', dinner: 'Grilled Chicken with Quinoa and Roasted Vegetables' },
      { day: 'Tuesday', breakfast: 'Smoothie with Protein and Greens', lunch: 'Chickpea and Vegetable Salad', dinner: 'Baked Fish with Sweet Potato and Green Beans' },
      { day: 'Wednesday', breakfast: 'Yogurt Parfait with Granola', lunch: 'Turkey and Avocado Sandwich', dinner: 'Vegetable Stir Fry with Tofu' }
    ],
    calories: '1800-2200',
    protein: '100g-140g',
    price: 139.99,
    duration: 28,
    type: 'maintenance',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    features: ['Balanced nutrition', 'Flexible meal options', 'Recipe variations', 'Family-friendly options']
  },
  {
    id: 'keto',
    name: 'Ketogenic Diet Plan',
    description: 'Low-carb, high-fat meals designed to maintain ketosis for weight loss and improved energy',
    meals: [
      { day: 'Monday', breakfast: 'Avocado and Bacon Omelette', lunch: 'Spinach Salad with Grilled Chicken', dinner: 'Butter-Basted Salmon with Asparagus' },
      { day: 'Tuesday', breakfast: 'Chia Pudding with Coconut Milk', lunch: 'Cauliflower Rice Bowl with Steak', dinner: 'Zucchini Noodles with Meatballs' },
      { day: 'Wednesday', breakfast: 'Keto Smoothie with Almond Butter', lunch: 'Lettuce Wraps with Turkey and Cheese', dinner: 'Baked Chicken Thighs with Brussels Sprouts' }
    ],
    calories: '1600-1900',
    protein: '100g-130g',
    price: 159.99,
    duration: 28,
    type: 'keto',
    image: 'https://images.unsplash.com/photo-1592050862964-ac03443f4035',
    features: ['Macro tracking', 'Ketosis tips', 'Meal prep guides', 'Keto-friendly snacks']
  },
  {
    id: 'vegetarian',
    name: 'Vegetarian Plan',
    description: 'Plant-based meals rich in protein and nutrients designed for vegetarians',
    meals: [
      { day: 'Monday', breakfast: 'Tofu Scramble with Vegetables', lunch: 'Quinoa Salad with Chickpeas', dinner: 'Eggplant Parmesan with Side Salad' },
      { day: 'Tuesday', breakfast: 'Greek Yogurt with Granola and Berries', lunch: 'Veggie Wrap with Hummus', dinner: 'Black Bean Burgers with Sweet Potato Fries' },
      { day: 'Wednesday', breakfast: 'Avocado Toast with Poached Eggs', lunch: 'Lentil Soup with Whole Grain Bread', dinner: 'Vegetable Curry with Brown Rice' }
    ],
    calories: '1700-2000',
    protein: '70g-90g',
    price: 144.99,
    duration: 28,
    type: 'vegetarian',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999',
    features: ['Plant-based protein sources', 'Iron-rich meals', 'Complete nutrition', 'Sustainable food options']
  },
  {
    id: 'vegan',
    name: 'Vegan Plan',
    description: 'Entirely plant-based meals rich in protein and nutrients designed for vegans',
    meals: [
      { day: 'Monday', breakfast: 'Overnight Oats with Chia Seeds and Fruit', lunch: 'Buddha Bowl with Tofu', dinner: 'Chickpea and Vegetable Curry' },
      { day: 'Tuesday', breakfast: 'Tofu Scramble with Vegetables', lunch: 'Quinoa Salad with Roasted Vegetables', dinner: 'Lentil Pasta with Tomato Sauce' },
      { day: 'Wednesday', breakfast: 'Green Smoothie with Protein Powder', lunch: 'Hummus and Vegetable Wrap', dinner: 'Black Bean and Sweet Potato Burgers' }
    ],
    calories: '1600-1900',
    protein: '60g-80g',
    price: 149.99,
    duration: 28,
    type: 'vegan',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0',
    features: ['Plant-based protein sources', 'B12-fortified options', 'Complete nutrition', 'Sustainable food options']
  }
];

function MealPlans() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [userGoal, setUserGoal] = useState('');
  const [calorieTarget, setCalorieTarget] = useState('');
  const [filteredPlans, setFilteredPlans] = useState(mealPlans);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Filter meal plans based on user selections
  useEffect(() => {
    let filtered = [...mealPlans];
    
    if (userGoal) {
      filtered = filtered.filter(plan => plan.type === userGoal);
    }
    
    if (calorieTarget) {
      const [minCal, maxCal] = getCalorieRange(calorieTarget);
      filtered = filtered.filter(plan => {
        const [planMin, planMax] = plan.calories.split('-').map(cal => parseInt(cal.replace('g', '')));
        return planMin >= minCal && planMax <= maxCal;
      });
    }
    
    setFilteredPlans(filtered);
  }, [userGoal, calorieTarget]);

  const getCalorieRange = (calorieOption) => {
    switch (calorieOption) {
      case '1500': return [1500, 1800];
      case '1800': return [1800, 2100];
      case '2100': return [2100, 2400];
      case '2400': return [2400, 2700];
      default: return [0, 3000];
    }
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan.id);
  };

  const handleCheckout = (plan) => {
    // Convert meal plan to cart item format
    const cartItem = {
      _id: plan.id,
      name: plan.name,
      price: plan.price,
      image: plan.image,
      quantity: 1,
      type: 'meal-plan'
    };
    
    // Add to cart and navigate to checkout
    addToCart(cartItem);
    navigate('/checkout');
  };

  return (
    <div className="meal-plans-page">
      <div className="meal-plans-header">
        <h1>Personalized Meal Plans</h1>
        <p>Get a customized meal plan designed for your fitness goals</p>
      </div>

      <div className="goal-questionnaire">
        <h2>Customize Your Plan</h2>
        <div className="form-group">
          <label>What's your primary goal?</label>
          <select value={userGoal} onChange={(e) => setUserGoal(e.target.value)}>
            <option value="">Select a goal</option>
            <option value="weight-loss">Weight Loss</option>
            <option value="muscle-gain">Muscle Gain</option>
            <option value="maintenance">Maintenance</option>
            <option value="keto">Ketogenic Diet</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
          </select>
        </div>

        <div className="form-group">
          <label>Daily Calorie Target</label>
          <select value={calorieTarget} onChange={(e) => setCalorieTarget(e.target.value)}>
            <option value="">Select calorie range</option>
            <option value="1500">1500-1800 calories</option>
            <option value="1800">1800-2100 calories</option>
            <option value="2100">2100-2400 calories</option>
            <option value="2400">2400+ calories</option>
          </select>
        </div>
      </div>

      <div className="meal-plans-grid">
        {filteredPlans.map(plan => (
          <div 
            key={plan.id} 
            className={`plan-card ${selectedPlan === plan.id ? 'selected' : ''}`}
            onClick={() => handleSelectPlan(plan)}
          >
            <div className="plan-image" style={{ backgroundImage: `url(${plan.image})` }}></div>
            <h3>{plan.name}</h3>
            <p>{plan.description}</p>
            <div className="plan-details">
              <div className="detail">
                <span className="label">Daily Calories:</span>
                <span className="value">{plan.calories}</span>
              </div>
              <div className="detail">
                <span className="label">Protein Target:</span>
                <span className="value">{plan.protein}</span>
              </div>
              <div className="detail">
                <span className="label">Duration:</span>
                <span className="value">{plan.duration} days</span>
              </div>
            </div>
            <div className="plan-features">
              <h4>Features:</h4>
              <ul>
                {plan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <div className="plan-price">
              <span className="price">${plan.price}</span>
              <span className="period">/month</span>
            </div>
            <button 
              className="btn-primary"
              onClick={(e) => {
                e.stopPropagation();
                handleCheckout(plan);
              }}
            >
              Select Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MealPlans; 