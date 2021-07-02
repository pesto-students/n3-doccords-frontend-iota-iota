import React from "react";
import firebase from "firebase";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import { useAuth } from "context/AuthContext";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { PROFILES } from "navigation/constants";
import LoginImage from "assets/images/login.png";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

// Configure FirebaseUI.
const uiConfig = {
  callbacks: {
    signInFailure: function (error) {
      return console.log(error);
    },
  },
  signInFlow: "popup",
  signInSuccessUrl: PROFILES,
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      fullLabel: "Login or Register with Google",
    },
    {
      provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      fullLabel: "Login or Register with Facebook",
    },
    {
      provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      recaptchaParameters: {
        type: "image", // 'audio'
        size: "invisible", // 'invisible' or 'compact'
        badge: "bottomleft", // 'bottomright' or 'inline' applies to invisible.
      },
      fullLabel: "Login or Register with Phone",

      defaultCountry: "IN",
    },
  ],
};
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
const LoginView = () => {
  const classes = useStyles();
  const { currentUser } = useAuth();

  const loginDataRender = () => {
    if (currentUser) {
      return (
        <Backdrop className={classes.backdrop} open={open}>
          <CircularProgress color="primary" />
        </Backdrop>
      );
    }
    return (
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    );
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={3}
        alignItems="center"
        justify="center"
        style={{ padding: "1rem" }}
      >
        <Hidden xsDown>
          <Grid
            item
            lg={6}
            xl={6}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={LoginImage} style={{ width: "75%" }} />
          </Grid>
        </Hidden>

        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} height="100">
          {loginDataRender()}
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginView;
