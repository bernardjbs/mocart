const router = require('express').Router();
const { payment } = require('../../controllers/stripeController');

router.route('/payment').post(payment);

module.exports = router;