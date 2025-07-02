const Show = require('../models/Show');

exports.getAllShows = async() => {
    return await Show.find().sort({date:1, time:1});
}

exports.getShowById = async(id) => {
    return await Show.findById(id);
}

exports.createShow = async(showData) => {
    const show = new Show(showData);
    return await show.sava();
}

exports.updateShow = async(id, updateData) => {
    return await Show.findByIdAndUpdate(id, updateData, {new : true});
}

exports.deleteShow = async(id) => {
    return await Show.findByIdAndDelete(id);
}