const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    imageUrl: String,
    category: String,
    isAvailable: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Menu', menuSchema);