const { Schema, model } = require('mongoose');

// Image uploads
const printsSchema = new Schema(
  {
    filename: {
      type: String,
      unique: true,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
    },
    imageBase64: {
      type: String,
      required: true,
    },
    Quantity: {
      type: Number,
      required: true,
    },
    Size: {
      type: String,
      required: true,
    }, 
 },
);

// Order Schema binding prints schema used to create model
const orderSchema = new Schema(
  {
    prints: [printsSchema], 
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