const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name : {type : String},
    email : {type : String, unique : true, required : true},
    phone : {type : String, unique : true, required : true},
    password : {type : String, required : true},
    createdAt:  { type: Date, default: Date.now },
    updatedAt:  { type: Date, default: Date.now },
    lastLogin: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    isAdmin: { type: Boolean, default: false }
});

// 비밀번호 암호화
userSchema.pre('save', async function (next){
    if( !this.isModified('password') ) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// 비밀번호 비교 메소드
userSchema.methods.comparePassword = async function (inputPassword) {
    return bcrypt.compare(inputPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);