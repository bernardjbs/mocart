const { Schema, model } = require('mongoose');

// Image uploads
const printSizeSchema = new Schema(
  {
    dimension: {
      type: String, 
      required: true,
    }, 
    price: {
      type: Number, 
      required: true,
    },
 },
);

// Initialise PrintSize model
const PrintSize = model('printSize', printSizeSchema);

module.exports = PrintSize;