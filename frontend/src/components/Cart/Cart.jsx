import React from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  // Render a meal plan item differently from a regular meal
  const renderCartItem = (item) => {
    const isMealPlan = item.type === 'meal-plan';

    return (
      <div key={item._id} className={`cart-item ${isMealPlan ? 'meal-plan-item' : ''}`}>
        <img src={item.image} alt={item.name} />
        <div className="item-details">
          <h3>{item.name}</h3>
          <p>${item.price.toFixed(2)}</p>
          
          {isMealPlan ? (
            <div className="plan-badge">
              Meal Plan - 28 days
            </div>
          ) : (
            <div className="quantity-controls">
              <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
            </div>
          )}
          
          <button onClick={() => removeFromCart(item._id)} className="remove-btn">
            Remove
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button onClick={() => navigate('/meals')} className="continue-shopping">
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(renderCartItem)}
          </div>
          <div className="cart-summary">
            <h3>Total: ${getCartTotal().toFixed(2)}</h3>
            <button onClick={handleCheckout} className="checkout-btn">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart; 