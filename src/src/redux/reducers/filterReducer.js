import * as types from "redux/types/filterTypes";

const initialState = {
  isSearchAtHome: true,
};

export const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ARTICLES_UNDER_HEALTH_TOPIC_SUCCESS:
      return {
        ...state,
      };
    case types.IS_SEARCHBAR_AT_HOME:
      return {
        ...state,
        isSearchAtHome: action.payload,
      };
    default:
      return state;
  }
};
