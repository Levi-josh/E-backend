const mongoose = require('mongoose');

const schema = mongoose.Schema;

const countrylist = new schema({
    id: Number,
    country: String,

})

module.exports = mongoose.model('Countrylist', countrylist)