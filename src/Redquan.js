const express = require('express')
const route = express.Router()
const Countrylist = require('./countryschem')
const maincart = require('./Newcartsheme')


route.route('/:id1').put(async (req, res) => {
    try {

        const myId = await maincart.findOne({ 'product._id': req.params.id1 }).exec()
        const a = myId.product.filter(prev => prev._id == req.params.id1)
        const b = a[0]
        if (b.quantity > 1) {
            const addquantity = await maincart.updateOne({ 'product._id': req.params.id1 }, { $set: { 'product.$.quantity': b._id == req.params.id1 ? b.quantity - 1 : b.quantity } })
            const addsubtotal = await maincart.updateOne({ 'product._id': req.params.id1 }, { $set: { 'product.$.subtotal': b._id == req.params.id1 ? b.subtotal - b.price : b.subtotal } })
            console.log(addquantity)
            res.json({ 'message': 'sent' })
        } else {
            res.json({ 'message': 'you cant select a number less than one' })
        }

    } catch (err) {
        res.status(500).json({ 'error': err })
    }
})
module.exports = route

