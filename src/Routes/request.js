const express = require('express')
const route = express.Router()
const { Auth } = require('../middleware/Authcontrol')

const { getuser, newcol, newdemo, selcountry,itemcart, Recieve, getcountries } = require('../controller/api')

const { login, signup, logout } = require('../controller/auth')

const {complete1, complete2, shopcart, shipping, payment, redquan, addquan, addcart, newcart,selected,checkout,delcart,delproduct}=require('../controller/cart')

route.route('/addquan/:id1/:id2').put(addquan)

route.route('/addcart/:id1/:id2').post(Auth, addcart)

route.route('/checkcart/:id/:id1').put(checkout)

route.route('/complete/:id/:id1').put(complete1)

route.route('/complete/:id/:id1').delete(complete2)

route.route('/countrylist').get(getcountries)

route.route('/delcart/:id').delete(delcart)

route.route('/delprod/:id/:id1').delete(delproduct)

route.route('/getuser/:id').get(Auth, getuser)

route.route('/itemcart').get(itemcart)

route.route('/login').post(login)

route.route('/newcart').post(Auth, newcart)

route.route('/newcol').get(newcol)

route.route('/getdemo').get(newdemo)

route.route('/payment/:id/:id1').put(payment)

route.route('/getitems').get(Recieve)

route.route('/redquan/:id1/:id2').put(redquan)

route.route('/selcountry').put(selcountry)

route.route('/select/:id').put(selected)

route.route('/shipping/:id/:id1').put(shipping)

route.route('/shopcart/:id/:id1').put(shopcart)

route.route('/logout').get(logout)

route.route('/signup').post(signup)


module.exports = route