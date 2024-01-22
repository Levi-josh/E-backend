const mongoose = require('mongoose');

const schema = mongoose.Schema;

const newarrive = new schema({
    username: String
})

module.exports = mongoose.model('Getitem', newarrive)