const menuService = require('../services/menuService');

exports.getAllMenus = async(req, res) => {
    try {
        const menus = await menuService.getAllMenus();
        res.json(menus);
    }catch (err) {
        res.status(500).json({message : '메뉴 조회 실패'});
    }
};

exports.getMenuById = async (req, res) =>{
    try {
        const menu = await menuService.getMenuById(req.params.id);
        if(!menu) return res.status(404).json({message : '메뉴를 찾을 수 없습니다.'});
        res.json(menu);
    } catch (err) {
        res.status(500).json({message : '메뉴 상세 조회 실패'});
    }
};

exports.createMenu = async(req, res) => {
    try {
        if(!req.user.isAdmin) return res.status(403).json({message : '관리자만 등록 가능합니다.'});
        const menu = await menuService.createMenu(req.body);
        res.status(201).json(menu);
    }catch (err) {
        res.status(500).json({message : '메뉴 등록 실패'});
    }
};

exports.updateMenu = async (req, res) => {
    try {
        if(!req.user.isAdmin) return res.status(403).json({message : '관리자만 수정 가능합니다.'});
        const menu = await menuService.updateMenu(req.params.id, req.body);
        if(!menu) return res.status(404).json({message : '메뉴를 찾을 수 없습니다.'});
        res.json(menu);
    }catch(err) {
        res.status(500).json({ message: '메뉴 수정 실패' });
    }
}

exports.deleteMenu = async(req, res) => {
    try {
        if(!req.user.isAdmin) return res.status(403).json({message : '관리자만 삭제 가능합니다.'});
        await menuService.deleteMenu(req.params.id);
        res.json({message : '메뉴 삭제 완료'});
    }catch(err) {
        res.status(500).json({message : '메뉴 삭제 실패'});
    }
}