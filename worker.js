require('dotenv').config();

const {
  startOrderConsumer
} = require('./kafka/consumers/orderConsumer');

async function start() {
  await startOrderConsumer();
  console.log('Kafka worker started');
}

start().catch((error) => {
  console.error('Worker failed:', error);
  process.exit(1);
});