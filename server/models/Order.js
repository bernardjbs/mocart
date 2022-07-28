const { Schema, model } = require('mongoose');

const printSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
  }
)

// Order Schema binding prints schema used to create model
const orderSchema = new Schema(
  {
    prints: [printSchema],
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