import * as types from "redux/types/common";

export const setAllHealthTopics = (payload) => ({
  type: types.SET_ALL_HEALTH_TOPICS,
  payload,
});

export const setAllArticles = (payload) => ({
  type: types.SET_ALL_ARTICLES,
  payload,
});

export const setUploadedImageURL = (payload) => ({
  type: types.SET_UPLOAD_LINK,
  payload,
});

export const setUpSearchBarLocation = (payload) => ({
  type: types.SEARCH_LOCATION_IS_AT_HOME,
  payload,
});
export const searchString = (payload) => ({
  type: types.SEARCH_STRING,
  payload,
});
export const setNotification = (payload) => ({
  type: types.SET_NOTIFICATION,
  payload,
});
