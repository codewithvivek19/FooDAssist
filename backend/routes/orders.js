const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('items.meal');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new order
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

// Get order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('items.meal');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user's orders
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// Get all orders (admin only)
router.get('/all', auth, async (req, res) => {
  try {
    console.log('User requesting orders:', req.user); // Debug log

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
router.patch('/:orderId/status', auth, async (req, res) => {
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

// Get dashboard stats
router.get('/stats', auth, async (req, res) => {
  try {
    console.log('User requesting stats:', req.user); // Debug log

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

module.exports = router; 