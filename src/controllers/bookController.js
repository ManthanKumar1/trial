const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const publisherModel = require("../models/publisherModel")

const createBook= async function (req, res) {
    let book =req.body
    let {name, author, price, ratings, publisher} = book

    if (!author) {
        return res.send({msg : "author id is mandatory" }) 
    }
    let checkAuthor = await authorModel.findById(author)
    
    if (!checkAuthor) {
        return res.send({msg : 'author does not exist'})
    }
    
    if (!publisher) {
        return res.send({msg : "published is mandatory"})
    }
    let checkPublisher = await publisherModel.findById(publisher)
    
    if (!checkPublisher){
        return res.send({msg: "publisher does not exist"})
    }
    
    let bookCreated = await bookModel.create(book)
    res.send({data: bookCreated})
}

const getBooksData= async function (req, res) {
    let books = await bookModel.find()
    res.send({data: books})
}

const getBooksWithAllDetails = async function (req, res) {
    let specificBook = await bookModel.find().populate('author').populate('publisher')
    res.send({data: specificBook})

}

const hardCover = async function(req,res){
    let publisherName = await publisherModel.find({$or: [{name: "Penguin"}, {name: "HarperCollins"}]}).select({_id: 1})
    let coverUpdate = await bookModel.updateMany(
        {$or: [{publisher: publisherName[0]._id}, {publisher: publisherName[1]._id}]},
        {$set: {isHardCover: true}},
        {new: true}
    )
    let authorName = await authorModel.find({rating: {$gt: 3.5}}).select({_id: 1})
    let priceUpdate = await bookModel.updateMany(
        {$or: [{author: authorName[0]._id}, {author: authorName[1]._id}]},
        {$inc: {price: 10}},
        {new: true}
    )
    res.send({msg: coverUpdate, priceUpdate})
}



module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.getBooksWithAllDetails = getBooksWithAllDetails
module.exports.hardCover = hardCover
