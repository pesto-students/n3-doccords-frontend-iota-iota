/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/8.6.7/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.6.7/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyDG_6b7GzDixXpfpEXwqlyY6qeg0vavTJ4",
  authDomain: "doccords-55659.firebaseapp.com",
  projectId: "doccords-55659",
  storageBucket: "doccords-55659.appspot.com",
  messagingSenderId: "352225564028",
  appId: "1:352225564028:web:b762256bf74fb69c4400f9",
  measurementId: "G-VGGZF4XZSZ",
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
