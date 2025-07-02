const merchService = require('../services/merchService');

exports.getAllMerch = async(req, res) => {
    try {
        const result = await merchService.getAllMerch();
        res.json(result);
    }catch (err){
        res.status(500).json({message : '굿즈 목록 조회 실패'});
    }
};

exports.getMerchById = async(req, res) => {
    try {
        const result = await merchService.getMerchById(req.params.id);
        if(!result) return res.status(404).json({message : '굿즈 없음'});
        res.json(result);
    } catch(err) {
        res.status(500).json({message : '굿즈 상세 조회 실패'});
    }
};

exports.createMerch = async(req, res) => {
    try {   
        if(!req.user.isAdmin) return res.status(403).json({message : '관리자만 추가가 가능합니다.'});
        const result = await merchService.createMerch(req.body);
        res.status(201).json(result);
    } catch(err) {
        res.status(500).json({message : '굿즈 등록 실패'});
    }
};

exports.updateMerch = async(req, res) => {
    try {
        if(!req.user.isAmind) return res.status(403).json({message : '관리자만 수정 가능합니다.'});
        const result = await merchService.updateMerch(req.params.id, req.body);
        if(!result) return res.status(404).json({message : '굿즈 없음'});
        res.json(result);
    }catch (err) {
        res.status(500).json({message : '굿즈 수정 실패'});
    }
};

exports.deleteMerch = async(req, res) => {
    try {
        if(!req.user.isAdmin) return res.status(403).json({message : '관리자만 삭제 가능합니다.'});
        await merchService.deleteMerch(req.params.id);
        res.json({message : '굿즈 삭제 완료'});
    }catch (err){
        res.status(500).json({message  : '굿즈 삭제 실패'});
    }
};