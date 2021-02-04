const kafka = require('kafka-node');
require('dotenv').config()

const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient(process.env.KafkaClient)
const consumer = new Consumer(
    client,
    [{ topic: 'feed-service', partition: 0 }],
    {
      autoCommit: true,
      fetchMaxWaitMs: 1000,
      fetchMaxBytes: 1024 * 1024,
      encoding: 'utf8',
      fromOffset: false
    }
);

consumer.on('message',async (message) => {
    console.log('message');
});

consumer.on('error', function(err) {
    console.log('error', err);
});