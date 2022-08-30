const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const userData = require("../controllers/userDetail")
const {authenticate,authorise}=require("../middleware/middleware")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser  )

router.post("/login", userController.loginUser)

router.get("/users/:userId", userController.getUserData)

router.put("/users/:userId", userController.updateUser)


// Assignment

router.post("/users", userData.createUser)

router.post("/login", userData.loginUser)

router.get("/users/:userId", authenticate, authorise, userData.getUserData)


router.put("/users/:userId",authenticate, authorise, userData.updateUser)
router.delete("/users/:userId",authenticate, authorise, userData.deleteUser)


module.exports = router;