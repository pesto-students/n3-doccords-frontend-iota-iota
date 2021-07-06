import * as types from "redux/types/home";

export const fetchAllHealthTopicsSuccess = (payload) => ({
  type: types.FETCH_ALL_HEALTH_TOPICS_SUCCESS,
  payload: payload,
});

export const fetchAllHealthTopicsPending = () => ({
  type: types.FETCH_ALL_HEALTH_TOPICS_PENDING,
});

export const fetchAllHealthTopicsError = (error) => ({
  type: types.FETCH_ALL_HEALTH_TOPICS_ERROR,
  payload: error,
});

export const fetchAllArticlesSuccess = (payload) => ({
  type: types.FETCH_ALL_ARTICLES_SUCCESS,
  payload: payload,
});

export const fetchAllArticlesPending = () => ({
  type: types.FETCH_ALL_ARTICLES_PENDING,
});

export const fetchAllArticlesError = (error) => ({
  type: types.FETCH_ALL_ARTICLES_ERROR,
  payload: error,
});

export const fetchArticlesUnderHealthTopicSuccess = (healthID) => ({
  type: types.FETCH_ARTICLES_UNDER_HEALTH_TOPIC_SUCCESS,
  payload: healthID,
});
