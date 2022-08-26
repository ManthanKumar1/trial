const { count } = require("console")
const productModel= require("../models/productModel")

const createProduct= async function (req, res) {
    let data = req.body
    let product = await productModel.create(data)
    res.send({details: product})
}


module.exports.createProduct= createProduct
