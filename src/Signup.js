const express = require('express')
const route = express.Router()
const user = require('./Signupschema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

route.route('/').post(async (req, res) => {

    const error = (err) => {
        console.log(err.code)
        let newerror = { username: '', password: '' }

        if (err.message.includes('User validation failed')) {
            Object.values(err.errors).forEach(({ properties }) => {
                newerror[properties.path] = properties.message;
            })

        }
        if (err.code === 11000) {
            newerror.username = 'this user already exist'
        }
        return newerror
    }


    try {
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(req.body.password, salt)

        const mynewusers = await user.create({
            'username': req.body.username,
            'password': hash,
            'items': []
        })
        const newjwt = jwt.sign({ _id: mynewusers._id }, process.env.Access_Token)
        console.log(newjwt)
        res.cookie('jwt', newjwt)
        res.status(200).json(mynewusers)

    } catch (err) {
        const showerror = error(err)
        res.status(500).json(showerror)
    }


})

module.exports = route