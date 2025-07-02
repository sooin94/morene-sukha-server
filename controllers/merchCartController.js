const merchCartService = require('../services/merchCartService');

exports.getCart = async(req, res) => {
    try {
        const cart = await merchCartService.getCart(req.user.id);
        res.json(cart);
    }catch(err){
        res.status(500).json({ message: '장바구니 조회 실패' });
    }
}
exports.addToCart = async(req, res) => {
    try {
        const { productId, quantity } = req.body;
        const cart = await merchCartService.addToCart(req.user.id, productId, quantity);
        res.status(200).json(cart);
    }catch(err){
        res.status(500).json({ message: '장바구니 추가 실패' });
    }
}
exports.updateQuantity = async(req, res) => {
    try {
        const {productId} = req.params;
        const {quantity} = req.body;
        const cart = await merchCartService.updateQuantity(req.user.id, productId, quantity);
        res.json(cart);
    }catch(err){
        res.status(500).json({ message: err.message });
    }
}
exports.removeItem = async(req, res) => {
    try {
        const {productId} = req.params;
        const cart = await merchCartService.removeItem(req.user.id, productId);
        res.json(cart);
    }catch(err){
        res.status(500).json({ message: err.message });
    }
}
exports.clearCart = async(req, res) => {
    try {
        await merchCartService.clearCart(req.user.id);
        res.json({message : '장바구니 비움 완료'});
    }catch(err){
        res.status(500).json({ message: err.message });
    }
}