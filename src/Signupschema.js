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

const newusers = new schema({
    username: {
        type: String,
        required: [true, 'Enter a username'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Enter a password'],
        minlength: [6, 'password must be more than 6 characters']
    },
    items: [maincart],
    history: [],
    favorites: []
})



module.exports = mongoose.model('User', newusers)