const express = require('express')
const route = express.Router()
const user = require('./Signupschema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


route.route('/').get(async (req, res) => {

    const error = (err) => {

        let newerror = { username: '', password: '', other: '' }
        if (err.message == 'getaddrinfo ENOTFOUND ac-roubij3-shard-00-00.0fmc2gq.mongodb.net') {
            newerror.other = 'bad network'
        }
        return newerror
    }


    try {


        const mynewusers = await user.find()

        res.status(200).json(mynewusers)

    } catch (err) {
        const showerror = error(err)
        res.status(500).json(showerror)
    }


})

module.exports = route
