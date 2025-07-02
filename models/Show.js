const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
    title: String,
    date: Date,
    time: String,
    artist: String,
    description: String,
    posterUrl: String,
    maxCapacity: {type : Number, required: true},
});

module.exports = mongoose.model('Show', showSchema);

