const express = require('express')
const route = express.Router()
const Countrylist = require('./countryschem')
const maincart = require('./Newcartsheme')



route.route('/:id').put(async (req, res) => {
    try {

        const myId = await maincart.findOne({ _id: req.params.id })

        myId.quantity >= 1 ? await maincart.updateOne({ _id: myId._id }, { $set: { 'product.$.quantity': myId.quantity - 1 } }) : res.json({ 'message': 'error' })
    } catch (err) {
        res.status(500).json({ 'error': err })
    }

})


module.exports = route

