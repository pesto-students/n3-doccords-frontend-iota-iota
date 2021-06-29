import { combineReducers } from "redux";
import { home } from "redux/reducers/home";
import { user } from "redux/reducers/user";

export const rootReducer = combineReducers({
  home,
  user,
});
