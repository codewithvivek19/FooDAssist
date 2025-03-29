const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    _id: String,
    name: String,
    price: Number,
    quantity: Number
  }],
  total: {
    type: Number,
    required: true
  },
  deliveryDetails: {
    fullName: String,
    address: String,
    city: String,
    phone: String,
    instructions: String
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['card', 'cod']
  },
  paymentDetails: {
    cardNumber: String,
    cardName: String
  },
  courierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Courier'
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'preparing', 'out-for-delivery', 'delivered', 'cancelled'],
    default: 'pending'
  },
  statusHistory: [{
    status: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add pre-save middleware to track status changes
orderSchema.pre('save', function(next) {
  if (this.isModified('status')) {
    this.statusHistory.push({
      status: this.status,
      timestamp: new Date()
    });
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema); 