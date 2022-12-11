const adminModel = require("../models/adminModel")
const jwt = require("jsonwebtoken")
const {isValid, isValidName, isValidMail, isValidPassword} = require("../validation/validator")

const createAdmin = async function(req, res){
    try {
        let data = req.body
        if(Object.keys(data).length == 0){
            return res.status(400).send({status: false, message: "Please provide some data to create a user"})
        }

        let {firstName, lastName, email, password} = data

        if(!isValid(firstName)){
            return res.status(400).send({status: false, message: "Please provide first name of the user"})
        }
        if(!isValidName.test(firstName)){
            return res.status(400).send({status: false, message: "Please provide valid first name"})
        }

        if(!isValid(lastName)){
            return res.status(400).send({status: false, message: "Please provide last name of the user"})
        }
        if(!isValidName.test(lastName)){
            return res.status(400).send({status: false, message: "Please provide valid last name"})
        }

        if(!isValid(email)){
            return res.status(400).send({status: false, message: "Please provide email id of the user"})
        }
        if(!isValidMail.test(email)){
            return res.status(400).send({status: false, message: "Please enter valid email id"})
        }
        let checkEmail = await adminModel.findOne({email: email})
        if(checkEmail){
            return res.status(400).send({status: false, message: "Email id is already registered"})
        }

        if(!isValid(password)){
            return res.status(400).send({status: false, message: "Please provide password of the user"})
        }
        if(!isValidPassword.test(password)){
            return res.status(400).send({status: false, message: "Please enter valid password"})
        }

        const createUser = await adminModel.create(data)
        return res.status(201).send({status: true, message: "Admin created successfully", data: createUser})

    } catch (error) {
        return res.status(500).send({status: false, message: error.message})
    }
}

const login = async function (req, res){
    try {
        let data = req.body
        if(Object.keys(data).length == 0){
            return res.status(400).send({status: false, message: "Please provide email id and password to login"})
        }

        let {email, password} = data

        if(!isValid(email)){
            return res.status(400).send({status: false, message: "Please provide email id to login"})
        }
        if(!isValidMail.test(email)){
            return res.status(400).send({status: false, message: "Please provide valid email id"})
        }

        if(!isValid(password)){
            return res.status(400).send({status: false, message: "Please provide password to login"})
        }
        if(!isValidPassword.test(password)){
            return res.status(400).send({status: false, message: "Please provide valid password"})
        }

        const checkData = await adminModel.findOne({email: email, password: password})
        if(!checkData){
            return res.status(404).send({status: false, message: "this email id and password is incorrect"})
        }

        const token = jwt.sign({
            adminId: checkData._id
        }, "tailwebs", {expiresIn: "1d"})
        return res.status(200).send({status: true, message: "your token", data: token})

    } catch (error) {
        return res.status(500).send({status: false, message: error.message})
    }
}

module.exports = {createAdmin, login}