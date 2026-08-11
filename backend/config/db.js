const mongoose = require('mongoose');

let isMongoConnected = false;

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI;
  if (!mongoURI) {
    console.log('ℹ️  No MONGODB_URI configured. Operating in Local Persistence mode.');
    return false;
  }

  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`✅ Connected to MongoDB Atlas: ${conn.connection.host}`);
    isMongoConnected = true;
    return true;
  } catch (error) {
    console.warn(`⚠️ Could not connect to MongoDB Atlas (${error.message}). Falling back to Local Persistence mode.`);
    isMongoConnected = false;
    return false;
  }
};

const checkStatus = () => ({
  mode: isMongoConnected ? 'MongoDB Atlas' : 'Local Persistence (Offline Ready)',
  connected: isMongoConnected
});

module.exports = { connectDB, checkStatus };
