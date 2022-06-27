const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    Auther: {
        type: String,
        minLength: 3,
        maxLength: 40,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    images:{
        type:[String]
    }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);