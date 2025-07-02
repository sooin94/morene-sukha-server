const merchOrderService = require('../services/merchOrderService');

exports.createMerchOrder = async(req, res) => {
    try {
        const { shippingAddress, memo } = req.body;
        const order = await merchOrderService.createMerchOrder(req.user.id, shippingAddress, memo);
        res.status(201).json({message : '굿즈 주문 완료', order});
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
}

exports.getMyMerchOrders = async(req, res) => {
    try {
        const orders = await merchOrderService.getMyMerchOrders(req.user.id);
        res.json(orders);
    } catch(err) {
        res.status(500).json({ message: '주문 목록 조회 실패' });
    }
}

exports.getMerchOrderById = async(req, res) => {
    try {
        const order = await merchOrderService.getMerchOrderById(req.params.id, req.user.id);
        if(!order) return res.status(404).json({message : '주문 내역 없음'});
        res.json(order);
    } catch(err) { 
        res.status(500).json({ message: '주문 상세 조회 실패' });
    }
}

exports.cancelMerchOrder = async(req, res) => {
    try {
        const order = await merchOrderService.cancelMerchOrder(req.params.id, req.user.id);
        if(!order) return res.status(404).json({message : '주문을 찾을 수 없습니다.'});

        res.json({message : '주문이 취소되었습니다.', order});
    }catch (err) {
        res.status(500).json({message: err.message});
    }
}
