const express = require('express')
const route = express.Router()
const Cartitem = require('./Cartschema')

route.route('/').post(async (req, res) => {
    try {
        const mycartitems = await Cartitem.find()
        res.status(200).json(mycartitems)
    } catch (err) {
        res.status(500).json(err)
    }


})

module.exports = route