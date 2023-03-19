const Order = require("../models/orderModels");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { update } = require("../models/orderModels");

// Create New Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        deliveryInfo,
        orderItems,
        itemsPrice,
        DeliveryPrice,
        totalPrice,
    } = req.body;


    const order = await Order.create({
        deliveryInfo,
        orderItems,
        itemsPrice,
        DeliveryPrice,
        totalPrice,
        user: req.user._id,
    });

    res.status(201).json({
        success: true,
        order,
    });
});


// Get Single Order
exports.getSingleOrder = catchAsyncErrors(async(req, res, next) =>{

    const order = await Order.findById(req.params.id).populate("user", "name email");

    if(!order){
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    res.status(200).json({
        success: true,
        order,
    });
});


// Get logged in User Orders
exports.myOrders = catchAsyncErrors(async(req, res, next) =>{

    const orders = await Order.find({user:req.user._id});


    res.status(200).json({
        success: true,
        orders,
    });
});


// Get All Orders --Admin
exports.getAllOrders = catchAsyncErrors(async(req, res, next) =>{

    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order) =>{
        totalAmount += order.totalPrice;
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    });
});

// Update Order Status --Admin
exports.updateOrder = catchAsyncErrors(async(req, res, next) =>{

    const order = await Order.findById(req.params.id);

    
    if(!order){
        return next(new ErrorHandler("Order not found with this Id", 404));
    }


    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandler("You have already delivered this order",400));
    }
    
    order.orderItems.forEach(async(o) => {
        await updateStock(o.Product,o.quantity);
    });

    order.orderStatus =req.body.status;

    if(req.body.status === "Delivered"){
        // Please come back and check here the deliverd date nu
        order.deliveredAt = Date.now();
    }

    await order.save({validateBeforeSave: false});

    res.status(200).json({
        success: true,
    });
});


async function updateStock(id,quantity){
    const product = await Product.findById(id);

    product.Stock-=quantity;

   await product.save({ validateBeforeSave: false})
}

// Delete Order --Admin
exports.deleteOrder = catchAsyncErrors(async(req, res, next) =>{

    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    await order.remove();
    
    res.status(200).json({
        success: true,
    });
});