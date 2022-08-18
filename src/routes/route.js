const express = require('express');
const router = express.Router();
const AuthorAndBook = require("../controllers/authorAndBook")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createBook", AuthorAndBook.createBook)
router.post("/createAuthor", AuthorAndBook.createAuthor)
router.post("/getDetails", AuthorAndBook.showAuthor)
router.post("/updatePrice", AuthorAndBook.findAuthor)
router.post("/cost", AuthorAndBook.bookCost)

module.exports = router;