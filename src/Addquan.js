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

        const f = e[0]
        const addquantity = await users.updateOne({ 'items._id': req.params.id2, 'items.product._id': req.params.id1 }, { $set: { 'items.$.product.$[elem].quantity': f._id == req.params.id1 ? f.quantity + 1 : f.quantity } }, { arrayFilters: [{ 'elem._id': req.params.id1 }] })
        const addsubtotal = await users.updateOne({ 'items._id': req.params.id2, 'items.product._id': req.params.id1 }, { $set: { 'items.$.product.$[elem].subtotal': f._id == req.params.id1 ? f.subtotal + f.price : f.subtotal } }, { arrayFilters: [{ 'elem._id': req.params.id1 }] })

        res.json({ 'message': 'sent' })
    } catch (err) {
        console.log(err.message)
        res.status(500).json(err.message)
    }
})
module.exports = route

