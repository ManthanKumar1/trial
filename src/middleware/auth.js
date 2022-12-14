const jwt = require('jsonwebtoken')
const adminModel = require('../models/adminModel')


const authentication = async function (req, res, next) {
    try {
        let token = req.header("x-api-key")
        if (!token) {
            return res.status(404).send({ status: false, msg: "Token must be present" })
        }
        jwt.verify(token, "tailwebs", (error, decodedToken) => {
            if (error) {
                return res.status(401).send({ status: false, data: "Token is Invalid" })
            }
            else {
                res.setHeader("x-api-key", token)
                req.token = decodedToken
                next()
            }
        })

    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}


// const authorisation = async function (req, res, next) {
//     try {
//         let adminId = req.decode.adminId
//         if(!isValidObjectId(adminId)){
//             return res.status(400).send({status: false, message: "Please provide valid id"})
//         }
//         let checkingAdmin = await adminModel.findOne({ _id: adminId })
//         if (!checkingAdmin) {
//             return res.status(404).send({ status: false, message: "this admin is not found" })
//         }
//         if (checkingAdmin._id != req.decode.adminId) {
//             return res.status(403).send({ status: false, message: "you are not Authorized person" })
//         }
//         else {
//             next()
//         }
//     } catch (error) {
//         return res.status(500).send({ status: false, message: error.message })
//     }
// }

module.exports = { authentication}