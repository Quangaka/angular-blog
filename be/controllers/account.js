const Account = require('../models/Account');
const jwt = require('jsonwebtoken');
require('dotenv').config;

const signUp = async (req, res) => {
    const account = await Account.findOne(req.body);
    if(!account) {
        try {
            const account = await Account.create(
                req.body
            )
            return res.status(200).json({account})
        } catch (error) {
            console.log(error);
            return res.status(400).json({ status: 'error', message: error.message })
        }
    } else {
        return res.status(400).json({ status: 'error', error: 'Username already in use' })
    }
    
}

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const account = await Account.findOne({ username: username, password: password});
        if (account) {
            const token = jwt.sign(
                {
                    id: account._id,
                    username,
                },
                process.env.TOKEN_KEY,
            )
            account.token = token;
            account.update();
            return res.status(201).json(account);
        } else {
            res.status(400).json({ status: 'error', error: 'Invalid username/password' })
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message})
    }
}

const getAccountById = async (req, res) => {
    try {
        const account = await Account.findById(req.params.id);

        res.json(account);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: `No account with id ${req.params.id}`});
    }
}

module.exports = {
    signUp, login, getAccountById
}