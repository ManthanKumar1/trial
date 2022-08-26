const jwt = require("jsonwebtoken")
const user = require('../models/user')


const createUser = async function (req, res){
    let data = req.body
    let userDetails = await user.create(data)
    res.send({status: true, msg: userDetails})
}

const loginUser = async function(req, res){
    let userName = req.body.emailId
    let password = req.body.password

    let userDetails = await user.findOne({ emailId: userName, password: password})
    if(!userDetails){
        return res.send({msg: "user and password is incorrect"})
    }
    let token = jwt.sign(
        {
            userId: user._id,
            assignment: jwt
        },
        "this is JWT assignment"
    )
    res.setHeader("x-auth-token", token)
    res.send({ status: true, tokenData: token })
}


const getUser = async function(req, res){
    let token = req.headers["x-Auth-token"];
    if (!token) {
       let token = req.headers["x-auth-token"];
    }
    if (!token){
        return res.send({msg: "token is missing"})
    }
    let decode = jwt.verify(token, "this is JWT assignment")
    if (!decode){
        return res.send({msg: "token is compulsory"})
    }
    let userId = req.params.userId
    let userDetail = await user.findById(userId)
    if (!userDetail){
        return res.send({msg: "token is wrong"})
    }
    res.send({status: true, details: userDetail})
}


module.exports.createUser = createUser
module.exports.loginUser = loginUser
module.exports.getUser = getUser