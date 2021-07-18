import { combineReducers } from "redux";
import { home } from "redux/reducers/home";
import { user } from "redux/reducers/user";
import { common } from "redux/reducers/common";
import { dashboards } from "redux/reducers/dashboard";

export const rootReducer = combineReducers({
  home,
  user,
  common,
  dashboards,
});

// export default rootReducer;
