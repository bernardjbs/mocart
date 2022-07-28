const { Schema, model } = require('mongoose');

// Order Schema binding prints schema used to create model
const orderSchema = new Schema(
  {
    prints: [
      {
        type: Schema.Types.ObjectId, 
        ref: 'picture'
      },
    ], 
    delivery: {
      type: String, 
      required: true,
    },
    note: String,
    status: String, // Open, Complete, Delivered, In Progress
  },
  {
    timestamps: true,
  },
);

// Initialise Order model
const Order = model('order', orderSchema);

module.exports = Order