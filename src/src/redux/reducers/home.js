import * as types from "redux/types/home";

const initialState = {
  pending: false,
  healthTopics: [],
  // articles: [],
  selectedHealthTopic: "all",
  error: null,
};

export const home = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ALL_HEALTH_TOPICS_SUCCESS:
      return {
        ...state,
        healthTopics: action.payload,
        pending: false,
      };
    case types.FETCH_ALL_HEALTH_TOPICS_PENDING:
      return {
        ...state,
        pending: true,
      };
    case types.FETCH_ALL_HEALTH_TOPICS_ERROR:
      return {
        ...state,
        error: action.payload,
        pending: false,
      };
    // case types.FETCH_ALL_ARTICLES_SUCCESS:
    //   return {
    //     ...state,
    //     articles: action.payload,
    //     pending: false,
    //   };
    // case types.FETCH_ALL_ARTICLES_PENDING:
    //   return {
    //     ...state,
    //     pending: true,
    //   };
    // case types.FETCH_ALL_ARTICLES_ERROR:
    //   return {
    //     ...state,
    //     error: action.payload,
    //     pending: false,
    //   };

    // case types.FETCH_ARTICLES_UNDER_HEALTH_TOPIC_SUCCESS:
    //   return {
    //     ...state,
    //   };
    default:
      return state;
  }
};
