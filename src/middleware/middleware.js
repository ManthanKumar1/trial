const jwt = require("jsonwebtoken")
const blogModel = require("../models/blogModel")

const authentication = async function(req, res, next){
    try {
        let token = req.headers['x-api-key']
        if (!token){
            return res.status(404).send({status: false, msg: "token must be present"})
        }
    
        let decodedToken = jwt.verify(token, "manthan_sanket_suyash_satyajit_group_65")
        if(!decodedToken){
            return res.status(401).send({status: false, msg: "token is invalid"})
        }
        req.token = decodedToken
        next()   
    } catch (error) {
        return res.status(500).send({msg:error.message})
    }
}

const authorisation = async function (req, res, next){
    try{
        let blogId = req.params.blogId
        let findBlog = await blogModel.findById(blogId);
        if (findBlog) {
          if (req.token.userId != findBlog.authorId)return res.status(403).send({ status: false, msg:"Author is not authorized to access this data"});
        }
         next()
    }
    catch (err){
        return res.status(500).send({msg:err.message})
    }
}
module.exports.authentication= authentication
module.exports.authorisation=authorisation