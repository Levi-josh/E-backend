const mongoose = require('mongoose');

const schema = mongoose.Schema;

const product = new schema({
    id: Number,
    image: String,
    itemname: String,
    rating: Number,
    price: Number,
    description: String,
    subtotal: Number,
    quantity: Number


})

const country = new schema({
    id: Number,
    country: String,
    checked: Boolean
})

const progessbar = new schema({
    id: Number,
    proname: String,
    progess: Boolean

})
const maincart = new schema({
    id: Number,
    selected: Boolean,
    title: String,
    product: [product],
    country: [country],
    progressbar: [progessbar],
    total: Number,
    date: String
})

module.exports = mongoose.model('Newcart', maincart)