const express = require('express')
const route = express.Router()
const maincart = require('./Newcartsheme')
const Countrylist = require('./countryschem')
const Cartitem = require('./Cartschema')
const users = require('./Signupschema')



route.route('/').post(async (req, res) => {
    /* try {
 
         const mycountries = await Countrylist.find().exec()
 
 
         const mycart = await maincart.create({
 
             'selected': false,
             'title': req.body.title,
             'products': [],
             'country': mycountries,
             'progressbar': [{ 'proname': 'shopcart', 'progess': false },
             { 'proname': 'checkout', 'progess': false },
             { 'proname': 'complete', 'progess': false }],
             'total': 0,
             'date': "22/4/2024"
         })
         res.status(201).json({ 'massage': 'sent' })
     } catch (err) {
         res.status(500).json(err)
 
     }*/
    try {




        const mycart = await users.updateOne({ _id: req.body.id }, {
            $push: {
                items: {

                    'selected': false,
                    'title': req.body.title,
                    'products': [],
                    'country': '',
                    'progressbar': [{ 'proname': 'shopcart', 'progess': false },
                    { 'proname': 'checkout', 'progess': false },
                    { 'proname': 'complete', 'progess': false }],
                    'total': 0,
                    'date': "",
                    'itemspurch': 0,
                    'shipping': [{ 'name': 'Free shipping', 'price': 0, 'checked': false }, { 'name': 'Express shipping', 'price': 20, 'checked': false }, { 'name': 'Pick up', 'price': 20, 'checked': false }],
                    'paymethod': [{ 'payname': 'Pay by Card Credit' }, { 'payname': 'Paypal' }],
                    'payment': '',
                    'shipvalue': { 'name': '', 'price': 0, 'checked': false },
                    'ordercode': ''
                }
            }
        })
        res.status(201).json({ 'massage': 'sent' })
    } catch (err) {
        res.status(500).json(err)

    }


})
module.exports = route
