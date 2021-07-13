// import axios from "axios";
import customAxios from "apiRequests/customAxios";
import {
  ADMIN_TOP_HEALTH_TOPICS,
  USER_TOP_HEALTH_TOPICS,
  ADMIN_COMPLETE_DATA,
  ADMIN_COMPLETE_DOCUMENT_DATA,
} from "apiRequests/constants";

import {
  fetchUserMostCommonHealthTopics,
  fetchAdminMostCommonHealthTopics,
  fetchAdminCompleteDocumentData,
  fetchAdminCompleteData,
} from "redux/actions/dashboardAction";

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
    if (response.statusText === "OK") {
      dispatch(fetchAdminMostCommonHealthTopics(response.data));
    }
  };

export const fetchCompleteDataForAdmin = () => async (dispatch, getState) => {
  const response = await customAxios.get(ADMIN_COMPLETE_DATA);
  if (response.statusText === "OK") {
    dispatch(fetchAdminCompleteData(response.data.data));
  }
};

export const fetchDocumentDataForAdmin = () => async (dispatch, getState) => {
  const response = await customAxios.get(ADMIN_COMPLETE_DOCUMENT_DATA);

  if (response.statusText === "OK") {
    dispatch(fetchAdminCompleteDocumentData(response.data.data.template));
  }
};
