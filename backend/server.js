require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ordersRoute = require('./routes/orders');
const usersRoute = require('./routes/users');
const adminRoute = require('./routes/admin');

const app = express();

// Set strictQuery to false to prepare for Mongoose 7
mongoose.set('strictQuery', false);

// CORS configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/meals', require('./routes/meals'));
app.use('/api/meal-plans', require('./routes/mealPlans'));
app.use('/api/users', usersRoute);
app.use('/api/orders', ordersRoute);
app.use('/api/admin', adminRoute);

// Add a debug route for checking auth status
app.get('/api/debug/auth-check', (req, res) => {
  const authHeader = req.headers.authorization || 'No Authorization header';
  console.log('Auth check request received with header:', authHeader);
  
  // Return info about the request
  res.json({
    message: 'Auth check debug route',
    authHeader,
    headers: req.headers,
    method: req.method,
    url: req.url
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5004;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });