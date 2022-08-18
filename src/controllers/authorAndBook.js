const Author = require("../models/author")
const Book = require("../models/book")


const createBook = async function(req, res){
    let book = req.body
    let books = await Book.create(book)
    res.send({bookDetails: books})
}

const createAuthor = async function(req, res){
    let author = req.body
    let authors = await Author.create(author)
    res.send({authorDetails: authors})
}


const showAuthor = async function(req,res){
    let authors = await Book.find({author_name: "Chetan Bhagat"})
    let books = await Book.find({author_id: {$eq: authors[0].author_id}})
    res.send({showBooks: books})
}


const findAuthor = async function(req,res){
    let books = await Book.findOneAndUpdate(
        {name: "Two states"},
        {$set: {price:100}},
        {new: true}
        )
    let prices = books.price
    let authors = await Author.find({author_id: {$eq: books.author_id}}).select({author_name:1, _id: 0})
        res.send({showUpdate: authors, prices})
}


const bookCost = async function(req,res){
    let books = await Book.find( { price : { $gte: 50, $lte: 100} } )
    let x= books.map(a=> a.author_id)
    let authors = await Author.find({author_id : x}).select({author_name:1, author_id:1, _id: 0})
    res.send({details: authors})
}

module.exports.createBook= createBook
module.exports.createAuthor= createAuthor
module.exports.showAuthor= showAuthor
module.exports.findAuthor= findAuthor
module.exports.bookCost= bookCost