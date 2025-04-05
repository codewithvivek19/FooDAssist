import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Meals.css';

function MealCategory() {
  const { category } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedToCart, setAddedToCart] = useState(null);

  // Map URL category to display name
  const categoryDisplayNames = {
    'weight-loss': 'Weight Loss',
    'muscle-gain': 'Muscle Gain',
    'keto': 'Keto',
    'vegan': 'Vegan',
    'paleo': 'Paleo'
  };

  useEffect(() => {
    fetchMealsByCategory();
  }, [category]);

  const fetchMealsByCategory = async () => {
    try {
      setLoading(true);
      // Validation - if category is not valid, redirect to all meals
      if (!categoryDisplayNames[category]) {
        navigate('/meals');
        return;
      }

      const response = await fetch('http://localhost:5004/api/meals');
      if (!response.ok) {
        throw new Error('Failed to fetch meals');
      }
      
      const data = await response.json();
      
      // Filter meals by category
      // Note: This is a client-side filter. Ideally, the API would support filtering by category.
      const filteredMeals = data.filter(meal => {
        const mealCategory = meal.category?.toLowerCase() || '';
        
        // Match based on category
        if (category === 'weight-loss' && 
            (mealCategory.includes('weight') || mealCategory.includes('diet') || meal.tags?.includes('low-calorie'))) {
          return true;
        }
        
        if (category === 'muscle-gain' && 
            (mealCategory.includes('protein') || mealCategory.includes('muscle') || meal.tags?.includes('high-protein'))) {
          return true;
        }
        
        if (category === 'keto' && 
            (mealCategory.includes('keto') || meal.tags?.includes('keto'))) {
          return true;
        }
        
        if (category === 'vegan' && 
            (mealCategory.includes('vegan') || meal.tags?.includes('vegan'))) {
          return true;
        }
        
        if (category === 'paleo' && 
            (mealCategory.includes('paleo') || meal.tags?.includes('paleo'))) {
          return true;
        }
        
        return false;
      });
      
      console.log(`Filtered meals for category ${category}:`, filteredMeals);
      setMeals(filteredMeals);
    } catch (err) {
      console.error('Error fetching meals:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (meal) => {
    try {
      addToCart(meal);
      setAddedToCart(meal._id);
      // Show feedback
      alert('Item added to cart!');
      setTimeout(() => setAddedToCart(null), 2000);
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Failed to add item to cart');
    }
  };

  if (loading) return <div className="loading">Loading meals...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="meals-page">
      <h1>{categoryDisplayNames[category] || 'Specialty'} Meals</h1>
      
      <div className="category-description">
        {category === 'weight-loss' && (
          <p>Our weight loss meals are designed to be calorie-controlled while providing maximum satisfaction and nutrition. Each meal is balanced with lean proteins, complex carbohydrates, and healthy fats to support your weight management goals.</p>
        )}
        {category === 'muscle-gain' && (
          <p>Fuel your muscle growth with our high-protein meals designed to support recovery and strength. These meals provide the optimal balance of protein, carbs, and nutrients needed to maximize your training results.</p>
        )}
        {category === 'keto' && (
          <p>Our keto-friendly meals are low in carbs and high in healthy fats, perfect for maintaining ketosis. Enjoy delicious options that support your ketogenic lifestyle without compromising on flavor.</p>
        )}
        {category === 'vegan' && (
          <p>Our plant-based meals are 100% vegan and packed with nutrients from whole food sources. Enjoy creative, flavorful dishes that prove eating vegan can be both delicious and satisfying.</p>
        )}
        {category === 'paleo' && (
          <p>Our paleo meals focus on whole, unprocessed ingredients inspired by our ancestors' diet. Each meal is free from grains, dairy, and refined sugars while being rich in lean proteins, fruits, and vegetables.</p>
        )}
      </div>

      {meals.length === 0 ? (
        <div className="no-meals">
          <p>No meals found in this category. Please check back later or explore our other meal options.</p>
          <button onClick={() => navigate('/meals')} className="btn-primary">View All Meals</button>
        </div>
      ) : (
        <div className="meals-grid">
          {meals.map((meal) => (
            <div key={meal._id} className="meal-card">
              <img src={meal.image} alt={meal.name} />
              <div className="meal-info">
                <h3>{meal.name}</h3>
                <p className="description">{meal.description}</p>
                <p className="price">${meal.price?.toFixed(2)}</p>
                <button 
                  onClick={() => handleAddToCart(meal)}
                  className={`add-to-cart-btn ${addedToCart === meal._id ? 'added' : ''}`}
                  disabled={addedToCart === meal._id}
                >
                  {addedToCart === meal._id ? 'Added!' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MealCategory; 