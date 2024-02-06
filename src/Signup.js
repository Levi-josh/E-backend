const express = require('express')
const route = express.Router()
const user = require('./Signupschema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

route.route('/').post(async (req, res) => {

    const error = (err) => {

        let newerror = { username: '', password: '', other: '' }

        if (err.message.includes('User validation failed')) {
            Object.values(err.errors).forEach(({ properties }) => {
                newerror[properties.path] = properties.message;
            })

        }
        if (err.code === 11000) {
            newerror.username = 'this user already exist'
        }
        if (err.code == 'EREFUSED') {
            newerror.other = 'bad network'
        }
        if (err.message == 'getaddrinfo ENOTFOUND ac-roubij3-shard-00-00.0fmc2gq.mongodb.net') {
            newerror.other = 'bad network'
        }
        return newerror
    }


    try {
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(req.body.password, salt)
        const date = new Date()
        const newtime = date.toLocaleTimeString()


        const mynewusers = await user.create({
            'username': req.body.username,
            'password': hash,
            'items': [],
            'history': [],
            'Notification': []
        })
        const message = `Hi ${mynewusers.username},welcome to Glamour Grove one of the best e-commerce shopping app which offers your the best services at a discount rate,do well to read more about as in our about page. `
        const newjwt = jwt.sign({ _id: mynewusers._id }, process.env.Access_Token, { expiresIn: '1d' })
        await user.updateOne({ _id: mynewusers._id }, { $push: { Notification: { 'note': message, 'time': newtime } } })

        res.cookie('jwt', newjwt, { maxAge: 86400000 })
        res.status(200).json(mynewusers)

    } catch (err) {
        const showerror = error(err)
        res.status(500).json(showerror)
    }


})

module.exports = route