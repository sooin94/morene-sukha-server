const axios = require('axios');
const MerchOrder = require('../models/MerchOrder');
const Menu = require('../models/Menu');
const Order = require('../models/Order');
const orderService = require('../services/orderService');
const { v4: uuidv4 } = require("uuid");

// 주문 정보 확인
exports.checkOrder = async(req, res) => {
    try {
        const order = await orderService.createOrder(req.user.id);
        res.status(200).json({message : '주문 생성 완료', order});
    }catch (err) {
        res.status(500).json({message : err.message});
    }

}

exports.verifyPayment = async(req, res) => {
    try{
        // 1.아임포트 토큰 발급
        const { data: tokenRes } = await axios.post('https://api.iamport.kr/users/getToken', {
            imp_key : process.env.IAMPORT_API_KEY,
            imp_secret: process.env.IAMPORT_API_SECRET
        });
        const accessToken = tokenRes.response.access_token;

        // 2.결제 정보 조회
        const { data: paymentData } = await axios.get(`https://api.iamport.kr/payments/${imp_uid}`,{
           headers: {Authorization: accessToken} 
        });

        const paidAmount = paymentData.response.amount;

        // 3.주문 정보 불러오기
        const order = await MerchOrder.findOne({ _id: merchant_uid, userId : req.user.id});
        if(!order) return res.status(404).json({success:false, message:'주문 정보 없음'});
        
        if(order.totalAmount !== paidAmount) {
            return res.status(400).json({success:false, message:'결제 금액 오류'});
        }

        // 4.주문 상태 변경
        order.status = 'paid';
        await order.save();

        res.status(200).json({success: true, message: '결제 검증 성공'});
    }catch(err){
        console.error('결제 검증 실패', err);
        res.status(500).json({success: false, message: '결제 검증 오류'});
    }
}