const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const authMiddleware = require('../middleware/authMiddleware');
const orderController = require('../controllers/orderController');
const Cart = require('../models/Cart');

// POST : Create Order
router.post('/', authMiddleware, orderController.createOrder);

// GET : Order Lists
router.get('/my', authMiddleware, orderController.getMyOrders);

// GET : 주문 상세내역
router.get('/:id', authMiddleware, orderController.getOrderById);

// POST : 주문 상태 변경
router.post('/:id', authMiddleware, orderController.updateOrderStatus);

// PATCH: 주문 취소
router.patch('/:id/cancel', authMiddleware, orderController.cancelOrder);

module.exports = router;