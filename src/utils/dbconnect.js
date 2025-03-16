const mongoose = require('mongoose')
const users = require('../models/Signupschema')

const mongodb = async () => {
    try {
        await mongoose.connect(process.env.database)
        await users.createIndexes();
    } catch (err) {
        console.log(err)
    }
}

module.exports = mongodb