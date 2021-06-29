import { combineReducers } from "redux";
import { home } from "redux/reducers/home";
import { user } from "redux/reducers/user";
import { common } from "redux/reducers/common";

export const rootReducer = combineReducers({
  home,
  user,
  common,
});
