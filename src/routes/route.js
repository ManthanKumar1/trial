const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")
const BookController= require("../controllers/bookController")
const BookCollectionController = require("../controllers/bookCollectionController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createUser", UserController.createUser  )

router.get("/getUsersData", UserController.getUsersData)

// router.post("/createBook", BookController.createBook  )

// router.get("/getBooksData", BookController.getBooksData)

// Assignment day 20
router.post("/createBook", BookCollectionController.createBook)
router.get("/bookList", BookCollectionController.bookList)
router.post("/getBooksInYear", BookCollectionController.getBooksInYear)
router.post("/getParticularBooks", BookCollectionController.getParticularBooks)
router.get("/getXINRBooks", BookCollectionController.getXINRBooks)
router.get("/getRandomBooks", BookCollectionController.getRandomBooks)

module.exports = router;