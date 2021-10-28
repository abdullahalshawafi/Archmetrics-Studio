const mongoose = require('mongoose');

module.exports = async function db() {
    await mongoose.connect(process.env.DB_URI || 'mongodb://localhost:27017/Archmetrics-Studio');
    console.log('Connected to DB');
}