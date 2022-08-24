const express = require('express');
const router = express.Router();
const commonMW = require ("../middlewares/commonMiddlewares")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.get('/test', function(req, res){
    res.send("test")
})

module.exports = router;