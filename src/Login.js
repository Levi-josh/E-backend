const express = require('express')
const route = express.Router()
const user = require('./Signupschema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

route.route('/').post(async (req, res) => {

    const error = (err) => {
        console.log(err.code)
        let newerror = { username: '', password: '', other: '' }

        if (err.message.includes('User validation failed')) {
            Object.values(err.errors).forEach(({ properties }) => {
                newerror[properties.path] = properties.message;
            })

        }
        if (err.message == 'incorrect password') {
            newerror.password = 'incorrect password'
        }
        if (err.message == 'there is no user with that name') {
            newerror.username = 'user not found'
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
        const token = req.cookies.jwt
        const myusers = await user.findOne({
            'username': req.body.username
        })

        if (myusers) {

            const hash = await bcrypt.compare(req.body.password, myusers.password)
            if (hash) {
                const newjwt = jwt.sign({ _id: myusers._id }, process.env.Access_Token, { expiresIn: '1d' })
                console.log(newjwt)
                res.cookie('jwt', newjwt, { maxAge: 86400000 })
                res.status(200).json(myusers)
            } else {
                throw new Error('incorrect password')
            }
        } else {
            throw new Error('there is no user with that name')
        }

        /* const hash = bcrypt.compare(req.body.password,)
 
         //  const mynewusers = await user.findOne({_id:})
         if (token) {
 
             const newjwt = jwt.verify(token, process.env.Access_Token, { expiresIn: '10s' })
 
         } else {
             throw new Error('unverified')
         }
 
         console.log(newjwt)
         res.cookie('jwt', newjwt, { maxAge: 10000 })
         res.status(200).json(mynewusers)*/

    } catch (err) {
        console.log(err)
        console.log(err.errors)
        console.log(err.message)
        console.log(err.code)
        console.log(err.Error)
        const showerror = error(err)
        res.status(500).json(showerror)
    }


})

module.exports = route