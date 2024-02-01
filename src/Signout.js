const express = require('express')
const route = express.Router()
const user = require('./Signupschema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


route.route('/').get(async (req, res) => {

    const error = (err) => {

        let newerror = { username: '', password: '', other: '' }

        if (err.message == 'you are not logged in') {
            newerror.other = 'you are not logged in'
        }
        if (err.message == 'getaddrinfo ENOTFOUND ac-roubij3-shard-00-00.0fmc2gq.mongodb.net') {
            newerror.other = 'bad network'
        }
        return newerror
    }


    try {
        const token = req.cookies.jwt


        if (token) {


            res.cookie('jwt', '', { maxAge: 1000 })
            res.status(200).json("you've been logged out")

        } else {
            throw new Error('you are not logged in')
        }
    } catch (err) {
        const showerror = error(err)
        res.status(500).json(showerror)
    }


})

module.exports = route