import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { useEffect } from 'react';

async function registerForPushNotificationsAsync() {
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('Toestemming voor meldingen is niet verleend!');
      return;
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;

    // 🔁 Sla token op in backend
    await fetch("https://edg5000.com/users/save-push-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        user_id: 1, // <- dynamisch uit sessie/account
        push_token: token,
      }),
    });
  } else {
    alert('Pushmeldingen werken alleen op een fysiek apparaat.');
  }
}

useEffect(() => {
  registerForPushNotificationsAsync();
}, []);
