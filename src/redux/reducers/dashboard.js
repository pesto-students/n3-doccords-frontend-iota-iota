import * as types from "redux/types/dashboard";

const initialState = {
  userCommonHealthTopics: [],
  adminCommonHealthTopics: [],
};

export const dashboards = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_USER_MOST_COMMON_HEALTH_TOPICS:
      return {
        ...state,
        userCommonHealthTopics: action.payload,
      };
    case types.FETCH_ADMIN_MOST_COMMON_HEALTH_TOPICS:
      return {
        ...state,
        adminCommonHealthTopics: action.payload,
      };
    default:
      return state;
  }
};
