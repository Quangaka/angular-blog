const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    }
})

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;