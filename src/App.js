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
import Footer from "components/footer/Footer";
// import Snackbar from "@material-ui/core/Snackbar";
// import MuiAlert from "@material-ui/lab/Alert";
// styles
import "./App.css";
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
// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

function App() {
  const [darkState] = useState(false);
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
                {/* <Snackbar open={true} autoHideDuration={6000}>
                  <Alert severity="success">This is a success message!</Alert>
                </Snackbar> */}
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
