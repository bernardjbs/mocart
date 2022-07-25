const router = require('express').Router();
const apiRoutes = require('./api');
const uploadsRoutes = require('./api');

router.use('/api', apiRoutes);
router.use('/server', uploadsRoutes);

// router.use((req, res) => {
//   return res.send('Wrong route!');
// });

module.exports = router;