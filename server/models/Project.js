const mongoose = require('mongoose');

const projectModel = new mongoose.Schema({
    name: {
        type: String
    },
    Description: {
        type: String,
        maxLength: 300,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    link: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectModel);