const Member = require("../models/memberModel");


exports.addMember = async (req, res) => {
  try {
    const { bookId, borrower, issueDate, returnDate } = req.body;

    if (!bookId || !borrower || !issueDate || !returnDate) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newMember = new Member({ bookId, borrower, issueDate, returnDate });
    await newMember.save();

    res.status(201).json({ message: "Member added successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { borrower, returnDate } = req.body;

    if (!borrower && !returnDate) {
      return res.status(400).json({ error: "At least one field must be updated" });
    }

    const updatedMember = await Member.findByIdAndUpdate(
      id,
      { $set: { borrower, returnDate } },
      { new: true }
    );

    if (!updatedMember) {
      return res.status(404).json({ error: "Member not found" });
    }

    res.status(200).json({ message: "Member details updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deleteMember = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMember = await Member.findByIdAndDelete(id);

    if (!deletedMember) {
      return res.status(404).json({ error: "Member not found" });
    }

    res.status(200).json({ message: "Member deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
