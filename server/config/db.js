const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.set("strictQuery", true);
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Connected to DB Successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
