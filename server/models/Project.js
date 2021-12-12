const mongoose = require('mongoose');
const Service = require('./Service');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: 3,
        maxLength: 40,
        required: true
    },
    slug: {
        type: String,
        minLength: 3,
        maxLength: 40,
        unique: true,
        required: true
    },
    description: {
        type: String,
        maxLength: 2000,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    client: {
        type: String,
        required: true
    },
    services: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service"
    }]
}, { timestamps: true });

projectSchema.pre('remove', next => {
    Service.remove({ _id: { "$in": this.services } }).exec();
    next();
});

module.exports = mongoose.model('Project', projectSchema);