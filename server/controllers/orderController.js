const { Order } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {
  // Get all orders
  async getOrders(req, res) {
    try {
      const users = await Order.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: 'Your request could not be performed, please try again', body: err });
    };
  },

  // Create a order
  async createOrder(req, res) {
    try {
      const newOrder = await Order.create(req.body);

      const token = signToken(newOrder);
      res.status(200).json({
        message: "Order successfully created", token: token
      });

    } catch (err) {
      res.status(400).json({ message: 'Your request could not be performed, please try again', body: err })
    };
  },

  // Find an order by ID
  async getSingleOrder(req, res) {
    try {
      const order = await Order.findOne({ _id: req.params.orderId });
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json({ message: 'Your request could not be performed, please try again', body: err })
    };
  },

  // Todo: Create a checkAuth middleware and use it before updating and deleting a order
  // Update a order
  async updateOrder(req, res) {
    try {
      const order = await Order.findOneAndUpdate(
        { _id: req.params.orderId },
        { $set: req.body },
        { new: true },
      );
      res.status(200).json(order)
    } catch (err) {
      res.status(400).json({ message: 'Your request could not be performed, please try again', body: err });
    };
  },

  // Delete a order
  async deleteOrder(req, res) {
    try {
      await Order.findByIdAndDelete({ _id: req.params.orderId })
      res.status(200).json({ message: "Order deleted!" });
    } catch (err) {
      res.status(400).json({ message: 'Your request could not be performed, please try again', body: err });
    };
  },
};