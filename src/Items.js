const express = require('express')
const route = express.Router()
const Item = require('./itemschema')

route.route('/').post(async (req, res) => {
    const myitems = await Item.create({
        'firstname': req.body.firstname,
        "lastname": req.body.lastname
    })
    res.status(200).json(myitems)

})

module.exports = route
