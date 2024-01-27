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
        const token = req.cookies.jwt
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(req.body.password, salt)

        //  const mynewusers = await user.findOne({_id:})
        if (token) {

            const newjwt = jwt.verify(token, process.env.Access_Token, { expiresIn: '10s' })

        } else {
            throw new Error('unverified')
        }

        console.log(newjwt)
        res.cookie('jwt', newjwt, { maxAge: 10000 })
        res.status(200).json(mynewusers)

    } catch (err) {
        console.log(err.message)
        const showerror = error(err)
        res.status(500).json(showerror)
    }


})

module.exports = route