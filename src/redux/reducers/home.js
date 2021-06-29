import * as types from "redux/types/home";

const initialState = {
  home: {},
};

export const home = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ALL_HEALTH_TOPICS:
      return {
        ...state,
        home: {
          healthTopics: action.payload,
        },
      };
    default:
      return state;
  }
};
