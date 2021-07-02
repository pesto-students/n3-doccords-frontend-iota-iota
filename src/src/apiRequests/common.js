import customAxios from "apiRequests/customAxios";
import {
  FETCH_ALL_HEALTH_TOPICS_URL,
  ADMIN_ARTICLES_URL,
} from "apiRequests/constants";
import { setAllHealthTopics, setAllArticles } from "redux/actions/common";

export const fetchAllHealthTopics = () => async (dispatch) => {
  const healthTopics = await customAxios.get(FETCH_ALL_HEALTH_TOPICS_URL);
  dispatch(setAllHealthTopics(healthTopics.data));
};

export const fetchAllArticles = () => async (dispatch) => {
  const healthTopics = await customAxios.get(FETCH_ALL_HEALTH_TOPICS_URL);
  dispatch(setAllHealthTopics(healthTopics.data));
  const articles = await customAxios.get(ADMIN_ARTICLES_URL);
  dispatch(setAllArticles(articles.data.articles));
};
