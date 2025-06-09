const express = require('express');
const router = express.Router();
const { placeOrder, addRating, searchSales } = require('../controllers/orderController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Public search
router.get('/search', searchSales);

// Protected routes
router.post('/order', authenticateToken, placeOrder);
router.post('/rate', authenticateToken, addRating);

module.exports = router;