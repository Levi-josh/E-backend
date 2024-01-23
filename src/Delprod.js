const express = require('express')
const route = express.Router()
const maincart = require('./Newcartsheme')



route.route('/:id').delete(async (req, res) => {
    try {

        const myId = await maincart.findOne({ 'product._id': req.params.id }).exec()
        const a = myId.product.filter(prev => prev._id == req.params.id)
        const b = a[0]

        const filter = await maincart.updateOne({ 'product._id': req.params.id }, { $pull: { product: b } })
        console.log(filter)
        res.status(201).json({ 'message': 'deleted' })

    } catch (err) {
        res.status(500).json({ 'error': err })

    }

})

module.exports = route