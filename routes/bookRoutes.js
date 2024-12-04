const express = require("express");
const {
  getAllBooks,
  getBookById,
  issueBook,
  returnBook,
  deleteBook,
} = require("../controllers/bookController");
const { addBook } = require("../controllers/bookController");

const router = express.Router();

router.get("/available", getAllBooks); 
router.post("/",addBook);
router.get("/:id", getBookById);
router.post("/issue/:id", issueBook); 
router.post("/return/:id", returnBook);
router.delete("/delete/:id", deleteBook); 

module.exports = router;
