const { User } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find().populate('shippingDetails');
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: 'Your request could not be performed, please try again', body: err });
    };
  },

  // Create a user
  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      const token = signToken(newUser);
      res.status(200).json({
        message: "You are successfully Signed Up and logged in", token: token
      });

    } catch (err) {
      res.status(400).json({ message: 'Your request could not be performed, please try again', body: err })
    };
  },

  // Find a user by ID
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: 'Your request could not be performed, please try again', body: err })
    };
  },

  // Todo: Create a checkAuth middleware and use it before updating and deleting a user
  // Update a user

  // Todo: Check Logged in user if not admin ==> cannot update userType
  async updateUser(req, res) {
    try {
      console.log(req.body)
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { new: true },
      );
      res.status(200).json(user)
    } catch (err) {
      res.status(400).json({ message: 'Your request could not be performed, please try again', body: err });
    };
  },

  // Delete a user
  async deleteUser(req, res) {
    try {
      await User.findByIdAndDelete({ _id: req.params.userId })
      res.status(200).json({ message: "User deleted!" });
    } catch (err) {
      res.status(400).json({ message: 'Your request could not be performed, please try again', body: err });
    };
  },

  // User Login
  async loginUser(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email } );
      if (!user) {
        res
          .status(400)
          .json({ message: 'Incorrect email, please try again' });
        return;
      };

      const correctPw = await user.isCorrectPassword(req.body.password, user.password);
      if (!correctPw) {
        res
          .status(400)
          .json({ message: 'Incorrect password, please try again' });
        return;
      }
      else {
        const token = signToken(user);
        res.status(200).json({
          message: "You are successfully logged in", token: token
        })
      };

    } catch (err) {
      res.status(400).json(err);
    };
  },
};