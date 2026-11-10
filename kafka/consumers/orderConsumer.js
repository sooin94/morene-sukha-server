 
 const consumer = kafka.consumer({
    groupId: 'bar-service'
 });

 async function startOrderConsumer() {
    await consumer.connect();

    await consumer.subscribe({
        topic: 'order-events',
        fromBeginning: false
    });

    await consumer.run({
        eachMessage: async ({message}) => {
            const event = JSON.parse(message.value.toString());
            if(event.eventType === 'OrderCreated') {
                console.log('New cocktail order: ', event.orderId);
            }
        }
    })
 }

 module.exports = {startOrderConsumer};