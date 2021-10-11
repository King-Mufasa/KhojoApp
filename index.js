/**
 * @format
 */
import React, { useEffect } from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import configureStore from './src/store/configueStore';
import { Provider } from 'react-redux';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
// import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import Images from './src/styles/images';

const store = configureStore()
PushNotification.configure({
    onRegister: function (token) {
        console.log("TOKEN:", token);
    },

    onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);
    },

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function (err) {
        console.error(err.message, err);
    },

    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },

    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: true,
});
PushNotification.createChannel({
    channelId: "909", // (required)
    channelName: "Khojodoctor", // (required)
},
    (created) => console.log(`CreateChannel returned '${created}'`)
);
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
export default function Main() {
    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            const notification = remoteMessage.notification;
            // Alert.alert(notification.title, notification.body);
            PushNotification.localNotification({
                channelId: "909",
                title: notification.title,
                message: notification.body,
                picture:Images.ico_app
            })
        });

        return unsubscribe;
    }, []);
    return (
        <PaperProvider>
            <SafeAreaProvider>
                <Provider store={store}>
                    <App />
                </Provider>
            </SafeAreaProvider>
        </PaperProvider>
    )
}

AppRegistry.registerComponent(appName, () => Main);
