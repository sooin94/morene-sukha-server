const mongoose = require('mongoose');

const merchOrderItemSchema = new mongoose.Schema({
    merchId: { type : mongoose.Schema.Types.ObjectId, ref: 'Merch'},
    name: String,
    price: Number,
    quantity: Number
});

const shippingAddressSchema = new mongoose.Schema({
    name: String,
    phone: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    postalCode: String
});

const merchOrderSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    items: [merchOrderItemSchema],
    shippingAddress: shippingAddressSchema,
    memo: String,
    totalAmount: Number,
    status: {
        type: String,
        enum: ['pending', 'paid', 'shipped', 'cancelled'],
        default: 'pending'
    },
    createdAt: {type, Date, default: Date.now}

});

module.exports = mongoose.model('MerchOrder', merchOrderSchema);