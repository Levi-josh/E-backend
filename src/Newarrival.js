const express = require('express')
const route = express.Router()
const newarrive = require("./Newarrivshema")

route.route('/').post(async (req, res) => {
    const mynewcollections = await newarrive.create({
        "image": req.body.image
    })
    res.status(200).json(mynewcollections)

})

module.exports = route