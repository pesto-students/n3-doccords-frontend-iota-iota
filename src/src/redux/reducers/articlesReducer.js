import * as types from "redux/types/articlesType";

const initialState = {
  pending: false,
  articles: [],
  error: null,
};

export const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ALL_ARTICLES_SUCCESS:
      return {
        ...state,
        articles: action.payload,
        pending: false,
      };
    case types.FETCH_ALL_ARTICLES_PENDING:
      return {
        ...state,
        pending: true,
      };
    case types.FETCH_ALL_ARTICLES_ERROR:
      return {
        ...state,
        error: action.payload,
        pending: false,
      };
    default:
      return state;
  }
};
