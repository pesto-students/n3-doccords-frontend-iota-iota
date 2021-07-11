// import axios from "axios";
import customAxios from "apiRequests/customAxios";
import {
  ADMIN_TOP_HEALTH_TOPICS,
  USER_TOP_HEALTH_TOPICS,
} from "apiRequests/constants";

import {
  fetchUserMostCommonHealthTopics,
  fetchAdminMostCommonHealthTopics,
} from "redux/actions/dashboardAction";

export const fetchTopHealthTopicsForUserOrAdmin = async (isAdmin) => {
  if (isAdmin) {
    const response = await customAxios
      .get(ADMIN_TOP_HEALTH_TOPICS)
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
    const data = response.data;
    return data;
  } else {
    const response = await customAxios.get(USER_TOP_HEALTH_TOPICS);
    const data = response.data;
    return data;
  }
};

export const fetchCommonHealthIssuesForUser =
  () => async (dispatch, getState) => {
    const response = await customAxios.get(USER_TOP_HEALTH_TOPICS);
    if (response.statusText === "OK") {
      dispatch(fetchUserMostCommonHealthTopics(response.data));
    }
  };

export const fetchCommonHealthIssuesForAdmin =
  () => async (dispatch, getState) => {
    const response = await customAxios.get(ADMIN_TOP_HEALTH_TOPICS);
    console.log("This is the respone", response);
    if (response.success) {
      dispatch(fetchAdminMostCommonHealthTopics(response.data));
    }
  };
