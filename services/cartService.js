const Cart = require('../models/Cart');

exports.getCart = async(userId) => {
    const cart = await Cart.findOne({userId}).populate('items.productId');
    return cart || { items: [] };
}

exports.addToCart = async(userId, productId, quantity) => {
    let cart = await Cart.findOne({userId});
    console.log('product Id : ', productId)
    if(!cart) {
        cart = new Cart({userId, items: [{productId, quantity}]});
    } else{
        const existingItem = cart.items.find((item) => item.productId.equals(productId));
        if(existingItem) {
            existingItem.quantity += quantity;
        } else{
            cart.items.push({productId, quantity});
        }
    }
    
    await cart.save();
    const populatedCart = await Cart.findById(cart._id).populate('items.productId');
    return populatedCart;
}

exports.updateQuantity = async(userId, productId, quantity) => {
    const cart = await Cart.findOne({userId});
    if(!cart) throw new Error('장바구니 없음');
    
    const item = cart.items.find(item => item.productId.equals(productId));
    if(!item) throw new Error('아이템 없음');

    item.quantity = quantity;
    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate('items.productId');
    return populatedCart;     
}

exports.removeItem = async(userId, productId) => {
    const cart = await Cart.findOne({userId});
    console.log('productId: ', productId);
    console.log('cart : ',cart);
    if(!cart) new Error ('삭제할 항목이 없습니다.');
    
    cart.items = cart.items.filter(item => !item.productId.equals(productId));
    await cart.save();
    
    const populatedCart = await Cart.findById(cart._id).populate('items.productId');
    return populatedCart;
}

exports.clearCart = async(userId) => {
    const cart = await Cart.findOne({userId});
    if(!cart) new Error('장바구니 없음');

    cart.items = [];
    await cart.save();

    return cart;
}