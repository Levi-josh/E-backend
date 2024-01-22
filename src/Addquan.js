const express = require('express')
const route = express.Router()
const Countrylist = require('./countryschem')
const maincart = require('./Newcartsheme')




route.route('/:id1').put(async (req, res) => {
    try {

        const myId = await maincart.findOne({ 'product._id': req.params.id1 }).exec()
        const a = myId.product.filter(prev => prev._id == req.params.id1)
        console.log(a)

        const addquantity = await maincart.updateOne({ 'product._id': req.params.id1 }, { $set: { 'product.$.quantity': a._id === req.params.id1 ? a.quantity + 1 : 1 } })
        console.log(addquantity)
        res.json({ 'message': 'sent' })
    } catch (err) {
        res.status(500).json({ 'error': err })
    }
})
module.exports = route

