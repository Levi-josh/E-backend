const jwt = require('jsonwebtoken')

const Auth = async (req, res, next) => {
    try {
       
        const authHeader = req.headers['authorization']

        if (!authHeader) throw new Error('No token found!')
        
        const token = authHeader.split(' ')[1]

         jwt.verify(token, process.env.Access_Token, async (err, decoded) => {
    if (err) next(err);
       next()
         })
    } catch (err) {
        next(err);
    }
}

module.exports = { Auth }