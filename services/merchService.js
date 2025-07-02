const Merch = require('../models/Merch');

exports.getAllMerch = async () => {
    return await Merch.find();
};

exports.getMerchById = async(id) => {
    return await Merch.findById(id);
}

exports.createMerch = async(merchData) => {
    const merch = new Merch(merchData); 
    return await merch.save();
}

exports.updateMerch = async(id, updateData) => {
    return await Merch.findByIdAndUpdate(id, updateData, {new : true});
};

exports.deleteMerch = async(id) => {
    return await Merch.findByIdAndDelete(id);
}