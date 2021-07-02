import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { auth } from "firebaseSetup";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export const fetchTokenFromServer = () => {
  return auth.currentUser.getIdToken(true);
};
export const currentUser = () => {
  return auth.currentUser;
};
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  // function signup(email, password) {
  //   return auth.createUserWithEmailAndPassword(email, password);
  // }

  // function login(email, password) {
  //   return auth.signInWithEmailAndPassword(email, password);
  // }

  const logout = () => {
    return auth.signOut();
  };
  const fetchToken = () => {
    return auth.currentUser.getIdToken(true);
  };
  // function resetPassword(email) {
  //   return auth.sendPasswordResetEmail(email);
  // }

  // function updateEmail(email) {
  //   return currentUser.updateEmail(email);
  // }

  // function updatePassword(password) {
  //   return currentUser.updatePassword(password);
  // }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    // login,
    // signup,
    logout,
    fetchToken,
    // resetPassword,
    // updateEmail,
    // updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = { children: PropTypes.node.isRequired };
