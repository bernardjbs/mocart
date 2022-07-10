const { Schema, model } = require('mongoose');

// Product Schema used to create model
const productSchema = new Schema(
  {

  },
);

// Initialise Product model
const Product = model('product', productSchema);

module.exports = Product;