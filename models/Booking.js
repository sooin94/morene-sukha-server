const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref : 'User'},
    showId: {type: mongoose.Schema.Types.ObjectId, res : 'Show'},
    quantity: {type: Number, required: true, min: 1},
    status: {
        type : String,
        enum : ['reserved', 'cancelled'],
        default : 'reserved'
    },
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Booking', bookingSchema);