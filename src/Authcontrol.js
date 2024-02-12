const express = require('express')
const route = express.Router()
const user = require('./Signupschema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const Auth = async (req, res, next) => {

    const error = (err) => {
        console.log(err.code)
        let newerror = { other: '', password: '' }

        if (err.message.includes('User validation failed')) {
            Object.values(err.errors).forEach(({ properties }) => {
                newerror[properties.path] = properties.message;
            })

        }
        if (err.code === 11000) {
            newerror.username = 'this user already exist'
        }
        if (err.message === 'unverified') {
            newerror.other = 'you dont have access to this,try logging in again '
        }
        return newerror
    }


    try {

        const token = req.cookies.jwt
        console.log(token)



        if (token) {

            jwt.verify(token, process.env.Access_Token, async (err, decoded) => {
                if (err) {

                    console.log(err)
                    throw new Error(err)

                } else {
                    console.log(decoded)
                    const newjwt = jwt.sign({ _id: decoded._id }, process.env.Access_Token)
                    res.cookie('jwt', newjwt)
                    next()
                }

            })
        }
        else {
            throw new Error('unverified')

        }



    } catch (err) {
        console.log(err.message)
        const showerror = error(err)
        //console.log(showerror)
        res.status(500).json(showerror)
    }


}

module.exports = { Auth }