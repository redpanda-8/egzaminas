const express = require('express');
const router = express.Router();
const {
  getAllSales,
  addSales,
  updateSale,
  deleteSale
} = require('../controllers/saleController');

const { authenticateToken } = require('../middleware/authMiddleware');

// Public: list all sales
router.get('/', getAllSales);

// Protected (admin): add/update/delete sales
router.post('/', authenticateToken, addSales);
router.put('/:id', authenticateToken, updateSale);
router.delete('/:id', authenticateToken, deleteSale);

module.exports = router;