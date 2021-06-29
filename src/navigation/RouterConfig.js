import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "pages/home";
import Login from "pages/login";
import Profiles from "pages/profiles";
import { ROOT, PROFILES, LOGIN } from "navigation/constants";
import PrivateRoute from "navigation/PrivateRoute";

export const RouterConfig = () => {
  return (
    <div>
      <Switch>
        {/* List all public routes here */}
        <Route exact path={ROOT} component={Home} />
        {/* <Route exact path={DASHBOARD} component={Dashboard} />
        <Route exact path={PAGE1} component={Page1} /> */}
        <Route path={LOGIN}>
          <Login />
        </Route>

        {/* List all private/auth routes here */}
        <PrivateRoute path={PROFILES}>
          <Profiles />
        </PrivateRoute>
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
