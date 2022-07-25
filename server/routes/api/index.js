const router = require('express').Router();
const userRoutes = require('./userRoutes');
const orderRoutes = require('./orderRoutes');
const printSizeRoutes = require('./printSizeRoutes');
const pictureRoutes = require('./pictureRoutes');

router.use('/users', userRoutes);
router.use('/orders', orderRoutes);
router.use('/printsize', printSizeRoutes);
router.use('/picture', pictureRoutes);
// router.use('/uploads', uploadRoutes);

module.exports = router; 