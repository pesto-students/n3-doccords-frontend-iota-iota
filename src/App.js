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
import Footer from "components/footer/Footer";
// styles
import "./App.css";
import { getToken, onMessageListener } from "firebaseSetup";

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
    })
    .catch((err) => console.log("failed: ", err));

  return (
    <>
      <div>
        {/* <CssBaseline /> */}
        <Provider store={store}>
          <ThemeProvider theme={darkState ? dark() : light()}>
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
                <Footer style={{ marginTop: "300px", bottom: "0" }} mt={5} />
              </AuthProvider>
            </Router>
          </ThemeProvider>
        </Provider>
      </div>
    </>
  );
}

export default App;
