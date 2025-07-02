const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// POST : User Registration
router.post('/register', async (req, res) => {
    try {
        const {name, email, phone, password} = req.body;
        const existingUser = await User.findOne({ email });
        
        // 이메일 중복 확인
        if (existingUser) {
            return res.status(400).json({ error : '이미 가입된 이메일입니다.'});
        }
        // 새 유저 등록
        const newUser = new User({ name, email, phone, password });
        await newUser.save();
        // JWT 토큰 생성
        const token = jwt.sign({ userId: newUser._id, isAdmin: newUser.isAdmin },
            process.env.JWT_SECRET || 'secretkey',
            { expiresIn: '2h' }
        );

        res.status(201).json({
            message : '회원가입 성공',
            success: true,
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone,
                isAdmin: newUser.isAdmin
            }   
        });
    }catch (err) {
        console.error(err);
        res.status(500).json({ error: '서버 오류 다시 시도하세요.' });
    };
});

// POST : User Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // 사용자 확인
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({message : '이메일이 존재하지 않습니다.'});
        
        // 비밀번호 비교
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(401).json({message : '비밀번호가 다릅니다.'});

        // JWT 토큰 생성
        const token = jwt.sign({ id : user._id, isAdmin: user.isAdmin}, 
            process.env.JWT_SECRET,
            { expiresIn:'1h' });

        // 응답
        res.status(200).json({
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                isAdmin: user.isAdmin,
            }
        });
    } catch (err) {
        console.error('로그인 오류 : ', err);
        res.status(500).json({ message : '서버오류'});
    }
});

module.exports = router;