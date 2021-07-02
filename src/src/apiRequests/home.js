import customAxios from "apiRequests/customAxios";
import { HEALTH_TOPIC_URL, ARTICLES_URL } from "./apiConstants";
// import {
//   // fetchAllHealthTopicsError,
//   // fetchAllHealthTopicsPending,
//   fetchAllHealthTopicsSuccess,
//   // fetchAllArticlesSuccess,
// } from "../redux/actions/home";
import { fetchAllArticlesSuccess } from "../redux/actions/articlesAction";
import { setAllHealthTopics, setAllArticles } from "redux/actions/common";

export const fetchHealthTopicsAndArticles =
  () => async (dispatch, getState) => {
    const promises = [
      customAxios.get(HEALTH_TOPIC_URL),
      customAxios.get(ARTICLES_URL),
    ];
    const response = await Promise.all(promises);
    dispatch(setAllHealthTopics(response[0].data));
    dispatch(setAllArticles(response[1].data));
  };

export const fetchAllArticles = () => async (dispatch) => {
  const response = await customAxios.get(ARTICLES_URL);
  dispatch(fetchAllArticlesSuccess(response.data));
};
