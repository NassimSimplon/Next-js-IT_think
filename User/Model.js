//MONGOOSE
const mongoose = require("mongoose");
//SCHEMA
const Schema = mongoose.Schema;
//MODEL
module.exports = mongoose.model(
  "users",
  new Schema({
    username: {
      type: String,
      unique: true,
      required: true,
    },
    deposit: {
      type: Number, 
      default:0
    },

    password: {
      type: String,
      required: true,
    },

    productsPurchased: [
      {
        _id:{
          type: String
        },
        productName: {
          type: String,
        },
        cost: {
          type: Number,
        },
        Quantity: {
          type: Number,
        },
        sellerld: {
          type: String,
        },
      },
    ],
    connected: {
      type: Boolean, 
      default: false
    },
    role: {
      type: String,
      enum: ["buyer", "seller"],
      required: true
    },
  })
);
