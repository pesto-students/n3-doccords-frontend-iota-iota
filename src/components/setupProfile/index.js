import React from "react";

import firebase from "firebase/app";

const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(function () {
      console.log("Successufully Signed out");
    })
    .catch(function () {
      console.log("Error Signed out");
    });
};
const SetupProfile = () => {
  console.log("current", firebase.auth().currentUser);
  return (
    <div>
      <button onClick={signOut}>Signout</button>
    </div>
  );
};

export default SetupProfile;
