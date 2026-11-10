const Order = require('../models/Order');
const Cart = require('../models/Cart');
exports.createOrder = async(userId) => {
    // 유저 장바구니 정보 가지고오기
    const cart = await Cart.findOne({userId}).populate('items.productId');
    if(!cart || cart.items.length === 0){
        throw new Error('장바구니가 비어있습니다.');
    }
    const orderUid = `order_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    // 주문 항목 구성
    const orderItems = cart.items.map(items => ({
        productId : items.productId._id,
        name: items.productId.name,
        price: items.productId.price,
        quantity: items.quantity,
    }));
    
    const totalAmount = orderItems.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );
    console.log("total Amount : ", totalAmount);
    // 주문 생성
    const newOrder = new Order({
        userId,
        orderUid,
        items: orderItems,
        totalAmount,
        status: "created",
        isPaid: false,
        deleted: false,
    });
    await newOrder.save();

    // 장바구니 비우기
    cart.items = [];
    await cart.save();

    // 5) 클라에 내려주기 (결제창 열 때 필요)
    return newOrder;
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