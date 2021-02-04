const { Schema, model, Types } = require('mongoose');

const orderSchema = new Schema({
    user_id : {
        type : Types.ObjectId
    },
    checkOut : [
        {
            _id : false,
            productName : String,
            productPrice : Number,
            quantity : Number
        }
    ]
});

const orderModel = model('orders', orderSchema);

module.exports = {
    orderModel
};