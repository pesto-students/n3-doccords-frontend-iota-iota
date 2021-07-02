import * as types from "redux/types/common";

const initialState = {
  healthTopics: [],
  articles: [],
  uploadedLink: "",
  searchLocationIsAtHome: true,
  searchedString: "",
};

export const common = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ALL_HEALTH_TOPICS:
      return {
        ...state,
        healthTopics: action.payload,
      };
    case types.SET_ALL_ARTICLES:
      return {
        ...state,
        articles: action.payload,
      };
    case types.SET_UPLOAD_LINK:
      return {
        ...state,
        uploadedLink: action.payload,
      };
    case types.SEARCH_LOCATION_IS_AT_HOME:
      return {
        ...state,
        searchLocationIsAtHome: action.payload,
      };
    case types.SEARCH_STRING:
      return {
        ...state,
        searchedString: action.payload,
      };

    default:
      return state;
  }
};
