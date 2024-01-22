const mongoose = require('mongoose');

const schema = mongoose.Schema;

const myusers = new schema({
    firstname: String,
    lastname: String
})

module.exports = mongoose.model('Item', myusers)

