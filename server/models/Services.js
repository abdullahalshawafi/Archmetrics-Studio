const mongoose = require('mongoose');

const servicesModel = new mongoose.Schema({
    title: {
        type: String,
        minLength: 3,
        maxLength: 40,
        required: true
    },
    summary: {
        type: String,
        maxLength: 2000,
        required: true
    },
    description: {
        type: String,
        default: "None"
    },
    images: {
        type: [String],
        default: ["None"],
        required: true
    },
    Projects: {
        types: [String]
    }
}, { timestamps: true });

module.exports = mongoose.model('services', servicesModel);