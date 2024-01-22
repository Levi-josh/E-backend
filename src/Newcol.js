const express = require('express')
const route = express.Router()
const newarrive = require("./Newarrivshema")

route.route('/').get(async (req, res) => {
    const mynewcol = await newarrive.find()
    res.status(200).json(mynewcol)

})

module.exports = route