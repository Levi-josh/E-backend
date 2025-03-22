const jwt = require('jsonwebtoken')

const errorhandler = async (err, req, res, next) => {
     let newerror = { username: '', password: '', other: '' }
        if (err.message.includes('User validation failed')) {
            Object.values(err.errors).forEach(({ properties }) => {
                newerror[properties.path] = properties.message;
            })
        }
        if (err.code === 11000) {
            newerror.username = 'this user already exist'
        }
        if (err.code == 'EREFUSED') {
            newerror.other = 'bad network'
        }
        if (err.message == 'getaddrinfo ENOTFOUND ac-roubij3-shard-00-00.0fmc2gq.mongodb.net') {
            newerror.other = 'bad network'
    }
    if (err.message == 'you cant select a number less than one') {
        newerror.other = 'you cant select a number less than one'
    }
    if (err.message == 'you must select a cart') {
        newerror.other = 'you must select a cart'
    }
    if (err.message == 'No token found!') {
        newerror.other = 'No token found!'
    }
    if (err.message == 'jwt expired') {
        newerror.other = 'you\'ve been logged out'
    }
    else {
     newerror.other = err.message  
    }
    
    res.status(500).json(newerror)

}

module.exports = errorhandler;