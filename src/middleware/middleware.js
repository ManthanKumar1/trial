
const jwt = require("jsonwebtoken")


const tokenMiddleware = async function(req, res, next){
    let token = req.headers["x-Auth-token"];
    if (!token){
        token = req.headers["x-auth-token"];
    }
    if (!token) {
        return res.send({msg: "token must be present" });
    }
    console.log(token);
    let decoded = jwt.verify(token, "this is JWT assignment");
    if (!decoded)
    return res.send({msg: "token is invalid" });
}

module.exports.tokenMiddleware = tokenMiddleware