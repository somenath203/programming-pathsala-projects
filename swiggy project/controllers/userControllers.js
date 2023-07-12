const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('./../models/userModel');
const Order = require('./../models/orderModel');


const registerUser = async (req, res) => {

    try {

        const { fullName, email, phoneNumber, password, address } = req.body;

        const isUserAlreadyExist = await User.findOne({ email: email });

        if (isUserAlreadyExist) {
            return res.status(400).send({
                success: false,
                message: 'user with this emailID already exists',
                data: null
            });
        };

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const createUser = await User.create({
            fullName: fullName,
            email: email,
            phoneNumber: phoneNumber,
            address: address,
            password: hashedPassword
        });

        res.status(201).send({
            success: true,
            message: 'your account has been created successfully',
            data: {
                fullName: createUser.fullName,
                email: createUser.email,
                phoneNumber: createUser.phoneNumber
            }
        });

    } catch (error) {

        res.status(500).send({
            success: false,
            message: error.message,
            data: null
        });
    }

};


const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).send({
                success: false,
                message: 'Invalid Credentials!! Please try again',
                data: null
            });
        };

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).send({
                success: false,
                message: 'Invalid Credentials!! Please try again',
                data: null
            });
        };

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRES_IN });

        res.status(200).send({
            success: true,
            message: 'you are logged in successfully',
            data: token
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
            data: null
        });
    }

};

const forgetPassword = async (req, res) => {

    try {
        
        const { email, phoneNumber, password } = req.body;

        if(!await User.findOne({ email: email, phoneNumber: phoneNumber })) {
            return res.status(400).send({
                success: false,
                message: 'Invalid Credentials!! Please try again',
                data: null
            });
        };

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);


        await User.findOneAndUpdate({ email: email, phoneNumber: phoneNumber }, { password: hashedPassword }, { new: true, runValidators: true });

        res.status(200).send({
            success: true,
            message: 'your password has been reset successfully',
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
            data: null
        });
    }

};

const getAllOrdersGivenByUser = async (req, res) => {

    try {

        const idOfTheAuthUser = req.body.authUserId;

        const getAllOrdersOfTheUser = await Order.find({ idOfTheUserGivingTheOrder: idOfTheAuthUser });


        let allDishes = [];
        let allNameOfTheRestuarants = [];

        let allOrders = [];

        getAllOrdersOfTheUser.map((order) => {
            allDishes.push(order.orders);
            allNameOfTheRestuarants.push(order.nameOfTheRestuarantFromWhereOrderIsGiven);
        });

        const singleOrder = {
            allDishes,
            allNameOfTheRestuarants
        };

        allOrders.push(singleOrder);
         

        res.status(200).send({
            success: true,
            message: 'all orders given by you and all the restuarant from where you ate till now has been fetched successfully',
            orders: allOrders
        });
        
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
            data: null
        });
    };

};


module.exports = {
    registerUser,
    loginUser,
    forgetPassword,
    getAllOrdersGivenByUser
}