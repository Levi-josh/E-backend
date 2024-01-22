const mongoose = require('mongoose');

const schema = mongoose.Schema;

const newarrive = new schema({
    image: String
})

module.exports = mongoose.model('Newarrival', newarrive)