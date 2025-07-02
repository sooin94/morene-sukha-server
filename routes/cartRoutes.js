const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController')
const authMiddleware = require('../middleware/authMiddleware');

// GET: 장바구니 조회
router.get('/', authMiddleware, cartController.getCart);

// POST: 장바구니 추가
router.post('/',authMiddleware, cartController.addToCart);

// PUT: 수량 변경
router.put('/:productId', authMiddleware, cartController.updateQuantity);

// DELETE: 항목 삭제 
router.delete('/:productId', authMiddleware, cartController.removeItem);

// DELETE: 장바구니 비우기
router.delete('/', authMiddleware, cartController.clearCart);

module.exports = router;
