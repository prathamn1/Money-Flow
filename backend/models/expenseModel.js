const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,  // Reference to the User's _id field
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    amount: {
      type: Number,
      required: true,
      trim: true,
      maxLength: 20,
    },
    type: {
      // this is the type of transaction ie. expenditure
      type: String,
      default: "Expense",
    },
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      maxLength: 100,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      maxLength: 20,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema); // here Expense is the name of collection inside database
