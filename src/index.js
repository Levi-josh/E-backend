const path = require('path')

const fs = require('fs')
require('dotenv').config()
const express = require('express')
const mongodb = require('./dbconnect')
const App = express();
const cors = require('cors')
const mongoose = require('mongoose')
const cookie = require('cookie-parser')
const { Auth } = require('./Authcontrol')
mongodb();



const port = process.env.port || 3500;
App.use(cookie())
App.use(cors())

App.use(express.json())

App.use("/items", require("./Items"))
App.use("/getitems", require("./Recieve"))
App.use("/newcol", require("./Newcol"))
App.use("/newarrival", require("./Newarrival"))
App.use("/getdemo", require("./newdemo"))
App.use("/cartitems", require("./Cart"))
App.use("/itemcart", require("./itemcart"))
App.use("/countrylist", require("./Country"))
App.use("/selcountry", require("./selcountry"))
App.use("/newcart", require("./Newcart"))
App.use("/addcart", require("./Addcart"))
App.use("/select", require("./Selected"))
App.use("/addquan", require("./Addquan"))
App.use("/redquan", require("./Redquan"))
App.use("/delcart", require("./Delcart"))
App.use("/delprod", require("./Delprod"))
App.use("/signup", require("./Signup"))

console.log("hello")

App.use(function (err, req, res, next) {
    console.log(err.stack)
    res.status(500).send(err.message)
})


mongoose.connection.once('open', () => {
    console.log("connected to mongodb")
    App.listen(port, () => console.log(`port is running on ${port}`))
})
