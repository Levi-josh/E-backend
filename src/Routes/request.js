const express = require("express");
const route = express.Router();
const { Auth } = require("../middleware/Authcontrol");

const {
	getuser,
	newcol,
	newdemo,
	selcountry,
	itemcart,
	Recieve,
	getcountries,
	gethistory,
	getnotification,
	 
} = require("../controller/api");

const { login, signup, logout } = require("../controller/auth");
const {sendnote,subscribe,sendnote2}= require('../controller/Pushnote')
const {
	complete1,
	complete2,
	shopcart,
	shipping,
	payment,
	redquan,
	addquan,
	addcart,
	newcart,
	selected,
	checkout,
	delcart,
	delproduct,
	getcart,
} = require("../controller/cart");

route.route("/logout").get(logout);

route.route("/signup").post(signup);

route.route("/addquan/:id1/:id2").put(addquan);

route.route("/addcart/:id1/:id2").post(addcart);

route.route("/checkcart/:id/:id1").put(checkout);

route.route("/complete/:id/:id1").put(complete1);

route.route("/complete/:id/:id1").delete(complete2);

route.route("/countrylist").get(getcountries);

route.route("/delcart/:id").delete(delcart);

route.route("/delprod/:id/:id1").delete(delproduct);

route.route("/getuser/:id").get(getuser);

route.route("/getcart/:id").get(getcart);

route.route("/itemcart").get(itemcart);

route.route("/login").post(login);

route.route("/newcart").post(newcart);

route.route("/newcol").get(newcol);

route.route("/getdemo").get(newdemo);

route.route("/payment/:id/:id1").put(payment);

route.route("/getitems").get(Recieve);

route.route("/redquan/:id1/:id2").put(redquan);

route.route("/selcountry").put(selcountry);

route.route("/select/:id").put(selected);

route.route("/shipping/:id/:id1").put(shipping);

route.route("/shopcart/:id/:id1").put(shopcart);

route.route("/gethistory/:id/:id1").get(gethistory);

route.route("/getnote/:id/:id1").get(getnotification);

route.route("/subscribe").post(subscribe);

route.route('/send-notification/:userId').post(sendnote);

route.route('/send-notification2/:userId').post(sendnote2);


module.exports = route;
