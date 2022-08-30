const jwt = require("jsonwebtoken")
const user = require("../models/user")

const authenticate = function(req, res, next) {
    try {
        let token = req.headers["x-Auth-token"]
        if (!token) token = req.headers["x-auth-token"];
        if (!token) return res.status(404).send({ status: false, msg: "token must be present" });
      
        console.log(token);
        let decodedToken = jwt.verify(token, "functionup-plutonium");
        if (!decodedToken){
          return res.status(500).send({ status: false, msg: "token is invalid" });
        }
          req.loggedInUser=decodedToken.userId
        next() 
    } catch (error) {
        res.status(500).send({error: error.message})
    }   
}

const authorise = function(req, res, next) {
    try {
        let reqUserId= req.params.userId
    if(req.loggedInUser!= reqUserId){
      return  res.send({status:false,msg:"this is not correct"})
    }
    next()
    } catch (error) {
        res.status(500).send({error: error.message})
    }
    
}
module.exports.authenticate=authenticate
module.exports.authorise=authorise