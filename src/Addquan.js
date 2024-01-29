const express = require('express')
const route = express.Router()
const Countrylist = require('./countryschem')
const maincart = require('./Newcartsheme')
const users = require('./Signupschema')




route.route('/:id1/:id2').put(async (req, res) => {
    try {

        const myId = await users.findOne({ 'items.product._id': req.params.id1 }).exec()


        const a = myId.items
        const c = a.filter(prev => prev._id == req.params.id2)
        const d = c[0].product
        const e = d.filter(prev => prev._id == req.params.id1)


        const addquantity = await users.updateOne({ 'items.product._id': req.params.id1 }, { $set: { 'items.$.product.$.quantity': e[0]._id == req.params.id1 ? e[0].quantity + 1 : e[0].quantity } })
        const addsubtotal = await users.updateOne({ 'items.product._id': req.params.id1 }, { $set: { 'items.$.product.$.subtotal': e[0]._id == req.params.id1 ? e[0].subtotal + e[0].price : e[0].subtotal } })
        console.log(addquantity)
        res.json({ 'message': 'sent' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ 'error': err })
    }
})
module.exports = route

