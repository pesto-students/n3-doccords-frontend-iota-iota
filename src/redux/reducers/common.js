import * as types from "redux/types/common";

const initialState = {
  healthTopics: [],
  articles: [],
  uploadedLink: "",
};

export const common = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ALL_HEALTH_TOPICS:
      return {
        ...state,
        healthTopics: action.payload,
      };
    case types.SET_UPLOAD_LINK:
      return {
        ...state,
        uploadedLink: action.payload,
      };
    default:
      return state;
  }
};
