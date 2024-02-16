require('dotenv').config()

const express = require('express')
const mongodb = require('./utils/dbconnect')
const App = express();
const cors = require('cors')
const cookie = require('cookie-parser');
const errorhandler = require("./middleware/error")
const routes = require('./Routes/request');

const port = process.env.port || 3500;

App.use(cors())
App.use(express.json())
App.use(cookie())

App.use(routes)

App.use(errorhandler);

const startServer = async () => {
    try {
        await mongodb();
        console.log("connected")

        App.listen(port, () => console.log(`port is running on ${port}`))
    } catch (error) {
        console.log(error)
    }
}

startServer();