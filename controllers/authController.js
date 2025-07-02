const authService = require('../services/authService');

exports.register = async(req, res) => {
    try{
        const data = await authService.registerUser(req.body);
        res.status(201).json({message: '회원가입 성공', success: true, ...data});
    } catch(err){
        console.error(err);
    }
}

exports.login = async (req, res) => {
    try {
        const data = await authService.loginUser(req.body);
        res.status(200).json(data);
    } catch(err){
        console.error(err);
        res.status(401).json({message : err.message});
    }
}