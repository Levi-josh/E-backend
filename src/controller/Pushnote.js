const webPush = require('web-push');
const users = require("../models/Signupschema");
const subscriptions = new Map();

const subscribe = async(req, res) => {
    console.log('ran')
  const { userId, subscription } = req.body;
  subscriptions.set(userId, subscription);
  res.status(201).json({});
};

const sendnote = async(req, res) => {
  const { userId } = req.params;
  const subscription = subscriptions.get(userId);
  if (!subscription) {
    return res.status(404).json({ error: 'User not found' });
  }
  const user = await users.findOne({_id:userId})
  const message = `Hi ${user.username},welcome to Glamour Grove one of the best e-commerce shopping app which offers your the best services at a discount rate,do well to read more about as in our about page. `
  const notificationPayload = {
    notification: {
      title: 'Push Notification',
      body: message,
      icon:'https://img.freepik.com/free-photo/lot-different-clothes-hanging-wardrobe_181624-16122.jpg?size=626&ext=jpg&ga=GA1.1.103364066.1699032278&semt=sph'
    },
  };

  webPush.sendNotification(subscription, JSON.stringify(notificationPayload))
    .then(() => res.status(200).json({}))
    .catch((error) => {
      console.error('Error sending push notification:', error);
      res.status(500).json({ error: 'Error sending push notification' });
    });
};

module.exports = {sendnote,subscribe}