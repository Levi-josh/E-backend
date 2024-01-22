const express = require('express')
const route = express.Router()
const Getitem = require('./demoscheme')

route.route('/').get(async (req, res) => {
    try {
        const mynewcollections = await Getitem.find()
        
        res.status(200).json(mynewcollections)
    } catch (err) {
        res.status(500).json(err)
    }


})

module.exports = route