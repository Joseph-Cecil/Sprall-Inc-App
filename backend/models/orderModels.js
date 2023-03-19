const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
    deliveryInfo: {
        area: { type: String, required: true },

        streetName: { type: String, required: true },

        houseNum: { type: String, required: true },

phoneNo:{
    type: Number,
    required: true,
  },
},
orderItems:[
    {
        name:{
            type:String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        product: {
            type: mongoose.Schema.ObjectId,
            ref:"Product",
            required: true,
        },
    },
],
user:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true,
},
itemsPrice:{
    type: Number,
    default:0
},
DeliveryPrice:{
    type:Number,
    default:0
},
totalPrice:{
    type:Number,
    default:0
},
orderStatus:{
    type:String,
    required:true,
    default:"Processing...",
},
deliveredAt: Date,
createdAt:{
    type:Date,
    default:Date.now,
}
});

module.exports = mongoose.model("Order", orderSchema);