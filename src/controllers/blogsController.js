const blogsModel = require("../models/blogsModel")
const { validString } = require("../validations/validators")
const { isValidObjectId } = require('mongoose')

//-------------------------------Create new Blog API--------------------------------------------------//

const createBlog = async (req, res) => {
    try {
        const { authorId } = req.params
        let { title, category, content } = req.body
        //validations for data 
        if (Object.keys(req.body).length == 0) return res.status(400).send({ status: false, message: "Enter Required Data" })
        if (!title) return res.status(400).send({ status: false, message: "Enter title" })
        if (!validString(title)) return res.status(400).send({ status: false, message: "title should be a string" })
        if (!category) return res.status(400).send({ status: false, message: "Enter category" })
        if (!validString(category)) return res.status(400).send({ status: false, message: "category should be a string" })
        if (!content) return res.status(400).send({ status: false, message: "Enter content" })
        //creating authorID of existing user
        req.body.authorId = authorId
        //creating new blog
        let createBlog = await blogsModel.create(req.body)
        return res.status(201).send({ status: true, message: "Blog successfully created", createBlog })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: `Server Error:${error.message}` })
    }
}

//----------------------------------get all API----------------------------------------------------//

const getAllBlogs = async (req, res) => {
    try {
        //getting all the blogs 
        const getBlogs = await blogsModel.find({ isDeleted: false })
        //handling situation if theres no blogs 
        if (getBlogs.length == 0) return res.status(404).send({ status: false, message: 'No blog found' })
        return res.status(200).send({ status: true, message: 'Blogs List', total: getBlogs.length, data: getBlogs })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: `Server Error:${error.message}` })
    }
}

//----------------------------------get Blog By Id API----------------------------------------------------//

const getBlogById = async (req, res) => {
    try {
        const { blogId } = req.params
        //Getting blog by Id 
        const getBlogById = await blogsModel.findOne({ _id: blogId, isDeleted: false })
        if (!getBlogById) return res.status(404).send({ status: false, message: 'Blog Does not Exist' })
        return res.status(200).send({ status: true, message: 'Blog Details', data: getBlogById })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: `Server Error:${error.message}` })
    }
}

//----------------------------------Update Blog API----------------------------------------------------//

const updateBlogById = async (req, res) => {
    try {
        const { blogId } = req.params
        //here checking wheather blogId is Available or not
        const findBlog = await blogsModel.findOne({ _id: blogId, isDeleted: false })
        if (!findBlog) return res.status(404).send({ status: false, message: "Blog Does not Exist" })
        let { title, category, content } = req.body
        if (Object.keys(req.body).length == 0) return res.status(400).send({ status: false, message: "Enter some Data to update" })
        if (!validString(title)) return res.status(400).send({ status: false, message: "title should be a string" })
        if (!validString(category)) return res.status(400).send({ status: false, message: "category should be a string" })
        // update blog document
        let updateBlog = await blogsModel.findOneAndUpdate({ _id: blogId }, { $set: req.body }, { new: true })
        return res.status(200).send({ status: true, message: 'Blog is updated', updateBlog })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: `Server Error:${error.message}` })
    }
}

//----------------------------------Delete Blog API----------------------------------------------------//

const deleteBlogById = async (req, res) => {
    try {
        const { blogId } = req.params
        //checking for valid blog id
        if (!isValidObjectId(blogId)) return res.status(400).send({ status: false, message: "Enter Valid Blog Id" })
        //checking wheather id is available
        const findBlog = await blogsModel.findById({ _id: blogId })
        if (!findBlog) return res.status(404).send({ status: false, message: "Blog Does not Exist" })
        if (findBlog.isDeleted) return res.status(400).send({ status: false, message: "Blog is already Deleted" })
        //deleting blog by its Id 
        const deletetask = await blogsModel.findOneAndUpdate({ _id: blogId, isDeleted: false }, { $set: { isDeleted: true } })
        return res.status(200).send({ status: true, message: "Blog is deleted" })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: `Server Error:${error.message}` })
    }
}

//------------------------------------------------------------------------------------------//

module.exports = { createBlog, getAllBlogs, getBlogById, updateBlogById, deleteBlogById }
