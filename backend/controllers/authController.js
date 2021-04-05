const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');

// Register a user => /api/v1/register
exports.registerUser = catchAsyncErrors( async (req, res, next) => {

    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password
    })

    sendToken(user,200,res);

})

// Login user => /api/v1/login

exports.loginUser = catchAsyncErrors( async (req, res, next) => {
    const { email, password } = req.body;
    
    // Checks if email and password is entered by user
    if(!email || !password){
        return next(new ErrorHandler('Please enter email and password',400))
    }

    // Finding user in database

    const user = await User.findOne({ email }).select('+password')

    if(!user){
        return next(new ErrorHandler('Invalid Email or Password',401));
    }

    // Checks if password is correct or not

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid Email or Password',401))
    }

    sendToken(user,200,res);
})

// Get currently logged in user details => /api/v1/me
exports.getUserProfile = catchAsyncErrors( async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})

// Change / Update password => /api/v1/password/update
exports.updatePassword = catchAsyncErrors( async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    // Check previous user password

    const isMatched = await user.comparePassword(req.body.oldpassword)
    if(!isMatched){
        return next(new ErrorHandler('Old password is incorrect',400));
    }

    user.password = req.body.password;

    await user.save();

    sendToken(user, 200 ,res);

})

// Update user profile => /api/v1/me/update
exports.updateprofile = catchAsyncErrors( async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    };

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true
    })
})

// Logout user => /api/v1/logout
exports.logout = catchAsyncErrors( async (req, res, next) => {
    res.cookie('token', null, { 
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
})

// Admin routes

// Get all users => /api/v1/admin/users
exports.allUsers = catchAsyncErrors( async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})

// Get user details => /api/v1/admin/user/:id
exports.getUserDetails = catchAsyncErrors( async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`));
    }

    res.status(200).json({
        success: true,
        user
    })
})