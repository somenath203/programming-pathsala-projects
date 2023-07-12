const mongoose = require('mongoose');


const orderModel = new mongoose.Schema({
    nameOfTheRestuarantFromWhereOrderIsGiven: {
        type: String,
        required: [true, 'name of the restuarant where the order is given is required']
    },
    orders: [{
        type: String,
        required: [true, 'orders are required']
    }],
    idOfTheUserGivingTheOrder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true, 'id of the user giving order is required']
    },
}, {
    timestamps: true
});


module.exports = mongoose.model('order', orderModel);