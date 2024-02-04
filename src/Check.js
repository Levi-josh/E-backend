const express = require('express')
const route = express.Router()
const user = require('./Signupschema')

const shortid = require('shortid')

route.route('/:id').put(async (req, res) => {

    const error = (err) => {

        let newerror = { other: '' }
        if (err.message == 'getaddrinfo ENOTFOUND ac-roubij3-shard-00-00.0fmc2gq.mongodb.net') {
            newerror.other = 'bad network'
        }
        return newerror
    }


    try {
        const date = new Date()
        const newdate = date.toLocaleString()
        console.log(newdate)
        const code = shortid.generate()
        console.log(code)
        const ordercode = code.slice(6)
        console.log(ordercode)
        const result = await user.updateOne({ 'items._id': req.params.id }, { $set: { 'items.$.date': newdate } })
        const result2 = await user.updateOne({ 'items._id': req.params.id }, { $set: { 'items.$.ordercode': ordercode } })
        const result1 = await user.updateOne({ 'items._id': req.params.id }, { $set: { 'items.$.selected': false } })
        res.status(200).json(result)


    } catch (err) {
        const showerror = error(err)
        res.status(500).json(showerror)
    }


})

module.exports = route