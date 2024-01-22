const express = require('express')
const route = express.Router()
const maincart = require('./Newcartsheme')


route.route('/:id').put(async (req, res) => {
    try {


        const filter = await maincart.findOne({ _id: req.params.id })

        const findothers = await maincart.find()
        /*const changeothers = findothers.filter(prev => prev._id !== filter._id)
 
        //const filtered = changeothers.map(prev => ({ updateone: { filter: prev._id, update: { $set: { 'selected': false } } } }))
        //await maincart.bulkWrite(filtered)
        //console.log(filtered)*/

        for (let findother of findothers) {
            const filter = await maincart.findOne({ _id: req.params.id })

            const updateselect = { $set: { 'selected': findother._id == req.params.id ? !filter.selected : false } }
            await maincart.updateOne({ _id: findother._id }, updateselect)


        }
        // const findselect = await maincart.updateOne({ _id: req.params.id }, { $set: { 'selected': !filter.selected } })

        //console.log(findselect)
        res.status(201).json({ 'message': 'sent' })
    } catch (err) {
        res.status(500).json(err)
    }

})

module.exports = route
