const Menu = require('../models/Menu');

exports.getAllMenus = async() => {
    return await Menu.find();
};

exports.getMenuById = async(id) => {
    return await Menu.findById(id);
};

exports.createMenu = async(menuData) => {
    const menu = new Menu(menuData);
    return await menu.save();
};

exports.updateMenu = async(id, updateData) => {
    return await Menu.findByIdAndUpdate(id, updateData, {new: true});
};

exports.deleteMenu = async(id) => {
    return await Menu.findByIdAndDelete(id);
};