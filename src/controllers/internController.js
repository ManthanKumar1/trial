const internModel = require('../models/internModel')
const collegeModel = require('../models/collegeModel')
const { stringChecking, isvalidEmail, isvalidMobile } = require("../validators/validator")


const createIntern = async function (req, res) {
    res.setHeader('Access-Control-Allow-Origin','*')
    try {
        let data = req.body

        if (Object.keys(data).length === 0) return res.status(400).send({ status: false, message: "Please enter data to create Intern" })

        const { name, mobile, email, collegeName } = data

        const entries = {}

        if (!stringChecking(name)) return res.status(400).send({ status: false, message: "name must be present and have non empty string" })
        entries.name = name

        if (!isvalidEmail.test(email)) return res.status(400).send({ status: false, message: "please enter non empty valid email" })
        const duplicateEmail = await internModel.findOne({ email: email })
        if (duplicateEmail) return res.status(400).send({ status: false, message: "email Id already register ,use another email" })
        entries.email = email

        if (!isvalidMobile.test(mobile)) return res.status(400).send({ status: false, message: "please enter non empty valid Mobile Number" })
        const duplicateMobile = await internModel.findOne({ mobile: mobile })
        if (duplicateMobile) return res.status(400).send({ status: false, message: "mobile already register ,use another mobile number" })
        entries.mobile = mobile


        if (!stringChecking(collegeName)) return res.status(400).send({ status: false, message: "collegeName must be present and have non empty string" })
        const college = await collegeModel.findOne({ name: collegeName })
        if (!college) return res.status(404).send({ status: false, message: "college Name not found" })
        entries.collegeId = college._id

        const createIntern = await internModel.create(entries)
        return res.status(201).send({ status: true, data: createIntern })


    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }

}

const getIntern = async function (req, res) {
    res.setHeader('Access-Control-Allow-Origin','*')
    try {
        const filter = req.query
        if(filter.collegeName && Object.keys(filter).length === 1){
            const checkCollege = await collegeModel.findOne({ name: filter.collegeName })
            if (!checkCollege) return res.status(404).send({ status: false, message: "collegeName not found" })
    
            const { name, fullName, logoLink } = checkCollege
    
            const interns = await internModel.find({ collegeId: checkCollege._id }).select({ name: 1, email: 1, mobile: 1 })

            if (interns.length === 0)  return res.status(404).send({ status: false, message: "no intern are there" })
            
            const data = { name, fullName, logoLink, interns }
            return res.status(200).send({ status: true, count: interns.length, data: data })
        }
        return res.status(400).send({status: false, message: "Please provide filter and it should be collegeName only"})
       
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { createIntern, getIntern }