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
  }
)


// Order Schema binding prints schema used to create model
const subOrderSchema = new Schema(
  {
    imageInfo: [printSchema],
  },
);

const orderSchema = new Schema(
  {
    prints: [subOrderSchema],
    //status: Open, Complete, Delivered, In Progress
    status: {
      type: String,
      required: true
    },
    note: {
      type: String,
    },
  },
  {
    timestamps: true,
  }

)
// Initialise Order model
const Order = model('order', orderSchema);

module.exports = Order