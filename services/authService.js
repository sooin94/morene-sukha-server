const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.registerUser = async({name, email, phone, password}) => {
    const existingUser = await User.findOne({ email });
    
    // 이메일 중복 확인
    if (existingUser) {
        throw new Error('이미 가입된 이메일입니다.');
    }
    // 새 유저 등록
    const newUser = new User({ name, email, phone, password });
    await newUser.save();
    // JWT 토큰 생성
    const token = jwt.sign({ userId: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET || 'secretkey',
        { expiresIn: '2h' }
    );

    return {
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
    };
};

// POST : User Login
exports.loginUser = async ({email, password}) => {
    // 사용자 확인
    const user = await User.findOne({email});
    if(!user) throw new Error('이메일이 존재하지 않습니다.');
    
    // 비밀번호 비교
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw new Error('비밀번호가 다릅니다.');

    // JWT 토큰 생성
    const token = jwt.sign({ id : user._id, isAdmin: user.isAdmin}, 
        process.env.JWT_SECRET,
        { expiresIn:'1h' });

    // 응답
    return {
        token,
        user:{
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin,
        }
    };
};

