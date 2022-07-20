const router = require('express').Router();
const userRoutes = require('./userRoutes');
const orderRoutes = require('./orderRoutes');
const printSizeRoutes = require('./printSizeRoutes');

router.use('/users', userRoutes);
router.use('/orders', orderRoutes);
router.use('/printsize', printSizeRoutes);

module.exports = router; 