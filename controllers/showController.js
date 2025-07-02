const showService = require('../services/showService');

exports.getAllShows = async(req, res) => {
    try {
        const shows = await showService.getAllShows(); 
        res.json(shows);
    }catch (err){
        res.status(500).json({message : '공연 목록 조회 실패'})
    }
}

exports.getShowById = async(req, res) => {
    try {
        const show = await showService.getShowById(req.params.id);
        if(!show) return res.status(404).json({message : '공연을 찾을 수 없습니다.'});
        res.json(show);
    } catch(err){
        res.status(500).json({message : '공연 상세 조회 실패'});
    }
}

exports.createShow = async(req, res) => {
    try {
        if(!req.user.isAdmin) return res.status(403).json({message : '관리자만 등록 가능합니다.'});
        const show = showService.createShow(req.body);
        res.status(201).json(show);
    }catch (err){
        res.status(500).json({ message : '공연 등록 실패'});
    }
}

exports.updateShow = async(req, res) => {
    try {
        if(!req.user.isAdmin) return res.status(403).json({message : '관리자만 수정 가능합니다.'});
        const show = showService.updateShow(req.params.id, req.body);
        if(!show) return res.status(403).json({message : '공연을 찾을 수 없습니다.'});
        res.json(show);
    }catch(err) {
        res.status(500).json({message : '공연 수정 실패'});
    }
}

exports.deleteShow = async(req, res) => {
    try {
        if(!req.user.isAdmin) return res.status(403).json({message : '관리자만 삭제할 수 있습니다.'});
        await showService.deleteShow(req.params.id);
        res.json({message : '공연 삭제 완료'});
    }catch (err) {
        res.status(500).json({message : '공연 삭제 실패'});
    }
}