const jwt = require("jsonwebtoken")
const user = require("../models/user")
const authenticate = function(req, res, next) {
    
    let token = req.headers["x-Auth-token"]
    if (!token) token = req.headers["x-auth-token"];
    if (!token) return res.send({ status: false, msg: "token must be present" });
  
    console.log(token);
    let decodedToken = jwt.verify(token, "functionup-plutonium");
    if (!decodedToken){
      return res.send({ status: false, msg: "token is invalid" });
    }
      req.loggedInUser=decodedToken.userId
    next()
}


const authorise = function(req, res, next) {
    // comapre the logged in user's id and the id in request
    let reqUserId= req.params.userId
    if(req.loggedInUser!= reqUserId){
      return  res.send({status:false,msg:"this is not correct"})
    }
    next()
}
module.exports.authenticate=authenticate
module.exports.authorise=authorise