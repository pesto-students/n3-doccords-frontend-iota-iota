import { combineReducers } from "redux";
import { homeReducer } from "redux/reducers/home";
import { articlesReducer } from "redux/reducers/articlesReducer";
import { filterReducer } from "redux/reducers/filterReducer";

export const rootReducer = combineReducers({
  home: homeReducer,
  articles: articlesReducer,
  filter: filterReducer,
});
