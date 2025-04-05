import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './MealPlans.css';

function MealPlans() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [userGoal, setUserGoal] = useState('');
  const [calorieTarget, setCalorieTarget] = useState('');
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [allMealPlans, setAllMealPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Fetch meal plans from API
  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5004/api/meal-plans');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch meal plans: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Format the data to match the expected structure
        const formattedPlans = data.map(plan => ({
          id: plan._id,
          name: plan.name,
          description: plan.description,
          calories: `${plan.targetCalories - 100}-${plan.targetCalories + 100}`, // Create a range around target calories
          protein: getPlanProtein(plan.type), // Generate protein range based on plan type
          price: plan.price,
          duration: plan.duration,
          type: plan.type,
          image: plan.image,
          features: plan.features || []
        }));
        
        setAllMealPlans(formattedPlans);
        setFilteredPlans(formattedPlans);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching meal plans:', error);
        setError(error.message);
        setLoading(false);
      }
    };
    
    fetchMealPlans();
  }, []);
  
  // Helper function to generate protein ranges based on plan type
  const getPlanProtein = (planType) => {
    switch (planType) {
      case 'weight-loss': return '120g-140g';
      case 'muscle-gain': return '180g-220g';
      case 'maintenance': return '100g-140g';
      case 'keto': return '100g-130g';
      case 'vegetarian': return '70g-90g';
      case 'vegan': return '60g-80g';
      default: return '90g-120g';
    }
  };

  // Filter meal plans based on user selections
  useEffect(() => {
    if (allMealPlans.length === 0) return;
    
    let filtered = [...allMealPlans];
    
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
  }, [userGoal, calorieTarget, allMealPlans]);

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

  if (loading) {
    return (
      <div className="meal-plans-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading meal plans...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="meal-plans-page">
        <div className="error-container">
          <h3>Error loading meal plans</h3>
          <p>{error}</p>
          <button className="btn-primary" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </div>
    );
  }

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

      {filteredPlans.length === 0 ? (
        <div className="no-plans-message">
          <p>No meal plans match your current filters. Please try different options.</p>
        </div>
      ) : (
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
      )}
    </div>
  );
}

export default MealPlans; 