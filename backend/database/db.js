const mongoose = require("mongoose");

const db = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Mongo DB successfully connected");
  } catch (error) {
    console.log("Mongo DB Connection error", error);
  }
};

module.exports = db;
