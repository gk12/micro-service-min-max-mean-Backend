const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGO_URL;

async function connectToDatabase() {
  try {
    await mongoose.connect(url);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Connection error:', error);
  }
}
connectToDatabase();
