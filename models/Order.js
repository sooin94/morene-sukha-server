const mongoose = require('mongoose');   
const { create } = require('./Menu');

const orderItemSchema = new mongoose.Schema({
    productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Menu'},
    name: String,
    price: Number,
    quantity: Number,
})
const orderSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref:'User', require: true},
    orderUid: { type: String, required: true, unique: true },
    items: [orderItemSchema],
    totalAmount: Number,
    status:{ 
        type: String, 
        enum: [,'created','pending','confirmed','processing','completed','cancelled'],
        default : 'created'
    },
    isPaid: {type: Boolean, defaul: false},
    createAt: { type: Date, default: Date.now },
    deleted: {type: Boolean, defaul: false},
});


module.exports = mongoose.model('Order', orderSchema);