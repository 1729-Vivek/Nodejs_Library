const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  borrower: { type: String, required: true },
  issueDate: { type: Date, required: true },
  returnDate: { type: Date },
  status: { type: String, default: "issued" }, 
});

module.exports = mongoose.model("Transaction", transactionSchema);
