// server.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const app = express();


app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ DB 연결 성공'))
  .catch((err) => console.error('❌ 연결 실패', err));

app.get('/', (req, res) => {
  res.send('morene-sukha API 서버 작동 중!');
});

app.listen(4000, () => {
  console.log('🚀 서버 실행 중: http://localhost:4000');
});

const menuRoutes = require('./routes/menuRoutes');
app.use('/api/menus', menuRoutes);

const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);

const showRoutes = require('./routes/showRoutes');
app.use('/api/shows', showRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/user', userRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const cartRoutes = require('./routes/cartRoutes');
app.use('/api/cart', cartRoutes);

const merchRoutes = require('./routes/merchRoutes');
app.use('./api/merch', merchRoutes);

const merchOrderRoutes = require('./routes/merchOrderRoutes');
app.use('./api/merchOrder', merchOrderRoutes);

const merchCartRoutes = require('./routes/merchCartRoutes');
app.use('./api/merchCart', merchCartRoutes);

const bookingRoutes = require('./routes/bookingRoutes');
app.use('./api/booking', bookingRoutes);

const paymentRoutes = require('./routes/paymentRoutes');
app.use('/api/pay', paymentRoutes);

const pushRoutes = require('./routes/pushRoutes');
app.use('/api/push', pushRoutes);