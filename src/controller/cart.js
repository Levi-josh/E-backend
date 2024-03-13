const Getitem = require("../models/demoscheme");
const users = require("../models/Signupschema");
const shortid = require("shortid");

const addcart = async (req, res, next) => {
	try {
		const newdata = await Getitem.findOne({ _id: req.params.id2 }).exec();
		const newdata1 = await users
			.findOne({ "items._id": req.params.id1 })
			.exec();
		const a = newdata1.items.filter((prev) => prev._id == req.params.id1);
		const b = a[0];
		if (b.selected) {
			await users.updateOne(
				{ "items._id": req.params.id1 },
				{ $push: { "items.$.product": newdata } }
			);
			res.status(201).json({ message: "cart item added" });
		} else {
			throw new Error("you must select a cart");
		}
	} catch (err) {
		next(err);
	}
};

const getcart = async (req, res, next) => {
	try {
		const findcart = await users.findOne({ "items._id": req.params.id });
		const newcart = findcart.items.filter((prev) => prev._id == req.params.id);
		res.status(201).json(newcart[0]);
	} catch (err) {
		next(err);
	}
};

const delproduct = async (req, res, next) => {
	try {
		const myId = await users
			.findOne({ "items.product._id": req.params.id })
			.exec();
		const a = myId.items.filter((prev) => prev._id == req.params.id1);
		const b = a[0].product.filter((prev) => prev._id == req.params.id);
		const c = b[0];
		console.log(c);
		const filter = await users.updateOne(
			{ "items._id": req.params.id1 },
			{ $pull: { "items.$.product": c } }
		);
		console.log(filter);
		res.status(201).json({ message: "cart item deleted" });
	} catch (err) {
		next(err);
	}
};

const shopcart = async (req, res, next) => {
	try {
		const result1 = await users.updateOne(
			{ "items._id": req.params.id, "items.progressbar._id": req.params.id1 },
			{ $set: { "items.$.progressbar.$[elem].progess": true } },
			{ arrayFilters: [{ "elem._id": req.params.id1 }] }
		);
		res.status(200).json({ message: "shopcart completed" });
	} catch (err) {
		next(err);
	}
};

const checkout = async (req, res, next) => {
	try {
		const date = new Date();
		const newdate = date.toDateString();
		const code = shortid.generate();
		const result = await users.updateOne(
			{ "items._id": req.params.id },
			{ $set: { "items.$.date": newdate } }
		);
		const result2 = await users.updateOne(
			{ "items._id": req.params.id },
			{ $set: { "items.$.ordercode": code } }
		);
		const result1 = await users.updateOne(
			{ "items._id": req.params.id, "items.progressbar._id": req.params.id1 },
			{ $set: { "items.$.progressbar.$[elem].progess": true } },
			{ arrayFilters: [{ "elem._id": req.params.id1 }] }
		);
		res.status(200).json({ message: "checkout successful" });
	} catch (err) {
		next(err);
	}
};
const newcart = async (req, res, next) => {
	try {
		const mycart = await users.updateOne(
			{ _id: req.body.id },
			{
				$push: {
					items: {
						selected: false,
						title: req.body.title,
						products: [],
						country: "",
						progressbar: [
							{ proname: "shopcart", progess: false },
							{ proname: "checkout", progess: false },
							{ proname: "complete", progess: false },
						],
						total: 0,
						date: "",
						itemspurch: 0,
						shipping: [
							{ name: "Free shipping", price: 0, checked: false },
							{ name: "Express shipping", price: 20, checked: false },
							{ name: "Pick up", price: 20, checked: false },
						],
						Paymethod: [
							{ payname: "Pay by Card Credit" },
							{ payname: "Paypal" },
						],
						payment: "",
						shipvalue: { name: "", price: 0, checked: false },
						ordercode: "",
					},
				},
			}
		);
		res.status(201).json({ massage: "New cart created" });
	} catch (err) {
		next(err);
	}
};

const payment = async (req, res, next) => {
	try {
		const myuser = await users.findOne({ "items._id": req.params.id });
		const cart = myuser.items.filter((prev) => prev._id == req.params.id);
		const item = cart[0].Paymethod.filter((prev) => prev._id == req.params.id1);
		console.log(item)
		const result = await users.updateOne(
			{ "items._id": req.params.id },
			{ $set: { "items.$.payment": item[0].payname } }
		);
		console.log(result)
		res.status(200).json({ message: "payment selected" });
	} catch (err) {
		next(err);
	}
};

