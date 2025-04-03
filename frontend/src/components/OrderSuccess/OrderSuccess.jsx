import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderSuccess.css';

function OrderSuccess() {
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Get order details from session storage
    const storedOrder = sessionStorage.getItem('latestOrder');
    
    if (storedOrder) {
      setOrderDetails(JSON.parse(storedOrder));
    }
    
    // Clear cart items from session storage
    sessionStorage.removeItem('cartItems');
    
    // Clear the stored order after 5 minutes (so refreshing doesn't lose the data immediately)
    setTimeout(() => {
      sessionStorage.removeItem('latestOrder');
    }, 300000); // 5 minutes
  }, []);

  // Generate a random order number if one doesn't exist
  const orderNumber = orderDetails?.orderNumber || Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="order-success">
      <div className="success-content">
        <div className="success-icon">✓</div>
        <h2>Order Placed Successfully!</h2>
        <p className="order-number">Order #{orderNumber}</p>
        <p className="order-message">Thank you for your order. We'll start preparing your meals right away.</p>
        
        {orderDetails && (
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-detail">
              <span>Total Amount:</span>
              <span>${orderDetails.total?.toFixed(2) || '0.00'}</span>
            </div>
            <div className="summary-detail">
              <span>Payment Method:</span>
              <span>{orderDetails.paymentMethod === 'card' ? 'Credit/Debit Card' : 'Cash on Delivery'}</span>
            </div>
            {orderDetails.items && orderDetails.items.length > 0 && (
              <div className="order-items">
                <h4>Items</h4>
                <ul>
                  {orderDetails.items.map((item, index) => (
                    <li key={index}>
                      {item.name} x {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        
        <div className="success-actions">
          <button onClick={() => navigate('/meals')} className="continue-btn">
            Continue Shopping
          </button>
          <button onClick={() => navigate('/account')} className="account-btn">
            View My Orders
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess; 