const mongoose = require('mongoose');

const schema = mongoose.Schema;

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
    }

})



module.exports = mongoose.model('User', newusers)