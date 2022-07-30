const stripe = require("stripe")(process.env.STRIPE_KEY);
const User = require('../models/User');
const Order = require('../models/Order');

module.exports = {
  async payment(req, res) {
    const cartItems = localStorage.getItem('cartItems')
    console.log(cartItems);
    try {
      stripe.charges.create(
        {
          source: req.body.stripeTokenId,
          amount: req.body.amount,
          currency: "aud",
        },
        (stripeErr, stripeRes) => {
          if (stripeErr) {
            res.status(500).json(stripeErr);
          } else {
            res.status(200).json(stripeRes);
          }
        }
      );


    } catch (error) {
      res.status(500).json({ message: 'Your request could not be performed, please try again', body: error })
    };
  },
};