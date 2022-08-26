const express = require('express');
const router = express.Router();
const ProductController = require("../controllers/productController")
const UserController= require("../controllers/userController")
const OrderController= require("../controllers/orderController")
const commonMW = require ("../middlewares/commonMiddlewares")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post('/createProduct', ProductController.createProduct)

router.post('/createUser',commonMW.freeUser, UserController.createUser)

router.post('/createOrder', commonMW.freeUser, OrderController.createOrder)


module.exports = router;