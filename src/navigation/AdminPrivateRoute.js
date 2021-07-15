/* eslint-disable react/prop-types */
// A wrapper for <Route> that redirects to the login
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "context/AuthContext";
import { fetchUserDetail } from "apiRequests/user";
import { UNAUTHORIZED } from "navigation/constants";
import CircularProgress from "@material-ui/core/CircularProgress";

// screen if you're not yet authenticated.
const AdminPrivateRoute = ({ children, ...rest }) => {
  const userDetail = useSelector((state) => state.user.userDetail);
  const loading = useSelector((state) => state.user.loading);
  const { currentUser } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      fetchUserDetail(dispatch);
    }
  }, []);
  if (currentUser) {
    if (loading) {
      return (
        <div
          style={{
            marginTop: "3rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress color="secondary" />
        </div>
      );
    }
    if (userDetail.profileType === "admin") {
      return <Route {...rest} render={() => children} />;
    } else if (userDetail.profileType === "free") {
      return (
        <Route
          {...rest}
          render={() => <Redirect to={{ pathname: UNAUTHORIZED }} />}
        />
      );
    }
  } else {
    return (
      <Route
        {...rest}
        render={() => <Redirect to={{ pathname: UNAUTHORIZED }} />}
      />
    );
  }
};
export default AdminPrivateRoute;
