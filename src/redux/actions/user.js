import * as types from "redux/types/user";

export const setAccessToken = (payload) => ({
  type: types.SET_ACCESS_TOKEN,
  payload,
});
export const setUserDetial = (payload) => ({
  type: types.SET_USER_DETAIL,
  payload,
});
export const setLoading = (payload) => ({
  type: types.SET_LOADING,
  payload,
});
export const deleteUserDetail = () => ({
  type: types.DELETE_USER_DETAIL,
});
export const setProfilesAndDocuments = (payload) => ({
  type: types.SET_PROFILES_AND_DOCUMENTS,
  payload,
});
export const setProfiles = (payload) => ({
  type: types.SET_PROFILES,
  payload,
});
