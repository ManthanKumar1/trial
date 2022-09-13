const authorModel = require("../models/authorModel")
const authorController = require("../controllers/authorController")

// Regex
const regexEmail = new RegExp(/\S+@\S+\.\S+/)
const regexPassword = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)

const isValid = function(value){
    if(!value ||typeof value != 'string'|| typeof value === 'undefined' || value === null || value.trim().length === 0) return false
    return true
}

// Create Author Validation

const createValidation = async function(req, res, next){
let data = req.body

if (Object.keys(data).length == 0) {
    return res.status(400).send({ status: false, msg: "all fields are required" })
}

if (!isValid(data.fname)) {
    return res.status(400).send({ status: false, msg: "fname is only alphabetic" })
}

if (!isValid(data.lname)) {
    return res.status(400).send({ status: false, msg: "lname is only alphabetic" })
}

if (!isValid(data.title) || data.title != "Mr" && data.title != "Mrs" && data.title != "Miss") {
    return res.status(400).send({ status: false, msg: "Title can only be Mr, Mrs or Miss" })
}

if (!isValid(data.email) || !data.email.match(regexEmail)) {
    return res.status(400).send({ status: false, msg: "Invalid Email" })
}

if (!isValid(data.password) || !data.password.match(regexPassword)) {
    return res.status(400).send({ status: false, msg: "Minimum eight characters, at least one letter and one number" })
}


const duplicateEmail = await authorModel.findOne({email: data.email})

    if(duplicateEmail){
        return res.status(400).send({status: false, msg: "email is already exist"})
    }

next()
}

// Login Validation

const loginValidation = function(req, res, next){ 
let userName = req.body.email
let password = req.body.password

if (!userName || !userName.match(regexEmail)) {
    return res.status(400).send({ status: false, msg: "Invalid Email" })
}

if (!password || !password.match(regexPassword)) {
    return res.status(400).send({ status: false, msg: "Minimum eight characters, at least one letter and one number" })
}
next()
}
module.exports.createValidation = createValidation
module.exports.loginValidation = loginValidation
