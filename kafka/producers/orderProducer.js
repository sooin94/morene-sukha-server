const kafka = require('../kafkaClient');

const producer = kafka.producer();

async function connectProducer() {
    await producer.connect();
}

async function publishOrderCreated(order){
    await producer.send({
        topic: 'order-events',
        acks: -1, // acks = all
        message: [
            {
                key: String(order._id),
                value: JSON.stringify({
                    eventType: 'OrderCreated',
                    orderId: String(order._id),
                    items: order.items
                })
            }
        ]
    })
}

module.exports = {
    connectProducer,
    publishOrderCreated
}