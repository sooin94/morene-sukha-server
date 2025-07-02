const orderService = require('../services/orderService');

// 주문 하기
exports.createOrder = async (req, res) => {
    try {
        const result = await orderService.createOrder(req.user.id);
        res.status(201).json(result);
    } catch(err){
        res.status(400).json({message:'주문 실패'});
    }
};

// 주문 목록 조회
exports.getMyOrders = async(req, res) => {
    try {
        const orders = await orderService.getMyOrders(req.user.id);
        res.status(200).json(orders);
    } catch(err){
        res.status(400).json({message:'주문 목록 조회 실패'});
    }
};

// 주문 상세 조회
exports.getOrderById = async (req, res) => {
    try {
        const order = await orderService.getOrderById(req.getOrderById);
        if (!order) return res.status(404).json({ message: '주문을 찾을 수 없습니다.' });
        res.json(order);
    } catch(err) {
        res.status(500).json({ message: '주문 상세 조회 실패', error: err.message });
    }
};

// 주문 상태값 변경
exports.updateOrderStatus = async(req, res) => {
    try {
        const order = await orderService.updateOrderStatus(req.params.id, req.body.status)
        res.json({message : '주문 상태가 변경되었습니다.', order});
    } catch(err) {
        res.status(500).json({message: err.message});
    }
};

// 주문 취소
exports.cancelOrder = async (req, res) => {
    try {
        const order = await orderService.cancelOrder(req.params.id);
        res.json({message : '주문이 취소되었습니다.', order});
    } catch(err) {
        res.status(500).json({message : err.message});
    }
};

