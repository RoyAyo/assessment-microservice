const kafka = require('kafka-node');
const producer = require('../../products-api/utils/Kafka');
const {orderModel} = require('../model/OrderModel');
require('dotenv').config()


const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient(process.env.KafkaClient)
const consumer = new Consumer(
    client,
    [{ topic: 'product-service' }],
    {
      autoCommit: true,
      fetchMaxWaitMs: 1000,
      fetchMaxBytes: 1024 * 1024,
      encoding: 'utf8',
      fromOffset: false
    }
);

consumer.on('message',async (message) => {
    console.log(message);

    const data = JSON.parse(message.value);
    
    const user_id = data.user_id;

    if(data.type === 'ADD-TO-CART'){
        orderModel.findOne({user_id}).then(user => {
            if(!user){
                const newOrder = {
                    cart : [data.product]
                };
                const order = new orderModel(newOrder)
                return order.save().catch(e => {
                    console.log(e.message);
                });
            }
            user.cart = user.cart.push(product);
            
            order.save().catch(e => {
                console.log(e.message);
            });

        }).catch(e => {
		console.log(e.message);
	});
    }
});

consumer.on('error', function(err) {
    console.log('error', err);
});

module.exports.producer = producer;
