const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  borrower: { type: String, required: true },
  issueDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
});

module.exports = mongoose.model("Member", memberSchema);
