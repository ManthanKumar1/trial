const UserModel= require("../models/userModel")
const mid = require("../middlewares/commonMiddlewares")

const createUser = async function(req,res){
    let data = req.body
    let header = req.headers.isfreeappuser
    data.isFreeAppUser= header
    console.log({data: data, isFreeAppUser: header})
    let final = await UserModel.create(data)
    res.send(final)
}

module.exports.createUser= createUser
