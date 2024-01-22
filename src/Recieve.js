const express = require('express')
const route = express.Router()
const Item = require('./itemschema')

route.route('/').get(async (req, res) => {
    const myitems = await Item.find()
    res.status(200).json(myitems)

})

module.exports = route