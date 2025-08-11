const express = require('express');
const router = express.Router();
const merchController = require('../controllers/merchController');
const authMiddleware = require('../middleware/authMiddleware');

// GET : 굿즈 목록 조회
router.get('/', merchController.getAllMerch);

// GET : 굿즈 상세 조회
router.get('/:id', merchController.getMerchById);

// POST : 굿즈 생성
router.post('/', authMiddleware, merchController.createMerch);

// PUT : 굿즈 수정
router.put('/:id', authMiddleware, merchController.updateMerch);

// DELETE : 굿즈 삭제
router.delete('/:id', authMiddleware, merchController.deleteMerch);

module.exports = router;
