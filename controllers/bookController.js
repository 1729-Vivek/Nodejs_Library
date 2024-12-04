const Book = require("../models/bookModel");


exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({ status: "available" }); 
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.addBook = async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findOne({ $or: [{ _id: id }, { ISBN: id }] });

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.issueBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { memberId, mobile, issueDate } = req.body;

    const book = await Book.findById(id);

    if (!book || book.status !== "available") {
      return res.status(400).json({ error: "Book not available for issue" });
    }

    book.status = "issued";
    book.issuedTo = { memberId, mobile, issueDate };
    await book.save();

    res.status(200).json({ message: "Book issued successfully", book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.returnBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book || book.status !== "issued") {
      return res.status(400).json({ error: "Book not currently issued" });
    }

    book.status = "available";
    book.issuedTo = null;
    await book.save();

    res.status(200).json({ message: "Book returned successfully", book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findOneAndDelete({ $or: [{ _id: id }, { ISBN: id }] });

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
