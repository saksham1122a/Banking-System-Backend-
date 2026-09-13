const mongoose = require('mongoose')
const config = require('../config/config.js')

async function connectDB() {
    await mongoose.connect(config.MONGO_URI)
    console.log("MongoDB connected successfully")
}

module.exports = connectDB