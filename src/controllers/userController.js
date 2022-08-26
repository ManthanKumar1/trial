const UserModel= require("../models/userModel")
const mid = require("../middlewares/commonMiddlewares")

const createUser = async function(req,res){
    let data = req.body
    let header = req.headers.isfreeappuser
    console.log({data: data, isFreeAppUser: header})
    let final = await UserModel.create(data)
    res.send("see terminal")
}

module.exports.createUser= createUser
