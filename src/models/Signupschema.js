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
const notify = new schema({
    note: String,
    time: String
})
const paymentmethod = new schema({
    payname: String,
checked:Boolean
})

const newship = new schema({
    name: String,
    price: Number,
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
    country: String,
    progressbar: [progessbar],
    total: Number,
    date: String,
    itemspurch: Number,
    shipping: [newship],
    Paymethod: [paymentmethod],
    payment: String,
    shipvalue: {
        name: String,
        price: Number,
        checked: Boolean
    },
    ordercode: String,
    time: String

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
    history: [maincart],

    Notification: [notify]

})



module.exports = mongoose.model('User', newusers)