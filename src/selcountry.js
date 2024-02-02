const express = require('express')
const route = express.Router()
const Countrylist = require('./countryschem')
const users = require('./Signupschema')

route.route('/').put(async (req, res) => {
    try {
        const newdata = await Countrylist.findOne({ _id: req.body.id })
        await users.updateOne({ 'items._id': req.body.id1 }, {
            $set: { 'items.$.country': newdata.country }

        })
        console.log(newdata)
        res.status(201).json(newdata)

    } catch (err) {
        console.log(err.message)
        res.status(500).json(err)
    }


})

module.exports = route