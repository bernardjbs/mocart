const router = require('express').Router();
const {
  getPrintSizes,
  getSinglePrintSize,
  createPrintSize,
  deletePrintSize,
  updatePrintSize,
} = require('../../controllers/printSizeController');

// /api/printSizes
router.route('/')
  .get(getPrintSizes)
  .post(createPrintSize);

// /api/printsizes/:printSizeId
router.route('/:printSizeId')
  .get(getSinglePrintSize)
  .put(updatePrintSize)
  .delete(deletePrintSize);
  
module.exports = router;