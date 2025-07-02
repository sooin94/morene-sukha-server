const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const authMiddleware = require('../middleware/authMiddleware');

// GET : Menu Lists
router.get('/', menuController.getAllMenus);

// GET : 메뉴 상세정보 조회
router.get('/:id', menuController.getMenuById);

// POST : 메뉴 추가
router.post('/', authMiddleware, menuController.createMenu);

// PUT : 메뉴 수정
router.put('/:id', authMiddleware, menuController.updateMenu);

// DELETE : 메뉴 삭제
router.delete('/:id', authMiddleware, menuController.deleteMenu);

module.exports = router;
