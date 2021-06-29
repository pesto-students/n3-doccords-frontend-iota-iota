import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "pages/home";
import Login from "pages/login";
import Profiles from "pages/users/profiles";
import Documents from "pages/users/documents";
import UserDashboard from "pages/users/dashboard";
import UnAuthorized from "pages/unauthorized";
import AdminHome from "pages/admin/adminHome";
import NotFound from "pages/notFound";
import PrivateRoute from "navigation/PrivateRoute";
import AdminPrivateRoute from "navigation/AdminPrivateRoute";
import Articles from "pages/articles";
import HealthTopics from "pages/healthTopics";
import AdminArticles from "pages/admin/adminArticles";
import AdminHealthTopics from "pages/admin/adminHealthTopics";
import {
  ROOT,
  PROFILES,
  LOGIN,
  ADMIN_DASHBOARD,
  ARTICLES,
  HEALTH_TOPICS,
  UNAUTHORIZED,
  DASHBOARD,
  DOCUMENTS,
  ADMIN_ARTICLES,
  ADMIN_HEALTH_TOPICS,
} from "navigation/constants";

export const RouterConfig = () => {
  return (
    <div>
      <Switch>
        {/* List all public routes here */}
        <Route exact path={ROOT} component={Home} />
        <Route path={LOGIN}>
          <Login />
        </Route>
        <Route path={HEALTH_TOPICS}>
          <HealthTopics />
        </Route>
        <Route path={ARTICLES}>
          <Articles />
        </Route>
        <Route path={UNAUTHORIZED}>
          <UnAuthorized />
        </Route>

        {/* List all private/auth routes here */}
        <PrivateRoute path={PROFILES}>
          <Profiles />
        </PrivateRoute>
        <PrivateRoute path={DASHBOARD}>
          <UserDashboard />
        </PrivateRoute>
        <PrivateRoute path={DOCUMENTS}>
          <Documents />
        </PrivateRoute>
        <AdminPrivateRoute path={ADMIN_DASHBOARD}>
          <AdminHome />
        </AdminPrivateRoute>
        <AdminPrivateRoute path={ADMIN_ARTICLES}>
          <AdminArticles />
        </AdminPrivateRoute>
        <AdminPrivateRoute path={ADMIN_HEALTH_TOPICS}>
          <AdminHealthTopics />
        </AdminPrivateRoute>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
};
