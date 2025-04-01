import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MealPlans.css';
import './MealPlanRecommendations.css';

function MealPlanRecommendations() {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    // Retrieve recommendations from session storage
    const storedRecommendations = sessionStorage.getItem('mealPlanRecommendations');
    
    if (!storedRecommendations) {
      // Redirect to the body profile page if no recommendations are found
      navigate('/body-profile');
      return;
    }
    
    setRecommendations(JSON.parse(storedRecommendations));
  }, [navigate]);

  const handleSelectPlan = (planId) => {
    setSelectedPlan(planId);
  };

  const handleAddToCart = () => {
    if (!selectedPlan) return;
    
    // Add the selected plan to the cart (replace with actual implementation)
    // In a real app, this would call a function from a cart context or make an API call
    
    // For demo purposes, let's navigate to the cart page
    navigate('/cart');
  };

  if (!recommendations) {
    return <div className="loading">Loading recommendations...</div>;
  }

  return (
    <div className="meal-plan-recommendations">
      <div className="recommendations-header">
        <h1>Your Personalized Meal Plan Recommendations</h1>
        <p>Based on your body profile, we've selected these meal plans for you</p>
      </div>

      <div className="metrics-summary">
        <h2>Your Nutritional Needs</h2>
        <div className="metrics-grid">
          <div className="metric-card">
            <h3>Daily Calories</h3>
            <p className="metric-value">{Math.round(recommendations.metrics.targetCalories)}</p>
            <p className="metric-description">calories per day</p>
          </div>
          <div className="metric-card">
            <h3>Protein Target</h3>
            <p className="metric-value">{recommendations.metrics.proteinTarget}g</p>
            <p className="metric-description">protein per day</p>
          </div>
          <div className="metric-card">
            <h3>BMI</h3>
            <p className="metric-value">{recommendations.metrics.bmi.toFixed(1)}</p>
            <p className="metric-description">body mass index</p>
          </div>
          <div className="metric-card">
            <h3>Metabolic Rate</h3>
            <p className="metric-value">{recommendations.metrics.bmr}</p>
            <p className="metric-description">base metabolic rate</p>
          </div>
        </div>
      </div>

      <div className="recommended-plans">
        <h2>Recommended Meal Plans</h2>
        
        {recommendations.recommendedPlans.length === 0 ? (
          <div className="no-plans-message">
            <p>No meal plans found that match your profile exactly. Please try adjusting your preferences or contact our nutrition team for a customized plan.</p>
          </div>
        ) : (
          <div className="meal-plans-grid">
            {recommendations.recommendedPlans.map(plan => (
              <div 
                key={plan._id} 
                className={`plan-card ${selectedPlan === plan._id ? 'selected' : ''}`}
                onClick={() => handleSelectPlan(plan._id)}
              >
                <div className="plan-image">
                  <img src={plan.image} alt={plan.name} />
                  {selectedPlan === plan._id && (
                    <div className="selected-badge">
                      <span>Selected</span>
                    </div>
                  )}
                </div>
                <h3>{plan.name}</h3>
                <p className="plan-description">{plan.description}</p>
                <div className="plan-details">
                  <div className="detail">
                    <span className="label">Duration:</span>
                    <span className="value">{plan.duration} Days</span>
                  </div>
                  <div className="detail">
                    <span className="label">Calories:</span>
                    <span className="value">{plan.targetCalories}</span>
                  </div>
                  <div className="detail">
                    <span className="label">Type:</span>
                    <span className="value">{plan.type.replace('-', ' ')}</span>
                  </div>
                </div>
                <div className="plan-price">
                  <span className="price">${plan.price}</span>
                </div>
                <button 
                  className={`btn-select ${selectedPlan === plan._id ? 'selected' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectPlan(plan._id);
                  }}
                >
                  {selectedPlan === plan._id ? 'Selected' : 'Select Plan'}
                </button>
              </div>
            ))}
          </div>
        )}
        
        <div className="recommendation-actions">
          <button 
            className="btn-back"
            onClick={() => navigate('/body-profile')}
          >
            Adjust Profile
          </button>
          <button 
            className="btn-primary btn-large"
            disabled={!selectedPlan}
            onClick={handleAddToCart}
          >
            Continue with Selected Plan
          </button>
        </div>
      </div>
    </div>
  );
}

export default MealPlanRecommendations; 