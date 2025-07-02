const mongoose = require('mongoose');

const merchCartItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Merch' },
    quantity: Number
});

const merchCartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [merchCartItemSchema]
});

module.exports = mongoose.model('MerchCart', merchCartSchema);
