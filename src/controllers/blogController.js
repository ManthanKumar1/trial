const AuthorModel = require("../models/authorModel")
const blogModel = require("../models/blogModel")
// const mongoose = require("mongoose")
// const ObjectId = mongoose.Schema.Types.ObjectId
const ObjectId = require('mongoose').Types.ObjectId;


const createBlog = async function (req, res) {
    try {
        let data = req.body

        if (!data.authorId) {
            return res.status(400).send({ status: false, msg: "Author id is required and must be valid" })
        }
        const authorCheck = await AuthorModel.findOne({ _id: req.body.authorId })
        if (!authorCheck) {
            return res.status(404).send({ status: false, msg: "No such data found" })
        }
        if (data.isPublished == true){
            data.publishedAt = Date.now()
        }

        const blog = await blogModel.create(data)

        res.status(201).send({ status: true, data: blog })
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

const getBlog = async function (req, res) {
    try {
        const query = req.query
    
        const blogs = await blogModel.find({ $and: [query, { isDeleted: false }, { isPublished: true }] })

        if (blogs.length == 0) {
            return res.status(404).send({ status: false })
        }
        res.status(200).send({ status: true, data: blogs })

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

const updateBlog = async function (req, res) {
    try {
        let param = req.params.blogId

        let data = req.body

        if(Object.keys(data).length==0){
       return res.status(404).send({ msg: "No data for Update" })
 }

        if (!param) {
           return res.status(400).send({ msg: "id is mandatory" })
        }
        let checkId = await blogModel.findById({_id: param})
        if (!checkId) {
            return res.status(404).send({ msg: "id is incorrect" })
        }
        if (checkId.isDeleted == true) {
           return res.status(404).send({ status: false, msg: "blog is already deleted" })
        }
        let data1 = await blogModel.updateMany({ _id: param, isPublished: true, isDeleted: false }, { title: data.title, body: data.body, $push: { tags: data.tags, subcategory: data.subcategory } }, { new: true })  //Skip

        res.status(200).send({ status: true, msg: data1 })
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

const deleteBlog = async function (req, res) {
    try {
        let id = req.params.blogId
        if (!id) {
            return res.status(400).send({ msg: "id is mandatory" })
        }
        let checkId = await blogModel.findById(id)
        if (!checkId) {
            return res.status(404).send({ msg: "id is incorrect" })
        }
        if (checkId.isDeleted == true) {
            return res.status(404).send({ status: false, msg: "blog is already deleted" })
        }
        let checkDelete = await blogModel.findOneAndUpdate({ _id: id }, { $set: { isDeleted: true } }, { new: true })
        res.status(200).send({ status: true })
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

const deleteBlogByQuery = async function (req, res) {
    try {
        let query = req.query

        if (Object.keys(query).length == 0) {
            return res.status(400).send({ status: false, msg: "Query Params cannot be empty" })
        }

        query.isDeleted = false

        let deleteBlogs = await blogModel.updateMany(query, { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true })

        if (deleteBlogs.matchedCount == 0) {
            return res.status(404).send({ status: false, msg: "Blog Not Found or deleated" })
        }

        res.status(200).send({ status: true, msg: "Document is deleted" })
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}


module.exports.createBlog = createBlog
module.exports.getBlog = getBlog
module.exports.updateBlog = updateBlog
module.exports.deleteBlog = deleteBlog
module.exports.deleteBlogByQuery = deleteBlogByQuery