const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken= require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

// Register a User
exports.registerUser = catchAsyncErrors( async(req,res,next)=>{
    console.log("working")

    // const myCloud = await cloudinary.v2.uploader.upload( req.body.avatar, {
    //     folder: "avatars",
    //     width:150,
    //     crop: "scale",
    // });
    console.log("working2")
    
    const {name,email,password} = req.body;
    console.log("working3")
    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:"smaple Id",
            url:"sample_url",
        }
    });


    sendToken(user,201,res);

});


// login User
exports.loginUser = catchAsyncErrors (async (req,res,next)=>{


    const {email,password} = req.body;

    //checking if user has given password and email both

    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email & Password",400));
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid email or password",401));
    }

    const isPasswordMatched = user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401));
    }

   sendToken(user,200,res);
    
});

//logout User
exports.logout = catchAsyncErrors(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    });

    res.status(200).json({
        success:true,
        message:"Logged Out"
    });
});

 //Forgot Password 
 exports.forgotPassword = catchAsyncErrors(async (req, res, next)=>{

    const user = await User.findOne({ email: req.body.email});

    if(!user){
        return next(new ErrorHandler("User with this Email does not Exist", 404));
    }

    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get(
        "host"
        )}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n  ${resetPasswordUrl} \n\n If you have not requested this email please ignore `;


    try {
        await sendEmail({
            email:user.email,
            subject: `Services Password Recovery`,
            message,
        });
        
        res.status(200).json({
            success:true,
            message: `Email has been sent to ${user.email} successfully`,
        });

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
    }
 });

 //Reset password
 exports.resetPassword = catchAsyncErrors(async (req, res, next)=>{

    // Creating token Hash
    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now() },
    });

    if(!user){
        return next(new ErrorHandler("Reset Password Token is Either Invalid or Has Expired", 400));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match", 400));
    }


    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire= undefined;

    await user.save();
    sendToken(user,200,res);
 })

 // Get User Details
 exports.getUserDetails = catchAsyncErrors(async(req,res,next)=>{
const user = await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user,

    });
 });

 // Update User Password
 exports.updatePassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select("+password");


    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched) {
        return next(new ErrorHandler("Old Password is Incorrect", 400))
    }

    if(req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400));

    }

    user.password = req.body.newPassword

    await user.save();

 sendToken(user,200,res); 
     });



     // Update User Profile
 exports.updateProfile = catchAsyncErrors(async(req,res,next)=>{
   const newUserData={
       name:req.body.name,
       email:req.body.email,
   }

   // I will add cloudinary later as time goes on
   const user = await User.findByIdAndUpdate(req.user.id, newUserData,{
       new: true,
       findValidators: true,
       useFindAndModify: false,
   });

    res.status(200).json({
        success:true,
    });
     });

     //Get all users (admin)
     exports.getAllUser = catchAsyncErrors(async (req, res, next)=>{

        const users = await User.find();

        res.status(200).json({
            success: true,
            users,
        });
     });

     //Get single user(admin)
     exports.getSingleUser = catchAsyncErrors(async (req, res, next)=>{

        const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`))
    }

        res.status(200).json({
            success: true,
            user,
        });
     });

      // Update User Role -- Admin
 exports.updateUserRole = catchAsyncErrors(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,
        role: req.body.role,
    };
    
    
    const user = await User.findByIdAndUpdate(req.user.params, newUserData,{
        new: true,
        findValidators: true,
        useFindAndModify: false,
    });

 
 
     res.status(200).json({
         success:true,
     });
      });

       // Delete User -- Admin
 exports.deleteUser = catchAsyncErrors(async(req,res,next)=>{
   
    const user = await User.findById(req.params.id);
    // I will remove cloudinary later as time goes on

    if(!user){
        return next(new ErrorHandler(`User Does Not Exist with Id: ${req.params.id}`));
    }

    await user.remove();

     res.status(200).json({
         success:true,
         message:"User Deleted Successfully"
     });
      });