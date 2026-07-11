const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // 🌍 1. Pehle environment se Atlas URI uthao, nahi toh local variable
        const atlasURI = process.env.MONGO_URI;
        const localURI = process.env.MONGO_LOCAL_URI || "mongodb://127.0.0.1:27017/cancer_db";

        if (atlasURI) {
            try {
                console.log("🌍 Attempting MongoDB Atlas Cloud connection...");
                const conn = await mongoose.connect(atlasURI);
                console.log(`🎯 MongoDB Cloud Connected: ${conn.connection.host}`);
                return; // Connection successful, exit function
            } catch (cloudError) {
                console.error(`⚠️ Atlas Cloud Connection Failed: ${cloudError.message}`);
                console.log("🔄 Falling back to Local MongoDB Database...");
            }
        } else {
            console.log("ℹ️ No Atlas MONGO_URI found in .env. Using Local setup.");
        }

        // 🏠 2. Fallback or Default Local Connection
        console.log("🏠 Connecting to Local MongoDB...");
        const conn = await mongoose.connect(localURI);
        console.log(`🎯 MongoDB Connected Locally: ${conn.connection.host}`);

    } catch (error) {
        console.error(`❌ Critical Database Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;