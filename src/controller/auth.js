const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const users = require('../models/Signupschema')

const login = async (req, res, next) => {
    let newerror = { username: '', password: '', other: '' }
    try {
        const myusers = await users.findOne({ username: req.body.username }).select('+password'); // Select password explicitly if it's excluded by default
        if (!myusers) {
            newerror.username='User does not exist'
            return res.status(404).json(newerror);
        }

        const hash = await bcrypt.compare(req.body.password, myusers.password);
        if (!hash) {
            newerror.password='Incorrect password'
            return res.status(401).json(newerror);
        }
        const newjwt = jwt.sign({ _id: myusers._id }, process.env.Access_Token, { expiresIn: '2d' });
        res.status(200).json({ Accesss_Token: newjwt, UserId: myusers._id });
    } catch (err) {
        next(err);
    }
};

const signup = async (req, res, next) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 8); // Reduce rounds for better performance

        const date = new Date().toLocaleTimeString();
        const message = `Hi ${req.body.username}, welcome to Glamour Grove, one of the best e-commerce shopping apps offering the best services at a discount rate. Read more about us on our About page.`;

        const mynewusers = await users.create({
            username: req.body.username,
            password: hash,
            items: [],
            history: [],
            Notification: [{ note: message, time: date }]
        });

        const newjwt = jwt.sign({ _id: mynewusers._id }, process.env.Access_Token, { expiresIn: '2d' });
        res.status(201).json({ Accesss_Token: newjwt, UserId: mynewusers._id });
    } catch (err) {
        next(err);
    }
};


const logout = async (req, res, next) => {
    try {
    const newjwt = jwt.sign({ _id: req.body.id }, process.env.Access_Token, { expiresIn: '2s' })
    res.status(200).json(newjwt)
       
    } catch (err) {
        next(err)
    }
}

module.exports = {
    login,
    signup,
    logout
}