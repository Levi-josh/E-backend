const express = require('express')
const route = express.Router()
const user = require('./Signupschema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const Auth = async (req, res, next) => {

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
        console.log(token)

        if (token) {

            const newjwt = jwt.verify(token, process.env.Access_Token, async (err, decoded) => {
                if (err) {
                    console.log(err.message)
                    // throw new Error('unauthorized')
                } else {
                    console.log(decoded)
                }

            })

            res.cookie('jwt', newjwt)

            next()

        } else {
            // throw new Error('unverified')
        }



    } catch (err) {
        console.log(err.message)
        const showerror = error(err)
        res.status(500).json(err.message)
    }


}

module.exports = { Auth }