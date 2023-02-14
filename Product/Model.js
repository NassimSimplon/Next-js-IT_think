//MONGOOSE
const mongoose = require('mongoose');
//SCHEMA
const Schema = mongoose.Schema;
//MODEL
module.exports = mongoose.model('products',new Schema({
    productName:{
        type:String,
        required:true
    },
    cost:{
        type:Number,
        required:true,
        default:0
    },
    amountAvailable:{
        type:Number,
        required:true,
        default:0
    },
    sellerld:{
        type:String,
        required:true
    }
}));