import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './Meals.css';

function Meals() {
  const { addToCart } = useCart();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedToCart, setAddedToCart] = useState(null);

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const response = await fetch('http://localhost:5004/api/meals');
      if (!response.ok) {
        throw new Error('Failed to fetch meals');
      }
      const data = await response.json();
      console.log('Fetched meals:', data); // Debug log
      setMeals(data);
    } catch (err) {
      console.error('Error fetching meals:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (meal) => {
    try {
      console.log('Adding to cart:', meal); // Debug log
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
      <h1>Our Meals</h1>
      
      <div className="meal-categories">
        <h2>Browse by Category</h2>
        <div className="category-links">
          <Link to="/meals/weight-loss" className="category-link">Weight Loss</Link>
          <Link to="/meals/muscle-gain" className="category-link">Muscle Gain</Link>
          <Link to="/meals/keto" className="category-link">Keto</Link>
          <Link to="/meals/vegan" className="category-link">Vegan</Link>
          <Link to="/meals/paleo" className="category-link">Paleo</Link>
        </div>
      </div>
      
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
    </div>
  );
}

export default Meals; 