const express = require('express')
const route = express.Router()
const maincart = require('./Newcartsheme')
const users = require('./Signupschema')


route.route('/:id/:id1').delete(async (req, res) => {
    try {

        const myId = await users.findOne({ 'items.product._id': req.params.id }).exec()

        const a = myId.items.filter(prev => prev._id == req.params.id1)
        const b = a[0].product.filter(prev => prev._id == req.params.id)
        const c = b[0]
        console.log(c)
        const filter = await users.updateOne({ 'items._id': req.params.id1 }, { $pull: { 'items.$.product': c } })
        console.log(filter)
        res.status(201).json({ 'message': 'deleted' })

    } catch (err) {
        res.status(500).json({ 'error': err })

    }

})

module.exports = route