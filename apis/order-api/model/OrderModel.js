const { Schema, model, Types } = require('mongoose');

const orderSchema = new Schema({
    user_id : {
        type : Types.ObjectId
    },
    cart : [
        {
            _id : false,
            type : Types.ObjectId,
            productName : String,
            productPrice : Number,
            quantity : {
                type : Number,
                default : 1
            }
        }
    ]
});

const orderModel = model('orders', orderSchema);

module.exports = {
    orderModel
};