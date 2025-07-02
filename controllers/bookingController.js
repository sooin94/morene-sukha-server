const bookingService = require('../services/bookingService');

exports.createBooking = async(req, res) => {
    try {
        const { showId, quantity } = req.body;
        const booking = await bookingService.createBooking({userId : req.user.id, showId, quantity});
        res.status(201).json(booking);
    } catch(err) {
        res.status(500).json({message : '예매 실패'});
    }
};

exports.getMyBookings = async(req, res) => {
    try {
        const bookings = await bookingService.getMyBookings(req.user.id);
        res.json(bookings);
    } catch(err) {
        res.status(500).json({message : '예매 목록 조회 실패'});
    }
};

exports.getBookingById = async (req, res) => {
    try {   
        const booking = await bookingService.getBookingById(req.params.id, req.user.id);
        if(!booking) return res.status(404).json({message : '예매 내역을 찾을 수 없음'});
        res.json(booking);
    } catch(err) { 
        res.status(500).json({message : '예매 상세 조회 실패'});
    }
};

exports.cancelBooking = async (req, res) => {
    try {
        const booking = await bookingService.cancelBooking(req.params.id, req.user.id);
        res.json({message : '예매 취소 완료'}, booking);
    }catch(err) {   
        res.status(500).json({message : err.message});
    }
};