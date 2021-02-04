const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    productName : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    category : {
        type : String
    },
    numberPurchased :{
        type : Number,
        default:0
    }
});

const productModel = model('products', productSchema);

module.exports = {
    productModel
};