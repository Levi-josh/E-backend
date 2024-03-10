const webPush = require('web-push');

const subscriptions = new Map();

const subscribe = async(req, res) => {
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

  const notificationPayload = {
    notification: {
      title: 'Push Notification',
      body: 'This is a push notification for you!',
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