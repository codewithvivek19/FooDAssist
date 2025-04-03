import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './OrderDetails.css';

function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(`http://localhost:5004/api/orders/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch order details');
      }

      const data = await response.json();
      setOrder(data);
    } catch (err) {
      console.error('Error fetching order details:', err);
      setError('Could not load order details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status badge class based on order status
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'delivered':
        return 'status-delivered';
      case 'processing':
      case 'preparing':
        return 'status-processing';
      case 'out-for-delivery':
        return 'status-out-for-delivery';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return 'status-pending';
    }
  };

  // Get human-readable status text
  const getStatusText = (status) => {
    switch (status) {
      case 'out-for-delivery':
        return 'Out for Delivery';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  if (loading) {
    return (
      <div className="order-details-container">
        <div className="loading">Loading order details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-details-container">
        <div className="error-message">{error}</div>
        <button onClick={() => navigate('/account')} className="back-btn">
          Back to My Account
        </button>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="order-details-container">
        <div className="not-found">Order not found</div>
        <button onClick={() => navigate('/account')} className="back-btn">
          Back to My Account
        </button>
      </div>
    );
  }

  return (
    <div className="order-details-container">
      <div className="order-details-card">
        <div className="back-link">
          <button onClick={() => navigate('/account')} className="back-btn">
            &larr; Back to My Account
          </button>
        </div>
        
        <h2>Order Details</h2>
        
        <div className="order-info">
          <div className="order-info-header">
            <div>
              <p className="order-number">Order #{order._id ? order._id.slice(-6) : 'Unknown'}</p>
              <p className="order-date">Placed on {formatDate(order.createdAt || new Date())}</p>
            </div>
            <span className={`status-badge ${getStatusBadgeClass(order.status)}`}>
              {getStatusText(order.status)}
            </span>
          </div>
          
          <div className="order-section">
            <h3>Items</h3>
            <div className="order-items-table">
              <div className="table-header">
                <span>Item</span>
                <span>Quantity</span>
                <span>Price</span>
                <span>Total</span>
              </div>
              {Array.isArray(order.items) && order.items.map((item, index) => (
                <div className="table-row" key={index}>
                  <span>{item.name || 'Unknown Item'}</span>
                  <span>{item.quantity || 1}</span>
                  <span>${(item.price || 0).toFixed(2)}</span>
                  <span>${((item.price || 0) * (item.quantity || 1)).toFixed(2)}</span>
                </div>
              ))}
              {(!Array.isArray(order.items) || order.items.length === 0) && (
                <div className="table-row">
                  <span colSpan="4">No items available</span>
                </div>
              )}
              <div className="table-footer">
                <span colSpan="3">Total</span>
                <span>${(order.total || 0).toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="order-details-sections">
            <div className="order-section">
              <h3>Delivery Information</h3>
              <div className="delivery-details">
                {order.deliveryDetails ? (
                  <>
                    <p><strong>Recipient:</strong> {order.deliveryDetails.fullName || 'Not provided'}</p>
                    <p><strong>Address:</strong> {order.deliveryDetails.address || 'Not provided'}</p>
                    <p><strong>City:</strong> {order.deliveryDetails.city || 'Not provided'}</p>
                    <p><strong>Phone:</strong> {order.deliveryDetails.phone || 'Not provided'}</p>
                    {order.deliveryDetails.instructions && (
                      <p><strong>Instructions:</strong> {order.deliveryDetails.instructions}</p>
                    )}
                  </>
                ) : (
                  <p>Delivery details not available</p>
                )}
              </div>
            </div>
            
            <div className="order-section">
              <h3>Payment Information</h3>
              <div className="payment-details">
                <p><strong>Method:</strong> {order.paymentMethod === 'card' ? 'Credit/Debit Card' : order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Unknown'}</p>
                {order.paymentMethod === 'card' && order.paymentDetails && (
                  <>
                    <p><strong>Card:</strong> **** **** **** {order.paymentDetails.cardNumber || '****'}</p>
                    <p><strong>Name on Card:</strong> {order.paymentDetails.cardName || 'Not provided'}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="order-actions">
          <button onClick={() => navigate('/meals')} className="shop-again-btn">
            Shop Again
          </button>
          {order.status === 'pending' && (
            <button className="cancel-order-btn">
              Cancel Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderDetails; 