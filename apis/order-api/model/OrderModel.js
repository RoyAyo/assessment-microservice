const { Schema, model, Types, Mongoose } = require('mongoose');

const orderSchema = new Schema({
    user_id : {
        type : Types.ObjectId,
        default : Mongoose.Types.ObjectId('601d1714ab5ea0388420590d')
    },
    cart : [
        {
            _id : false,
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