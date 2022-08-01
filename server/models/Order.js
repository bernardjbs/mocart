const { Schema, model } = require('mongoose');

const printSchema = new Schema(
  {
    id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    filename: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
  },
);

const orderSchema = new Schema(
  {
    customerId: {
      type: String,
    },
    imageInfo: [printSchema],
    //status: Open, Complete, Delivered, In Progress
    status: {
      type: String,
    },
    note: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

// Initialise Order model
const Order = model('order', orderSchema);

module.exports = Order