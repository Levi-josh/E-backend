require('dotenv').config()
const webpush = require('web-push');
const express = require('express')
const mongodb = require('./utils/dbconnect')
const App = express();
const cors = require('cors')
const cookie = require('cookie-parser');
const bodyparser= require('body-parser');
const errorhandler = require("./middleware/error")
const routes = require('./Routes/request');
const compression = require("compression");
const port = process.env.port || 3500;
webpush.setVapidDetails(
    'mailto:levijoshuakelly@gmail.com', // your email address
    process.env.Public_key,
    process.env.Private_key
);
App.use(cors({origin:['http://localhost:3000','https://my-commerce.onrender.com']}))
App.use(compression({
    threshold: 1024, // Compress responses > 1KB
    filter: (req, res) => {
      if (req.headers['x-no-compression']) {
        return false; // Skip if client asks not to compress
      }
      return compression.filter(req, res);
    }
  }));
App.use(express.json())
App.use(cookie())
App.use(bodyparser.json())
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