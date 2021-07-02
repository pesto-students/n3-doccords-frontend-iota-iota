import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "pages/home";
import Login from "pages/login";
import Profiles from "pages/users/profiles";
import CreateProfiles from "pages/users/profiles/createProfile";
// import EditProfiles from "pages/Profile/editProfile";
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
import AdminArticle from "pages/admin/adminArticles/adminArticle";
import AdminteHealthTopic from "pages/admin/adminHealthTopics/adminHealthTopic";
import AdminHealthTopics from "pages/admin/adminHealthTopics";
import ArticleList from "pages/articleList";
import Article from "pages/article/article";
import {
  ROOT,
  PROFILES,
  CREATE_PROFILES,
  EDIT_PROFILES,
  LOGIN,
  ADMIN_DASHBOARD,
  ARTICLES,
  HEALTH_TOPICS,
  UNAUTHORIZED,
  DASHBOARD,
  DOCUMENTS,
  ADMIN_ARTICLES,
  ADMIN_HEALTH_TOPICS,
  ADMIN_HEALTH_TOPIC,
  ADMIN_ARTICLE,
  TOPIC_WITH_ID,
  ARTICLE_WITH_ID,
} from "navigation/constants";

export const RouterConfig = () => {
  return (
    <div>
      <Switch>
        {/* List all public routes here */}
        <Route exact path={ROOT} component={Home} />
        <Route path={TOPIC_WITH_ID} component={ArticleList} />
        <Route path={ARTICLE_WITH_ID} component={Article} />
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
        <PrivateRoute exact path={PROFILES}>
          <Profiles />
        </PrivateRoute>
        <PrivateRoute exact path={CREATE_PROFILES}>
          <CreateProfiles />
        </PrivateRoute>
        <PrivateRoute exact path={EDIT_PROFILES}>
          <CreateProfiles />
          {/* <EditProfiles /> */}
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
        <AdminPrivateRoute path={ADMIN_ARTICLE}>
          <AdminArticle />
        </AdminPrivateRoute>
        <AdminPrivateRoute path={ADMIN_HEALTH_TOPIC}>
          <AdminteHealthTopic />
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
