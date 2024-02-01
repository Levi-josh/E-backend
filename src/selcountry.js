const express = require('express')
const route = express.Router()
const Countrylist = require('./countryschem')
const users = require('./Signupschema')

route.route('/').get(async (req, res) => {
    try {
        const newdata = await Countrylist.findone({ "id": req.body.id })
        await users.updateOne({ 'items._id': req.params.id1 }, { $set: { 'items.$.country': newdata } })
        res.status(201).json({ 'message': 'sent' })
        res.status(200).json('selected')
    } catch (err) {
        res.status(500).json(err)
    }


})

module.exports = route