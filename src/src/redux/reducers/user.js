import * as type from "redux/types/user";
const initialState = {
  loading: true,
  userDetail: {},
  profiles: [],
  documents: [],
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case type.SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.payload,
      };
    case type.SET_USER_DETAIL:
      return {
        ...state,
        userDetail: action.payload,
      };
    case type.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case type.SET_PROFILES_AND_DOCUMENTS:
      return {
        ...state,
        profiles: action.payload.profiles,
        documents: action.payload.documents,
      };
    case type.SET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
      };
    default:
      return state;
  }
};
