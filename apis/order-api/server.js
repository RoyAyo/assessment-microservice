const bodyParser = require("body-parser");
const express = require("express");
const cors = require('cors');
const morgan = require("morgan");
require('dotenv').config();

require('./utils/Database');
// require('./utils/Kafka');

const {orderModel} = require('./model/OrderModel');

const PORT = process.env.PORT || 8080;

//app setup
const app = express();
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.get('/',(req,res) => {
    console.log('order working');
    res.send('hello order')
})

//endpoints
app.get('/carts/user/:id', (req,res) => {
    try {
        const user_id = req.params.id;

        //ensure to index user-id on the mongodb server for faster queries
        orderModel.findOne({user_id}).then(user => {
            //check if user has ever added to cart or if user cart is empty
            if(!user || user.cart.length === 0){
                return res.json({
                    success : true,
                    data : []
                });
            }
            
            return res.json({
                success : true,
                data : []
            });
        }).catch(e => {
            return res.status(422).json({
                success : false,
                message : 'Unable to Process request',
                error : e.message
            });    
        });
    } catch (e) {
        return res.status(500).json({
            success : false,
            message : 'Internal Server error',
            error : e.message
        });
    }
});

app.post('/order/user/:id', () => {
    const user_id = req.params.id;

    orderModel.findOne({user_id}).then(user => {
        //check if user has ever added to cart or if user cart is empty
        if(!user || user.checkOut.length === 0){
            return res.json({
                success : false,
                message : 'You cart is empty',
                error: 'Your cart needs to have at least one item'
            });
        }
        
        //send asynchronously to a payment service which sends to a shipment service if there is one to finalize which can send back to clear cart if successfull...
        
        //assume all is successful.
        user.cart = []
        user.save().then(d => {
            return res.status(201).json({
                success : true,
                msg : 'order finalized'
            });
        }).catch(e => {

        })

    }).catch(e => {
        return res.status(422).json({
            success : false,
            message : 'Unable to Process request',
            error : e.message
        });    
    });
});

app.listen(PORT, () => {
    console.log(`connected to port ${PORT}`);
});

module.exports.app = app;