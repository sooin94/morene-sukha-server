const express = require('express');
const router = express.Router();
const merchCartController  = require('../controllers/merchCartController');
const authMiddleware = require('../middleware/authMiddleware');

// GET : 굿즈 장바구니 조회
router.get('/', authMiddleware, merchCartController.getCart);

// POST : 굿즈 장바구니 추가
router.post('/', authMiddleware, merchCartController.addToCart);

// UPDATE : 굿즈 장바구니 수량 수정
router.put('/:productId', authMiddleware, merchCartController.updateQuantity);

// DELETE : 장바구니 굿즈 삭제
router.delete('/:productId', authMiddleware, merchCartController.removeItem);

// DELETE : 장바구니 비우기
router.delete('/', authMiddleware, merchCartController.clearCart);

module.exports = router;