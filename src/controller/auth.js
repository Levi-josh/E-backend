const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const users = require('../models/Signupschema')

const login = async (req, res, next) => {
    try {
        const myusers = await users.findOne({
            'username': req.body.username
        })
        if (myusers) {
            const hash = await bcrypt.compare(req.body.password, myusers.password)
            if (hash) {
                const newjwt = jwt.sign({ _id: myusers._id }, process.env.Access_Token,/* { expiresIn: '2 days' }*/)
                console.log(newjwt)
                res.cookie('jwt', newjwt, /*{ maxAge: 100000 }*/)
                res.status(200).json({'message':'you are logged in'})
            } else {
                throw new Error('incorrect password')
            }
        } else {
            throw new Error('there is no user with that name')
        }

    } catch (err) {
        next(err)
    }
}

const signup = async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(req.body.password, salt)
        const date = new Date()
        const newtime = date.toLocaleTimeString()


        const mynewusers = await users.create({
            'username': req.body.username,
            'password': hash,
            'items': [],
            'history': [],
            'Notification': []
        })
        const message = `Hi ${mynewusers.username},welcome to Glamour Grove one of the best e-commerce shopping app which offers your the best services at a discount rate,do well to read more about as in our about page. `

        await users.updateOne({ _id: mynewusers._id }, { $push: { Notification: { 'note': message, 'time': newtime } } })
        const newjwt = jwt.sign({ _id: mynewusers._id }, process.env.Access_Token,/* { expiresIn: '2 days' }*/)

        res.cookie('jwt', newjwt, /*{ maxAge: 100000 }*/)
        res.status(200).json({'message':'User created'})

    } catch (err) {
        next(err)
    }
}

const logout = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        if (token) {


            res.cookie('jwt', '', { maxAge: 1000 })
            res.status(200).json("you've been logged out")
        } else {
            throw new Error('you are not logged in')
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    login,
    signup,
    logout
}