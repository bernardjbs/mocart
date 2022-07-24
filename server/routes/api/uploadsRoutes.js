const router = require('express').Router();
const {
  getUploads,
} = require('../../controllers/uploadsController');

router.route('/')
  .get(getUploads)

// route to get all dishes
router.get('/', async (req, res) => {
  try {
    res.json("You are in uploads route");
  } catch (error) {
    res.json(err);
  }
});

module.exports = router;
