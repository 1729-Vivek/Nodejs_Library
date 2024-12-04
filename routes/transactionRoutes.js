const express = require("express");
const { issueBook, returnBook } = require("../controllers/transactionController");

const router = express.Router();

router.post("/issue", issueBook);
router.put("/return/:transactionId", returnBook);

module.exports = router;
