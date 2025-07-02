const Merch = require('../models/Merch');
const MerchOrder = require('../models/MerchOrder');
const MerchCart = require('../models/MerchCart');

exports.createMerchOrder = async(userId, shippingAddress, memo) => {
    const cart = await MerchCart.findOne({userId}).populate('items.productId');
    if(!cart || cart.items.length === 0) throw new Error('장바구니가 비어있습니다.');
    
    const orderItems = [];
    for(const item of cart.items){
        const product = await Merch.findById(item.productId._id);
        if(!product || !product.isAvailable) throw new Error(`${product?.name} 구매 불가`);
        if(product.stock < item.quantity) throw new Error(`${product?.name} 재고 부족`);
        product.stock -= item.quantity;
        await product.save();

        orderItems.push({
            merchId: product._id,
            name: product.name,
            price: product.price,
            quantity: name.quantity
        });
    }
    const totalAmount = orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0 );
    const order = new MerchOrder({
        userId,
        items: orderItems,
        shippingAddress,
        memo,
        totalAmount
    });
    await order.save();
    cart.items = [];
    await cart.save();
    return order;
}

exports.getMyMerchOrders = async(userId) => {
    return await MerchOrder.find({userId}).sort({createdAt : -1});
}

exports.getMerchOrderById = async(id, userId) => {
    return await MerchOrder.findOne({_id: id, userId});
}

exports.cancelMerchOrder = async(id, userId) => {
    const order = await MerchOrder.findOne({_id : id, userId});
    if(!order) throw new Error('주문을 찾을 수 없습니다.');

    if(order.status === 'cancelled') throw new Error('이미 취소된 주문입니다.');
    if(order.status === 'shipped') throw new Error('이미 배송된 주문은 취소할 수 없습니다.');

    order.status = 'canceled';
    await order.save();
    return order;
}