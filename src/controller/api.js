const Getitem = require('../models/demoscheme')
const users = require('../models/Signupschema')
const Countrylist = require('../models/countryschem')
const webpush = require('web-push')
const { json } = require('express')

const getcountries = async (req, res,next) => {
    try {
        const mynewcollections = await Countrylist.find()
        res.status(200).json(mynewcollections)
    } catch (err) {
        next(err)
    }
}

const getuser = async (req, res,next) => {
    try {
        const mynewusers = await users.findOne({ _id: req.params.id })
        res.status(200).json(mynewusers)
    } catch (err) {
       next(err)
    }
}
const getnotification = async (req, res,next) => {
    try {
        const mynote = await users.findOne({ _id: req.params.id })
        const newnote = mynote.Notification.filter(prev => prev._id == req.params.id1)
        res.status(200).json(newnote[0])
    } catch (err) {
       next(err)
    }
} 
const gethistory = async (req, res,next) => {
    try {
        const mynote = await users.findOne({ _id: req.params.id })
        const newnote = mynote.history.filter(prev => prev._id == req.params.id1)
        res.status(200).json(newnote[0])
    } catch (err) {
       next(err)
    }
} 

const newdemo = async (req, res,next) => {
    try {
        const mynewcollections = await Getitem.find()
        res.status(200).json(mynewcollections)
    } catch (err) {
        next(err)
    }
}

const newcol = async (req, res, next) => {
    try {
    const mynewcol = await newarrive.find()
    res.status(200).json(mynewcol) 
    } catch (err) {
       next(err) 
    }
}

const itemcart = async (req, res,next) => {
    try {
        const mycartitems = await Cartitem.find()
        res.status(200).json(mycartitems)
    } catch (err) {
       next(err)
    }
}

const Recieve = async (req, res, next) => {
    try {
        const myitems = await Item.find()
        res.status(200).json(myitems)
    } catch (err) {
        next(err)
    }
}

const selcountry = async (req, res,next) => {
    try {
        const newdata = await Countrylist.findOne({ _id: req.body.id })
        const a =  await users.updateOne({ 'items._id': req.body.id1 }, {$set:{'items.$.country': newdata.country}
       })
        res.status(201).json(newdata)
    } catch (err) {
      next(err)
    }
}
const subscribe = async (req, res,next) => {
    try {
        const subscription = req.body;
        res.status(201).json({})
        const payload = json.stringify({title:'push test'})
        webpush.sendNotification(subscription,payload).catch(err=>console.log(err))
       }
  
     catch (err) {
      next(err)
    }
}



module.exports = {getuser,newcol,subscribe, newdemo, selcountry,itemcart, Recieve, getcountries,gethistory,getnotification }