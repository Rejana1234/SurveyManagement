importScripts('https://www.gstatic.com/firebasejs/7.23.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.23.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyD0rgJjr_j4mmJKLWocYdcYQiA_TVwaJtM",
    authDomain: "interport-push-notification.firebaseapp.com",
    projectId: "interport-push-notification",
    storageBucket: "interport-push-notification.appspot.com",
    messagingSenderId: "524727962614",
    appId: "1:524727962614:web:c13baf67e11f801da3d5d7",
    measurementId: "G-KBQD1XXH05"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload,
    );
    /* Customize notification here */
    const notificationTitle = "Background Message Title";
    const notificationOptions = {
        body: "Background Message body.",
        icon: "/itwonders-web-logo.png",
    };

    return self.registration.showNotification(
        notificationTitle,
        notificationOptions,
    );
});

