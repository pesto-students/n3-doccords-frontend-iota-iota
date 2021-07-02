import * as types from "redux/types/articlesType";

export const fetchAllArticlesSuccess = (payload) => ({
  type: types.FETCH_ALL_ARTICLES_SUCCESS,
  payload: payload,
});
