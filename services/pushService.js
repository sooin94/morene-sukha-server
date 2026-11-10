const webpush = require('web-push');
const PushSubscription = require('../models/PushSubscription');
const User = require('../models/User');

webpush.setVapidDetails(
    process.env.VAPID_SUBJECT,
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
);

const sendPushToAdmins = async (payload) => {
    // 1. find Admins
    const admin = await User.find({
        isAdmin: true,
        isActive: true
    }).select('_id');
    console.log('Admin count:', admin.length);
    // 2. find Admins' subscription details
    const subscriptions = await PushSubscription.find({
        userId: { $in: admin.map(admin => admin._id) }
    });
    console.log('Subscription count:', subscriptions.length);
    // 3. send Push
    const results = await Promise.allSettled(
        subscriptions.map(async (subscription) => {
            try{
                return await webpush.sendNotification(
                    {
                        endpoint: subscription.endpoint,
                        keys: subscription.keys
                    },
                    JSON.stringify(payload)
                );
            }catch (error){
                if ([404,410].includes(error.statusCode)){
                    await PushSubcription.deleteOne({
                        _id: subscription._id
                    });
                }
                throw error;
            }
        })
    );
    return {
        total: subscriptions.length,
        sent: results.filter(r => r.status === 'fulfilled').length,
        failed: results.filter(r => r.status === 'rejected').length
    };
};

module.exports = { sendPushToAdmins }