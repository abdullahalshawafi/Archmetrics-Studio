const mongoose = require('mongoose');

const projectModel = new mongoose.Schema({
    title: {
        type: String,
        minLength: 3,
        maxLength: 40,
        required: true
    },
    description: {
        type: String,
        maxLength: 2000,
        required: true
    },
    images: {
        type: [String],
        default: ["None"],
        required: true
    },
    link: {
        type: String,
        default: "None"
    }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectModel);