import { applyMiddleware, compose, createStore } from "redux";
import { rootReducer } from "redux/reducers";
import { middlewares } from "redux/store";

export const findByTestAtrr = (component, attr) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
};

export const testStore = (initialState) => {
  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middlewares))
  );
  return store;
};
