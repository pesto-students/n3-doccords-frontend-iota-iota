import * as types from "redux/types/filterTypes";

export const fetchArticlesUnderHealthTopicSuccess = (healthID) => ({
  type: types.FETCH_ARTICLES_UNDER_HEALTH_TOPIC_SUCCESS,
  payload: healthID,
});

export const isSearchBarAtHome = (isSearch) => ({
  type: types.IS_SEARCHBAR_AT_HOME,
  payload: isSearch,
});
