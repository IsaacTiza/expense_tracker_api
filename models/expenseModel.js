const mongoose = require("mongoose");
// const { trim } = require("validator");

const expenseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this expense"],
      trim: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    amount: {
      type: Number,
      required: [true, "Please provide an amount for this expense"],
      min: [1, "Amount cannot be lower than 1"],
    },
    date: {
      type: Date,
      required: [true, "Please provide a date for this expense"],
      default: Date.now
    },
    category: {
      type: String,
      maxlength: [30, "Category cannot be more than 30 characters"],
      trim: true,
    },
    paymentMethod: {
      type: String,
      maxlength: [30, "Payment Method cannot be more than 30 characters"],
    },
    currency: {
      required: [true, "Plaese provide a Currency for this Expense"],
      type: String,
      enum: ["NGN", "USD", "GBP", "EUR"],
      default: "NGN",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Expense", expenseSchema);
