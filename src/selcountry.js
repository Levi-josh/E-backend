const express = require('express')
const route = express.Router()
const Countrylist = require('./countryschem')

route.route('/').get(async (req, res) => {
    try {
        const mynewcollections = await Countrylist.findone({ "id": req.body.id })

        res.status(200).json(mynewcollections)
    } catch (err) {
        res.status(500).json(err)
    }


})

module.exports = route