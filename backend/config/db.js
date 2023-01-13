const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log(process.env.MONGO_URI);
    const conn = await mongoose.connect(process.env.MONGO_URI);
    // const conn = await mongoose.connect("mongodb://localhost:27017/support_desk")

    console.log(`MongoDB Connected:${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`Error:${error.message}`.red.underline.bold);
    console.log(process.env.MONGO_URI);

    process.exit(1);
  }
};
module.exports = connectDB;
