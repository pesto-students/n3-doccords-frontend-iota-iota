import * as types from "redux/types/home";

export const fetchAllHealthTopics = (payload) => ({
  type: types.FETCH_ALL_HEALTH_TOPICS,
  payload: ["Elango", "Navtej"],
});
