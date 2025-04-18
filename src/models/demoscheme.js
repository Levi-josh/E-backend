const mongoose = require('mongoose');

const schema = mongoose.Schema;

const newarrive = new schema({
    id: Number,
    image: String,
    itemname: String,
    rating:String,
    price: Number,
    description: String,
    subtotal: Number,
    quantity: Number
})

module.exports = mongoose.model('Getitem', newarrive)