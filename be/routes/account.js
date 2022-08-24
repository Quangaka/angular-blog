const express = require('express');
const router = express.Router();
const { signUp, login, getAccountById } = require('../controllers/account');
const { getBlogsByAuthorId } = require('../controllers/blog')

router.route('/sign-up').post(signUp);
router.route('/login').post(login);
router.route('/blog/:id').get(getBlogsByAuthorId);
router.route('/user/:id').get(getAccountById);

module.exports = router;