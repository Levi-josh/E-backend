const express = require('express')
const route = express.Router()
const Cartitem = require('./Cartschema')

route.route('/').post(async (req, res) => {
    const mycartitems = await Cartitem.create({
        'id': req.body.id,
        'image': req.body.image,
        'itemname': req.body.itemname,
        'rating': req.body.rating,
        'price': req.body.price,
        'description': req.body.description
    })
    res.status(200).json(mycartitems)

})

module.exports = route