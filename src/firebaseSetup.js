import firebase from "firebase/app";
import "firebase/auth";
import "firebase/messaging";
// import { updateUser } from "apiRequests/user";

const firebaseConfig = {
  apiKey: "AIzaSyDG_6b7GzDixXpfpEXwqlyY6qeg0vavTJ4",
  authDomain: "doccords-55659.firebaseapp.com",
  projectId: "doccords-55659",
  storageBucket: "doccords-55659.appspot.com",
  messagingSenderId: "352225564028",
  appId: "1:352225564028:web:b762256bf74fb69c4400f9",
  measurementId: "G-VGGZF4XZSZ",
};
const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const messaging = app.messaging();

export const getToken = (setTokenFound) => {
  return messaging
    .getToken({
      vapidKey:
        "BP3AYZBE_HYPWE6IXn0rH4N39LvPfNtWAhIzwpsYs3u_lcJ4bbO9aY095tJB98ej19POd0336XOCIqAa4Ak2Peo",
    })
    .then((currentToken) => {
      if (currentToken) {
        // updateUser(currentToken);
        setTokenFound(true);
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};
export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
