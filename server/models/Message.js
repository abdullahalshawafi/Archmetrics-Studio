const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        maxLength: 40,
        required: true
    },
    email: {
        type: String,
        maxLength: 100,
        required: true
    },
    message: {
        type: String,
        maxLength: 100,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);