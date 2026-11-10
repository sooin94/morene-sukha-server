const mongoose = require('mongoose');

const pushSubscriptionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true,
            index: true,
        },

        endpoint: {
            type: String,
            require: true,
            unique: true
        },
        keys: {
            p256dh: {
                type: String,
                require: true
            },
            auth: {
                type: String,
                required: true
            }
        }
    },
    { timestamps: true}
);

module.exports = mongoose.model(
    'PushSubscription',
    pushSubscriptionSchema
);