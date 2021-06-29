import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "pages/home";
import Login from "pages/login";
import Profiles from "pages/Profile/profiles";
import CreateProfiles from "pages/Profile/createProfile";
import EditProfiles from "pages/Profile/editProfile";
import ViewProfiles from "pages/Profile/viewProfile";
import ArticlesList from "pages/articleList";
import Article from "pages/article/article";
import {
  ROOT,
  PROFILES,
  CREATE_PROFILE,
  EDIT_PROFILE,
  VIEW_PROFILE,
  LOGIN,
  TOPIC_WITH_ID,
  ARTICLE_WITH_ID,
} from "navigation/constants";
// import PrivateRoute from "navigation/PrivateRoute";

export const RouterConfig = () => {
  return (
    <div>
      <Switch>
        {/* List all public routes here */}
        <Route exact path={ROOT} component={Home} />
        <Route exact path={TOPIC_WITH_ID} component={ArticlesList} />
        <Route exact path={ARTICLE_WITH_ID} component={Article} />
        <Route exact path={PROFILES} component={Profiles} />
        <Route exact path={CREATE_PROFILE} component={CreateProfiles} />
        <Route exact path={EDIT_PROFILE} component={EditProfiles} />
        <Route exact path={VIEW_PROFILE} component={ViewProfiles} />
        {/* <Route exact path={DASHBOARD} component={Dashboard} />
        <Route exact path={PAGE1} component={Page1} /> */}
        <Route path={LOGIN}>
          <Login />
        </Route>

        {/* List all private/auth routes here */}
        {/*  <PrivateRoute path={PROFILES}><Profiles /></PrivateRoute> */}
        {/* Do not hesitate to play around by moving some routes from public to private and vice-versa */}
        {/* <PrivateRoute path={DASHBOARD}>
          <Dashboard />
        </PrivateRoute> */}

        {/* List a generic 404-Not Found route here */}
        {/* <Route path="*">
          <NotFound />
        </Route> */}
      </Switch>
    </div>
  );
};
