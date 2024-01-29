const express = require('express')
const route = express.Router()
const maincart = require('./Newcartsheme')
const users = require('./Signupschema')

route.route('/:id').put(async (req, res) => {
    try {



        const findothers1 = await users.findOne({ 'items._id': req.params.id })
        const findothers = findothers1.items


        /*const changeothers = findothers.filter(prev => prev._id !== filter._id)
 
        //const filtered = changeothers.map(prev => ({ updateone: { filter: prev._id, update: { $set: { 'selected': false } } } }))
        //await maincart.bulkWrite(filtered)
        //console.log(filtered)*/

        /*  for (let findother of findothers) {
              const filter = await maincart.findOne({ _id: req.params.id })
  
              const updateselect = { $set: { 'selected': findother._id == req.params.id ? !filter.selected : false } }
              await maincart.updateOne({ _id: findother._id }, updateselect)
  
  
          }*/
        const filter = await users.findOne({ 'items._id': req.params.id })
        const newfilter = filter.items.filter(prev => prev._id == req.params.id)



        for (let findother of findothers) {
            console.log(findother._id == req.params.id)
            const updateselect = { $set: { 'items.$.selected': findother._id == req.params.id ? !findother.selected : false } }
            await users.updateOne({ 'items._id': findother._id }, updateselect)


        }
        // const findselect = await maincart.updateOne({ _id: req.params.id }, { $set: { 'selected': !filter.selected } })

        //console.log(findselect)
        res.status(201).json({ 'message': 'sent' })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)

    }

})

module.exports = route
