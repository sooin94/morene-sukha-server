const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');

// POST : 예매하기
router.post('/', authMiddleware, bookingController.createBooking);

// GET : 예매 목록 조회
router.get('/my', authMiddleware, bookingController.getMyBookings);

// GET : 예매 내역 상세조회
router.get('/:id', authMiddleware, bookingController.getBookingById);

// PATCH : 예매 취소
router.patch('/:id/cancel', authMiddleware, bookingController.cancelBooking);


module.exports = router;