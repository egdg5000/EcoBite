const { Expo } = require("expo-server-sdk");
const expo = new Expo();

async function sendPushNotification(token, title, body) {
  if (!Expo.isExpoPushToken(token)) return;

  try {
    await expo.sendPushNotificationsAsync([
      {
        to: token,
        sound: "default",
        title,
        body,
      },
    ]);
  } catch (err) {
    console.error("Push failed:", err);
  }
}

module.exports = sendPushNotification;
