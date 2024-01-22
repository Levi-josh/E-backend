const express = require('express')
const route = express.Router()
const maincart = require('./Newcartsheme')



route.route('/:id').delete(async (req, res) => {
    try {
        const filter = await maincart.deleteOne({ _id: req.params.id })
        res.status(201).json({ 'message': 'deleted' })

    } catch (err) {
        res.status(500).json({ 'error': err })

    }

})

module.exports = route

