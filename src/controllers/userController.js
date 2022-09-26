const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const { isValid, regexEmail, regexPassword, regexName, regexPhone, regexPincode, checkObject } = require("../validators/validator")


const createUser = async function (req, res) {
    try {
        let data = req.body
        let { title, name, phone, email, password, address } = data
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "please provide some data to create user" })
        }
        if (!isValid(title) || title != 'Mr' && title != 'Mrs' && title != 'Miss') {
            return res.status(400).send({ status: false, msg: "please provide title in Mr, Mrs, Miss" })
        }
        if (!isValid(name)) {
            return res.status(400).send({ status: false, msg: "please provide name in proper format" })
        }
        if (!regexName.test(name)) {
            return res.status(400).send({ status: false, msg: "please provide valid name" })
        }
        if (!isValid(phone)) {
            return res.status(400).send({ status: false, msg: "please provide phone in proper format" })
        }
        if (!regexPhone.test(phone)) {
            return res.status(400).send({ status: false, msg: "please provide valid phone number" })
        }
        const duplicatePhone = await userModel.findOne({ phone })
        if (duplicatePhone) {
            return res.status(400).send({ status: false, msg: "phone number is already registered" })
        }
        if (!isValid(email)) {
            return res.status(400).send({ status: false, msg: "please provide email in proper format" })
        }
        if (!regexEmail.test(email)) {
            return res.status(400).send({ status: false, msg: "please provide valid email" })
        }
        const duplicateEmail = await userModel.findOne({ email })
        if (duplicateEmail) {
            return res.status(400).send({ status: false, msg: "email is already registered" })
        }
        if (!isValid(password)) {
            return res.status(400).send({ status: false, msg: "please provide password in proper format" })
        }
        if (!regexPassword.test(password)) {
            return res.status(400).send({ status: false, msg: "please provide valid password" })
        }
        if (address) {
            if (!checkObject(address)){
                return res.status(400).send({ status: false, msg: "please provide address" })
            }
            if (Object.keys(address).length === 0) {
                return res.status(400).send({ status: false, msg: " please provide somthing in address" })
            }
            if (!isValid(address.street || address.city || address.pincode)) {
                return res.status(400).send({ status: false, msg: "please provide address in proper format" })
            }
            if (!regexName.test(address.city)) {
                return res.status(400).send({ status: false, msg: "please provide valid city" })
            }
            if (!regexPincode.test(address.pincode)) {
                return res.status(400).send({ status: false, msg: "please provide valid pincode" })
            }
        }

        let userData = await userModel.create(data)
        return res.status(201).send({ status: true, msg: "User created successfully", data: userData })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const loginUser = async function (req, res) {
    try {
        let email = req.body.email
        let password = req.body.password
        if (!isValid(email) || !isValid(password)) {
            return res.status(400).send({ status: false, data: "please enter email and password" })
        }

        if (!regexEmail.test(email)) return res.status(400).send({ status: false, data: "please enter valid email" })
        if (!regexPassword.test(password)) {
            return res.status(400).send({ status: false, data: "please enter valid password" })
        }

        const login = await userModel.findOne({ email: email, password: password })
        if (!login) {
            return res.status(404).send({ status: false, message: "email or password is incorrect" })
        } else {
            const token = jwt.sign({
                userId: login._id.toString(),
            }, "Project3-Group63-BookManagement", { expiresIn: '1d' });
            return res.status(200).send({ status: true, data: token })
        }
    }
    catch (err) {
        return res.status(500).send({ status: false, err: err.message })
    }
}

module.exports = { createUser, loginUser }
