const bodyParser = require("body-parser");
const express = require("express");
const cors = require('cors');
const morgan = require("morgan");
require('dotenv').config();

const { productModel } = require("./models/ProductModel");
// const {producer} = require('./utils/Kafka');

require('./utils/Database');
// require('./utils/Kafka');
const PORT = process.env.PORT || 8080;

const app = express();

//app middlewares
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.get('/',(req,res) => {
    console.log('product working');
    res.send('hello product')
});

//Keeping things simple without routes and controllers.
//{{URL}}:
app.get('/api/products',(req,res) => {
    try {
        
        productModel.find({}).then(products => {
            return res.json({
                success : true,
                data : products
            });
        })
        .catch(e => {
            return res.status(422).json({
                success : false,
                message : 'Unable to get products',
                error : e.message
            })
        });

    } catch (e) {
        return res.status(500).json({
            success : false,
            message : 'Internal Server error',
            error : e.message
        });
    }
});

//GET ONE PRODUCT BY ID
app.get('/api/product', (req,res) => {
    try {
        
        const id = req.body.id;

        if(id ===  undefined){
            return res.status(400).json({
                success : false,
                message : 'No Product Id to fetch provided',
                error : e.message
            })
        }

        productModel.findById(id).then(product => {
            if(!product){
                return res.status(400).json({
                    success : false,
                    message : 'Invalid id provided',
                    error : 'Invalid Id provided'
                });
            }
            
            return res.json({
                success : true,
                data : product
            });
        })
        .catch(e => {
            return res.status(422).json({
                success : false,
                message : 'Unable to get products',
                error : e.message
            });
        });
    }catch (e) {
        return res.status(500).json({
            success : false,
            message : 'Internal Server error',
            error : e.message
        });
    }
});


app.post('/add-to-cart',(req,res) => {
    try{
        const id = req.body.id;

        //ensure an id is sent to the body
        if(id ===  undefined){
            return res.status(400).json({
                success : false,
                message : 'No Product Id to fetch provided',
                error : e.message
            })
        }

        productModel.findById(id).then(product => {
            //ensure the id is valid
            if(!product){
                return res.status(400).json({
                    success : false,
                    message : 'Invalid id provided',
                    error : 'Invalid Id provided'
                });
            }

            //since there is no authentication here, simulate this to be user id 1, if you want, you can skip adding carts to database for not authenticated users
            const user_id = 1;

            //produce a kafka topic named 'add-to-cart'..
            // const payload = [{
            //     topic : 'product-service',
            //     messages : JSON.stringify({
            //         product,
            //         type : 'ADD-TO-CART',
            //         user_id
            //     })
            // }];

            // producer.send(payload,(err,data) => {
            //     //will be logging this
            //     console.log(err);
            // });

            return res.status(201).json({
                success: true,
                message : 'Added to cart'
            });
        })
    }catch(e){
        return res.status(500).json({
            success : false,
            message : 'Internal Server error',
            error : e.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`connected to port ${PORT}`);
});

module.exports.app = app;