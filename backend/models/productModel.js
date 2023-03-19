const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please Enter service provided"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please enter service Description"]
    },
    price:{
        type:Number,
        required:[true,"Please Enter Service Price"],
        maxlength:[8, "Price cannot exceed 8 characters"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
        {
        public_id:{
            type:String,
            required:true
        },
      url:{
          type:String,
          required:true
      }
    }
],
    category:{
        type:String,
        required:[true,"Please Enter Service Category"],

    },
    Stock:{
        type:Number,
        required:[true,"Please Enter How Many People Are Available For This Service"],
        maxlength:[40,"Number of people cannot exceed 40"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true,
            },
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                required:true,
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],

    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("product", productSchema);