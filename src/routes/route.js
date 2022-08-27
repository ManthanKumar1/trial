const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const userData = require("../controllers/userDetail")
const middleware = require("../middleware/middleware")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser  )

router.post("/login", userController.loginUser)

//The userId is sent by front end
router.get("/users/:userId", userController.getUserData)

router.put("/users/:userId", userController.updateUser)


// Assignment

router.post("/createUser", userData.createUser)
router.post("/loginUser", userData.loginUser)
router.get("/getusers/:userId", userData.getUser)
router.put("/updateuser/:userId", userData.updateDetails)
router.delete("/users/:userId", userData.deleteUser)

module.exports = router;