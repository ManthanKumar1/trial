const blogModel = require("../models/blogModel")
const blogController = require("../controllers/blogController")

const regexCharAndNum = new RegExp(/^[a-z\d\-_\s]+$/i) 

const isValid = function(value){
    if(!value || typeof value === "undefined" || value === null || typeof value != 'string') return false
    if(typeof value === "string" || value.trim().length === 0 ) return false
    return true
}

// Create Blog Validation

const blogValidation = function(req, res, next){
let data = req.body

        if (!isValid(data.title) || !data.title.match(regexCharAndNum)) {
            return res.status(400).send({ status: false, msg: "Title is required and must be valid" })
        }

        if (!isValid(data.body)) {
            return res.status(400).send({ status: false, msg: "Body is required" })
        }
         
        if (data.tags && typeof (data.tags) != "object") {
            return res.status(400).send({ status: false, msg: "Tags should be string" })
        }

        if (!isValid(data.category)) {
            return res.status(400).send({ status: false, msg: "Category should be string" })
        }

        if (data.subcategory && typeof (data.subcategory) != 'object') {
            return res.status(400).send({ status: false, msg: "Subcategory should be string" })
        }
        next()
    }


module.exports.blogValidation = blogValidation 
