const express = require('express');
const router = express.Router();
const showController = require('../controllers/showController');
const authMiddleware = require('../middleware/authMiddleware');

// GET : Show Lists
router.get('/', showController.getAllShows);

// GET : 공연 상세정보 조회
router.get('/:id', showController.getShowById);

// POST : 공연 등록
router.post('/', authMiddleware, showController.createShow);

// PUT : 공연 수정
router.put('/:id', authMiddleware, showController.updateShow);

// DELETE : 공연 삭제
router.delete('/:id', authMiddleware, showController.deleteShow);

module.exports = router;
