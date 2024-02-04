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


        const result1 = await user.updateOne({ 'items._id': req.params.id, 'items.progressbar._id': req.params.id1 }, { $set: { 'items.$.progressbar.$[elem].progess': true } }, { arrayFilters: [{ 'elem._id': req.params.id1 }] })

        res.status(200).json(result1)

    } catch (err) {
        const showerror = error(err)
        res.status(500).json(showerror)
    }


})

module.exports = route