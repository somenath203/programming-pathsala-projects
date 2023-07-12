const mongoose = require('mongoose');


const restuarantSchema = new mongoose.Schema({
    restuarantName: {
        type: String,
        required: [true, 'restuarant name is required']
    },
    restuarantAddress: {
        type: String,
        required: [true, 'restuarant address is required']
    },
    restuarantMenu: {
        type: Array,
        required: [true, 'restuarant menu is required']
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('restuarant', restuarantSchema); 