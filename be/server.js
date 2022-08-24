require('dotenv').config;
const express = require('express');
var cors = require('cors');
const connectDB = require('./db/config')
const accountRoute = require('./routes/account');
const blogRoute = require('./routes/blog');

connectDB();

const app = express();

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 
}

app.use(cors(corsOptions));
app.use(express.json({limit: '50mb'}));
app.use('/account', accountRoute);
app.use('/blog', blogRoute);

const PORT = process.env.PORT || 5000 ;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));