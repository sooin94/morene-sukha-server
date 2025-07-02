const Booking = require('../models/Booking');
const Show = require('../models/Show');

exports.createBooking = async({userId, showId, quantity}) => {
    // 중복예매 방지
    const existing = await Booking.findOne({userId, showId, status: 'reserved'});
    if(existing){
        throw new Error ('이미 예매한 공연입니다.');
    }

    // 현재 공연 정보
    const show = await Show.findById(showId);
    if(!show) throw new Error('공연 정보를 찾을 수 없습니다.');

    // 현재 예매된 수량 계산
    const bookings = await Booking.find({showId: show._id, status: 'reserved'});
    const booked = bookings.reduce((sum, b) => sum + b.quantity, 0);

    /*
    aggregate 문법
    $match : 조건 필터링
    $group : 그룹화 + 집계 연산(SUM, AVG 등)
    $sum : '$quantity' quantity 필드를 다 더함
    _id : null 그룹핑 없이 전체 한 덩어리로 계산
    
    const currentBooking = await Booking.aggregate([
        { $match: {showId: show._id, status:'reserved'} },
        { $group: {_id: null, total: { $sum: '$quantity' } } }
    ]);
    const booked = currentBooking[0]?.total || 0;
    */

    if(booked + quantity > show.maxCapacity){
        throw new Error('잔여 좌석이 부족합니다.');
    }

    // 예매 생성
    const booking = new Booking({userId, showId, quantity});
    return await booking.save();
};

exports.getMyBookings = async(userId) => {
    return await Booking.find({userId}).populate('showId');
};

exports.getBookingById = async(id, userId) => {
    return await Booking.findOne({_id: id, userId}).populate('userId');
};

exports.cancelBooking = async(id, userid) => {
    const booking = await Booking.findOne({_id : id, userId});
    if(!booking) throw new Error('예약을 찾을 수 없음');
    booking.status = 'cancelled';
    return await booking.save();
}

