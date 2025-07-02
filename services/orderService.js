const Order = require('../models/Order');
const Cart = require('../models/Cart');
exports.createOrder = async(userId) => {
    // 유저 장바구니 정보 가지고오기
    const cart = await Cart.findOne({userId}).populate('items.productId');
    if(!cart || cart.items.length === 0){
        throw new Error('장바구니가 비어있습니다.');
    }

    // 주문 항목 구성
    const orderItems = cart.items.map(items => ({
        productId : item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        quantity: item.quantity,
    }));
    
    const totalAmount = orderItems.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    // 주문 생성
    const newOrder = new Order({
        userId,
        items: orderItems,
        totalAmount,
        status: 'pending',
    });
    await newOrder.save();

    // 장바구니 비우기
    cart.items = [];
    await cart.save();

    return { message : '주문이 완료되었습니다.', order: newOrder };
};

exports.getMyOrders = async(userId) => {
    return await Order.find({userId}).sort({createAt: -1});
};

exports.getOrderById = async(userId, orderId) => {
    return await Order.findOne({_id : orderId, userId }).populate('items.productId')
};

exports.updateStatusPost = async(orderId, status) => {  
    const order = await Order.fineById(orderId);
    if(!order) throw new Error('주문을 찾을 수 없습니다.');

    order.status = status;
    await order.save();

    return order;
};

exports.cancelOrder = async (userId, orderId) => {
    const order = await Order.findOne({ _id: orderId, userId });
    if(!order) throw new Error ('주문 정보를 찾을 수 없습니다.');

    order.status = 'cancelled';
    await order.save();
    return order;
};