const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'fullname is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true 
    },
    phoneNumber: {
        type: String,
        required: [true, 'phone number is required']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('users', userSchema);