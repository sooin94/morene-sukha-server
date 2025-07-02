const express = require('express');
const router = express.Router();
const merchOrderController = require('../controllers/merchOrderController');
const authMiddleware = require('../middleware/authMiddleware');

// POST : 굿즈 주문 목록 조회
router.post('/', authMiddleware, merchOrderController.createMerchOrder);

// GET : 내 굿즈 주문 목록 조회
router.get('/my', authMiddleware, merchOrderController.getMyMerchOrders);

// GET : 굿즈 주문 상세 조회
router.get('/:id', authMiddleware, merchOrderController.getMerchOrderById);

// UPDATE :  굿즈 주문 취소
router.patch('/:id/cancel', authMiddleware, merchOrderController.cancelMerchOrder);

module.exports = router;
