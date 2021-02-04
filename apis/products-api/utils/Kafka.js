const kafka = require('kafka-node');
require('dotenv').config()

const Producer = kafka.Producer;
const client = new kafka.KafkaClient(process.env.KafkaClient)
const producer = new Producer(client);

console.log('I dey here')

producer.on('ready', () => {
    console.log('producer ready successfully');
});

producer.on('error', function(err) {
    console.log(err);
    //probably log it to a file somewhere or a monitoring tool
});

module.exports.producer = producer;