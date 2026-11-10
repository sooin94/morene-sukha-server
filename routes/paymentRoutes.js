const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

// POST : Create Order
router.post('/', authMiddleware, paymentController.checkOrder);

// POST : Create Payment
router.post('/', authMiddleware, paymentController.verifyPayment);

module.exports = router;
