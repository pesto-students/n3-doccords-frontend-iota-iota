import axios from "axios";
import {
  setAccessToken,
  setUserDetial,
  setLoading,
  deleteUserDetail,
  setProfilesAndDocuments,
  setProfiles,
  setSharedDoc,
} from "redux/actions/user";
import { setUploadedImageURL, setNotification } from "redux/actions/common";
import { fetchTokenFromServer, currentUser } from "context/AuthContext";
import customAxios from "apiRequests/customAxios";
import {
  USER_PROFILE_URL,
  USER_DOCUMENTS_URL,
  USER_URL,
} from "apiRequests/constants";

export const fetchUserDetail = async (dispatch) => {
  const idToken = await fetchTokenFromServer();
  dispatch(setAccessToken(idToken));
  localStorage.setItem(
    "doccords_user",
    JSON.stringify({ accessToken: idToken })
  );

  const userDetail = await axios.post(
    "https://doccords-api.herokuapp.com/api/v1/users",
    {
      profileName: currentUser().displayName,
      email: currentUser().email,
      phone: currentUser().phoneNumber,
      profilePic: currentUser().photoURL,
    },
    {
      headers: {
        Authorization: "Bearer " + idToken,
        "Content-Type": "application/json",
      },
    }
  );
  dispatch(setUserDetial(userDetail.data.user));
  dispatch(setLoading(false));
};
export const updateUser = async (token) => {
  customAxios.put(USER_URL, { token });
};
export const clearUserDetail = async (dispatch) => {
  dispatch(deleteUserDetail);
};

export const createNewProfile =
  (newProfileData, history) => async (dispatch, getState) => {
    const {
      picture,
      relationshipId,
      profileName,
      age,
      email,
      phone,
      gender,
      knownIssues,
    } = newProfileData;
    const createdUser = await customAxios.post(USER_PROFILE_URL, {
      picture,
      relationshipId,
      profileName,
      age,
      email,
      phone,
      gender,
      knownIssues,
    });
    if (createdUser.data.success) {
      dispatch(setUploadedImageURL(""));
      dispatch(
        setNotification({
          status: true,
          body: "New profile got created successfully",
        })
      );
      history.push("/profiles");
    }
  };

export const fetchAllProfiles = () => async (dispatch, getState) => {
  const allProfiles = await customAxios.get(USER_PROFILE_URL);
  if (allProfiles.data.success) {
    dispatch(setProfiles(allProfiles.data.data));
  }
};
export const fetchAllDocuments = () => async (dispatch, getState) => {
  const allDocuments = await customAxios.get(USER_DOCUMENTS_URL);
  if (allDocuments.data.success) {
    dispatch(setProfiles(allDocuments.data.data));
  }
};
export const fetchAllProfilesAndDocuments =
  () => async (dispatch, getState) => {
    const promises = [
      customAxios.get(USER_PROFILE_URL),
      customAxios.get(USER_DOCUMENTS_URL),
    ];
    const response = await Promise.all(promises);
    dispatch(
      setProfilesAndDocuments({
        profiles: response[0].data.data,
        documents: response[1].data.data,
      })
    );
  };
export const deleteAllProfilesAndDocuments =
  (profiles, documents, history) => async (dispatch, getState) => {
    const deletedRes = await customAxios.delete(USER_PROFILE_URL, {
      data: {
        profiles,
        documents,
      },
    });
    if (deletedRes.data.success) {
      dispatch(fetchAllProfilesAndDocuments());
      history.push("/profiles");
    }
  };

export const updateProfile =
  (newProfileData, history) => async (dispatch, getState) => {
    const {
      profileId,
      picture,
      relationshipId,
      profileName,
      age,
      email,
      phone,
      gender,
      knownIssues,
    } = newProfileData;
    const createdUser = await customAxios.put(
      `${USER_PROFILE_URL}/${profileId}`,
      {
        picture,
        relationshipId,
        profileName,
        age,
        email,
        phone,
        gender,
        knownIssues,
      }
    );
    if (createdUser.data.success) {
      dispatch(setUploadedImageURL(""));
      dispatch(
        setNotification({
          status: true,
          body: "Profile got updated successfully",
        })
      );
      history.push("/profiles");
    }
  };

export const createDoc = (doc) => async (dispatch, getState) => {
  const { name, link, healthTopicId, profileId, suggestedTopic } = doc;
  const data = {
    name,
    link,
    healthTopicId,
    profileId,
    suggestedTopic,
  };
  const createdDoc = await customAxios.post(USER_DOCUMENTS_URL, data);
  if (createdDoc.data.success) {
    dispatch(fetchAllProfilesAndDocuments());
    dispatch(
      setNotification({
        status: true,
        body: "Document got created successfully",
      })
    );
  }
};

export const shareDocument = (data) => async (dispatch, getState) => {
  const { documentIds, email } = data;
  const shareDoc = await customAxios.post(`${USER_DOCUMENTS_URL}/share`, {
    documentIds,
    email,
  });
  if (shareDoc.data.success) {
    dispatch(fetchAllProfilesAndDocuments());
    dispatch(
      setNotification({
        status: true,
        body: "Document got shared successfully",
      })
    );
  }
};
export const updateDocAccess = (data) => async (dispatch, getState) => {
  const { documentId, sharedList } = data;
  const docAccess = await customAxios.put(`${USER_DOCUMENTS_URL}/access`, {
    documentId,
    sharedList,
  });
  if (docAccess.data.success) {
    dispatch(fetchAllProfilesAndDocuments());
    dispatch(
      setNotification({
        status: true,
        body: "Document access got updated successfully",
      })
    );
  }
};

export const deleteDocuments = (documentIds) => async (dispatch, getState) => {
  const deletedDocs = await customAxios.delete(USER_DOCUMENTS_URL, {
    data: {
      documentIds,
    },
  });
  if (deletedDocs.data.success) {
    dispatch(fetchAllProfilesAndDocuments());
    dispatch(
      setNotification({
        status: true,
        body: "Document got deleted successfully",
      })
    );
  }
};

export const fetchSharedDocs = async (id, email, dispatch) => {
  const sharedDocs = await customAxios.post(`/share`, {
    shareId: id,
    shareEmail: email,
  });
  if (sharedDocs.data.success) {
    dispatch(setSharedDoc(sharedDocs.data.documents));
  }
};
