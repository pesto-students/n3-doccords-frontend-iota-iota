/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState } from "react";
// Router
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "context/AuthContext";
import { RouterConfig } from "navigation/RouterConfig";
// MUI Theme
import { ThemeProvider } from "@material-ui/core";
// import { ThemeSwitch } from "components/ThemeSwitch";
import { dark, light } from "styles/muiTheme";
// Redux
import { Provider } from "react-redux";
import { store } from "redux/store";
// menubar
import Nav from "components/shared/menuBar/nav";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
// styles
import "./App.css";
import { getToken, onMessageListener } from "firebaseSetup";
// import { makeStyles } from "@material-ui/core/styles";
// import CssBaseline from "@material-ui/core/CssBaseline";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     maxWidth: "100vw",
//     overflowX: "hidden",
//   },
//   menuButton: {
//     marginRight: theme.spacing(0),
//   },

//   sectonMDandUP: {
//     display: "none",
//     [theme.breakpoints.down("sm")]: {
//       display: "block",
//     },
//   },
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing(1),
//   },
//   toolbar: {
//     display: "flex",
//     alignItems: "start",
//     justifyContent: "flex-start",
//     padding: theme.spacing(0, 1),
//     // necessary for content to be below app bar
//     ...theme.mixins.toolbar,
//   },
// }));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App() {
  const [darkState] = useState(false);
  const [snackBarStatus, setSnackBarStatus] = useState(false);
  const [isTokenFound, setTokenFound] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  getToken(setTokenFound);
  onMessageListener()
    .then((payload) => {
      setSnackBarStatus(true);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
      console.log(payload);
    })
    .catch((err) => console.log("failed: ", err));
  // const handleThemeChange = () => {
  //   setDarkState(!darkState);
  //   console.log("theme=", darkState ? "dark" : "light");
  // };
  return (
    <>
      <div>
        {/* <CssBaseline /> */}
        <Provider store={store}>
          <ThemeProvider theme={darkState ? dark() : light()}>
            {/* <ThemeSwitch
              darkState={darkState}
              handleThemeChange={handleThemeChange}
            /> */}
            <Router>
              <AuthProvider>
                <Nav />
                <Snackbar
                  open={snackBarStatus}
                  autoHideDuration={6000}
                  onClose={() => setSnackBarStatus(false)}
                >
                  <Alert severity="success">{notification.body}</Alert>
                </Snackbar>
                <RouterConfig />
              </AuthProvider>
            </Router>
          </ThemeProvider>
        </Provider>
      </div>
    </>
  );
}

export default App;
