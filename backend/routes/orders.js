const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// Get all orders (admin only)
router.get('/', adminAuth, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('items.meal');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new order (regular users)
router.post('/', auth, async (req, res) => {
  try {
    const {
      items,
      total,
      deliveryDetails,
      paymentMethod,
      status
    } = req.body;

    // Validate required fields
    if (!items || !total || !deliveryDetails || !paymentMethod) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create new order using the user ID from the auth middleware
    const order = new Order({
      userId: req.user.userId, // Make sure this matches the field name in your JWT payload
      items,
      total,
      deliveryDetails,
      paymentMethod,
      status: status || 'pending'
    });

    const savedOrder = await order.save();
    
    res.status(201).json({
      message: 'Order created successfully',
      order: savedOrder
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({
      message: 'Error creating order',
      error: error.message
    });
  }
});

// Get order by ID (accessible by the order owner or admin)
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('items.meal');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Check if the user is the order owner or an admin
    if (order.userId.toString() !== req.user.userId && 
        !req.user.isAdmin && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }
    
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user's orders (accessible by the user)
router.get('/user/me', auth, async (req, res) => {
  try {
    console.log('User requesting their orders:', req.user);
    
    if (!req.user || !req.user.userId) {
      console.error('Invalid user data in token:', req.user);
      return res.status(400).json({ message: 'Invalid user data in token' });
    }
    
    console.log('Looking for orders with userId:', req.user.userId);
    
    const orders = await Order.find({ userId: req.user.userId })
      .sort({ createdAt: -1 });
    
    console.log(`Found ${orders.length} orders for user ${req.user.userId}`);
    
    res.json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ 
      message: 'Error fetching orders',
      error: error.message 
    });
  }
});

// Get orders for a specific user (admin only)
router.get('/user/:userId', adminAuth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// Get all orders (admin only)
router.get('/admin/all', adminAuth, async (req, res) => {
  try {
    console.log('Admin requesting all orders:', req.user); // Debug log

    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .lean(); // Use lean() for better performance

    console.log(`Found ${orders.length} orders`); // Debug log

    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ 
      message: 'Error fetching orders',
      error: error.message 
    });
  }
});

// Update order status (admin only)
router.patch('/:orderId/status', adminAuth, async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'processing', 'preparing', 'out-for-delivery', 'delivered', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status' });
  }
});

// Get dashboard stats (admin only)
router.get('/stats/dashboard', adminAuth, async (req, res) => {
  try {
    console.log('Admin requesting stats:', req.user); // Debug log

    const [totalOrders, pendingOrders, completedOrders, revenue] = await Promise.all([
      Order.countDocuments(),
      Order.countDocuments({ status: 'pending' }),
      Order.countDocuments({ status: 'delivered' }),
      Order.aggregate([
        { $match: { status: 'delivered' } },
        { $group: { _id: null, total: { $sum: '$total' } } }
      ])
    ]);

    console.log('Stats:', { totalOrders, pendingOrders, completedOrders }); // Debug log

    res.json({
      totalOrders,
      pendingOrders,
      completedOrders,
      totalRevenue: revenue[0]?.total || 0
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ 
      message: 'Error fetching dashboard stats',
      error: error.message 
    });
  }
});

// Temporary route to create a test order for debugging
router.post('/create-test-order', auth, async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(400).json({ message: 'Invalid user data in token' });
    }

    console.log('Creating test order for user:', req.user.userId);

    // Create a sample test order
    const testOrder = new Order({
      userId: req.user.userId,
      items: [
        {
          _id: 'test-item-1',
          name: 'Test Meal 1',
          price: 12.99,
          quantity: 2
        },
        {
          _id: 'test-item-2',
          name: 'Test Meal 2',
          price: 9.99,
          quantity: 1
        }
      ],
      total: 35.97,
      deliveryDetails: {
        fullName: 'Test User',
        address: '123 Test Street',
        city: 'Test City',
        phone: '555-1234'
      },
      paymentMethod: 'card',
      paymentDetails: {
        cardNumber: '1234',
        cardName: 'Test User'
      },
      status: 'pending'
    });

    const savedOrder = await testOrder.save();
    
    res.status(201).json({
      message: 'Test order created successfully',
      order: savedOrder
    });
  } catch (error) {
    console.error('Test order creation error:', error);
    res.status(500).json({
      message: 'Error creating test order',
      error: error.message
    });
  }
});

module.exports = router; 