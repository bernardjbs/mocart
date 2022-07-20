const router = require('express').Router();
const {
  getOrders,
  getSingleOrder,
  createOrder,
  deleteOrder,
  updateOrder,
} = require('../../controllers/orderController');

// /api/Orders
router.route('/')
  .get(getOrders)


// /api/orders/:OrderId
router.route('/:orderId')
  .get(getSingleOrder)
  .put(updateOrder)
  .delete(deleteOrder);

router.route('/neworder')
  .post(createOrder);
  
module.exports = router;