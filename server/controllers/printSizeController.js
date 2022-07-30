const { PrintSize } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {
  // Get all print sizes
  async getPrintSizes(req, res) {
    try {
      const printSizes = await PrintSize.find();
      res.status(200).json(printSizes);
    } catch (err) {
      res.status(500).json({ message: 'Your request could not be performed, please try again', body: err });
    };
  },

  // Create a print size
  async createPrintSize(req, res) {
    try {
      const newPrintSize = await PrintSize.create(req.body);
      res.status(200).json({
        message: "Print Size successfully created", newPrintSize
      });

    } catch (err) {
      res.status(400).json({ message: 'Your request could not be performed, please try again', body: err })
    };
  },

  // Find a print size by ID
  async getSinglePrintSize(req, res) {
    try {
      const printSize = await PrintSize.findOne({ _id: req.params.printSizeId });
      res.status(200).json(printSize);
    } catch (err) {
      res.status(500).json({ message: 'Your request could not be performed, please try again', body: err })
    };
  },

  // Todo: Create a checkAuth middleware and use it before updating and deleting a printSize
  // Update a printSize
  async updatePrintSize(req, res) {
    try {
      const printSize = await PrintSize.findOneAndUpdate(
        { _id: req.params.printSizeId },
        { $set: req.body },
        { new: true },
      );
      res.status(200).json(printSize)
    } catch (err) {
      res.status(400).json({ message: 'Your request could not be performed, please try again', body: err });
    };
  },

  // Delete a printSize
  async deletePrintSize(req, res) {
    try {
      await PrintSize.findByIdAndDelete({ _id: req.params.printSizeId })
      res.status(200).json({ message: "PrintSize deleted!" });
    } catch (err) {
      res.status(400).json({ message: 'Your request could not be performed, please try again', body: err });
    };
  },
};