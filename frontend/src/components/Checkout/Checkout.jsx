import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

function Checkout() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState('delivery'); // delivery, payment
  const [deliveryDetails, setDeliveryDetails] = useState({
    fullName: '',
    address: '',
    city: '',
    phone: '',
    instructions: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDeliverySubmit = (e) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateCardDetails = () => {
    if (paymentMethod === 'card') {
      if (!cardDetails.cardNumber || cardDetails.cardNumber.length !== 16) {
        setError('Please enter a valid 16-digit card number');
        return false;
      }
      if (!cardDetails.cardName) {
        setError('Please enter the name on card');
        return false;
      }
      if (!cardDetails.expiryDate) {
        setError('Please enter card expiry date');
        return false;
      }
      if (!cardDetails.cvv || cardDetails.cvv.length !== 3) {
        setError('Please enter a valid CVV');
        return false;
      }
    }
    return true;
  };

  const handlePayment = async () => {
    if (!paymentMethod) {
      setError('Please select a payment method');
      return;
    }

    if (paymentMethod === 'card' && !validateCardDetails()) {
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        throw new Error('Please login to continue');
      }

      const orderData = {
        items: cartItems.map(item => ({
          _id: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        total: getCartTotal(),
        deliveryDetails,
        paymentMethod,
        paymentDetails: paymentMethod === 'card' ? {
          cardNumber: cardDetails.cardNumber.slice(-4), // Only store last 4 digits
          cardName: cardDetails.cardName
        } : null,
        status: 'pending'
      };

      const response = await fetch('http://localhost:5004/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      }).catch(error => {
        console.error('Network error:', error);
        throw new Error('Network error - Please check if the server is running');
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create order');
      }

      const data = await response.json();
      clearCart();
      navigate('/order-success');
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.message || 'Failed to process payment. Please try again.');
      if (err.message.includes('login')) {
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  const renderPaymentMethods = () => (
    <div className="payment-methods">
      <h3>Select Payment Method</h3>
      <div className="payment-options">
        <label className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
          <input
            type="radio"
            name="paymentMethod"
            value="card"
            checked={paymentMethod === 'card'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <div className="payment-option-content">
            <i className="payment-icon">💳</i>
            <span>Credit/Debit Card</span>
          </div>
        </label>

        <label className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}>
          <input
            type="radio"
            name="paymentMethod"
            value="cod"
            checked={paymentMethod === 'cod'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <div className="payment-option-content">
            <i className="payment-icon">💵</i>
            <span>Cash on Delivery</span>
          </div>
        </label>
      </div>

      {paymentMethod === 'card' && (
        <div className="card-details-form">
          <h4>Enter Card Details</h4>
          <div className="form-group">
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={cardDetails.cardNumber}
              onChange={handleCardDetailsChange}
              maxLength="16"
              pattern="\d*"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="cardName"
              placeholder="Name on Card"
              value={cardDetails.cardName}
              onChange={handleCardDetailsChange}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                name="expiryDate"
                placeholder="MM/YY"
                value={cardDetails.expiryDate}
                onChange={handleCardDetailsChange}
                maxLength="5"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={cardDetails.cvv}
                onChange={handleCardDetailsChange}
                maxLength="3"
                pattern="\d*"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (cartItems.length === 0) {
    return (
      <div className="checkout-container">
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <button onClick={() => navigate('/meals')} className="continue-shopping">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      {step === 'delivery' ? (
        <div className="delivery-form">
          <h2>Delivery Details</h2>
          <form onSubmit={handleDeliverySubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                value={deliveryDetails.fullName}
                onChange={(e) => setDeliveryDetails({
                  ...deliveryDetails,
                  fullName: e.target.value
                })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Delivery Address</label>
              <input
                type="text"
                id="address"
                value={deliveryDetails.address}
                onChange={(e) => setDeliveryDetails({
                  ...deliveryDetails,
                  address: e.target.value
                })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                value={deliveryDetails.city}
                onChange={(e) => setDeliveryDetails({
                  ...deliveryDetails,
                  city: e.target.value
                })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                value={deliveryDetails.phone}
                onChange={(e) => setDeliveryDetails({
                  ...deliveryDetails,
                  phone: e.target.value
                })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="instructions">Delivery Instructions (Optional)</label>
              <textarea
                id="instructions"
                value={deliveryDetails.instructions}
                onChange={(e) => setDeliveryDetails({
                  ...deliveryDetails,
                  instructions: e.target.value
                })}
              />
            </div>
            <button type="submit" className="continue-btn">
              Continue to Payment
            </button>
          </form>
        </div>
      ) : (
        <div className="payment-section">
          <h2>Payment</h2>
          <div className="order-summary">
            <h3>Order Summary</h3>
            {cartItems.map(item => (
              <div key={item._id} className="order-item">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="order-total">
              <strong>Total:</strong>
              <strong>${getCartTotal().toFixed(2)}</strong>
            </div>
          </div>

          {renderPaymentMethods()}

          {error && <div className="error-message">{error}</div>}
          
          <button 
            onClick={handlePayment} 
            className="payment-btn"
            disabled={loading || !paymentMethod}
          >
            {loading ? 'Processing...' : 'Complete Payment'}
          </button>
          
          <button 
            onClick={() => setStep('delivery')} 
            className="back-btn"
          >
            Back to Delivery Details
          </button>
        </div>
      )}
    </div>
  );
}

export default Checkout; 