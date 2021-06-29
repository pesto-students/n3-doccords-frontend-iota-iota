import React, { useState } from "react";
// Router
import { BrowserRouter } from "react-router-dom";
import { RouterConfig } from "navigation/RouterConfig";
// MUI Theme
import { ThemeProvider } from "@material-ui/core";
import { ThemeSwitch } from "components/ThemeSwitch";
import { dark, light } from "styles/muiTheme";
// Redux
import { Provider } from "react-redux";
import { store } from "redux/store";
// styles
import "./App.css";

function App() {
  const [darkState, setDarkState] = useState(false);
  const handleThemeChange = () => {
    setDarkState(!darkState);
    console.log("theme=", darkState ? "dark" : "light");
  };
  return (
    <>
      <div>
        <Provider store={store}>
          <ThemeProvider theme={darkState ? dark() : light()}>
            <ThemeSwitch
              darkState={darkState}
              handleThemeChange={handleThemeChange}
            />
            <BrowserRouter>
              <RouterConfig />
            </BrowserRouter>
          </ThemeProvider>
        </Provider>
      </div>
    </>
  );
}

export default App;
