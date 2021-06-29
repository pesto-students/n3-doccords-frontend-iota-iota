import * as types from "redux/types/common";

export const setAllHealthTopics = (payload) => ({
  type: types.SET_ALL_HEALTH_TOPICS,
  payload,
});

export const setUploadedImageURL = (payload) => ({
  type: types.SET_UPLOAD_LINK,
  payload,
});
