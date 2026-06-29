const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // 🏠 Using local MongoDB URI to completely bypass network/router blocks
        const localURI = process.env.MONGO_LOCAL_URI || "mongodb://127.0.0.1:27017/cancer_db";
        
        console.log("🏠 Attempting local MongoDB connection...");
        const conn = await mongoose.connect(localURI);
        
        console.log(`🎯 MongoDB Connected Locally: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Database Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;