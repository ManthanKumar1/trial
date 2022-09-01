const express = require('express');
const router = express.Router();
const CowinController= require("../controllers/cowinController")



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

// Assignment

router.get("/cowin/district", CowinController.district)

router.post("/meme", CowinController.meme)

router.get("/temp", CowinController.temp)

router.get("/cities", CowinController.allCities)


module.exports = router;