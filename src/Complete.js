const express = require('express')
const route = express.Router()
const user = require('./Signupschema')



route.route('/:id/:id1').put(async (req, res) => {

    const error = (err) => {

        let newerror = { other: '' }
        if (err.message == 'getaddrinfo ENOTFOUND ac-roubij3-shard-00-00.0fmc2gq.mongodb.net') {
            newerror.other = 'bad network'
        }
        return newerror
    }


    try {

        const myuser = await user.findOne({ 'items._id': req.params.id })
        const cart = myuser.items.filter(prev => prev._id == req.params.id)
        const result = await user.updateOne({ _id: req.params.id1 }, { $push: { favorites: cart[0] } })
        const result1 = await user.updateOne({ 'items._id': req.params.id }, { $set: { 'items.$.selected': true } })
        res.status(200).json(result1)

    } catch (err) {
        console.log(err.message)
        const showerror = error(err)
        res.status(500).json(showerror)
    }


})

module.exports = route