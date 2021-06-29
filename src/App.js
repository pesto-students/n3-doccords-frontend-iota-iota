import React from "react";
// Router
import { BrowserRouter } from "react-router-dom";
import { RouterConfig } from "navigation/RouterConfig";
// MUI Theme
import { ThemeProvider } from "@material-ui/core";
import Box from "@material-ui/core/Box";
// import { ThemeSwitch } from "components/ThemeSwitch";
// import { dark, light } from "styles/muiTheme";
// Redux
import { Provider } from "react-redux";
import { store } from "redux/store";

import TopNavbar from "./components/Appbar/topNavbar";
// import NavbarWithDrawer from "./components/Navbar/Navbar";
import BottomTabbar from "./components/Appbar/bottomTabbar";

// styles
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
// import CssBaseline from "@material-ui/core/CssBaseline";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    maxWidth: "100vw",
    overflowX: "hidden",
  },
  menuButton: {
    marginRight: theme.spacing(0),
  },

  sectonMDandUP: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  toolbar: {
    display: "flex",
    alignItems: "start",
    justifyContent: "flex-start",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

function App() {
  const classes = useStyles();

  // const [darkState, setDarkState] = useState(false);
  // const handleThemeChange = () => {
  //   setDarkState(!darkState);
  //   console.log("theme=", darkState ? "dark" : "light");
  // };

  return (
    <>
      <div className={classes.root}>
        {/* <CssBaseline /> */}
        <Provider store={store}>
          {/* <ThemeProvider theme={darkState ? dark() : light()}> */}
          <ThemeProvider>
            {/* <ThemeSwitch
              darkState={darkState}
              handleThemeChange={handleThemeChange}
            /> */}
            <BrowserRouter>
              <TopNavbar />
              {/* <NavbarWithDrawer /> */}
              <main className={classes.content} pl={0} ml={0}>
                {/* <div className={classes.toolbar} /> */}
                <RouterConfig />
                <Box className={classes.sectonMDandUP}>
                  <BottomTabbar className={classes.sectonMDandUP} />
                </Box>
              </main>
            </BrowserRouter>
          </ThemeProvider>
        </Provider>
      </div>
    </>
  );
}

export default App;
