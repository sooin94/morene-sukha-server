const cartService = require('../services/cartService');

exports.getCart = async(req, res) => {
    try {
        const cart = await cartService.getCart(req.user.id);
        res.status(200).json(cart);
    }catch (err) {  
        res.status(400).json({message : '장바구니 목록 조회 실패'});
    }
}
exports.addToCart = async(req, res) => {
    try {
        const cart = await cartService.addToCart(req.user.id, req.body.productId, req.body.quantity);
        res.status(200).json({message : '장바구니 저장 완료', cart});
    }catch (err) {
        res.status(500).json({message : err.message});
    }
}
exports.updateQuantity = async(req, res) => {
    console.log("req: ", req.params.productId);
    try {
        const cart = await cartService.updateQuantity(req.user.id, req.params.productId, req.body.quantity);
        res.status(200).json(cart)
    }catch (err) {
        res.status(404).json({message : err.message});        
    }
}
exports.removeItem = async(req, res) => {
    try {
        const cart = await cartService.removeItem(req.user.id, req.params.productId);
        res.status(200).json({message : '항목이 삭제되었습니다.', cart});
    }catch (err) {
        res.status(404).json({message : err.message});
    }
}
exports.clearCart = async(req, res) => {
    try {
        await cartService.clearCart(req.user.id);
        res.status(200).json({message : '장바구니가 비워졌습니다.'});
    }catch (err) {
        res.status(404).json({message : err.message});
    }
}

