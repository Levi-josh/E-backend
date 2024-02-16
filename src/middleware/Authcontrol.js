const jwt = require('jsonwebtoken')

const Auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        if (!token) throw new Error("No token found!");

        jwt.verify(token, process.env.Access_Token, async (err, decoded) => {
            if (err) throw new Error(err);
            next();
        })

    } catch (err) {
        next(err);
    }
}

module.exports = { Auth }