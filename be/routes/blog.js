const express = require('express');
const router = express.Router();
const { getAuthorByBlogId } = require('../controllers/account')
const { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog, getAllBlogsByTopic } = require('../controllers/blog');

router.route('/').get(getAllBlogs).post(createBlog);
router.route('/:id').get(getBlogById).patch(updateBlog).delete(deleteBlog);

module.exports = router;