const mongoose = require('mongoose');

const merchSchema = new mongoose.Schema({
    name: {type : String, require: true},
    price: {type: Number, require: true},
    description: String,
    imageUrl: String,
    stock: {type : Number, default : 0},
    category: String,
    isAvailable: {type : Boolean, default: true},
    createAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Merch', merchSchema);