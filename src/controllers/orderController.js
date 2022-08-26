
const OrderModel = require("../models/orderModel")
const mid = require("../middlewares/commonMiddlewares")
const userModel = require("../models/userModel")
const productModel = require("../models/productModel")

const createBook= async function (req, res) {
    let data= req.body

    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}

const createOrder = async function (req, res, next){
    let data = req.body
    let header = req.headers.isfreeappuser
    
    let checkUser = await userModel.findById({_id: data.userId})
    if(!checkUser){
        return res.send({msg: "user id is invalid"})
    }
    let checkProduct = await productModel.findById({_id: data.productId})
    if (!checkProduct){
        return res.send({msg: "product id is invalid"})
    }

    if(checkUser['balance']>=data['amount']){
        let update = await OrderModel.updateMany(
        {isFreeAppUser: false},
        {$set: {amount: userModel['balance'] - productModel['price']}}
        )
    } else if (checkUser['balance']<data['amount']){
        res.send({msg: "user doesn't have enough balance"})
    } else if (header == true){
        next()
    }
    console.log({data: data, isFreeAppUser: header})
    let final = await OrderModel.create(data)
    res.send("see terminal")

}




const getBooksData = async function (req, res) {
    let allBooks = await BookModel.find({ authorName: "HO" })
    console.log(allBooks)
    if (allBooks.length > 0) res.send({ msg: allBooks, condition: true })
    else res.send({ msg: "No books found", condition: false })
}


const updateBooks = async function (req, res) {
    let data = req.body // {sales: "1200"}
    // let allBooks= await BookModel.updateMany( 
    //     { author: "SK"} , //condition
    //     { $set: data } //update in data
    //  )
    let allBooks = await BookModel.findOneAndUpdate(
        { authorName: "ABC" }, //condition
        { $set: data }, //update in data
        { new: true, upsert: true } ,// new: true - will give you back the updated document // Upsert: it finds and updates the document but if the doc is not found(i.e it does not exist) then it creates a new document i.e UPdate Or inSERT
    )

    res.send({ msg: allBooks })
}

const deleteBooks = async function (req, res) {
    // let data = req.body 
    let allBooks = await BookModel.updateMany(
        { authorName: "FI" }, //condition
        { $set: { isDeleted: true } }, //update in data
        { new: true } ,
    )

    res.send({ msg: allBooks })
}



const totalSalesPerAuthor = async function (req, res) {
    // let data = req.body 
    let allAuthorSales = await BookModel.aggregate(
        [
            { $group: { _id: "$authorName", totalNumberOfSales: { $sum: "$sales" } } },
            { $sort: { totalNumberOfSales: -1 } }
        ]
    )

    res.send({ msg: allAuthorSales })
}




// CRUD OPERATIONS:
// CREATE
// READ
// UPDATE
// DELETE



module.exports.createBook = createBook
module.exports.getBooksData = getBooksData
module.exports.updateBooks = updateBooks
module.exports.deleteBooks = deleteBooks
module.exports.totalSalesPerAuthor = totalSalesPerAuthor

module.exports.createOrder = createOrder