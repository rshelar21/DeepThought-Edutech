const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(`${process.env.MONGODB_URL}`).then(() => {
    console.log('Database is connected');
}).catch(err => {
    console.log(err);
})