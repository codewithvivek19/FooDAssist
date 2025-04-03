import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Account.css';

function Account() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    fitnessGoals: '',
    dietaryPreferences: []
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(userData);
    setFormData({
      name: userData.name,
      email: userData.email,
      fitnessGoals: userData.fitnessGoals || '',
      dietaryPreferences: userData.dietaryPreferences || []
    });
  }, [navigate]);

  // Fetch user's orders when the orders tab is active
  useEffect(() => {
    if (activeTab === 'orders') {
      fetchUserOrders();
    }
  }, [activeTab]);

  const fetchUserOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      console.log('Token found:', !!token);
      
      // Decode token to check structure (without verification)
      if (token) {
        try {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
          console.log('Token payload:', JSON.parse(jsonPayload));
        } catch (e) {
          console.error('Error decoding token:', e);
        }
      }
      
      if (!token) {
        navigate('/login');
        return;
      }

      console.log('Fetching orders from API...');
      const response = await fetch('http://localhost:5004/api/orders/user/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('API Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error response:', errorData);
        throw new Error(`Failed to fetch orders: ${response.status} ${errorData.message || ''}`);
      }

      const data = await response.json();
      console.log('Orders data received:', data);
      setOrders(data);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load your order history. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5004/api/users/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const updatedUser = await response.json();
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
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

  const createTestOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      setLoading(true);
      const response = await fetch('http://localhost:5004/api/orders/create-test-order', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to create test order');
      }

      const data = await response.json();
      console.log('Test order created:', data);
      
      // Refetch the orders
      fetchUserOrders();
    } catch (err) {
      console.error('Error creating test order:', err);
      setError('Failed to create test order. Please try again.');
      setLoading(false);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="account-container">
      <div className="account-box">
        <div className="account-tabs">
          <button 
            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            My Profile
          </button>
          <button 
            className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            Order History
          </button>
        </div>

        {activeTab === 'profile' && (
          <>
            <h2>My Profile</h2>
            {isEditing ? (
              <form onSubmit={handleSubmit} className="account-form">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label>Fitness Goals</label>
                  <select
                    name="fitnessGoals"
                    value={formData.fitnessGoals}
                    onChange={handleChange}
                  >
                    <option value="weight-loss">Weight Loss</option>
                    <option value="muscle-gain">Muscle Gain</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="general-health">General Health</option>
                  </select>
                </div>
                <div className="form-actions">
                  <button type="submit" className="save-btn">Save Changes</button>
                  <button 
                    type="button" 
                    onClick={() => setIsEditing(false)}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="account-info">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Fitness Goals:</strong> {user.fitnessGoals}</p>
                <div className="account-actions">
                  <button onClick={handleEdit} className="edit-btn">Edit Profile</button>
                  <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === 'orders' && (
          <div className="orders-section">
            <h2>My Orders</h2>
            {loading ? (
              <div className="loading">Loading your orders...</div>
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : orders.length === 0 ? (
              <div className="empty-orders">
                <p>You haven't placed any orders yet.</p>
                <div className="empty-order-actions">
                  <button 
                    onClick={() => navigate('/meals')} 
                    className="shop-now-btn"
                  >
                    Shop Now
                  </button>
                  <button 
                    onClick={createTestOrder} 
                    className="create-test-btn"
                  >
                    Create Test Order
                  </button>
                </div>
              </div>
            ) : (
              <div className="orders-list">
                {orders.map((order) => (
                  <div className="order-card" key={order._id}>
                    <div className="order-header">
                      <div>
                        <span className="order-date">{formatDate(order.createdAt)}</span>
                        <span className="order-id">Order #{order._id ? order._id.slice(-6) : 'Unknown'}</span>
                      </div>
                      <span className={`status-badge ${getStatusBadgeClass(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </div>
                    
                    <div className="order-items">
                      {Array.isArray(order.items) && order.items.map((item, index) => (
                        <div className="order-item" key={index}>
                          <span>{item.name || 'Unknown item'} × {item.quantity || 1}</span>
                          <span>${((item.price || 0) * (item.quantity || 1)).toFixed(2)}</span>
                        </div>
                      ))}
                      {(!Array.isArray(order.items) || order.items.length === 0) && (
                        <div className="order-item">
                          <span>Items information not available</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="order-footer">
                      <div className="order-total">
                        <strong>Total:</strong>
                        <strong>${(order.total || 0).toFixed(2)}</strong>
                      </div>
                      
                      <button
                        onClick={() => navigate(`/order/${order._id}`)}
                        className="view-details-btn"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Account; 