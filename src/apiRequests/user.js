import axios from "axios";
import {
  setAccessToken,
  setUserDetial,
  setLoading,
  deleteUserDetail,
} from "redux/actions/user";
import { fetchTokenFromServer, currentUser } from "context/AuthContext";

export const fetchUserDetail = async (dispatch) => {
  const idToken = await fetchTokenFromServer();
  dispatch(setAccessToken(idToken));
  localStorage.setItem(
    "doccords_user",
    JSON.stringify({ accessToken: idToken })
  );

  const userDetail = await axios.post(
    "http://localhost:5001/api/v1/users",
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

export const clearUserDetail = async (dispatch) => {
  dispatch(deleteUserDetail);
};
