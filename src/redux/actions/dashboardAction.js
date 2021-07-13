import * as types from "redux/types/dashboard";

export const fetchUserMostCommonHealthTopics = (data) => ({
  type: types.FETCH_USER_MOST_COMMON_HEALTH_TOPICS,
  payload: data,
});
export const fetchAdminMostCommonHealthTopics = (data) => ({
  type: types.FETCH_ADMIN_MOST_COMMON_HEALTH_TOPICS,
  payload: data,
});
export const fetchAdminCompleteData = (data) => ({
  type: types.FETCH_ADMIN_COMPLETE_DATA,
  payload: data,
});
export const fetchAdminCompleteDocumentData = (data) => ({
  type: types.FETCH_ADMIN_DOCUMENT_DATA,
  payload: data,
});
