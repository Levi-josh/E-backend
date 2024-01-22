const express = require('express')
const route = express.Router()
const maincart = require('./Newcartsheme')

route.route('/:id').get(async (req, res) => {

    try {

        const items = await maincart.findOne({ 'id': req.params.id })
        res.status(200).json(items)


    } catch (err) {
        res.status(500).json(err)

    }


})
