const mongoose = require('mongoose');


const todoModel = new mongoose.Schema({
    task: {
        type: String,
        required: [true, 'task is required']
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('todo', todoModel);