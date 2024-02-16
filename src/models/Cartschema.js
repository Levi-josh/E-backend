const mongoose = require('mongoose');

const schema = mongoose.Schema;

const cartitem = new schema({
    id: Number,
    image: String,
    itemname: String,
    rating: Number,
    price: Number,
    description: String,
    subtotal: Number,
    quantity: Number

})

module.exports = mongoose.model('Cartitem', cartitem)