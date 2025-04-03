const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const Order = require('../models/Order');
const Meal = require('../models/Meal');
const MealPlan = require('../models/MealPlan');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Admin login attempt:', { email, password });
    
    // For demo purposes, hardcode admin credentials
    if (email === 'admin@fitfuel.com' && password === 'admin123') {
      console.log('Admin credentials verified');
      
      const adminData = {
        userId: 'admin-123',
        isAdmin: true,
        role: 'admin',
        email: 'admin@fitfuel.com'
      };
      
      const token = jwt.sign(
        adminData,
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      console.log('Generated admin token:', token);
      
      return res.json({ 
        message: 'Admin login successful',
        token,
        admin: {
          email: 'admin@fitfuel.com',
          role: 'admin'
        }
      });
    }
    
    console.log('Invalid admin credentials');
    res.status(401).json({ message: 'Invalid credentials' });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ 
      message: 'Login failed',
      error: error.message 
    });
  }
});

// Add this route to test admin authentication
router.get('/test-auth', adminAuth, async (req, res) => {
  try {
    res.json({ 
      message: 'Admin authentication successful',
      user: req.user 
    });
  } catch (error) {
    res.status(500).json({ message: 'Test failed' });
  }
});

// Get all orders
router.get('/orders', adminAuth, async (req, res) => {
  try {
    console.log('Admin requesting orders:', req.user);
    
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate('userId', 'name email');
    
    console.log('Found orders:', orders.length); // Debug log
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// Get dashboard stats
router.get('/dashboard-stats', adminAuth, async (req, res) => {
  try {
    // Get counts from database
    const totalOrders = await Order.countDocuments();
    const totalMeals = await Meal.countDocuments();
    const activeMealPlans = await Order.countDocuments({ status: 'active' });
    
    // Calculate total revenue
    const revenueResult = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$total' }
        }
      }
    ]);

    const stats = {
      totalOrders,
      totalMeals,
      activeMealPlans,
      totalRevenue: revenueResult[0]?.total || 0
    };

    console.log('Dashboard stats:', stats); // Debug log
    res.json(stats);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Error fetching dashboard stats' });
  }
});

// Get all meals
router.get('/meals', adminAuth, async (req, res) => {
  try {
    const meals = await Meal.find().sort({ createdAt: -1 });
    console.log('Fetched meals:', meals.length); // Debug log
    res.json(meals);
  } catch (error) {
    console.error('Error fetching meals:', error);
    res.status(500).json({ 
      message: 'Error fetching meals',
      error: error.message 
    });
  }
});

// Delete meal
router.delete('/meals/:id', adminAuth, async (req, res) => {
  try {
    console.log('Deleting meal:', req.params.id); // Debug log
    
    if (!req.params.id) {
      return res.status(400).json({ message: 'Meal ID is required' });
    }

    const meal = await Meal.findByIdAndDelete(req.params.id);
    
    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' });
    }

    console.log('Meal deleted:', meal); // Debug log
    res.json({ message: 'Meal deleted successfully', mealId: req.params.id });
  } catch (error) {
    console.error('Error deleting meal:', error);
    res.status(500).json({ 
      message: 'Error deleting meal',
      error: error.message 
    });
  }
});

// Update meal
router.put('/meals/:id', adminAuth, async (req, res) => {
  try {
    console.log('Updating meal:', req.params.id, req.body); // Debug log
    
    if (!req.params.id) {
      return res.status(400).json({ message: 'Meal ID is required' });
    }

    const { name, description, price, image, category } = req.body;

    if (!name || !description || !price || !image) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const updateData = {
      name,
      description,
      price: parseFloat(price),
      image,
      category: category || 'main' // Provide default category if not specified
    };

    const meal = await Meal.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' });
    }
    
    console.log('Meal updated:', meal); // Debug log
    res.json(meal);
  } catch (error) {
    console.error('Error updating meal:', error);
    res.status(500).json({ 
      message: 'Error updating meal',
      error: error.message 
    });
  }
});

// Dummy function for sending notifications (add this before the route where it's used)
const sendStatusNotification = async (order) => {
  // In a real application, this would send notifications via email, SMS, or push
  console.log(`Notification: Order ${order._id} status changed to ${order.status}`);
  return true;
};

// Update order status
router.put('/orders/:id/status', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Send notifications based on status change
    await sendStatusNotification(order);

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status' });
  }
});

// Assign courier to order
router.put('/orders/:id/assign-courier', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { courierId } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      { 
        courierId,
        status: 'out-for-delivery'
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Send notification to courier
    await sendCourierNotification(order, courierId);

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error assigning courier' });
  }
});

async function sendCourierNotification(order, courierId) {
  // Implement your courier notification logic here
  console.log(`Courier ${courierId} notified for order ${order._id}`);
}

module.exports = router; 