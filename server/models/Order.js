const { Schema, model } = require('mongoose');

// Cart Item details
const cartItemSchema = {

};

// Discount and discount type (product / item)
const discountSchema = {

};

// Shipment details
const shipmentSchema = {

};

// Order Schema binding cart item, discount and shipment schemas used to create model
const orderSchema = new Schema(
  {

  },
);

// Initialise Order model
const Order = model('order', orderSchema);

module.exports = Order