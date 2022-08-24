const Blog = require('../models/Blog');



const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({status: true});
        
        res.json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server ERROR"});
    }
}

const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        res.json(blog);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: `No blog with id ${req.params.id}`});
    }
}

const createBlog = async (req, res) => {
    try {
        const blog = await Blog.create(req.body);
        res.status(200).json({ blog });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server ERROR"});
    }
}

const updateBlog = async (req, res) => {
    const { id: blogId } = req.params;
    try {
        const blog = await Blog.findOneAndUpdate({ _id: blogId}, req.body, { 
            new: true,
            runValidators: true,
        });

        res.json(blog);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: `No blog with id ${blogId}`});
    }
}

const deleteBlog = async (req, res) => {
    const { id: blogId } = req.params;
    try {
        const blog = await Blog.findOneAndDelete({_id: blogId});
        if(!blog) {
            res.status(500).json({message: `No blog with id ${blogId}`});
        }
        res.status(200).json({blog});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
}

const getBlogsByAuthorId = async (req, res) => {
    try {
        const blogs = await Blog.find({author: req.params.id});

        if(!blogs) {
            return res.status(500).json({ message: `Can not find blogs with ${req.body.id} user`})
        } else {
            res.json(blogs);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server ERROR"});
    }
}

const getBlogsByAuthorIdPublish = async (req, res) => {
    try {
        const blogs = await Blog.find({ id: req.params.id, status: true});

        if(!blogs) {
            return res.status(500).json({ message: `Can not find blogs with ${req.body.id} user`})
        } else {
            res.json(blogs);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server ERROR"});
    }
}

module.exports = {
    getAllBlogs,
    getBlogById,
    createBlog,
    getBlogsByAuthorId,
    getBlogsByAuthorIdPublish,
    updateBlog,
    deleteBlog,
}