const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');
const PushSubscription = require('../models/PushSubscription');

// login + isAdmin
router.use(authMiddleware, isAdmin);

// VAPID public key
router.get('/public-key',(req, res)=> {
    res.json({
        publicKey: process.env.VAPID_PUBLIC_KEY
    });
});

router.post('/subscribe', async (req,res,next) =>{
    try{
        const { endpoint, keys } = req.body;

        if(
            typeof endpoint !== 'string' ||
            !endpoint.startsWith('https://') ||
            typeof keys?.p256dh !== 'string' ||
            typeof keys?.auth !== 'string'
        ) {
            return res.status(400).json({
                message: 'Invalid subscription'
            });
        }
        await PushSubscription.findOneAndUpdate(
            { endpoint },
            {
                userId: req.user.id,
                endpoint,
                keys
            },
            {
                upsert: true,
                new: true,
                runValidators: true
            }
        );
        res.json({
            message: 'Push subscription saved'
        });
    } catch(error) {
        console.error('PUSH SUBSCRIPTION ERROR:', {
            name: error.name,
            message: error.message,
            code: error.code
        });

        res.status(500).json({
            message: 'Failed to save push subscription'
        });
    }
});

const { sendPushToAdmins } = require('../services/pushService');

router.post('/test', async (req, res) => {
    try {
        console.log('TEST PUSH START');
        const result = await sendPushToAdmins({
            title: '🍸 Morene Sukha',
            body: '새로운 주문이 들어왔습니다!',
            url: '/admin/orders'
        });
        console.log('TEST PUSH RESULT:', result);
        res.json(result);
    } catch (error) {
        console.error('TEST PUSH ERROR:', error);

        res.status(500).json({
        message: 'Failed to send test notification'
        });
    }
});

module.exports = router;