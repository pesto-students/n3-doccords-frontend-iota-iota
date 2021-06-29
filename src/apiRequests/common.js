import customAxios from "apiRequests/customAxios";
import { FETCH_ALL_HEALTH_TOPICS_URL } from "apiRequests/constants";
import { setAllHealthTopics } from "redux/actions/common";

export const fetchAllHealthTopics = () => async (dispatch) => {
  const healthTopics = await customAxios.get(FETCH_ALL_HEALTH_TOPICS_URL);
  dispatch(setAllHealthTopics(healthTopics.data));
};
