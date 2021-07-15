import React from "react";
import ReactDOM from "react-dom";
import "assets/styles/index.scss";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

/* <React.StrictMode>
    <App />
  </React.StrictMode>, */

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorkerRegistration.register();

reportWebVitals();
