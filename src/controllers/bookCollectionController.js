const BookCollection= require("../models/bookCollection")

const createBook = async function(req, res){
    let book = req.body
    let books = await BookCollection.create(book)
    res.send({bookDetails: books})
}


const bookList = async function(req,res){
    let books = await BookCollection.find().select({bookName: 1, authorName:1, _id:0})
    res.send({bookDetails: books})
}


const getBooksInYear = async function(req,res){
    let year = req.query
    let books = await BookCollection.find(year)
    res.send({bookDetails: books})
}


const getParticularBooks = async function(req,res){
    let userInput = req.query
    let books = await BookCollection.find(userInput)
    res.send({bookDetails: books})
}


const getXINRBooks = async function(req,res){
    let books = await BookCollection.find({
        $or: [{price: {indianPrice: "100INR", europeanPrice: "1EU"}}, {price: {indianPrice: "200INR", europeanPrice: "2EU"}}, {price: {indianPrice: "500INR", europeanPrice: "5EU"}}]
    })
    res.send({bookDetails: books})
}


const getRandomBooks = async function(req,res){
    let books = await BookCollection.find({stockAvailable: true, totalPages:{$gte:500}})
    res.send({bookDetails: books})
}


module.exports.createBook= createBook
module.exports.bookList= bookList
module.exports.getBooksInYear= getBooksInYear
module.exports.getParticularBooks= getParticularBooks
module.exports.getXINRBooks= getXINRBooks
module.exports.getRandomBooks= getRandomBooks