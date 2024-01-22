
const express = require('express')
const route = express.Router()
const maincart = require('./Newcartsheme')
const Getitem = require('./demoscheme')




route.route('/:id1/:id2').post(async (req, res) => {

    try {
        const newdata = await Getitem.findOne({ _id: req.params.id2 }).exec()
        const newdata1 = await maincart.findOne({ _id: req.params.id1 }).exec()

        const result = newdata1.selected ? await maincart.updateOne({ _id: req.params.id1 }, { $push: { product: newdata } }) : res.json({ 'message': 'you must select a cart' })

        res.status(201).json({ 'message': 'sent' })
    } catch (err) {
        res.status(500).json({ 'error': err })

    }
})
module.exports = route
