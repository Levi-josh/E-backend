const express = require('express')
const route = express.Router()
const Countrylist = require('./countryschem')
const maincart = require('./Newcartsheme')




route.route('/:id1/:id2').put(async (req, res) => {
    try {

        const myId = await maincart.findOne({ _id: req.params.id2 }).exec()
        console.log(myId)
        //const addquantity = await maincart.updateOne({ 'product._id': req.params.id2 }, { $set: { 'product.$.quantity': myId.product.quantity + 1 } })
        // console.log(addquantity)
        res.json({ 'message': 'sent' })
    } catch (err) {
        res.status(500).json({ 'error': err })
    }
})
module.exports = route

