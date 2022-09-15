const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    topic: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
    },
    description: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    imageSrc: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    publishedAt: {
        type: Date,
        default: Date.now(),
    },
    status: {
        type: Boolean,
        default: false,
    },
    views: {
        type: Number,
        default: 0,
    }
})

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;