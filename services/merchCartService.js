const MerchCart = require('../models/MerchCart');

exports.getCart = async (userId) => {
    const cart = await MerchCart.findOne({userId}).populate('items.productId');
    return cart || {items: []};
}

exports.addToCart = async(userId, productId, quantity) => {
    let cart = await MerchCart.findOne({userId});
    if(!cart) {
        cart = new MerchCart({ userId, items: [{productId, quantity}] });
    } else {
        const item = cart.items.find(i=> i.productId.equals(productId));
        if(item) {
            item.quantity += quantity;
        }else {
            cart.items.push({productId, quantity})
        }
    }
    await cart.save();
    return await MerchCart.findById(cart._id).populate('items.productId');
};

exports.updateQuantity = async(userId, productId, quantity) => {
    const cart = await MerchCart.findOne({userId});
    const item = cart.items.find(i => i.productId.equals(productId));
    if(!item) throw new Error('상품이 장바구니에 없습니다.');
    item.quantity = quantity;
    await cart.save();
    return await MerchCart.findById(cart._id).populate('items.productId');
};

exports.removeItem = async(userId, productId) => {
    const cart = await MerchCart.findOne({userId});
    cart.items = cart.items.filter(i => !i.productId.equals(productId));
    await cart.save();
    return await MerchCart.findById(cart._id).populate('items.productId');
};

exports.clearCart = async(userId) => {
    const cart = await MerchCart.findOne({userId});
    cart.items = [];
    await cart.save();
}