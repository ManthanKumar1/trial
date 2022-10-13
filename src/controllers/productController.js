const productModel = require('../models/productModel')
const { isValidObjectId, isValidName, isValidRequestBody, isPresent, isValidTitle } = require('../validator/validator')
const { uploadFile } = require('../controllers/awsController');
const userModel = require('../models/userModel');



const createProduct = async function (req, res) {
    try {
        let { isDeleted, installments, availableSizes, style, isFreeShipping, currencyFormat, currencyId, price, description, title } = req.body

        if (!isValidRequestBody(req.body)) return res.status(400).send({ status: false, message: "body cannot be empty" });

        if (!isPresent(title) || !isValidTitle.test(title)) return res.status(400).send({ status: false, message: "Title is missing or invalid" });

        //regex for title : mandatory alaphabet??
        if (!isPresent(description) || !isValidTitle.test(description)) {
            return res.status(400).send({ status: false, message: "description is missing or invalid" })
        } else {
            let repeatedTitle = await productModel.findOne({ title: title })
            if (repeatedTitle)
                return res.status(409).send({ status: false, message: "title has to be unique" })
        }

        if (!isPresent(price) || !(/^\d*\.?\d*$/).test(price)) return res.status(400).send({ status: false, message: "price is missing or invalid" })

        // if(currencyId !=  "INR"){
        //     return res.status(400).send({status:false , message : "Currency ID must be INR"})
        // }

        if (!isPresent(currencyId)) {
            req.body.currencyId = "INR"
        } else {
            if (!("INR").includes(currencyId))
                return res.status(400).send({ status: false, message: "Currency ID must be INR" })
        }

        if (!isPresent(currencyFormat)) {
            req.body.currencyFormat = "₹"
        } else {
            if (!("₹").includes(currencyFormat))
                return res.status(400).send({ status: false, message: "currencyFormat  must be ₹" })
        }

        let productImage = req.files

        if (productImage && productImage.length > 0) {
            let uploadedFileURL = await uploadFile(productImage[0])
            //profileImage was available in req.files ; added new key in req.body.profileImage = uploadedFileURL
            req.body.productImage = uploadedFileURL
        } else {
            return res.status(400).send({ msg: "No file found" })
        }

        // let joinsize = availableSizes.join(",")
        //console.log(availableSizes)

        // availableSizes = availableSizes.split(",")
        // if (!isPresent(availableSizes) || !["S", "XS", "M", "X", "L", "XXL", "XL"].includes(availableSizes)) {
        //    // console.log(joinsize)
        //     return res.status(400).send({ status: false, message: "availableSizes is missing or invalid : provide  S, XS, M, X, L, XXL, XL " })
        // }

        console.log(availableSizes)
        if (!isPresent(availableSizes)) return res.send("End")
        availableSizes = availableSizes.split(",")

        for (let i = 0; i < availableSizes.length; i++) {
            if (!(["S", "XS", "M", "X", "L", "XXL", "XL"].includes(availableSizes[i])))
                return res.status(400).send({ status: false, message: "availableSizes is missing or invalid : provide  S, XS, M, X, L, XXL, XL " })
        }

        req.body.availableSizes = availableSizes

        if (installments == Number) {
            if (!/^\d+$/.test(installments))
                return res.status(400).send({ status: fasle, message: " installments must be a digit" })
        }

        if (isDeleted == true) return res.status(400).send({ status: false, message: "cannot delete while creation" })

        // let data = {
        //     title: fname,
        //     pr: lname,
        //     email: email,
        //     phone: phone,
        //     password: hashedPassword,
        //     profileImage: req.body.profileImage,
        //     address: address

        // }

        let productCreate = await productModel.create(req.body)

        return res.status(201).send({ status: true, message: "created successfull", data: productCreate })

    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}



let getProductByFilter = async (req, res) => {
    let query = req.query

    if (Object.keys(query).length > 0) {
        if (query.size && query.name && query.priceGreaterThan) {
            let filter1 = await productModel.find({ availableSizes: query.size, title: { $regex: query.name }, price: { $gte: query.priceGreaterThan }, isDeleted: false })
            return filter1.length == 0 ? res.status(404).send({ status: false, message: "product not found given filter" }) : res.status(200).send({ status: true, data: filter1 })

        }
        if (query.size && query.name) {
            let filter2 = await productModel.find({ availableSizes: query.size, title: { $regex: query.name }, isDeleted: false })
            return filter2.length == 0 ? res.status(404).send({ status: false, message: "product not found given filter" }) : res.status(200).send({ status: true, data: filter2 })

        }
        if (query.priceGreaterThan && query.priceLessThan) {
            let filter3 = await productModel.find({ price: { $gte: query.priceGreaterThan, $lte: query.priceLessThan }, isDeleted: false })
            return filter3.length == 0 ? res.status(404).send({ status: false, message: "product not found given filter" }) : res.status(200).send({ status: true, data: filter3 })

        }

        if (query.size) {
            let size = await productModel.find({ availableSizes: query.size, isDeleted: false })
            return size.length == 0 ? res.status(404).send({ status: false, message: "product not found given size" }) : res.status(200).send({ status: true, data: size })
        }
        if (query.name) {
            let name = await productModel.find({ title: { $regex: query.name }, isDeleted: false })
            return name.length == 0 ? res.status(404).send({ status: false, message: "product not found given name" }) : res.status(200).send({ status: true, data: name })
        }
        if (query.priceGreaterThan) {
            let greaterprice = await productModel.find({ price: { $gte: query.priceGreaterThan }, isDeleted: false }).sort({ price: 1 })
            return greaterprice.length == 0 ? res.status(404).send({ status: false, message: "product not found given greaterprice" }) : res.status(200).send({ status: true, data: greaterprice })
        }
        if (query.priceLessThan) {
            let lessthanprice = await productModel.find({ price: { $lte: query.priceLessThan }, isDeleted: false }).sort({ price: -1 })
            return lessthanprice.length == 0 ? res.status(404).send({ status: false, message: "product not found given greaterprice" }) : res.status(200).send({ status: true, data: lessthanprice })
        }
        let priceSort = query.priceSort
        if (priceSort) {
            let sortprice = await productModel.find({ isDeleted: false }).sort({ price: priceSort })
            return sortprice.length == 0 ? res.status(404).send({ status: false, message: "product not found" }) : res.status(200).send({ status: true, data: sortprice })
        }


    } else {
        let allproduct = await productModel.find({ isDeleted: false })
        return allproduct.length == 0 ? res.status(404).send({ status: false, message: "product not found" }) : res.status(200).send({ status: true, data: allproduct })
    }
}

const getProduct = async function (req, res) {
    try {
        let productId = req.params.productId

        if (!isValidObjectId(productId)) return res.status(400).send({ status: false, message: "product id is not valid" })

        let checkProduct = await productModel.findById(productId)

        if (checkProduct.isDeleted == true) return res.status(404).send({ status: false, message: "Product Is Out Of Stock" })

        if (!checkProduct) return res.status(404).send({ status: false, message: "product not found" })

        return res.status(200).send({ status: true, message: "products", data: checkProduct })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const updateProduct = async function (req, res) {
    let data = req.body

    let productId = req.params.productId

    if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "Body should be not empty !" })

    if (!isValidObjectId(productId)) return res.status(400).send({ status: false, message: "Given productID is not valid" })

    let product = await productModel.findOne({ _id: productId, isDeleted: false })

    if (!product) return res.status(404).send({ status: false, message: "Product not found" })

    let productImage = req.files

    let { installments, availableSizes, currencyFormat, currencyId, price, title } = data

    if (title) {
        let uniqueTitle = await productModel.find({ title: title })
        if (uniqueTitle) {
            return res.status(400).send({ status: false, message: "title already exist" })
        }
    }

    if (price) {
        if (!(/^\d*\.?\d*$/).test(price)) {
            return res.status(400).send({ status: false, msg: "please provide valid price" })
        }
    }

    //currencyId => if value empty should not update 
    if (currencyId) {
        if (!(currencyId).includes("INR")) {
            return res.status(400).send({ status: false, message: "Currency ID must be INR" })
        }
    }

    if (currencyFormat) {
        if (!(currencyFormat).includes("₹")) {
            return res.status(400).send({ status: false, message: "currencyFormat  must be ₹" })
        }
    }

    if (productImage) {
        if (productImage.length > 0) {
            var uploadedFileURL = await uploadFile(productImage[0])
            //profileImage was available in req.files ; added new key in req.body.profileImage = uploadedFileURL
            req.body["productImage"] = uploadedFileURL
        }
    }

    if (availableSizes) {
        let s = availableSizes.split(",")
        let enumValue = ["S", "XS", "M", "X", "L", "XXL", "XL"]
        for (let i = 0; i < s.length; i++) {
            let f = enumValue.includes(s[i])
            if (f == false) {
                return res.status(400).send({ status: false, message: "availableSizes is missing or invalid : provide  S, XS, M, X, L, XXL, XL " })
            }
        }
        req.body["availableSizes"] = s
    }

    if (installments) {
        if (!/^\d+$/.test(installments)) {
            return res.status(400).send({ status: false, msg: "installments should be in number format" })
        }
    }
    let updatedProduct = await productModel.findOneAndUpdate({ _id: productId }, { $set: data }, { new: true })
    return res.status(200).send({ status: true, message: "Product updated successfully", data: updatedProduct })
}

const deleteProduct = async function (req, res) {
    try {
        let productId = req.params.productId

        if (!isValidObjectId(productId)) return res.status(400).send({ status: false, message: "ProductId is not Valid" })

        const findproduct = await productModel.findById(productId)

        if (!findproduct || findproduct.isDeleted == true) return res.status(404).send({ status: false, message: "product not found or is already deleted" })

        let DeletedProduct = await productModel.findByIdAndUpdate({ _id: productId }, { isDeleted: true, deletedAt: new Date() })

        return res.status(200).send({ status: true, message: " Product Deleted successfully " })
    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({ status: false, message: err.message })
    }
}


module.exports = { createProduct, getProduct, getProductByFilter, updateProduct, deleteProduct }