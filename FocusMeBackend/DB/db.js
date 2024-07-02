const mongoose = require('mongoose');
// Replace these with your connection details
const uri = "mongodb+srv://Heer_K:heer1109@cluster0.50zjbey.mongodb.net/uploadedpaths";

 const connectToDb = async () => {
  try {
    const conn = await mongoose.connect(uri);
    console.log('Connected to MongoDB database!');
  } catch (error) {
    console.error('Error connecting to MongoDB database:', error);
    throw error; 
  }
}

module.exports = connectToDb;
