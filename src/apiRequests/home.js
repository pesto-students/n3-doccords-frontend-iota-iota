import customAxios from "./baseAxios";
import { HEALTH_TOPIC_URL, ARTICLES_URL } from "./apiConstants";
import {
  // fetchAllHealthTopicsError,
  // fetchAllHealthTopicsPending,
  fetchAllHealthTopicsSuccess,
  // fetchAllArticlesSuccess,
} from "../redux/actions/home";
import { fetchAllArticlesSuccess } from "../redux/actions/articlesAction";

export const fetchHealthTopicsAndArticles =
  () => async (dispatch, getState) => {
    const promises = [
      customAxios.get(HEALTH_TOPIC_URL),
      customAxios.get(ARTICLES_URL),
    ];
    const response = await Promise.all(promises);
    dispatch(fetchAllHealthTopicsSuccess(response[0].data));
    dispatch(fetchAllArticlesSuccess(response[1].data));
  };

export const fetchAllArticles = () => async (dispatch) => {
  const response = await customAxios.get(ARTICLES_URL);
  dispatch(fetchAllArticlesSuccess(response.data));
};
