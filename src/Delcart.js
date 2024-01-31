const express = require('express')
const route = express.Router()
const maincart = require('./Newcartsheme')
const users = require('./Signupschema')


route.route('/:id').delete(async (req, res) => {
    try {
        const filter = await users.findOne({ 'items._id': req.params.id })
        const filtered = filter.items.filter(prev => prev._id == req.params.id)

        const filter1 = await users.updateOne({ _id: filter._id }, { $pull: { items: filtered[0] } })
        console.log(filter1)
        res.status(201).json({ 'message': 'deleted' })


    } catch (err) {
        console.log(err.message)
        res.status(500).json({ 'error': err })

    }

})

module.exports = route

