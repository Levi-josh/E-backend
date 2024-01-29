
const express = require('express')
const route = express.Router()
const maincart = require('./Newcartsheme')
const Getitem = require('./demoscheme')
const users = require('./Signupschema')




route.route('/:id1/:id2').post(async (req, res) => {
    /*
        try {
            const newdata = await Getitem.findOne({ _id: req.params.id2 }).exec()
            const newdata1 = await maincart.findOne({ _id: req.params.id1 }).exec()
    
            const result = newdata1.selected ? await maincart.updateOne({ _id: req.params.id1 }, { $push: { product: newdata } }) : res.json({ 'message': 'you must select a cart' })
    
            res.status(201).json({ 'message': 'sent' })
        } catch (err) {
            res.status(500).json(err)
    
        }*/

    try {
        const newdata = await Getitem.findOne({ _id: req.params.id2 }).exec()
        const newdata1 = await users.findOne({ 'items._id': req.params.id1 }).exec()
        const a = newdata1.items.filter(prev => prev._id == req.params.id1)
        const b = a[0]

        if (b.selected) {
            await users.updateOne({ 'items._id': req.params.id1 }, { $push: { 'items.$.product': newdata } })
            res.status(201).json({ 'message': 'sent' })
        }
        else {
            throw new Error('you must select a cart')
        }


    } catch (err) {

        res.status(500).json(err.message)

    }
})
module.exports = route