const redquan = async (req, res, next) => {
	try {
		const myId = await users
			.findOne({ "items.product._id": req.params.id1 })
			.exec();
		const a = myId.items;
		const c = a.filter((prev) => prev._id == req.params.id2);
		const d = c[0].product;
		const e = d.filter((prev) => prev._id == req.params.id1);
		const f = e[0];
		if (f.quantity > 1) {
			const addquantity = await users.updateOne(
				{ "items._id": req.params.id2, "items.product._id": req.params.id1 },
				{
					$set: {
						"items.$.product.$[elem].quantity":
							f._id == req.params.id1 ? f.quantity - 1 : f.quantity,
					},
				},
				{ arrayFilters: [{ "elem._id": req.params.id1 }] }
			);
			const addsubtotal = await users.updateOne(
				{ "items._id": req.params.id2, "items.product._id": req.params.id1 },
				{
					$set: {
						"items.$.product.$[elem].subtotal":
							f._id == req.params.id1 ? f.subtotal - f.price : f.subtotal,
					},
				},
				{ arrayFilters: [{ "elem._id": req.params.id1 }] }
			);

			res.json({ message: "Quantity reduced" });
		} else {
			throw new Error("you cant select a number less than one");
		}
	} catch (err) {
		next(err);
	}
};

const selected = async (req, res, next) => {
	try {
		const findothers1 = await users.findOne({ "items._id": req.params.id });
		const findothers = findothers1.items;
		const filter = await users.findOne({ "items._id": req.params.id });
		const newfilter = filter.items.filter((prev) => prev._id == req.params.id);
		for (let findother of findothers) {
			const updateselect = {
				$set: {
					"items.$.selected":
						findother._id == req.params.id ? true : false,
				},
			};
			console.log(findother.selected)
			await users.updateOne({ "items._id": findother._id }, updateselect);
		}
		res.status(201).json({ message: "Cart selected" });
	} catch (err) {
		next(err);
	}
};

const shipping = async (req, res, next) => {
	try {
		const myuser = await users.findOne({ "items._id": req.params.id });
		const cart = myuser.items.filter((prev) => prev._id == req.params.id);
		const item = cart[0].shipping.filter((prev) => prev._id == req.params.id1);
		const shipitems = cart[0].shipping
		const result = await users.updateOne(
			{ "items._id": req.params.id },
			{ $set: { "items.$.shipvalue": item[0] } }
		);
	
		for (let shipitem of shipitems) {
			const updateselect = {
				$set: {
					"items.$.shipping.$[elem].checked":shipitem._id == req.params.id1 ? true : false,
					
					
				},
			}
			const updateselect2 = {
			 arrayFilters: [{ "elem._id":shipitem._id }] 
			}
		
			const a = await users.updateOne({ "items._id": req.params.id }, updateselect, updateselect2);
			console.log(a)
		}
		res.status(200).json({ message: "shipping option selected" });
	} catch (err) {
		next(err);
	}
};

const delcart = async (req, res, next) => {
	try {
		const filter = await users.findOne({ "items._id": req.params.id });
		const filtered = filter.items.filter((prev) => prev._id == req.params.id);
		const c = filtered[0];
		const filter1 = await users.updateOne(
			{ _id: filter._id },
			{ $pull: { items: c } }
		);
		res.status(201).json({ message: "deleted" });
	} catch (err) {
		next(err);
	}
};

const addquan = async (req, res, next) => {
	try {
		const myId = await users
			.findOne({ "items.product._id": req.params.id1 })
			.exec();
		const a = myId.items;
		const c = a.filter((prev) => prev._id == req.params.id2);
		const d = c[0].product;
		const e = d.filter((prev) => prev._id == req.params.id1);
		const f = e[0];
		const addquantity = await users.updateOne(
			{ "items._id": req.params.id2, "items.product._id": req.params.id1 },
			{
				$set: {
					"items.$.product.$[elem].quantity":
						f._id == req.params.id1 ? f.quantity + 1 : f.quantity,
				},
			},
			{ arrayFilters: [{ "elem._id": req.params.id1 }] }
		);
		const addsubtotal = await users.updateOne(
			{ "items._id": req.params.id2, "items.product._id": req.params.id1 },
			{
				$set: {
					"items.$.product.$[elem].subtotal":
						f._id == req.params.id1 ? f.subtotal + f.price : f.subtotal,
				},
			},
			{ arrayFilters: [{ "elem._id": req.params.id1 }] }
		);

		res.json({ message: "Quantity increased" });
	} catch (err) {
		next(err);
	}
};

const complete1 = async (req, res, next) => {
	try {
		const myuser = await users.findOne({ "items._id": req.params.id });
		const cart = myuser.items.filter((prev) => prev._id == req.params.id);
		const result = await users.updateOne(
			{ _id: req.params.id1 },
			{ $push: { history: cart[0] } }
		);
		res.status(200).json({ message: "completed" });
	} catch (err) {
		next(err);
	}
};

const complete2 = async (req, res, next) => {
	
	try {
		const myuser = await users.findOne({ "items._id": req.params.id });
		const cart = myuser.items.filter((prev) => prev._id == req.params.id);
		const message =`Your cart ${cart[0].title} has been received and your goods are expected to arrive in your location in the next three days.please do not forget to rate our services even though we dont have that feature yet lol.`
		const filter1 = await users.updateOne(
			{ _id: req.params.id1 },
			{ $pull: { items: cart[0] } }
		);
		await users.updateOne({ _id: myuser._id}, { $push: { Notification: { 'note': message, 'time': newtime } } })
		res.status(200).json({ message: "completed" });
	} catch (err) {
		next(err);
	}
};

module.exports = {
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
};
