//MONGOOSE
const mongoose = require('mongoose');
//SCHEMA
const Schema = mongoose.Schema;
//MODEL
module.exports = mongoose.model('products',new Schema({
    productName:{
        type:String
        
    },
    amountAvailable:{
        type:Number,
        
        default:0
    },
    cost:{
        type:Number,
        
        default:0
    },
    sellerld:{
        type:String,
        
    } 
}));