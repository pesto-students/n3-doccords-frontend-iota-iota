import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
// import logger from "redux-logger";
import { rootReducer } from "redux/reducers";

// devtools for debugging in dev environment.
const devTools =
  // eslint-disable-next-line no-undef
  process.env.NODE_ENV !== "production" && window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    : (a) => a;

export const middlewares = [thunk];

export const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middlewares), devTools)
);
